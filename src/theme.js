// Also embedded in <head>, before CSS, to apply the saved theme on first paint.
export function bootstrapTheme() {
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage is optional. */ }
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#151d2b' : '#faf8f3');
  return theme;
}

export const initialThemeScript = `(${bootstrapTheme.toString()})();`;
