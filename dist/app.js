const LG=document.documentElement.lang==='fr'?'fr':'en',$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const pad=n=>String(n).padStart(2,'0');
const T={en:{all:'All',D:'Director',E:'Editor',P:'Cinematographer',close:'Close',vim:'Watch on Vimeo',prev:'Previous stills',next:'Next stills',watch:'Watch the full video',snd:['Sound on','Sound off'],still:'Still from',on:'On Vimeo',grp:'Show work by role',back:['Back to video','Back to slideshow'],play:['Pause','Play']},
fr:{all:'Tout',D:'Réalisateur',E:'Monteur',P:'Directeur photo',close:'Fermer',vim:'Voir sur Vimeo',prev:'Images précédentes',next:'Images suivantes',watch:'Voir la vidéo complète',snd:['Activer le son','Couper le son'],still:'Image de',on:'Sur Vimeo',grp:'Filtrer par rôle',back:['Retour à la vidéo','Retour au diaporama'],play:['Pause','Lecture']}}[LG];
// r: D director, E editor, P cinematographer. s/c/n: stills folder, cover, count
const P=[
{id:'malgre',t:'Malgré Moi',src:'media/malgre-moi.jpg',n:0,r:'E',alt:'Malgré Moi, Radio-Canada',en:'2025–2026 · Radio-Canada · Editor, seasons 1–2',fr:'2025–2026 · Radio-Canada · Monteur, saisons 1–2'},
{id:'wp',t:'William Prince - Further From The Country',s:'william-prince',c:1,n:15,r:'DE',alt:'William Prince, Further From The Country',en:'2026 · Six Shooter Records · Director · Editor',fr:'2026 · Six Shooter Records · Réalisateur · Monteur'},
{id:'champions',t:'Champions',s:'champions',c:3,n:35,r:'PE',alt:'Basketball player in a backlit gym',en:'2025–2026 · TFO · Cinematographer · Editor',fr:'2025–2026 · TFO · Directeur photo · Monteur'},
{id:'foodies',t:'Métis Foodies',s:'metis-foodies',c:1,n:5,r:'DPE',alt:'Two women laughing over tea',en:'2024–2025 · APTN · Director · Cinematographer · Editor',fr:'2024–2025 · APTN · Réalisateur · Directeur photo · Monteur'},
{id:'hafu',t:'Hafu',s:'hafu',c:14,n:17,r:'P',alt:'A man sits among hanging flowers and reflections',en:'2025 · Unis TV · Cinematographer',fr:'2025 · Unis TV · Directeur photo'},
{id:'survival',t:'Histoires de Survie',s:'hds',c:2,n:12,r:'PE',alt:'A woman reflected in a car mirror',en:'2025–2026 · Radio-Canada · Cinematographer · Editor',fr:'2025–2026 · Radio-Canada · Directeur photo · Monteur'},
{id:'blizzard',t:'Expédition Blizzard',s:'blizzard',c:7,n:16,r:'P',alt:'A man in a wool hat and scarf in a snowy forest',en:'2023–2024 · TVA · Reality series · Cinematographer',fr:'2023–2024 · TVA · Série de téléréalité · Directeur photo'},
{id:'vide',t:'L’Appel du Vide',s:'appel-du-vide',c:11,n:12,r:'PE',alt:'Two figures suspended underwater',en:'2022 · Cinematographer · Editor',fr:'2022 · Directeur photo · Monteur'},
{id:'cmqd',t:'C’est moi qui décide!',s:'cmqd',c:5,n:16,r:'DPE',alt:'Children in goggles at a backyard pool',en:'2023–2024 · Unis TV · Director · Cinematographer · Editor',fr:'2023–2024 · Unis TV · Réalisateur · Directeur photo · Monteur'},
{id:'secrets',t:'Faouzia - Secrets',s:'secrets',c:7,n:7,r:'DPE',alt:'A mirrored performance under violet light',en:'2020 · Atlantic Records · Director · Cinematographer · Editor',fr:'2020 · Atlantic Records · Réalisateur · Directeur photo · Monteur'},
{id:'ghosts',t:'viisi × Chelsea Collins - Chasing Ghosts',s:'chasing-ghosts',c:2,n:4,r:'DE',alt:'A man running at night',en:'2023 · Atlantic Records · Director · Editor',fr:'2023 · Atlantic Records · Réalisateur · Monteur'},
{id:'crystalline',t:'Efflo - Crystalline',s:'crystalline',c:3,n:12,r:'DPE',alt:'A performer framed by dark film textures',en:'2020 · Director · Cinematographer · Editor',fr:'2020 · Réalisateur · Directeur photo · Monteur'},
{id:'indi',t:'Indi Star - Visualizers',s:'indi-star',c:2,n:11,r:'PE',alt:'A performer in blue light',en:'2022 · Cinematographer · Editor',fr:'2022 · Directeur photo · Monteur'}];
const V=[
['viisi - Runner','467150416','DPE','2020 · Director · Cinematographer · Editor','2020 · Réalisateur · Directeur photo · Monteur'],
['Cancelled','1150244901','E','2024 · Unis TV · Editor · Colorist','2024 · Unis TV · Monteur · Étalonneur'],
['La Terre en Nous','823066763','EP','2021 · APTN / Radio-Canada · Editor · Camera','2021 · APTN / Radio-Canada · Monteur · Caméra'],
['Clipwing - Last Call','1184642141','DE','Director · Editor','Réalisateur · Monteur'],
['Jordan Heppner - Fenway','843718272','DPE','2023 · Director · Cinematographer · Editor','2023 · Réalisateur · Directeur photo · Monteur'],
['Arden Jones - Smile','613666745','PE','2021 · Atlantic Records · Cinematographer · Editor','2021 · Atlantic Records · Directeur photo · Monteur'],
['Indi Star - Exposed','631166001','PE','2022 · Cinematographer · Editor','2022 · Directeur photo · Monteur'],
['Boy Golden - KD and Lunch Meat','606684440','PE','2021 · Six Shooter Records · Cinematographer · Editor','2021 · Six Shooter Records · Directeur photo · Monteur'],
['Mobina Galore - Whiskey Water','701899917','','',''],
['William Prince - NPR Tiny Desk','638796408','','',''],
['Sadye - Social Media','941435606','','',''],
['viisi - Social Media','930325239','','',''],
['Mobina Galore - Sorry I’m a Mess','406924730','D','2019 · Bell TV · Director','2019 · Bell TV · Réalisateur']];
const M=[
['Les faillites d’Astrid','','Radio-Canada · 2025','Radio-Canada · 2025'],
['Champions','PE','TFO · 2025–2026 · Editor, season 1 · Cinematographer, season 2','TFO · 2025–2026 · Monteur, saison 1 · Directeur photo, saison 2'],
['C’est moi qui décide!','DPE','Unis TV · 2023–2024 · Cinematographer and editor, season 1 · Director, season 2','Unis TV · 2023–2024 · Directeur photo et monteur, saison 1 · Réalisateur, saison 2'],
['Faouzia × John Legend - The Today Show','D','Atlantic Records · 2020 · Second unit director · Producer','Atlantic Records · 2020 · Réalisateur, deuxième équipe · Production']];

