import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { profile, copy, projects } from './content.js';
import { render, projectDetails } from './render.js';
import { bootstrapTheme } from './theme.js';
import { mountGuestbook } from './guestbook.js';
import './guestbook.css';

gsap.registerPlugin(ScrollTrigger);
const app = document.querySelector('#app');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
let theme = bootstrapTheme();
let lang = 'en';
let filter = 'all';
let expanded = false;
let paused = false;
let lenis;
let ticker;
let animationContext;
let scrollFrame;
let lastProjectButton;
let cleanupGuestbook;
let interestTimer;
let orbitTime = 0;
let lastOrbitTick;

function readPreference(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* The site also works without storage. */ }
}
const storedLanguage = readPreference('portfolio-language', 'en');
lang = storedLanguage === 'ms' ? 'ms' : 'en';
paused = readPreference('portfolio-motion', 'on') === 'off';
const storedTheme = readPreference('portfolio-theme', null);
let themePreference = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;

function updateThemeControl() {
  const button = document.querySelector('#theme-toggle');
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.title = theme === 'dark' ? copy[lang].useLight : copy[lang].useDark;
}
function applyTheme(next, remember = false) {
  theme = next;
  if (remember) {
    themePreference = theme;
    savePreference('portfolio-theme', theme);
  }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#151d2b' : '#faf8f3');
  updateThemeControl();
}
systemDark.addEventListener('change', event => {
  if (themePreference === null) applyTheme(event.matches ? 'dark' : 'light');
});

