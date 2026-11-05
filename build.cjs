const fs = require('node:fs');
process.chdir(require("node:path").join(__dirname, "dist"));

const roles = ['Director · Editor · Cinematographer','Réalisateur · Monteur · Directeur photo'];
const projects = [
 ['hafu','Hafu','2025','Unis TV','Cinematography','Direction photo','A man sits among hanging flowers and reflections','Un homme est assis parmi des fleurs suspendues et des reflets'],
 ['survival','Histoires de Survie','2025–2026','Radio-Canada','Cinematography (6 episodes) · Editing (1 episode)','Direction photo (6 épisodes) · Montage (1 épisode)','A woman reflected in a car mirror','Une femme se reflète dans le rétroviseur'],
 ['foodies','Métis Foodies','2024–2025','APTN','Direction (13 episodes)','Réalisation (13 épisodes)','Two women laughing over tea','Deux femmes rient autour d’une tasse de thé'],
 ['vide','L’Appel du Vide','2022','', 'Cinematography · Editing','Direction photo · Montage','Two figures suspended underwater','Deux personnages en suspension sous l’eau']
];
projects.push(...[
  [
    "champions",
    "Champions",
    "2025–2026",
    "TFO",
    "Cinematography, season 2",
    "Direction photo, saison 2",
    "Basketball player in a backlit gym",
    "Joueur de basketball dans un gymnase à contre-jour"
  ],
  [
    "cmqd",
    "C’est moi qui décide!",
    "2023",
    "Unis TV",
    "Cinematography · Editing, season 1",
    "Direction photo · Montage, saison 1",
    "Children in goggles at a backyard pool",
    "Des enfants en lunettes de plongée dans une piscine"
  ],
  [
    "secrets",
    "Faouzia — Secrets",
    "2020",
    "Atlantic Records",
    "Direction · Cinematography · Editing",
    "Réalisation · Direction photo · Montage",
    "A mirrored performance under violet light",
    "Une performance en miroir sous une lumière violette"
  ],
  [
    "ghosts",
    "viisi × Chelsea Collins — Chasing Ghosts",
    "2023",
    "Atlantic Records",
    "Direction · Editing",
    "Réalisation · Montage",
    "A man running at night",
    "Un homme court dans la nuit"
  ],
  [
    "crystalline",
    "Efflo — Crystalline",
    "2020",
    "",
    "Direction · Cinematography · Editing",
    "Réalisation · Direction photo · Montage",
    "A performer framed by dark film textures",
    "Une interprète entourée de textures sombres"
  ],
  [
    "indi",
    "Indi Star — Visualizers",
    "",
    "",
    "",
    "",
    "A performer in blue light",
    "Une interprète dans une lumière bleue"
  ]
]);
const credits = [
 ['Malgré Moi','Radio-Canada · 2025–2026','Editing, seasons 1–2','Montage, saisons 1 et 2'],
 ['Champions','TFO · 2025–2026','Editing, season 1 · Cinematography, season 2','Montage, saison 1 · Direction photo, saison 2'],
 ['C’est moi qui décide!','Unis TV · 2023–2024','Cinematography & editing, season 1 · Direction, season 2','Direction photo et montage, saison 1 · Réalisation, saison 2'],
 ['William Prince — Further From The Country','Six Shooter Records · 2026','Direction · Production · Editing','Réalisation · Production · Montage'],
 ['Faouzia × John Legend — The Today Show','Atlantic Records · 2020','Second unit direction · Production','Réalisation de la deuxième équipe · Production']
];
const vimeoWorks = [
 ['Malgré Moi', '1150245299', '2025–2026', 'Radio-Canada', 'Editing', 'Montage'],
 ['Banni', '1150244901', '2024', 'Unis TV', 'Editing · Colour', 'Montage · Étalonnage'],
 ['La Terre en Nous — Saison 2', '823066763', '2021', 'APTN / Radio-Canada', 'Editing · Camera', 'Montage · Caméra'],
 ['William Prince — Further From The Country', '1122501694', '2026', 'Six Shooter Records', 'Direction · Production · Editing', 'Réalisation · Production · Montage'],
 ['Clipwing — Last Call', '1184642141', '', '', '', ''],
 ['Jordan Heppner — Fenway', '843718272', '2023', '', 'Direction · Cinematography · Editing', 'Réalisation · Direction photo · Montage'],
 ['Arden Jones — Smile', '613666745', '2021', 'Atlantic Records', 'Cinematography · Editing', 'Direction photo · Montage'],
 ['Indi Star — Exposed', '631166001', '2021', '', 'Direction · Cinematography · Editing', 'Réalisation · Direction photo · Montage'],
 ['Boy Golden — KD and Lunch Meat', '606684440', '2021', 'Six Shooter Records', 'Cinematography · Editing', 'Direction photo · Montage'],
 ['Mobina Galore — Sorry I’m a Mess', '406924730', '2019', 'Bell TV', 'Direction', 'Réalisation'],
 ['viisi — Runner', '467150416', '2020', '', 'Direction · Cinematography · Editing', 'Réalisation · Direction photo · Montage']
];

