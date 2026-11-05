const french = document.documentElement.lang === 'fr';
const labels = french
  ? ['Fermer', 'Image précédente', 'Image suivante', 'Crédits', 'Format', 'Image']
  : ['Close', 'Previous still', 'Next still', 'Credits', 'Format', 'Frame'];
const formats = {
  hafu: ['Documentary', 'Documentaire'],
  survival: ['Television', 'Télévision'],
  foodies: ['Television', 'Télévision'],
  vide: ['Short film', 'Court métrage'],
  champions: ['Television', 'Télévision'],
  cmqd: ['Television', 'Télévision'],
  secrets: ['Music video', 'Vidéoclip'],
  ghosts: ['Music video', 'Vidéoclip'],
  crystalline: ['Music video', 'Vidéoclip'],
  indi: ['Music visualizers', 'Visualiseurs musicaux']
};

const vimeo = {
  hafu: '1150249442',
  foodies: '1199231416',
  vide: '906847344',
  cmqd: '1043743626',
  secrets: '420878976',
  crystalline: '470453971'
};

const dialog = document.createElement('dialog');
dialog.className = 'project-gallery';
dialog.setAttribute('aria-labelledby', 'gallery-title');
dialog.innerHTML = `
  <div class="gallery-heading">
    <h2 id="gallery-title"></h2>
    <button type="button" class="gallery-close" autofocus>${labels[0]} ×</button>
  </div>
  <div class="gallery-track"></div>
  <div class="gallery-navigation">
    <button type="button" aria-label="${labels[1]}">←</button>
    <output aria-live="polite"></output>
    <button type="button" aria-label="${labels[2]}">→</button>
  </div>
  <dl class="gallery-details">
    <dt>${labels[3]}</dt><dd></dd>
    <dt>${labels[4]}</dt><dd></dd>
  </dl>
  <div class="gallery-video"><a class="action" hidden target="_blank" rel="noopener">${french ? 'Voir sur Vimeo' : 'Watch on Vimeo'} ↗</a></div>`;
document.body.append(dialog);

const track = dialog.querySelector('.gallery-track');
const title = dialog.querySelector('h2');
const navigation = dialog.querySelector('.gallery-navigation');
const [previous, next] = navigation.querySelectorAll('button');
const [credits, format] = dialog.querySelectorAll('dd');
const watch = dialog.querySelector('.gallery-video a');
const counter = navigation.querySelector('output');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let opener;

function currentFrame() {
  return Math.round(track.scrollLeft / track.clientWidth) || 0;
}

function updateCounter() {
  const frame = currentFrame();
  const total = track.children.length;
  counter.textContent = `${frame + 1} / ${total}`;
  previous.disabled = frame === 0;
  next.disabled = frame >= total - 1;
}

function move(direction) {
  const frame = Math.max(0, Math.min(track.children.length - 1, currentFrame() + direction));
  track.scrollTo({ left: frame * track.clientWidth, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
}

for (const article of document.querySelectorAll('.features article, .mosaic article')) {
  const trigger = article.querySelector('a, button');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = trigger;
    title.textContent = article.querySelector('h3').textContent;
    credits.textContent = article.querySelector('.credits').textContent || '—';
    format.textContent = formats[article.id][Number(french)];
    const videoId = vimeo[article.id];
    watch.hidden = !videoId;
    if (videoId) watch.href = 'https://vimeo.com/' + videoId;
    else watch.removeAttribute('href');
    const cover = article.querySelector('img');
    const frames = [[cover.getAttribute('src'), cover.alt]];
    if (article.id !== 'foodies') {
      frames.push([`media/${article.id}-extra.jpg`, `${title.textContent} · ${labels[5]} 2`]);
    }
    track.replaceChildren(...frames.map(([src, alt]) => {
      const image = new Image();
      image.src = src;
      image.alt = alt;
      return image;
    }));
    dialog.showModal();
    track.scrollLeft = 0;
    navigation.hidden = frames.length === 1;
    updateCounter();
  });
}

track.addEventListener('scroll', updateCounter, { passive: true });
previous.addEventListener('click', () => move(-1));
next.addEventListener('click', () => move(1));
dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
