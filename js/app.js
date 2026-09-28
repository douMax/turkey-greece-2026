/* 渲染、gallery、图片 modal、Wikimedia 取图 */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function renderNodes(key){
  const el=document.getElementById("nodes-"+key);
  el.innerHTML=NODES[key].map((x,i,a)=>{
    const mode=i<a.length-1?(x.next==="fly"?"✈️":"🚗"):"";
    return `<button class="node${x.pass?" pass":""}${x.next==="fly"?" fly":""}" data-to="${x.to}">
      <span class="dot"></span>${mode?`<span class="mode" aria-hidden="true">${mode}</span>`:""}
      <span class="nm">${esc(x.n)}</span>${x.en?`<span class="en">${esc(x.en)}</span>`:""}<span class="dt">${x.dt}</span><span class="nt">${esc(x.nt)}</span></button>`}).join("");
}
/* 一张图：给了 m.src 就用本地文件与自带版权标注，否则交给 loadImages 去 Wikipedia 取 */
function photo([t,c,m]){
  const cap=esc(c);
  return m&&m.src
    ? `<figure class="ph empty" data-local="1" data-credit="${esc(m.credit||"")}"><img src="${esc(encodeURI(m.src))}" alt="${cap}" loading="lazy"><figcaption><span>${cap}</span><span class="cr">${esc(m.credit||"")}</span></figcaption></figure>`
    : `<figure class="ph empty" data-title="${esc(t)}"><img alt="${cap}" loading="lazy"><figcaption><span>${cap}</span><a class="cr" target="_blank" rel="noopener">Commons</a></figcaption></figure>`;
}
function renderTopics(){
  const el=document.getElementById("tlist");if(!el)return;
  const row=t=>`<li${t.soft?' class="soft"':""}>
    <button class="tjump ${t.c}" data-to="${t.to}" aria-label="跳到 ${esc(t.dt)}">${esc(t.dt)}</button>
    <div class="tbody"><b>${esc(t.q)}</b><span>${esc(t.a)}${t.link?` <a class="tlink" href="${esc(t.link.u)}" target="_blank" rel="noopener">${esc(t.link.t)} ↗</a>`:""}</span>
      ${t.opts?`<ul class="topts">${t.opts.map(o=>`<li class="${o.v}"><b>${esc(o.n)}</b>${o.vt?`<i>${esc(o.vt)}</i>`:""}${esc(o.a)}</li>`).join("")}</ul>`:""}
      <em>现行方案 <i>${esc(t.now)}</i></em></div>
  </li>`;
  /* 影响订票订房的排在前面；只影响当天安排的弱化放后面 */
  const hard=TOPICS.filter(t=>!t.soft),soft=TOPICS.filter(t=>t.soft);
  el.innerHTML=hard.map(row).join("")
    +(soft.length?`<li class="tsep"><span>不影响订票订房，当天再定</span></li>`+soft.map(row).join(""):"");
}
function renderCities(){
  const el=document.getElementById("clist");if(!el)return;
  el.innerHTML=CITIES.map((x,i)=>`<li>
    <button class="ccard ${x.c}" data-city="${i}">
      <figure class="cthumb empty" data-title="${esc(x.img)}"><img alt="${esc(x.n)}" loading="lazy"></figure>
      <span class="cbody">
        <span class="cn">${esc(x.n)}</span>
        <span class="cen">${esc(x.en)}</span>
        <span class="cone">${esc(x.one)}</span>
      </span>
    </button></li>`).join("");
}
function renderDays(list,key){
  document.getElementById("days-"+key).innerHTML=list.map(x=>`
  <article class="day" id="${x.id}">
    <div class="gallery" data-i="0">
      <div class="gtrack">${x.img.map(photo).join("")}</div>
      ${x.img.length>1?`<button class="garrow prev" aria-label="上一张">‹</button><button class="garrow next" aria-label="下一张">›</button>
      <div class="gdots">${x.img.map((_,i)=>`<button class="gdot${i?"":" on"}" data-g="${i}" aria-label="第 ${i+1} 张"></button>`).join("")}</div>`:""}
      <button class="gfull" aria-label="放大查看" title="放大查看">⛶</button>
    </div>
    <div class="body">
      <div class="when"><span class="d">11-${x.d}</span><span class="w">${x.w}</span></div>
      <h3>${esc(x.t)}</h3>
      <ul class="plan">${x.plan.map(([a,b])=>`<li><i>${a}</i><span>${esc(b)}</span></li>`).join("")}</ul>
      ${x.tip?`<p class="tip">${esc(x.tip)}</p>`:""}
      ${x.note?`<div class="note"><b>备注</b>${x.note.map(s=>`<p>${esc(s)}</p>`).join("")}</div>`:""}
    </div>
    ${x.stay?`<p class="stay"><span class="pin"></span><span>住 <b>${esc(x.stay)}</b></span></p>`
     :x.redeye?`<p class="stay air"><span class="pin"></span><span>过夜 <b>${esc(x.redeye)}</b></span></p>`:""}
  </article>`).join("");
}
renderNodes("tr");renderNodes("gr");renderTopics();renderCities();renderDays(TR,"tr");renderDays(GR,"gr");