function stopAnimation() {
  clearTimeout(interestTimer);
  interestTimer = null;
  lastOrbitTick = null;
  animationContext?.revert();
  animationContext = null;
  if (ticker) gsap.ticker.remove(ticker);
  ticker = null;
  lenis?.destroy();
  lenis = null;
}
function startInterests(disabled) {
  const label = document.querySelector('#interest-text');
  if (!label) return;
  const words = copy[lang].interests;
  label.textContent = disabled ? words.join(' · ') : words[0];
  if (disabled) return;
  let index = 0;
  let length = words[0].length;
  let deleting = true;
  const step = () => {
    const word = words[index];
    length += deleting ? -1 : 1;
    label.textContent = word.slice(0, Math.max(0, length));
    let delay = deleting ? 45 : 80;
    if (deleting && length <= 0) { index = (index + 1) % words.length; deleting = false; delay = 260; }
    else if (!deleting && length >= word.length) { deleting = true; delay = 2300; }
    interestTimer = setTimeout(step, delay);
  };
  interestTimer = setTimeout(step, 2500);
}
function renderOrbit(time, animate = true) {
  const orbit = document.querySelector('.tech-orbit');
  if (!orbit) return;
  if (animate && lastOrbitTick != null && !document.hidden) orbitTime += Math.min(time - lastOrbitTick, .05);
  lastOrbitTick = time;
  const rx = Math.max(0, (orbit.clientWidth - 64) / 2);
  const ry = Math.max(0, (orbit.clientHeight - 76) / 2);
  orbit.querySelectorAll('.tech-float').forEach((icon, i) => {
    const angle = orbitTime * (Math.PI * 2 / 38) + i * Math.PI / 2 - Math.PI / 4;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    icon.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) translate(-50%,-50%)`;
  });
}
function updateProgress() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
    const bar = document.querySelector('.scroll-progress');
    if (bar) bar.style.transform = `scaleX(${progress})`;
    scrollFrame = null;
  });
}
function setupAnimation() {
  stopAnimation();
  const motionDisabled = paused || reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', motionDisabled);
  const toggle = document.querySelector('#motion-toggle');
  toggle.textContent = paused ? copy[lang].resumeMotion : copy[lang].motion;
  toggle.setAttribute('aria-pressed', String(paused));
  startInterests(motionDisabled);
  renderOrbit(0, false);
  if (motionDisabled) { updateProgress(); return; }
  lenis = new Lenis({ anchors: false, lerp: 0.09, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  ticker = time => { lenis?.raf(time * 1000); renderOrbit(time); };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  animationContext = gsap.context(() => {
    // Visible by default. GSAP hides elements only after the module has loaded.
    gsap.from('.hero-line', { y: 24, opacity: 0, duration: 0.9, stagger: 0.13, ease: 'power2.out' });
    document.querySelectorAll('.reveal').forEach(element => {
      gsap.from(element, { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
    });
  }, app);
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
  ScrollTrigger.refresh();
  updateProgress();
}
export function updateProjects() {
  let visible = 0;
  document.querySelectorAll('[data-project]').forEach(card => {
    const categoryMatches = filter === 'all' || card.dataset.category === filter;
    // Category filters show all matching projects. "All" starts with selected work.
    const show = categoryMatches && (filter !== 'all' || expanded || card.dataset.featured === 'true');
    card.hidden = !show;
    if (show) visible++;
  });
  document.querySelector('#project-empty').hidden = visible > 0;
  const more = document.querySelector('#show-more');
  more.hidden = filter !== 'all';
  more.setAttribute('aria-expanded', String(expanded));
  more.innerHTML = `${expanded ? copy[lang].showLess : copy[lang].showMore} <span aria-hidden="true">${expanded ? '−' : '+'}</span>`;
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  ScrollTrigger.refresh();
  updateProgress();
}
function closeDialog() {
  const dialog = document.querySelector('#project-dialog');
  if (dialog.open) dialog.close();
}
function unlockPage() {
  document.body.classList.remove('dialog-open');
  lenis?.start();
  if (lastProjectButton?.isConnected) lastProjectButton.focus({ preventScroll: true });
}
function wireDialog() {
  const dialog = document.querySelector('#project-dialog');
  dialog.addEventListener('close', unlockPage);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
}
function applyLanguage(next, restoreFocus = false) {
  cleanupGuestbook?.();
  closeDialog();
  stopAnimation();
  lang = next === 'ms' ? 'ms' : 'en';
  savePreference('portfolio-language', lang);
  document.documentElement.lang = lang;
  document.title = copy[lang].title;
  document.querySelector('meta[name="description"]').content = copy[lang].description;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy[lang].title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy[lang].description);
  app.innerHTML = render(lang);
  updateThemeControl();
  wireDialog();
  updateProjects();
  setupAnimation();
  cleanupGuestbook = mountGuestbook({ lang, onOpen: () => lenis?.stop(), onClose: () => lenis?.start() });
  if (restoreFocus) document.querySelector(`[data-language="${lang}"]`).focus({ preventScroll: true });
}
app.addEventListener('click', async event => {
  if (event.target.closest('#theme-toggle')) {
    applyTheme(theme === 'dark' ? 'light' : 'dark', true);
    return;
  }
  const languageButton = event.target.closest('[data-language]');
  if (languageButton) { applyLanguage(languageButton.dataset.language, true); return; }
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) { filter = filterButton.dataset.filter; updateProjects(); return; }
  if (event.target.closest('#show-more')) { expanded = !expanded; updateProjects(); return; }
  if (event.target.closest('#menu-toggle')) {
    const button = document.querySelector('#menu-toggle');
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    document.querySelector('#navigation').classList.toggle('is-open', open);
    return;
  }
  if (event.target.closest('#portrait')) {
    const portrait = document.querySelector('#portrait');
    // An explicit choice takes precedence over the temporary hover/focus preview.
    portrait.classList.add('is-controlled');
    const swapped = portrait.classList.toggle('is-swapped');
    portrait.setAttribute('aria-pressed', String(swapped));
    return;
  }
  if (event.target.closest('#motion-toggle')) {
    paused = !paused;
    savePreference('portfolio-motion', paused ? 'off' : 'on');
    setupAnimation();
    return;
  }
  if (event.target.closest('#copy-email')) {
    const status = document.querySelector('#copy-status');
    try { await navigator.clipboard.writeText(profile.email); status.textContent = copy[lang].copied; }
    catch { status.textContent = copy[lang].copyFailed; }
    return;
  }
  const projectButton = event.target.closest('[data-open-project]');
  if (projectButton) {
    const project = projects.find(item => item.id === projectButton.dataset.openProject);
    if (!project) return;
    lastProjectButton = projectButton;
    const dialog = document.querySelector('#project-dialog');
    dialog.querySelector('.dialog-content').innerHTML = projectDetails(project, lang);
    document.body.classList.add('dialog-open');
    lenis?.stop();
    dialog.showModal();
    dialog.querySelector('.close-dialog').focus();
    return;
  }
  if (event.target.closest('.close-dialog')) { closeDialog(); return; }
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) {
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    document.querySelector('#navigation').classList.remove('is-open');
    document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
    history.pushState(null, '', anchor.getAttribute('href'));
    if (lenis) lenis.scrollTo(target, { offset: -95, duration: 1.1 });
    else target.scrollIntoView({ behavior: 'auto' });
    // Make keyboard navigation land in the destination section as well.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
function endPortraitPreview(event) {
  if (event.target.id === 'portrait') event.target.classList.remove('is-controlled');
}
app.addEventListener('pointerleave', endPortraitPreview, true);
app.addEventListener('blur', endPortraitPreview, true);
app.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('#project-dialog').open) {
    document.querySelector('#navigation').classList.remove('is-open');
    const toggle = document.querySelector('#menu-toggle');
    if (toggle.getAttribute('aria-expanded') === 'true') { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
  }
});
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', () => { updateProgress(); renderOrbit(0, false); }, { passive: true });
reducedMotion.addEventListener('change', setupAnimation);
applyLanguage(lang);
if (window.location.hash) {
  requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'auto' }));
}
