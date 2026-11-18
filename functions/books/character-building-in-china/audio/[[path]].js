// Cloudflare Pages serves static files without HTTP Range support, which iOS Safari
// (and seeking in other browsers) needs for <audio>. This function serves the mp3s
// with Accept-Ranges / 206 Partial Content.
export async function onRequest({ request, env }) {
  const res = await env.ASSETS.fetch(new Request(request.url, { method: 'GET' }));
  if (!res.ok || (res.headers.get('content-type') || '').includes('text/html')) {
    return new Response('Not found', { status: 404 });
  }
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  const h = new Headers({
    'Content-Type': 'audio/mpeg',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=86400',
  });
  const et = res.headers.get('etag');
  if (et) h.set('ETag', et);
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('Range') || '');
  if (!m || (m[1] === '' && m[2] === '')) {
    h.set('Content-Length', String(size));
    return new Response(request.method === 'HEAD' ? null : buf, { status: 200, headers: h });
  }
  let s, e;
  if (m[1] === '') { s = Math.max(0, size - parseInt(m[2], 10)); e = size - 1; }
  else { s = parseInt(m[1], 10); e = m[2] === '' ? size - 1 : Math.min(parseInt(m[2], 10), size - 1); }
  if (s > e || s >= size) {
    h.set('Content-Range', `bytes */${size}`);
    return new Response(null, { status: 416, headers: h });
  }
  h.set('Content-Range', `bytes ${s}-${e}/${size}`);
  h.set('Content-Length', String(e - s + 1));
  return new Response(request.method === 'HEAD' ? null : buf.slice(s, e + 1), { status: 206, headers: h });
}
