import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { mountGuestbook, validateNote, guestbookConfig, guestbookProviders } from '../src/guestbook.js';

const tick = () => new Promise(resolve => setTimeout(resolve, 0));
const user = { id: 'visitor-one', user_metadata: { full_name: '<img src=x onerror=alert(1)>' }, app_metadata: {} };
function mockClient({ session = user, initial = [], error = null, initializeError = null } = {}) {
  let authListener;
  const records = [...initial];
  const calls = [];
  const client = {
    calls, records, auth: {
      initialize: async () => ({ error: initializeError ? { message: initializeError } : null }),
      getSession: async () => ({ data: { session: session ? { user: session } : null } }),
      onAuthStateChange(callback) { authListener = callback; return { data: { subscription: { unsubscribe() { authListener = null; } } } }; },
      signOut: async () => { authListener?.('SIGNED_OUT', null); return {}; },
      signInWithOAuth: async args => { calls.push({ oauth: args }); return {}; },
    },
    from(table) {
      assert.equal(table, 'guestbook_notes');
      const query = {
        mode: 'read', filters: [],
        select() { return this; }, order() { return this; }, limit() { return this; }, range() { return this; }, single() { return this; },
        is(field, value) { this.filters.push(row => row[field] === value); return this; },
        eq(field, value) { this.filters.push(row => row[field] === value); return this; },
        in(field, values) { this.filters.push(row => values.includes(row[field])); return this; },
        insert(value) { this.mode = 'insert'; this.value = value; return this; },
        update(value) { this.mode = 'update'; this.value = value; return this; },
        delete() { this.mode = 'delete'; return this; },
        then(resolve, reject) {
          calls.push({ mode: this.mode, value: this.value });
          if (error) return Promise.resolve({ data: null, error: { message: error } }).then(resolve, reject);
          if (this.mode === 'insert') {
            const note = { ...this.value, id: String(records.length + 1), author_name: 'Visitor', created_at: '2026-10-19T00:00:00Z', hidden: false };
            records.unshift(note);
            return Promise.resolve({ data: note, error: null }).then(resolve, reject);
          }
          const matched = records.filter(row => this.filters.every(filter => filter(row)));
          if (this.mode === 'delete') for (const note of matched) records.splice(records.indexOf(note), 1);
          if (this.mode === 'update') for (const note of matched) Object.assign(note, this.value);
          return Promise.resolve({ data: matched, error: null }).then(resolve, reject);
        },
      };
      return query;
    },
  };
  return client;
}

function browser() {
  const window = new Window({ url: 'https://portfolio.example/' });
  window.document.body.innerHTML = '<button data-open-guestbook>Guestbook</button>';
  return window;
}

