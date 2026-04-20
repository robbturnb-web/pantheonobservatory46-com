import { useState, useRef, useEffect } from 'react';
import { Upload, Pencil, Loader2, Eraser, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEchoXp } from '@/hooks/use-echo-xp';
import { XP_VALUES } from '@/lib/xp-events';

type Mode = 'upload' | 'draw';

export function GlyphDecoder() {
  const [mode, setMode] = useState<Mode>('draw');
  const [imageData, setImageData] = useState<string | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const { userId, awardEvent } = useEchoXp();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#c77dff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, [mode]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    lastPos.current = getPos(e);
  };
  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    const pos = getPos(e);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPos.current = pos;
  };
  const endDraw = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, c.width, c.height);
    setInterpretation(null);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result as string);
      setInterpretation(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDecode = async () => {
    let dataUrl: string | null = null;
    if (mode === 'draw' && canvasRef.current) {
      dataUrl = canvasRef.current.toDataURL('image/png');
    } else if (mode === 'upload') {
      dataUrl = imageData;
    }
    if (!dataUrl) {
      toast.error('Draw or upload a glyph first');
      return;
    }
    setLoading(true);
    setInterpretation(null);
    try {
      const { data, error } = await supabase.functions.invoke('glyph-decode', {
        body: { imageBase64: dataUrl },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setInterpretation(data.interpretation);
      if (userId) {
        await awardEvent('page', `glyph-decode:${Date.now()}`, XP_VALUES.GLYPH_DECODE, 'Glyph decoded');
      }
      toast.success('Decoded by Echo intelligence');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Decode failed';
      if (msg.includes('429')) toast.error('Too many requests — wait a moment');
      else if (msg.includes('402')) toast.error('AI credits exhausted — top up to continue');
      else toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('draw')}
          className={`flex-1 px-3 py-2 rounded-md border text-sm flex items-center justify-center gap-2 ${
            mode === 'draw' ? 'bg-primary/20 border-primary text-primary' : 'border-border'
          }`}
        >
          <Pencil className="w-4 h-4" /> Draw
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`flex-1 px-3 py-2 rounded-md border text-sm flex items-center justify-center gap-2 ${
            mode === 'upload' ? 'bg-primary/20 border-primary text-primary' : 'border-border'
          }`}
        >
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>

      {mode === 'draw' ? (
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full aspect-[4/3] rounded-lg border border-border bg-[#0a0e1a] touch-none cursor-crosshair"
            onPointerDown={startDraw}
            onPointerMove={moveDraw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
          />
          <button
            onClick={clearCanvas}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background border border-border"
            aria-label="Clear"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <label className="block aspect-[4/3] rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden">
            {imageData ? (
              <img src={imageData} alt="Uploaded glyph" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-muted-foreground text-sm p-4">
                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Click to upload glyph image
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      )}

      <button
        onClick={handleDecode}
        disabled={loading}
        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/70 text-primary-foreground font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Echo analyzing…' : 'Decode with Echo AI'}
      </button>

      <AnimatePresence>
        {interpretation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg border border-primary/40 bg-primary/5"
          >
            <div className="text-xs uppercase tracking-wider text-primary mb-2">Echo Interpretation</div>
            <div className="text-sm whitespace-pre-wrap">{interpretation}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
