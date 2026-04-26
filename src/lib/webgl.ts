/**
 * Lightweight WebGL feature detection.
 *
 * Returns `true` only when a real WebGL (or WebGL2) context can be created
 * AND the renderer isn't a known software fallback (SwiftShader / llvmpipe),
 * which behaves like WebGL but can crash R3F or run at <1 fps.
 *
 * The result is cached on `window` so we only probe once per session.
 */

const CACHE_KEY = '__lov_webgl_ok__';

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  const cached = (window as any)[CACHE_KEY];
  if (typeof cached === 'boolean') return cached;

  let ok = false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (gl) {
      // Reject obvious software renderers — they tend to hang / crash R3F.
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = dbg ? String(gl.getParameter((dbg as any).UNMASKED_RENDERER_WEBGL) || '') : '';
      const isSoftware = /SwiftShader|llvmpipe|software/i.test(renderer);
      ok = !isSoftware;
    }
  } catch {
    ok = false;
  }

  (window as any)[CACHE_KEY] = ok;
  return ok;
}
