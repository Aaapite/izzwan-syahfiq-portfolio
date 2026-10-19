import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { profile, certificates } from '../src/content.js';

const root = new URL('../', import.meta.url);
const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/main.js', import.meta.url))], bundle: true, write: false, format: 'iife', minify: true, define: { 'import.meta.env': '{}' }, loader: { '.css': 'empty' } });
let script = bundle.outputFiles[0].text;
let html = await readFile(new URL('dist/index.html', root), 'utf8');
const files = [...profile.portraits, profile.cv, ...certificates.map(c => c.file).filter(Boolean), '/images/guardian-engraving.webp', ...['git', 'python', 'docker', 'kubernetes'].map(name => `/icons/${name}.svg`), '/privacy.html', '/terms.html'];
const policyDownloads = {};
for (const file of files) {
  const bytes = await readFile(new URL('public' + file, root));
  const mime = file.endsWith('.html') ? 'text/html' : file.endsWith('.pdf') ? 'application/pdf' : file.endsWith('.png') ? 'image/png' : file.endsWith('.webp') ? 'image/webp' : file.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg';
  const data = `data:${mime};base64,${bytes.toString('base64')}`;
  if (mime === 'text/html') policyDownloads[data] = file.slice(1);
  script = script.replaceAll(file, data);
  html = html.replaceAll(file, data);
}
const assets = await readdir(new URL('dist/assets/', root));
let css = await readFile(new URL('dist/assets/' + assets.find(file => file.endsWith('.css')), root), 'utf8');
for (const font of assets.filter(file => /\.woff2?$/.test(file))) {
  const bytes = await readFile(new URL('dist/assets/' + font, root));
  const data = `data:font/${font.endsWith('.woff2') ? 'woff2' : 'woff'};base64,${bytes.toString('base64')}`;
  css = css.replaceAll('/assets/' + font, data);
}
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '').replace(/<script[^>]+type="module"[^>]*><\/script>/g, '').replace(/<link[^>]+rel="icon"[^>]*>/g, '');
html = html.replace('</head>', `<style>${css}</style></head>`);
// Browsers restrict top-level data-URL navigation. Download the embedded documents instead.
const downloadFix = `document.querySelectorAll('a[href^="data:"]').forEach(a=>{a.removeAttribute('target');a.setAttribute('download',offlinePolicyFiles[a.href.split('#')[0]]??(a.href.startsWith('data:application/pdf')?'certificate-or-cv.pdf':'certificate.png'))});`;
html = html.replace('</body>', `<script>${script.replaceAll('</script', '<\\/script')};const offlinePolicyFiles=${JSON.stringify(policyDownloads)};${downloadFix}document.querySelector('#app').addEventListener('click',()=>setTimeout(()=>{${downloadFix}},0));</script></body>`);
await writeFile(new URL('PREVIEW.html', root), html);
console.log('Exported a self-contained offline preview. Deploy dist/, not PREVIEW.html.');