// Reading order follows the mosaic from top left to bottom right.
const mosaicOrder = ['hafu','survival','foodies','vide','champions','crystalline','cmqd','secrets','ghosts','467150416','1150245299','1150244901','823066763','1122501694','1184642141','843718272','613666745','631166001','606684440','406924730','indi'];

for (const fr of [0,1]) {
 const names = fr?['Accueil','Bande démo','Projets','Bio']:['Home','Demo reel','Projects','Bio'];
 const paths = ['index','reel','projects','bio'].map(x=>x+(fr?'-fr':'')+'.html');
 const cards = (items, layout, home=false)=>{
  const projectTiles = items.map(([id,title,year,network,enRole,frRole,enAlt,frAlt])=>{
   const body = `<figure><img src="media/${id}.jpg${id==='vide'?'?v=20261104':''}" alt="${fr?frAlt:enAlt}" width="1920" height="1080" loading="lazy"></figure><div class="project-caption"><h3>${title}</h3><div class="credits">${[year,network,fr?frRole:enRole].filter(Boolean).join(' · ')}</div></div>`;
   return [id,`<article id="${id}">${home?`<a href="${paths[2]}#${id}">${body}</a>`:`<button class="project-open" type="button">${body}</button>`}</article>`];
  });
  if (home) return `<div class="${layout}">${projectTiles.map(([,tile])=>tile).join('')}</div>`;
  const videoTiles = vimeoWorks.map(([title,id,year,network,enRole,frRole])=>{
   const meta = [year,network,fr?frRole:enRole].filter(Boolean).join(' · ');
   return [id,`<article class="vimeo-tile" data-video="${id}"><a href="https://vimeo.com/${id}"><figure><img src="https://vumbnail.com/${id}.jpg" alt="" loading="lazy"></figure><div class="project-caption"><h3>${title}</h3>${meta?`<div class="credits">${meta}</div>`:''}</div></a></article>`];
  });
  const tiles = new Map([...projectTiles,...videoTiles]);
  return `<div class="mosaic project-tiles">${mosaicOrder.map(id=>tiles.get(id)).join('')}</div>`;
 };
 const title=(n)=>`<div class="tag">/ 0${n}</div><h1>${names[n]}</h1>`;
 const cv = fr?'Télécharger le CV':'Download CV';
 const download = `<a href="media/cv.pdf" download="Martin-Romeo-CV.pdf">${cv} ↓</a>`;
 const pages = [
  `<section class="hero"><video class="hero-video" data-src="media/music-reel.mp4" poster="media/hero.jpg" muted loop playsinline preload="none" aria-hidden="true"></video><button class="motion action" hidden data-play="${fr?'Lire le fond vidéo':'Play background video'}" data-pause="${fr?'Mettre le fond vidéo en pause':'Pause background video'}"></button><script src="motion.js" defer></script><div><span class="tag">${fr?'Cinéaste · Winnipeg, Manitoba':'Filmmaker · Winnipeg, Manitoba'}</span><h1>Martin <em>Roméo</em></h1><div class="credits" style="color:inherit">${roles[fr]}</div><a class="action" href="${paths[1]}">${names[1]} ↗</a></div></section><section class="featured"><div class="section-heading"><div class="tag">/ 01–02</div><h2>${fr?'À la une':'Featured work'}</h2></div>${cards(projects.filter(([id])=>id==='hafu'||id==='champions'), 'features', true)}</section><section class="wrap"><div class="tag">/ 03–10</div><h2>${fr?'Projets choisis':'Selected work'}</h2>${cards(projects.filter(([id])=>id!=='hafu'&&id!=='champions'), 'mosaic', true)}<a class="action" href="${paths[2]}">${fr?'Voir les crédits':'Explore credits'} ↗</a></section>`,
  `<section class="wrap reel-page">${title(1)}<figure class="stage"><video controls playsinline preload="metadata" poster="media/reel.jpg" src="media/music-reel.mp4" aria-label="${fr?'Bande démo de vidéoclips':'Music video reel'}"></video><figcaption class="credits">${fr?'Bande démo de vidéoclips':'Music video reel'} · 2021</figcaption></figure><a class="action" href="${paths[2]}">${fr?'Voir les projets':'Explore projects'} ↗</a></section>`,
  `<section class="wrap projects-page">${title(2)}${cards(projects, 'mosaic')}<h2 style="margin-top:1em">${fr?'Autres crédits':'More credits'}</h2><ul class="list">${credits.map(([name,meta,en,frText])=>`<li><strong>${name}</strong><span class="credits">${meta} · ${fr?frText:en}</span></li>`).join('')}</ul></section>`,
  `<section class="wrap">${title(3)}<div class="bio"><div><p>${fr?'Martin Roméo est un cinéaste francophone bilingue de Winnipeg, au Manitoba. Il travaille en réalisation, en montage et en direction photo pour la télévision, le documentaire et les projets musicaux.':'Martin Roméo is a bilingual Francophone filmmaker from Winnipeg, Manitoba. He directs, edits and shoots work across television, documentary and music.'}</p><p>${fr?'Ses crédits comprennent Malgré Moi (Radio-Canada), C’est moi qui décide! (Unis TV) et Métis Foodies (APTN). Il a également collaboré à des projets musicaux pour William Prince, Faouzia et John Legend.':'His credits include Malgré Moi (Radio-Canada), C’est moi qui décide! (Unis TV) and Métis Foodies (APTN). His music work includes projects for William Prince, Faouzia and John Legend.'}</p><p>${fr?'Il est membre de la Guilde canadienne des réalisateurs et diplômé de l’ASC Masterclass.':'He is a member of the Directors Guild of Canada and a graduate of the ASC Masterclass.'}</p><div class="action">${download}</div></div><figure><img id="bio-photo" src="media/bio-rig.jpg" alt="${fr?'Martin Roméo manie une caméra sur stabilisateur':'Martin Roméo operating a stabilized camera'}"><figcaption class="credits">${fr?'En coulisses':'Behind the scenes'}</figcaption></figure><script src="bio-photos.js" defer></script></div></section>`
 ];
 pages.forEach((body,i)=>{
  const alt = ['index','reel','projects','bio'][i]+(fr?'':'-fr')+'.html';
  fs.writeFileSync(paths[i],`<!doctype html><html lang="${fr?'fr':'en'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Martin Roméo · ${roles[fr]}"><title>${i?names[i]+' — ':''}Martin Roméo</title><link rel="stylesheet" href="style.css?v=20261104c"><header><a class="brand" href="${paths[0]}">Martin Roméo</a><nav aria-label="${fr?'Navigation principale':'Main navigation'}">${[1,2,3].map(j=>`<a href="${paths[j]}"${i===j?' aria-current="page"':''}>${names[j]}</a>`).join('')}${download}<a href="${alt}" lang="${fr?'en':'fr'}" aria-label="${fr?'English':'Français'}">${fr?'EN':'FR'}</a></nav></header><main>${body}</main>${i===0||i===2?'<script src="project-gallery.js?v=20261104b" defer></script>':''}<footer><span>Martin Roméo · Winnipeg, MB</span><a href="mailto:themartinromeo@gmail.com">Contact ↗</a></footer></html>`);
 });
}
