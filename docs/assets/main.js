const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
function updateThemeButton() {
  if (!themeButton) return;
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', `Activer le thème ${dark ? 'clair' : 'sombre'}`);
  themeButton.setAttribute('aria-pressed', String(dark));
}
updateThemeButton();
themeButton?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
  updateThemeButton();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  if (!saved) { root.dataset.theme = matches ? 'dark' : 'light'; updateThemeButton(); }
});
const menu = document.querySelector('#menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-label', 'Ouvrir le menu'); }
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', `${open ? 'Fermer' : 'Ouvrir'} le menu`);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });

const toolbar = document.querySelector('.project-toolbar');
const results = document.querySelector('.project-results');
if (toolbar) toolbar.hidden = false;
if (results) results.hidden = false;
const cards = Array.from(document.querySelectorAll('#projets .project-card'));
const search = document.querySelector('#project-search');
const filters = Array.from(document.querySelectorAll('[data-filter]'));
const normalize = value => value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
let selected = 'Tous';
function applyFilters() {
  const query = normalize(search?.value || '').trim();
  const words = query.split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const matchesCategory = selected === 'Tous' || JSON.parse(card.dataset.categories).includes(selected);
    const text = normalize(card.dataset.search);
    card.hidden = !(matchesCategory && words.every(word => text.includes(word)));
    if (!card.hidden) count++;
  }
  document.querySelector('#results-count').textContent = `${count} projet${count > 1 ? 's' : ''}`;
  document.querySelector('#empty-projects').hidden = count !== 0;
  document.querySelector('#reset-filters').hidden = selected === 'Tous' && !query;
  requestAnimationFrame(() => { gallery?.scrollTo({ left: 0, behavior: 'instant' }); updateGallery(); });
  filters.forEach(button => { const active = button.dataset.filter === selected; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
}
filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; applyFilters(); }));
search?.addEventListener('input', applyFilters);
function resetFilters() { selected = 'Tous'; search.value = ''; applyFilters(); }
document.querySelector('#reset-filters')?.addEventListener('click', resetFilters);
document.querySelector('#empty-reset')?.addEventListener('click', resetFilters);
document.querySelector('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(button.dataset.email);
    button.setAttribute('aria-label', 'Adresse email copiée');
    document.querySelector('#copy-status').textContent = 'Adresse email copiée.';
  } catch { document.querySelector('#copy-status').textContent = 'La copie est indisponible. Vous pouvez sélectionner l’adresse email.'; }
});

const gallery = document.querySelector('#project-gallery');
const galleryControls = document.querySelector('.gallery-controls');
const previous = document.querySelector('.gallery-prev');
const next = document.querySelector('.gallery-next');
function updateGallery() {
  if (!gallery) return;
  previous.disabled = gallery.scrollLeft < 5;
  next.disabled = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 5;
}
function moveGallery(direction) {
  const card = cards.find(card => !card.hidden);
  const step = card ? card.getBoundingClientRect().width + 22 : gallery.clientWidth;
  gallery.scrollBy({ left: direction * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
if (gallery) {
  galleryControls.hidden = false;
  previous.addEventListener('click', () => moveGallery(-1));
  next.addEventListener('click', () => moveGallery(1));
  gallery.addEventListener('scroll', updateGallery, { passive: true });
  new ResizeObserver(updateGallery).observe(gallery);
  gallery.addEventListener('keydown', event => {
    if (event.target !== gallery || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    moveGallery(event.key === 'ArrowRight' ? 1 : -1);
  });
  updateGallery();
}
document.querySelectorAll('[data-domain]').forEach(link => link.addEventListener('click', () => {
  selected = link.dataset.domain;
  search.value = '';
  applyFilters();
}));

// Animate only when the reader has not requested reduced motion. Content is
// always present and readable; there is no hidden-until-JavaScript state.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('#motion-toggle');
let motionOff = false;
try { motionOff = localStorage.getItem('portfolio-motion') === 'off'; } catch {}
const activeEntrances = new Set();
function motionAllowed() { return !motionOff && !reducedMotion.matches; }
function syncMotion() {
  root.dataset.motion = motionAllowed() ? 'on' : 'off';
  if (motionToggle) {
    motionToggle.hidden = reducedMotion.matches;
    motionToggle.textContent = motionOff ? 'Activer les animations' : 'Désactiver les animations';
    motionToggle.setAttribute('aria-pressed', String(motionOff));
  }
  if (!motionAllowed()) activeEntrances.forEach(animation => animation.cancel());
  queueStory();
}
motionToggle?.addEventListener('click', () => {
  motionOff = !motionOff;
  try { localStorage.setItem('portfolio-motion', motionOff ? 'off' : 'on'); } catch {}
  syncMotion();
});
reducedMotion.addEventListener('change', syncMotion);
const entrances = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entrances.unobserve(entry.target);
    if (!motionAllowed()) continue;
    const animation = entry.target.animate([
      { opacity: .3, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
    activeEntrances.add(animation);
    animation.finished.catch(() => {}).finally(() => activeEntrances.delete(animation));
  }
}, { threshold: .12 });
document.querySelectorAll('.section-heading,.profile-layout,.skill-card,.cv-card,.timeline li,.story-step,.journey-preview,.page-intro').forEach(element => entrances.observe(element));
const story = document.querySelector('.story-layout');
const storyObject = document.querySelector('.story-object');
const storyHalo = document.querySelector('.story-halo');
const storySignal = document.querySelector('.story-signal');
let storyFrame = 0;
function drawStory() {
  storyFrame = 0;
  if (!story) return;
  if (!motionAllowed()) {
    storyObject.style.transform = '';
    storyHalo.style.transform = '';
    storySignal.style.opacity = '';
    storySignal.style.removeProperty('--signal');
    return;
  }
  const rect = story.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (innerHeight * .35 - rect.top) / Math.max(1, rect.height - innerHeight * .5)));
  storyObject.style.transform = `perspective(900px) rotateY(${-15 + progress * 30}deg) rotateZ(${-7 + progress * 14}deg) scale(${.86 + progress * .18})`;
  storyHalo.style.transform = `scale(${.85 + progress * .65})`;
  storySignal.style.opacity = String(.2 + progress * .8);
  storySignal.style.setProperty('--signal', String(progress));
}
function queueStory() { if (story && !storyFrame) storyFrame = requestAnimationFrame(drawStory); }
if (story) {
  addEventListener('scroll', queueStory, { passive: true });
  addEventListener('resize', queueStory, { passive: true });
}
syncMotion();
