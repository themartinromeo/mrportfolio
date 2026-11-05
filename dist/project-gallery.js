const french = document.documentElement.lang === 'fr';
const name = 'Martin Roméo';
const formats = {
  hafu:['Documentary','Documentaire'], survival:['TV series','Série télé'], foodies:['TV series','Série télé'],
  vide:['Short film','Court métrage'], champions:['TV series','Série télé'], cmqd:['TV series','Série télé'],
  secrets:['Music video','Vidéoclip'], ghosts:['Music video','Vidéoclip'], crystalline:['Music video','Vidéoclip'],
  indi:['Music visualizers','Visualiseurs musicaux']
};
const labels = {
  format: ['Format','Format'],
  year: ['Year','Année'], broadcaster: ['Broadcaster','Diffuseur'], label: ['Label','Maison de disques'],
  director: ['Director','Réalisation'], dp: ['Director of photography','Direction photo'],
  editor: ['Editor','Montage'], producer: ['Producer','Production'], color: ['Colourist','Étalonnage'],
  camera: ['Camera operator','Caméra']
};
const credits = {
  hafu: {year:'2025', broadcaster:'Unis TV', dp:name},
  survival: {year:'2025–2026', broadcaster:'Radio-Canada', dp:[name+' · 6 episodes',name+' · 6 épisodes'], editor:[name+' · 1 episode',name+' · 1 épisode']},
  foodies: {year:'2024–2025', broadcaster:'APTN', director:[name+' · 13 episodes',name+' · 13 épisodes']},
  vide: {year:'2022', dp:name, editor:name},
  champions: {year:'2025–2026', broadcaster:'TFO', dp:[name+' · Season 2',name+' · Saison 2'], editor:[name+' · Season 1, 1 episode',name+' · Saison 1, 1 épisode']},
  cmqd: {broadcaster:'Unis TV', dp:[name+' · Season 1',name+' · Saison 1'], editor:[name+' · Season 1',name+' · Saison 1'], director:[name+' · Season 2',name+' · Saison 2']},
  secrets: {year:'2020', label:'Atlantic Records', director:name, dp:name, editor:name},
  ghosts: {year:'2023', label:'Atlantic Records', director:name, editor:name},
  crystalline: {year:'2020', director:name, dp:name, editor:name},
  '1150245299': {broadcaster:'Radio-Canada', editor:name},
  '1150244901': {broadcaster:'Unis TV', editor:name, color:name},
  '823066763': {broadcaster:'APTN / Radio-Canada', editor:name, camera:name},
  '1122501694': {label:'Six Shooter Records', director:name, producer:name, editor:name},
  '843718272': {director:name, dp:name, editor:name},
  '467150416': {year:'2020', director:name, dp:name, editor:name},
  '613666745': {label:'Atlantic Records', dp:name, editor:name},
  '631166001': {director:name, dp:name, editor:name},
  '606684440': {label:'Six Shooter Records', dp:name, editor:name},
  '406924730': {broadcaster:'Bell TV', director:name}
};
const vimeo = {hafu:'1150249442',foodies:'1199231416',vide:'906847344',cmqd:'1043743626',secrets:'420878976',crystalline:'470453971'};
const frameCounts = {hafu:4,survival:4,foodies:1,vide:4,champions:3,cmqd:4,secrets:4,ghosts:3,crystalline:4,indi:4};
const dialog = document.createElement('dialog');
dialog.className = 'project-gallery';
dialog.setAttribute('aria-labelledby','gallery-title');
dialog.innerHTML = `<div class="gallery-heading"><h2 id="gallery-title"></h2><form method="dialog"><button autofocus>${french?'Fermer':'Close'} ×</button></form></div><div class="gallery-wall"></div><dl class="gallery-details"></dl><div class="gallery-video"><a class="action" target="_blank" rel="noopener">${french?'Voir sur Vimeo':'Watch on Vimeo'} ↗</a></div>`;
document.body.append(dialog);
const title = dialog.querySelector('h2');
const wall = dialog.querySelector('.gallery-wall');
const details = dialog.querySelector('dl');
const watch = dialog.querySelector('.gallery-video a');
let opener;

for (const article of document.querySelectorAll('.features article, .mosaic article')) {
  const trigger = article.querySelector('a, button');
  trigger.setAttribute('aria-haspopup','dialog');
  trigger.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = trigger;
    const id = article.id;
    const video = article.dataset.video;
    title.textContent = article.querySelector('h3').textContent;
    wall.replaceChildren();
    if (video) {
      const player = document.createElement('iframe');
      player.src = 'https://player.vimeo.com/video/' + video;
      player.title = title.textContent;
      player.allow = 'fullscreen; picture-in-picture';
      player.allowFullscreen = true;
      wall.append(player);
    } else {
      const cover = article.querySelector('img');
      wall.append(cover.cloneNode());
      for (let n=2; n<=frameCounts[id]; n++) {
        const still = new Image();
        still.src = `media/${id}-${n===2?'extra':n}.jpg`;
        still.alt = `${title.textContent} · ${french?'Image':'Still'} ${n}`;
        wall.append(still);
      }
    }
    details.replaceChildren();
    const entries = Object.entries(credits[id || video] || {});
    if (formats[id]) entries.push(['format', formats[id]]);
    for (const [role,value] of entries) {
      const cell = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = labels[role][Number(french)];
      definition.textContent = Array.isArray(value)?value[Number(french)]:value;
      cell.append(term,definition);
      details.append(cell);
    }
    details.hidden = !details.children.length;
    const videoId = video || vimeo[id];
    watch.hidden = !videoId;
    if (videoId) watch.href = 'https://vimeo.com/' + videoId;
    dialog.showModal();
    dialog.scrollTop = 0;
  });
}
dialog.addEventListener('close', () => {
  wall.replaceChildren();
  opener?.focus();
});

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const header = document.querySelector('header');
  const update = () => header.classList.toggle('past-title', heroTitle.getBoundingClientRect().bottom <= header.offsetHeight);
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();
}
