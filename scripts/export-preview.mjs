import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { profile, certificates } from '../src/content.js';

const root = new URL('../', import.meta.url);
const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/main.js', import.meta.url))], bundle: true, write: false, format: 'iife', minify: true, loader: { '.css': 'empty' } });
let script = bundle.outputFiles[0].text;
let html = await readFile(new URL('dist/index.html', root), 'utf8');
const files = [...profile.portraits, profile.cv, ...certificates.map(c => c.file).filter(Boolean)];
for (const file of files) {
  const bytes = await readFile(new URL('public' + file, root));
  const mime = file.endsWith('.pdf') ? 'application/pdf' : file.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const data = `data:${mime};base64,${bytes.toString('base64')}`;
  script = script.replaceAll(file, data);
  html = html.replaceAll(file, data);
}
const assets = await readdir(new URL('dist/assets/', root));
const css = await readFile(new URL('dist/assets/' + assets.find(file => file.endsWith('.css')), root), 'utf8');
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '').replace(/<script[^>]+type="module"[^>]*><\/script>/g, '').replace(/<link[^>]+rel="icon"[^>]*>/g, '');
html = html.replace('</head>', `<style>${css}</style></head>`);
// Data-URL PDFs cannot always open in a new tab. Download those copies in this offline preview.
const downloadFix = `document.querySelectorAll('a[href^="data:"]').forEach(a=>{a.removeAttribute('target');a.setAttribute('download',a.href.startsWith('data:application/pdf')?'certificate-or-cv.pdf':'certificate.png')});`;
html = html.replace('</body>', `<script>${script.replaceAll('</script', '<\\/script')};${downloadFix}document.querySelector('#app').addEventListener('click',()=>setTimeout(()=>{${downloadFix}},0));</script></body>`);
await writeFile(new URL('PREVIEW.html', root), html);
console.log('Exported a self-contained offline preview. Deploy dist/, not PREVIEW.html.');
