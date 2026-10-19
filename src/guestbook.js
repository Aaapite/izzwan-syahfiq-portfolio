const messages = {
  en: {
    title: 'Leave a little trace.', eyebrow: 'GUESTBOOK', intro: 'A note, a thought, or just a hello. Thanks for stopping by.',
    close: 'Close guestbook', signIn: 'Sign in to leave a note', github: 'Continue with GitHub', google: 'Continue with Google',
    privacy: 'Your display name and note will be public. Your email stays private. Please keep it kind.',
    unavailable: 'The guestbook is getting ready. Please say hello by email for now.', email: 'Say hello by email',
    loading: 'Loading notes…', empty: 'No notes yet. You can leave the first hello.', refresh: 'Refresh notes', more: 'Older notes',
    label: 'Your note', placeholder: 'What would you like to share?', send: 'Leave a note', sending: 'Sending…',
    signedIn: 'Signed in as', signOut: 'Sign out', reply: 'Reply', replying: 'Replying to', cancelReply: 'Cancel reply',
    delete: 'Delete my note', hide: 'Hide note', deleteConfirm: 'Delete this note and its replies?', hideConfirm: 'Hide this note from the public guestbook?',
    invalid: 'Write between 1 and 500 characters.', error: 'Something went wrong. Please try again.', loadError: 'Notes could not be loaded. Please try again.',
    authError: 'Sign-in could not be completed. Please try again.', rate: 'Please wait a minute between notes. The daily limit is 10 notes.',
    blocked: 'Posting is unavailable for this account.', duplicate: 'You have already shared this note. Try a different message.',
    saved: 'Your note has been posted. Thank you!', deleted: 'Note removed.', hidden: 'Note hidden.', visitor: 'Visitor',
    noSession: 'Please sign in again to post your note.', self: 'You', retry: 'Try again', count: 'characters',
    draft: 'Drafts stay in this browser tab until you post or close the tab.', rootRemoved: 'This note is no longer available. Try leaving a new note.',
    authPreparing: 'Sign-in is being prepared. You can read the notes or say hello by email for now.',
  },
  ms: {
    title: 'Tinggalkan sedikit jejak.', eyebrow: 'BUKU TETAMU', intro: 'Nota, pendapat, atau sekadar salam. Terima kasih kerana singgah.',
    close: 'Tutup buku tetamu', signIn: 'Log masuk untuk meninggalkan nota', github: 'Teruskan dengan GitHub', google: 'Teruskan dengan Google',
    privacy: 'Nama paparan dan nota anda akan dipaparkan kepada umum. E-mel anda kekal peribadi. Sila jaga kesopanan.',
    unavailable: 'Buku tetamu sedang disediakan. Buat masa ini, sampaikan salam melalui e-mel.', email: 'Sampaikan salam melalui e-mel',
    loading: 'Memuatkan nota…', empty: 'Belum ada nota. Anda boleh menjadi yang pertama menyapa.', refresh: 'Muat semula nota', more: 'Nota terdahulu',
    label: 'Nota anda', placeholder: 'Apakah yang anda ingin kongsikan?', send: 'Tinggalkan nota', sending: 'Menghantar…',
    signedIn: 'Log masuk sebagai', signOut: 'Log keluar', reply: 'Balas', replying: 'Membalas', cancelReply: 'Batalkan balasan',
    delete: 'Padam nota saya', hide: 'Sembunyikan nota', deleteConfirm: 'Padam nota ini berserta balasannya?', hideConfirm: 'Sembunyikan nota ini daripada paparan umum?',
    invalid: 'Tulis antara 1 hingga 500 aksara.', error: 'Sesuatu tidak kena. Sila cuba lagi.', loadError: 'Nota tidak dapat dimuatkan. Sila cuba lagi.',
    authError: 'Log masuk tidak dapat diselesaikan. Sila cuba lagi.', rate: 'Sila tunggu seminit antara nota. Had harian ialah 10 nota.',
    blocked: 'Akaun ini tidak dapat menghantar nota.', duplicate: 'Anda telah berkongsi nota ini. Cuba mesej yang lain.',
    saved: 'Nota anda telah disiarkan. Terima kasih!', deleted: 'Nota dipadam.', hidden: 'Nota disembunyikan.', visitor: 'Pelawat',
    noSession: 'Sila log masuk semula untuk menghantar nota anda.', self: 'Anda', retry: 'Cuba lagi', count: 'aksara',
    draft: 'Draf disimpan dalam tab pelayar ini sehingga anda menghantar nota atau menutup tab.', rootRemoved: 'Nota ini tidak lagi tersedia. Cuba tinggalkan nota baharu.',
    authPreparing: 'Log masuk sedang disediakan. Anda boleh membaca nota atau menyapa melalui e-mel buat masa ini.',
  },
};

