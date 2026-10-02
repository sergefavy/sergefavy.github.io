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
