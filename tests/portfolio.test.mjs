import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { Window } from 'happy-dom';
import { render, projectDetails } from '../src/render.js';
import { copy, projects } from '../src/content.js';
import { initialThemeScript } from '../src/theme.js';

test('Both languages have semantic sections, working destinations and honest project status', () => {
  for (const lang of ['en', 'ms']) {
    const window = new Window();
    window.document.body.innerHTML = render(lang);
    assert.equal(window.document.querySelectorAll('h1').length, 1);
    assert.equal(window.document.querySelectorAll('[data-project]').length, 13);
    assert.ok(window.document.querySelector('.ambient-background').getAttribute('aria-hidden') === 'true');
    for (const anchor of window.document.querySelectorAll('a[href^="#"]')) {
      assert.ok(window.document.getElementById(anchor.hash.slice(1)));
    }
    for (const project of projects) {
      const html = projectDetails(project, lang);
      assert.ok(html.includes(copy[lang].statuses[project.status]));
      if (project.visibility !== 'public') assert.ok(!html.includes('href="https://github.com/'));
    }
    window.happyDOM.abort();
  }
});

test('Theme preferences, language, project filters, portrait, dialog, menu and copy feedback work together', async () => {
  const bundle = await build({ entryPoints: ['src/main.js'], bundle: true, write: false, format: 'iife', platform: 'browser', loader: { '.css': 'empty' } });
  const window = new Window({ url: 'https://portfolio.example/', settings: { enableJavaScriptEvaluation: true } });
  // Reduced motion avoids running layout-dependent GSAP effects in a simulated DOM.
  let systemThemeChanged;
  window.matchMedia = query => query === '(prefers-color-scheme: dark)'
    ? { matches: false, addEventListener(_event, listener) { systemThemeChanged = listener; } }
    : { matches: true, addEventListener() {}, removeEventListener() {} };
  window.document.head.innerHTML = '<meta name="description" content=""><meta name="theme-color" content="#faf8f3">';
  window.localStorage.setItem('portfolio-theme', 'invalid');
  window.eval(initialThemeScript); // Runs before the app is mounted, as in the generated head.
  assert.equal(window.document.documentElement.dataset.theme, 'light');
  window.document.body.innerHTML = `<div id="app">${render('en')}</div>`;
  window.eval(bundle.outputFiles[0].text);
  const click = selector => window.document.querySelector(selector).click();
  const visible = () => [...window.document.querySelectorAll('[data-project]')].filter(card => !card.hidden);
  systemThemeChanged({ matches: true });
  assert.equal(window.document.documentElement.dataset.theme, 'dark');
  assert.equal(window.document.querySelector('#theme-toggle').getAttribute('aria-pressed'), 'true');
  assert.equal(window.document.querySelector('meta[name="theme-color"]').content, '#151d2b');
  click('#theme-toggle');
  assert.equal(window.localStorage.getItem('portfolio-theme'), 'light');
  systemThemeChanged({ matches: true });
  assert.equal(window.document.documentElement.dataset.theme, 'light'); // An explicit choice beats system changes.
  click('#theme-toggle');
  window.eval(initialThemeScript);
  assert.equal(window.document.documentElement.dataset.theme, 'dark'); // Saved dark beats a light system on reload.
  assert.equal(visible().length, 6);
  click('#show-more'); assert.equal(visible().length, 13);
  click('[data-filter="vibe"]'); assert.deepEqual(visible().map(card => card.dataset.project), ['portfolio']);
  click('[data-open-project="portfolio"]'); assert.match(window.document.querySelector('#project-dialog').textContent, /Codex assisted/);
  click('.close-dialog');
  click('[data-filter="systems"]'); assert.deepEqual(visible().map(card => card.dataset.project), ['nadi', 'eva']);
  click('[data-language="ms"]'); assert.equal(window.document.documentElement.lang, 'ms');
  assert.equal(window.document.documentElement.dataset.theme, 'dark');
  assert.equal(window.document.querySelector('#theme-toggle').getAttribute('aria-label'), copy.ms.darkMode);
  assert.equal(window.document.querySelector('#theme-toggle').title, copy.ms.useLight);
  assert.equal(window.document.querySelector('h1').textContent, 'BakalBlue Teamer.');
  assert.equal(visible().length, 2); // Preserve the selected category after translating.
  click('#portrait'); assert.equal(window.document.querySelector('#portrait').getAttribute('aria-pressed'), 'true');
  click('#portrait'); assert.equal(window.document.querySelector('#portrait').getAttribute('aria-pressed'), 'false');
  click('[data-open-project="nadi"]'); assert.ok(window.document.querySelector('#project-dialog').open);
  assert.match(window.document.querySelector('#project-dialog').textContent, /Fasa 3/);
  click('.close-dialog'); assert.equal(window.document.querySelector('#project-dialog').open, false);
  assert.equal(window.document.body.classList.contains('dialog-open'), false);
  click('#menu-toggle'); assert.equal(window.document.querySelector('#menu-toggle').getAttribute('aria-expanded'), 'true');
  window.document.querySelector('#menu-toggle').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(window.document.querySelector('#menu-toggle').getAttribute('aria-expanded'), 'false');
  click('[data-filter="all"]'); assert.equal(visible().length, 13);
  click('#show-more'); assert.equal(visible().length, 6);
  click('[data-language="en"]'); assert.equal(window.document.documentElement.lang, 'en');
  assert.equal(window.localStorage.getItem('portfolio-language'), 'en');
  click('#motion-toggle'); assert.equal(window.localStorage.getItem('portfolio-motion'), 'off');
  assert.ok(window.document.documentElement.classList.contains('motion-paused'));
  Object.defineProperty(window.navigator, 'clipboard', { value: { async writeText() { throw new Error('Permission denied'); } }, configurable: true });
  click('#copy-email'); await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(window.document.querySelector('#copy-status').textContent, copy.en.copyFailed);
  Object.defineProperty(window.navigator, 'clipboard', { value: { async writeText(text) { assert.equal(text, 'izzsyahfiq@gmail.com'); } }, configurable: true });
  click('#copy-email'); await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(window.document.querySelector('#copy-status').textContent, copy.en.copied);
  await window.happyDOM.abort();
});

test('GSAP and Lenis initialise and the pause control restores visible content', async () => {
  const bundle = await build({ entryPoints: ['src/main.js'], bundle: true, write: false, format: 'iife', platform: 'browser', loader: { '.css': 'empty' } });
  const window = new Window({ url: 'https://portfolio.example/', settings: { enableJavaScriptEvaluation: true } });
  window.matchMedia = query => ({ media: query, matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  window.document.head.innerHTML = '<meta name="description" content="">';
  window.document.body.innerHTML = `<div id="app">${render('en')}</div>`;
  window.eval(bundle.outputFiles[0].text);
  window.document.querySelector('#theme-toggle').click();
  assert.equal(window.document.documentElement.dataset.theme, 'dark'); // Storage denial must not break switching.
  assert.equal(window.document.querySelector('#motion-toggle').getAttribute('aria-pressed'), 'false');
  window.document.querySelector('#motion-toggle').click();
  assert.equal(window.document.querySelector('#motion-toggle').getAttribute('aria-pressed'), 'true');
  assert.equal(window.document.querySelector('.hero-line').style.opacity, '');
  await window.happyDOM.abort();
});