// role toggles (header): pink = on, white = off and that work is muted. Any combination; remembered between pages
let roles=['D','E','P'];try{const q=localStorage.getItem('mr-roles');if(q!==null)roles=q.split('').filter(k=>'DEP'.includes(k))}catch(e){}
function applyRole(){
  $$('[data-r]').forEach(el=>{const r=el.dataset.r,d=r!==''&&![...r].some(k=>roles.includes(k));el.classList.toggle('dim',d);if(el.matches('.row'))el.setAttribute('aria-hidden',d)});
  $$('.roles button').forEach(b=>b.setAttribute('aria-pressed',roles.includes(b.dataset.k)));
}
function mountRoles(){
  const h=$('.roles');if(!h)return;
  h.setAttribute('aria-label',T.grp);
  h.innerHTML=['D','E','P'].map(k=>`<button type="button" data-k="${k}" aria-pressed="true">${T[k]}</button>`).join('');
  h.onclick=e=>{const b=e.target.closest('button');if(!b)return;const k=b.dataset.k;roles=roles.includes(k)?roles.filter(x=>x!==k):[...roles,k];try{localStorage.setItem('mr-roles',roles.join(''))}catch(x){}applyRole()};
}
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// Champions: lean on the basketball / swimming / windsurf frames, with the odd tropical one mixed in
const FAV={champions:[1,2,3,4,5,6,7,8,9,12,14,15,16,17,24,28]};
const ord=(s,n)=>{const f=FAV[s];if(!f)return shuf(Array.from({length:n},(_,i)=>i+1));
  const rest=shuf(Array.from({length:n},(_,i)=>i+1).filter(i=>!f.includes(i))).slice(0,Math.ceil(f.length*.2));
  return shuf([...f,...rest])};
