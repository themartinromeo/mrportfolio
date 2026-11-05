const photos = [
  ['rig', 'Martin Roméo operating a stabilized camera', 'Martin Roméo manie une caméra sur stabilisateur'],
  ['set', 'Martin Roméo watching the set with his arms crossed', 'Martin Roméo observe le plateau, les bras croisés'],
  ['blue', 'Martin Roméo behind a cinema camera on a blue-lit set', 'Martin Roméo derrière une caméra sur un plateau éclairé en bleu'],
  ['studio', 'Martin Roméo filming in a recording studio', 'Martin Roméo filme dans un studio d’enregistrement'],
];

const storageKey = 'martin-romeo-bio-photo';
let index = Math.floor(Math.random() * photos.length);
try {
  const previous = sessionStorage.getItem(storageKey);
  if (previous !== null) index = (Number(previous) + 1) % photos.length;
  sessionStorage.setItem(storageKey, String(index));
} catch {
  // Pick a photo independently when browser storage is unavailable.
}

const [name, english, french] = photos[index];
const portrait = document.querySelector('#bio-photo');
portrait.src = 'media/bio-' + name + '.jpg';
portrait.alt = document.documentElement.lang === 'fr' ? french : english;