test('Guestbook accepts up to 500 Unicode characters and only public Supabase configuration', () => {
  assert.equal(validateNote('   '), null);
  assert.equal(validateNote('  hello  '), 'hello');
  assert.equal(validateNote('🛡'.repeat(500)), '🛡'.repeat(500));
  assert.equal(validateNote('🛡'.repeat(501)), null);
  assert.equal(guestbookConfig({}), null);
  assert.equal(guestbookConfig({ VITE_SUPABASE_URL: 'http://example.com', VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' }), null);
  assert.equal(guestbookConfig({ VITE_SUPABASE_URL: 'https://example.com', VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_secret_no' }), null);
  const key = `test.${btoa(JSON.stringify({ role: 'service_role' }))}.test`;
  assert.equal(guestbookConfig({ VITE_SUPABASE_URL: 'https://example.com', VITE_SUPABASE_PUBLISHABLE_KEY: key }), null);
  assert.deepEqual(guestbookConfig({ VITE_SUPABASE_URL: 'https://example.com/', VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' }), { url: 'https://example.com', key: 'sb_publishable_test' });
});

test('Unconfigured guestbook is honest, bilingual and cleans up its modal trigger', async () => {
  const window = browser(); const document = window.document;
  const destroy = mountGuestbook({ lang: 'ms', document });
  await tick();
  document.querySelector('[data-open-guestbook]').click();
  const dialog = document.querySelector('#guestbook-dialog');
  assert.equal(dialog.open, true);
  assert.equal(dialog.querySelector('.guestbook-unavailable').hidden, false);
  assert.match(dialog.textContent, /sedang disediakan/);
  assert.equal(dialog.querySelector('.guestbook-auth').hidden, true);
  assert.equal(dialog.querySelector('.guestbook-composer').hidden, true);
  assert.equal(dialog.querySelector('a').href, 'mailto:izzsyahfiq@gmail.com');
  dialog.querySelector('.guestbook-close').click();
  assert.equal(dialog.open, false);
  destroy();
  document.querySelector('[data-open-guestbook]').click();
  assert.equal(document.querySelector('#guestbook-dialog'), null);
  window.happyDOM.abort();
});

test('Shared notes/replies use text nodes, drafts survive translation, and authenticated posting persists through the transport', async () => {
  const window = browser(); const document = window.document;
  const client = mockClient({ initial: [{ id: 'root', author_id: 'other', author_name: '<script>bad()</script>', body: '<img src=x onerror=bad()>', parent_id: null, created_at: '2026-10-19T00:00:00Z', hidden: false }] });
  let destroy = mountGuestbook({ lang: 'en', document, client });
  await tick();
  document.querySelector('[data-open-guestbook]').click();
  await tick();
  assert.equal(document.querySelector('.guestbook-notes img'), null);
  assert.equal(document.querySelector('.guestbook-notes script'), null);
  assert.equal(document.querySelector('.guestbook-account img'), null);
  assert.match(document.querySelector('.guestbook-note').textContent, /<img src=x onerror=bad\(\)>/);
  const draft = document.querySelector('#guestbook-note');
  draft.value = 'A draft before translating'; draft.dispatchEvent(new window.Event('input'));
  destroy();
  destroy = mountGuestbook({ lang: 'ms', document, client });
  await tick();
  document.querySelector('[data-open-guestbook]').click();
  await tick();
  assert.equal(document.querySelector('#guestbook-note').value, 'A draft before translating');
  document.querySelector('.guestbook-note-actions button').click();
  assert.equal(document.querySelector('#guestbook-note').value, '');
  document.querySelector('#guestbook-note').value = 'A real reply';
  document.querySelector('form').dispatchEvent(new window.Event('submit', { cancelable: true }));
  await tick(); await tick();
  assert.ok(client.records.some(note => note.body === 'A real reply' && note.parent_id === 'root' && note.author_id === user.id));
  assert.match(document.querySelector('.guestbook-reply').textContent, /A real reply/);
  assert.equal(document.querySelector('#guestbook-note').value, 'A draft before translating');
  assert.match(document.querySelector('.guestbook-status').textContent, /telah disiarkan/);
  assert.equal(document.querySelector('.guestbook-notes').getAttribute('aria-busy'), 'false');
  destroy(); window.happyDOM.abort();
});

test('Signed-out users get provider choices; OAuth uses same-origin redirect and request failures preserve drafts', async () => {
  const window = browser(); const document = window.document;
  const signedOut = mockClient({ session: null });
  let destroy = mountGuestbook({ document, client: signedOut });
  await tick();
  document.querySelector('[data-open-guestbook]').click(); await tick();
  assert.equal(document.querySelector('.guestbook-auth').hidden, false);
  assert.equal(document.querySelector('.guestbook-composer').hidden, true);
  document.querySelector('[data-provider=github]').click(); await tick();
  assert.equal(signedOut.calls.find(call => call.oauth).oauth.options.redirectTo, 'https://portfolio.example/?guestbook=1');
  destroy();
  const broken = mockClient({ error: 'guestbook_rate_limit <img src=x>' });
  destroy = mountGuestbook({ document, client: broken }); await tick();
  document.querySelector('[data-open-guestbook]').click(); await tick();
  document.querySelector('#guestbook-note').value = 'Please keep this draft';
  document.querySelector('form').dispatchEvent(new window.Event('submit', { cancelable: true })); await tick();
  assert.equal(document.querySelector('#guestbook-note').value, 'Please keep this draft');
  assert.match(document.querySelector('.guestbook-status').textContent, /wait a minute/);
  assert.equal(document.querySelector('.guestbook-status img'), null);
  assert.equal(document.querySelector('[type=submit]').disabled, false);
  destroy(); window.happyDOM.abort();
});

test('Late asynchronous initialization cannot modify a drawer after cleanup', async () => {
  const window = browser(); const document = window.document;
  const client = mockClient();
  let finish;
  client.auth.getSession = () => new Promise(resolve => { finish = resolve; });
  const destroy = mountGuestbook({ document, client });
  destroy();
  finish({ data: { session: { user } } });
  await tick();
  assert.equal(document.querySelector('#guestbook-dialog'), null);
  assert.equal(client.calls.length, 0);
  window.happyDOM.abort();
});

test('Unavailable OAuth providers stay disabled and public settings failures do not enable sign-in', async () => {
  const config = { url: 'https://guestbook.example', key: 'sb_publishable_example' };
  const available = await guestbookProviders(config, async (url, options) => {
    assert.equal(url, 'https://guestbook.example/auth/v1/settings');
    assert.equal(options.headers.apikey, config.key);
    return { ok: true, json: async () => ({ external: { github: true, google: false } }) };
  });
  assert.deepEqual(available, { github: true, google: false });
  assert.deepEqual(await guestbookProviders(config, async () => { throw new Error('Network unavailable'); }), { github: false, google: false });
  const window = browser(); const client = mockClient({ session: null });
  client.guestbookProviders = { github: false, google: false };
  const destroy = mountGuestbook({ document: window.document, client }); await tick();
  window.document.querySelector('[data-open-guestbook]').click(); await tick();
  assert.equal(window.document.querySelector('[data-provider=github]').disabled, true);
  assert.equal(window.document.querySelector('[data-provider=google]').disabled, true);
  assert.equal(window.document.querySelector('.guestbook-auth-preparing').hidden, false);
  assert.match(window.document.querySelector('.guestbook-auth-preparing').textContent, /Sign-in is being prepared/);
  destroy(); window.happyDOM.abort();
});

test('OAuth fragment errors remain visible after notes load and cleanup preserves the drawer return flag', async () => {
  const window = new Window({ url: 'https://portfolio.example/?guestbook=1&keep=yes#error=access_denied&error_code=provider_error&error_description=Denied' });
  const client = mockClient({ session: null });
  const destroy = mountGuestbook({ document: window.document, client });
  await tick(); await tick();
  assert.equal(window.document.querySelector('#guestbook-dialog').open, true);
  assert.equal(window.document.querySelector('.guestbook-status').textContent, 'Sign-in could not be completed. Please try again.');
  assert.equal(window.document.querySelector('.guestbook-notes').getAttribute('aria-busy'), 'false');
  assert.equal(window.location.search, '?guestbook=1&keep=yes');
  assert.equal(window.location.hash, '');
  destroy(); window.happyDOM.abort();
});

test('OAuth query errors are cleaned while unrelated query parameters and section hashes remain', async () => {
  const window = new Window({ url: 'https://portfolio.example/?guestbook=1&error=access_denied&error_description=Denied&keep=yes#projects' });
  const destroy = mountGuestbook({ document: window.document, client: mockClient({ session: null }) });
  await tick(); await tick();
  assert.equal(window.document.querySelector('.guestbook-status').textContent, 'Sign-in could not be completed. Please try again.');
  assert.equal(window.location.search, '?guestbook=1&keep=yes');
  assert.equal(window.location.hash, '#projects');
  destroy(); window.happyDOM.abort();
});

test('PKCE initialization errors are reported even when getSession succeeds, without restoring SDK URL fields', async () => {
  const window = new Window({ url: 'https://portfolio.example/?guestbook=1&code=expired&sb_flow_id=flow&keep=yes#about' });
  const client = mockClient({ session: null, initializeError: 'Code exchange failed' });
  client.auth.initialize = async () => {
    window.history.replaceState(null, '', '/?guestbook=1&keep=yes#about');
    return { error: { message: 'Code exchange failed' } };
  };
  const destroy = mountGuestbook({ document: window.document, client });
  await tick(); await tick();
  assert.equal(window.document.querySelector('.guestbook-status').textContent, 'Sign-in could not be completed. Please try again.');
  assert.equal(window.document.querySelector('.guestbook-auth').hidden, false);
  assert.equal(window.location.search, '?guestbook=1&keep=yes');
  assert.equal(window.location.hash, '#about');
  destroy(); window.happyDOM.abort();
});
