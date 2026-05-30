import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_VOICE_ON = 'echo-voice-output';
const STORAGE_VOICE_NAME = 'echo-voice-name';

interface SpeechRecognitionLike {
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { transcript: string }[][] }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
}

type SRConstructor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SRConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Echo voice: TTS playback of streamed assistant text + STT for user voice input.
 * Gracefully degrades when browser APIs are unavailable.
 */
export function useEchoVoice() {
  const [voiceOn, setVoiceOn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_VOICE_ON) === '1';
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState<string>(() =>
    typeof window === 'undefined' ? '' : localStorage.getItem(STORAGE_VOICE_NAME) ?? ''
  );
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Load available voices (async on most browsers)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      const all = window.speechSynthesis.getVoices();
      setVoices(all);
      if (!voiceName && all.length) {
        // Prefer deep male English voices for Echo
        const preferred =
          all.find((v) => /Daniel|Google UK English Male|Microsoft Guy|Alex|Fred/i.test(v.name)) ??
          all.find((v) => v.lang.startsWith('en') && /male/i.test(v.name)) ??
          all.find((v) => v.lang.startsWith('en-GB')) ??
          all.find((v) => v.lang.startsWith('en'));
        if (preferred) {
          setVoiceName(preferred.name);
          localStorage.setItem(STORAGE_VOICE_NAME, preferred.name);
        }
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [voiceName]);

  const toggleVoice = useCallback(() => {
    setVoiceOn((v) => {
      const next = !v;
      localStorage.setItem(STORAGE_VOICE_ON, next ? '1' : '0');
      if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const pickVoice = useCallback((name: string) => {
    setVoiceName(name);
    localStorage.setItem(STORAGE_VOICE_NAME, name);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!voiceOn || typeof window === 'undefined' || !('speechSynthesis' in window) || !text.trim()) return;
      window.speechSynthesis.cancel();
      // Strip markdown for cleaner speech
      const clean = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/[*_`#>-]/g, '')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
      if (!clean) return;
      const utter = new SpeechSynthesisUtterance(clean);
      const chosen = voices.find((v) => v.name === voiceName);
      if (chosen) utter.voice = chosen;
      utter.rate = 1;
      utter.pitch = 0.92;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    },
    [voiceOn, voices, voiceName]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const startListening = useCallback(
    (onTranscript: (text: string) => void) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) return false;
      const rec = new Ctor();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.onresult = (e) => {
        const transcript = e.results[0]?.[0]?.transcript ?? '';
        if (transcript) onTranscript(transcript);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
      try {
        rec.start();
        setListening(true);
        return true;
      } catch {
        setListening(false);
        return false;
      }
    },
    []
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const recognitionSupported = getRecognitionCtor() !== null;

  return {
    voiceOn,
    toggleVoice,
    voices,
    voiceName,
    pickVoice,
    speak,
    stopSpeaking,
    listening,
    startListening,
    stopListening,
    speechSupported,
    recognitionSupported,
  };
}