const th=(s,n)=>`stills/${s}/t/${pad(n)}.jpg`;
const cov={};const cover=p=>p.src||th(p.s,cov[p.id]||(cov[p.id]=(FAV[p.s]?shuf(FAV[p.s]):ord(p.s,p.n))[0]));
const ttl=t=>{const i=t.indexOf(' - ');return i<0?t:`<span class="ar">${t.slice(0,i)}</span><span class="pr">${t.slice(i+3)}</span>`};
const card=p=>`<button class="card" data-id="${p.id}" data-r="${p.r}"><div class="ph"><img src="${cover(p)}" alt="${p.alt}" loading="lazy" onerror="this.style.display='none'"></div><div class="cap"><h3>${ttl(p.t)}</h3>${p[LG]?`<small>${p[LG]}</small>`:''}</div></button>`;
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
if($('#feat'))$('#feat').innerHTML=['malgre','wp','champions','foodies'].map(i=>card(byId[i])).join('');
const row=p=>`<article class="row" data-r="${p.r}" data-id="${p.id}"><header><div><h3>${ttl(p.t)}</h3>${p[LG]?`<p>${p[LG]}</p>`:''}</div><div class="rctl"><button class="rb" data-d="-1" aria-label="${T.prev}">‹</button><button class="rb" data-d="1" aria-label="${T.next}">›</button></div></header><div class="track" tabindex="0" role="region" aria-label="${p.t}"><div class="strip2">${ord(p.s,p.n).map(k=>[AR[p.s][k-1],k-1]).map(([r,i])=>`<button class="fr" data-id="${p.id}" data-k="${i+1}" style="--ar:${r}"><img draggable="false" src="${th(p.s,i+1)}" alt="${T.still} ${p.t}, ${i+1}/${p.n}" loading="lazy" decoding="async"></button>`).join('')}</div></div><i class="bar"></i></article>`;
if($('#sel'))$('#sel').innerHTML=P.filter(p=>!['malgre','wp','champions','foodies'].includes(p.id)).map(row).join('');

const vimeoUrl=id=>`https://vimeo.com/${id}`;
const VA={'941435606':9/16,'930325239':9/16,'843718272':2.39};   // original shapes: vertical socials, anamorphic Fenway
const onFront=['631166001'];   // Indi Star - Exposed already lives in the Indi Star row on the home page
if($('#all'))$('#all').innerHTML=V.filter(v=>!onFront.includes(v[1])).map(v=>{const m=v[LG==='fr'?4:3];return `<a class="card" data-ar="${VA[v[1]]||16/9}" href="${vimeoUrl(v[1])}" data-v="${v[1]}" data-t="${v[0]}" data-m="${m}" data-r="${v[2]}"><div class="ph"><img src="https://vumbnail.com/${v[1]}.jpg" alt="${v[0]}" loading="lazy" onerror="this.style.display='none'"></div><div class="cap"><h3>${ttl(v[0])}</h3>${m?`<small>${m}</small>`:''}</div></a>`}).join('');
const jx=$('#all.jx');
if(jx){const fit=()=>{const W=jx.clientWidth,H=innerWidth<700?190:300,g=4,cs=[...jx.children];let row=[],sum=0;
    const flush=(last)=>{if(!row.length)return;const avail=W-g*(row.length-1);let h=avail/sum;if(last&&h>H*1.25)h=H;row.forEach(c=>{const ar=+c.dataset.ar;c.style.width=(h*ar)+'px';c.style.height=h+'px'});row=[];sum=0};
    cs.forEach((c,i)=>{const ar=+c.dataset.ar;row.push(c);sum+=ar;if((sum*H+g*(row.length-1))>=W)flush(false)});flush(true)};
  fit();addEventListener('resize',fit);document.fonts&&document.fonts.ready.then(fit)}
