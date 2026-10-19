import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { profile, copy, projects, certificates } from '../src/content.js';
import { render } from '../src/render.js';

assert.equal(profile.email, 'izzsyahfiq@gmail.com');
assert.equal(new Set(projects.map(p => p.id)).size, projects.length, 'Project IDs must be unique.');
for (const lang of ['en', 'ms']) {
  assert.deepEqual(Object.keys(copy.en).sort(), Object.keys(copy[lang]).sort(), `Missing ${lang} copy.`);
  for (const project of projects) {
    for (const key of ['summary', 'context', 'contribution', 'outcome']) {
      assert.ok(project[key][lang]?.trim(), `${project.id}: missing ${lang} ${key}.`);
    }
    assert.ok(copy[lang].statuses[project.status], `Unknown status: ${project.status}.`);
    if (project.repo) assert.equal(project.visibility, 'public', 'Only public repositories receive source links.');
  }
  const html = render(lang);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ID.');
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Broken anchor: ${match[1]}.`);
}
const files = [...profile.portraits, profile.cv, ...certificates.map(c => c.file).filter(Boolean), '/images/guardian-engraving.webp', ...['git', 'python', 'docker', 'kubernetes'].map(name => `/icons/${name}.svg`), '/privacy.html', '/terms.html'];
for (const file of files) await access(new URL('../public' + file, import.meta.url));
console.log(`Content and links checked: 2 languages, ${projects.length} projects, ${certificates.length} training entries, ${files.length} local assets.`);