/* ---------- 城市详情 popup ---------- */
const CB=document.getElementById("cb");
let cbOpener=null;
function openCB(i){
  const x=CITIES[i];if(!x)return;
  cbOpener=document.activeElement;
  CB.className="cb "+x.c;
  document.getElementById("cbname").textContent=x.n;
  document.getElementById("cben").textContent=x.en;
  document.getElementById("cbnt").textContent=x.dt+" · "+x.nt;
  /* 复用卡片缩略图已取到的图与版权 */
  const src=document.querySelector(`.ccard[data-city="${i}"] .cthumb`);
  const ph=document.getElementById("cbph"),img=ph.querySelector("img"),cr=ph.querySelector(".cr");
  const url=src&&src.querySelector("img").getAttribute("src");
  ph.classList.toggle("empty",!url);
  img.alt=x.n;
  if(url){img.src=url}else{img.removeAttribute("src")}
  cr.textContent=src&&src.dataset.credit?src.dataset.credit+" ↗":"";
  if(src&&src.dataset.href)cr.href=src.dataset.href;else cr.removeAttribute("href");
  document.getElementById("cbbody").innerHTML=`
    <p class="cbintro">${esc(x.intro)}</p>
    <h4>必看</h4>
    <ul class="cbhl">${x.hl.map(([k,v])=>`<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}</ul>
    <h4>吃</h4><p>${esc(x.food)}</p>
    <h4>提示</h4><p>${esc(x.tips)}</p>
    <button class="cbjump" data-to="${x.to}">跳到 ${esc(x.dt.split("、")[0].split(" ")[0])} 的行程 →</button>`;
  CB.hidden=false;document.documentElement.style.overflow="hidden";
  document.getElementById("cbbody").scrollTop=0;
  document.getElementById("cbclose").focus({preventScroll:true});
}
function closeCB(){
  CB.hidden=true;document.documentElement.style.overflow="";
  if(cbOpener&&cbOpener.focus)cbOpener.focus({preventScroll:true});
  cbOpener=null;
}
document.getElementById("cbclose").addEventListener("click",closeCB);
CB.addEventListener("click",e=>{if(e.target===CB)closeCB()});

/* ---------- 横向 gallery ---------- */
const gTrack=g=>g.querySelector(".gtrack");
const gIndex=g=>{const t=gTrack(g);return t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0};
function gGo(g,i,smooth){
  const t=gTrack(g),n=t.children.length;i=(i%n+n)%n;
  t.scrollTo({left:i*t.clientWidth,behavior:smooth===false?"auto":"smooth"});
}
function gSync(g){
  const i=gIndex(g);g.dataset.i=i;
  g.querySelectorAll(".gdot").forEach((d,j)=>d.classList.toggle("on",j===i));
}
document.querySelectorAll(".gallery").forEach(g=>{
  let raf;gTrack(g).addEventListener("scroll",()=>{
    cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>gSync(g));
  },{passive:true});
});
/* 本地图片自己淡入（远程的由 loadImages 挂 onload） */
document.querySelectorAll(".ph[data-local] img").forEach(img=>{
  const show=()=>{img.classList.add("ok");img.closest(".ph").classList.remove("empty")};
  if(img.complete&&img.naturalWidth)show();else img.addEventListener("load",show,{once:true});
});

/* ---------- 放大查看：popup modal ---------- */
const LB=document.getElementById("lb"),LBT=document.getElementById("lbtrack"),LBD=document.getElementById("lbdots");
let lbSrc=null,lbOpener=null,lbN=0,lbI=0;
function lbCap(){
  const f=LBT.children[lbI];if(!f)return;
  document.getElementById("lbnum").textContent=lbN>1?`${lbI+1} / ${lbN}`:"";
  document.getElementById("lbtxt").textContent=f.dataset.cap||"";
  const a=document.getElementById("lblink"),credit=f.dataset.credit||"";
  a.textContent=credit+(f.dataset.href?" ↗":"");
  if(f.dataset.href)a.href=f.dataset.href;else a.removeAttribute("href");
  a.hidden=!credit;
  LBD.querySelectorAll(".gdot").forEach((d,j)=>d.classList.toggle("on",j===lbI));
}
function lbGo(i,smooth){
  lbI=(i%lbN+lbN)%lbN;
  LBT.scrollTo({left:lbI*LBT.clientWidth,behavior:smooth===false?"auto":"smooth"});
  lbCap();
}
function openLB(g,i){
  lbSrc=g;lbOpener=document.activeElement;
  const figs=[...g.querySelectorAll(".ph")];
  lbN=figs.length;
  LBT.innerHTML=figs.map(f=>{
    const img=f.querySelector("img"),src=img.getAttribute("src");
    const at=[`data-cap="${esc(img.alt)}"`];
    if(f.dataset.credit)at.push(`data-credit="${esc(f.dataset.credit)}"`);
    if(f.dataset.href)at.push(`data-href="${esc(f.dataset.href)}"`);
    return `<div class="lbfig" ${at.join(" ")}>${
      src?`<img src="${esc(src)}" alt="${esc(img.alt)}">`:`<span class="na">${esc(img.alt)}（暂无图片）</span>`}</div>`;
  }).join("");
  LBD.innerHTML=lbN>1?figs.map((_,j)=>`<button class="gdot" data-lb="${j}" aria-label="第 ${j+1} 张"></button>`).join(""):"";
  LB.querySelectorAll(".lbarrow").forEach(b=>b.hidden=lbN<2);
  LB.hidden=false;document.documentElement.style.overflow="hidden";
  requestAnimationFrame(()=>{lbGo(i,false);document.getElementById("lbclose").focus({preventScroll:true})});
}
function closeLB(){
  LB.hidden=true;LBT.innerHTML="";LBD.innerHTML="";document.documentElement.style.overflow="";
  if(lbSrc){gGo(lbSrc,lbI,false);gSync(lbSrc);lbSrc=null}
  if(lbOpener&&lbOpener.focus)lbOpener.focus({preventScroll:true});
  lbOpener=null;
}
let lbRaf;LBT.addEventListener("scroll",()=>{
  cancelAnimationFrame(lbRaf);lbRaf=requestAnimationFrame(()=>{
    if(!LBT.clientWidth)return;const i=Math.round(LBT.scrollLeft/LBT.clientWidth);
    if(i!==lbI){lbI=i;lbCap()}
  });
},{passive:true});
document.getElementById("lbclose").addEventListener("click",closeLB);
document.getElementById("lbprev").addEventListener("click",()=>lbGo(lbI-1));
document.getElementById("lbnext").addEventListener("click",()=>lbGo(lbI+1));
LBD.addEventListener("click",e=>{const d=e.target.closest("[data-lb]");if(d)lbGo(+d.dataset.lb)});
/* 点遮罩或图片周围的留白关闭 */
LB.addEventListener("click",e=>{if(e.target===LB||e.target.classList.contains("lbfig"))closeLB()});
window.addEventListener("resize",()=>{if(!LB.hidden)lbGo(lbI,false)});

document.addEventListener("click",e=>{
  const card=e.target.closest("[data-city]");
  if(card){openCB(+card.dataset.city);return}
  const arrow=e.target.closest(".garrow");
  if(arrow){const g=arrow.closest(".gallery");gGo(g,gIndex(g)+(arrow.classList.contains("next")?1:-1));return}
  const dot=e.target.closest(".gallery .gdot");
  if(dot){gGo(dot.closest(".gallery"),+dot.dataset.g);return}
  const full=e.target.closest(".gfull");
  if(full){const g=full.closest(".gallery");openLB(g,gIndex(g));return}
  const ph=e.target.closest(".ph");
  if(ph&&!e.target.closest("a")){const g=ph.closest(".gallery");openLB(g,[...gTrack(g).children].indexOf(ph));return}
  const b=e.target.closest("[data-to]");
  if(b){
    if(!CB.hidden)closeCB();
    const t=document.getElementById(b.dataset.to);if(t)t.scrollIntoView({block:"start"});
  }
});
document.addEventListener("keydown",e=>{
  if(!CB.hidden){if(e.key==="Escape"){closeCB();e.preventDefault()}return}
  if(LB.hidden)return;
  if(e.key==="Escape"){closeLB();e.preventDefault()}
  else if(e.key==="ArrowRight"){lbGo(lbI+1);e.preventDefault()}
  else if(e.key==="ArrowLeft"){lbGo(lbI-1);e.preventDefault()}
});

/* ---------- 快速导航：滚动高亮当前板块 ---------- */
const QN=[...document.querySelectorAll(".qnav a")];
if(QN.length&&"IntersectionObserver"in window){
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      QN.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id));
    });
  },{rootMargin:"-58px 0px -68% 0px"});
  QN.map(a=>document.querySelector(a.getAttribute("href"))).forEach(s=>{if(s)io.observe(s)});
}

/* 图片：通过 Wikipedia 页面主图（仅自由授权图片，来自 Wikimedia Commons） */
async function loadImages(){
  const figs=[...document.querySelectorAll("[data-title]")];
  const titles=[...new Set(figs.map(f=>f.dataset.title))];
  let map={};
  try{const c=JSON.parse(localStorage.getItem("trip-img-v1")||"null");if(c)map=c;}catch(e){}
  const missing=titles.filter(t=>!(t in map));
  for(let i=0;i<missing.length;i+=40){
    const batch=missing.slice(i,i+40);
    try{
      const url="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail|name&pithumbsize=1000&pilicense=free&titles="+encodeURIComponent(batch.join("|"));
      const j=await (await fetch(url)).json();
      const alias={};
      (j.query.normalized||[]).forEach(r=>alias[r.from]=r.to);
      (j.query.redirects||[]).forEach(r=>alias[r.from]=r.to);
      const byTitle={};
      Object.values(j.query.pages||{}).forEach(p=>{if(p.thumbnail)byTitle[p.title]={src:p.thumbnail.source,file:p.pageimage}});
      batch.forEach(t=>{let k=t;for(let n=0;n<3&&alias[k];n++)k=alias[k];map[t]=byTitle[k]||null;});
    }catch(e){}
  }
  try{localStorage.setItem("trip-img-v1",JSON.stringify(map));}catch(e){}
  figs.forEach(f=>{
    const r=map[f.dataset.title];if(!r)return;
    const img=f.querySelector("img"),a=f.querySelector(".cr");
    img.onload=()=>{img.classList.add("ok");f.classList.remove("empty")};
    img.src=r.src;
    f.dataset.credit="Wikimedia Commons";
    f.dataset.href="https://commons.wikimedia.org/wiki/File:"+encodeURIComponent(r.file);
    if(a&&a.tagName==="A")a.href=f.dataset.href;   /* 城市缩略图没有版权链接 */
  });
}
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches(".stop")){const t=document.getElementById(e.target.dataset.to);if(t)t.scrollIntoView({block:"start"})}});
loadImages();