if($('#vim'))$('#vim').innerHTML=V.map(v=>`<li data-r="${v[2]}"><a href="${vimeoUrl(v[1])}" data-v="${v[1]}" data-t="${v[0]}" data-m="${v[LG==='fr'?4:3]}"><strong><span class="ply" aria-hidden="true">▶</span>${v[0]}</strong><span>${v[LG==='fr'?4:3]}</span></a></li>`).join('');
if($('#more'))$('#more').innerHTML=M.map(m=>`<li data-r="${m[1]}"><b>${m[0]}</b><span>${m[LG==='fr'?3:2]}</span></li>`).join('');
mountRoles();applyRole();

// ghost window: looping video, 3–6 stills and production details
const VID={malgre:{vimeo:'1150245299'},crystalline:{vimeo:'470453971'},foodies:{vimeo:'1199231416',h:'461a5e30e3'},hafu:{vimeo:'1150249442'},cmqd:{vimeo:'1043743626'},indi:{vimeo:'631166001'},wp:{vimeo:'1122501694'}}; // add {vimeo:'ID'} or {src:'media/clips/x.mp4'} for the others
const INFO={
hafu:[['Year','Année','2025','2025'],['Network','Diffuseur','Unis TV','Unis TV'],['Format','Format','Documentary','Documentaire'],['Role','Rôle','Cinematographer','Directeur photo']],
champions:[['Years','Années','2025–2026','2025–2026'],['Network','Diffuseur','TFO','TFO'],['Format','Format','Series','Série'],['Cinematographer','Directeur photo','Season 2 · 13 episodes','Saison 2 · 13 épisodes'],['Editor','Monteur','Season 1 · 1 episode','Saison 1 · 1 épisode']],
survival:[['Years','Années','2025–2026','2025–2026'],['Network','Diffuseur','Radio-Canada','Radio-Canada'],['Format','Format','Series','Série'],['Cinematographer','Directeur photo','6 episodes','6 épisodes'],['Editor','Monteur','1 episode','1 épisode']],
foodies:[['Years','Années','2024–2025','2024–2025'],['Network','Diffuseur','APTN','APTN'],['Format','Format','Series','Série'],['Director','Réalisateur','Janelle Wookey · Martin LaFrenière · 13 episodes','Janelle Wookey · Martin LaFrenière · 13 épisodes'],['Cinematographer','Directeur photo','Martin LaFrenière · Jesse De Rocquigny','Martin LaFrenière · Jesse De Rocquigny'],['Editor','Monteur','Martin LaFrenière · Fabian Velasco','Martin LaFrenière · Fabian Velasco']],
vide:[['Year','Année','2022','2022'],['Format','Format','Short film','Court métrage'],['Roles','Rôles','Cinematographer · Editor','Directeur photo · Monteur']],
cmqd:[['Years','Années','2023–2024','2023–2024'],['Network','Diffuseur','Unis TV','Unis TV'],['Format','Format','Series','Série'],['Season 1','Saison 1','Cinematographer · Editor · 14 episodes','Directeur photo · Monteur · 14 épisodes'],['Season 2','Saison 2','Director · 13 episodes','Réalisateur · 13 épisodes']],
secrets:[['Year','Année','2020','2020'],['Label','Étiquette','Atlantic Records','Atlantic Records'],['Format','Format','Music video','Vidéoclip'],['Artist','Artiste','Faouzia','Faouzia'],['Roles','Rôles','Director · Cinematographer · Editor','Réalisateur · Directeur photo · Monteur']],
ghosts:[['Year','Année','2023','2023'],['Label','Étiquette','Atlantic Records','Atlantic Records'],['Format','Format','Music video','Vidéoclip'],['Artist','Artiste','viisi × Chelsea Collins','viisi × Chelsea Collins'],['Roles','Rôles','Director · Editor','Réalisateur · Monteur']],
crystalline:[['Year','Année','2020','2020'],['Format','Format','Music video','Vidéoclip'],['Artist','Artiste','Efflo','Efflo'],['Roles','Rôles','Director · Cinematographer · Editor','Réalisateur · Directeur photo · Monteur']],
wp:[['Year','Année','2026','2026'],['Label','Étiquette','Six Shooter Records','Six Shooter Records'],['Format','Format','Album trailer · Music videos','Bande-annonce d’album · Vidéoclips'],['Artist','Artiste','William Prince','William Prince'],['Roles','Rôles','Director · Producer · Editor','Réalisateur · Production · Monteur']],
indi:[['Year','Année','2022','2022'],['Format','Format','Visualizers','Visualiseurs'],['Artist','Artiste','Indi Star','Indi Star'],['Roles','Rôles','Cinematographer · Editor','Directeur photo · Monteur']],
malgre:[['Years','Années','2025–2026','2025–2026'],['Network','Diffuseur','Radio-Canada','Radio-Canada'],['Format','Format','Series','Série'],['Editor','Monteur','Seasons 1–2','Saisons 1–2']],
blizzard:[['Years','Années','2023–2024','2023–2024'],['Network','Diffuseur','TVA','TVA'],['Format','Format','Reality series · 8 episodes','Série de téléréalité · 8 épisodes'],['Role','Rôle','Cinematographer','Directeur photo']]};
const gw=$('#lb');let slide=null;
const pick=(n,s)=>ord(s,n);
let stageHTML='',slideOn=false;
const vmsg=(m)=>{const f=$('#vd iframe');if(f&&f.contentWindow)f.contentWindow.postMessage(JSON.stringify(m),'*')};
function wireStage(){
  const vv=$('#vd video'),sb=$('#snd'),fr=$('#vd iframe');
  if(sb){let on=false;sb.onclick=()=>{on=!on;if(vv){vv.muted=!on;if(on)vv.play()}else{vmsg({method:'setMuted',value:!on});vmsg({method:'setVolume',value:on?1:0});if(on)vmsg({method:'play'})}sb.textContent=on?T.snd[1]:T.snd[0]}}
}
function showStill(src,hasVideo){
  clearInterval(slide);
  $('#vd').hidden=false;
  $('#vd').innerHTML=`<img class="big" src="${src}" alt=""><button class="sound back" id="bk" type="button">${hasVideo?T.back[0]:T.back[1]}</button>`;
  $('#bk').onclick=restoreStage;
}
function restoreStage(){
  $$('#sg img').forEach(i=>i.classList.remove('on'));
  $('#vd').innerHTML=stageHTML;$('#vd').hidden=!stageHTML;wireStage();
  const sl=$$('#vd .sl');clearInterval(slide);
  if(sl.length){let i=0;sl[0].classList.add('on');slide=setInterval(()=>{sl[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on')},2600)}
}
function ghost(title,meta,video,stl,info,link){
  {const vd=$('#vd');vd.style.aspectRatio='';vd.style.width='';vd.style.marginInline=''}
  $('#lt').innerHTML=ttl(title);$('#lm').textContent=meta;
  $('#vd').innerHTML=video;$('#vd').hidden=!video;
  $('#sg').innerHTML=stl;$('#sg').hidden=!stl;
  $('#inf').innerHTML=info;$('#inf').hidden=!info;
  const l=$('#vl');l.hidden=!link;if(link){l.href=link;l.textContent=T.watch+' ↗'}
  const sl=$$('#vd .sl');clearInterval(slide);
  if(sl.length){let i=0;sl[0].classList.add('on');slide=setInterval(()=>{sl[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on')},2600)}
  stageHTML=video;wireStage();
  gw.showModal();gw.scrollTop=0;
}
const vimeoBg=(id,h)=>`<iframe src="https://player.vimeo.com/video/${id}?${h?'h='+h+'&':''}autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" title="video"></iframe><button class="sound" id="snd" type="button">${T.snd[0]}</button>`;
function openProject(p){
  const ids=p.n?pick(p.n,p.s):[],v=VID[p.id];
  let video;
  if(v&&v.vimeo)video=vimeoBg(v.vimeo,v.h);
  else if(v&&v.src)video=`<video src="${v.src}" ${ids.length?`poster="${th(p.s,ids[0])}" `:''}autoplay muted loop playsinline></video><button class="sound" id="snd" type="button">${T.snd[0]}</button>`;
  else video=ids.slice(0,6).map(i=>`<img class="sl" src="${th(p.s,i)}" alt="">`).join('');
  const stl=ids.length?ids.slice(0,6).map(i=>`<img data-k="${i}" data-s="${p.s}" tabindex="0" src="${th(p.s,i)}" alt="${T.still} ${p.t}, ${i}/${p.n}" loading="lazy">`).join(''):'';
  const info=(INFO[p.id]||[]).map(r=>`<div><dt>${LG==='fr'?r[1]:r[0]}</dt><dd>${LG==='fr'?r[3]:r[2]}</dd></div>`).join('');
  ghost(p.t,p[LG],video,stl,info,v&&v.vimeo?vimeoUrl(v.vimeo)+(v.h?'/'+v.h:''):'');
}
function openVimeo(id,t,m){
  const parts=m.split(' · '),yr=/^\d{4}/.test(parts[0]);
  const info=m?(yr?`<div><dt>${LG==='fr'?'Année':'Year'}</dt><dd>${parts[0]}</dd></div>`:'')+`<div><dt>${LG==='fr'?'Crédits':'Credits'}</dt><dd>${(yr?parts.slice(1):parts).join(' · ')}</dd></div>`:'';
  ghost(t,m,vimeoBg(id),'',info,vimeoUrl(id));
  const ar=VA[id],vd=$('#vd');vd.style.aspectRatio=ar||'';vd.style.width=ar&&ar<1?`min(calc(100% - 48px),${(66*ar).toFixed(2)}vh)`:'';vd.style.marginInline=ar&&ar<1?'auto':'';
}
if(gw){
  $('#lx').textContent=T.close;
  document.addEventListener('click',e=>{
    const c=e.target.closest('.card[data-id],.fr'),a=e.target.closest('a[data-v]');
    if(c)openProject(byId[c.dataset.id]);
    if(a){e.preventDefault();openVimeo(a.dataset.v,a.dataset.t,a.dataset.m)}});
  $('#lx').onclick=()=>gw.close();
  const pickStill=e=>{const i=e.target.closest('#sg img');if(!i)return;if(i.classList.contains('on')){restoreStage();return}
    $$('#sg img').forEach(x=>x.classList.remove('on'));i.classList.add('on');showStill(`stills/${i.dataset.s}/${pad(i.dataset.k)}.jpg`,/<iframe|<video/.test(stageHTML))};
  $('#sg').addEventListener('click',pickStill);$('#sg').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pickStill(e)}});
  gw.addEventListener('click',e=>{if(e.target===gw)gw.close()});
  gw.addEventListener('close',()=>{clearInterval(slide);$('#vd').innerHTML='';stageHTML=''});
}

// hero: counter then title reveal; afterwards the title drifts against the still with the pointer
const hero=$('.hero');
if(hero){
  const bg=$('.hero .bg'),h1=$('.hero h1'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const done=()=>{hero.classList.add('on');if(!rm)hero.addEventListener('pointermove',e=>{
    const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
    h1.style.transform=`translate(${x*9}px,${y*14}px)`;bg.style.transform=`scale(1) translate(${x*-16}px,${y*-9}px)`})};
  let t0;const pb=$('#pb'),nn=$('#n');
  const tick=n=>{const p=Math.min((n-t0)/1500,1),q=1-Math.pow(1-p,2.4);   // eases out like a shutter coming up to speed then settling
    nn.textContent=String(Math.round(q*100)).padStart(3,'0');pb.style.transform=`scaleX(${q})`;
    p<1?requestAnimationFrame(tick):done()};
  const mo=$('#mo');if(rm){bg.removeAttribute('autoplay');bg.pause();if(mo)mo.hidden=true;done()}else new Promise(r=>{if(bg.readyState>=2)r();else{bg.addEventListener('loadeddata',r,{once:true});setTimeout(r,2500)}}).then(()=>{t0=performance.now();requestAnimationFrame(tick)});
}

// scroll-linked filmstrips: each row's stills glide sideways as the row passes through the viewport
const rows=$$('.row');
if(rows.length){
  const rm2=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(rm2)rows.forEach(r=>r.classList.add('native'));
  else{
    const live=new Set(),maxOf=r=>Math.max(0,r.querySelector('.strip2').scrollWidth-innerWidth);
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){live.add(e.target);if(!e.target._ld){e.target._ld=1;e.target.querySelectorAll('img').forEach(i=>i.loading='eager')}}else live.delete(e.target)}),{rootMargin:'20% 0px'});
    let dragRow=null,lastX=0,moved=0;
    rows.forEach(r=>{r._x=null;r._m=0;io.observe(r);
      const tr=r.querySelector('.track');
      tr.addEventListener('wheel',e=>{const dx=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:(e.shiftKey?e.deltaY:0);if(dx){e.preventDefault();r._m-=dx}},{passive:false});
      tr.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragRow=r;lastX=e.clientX;moved=0;r.classList.add('drag')});
      tr.addEventListener('click',e=>{if(moved>6){e.stopPropagation();e.preventDefault()}},true);
      tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){r._m-=260;e.preventDefault()}if(e.key==='ArrowLeft'){r._m+=260;e.preventDefault()}});
      r.querySelectorAll('.rb').forEach(b=>b.onclick=()=>{r._m-=(+b.dataset.d)*innerWidth*.6});
    });
    addEventListener('pointermove',e=>{if(!dragRow)return;const dx=e.clientX-lastX;lastX=e.clientX;moved+=Math.abs(dx);dragRow._m+=dx});
    const end=()=>{if(dragRow)dragRow.classList.remove('drag');dragRow=null};
    addEventListener('pointerup',end);addEventListener('pointercancel',end);
    const frame=()=>{
      live.forEach(r=>{
        const b=r.getBoundingClientRect(),h=innerHeight,mx=maxOf(r);
        const p=Math.min(1,Math.max(0,((h-b.top)/(h+b.height)-.12)/.7));
        const auto=-p*mx*.55;
        let raw=auto+r._m;if(raw<-mx){r._m=-mx-auto;raw=-mx}if(raw>0){r._m=-auto;raw=0}
        r._x=r._x===null?raw:r._x+(raw-r._x)*.07;
        r.querySelector('.strip2').style.transform=`translate3d(${r._x.toFixed(1)}px,0,0)`;
        r.querySelector('.bar').style.transform=`scaleX(${(-r._x/Math.max(1,mx)).toFixed(3)})`;
      });requestAnimationFrame(frame)};
    requestAnimationFrame(frame);
  }
}