const fields = 'id,author_id,author_name,body,parent_id,created_at';
let sharedClient;
const memoryDrafts = new Map();

export function guestbookConfig(env = import.meta.env ?? {}) {
  const url = env.VITE_SUPABASE_URL?.trim();
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key || key.startsWith('sb_secret_')) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.pathname !== '/') return null;
    // A legacy anon JWT is acceptable, but a service-role JWT never belongs in a browser.
    if (key.split('.').length === 3) {
      const payload = JSON.parse(globalThis.atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role !== 'anon') return null;
    } else if (!key.startsWith('sb_publishable_')) return null;
    return { url: parsed.origin, key };
  } catch { return null; }
}

async function configuredClient() {
  const config = guestbookConfig();
  if (!config) return null;
  if (!sharedClient) sharedClient = import('@supabase/supabase-js').then(({ createClient }) => createClient(config.url, config.key, {
    auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'portfolio-guestbook-auth' },
  })).catch(error => { sharedClient = null; throw error; });
  return sharedClient;
}

export async function guestbookProviders(config, fetcher = globalThis.fetch) {
  if (!config) return { github: false, google: false };
  try {
    const response = await fetcher(`${config.url}/auth/v1/settings`, {
      headers: { apikey: config.key }, signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { github: false, google: false };
    const settings = await response.json();
    return { github: settings.external?.github === true, google: settings.external?.google === true };
  } catch { return { github: false, google: false }; }
}

export function validateNote(value) {
  const body = String(value ?? '').trim();
  return body.length > 0 && [...body].length <= 500 ? body : null;
}

function boundedError(error, text) {
  const detail = String(error?.message ?? '');
  if (detail.includes('guestbook_rate_limit')) return text.rate;
  if (detail.includes('guestbook_duplicate')) return text.duplicate;
  if (detail.includes('guestbook_blocked')) return text.blocked;
  if (detail.includes('guestbook_parent_missing')) return text.rootRemoved;
  if (detail.includes('guestbook_sign_in') || error?.code === 'PGRST301') return text.noSession;
  return text.error;
}

export function createGuestbookService(client) {
  return {
    async list(offset = 0) {
      const { data: roots, error } = await client.from('guestbook_notes').select(fields).is('parent_id', null).eq('hidden', false)
        .order('created_at', { ascending: false }).order('id', { ascending: false }).range(offset, offset + 19);
      if (error) throw error;
      let replies = [];
      if (roots?.length) {
        const result = await client.from('guestbook_notes').select(fields).in('parent_id', roots.map(note => note.id)).eq('hidden', false)
          .order('created_at', { ascending: true }).limit(500);
        if (result.error) throw result.error;
        replies = result.data ?? [];
      }
      return { roots: roots ?? [], replies, more: roots?.length === 20 };
    },
    async post(user, body, parentId = null) {
      if (!user) throw new Error('guestbook_sign_in');
      const result = await client.from('guestbook_notes').insert({ author_id: user.id, body, parent_id: parentId }).select(fields).single();
      if (result.error) throw result.error;
      return result.data;
    },
    async remove(id, hide = false) {
      const query = hide ? client.from('guestbook_notes').update({ hidden: true }) : client.from('guestbook_notes').delete();
      const result = await query.eq('id', id).select('id');
      if (result.error) throw result.error;
      if (!result.data?.length) throw new Error('guestbook_not_allowed');
    },
  };
}

/** Mount a native modal drawer. Cleanup is synchronous and safe during translation. */
export function mountGuestbook({ lang = 'en', document: doc = globalThis.document, client: injectedClient, onOpen, onClose } = {}) {
  const text = messages[lang === 'ms' ? 'ms' : 'en'];
  const win = doc.defaultView;
  const dialog = doc.createElement('dialog');
  dialog.id = 'guestbook-dialog';
  dialog.className = 'guestbook-drawer';
  dialog.setAttribute('aria-labelledby', 'guestbook-title');
  dialog.setAttribute('data-lenis-prevent', '');
  // Only fixed, repository-owned translations are interpolated. Visitor data always uses textContent.
  dialog.innerHTML = `<header class="guestbook-heading"><div><span class="guestbook-eyebrow">${text.eyebrow}</span><h2 id="guestbook-title">${text.title}</h2></div><button type="button" class="guestbook-close" aria-label="${text.close}" title="${text.close}"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M6 18 18 6"/></svg></button></header>
    <div class="guestbook-content"><p class="guestbook-intro">${text.intro}</p><p class="guestbook-status" role="status" aria-live="polite"></p>
    <div class="guestbook-unavailable" hidden><p>${text.unavailable}</p><a class="guestbook-primary" href="mailto:izzsyahfiq@gmail.com">${text.email}</a></div>
    <section class="guestbook-auth" hidden><p>${text.signIn}</p><div class="guestbook-providers"><button type="button" data-provider="github">${text.github}</button><button type="button" data-provider="google">${text.google}</button></div><p class="guestbook-auth-preparing" hidden>${text.authPreparing} <a href="mailto:izzsyahfiq@gmail.com">${text.email}</a></p></section>
    <form class="guestbook-composer" hidden><div class="guestbook-account"><span></span><button type="button" data-sign-out>${text.signOut}</button></div><div class="guestbook-reply-target" hidden><span></span><button type="button" data-cancel-reply>${text.cancelReply}</button></div><label for="guestbook-note">${text.label}</label><textarea id="guestbook-note" rows="4" maxlength="1000" placeholder="${text.placeholder}" aria-describedby="guestbook-counter guestbook-privacy" required></textarea><div class="guestbook-compose-footer"><span id="guestbook-counter">0 / 500 ${text.count}</span><button class="guestbook-primary" type="submit">${text.send}</button></div><p class="guestbook-draft-hint">${text.draft}</p></form>
    <p id="guestbook-privacy" class="guestbook-privacy">${text.privacy}</p><div class="guestbook-stream-heading"><h3>${lang === 'ms' ? 'Nota pelawat' : 'Visitor notes'}</h3><button type="button" data-refresh hidden>${text.refresh}</button></div><div class="guestbook-notes" aria-busy="false"></div><button class="guestbook-more" type="button" data-more hidden>${text.more}</button></div>`;
  doc.body.append(dialog);
  const $ = selector => dialog.querySelector(selector);
  const status = $('.guestbook-status');
  const notes = $('.guestbook-notes');
  const form = $('.guestbook-composer');
  const textarea = $('textarea');
  let alive = true;
  let client;
  let service;
  let user;
  let authSubscription;
  let trigger;
  let replyTarget = null;
  let offset = 0;
  let data = { roots: [], replies: [] };
  let busy = false;
  let listVersion = 0;
  let loaded = false;
  let loading = false;
  let providers = { github: false, google: false };
  const draftKey = () => `portfolio-guestbook-draft:${replyTarget ? `reply:${replyTarget.id}` : 'new-note'}`;
  const saveDraft = () => {
    memoryDrafts.set(draftKey(), textarea.value);
    try { win.sessionStorage.setItem(draftKey(), textarea.value); } catch { /* In-memory drafts remain available if tab storage is blocked. */ }
  };
  const restoreDraft = () => {
    try { textarea.value = win.sessionStorage.getItem(draftKey()) ?? memoryDrafts.get(draftKey()) ?? ''; }
    catch { textarea.value = memoryDrafts.get(draftKey()) ?? ''; }
    updateCounter();
  };
  const notify = (value, error = false) => {
    status.textContent = value;
    status.classList.toggle('is-error', error);
  };
  if (injectedClient || guestbookConfig()) notify(text.loading);
  function updateCounter() { $('#guestbook-counter').textContent = `${[...textarea.value.trim()].length} / 500 ${text.count}`; }
  function setBusy(value) {
    busy = value;
    form.querySelector('[type=submit]').disabled = value;
    form.querySelector('[type=submit]').textContent = value ? text.sending : text.send;
    textarea.disabled = value;
    $('[data-sign-out]').disabled = value;
  }
  function accountState() {
    if (!alive) return;
    $('.guestbook-auth').hidden = !client || Boolean(user);
    form.hidden = !client || !user;
    const name = user?.user_metadata?.full_name ?? user?.user_metadata?.user_name ?? text.visitor;
    $('.guestbook-account span').textContent = `${text.signedIn} ${String(name).slice(0, 60)}`;
    drawNotes();
  }
  function setReply(note) {
    saveDraft();
    replyTarget = note;
    restoreDraft();
    $('.guestbook-reply-target').hidden = !note;
    $('.guestbook-reply-target span').textContent = note ? `${text.replying} ${note.author_name}` : '';
    textarea.focus();
  }
  function action(label, callback) {
    const button = doc.createElement('button');
    button.type = 'button'; button.textContent = label;
    button.addEventListener('click', callback);
    return button;
  }
  function noteElement(note, isReply = false) {
    const article = doc.createElement('article');
    article.className = `guestbook-note${isReply ? ' guestbook-reply' : ''}`;
    const heading = doc.createElement('div'); heading.className = 'guestbook-note-meta';
    const name = doc.createElement('strong'); name.textContent = note.author_name || text.visitor;
    const date = doc.createElement('time');
    const parsed = new Date(note.created_at);
    if (Number.isFinite(parsed.getTime())) {
      date.dateTime = parsed.toISOString();
      date.textContent = new Intl.DateTimeFormat(lang === 'ms' ? 'ms-MY' : 'en-MY', { day: 'numeric', month: 'short', year: 'numeric' }).format(parsed);
    }
    heading.append(name, date);
    const body = doc.createElement('p'); body.textContent = note.body;
    article.append(heading, body);
    if (user) {
      const controls = doc.createElement('div'); controls.className = 'guestbook-note-actions';
      if (!isReply) controls.append(action(text.reply, () => setReply(note)));
      // This flag only controls the visible button. Database moderator membership controls authorization.
      const isModerator = user.app_metadata?.guestbook_moderator === true;
      if (note.author_id === user.id || isModerator) controls.append(action(note.author_id === user.id ? text.delete : text.hide, async () => {
        if (busy || !win.confirm(isModerator && note.author_id !== user.id ? text.hideConfirm : text.deleteConfirm)) return;
        setBusy(true);
        try {
          const hide = note.author_id !== user.id;
          await service.remove(note.id, hide);
          if (!alive) return;
          notify(hide ? text.hidden : text.deleted);
          if (replyTarget?.id === note.id) setReply(null);
          await loadNotes();
        } catch (error) { if (alive) notify(boundedError(error, text), true); }
        finally { if (alive) setBusy(false); }
      }));
      article.append(controls);
    }
    return article;
  }
  function drawNotes() {
    if (!alive) return;
    notes.replaceChildren();
    if (!data.roots.length && loaded && !loading) {
      const empty = doc.createElement('p'); empty.className = 'guestbook-empty'; empty.textContent = text.empty; notes.append(empty);
    }
    for (const note of data.roots) {
      const element = noteElement(note);
      for (const reply of data.replies.filter(item => item.parent_id === note.id)) element.append(noteElement(reply, true));
      notes.append(element);
    }
  }
  async function loadNotes(append = false) {
    if (!service || !alive) return;
    const version = ++listVersion;
    loading = true;
    notes.setAttribute('aria-busy', 'true');
    $('[data-refresh]').disabled = true;
    $('[data-more]').disabled = true;
    if (!loaded && !status.classList.contains('is-error')) notify(text.loading);
    try {
      const page = await service.list(append ? offset : 0);
      if (!alive || version !== listVersion) return;
      loaded = true;
      data = append ? { roots: [...new Map([...data.roots, ...page.roots].map(note => [note.id, note])).values()], replies: [...new Map([...data.replies, ...page.replies].map(note => [note.id, note])).values()] } : page;
      offset = append ? offset + page.roots.length : page.roots.length;
      $('[data-more]').hidden = !page.more;
      if (status.textContent === text.loading || status.textContent === text.loadError) notify('');
    } catch { if (alive && version === listVersion) notify(text.loadError, true); }
    finally {
      if (alive && version === listVersion) {
        loading = false; notes.setAttribute('aria-busy', 'false');
        $('[data-refresh]').disabled = false; $('[data-more]').disabled = false;
        drawNotes();
      }
    }
  }
  function open(event) {
    trigger = event?.target?.closest('[data-open-guestbook]') ?? doc.activeElement;
    if (!dialog.open) { dialog.showModal(); doc.body.classList.add('guestbook-open'); onOpen?.(); }
    if (service && !loaded && !loading) void loadNotes();
  }
  function close() { if (dialog.open) dialog.close(); }
  const onDocumentClick = event => {
    if (!event.target.closest?.('[data-open-guestbook]')) return;
    event.preventDefault(); open(event);
  };
  doc.addEventListener('click', onDocumentClick);
  $('.guestbook-close').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } });
  dialog.addEventListener('close', () => {
    saveDraft(); doc.body.classList.remove('guestbook-open'); onClose?.();
    if (alive && trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  textarea.addEventListener('input', () => { updateCounter(); saveDraft(); });
  $('[data-cancel-reply]').addEventListener('click', () => setReply(null));
  $('[data-refresh]').addEventListener('click', () => { void loadNotes(); });
  $('[data-more]').addEventListener('click', () => { void loadNotes(true); });
  $('[data-sign-out]').addEventListener('click', async () => {
    try {
      const { error } = await client.auth.signOut({ scope: 'local' });
      if (error) throw error;
      if (alive) { user = null; accountState(); }
    } catch { if (alive) notify(text.authError, true); }
  });
  for (const provider of dialog.querySelectorAll('[data-provider]')) provider.addEventListener('click', async () => {
    if (!providers[provider.dataset.provider]) return;
    provider.disabled = true;
    saveDraft();
    try {
      const redirect = new URL(win.location.pathname, win.location.origin);
      redirect.searchParams.set('guestbook', '1');
      const { error } = await client.auth.signInWithOAuth({ provider: provider.dataset.provider, options: { redirectTo: redirect.href } });
      if (error) throw error;
    } catch { if (alive) notify(text.authError, true); }
    finally { if (alive) provider.disabled = !providers[provider.dataset.provider]; }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    const body = validateNote(textarea.value);
    if (!body) { notify(text.invalid, true); textarea.focus(); return; }
    if (!user) { notify(text.noSession, true); return; }
    const sentDraftKey = draftKey();
    setBusy(true);
    try {
      await service.post(user, body, replyTarget?.id ?? null);
      memoryDrafts.delete(sentDraftKey);
      try { win.sessionStorage.removeItem(sentDraftKey); } catch { /* The saved in-memory draft was also cleared. */ }
      if (!alive) return;
      textarea.value = ''; replyTarget = null; $('.guestbook-reply-target').hidden = true; restoreDraft();
      notify(text.saved); await loadNotes();
    } catch (error) { if (alive) notify(boundedError(error, text), true); }
    finally { if (alive) setBusy(false); }
  });
  restoreDraft();
  const url = new URL(win.location.href);
  const authErrorKeys = ['error', 'error_code', 'error_description'];
  const fragment = new URLSearchParams(url.hash.slice(1));
  const callbackError = authErrorKeys.some(key => url.searchParams.has(key) || fragment.has(key));
  const authReturn = url.searchParams.get('guestbook') === '1';
  if (authReturn || callbackError) open();
  void (async () => {
    try {
      client = injectedClient ?? await configuredClient();
      if (!alive) return;
      if (!client) { $('.guestbook-unavailable').hidden = false; $('#guestbook-privacy').hidden = true; $('.guestbook-stream-heading').hidden = true; return; }
      service = createGuestbookService(client);
      $('[data-refresh]').hidden = false;
      const [initialization, result, availableProviders] = await Promise.all([
        client.auth.initialize?.() ?? Promise.resolve({ error: null }),
        client.auth.getSession(),
        injectedClient ? Promise.resolve(injectedClient.guestbookProviders ?? { github: true, google: true }) : guestbookProviders(guestbookConfig()),
      ]);
      if (!alive) return;
      providers = availableProviders;
      for (const provider of dialog.querySelectorAll('[data-provider]')) {
        provider.disabled = !providers[provider.dataset.provider];
        if (provider.disabled) provider.title = text.authPreparing;
      }
      $('.guestbook-auth-preparing').hidden = providers.github || providers.google;
      user = result.data?.session?.user ?? null;
      if (initialization.error || result.error || callbackError) notify(text.authError, true);
      if (authReturn || callbackError || initialization.error) {
        // The SDK can already have removed its callback fields. Start with the current
        // URL so cleanup never restores them, while retaining the drawer return flag.
        const cleanUrl = new URL(win.location.href);
        const callbackKeys = ['code', 'sb_flow_id', ...authErrorKeys];
        for (const key of callbackKeys) cleanUrl.searchParams.delete(key);
        const hashParams = new URLSearchParams(cleanUrl.hash.slice(1));
        if (authErrorKeys.some(key => hashParams.has(key))) {
          for (const key of callbackKeys) hashParams.delete(key);
          cleanUrl.hash = hashParams.toString();
        }
        win.history.replaceState(win.history.state, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
      }
      authSubscription = client.auth.onAuthStateChange((_event, session) => {
        if (!alive) return;
        user = session?.user ?? null;
        accountState();
      }).data.subscription;
      accountState();
      if (dialog.open) await loadNotes();
    } catch { if (alive) { notify(text.loadError, true); $('.guestbook-unavailable').hidden = false; } }
  })();
  return () => {
    saveDraft(); alive = false; listVersion++;
    authSubscription?.unsubscribe(); doc.removeEventListener('click', onDocumentClick);
    if (dialog.open) { dialog.close(); doc.body.classList.remove('guestbook-open'); onClose?.(); }
    dialog.remove();
  };
}
