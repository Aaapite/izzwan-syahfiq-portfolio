import { profile, copy, projects, certificates } from './content.js';

export const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const multiline = value => escape(value).replaceAll('\n', '<br>');
const arrow = '<span aria-hidden="true">↗</span>';
export function external(url, label, className = '') {
  return `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${arrow}</a>`;
}
export const localize = (value, lang) => value[lang] || value.en;
export function projectArt(project) {
  // Decorative diagrams are illustrations, never screenshots or results.
  const paths = {
    blue: '<path d="M120 35l55 20v45c0 37-55 60-55 60s-55-23-55-60V55z"/><path d="M96 93l16 16 33-35"/>',
    cloud: '<rect x="44" y="40" width="54" height="42" rx="7"/><rect x="142" y="40" width="54" height="42" rx="7"/><rect x="92" y="116" width="56" height="42" rx="7"/><path d="M98 61h44M71 82v21h49v13m49-34v21h-49"/>',
    systems: '<circle cx="120" cy="98" r="28"/><ellipse cx="120" cy="98" rx="80" ry="32"/><ellipse cx="120" cy="98" rx="32" ry="80"/><path d="M112 98h16m-8-8v16"/>',
    vibe: '<rect x="43" y="43" width="154" height="111" rx="8"/><path d="M43 66h154m-128 37l-14 12 14 12m102-24l14 12-14 12m-35-28l-16 32"/><circle cx="57" cy="55" r="2"/><circle cx="67" cy="55" r="2"/><circle cx="77" cy="55" r="2"/>',
  };
  return `<svg viewBox="0 0 240 196" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4">${paths[project.category]}</svg>`;
}
export function projectCard(project, lang) {
  const c = copy[lang];
  return `<article class="project-card" data-project="${project.id}" data-category="${project.category}" data-featured="${project.featured}">
    <button class="project-open" type="button" data-open-project="${project.id}" aria-label="${escape(c.details + ': ' + project.title)}">
      <span class="project-art art-${project.category}">${projectArt(project)}<span class="art-code">${escape(project.id.toUpperCase())} / ${escape(c.categories[project.category])}</span><span class="art-arrow" aria-hidden="true">↗</span></span>
      <span class="project-meta"><span>${escape(c.categories[project.category])}</span><span class="status">${escape(c.statuses[project.status])}</span></span>
      <h3>${escape(project.title)}</h3><span class="project-summary">${escape(localize(project.summary, lang))}</span>
      <span class="tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</span>
      <span class="text-link">${escape(c.details)} ${arrow}</span>
    </button>
  </article>`;
}
export function projectDetails(project, lang) {
  const c = copy[lang];
  return `<div class="dialog-top"><span class="eyebrow">${escape(c.categories[project.category])} / ${escape(c.statuses[project.status])}</span><button class="icon-button close-dialog" type="button" aria-label="${escape(c.close)}">×</button></div>
    <h2 id="project-dialog-title">${escape(project.title)}</h2>
    ${[['context', c.context], ['contribution', c.contribution], ['outcome', c.outcome]].map(([key, heading]) => `<section class="project-detail"><h3>${escape(heading)}</h3><p>${escape(localize(project[key], lang))}</p></section>`).join('')}
    <div class="tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>
    <div class="dialog-source">${project.repo && project.visibility === 'public' ? external(project.repo, c.source, 'button primary') : `<p class="small">${escape(project.visibility === 'private' ? c.privateRepo : c.plannedRepo)}</p>`}</div>`;
}
function timeline(items) {
  return items.map(item => `<article class="timeline-item"><p class="timeline-date">${escape(item.date)}</p><div><h4>${escape(item.title)}</h4><p class="timeline-org">${escape(item.org)}</p><p>${escape(item.text)}</p></div></article>`).join('');
}
export function render(lang = 'en') {
  const c = copy[lang];
  const ids = ['about', 'projects', 'focus', 'skills', 'experience', 'contact'];
  return `<a class="skip-link" href="#main">${escape(c.skip)}</a>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="${escape(profile.name)}"><span class="brand-mark" aria-hidden="true">IS<span>↗</span></span><span>Izzwan<span class="brand-surname"> Syahfiq</span><span class="brand-dot">.</span></span></a>
    <div class="header-controls"><button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="navigation">${escape(c.menu)} <span aria-hidden="true">☰</span></button>
    <nav id="navigation" aria-label="${escape(c.navLabel)}">${ids.map((id, i) => `<a href="#${id}">${escape(c.nav[i])}</a>`).join('')}</nav>
    <div class="language-switch" role="group" aria-label="Language / Bahasa"><button data-language="en" aria-pressed="${lang === 'en'}" lang="en">EN</button><span aria-hidden="true">/</span><button data-language="ms" aria-pressed="${lang === 'ms'}" lang="ms">BM</button></div></div>
  </header>
  <main id="main">
    <section id="home" class="hero">
      <div class="ambient-background" aria-hidden="true"><span class="ambient-grid"></span><span class="ambient-orbit orbit-one"></span><span class="ambient-orbit orbit-two"></span><span class="ambient-orbit orbit-three"></span><span class="ambient-point point-one"></span><span class="ambient-point point-two"></span><span class="ambient-point point-three"></span><span class="ambient-point point-four"></span></div>
      <div class="hero-inner container"><div class="hero-copy"><p class="eyebrow reveal">${escape(c.eyebrow)}</p><h1>${c.hero.map(line => `<span class="hero-line">${escape(line)}</span>`).join('')}</h1><p class="hero-intro reveal">${escape(c.intro)}</p><div class="hero-actions reveal"><a href="#projects" class="button primary">${escape(c.work)} <span aria-hidden="true">↓</span></a><a href="${profile.cv}" class="button secondary" target="_blank" rel="noopener">${escape(c.resume)} ${arrow}</a></div><div class="social-links reveal">${external(profile.github, 'GitHub')}${external(profile.linkedin, 'LinkedIn')}<a href="mailto:${profile.email}">Email ${arrow}</a></div></div>
      <div class="portrait-wrap reveal"><span class="portrait-note" aria-hidden="true">Izzwan, off-screen.</span><button class="portrait" id="portrait" type="button" aria-label="${escape(c.portrait)}" aria-pressed="false"><img class="portrait-main" src="${profile.portraits[0]}" alt="${escape(c.portraitAlt[0])}" width="1152" height="2048" fetchpriority="high"><img class="portrait-second" src="${profile.portraits[1]}" alt="${escape(c.portraitAlt[1])}" width="810" height="1080"><span class="portrait-corner" aria-hidden="true">↔</span></button><p class="portrait-hint">${escape(c.portraitHint)}</p></div></div>
      <div class="hero-bottom container"><span>${escape(profile.location)}</span><a href="#about">${escape(c.scroll)} <span aria-hidden="true">↓</span></a><span>BLUE TEAM / SOC</span></div>
    </section>
    <section id="about" class="section container about-section">
      <div class="about-visual reveal" aria-hidden="true"><span class="diagram-label">OBSERVE → UNDERSTAND → RESPOND</span><div class="evidence-diagram"><span class="diagram-node">logs</span><span class="diagram-node">context</span><span class="diagram-node">evidence</span><div class="diagram-core">investigate<span>with care.</span></div></div><p>Curiosity is the starting point.<br>Evidence is the anchor.</p></div>
      <div class="about-copy"><p class="eyebrow reveal">${escape(c.aboutLabel)}</p><h2 class="reveal">${multiline(c.aboutTitle)}</h2>${c.about.map(p => `<p class="reveal">${escape(p)}</p>`).join('')}<dl class="about-facts reveal">${c.aboutFacts.map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl></div>
    </section>
    <section id="projects" class="section projects-section"><div class="container"><div class="section-heading"><div><p class="eyebrow reveal">${escape(c.projectsLabel)}</p><h2 class="reveal">${multiline(c.projectsTitle)}</h2></div><p class="section-intro reveal">${escape(c.projectsIntro)}</p></div><div class="project-filters" role="group" aria-label="${escape(c.nav[1])}">${Object.entries(c.filters).map(([id, label]) => `<button type="button" data-filter="${id}" aria-pressed="${id === 'all'}">${escape(label)}</button>`).join('')}</div><div class="project-grid" id="project-grid">${projects.map(p => projectCard(p, lang)).join('')}</div><p id="project-empty" hidden>${escape(c.empty)}</p><div class="more-projects"><button id="show-more" class="button secondary" aria-expanded="false">${escape(c.showMore)} <span aria-hidden="true">+</span></button></div></div></section>
    <section id="focus" class="section container"><div class="section-heading"><div><p class="eyebrow reveal">${escape(c.focusLabel)}</p><h2 class="reveal">${multiline(c.focusTitle)}</h2></div><p class="section-intro reveal">${escape(c.focusIntro)}</p></div><div class="focus-grid">${c.focus.map((item, i) => `<article class="focus-item reveal"><span class="focus-number">0${i + 1}</span><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join('')}</div></section>
    <section id="skills" class="section skills-section"><div class="container"><div class="section-heading"><div><p class="eyebrow reveal">${escape(c.skillsLabel)}</p><h2 class="reveal">${multiline(c.skillsTitle)}</h2></div><p class="section-intro reveal">${escape(c.skillsIntro)}</p></div><div class="skills-grid">${c.skills.map(item => `<article class="skill-group reveal"><h3>${escape(item.title)}</h3><p class="small">${escape(item.level)}</p><ul>${item.items.map(tool => `<li>${escape(tool)}</li>`).join('')}</ul></article>`).join('')}</div></div></section>
    <section id="experience" class="section container"><p class="eyebrow reveal">${escape(c.experienceLabel)}</p><h2 class="reveal">${multiline(c.experienceTitle)}</h2><div class="journey-grid"><div class="reveal"><h3 class="column-title">${escape(c.education)}</h3>${timeline(c.educationItems)}</div><div class="reveal"><h3 class="column-title">${escape(c.experience)}</h3>${timeline(c.experienceItems)}</div></div></section>
    <section id="certificates" class="section certificates-section"><div class="container"><div class="section-heading"><div><p class="eyebrow reveal">${escape(c.certificatesLabel)}</p><h2 class="reveal">${multiline(c.certificatesTitle)}</h2></div><p class="section-intro reveal">${escape(c.certificatesIntro)}</p></div><div class="certificate-list">${certificates.map(item => `<article class="certificate-item reveal"><span class="certificate-icon" aria-hidden="true">${item.status === 'completed' ? '✓' : item.status === 'participation' ? '↗' : '◌'}</span><div class="certificate-info"><p class="small">${escape(item.issuer)}</p><h3>${escape(item.title)}</h3><p>${escape(localize(item.note, lang))}</p></div><div class="certificate-end"><span class="status ${item.status}">${escape(c[item.status])}</span>${item.date ? `<time datetime="${item.date}">${new Intl.DateTimeFormat(lang === 'ms' ? 'ms-MY' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(item.date + 'T00:00:00Z'))}</time>` : ''}<div class="certificate-links">${item.file ? `<a href="${item.file}" target="_blank" rel="noopener">${escape(c.certificate)} ${arrow}</a>` : ''}${item.verification ? external(item.verification, c.verify) : ''}</div></div></article>`).join('')}</div></div></section>
    <section id="contact" class="section contact-section"><div class="container"><p class="eyebrow reveal">${escape(c.contactLabel)}</p><div class="contact-grid"><div><h2 class="reveal">${multiline(c.contactTitle)}</h2><p class="contact-description reveal">${escape(c.contactText)}</p></div><div class="contact-links reveal"><a class="contact-email" href="mailto:${profile.email}">${profile.email} ${arrow}</a><div class="contact-actions"><a class="button primary" href="mailto:${profile.email}">${escape(c.mail)} ${arrow}</a><button class="button secondary" id="copy-email">${escape(c.copyEmail)}</button></div><p id="copy-status" class="small" role="status" aria-live="polite"></p><div class="social-links">${external(profile.linkedin, 'LinkedIn')}${external(profile.github, 'GitHub')}<a href="${profile.cv}" target="_blank" rel="noopener">CV ${arrow}</a></div></div></div></div></section>
  </main>
  <footer class="site-footer container"><span>© ${new Date().getUTCFullYear()} ${escape(profile.name)}</span><p>${escape(c.footer)}</p><div><button id="motion-toggle" aria-pressed="false">${escape(c.motion)}</button><a href="#home">${escape(c.top)} ↑</a></div></footer>
  <dialog id="project-dialog" aria-labelledby="project-dialog-title"><div class="dialog-content" data-lenis-prevent></div></dialog><div class="scroll-progress" aria-hidden="true"></div>`;
}