// header brand appears once the hero title has scrolled away; pause control for the reel loop
const hd=$('body.home>header');
if(hd){new IntersectionObserver(([e])=>hd.classList.toggle('past-title',!e.isIntersecting),{rootMargin:'-80px 0px 0px 0px'}).observe($('.hero h1'))}
const mo=$('#mo');
if(mo){const vid=$('.hero .bg');mo.textContent='❚❚';mo.setAttribute('aria-label',T.play[0]);mo.title=T.play[0];
  mo.onclick=()=>{const p=vid.paused;p?vid.play():vid.pause();mo.textContent=p?'❚❚':'▶';mo.setAttribute('aria-label',T.play[p?0:1]);mo.title=T.play[p?0:1];mo.setAttribute('aria-pressed',!p)}}

// camera/projector behaviour on the title only: gate weave (24 fps) plus the odd tear, dropped frame, vertical roll and soft-focus pull
const wv=$('.weave'),gl=$('.gl');
if(wv&&gl&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const h1=$('.hero h1'),mk=c=>{const n=h1.cloneNode(true);n.classList.add('gc');n.removeAttribute('id');n.setAttribute('aria-hidden','true');gl.appendChild(n);return n};
  const cu=mk(),cd=mk();
  const hv=n=>{const x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
  let vis=true,last=-1,ev=null,nextG=performance.now()+2300,H=0;
  new IntersectionObserver(([e])=>vis=e.isIntersecting).observe($('.hero'));
  const reset=()=>{gl.style.transform='';gl.style.filter='';gl.style.opacity='';wv.classList.remove('rolling');cu.style.visibility=cd.style.visibility='hidden';ev=null};
  const start=f=>{
    const r=hv(f+3),type=r<.3?'tear':r<.5?'drop':r<.75?'roll':'soft';
    ev={type,k:0,dir:hv(f+9)<.5?-1:1,n:type==='tear'?2+Math.floor(hv(f+7)*4):type==='drop'?3+Math.floor(hv(f+5)*3):type==='roll'?10:18};
    if(type==='roll'){const cs=getComputedStyle(h1);H=h1.offsetHeight+parseFloat(cs.marginTop)+parseFloat(cs.marginBottom);
      cu.style.top=(-H)+'px';cd.style.top=H+'px';cu.style.visibility=cd.style.visibility='visible';wv.classList.add('rolling')}
  };
  const loop=()=>{
    const now=performance.now(),f=Math.floor(now/1000*24);
    if(vis&&f!==last){last=f;const t=f/24;let hold=false;
      if(!ev&&now>nextG&&$('.hero').classList.contains('on')){start(f);nextG=now+2600+hv(f+11)*4800}
      if(ev){const k=ev.k++,p=k/ev.n;
        if(ev.type==='tear'){const sp=3+hv(f+4)*6;
          gl.style.transform=`translateX(${((hv(f+1)-.5)*30).toFixed(1)}px) skewX(${((hv(f+2)-.5)*9).toFixed(1)}deg)`;
          gl.style.filter=`drop-shadow(${-sp.toFixed(1)}px 0 0 rgba(0,229,255,.75)) drop-shadow(${sp.toFixed(1)}px 0 0 rgba(255,32,110,.8))`}
        else if(ev.type==='drop'){hold=true;gl.style.opacity=k%2?'.06':'1';gl.style.transform=`translateY(${((hv(f)-.5)*12).toFixed(1)}px)`}
        else if(ev.type==='roll'){hold=true;
          if(p<.8){const q=p/.8,y=ev.dir*H*(1-Math.pow(1-q,2.2));gl.style.transform=`translateY(${y.toFixed(1)}px)`;gl.style.filter=`blur(${(3.2*(1-q)+.6).toFixed(1)}px) brightness(1.15)`}
          else{gl.style.filter='';gl.style.transform=`translateY(${((hv(f)-.5)*(1-p)*18).toFixed(1)}px)`}}   // settles with a small judder
        else{const b=4.5*Math.sin(Math.PI*p);gl.style.filter=`blur(${b.toFixed(2)}px)`;gl.style.transform=`scale(${(1+.012*Math.sin(Math.PI*p)).toFixed(4)})`}   // focus pull: drifts soft and back
        if(ev.k>=ev.n)reset();
      }
      if(!hold){
        const x=1.3*Math.sin(t*1.9+.4)+.8*Math.sin(t*5.1+2.2)+(hv(f)-.5)*.9;
        const y=.9*Math.sin(t*1.3+1.7)+.5*Math.sin(t*6.7+.3)+(hv(f+999)-.5)*.7;
        const r=.035*Math.sin(t*1.1+.9)+(hv(f+31)-.5)*.03;
        wv.style.transform=`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${r.toFixed(3)}deg)`}
    }
    requestAnimationFrame(loop)};
  loop();
}

// contact form: sends through FormSubmit; if that fails the visitor's mail app opens with the message filled in
const cf=$('#cf');
if(cf){
  const note=$('#cn'),to='themartinromeo@gmail.com';
  cf.addEventListener('submit',async e=>{
    e.preventDefault();
    const em=cf.email.value.trim(),msg=cf.message.value.trim();
    if(!/^\S+@\S+\.\S+$/.test(em)||!msg){note.textContent=LG==='fr'?'Ajoutez un courriel valide et un message.':'Please add a valid email and a message.';note.className='note bad';(/^\S+@\S+\.\S+$/.test(em)?cf.message:cf.email).focus();return}
    const btn=cf.querySelector('button');btn.disabled=true;note.className='note';note.textContent=cf.dataset.busy;
    try{
      if(cf._honey.value)throw 0;
      const r=await fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({email:em,message:msg,_subject:'Message from martinromeo site',_replyto:em,_template:'table',_captcha:'false',_honey:cf._honey.value})});
      const j=await r.json();if(!r.ok||j.success==='false'||j.success===false)throw 0;
      note.textContent=cf.dataset.ok;note.className='note good';cf.reset();
    }catch(x){
      note.textContent=cf.dataset.err;note.className='note bad';
      location.href=`mailto:${to}?subject=${encodeURIComponent('Message from martinromeo site')}&body=${encodeURIComponent(msg+'\n\n'+em)}`;
    }
    btn.disabled=false;
  });
  cf._honey=cf.querySelector('[name=_honey]');
}

// role filter lives at the bottom of the screen: it steps aside while scrolling and returns when things settle
const fb=$('.fbar');
if(fb){let t;const lim=()=>document.body.classList.contains('home')?innerHeight*.85:260,sh=()=>fb.classList.toggle('show',scrollY>lim());sh();const away=()=>{sh();fb.classList.add('away');clearTimeout(t);t=setTimeout(()=>{sh();fb.classList.remove('away')},650)};
  addEventListener('scroll',away,{passive:true});addEventListener('wheel',away,{passive:true});addEventListener('touchmove',away,{passive:true})}
