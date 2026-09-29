/* 极简版：表面只渲染关键信息，详情全部进 popup。数据来自 js/data.js */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const el = id => document.getElementById(id);

let IMG = {};                 /* Wikipedia 主图：title -> {src,file} */
let cur = null;               /* 当前打开的 popup，取图完成后用它重绘 */

/* ---------- A / B 方案：希腊段相同，土耳其段不同 ---------- */
const pickTR = ids => TR.filter(d => ids.includes(d.id));
/* 行程综述：两方案共用的前后段 + 中间高亮的土耳其差异 */
const OVERVIEW = {
  pre: "11-7 中午落地伊斯坦布尔，老城住 3 晚 —— 圣索菲亚、"
    + "托普卡帕宫、大巴扎和博斯普鲁斯海峡。接着",
  post: "希腊段两方案完全相同：雅典先住 3 晚，看卫城、卫城博物馆和古市集；11-18 取车走德尔斐、"
    + "约阿尼纳、迈泰奥拉的环线，11-21 傍晚回雅典还车。11-22 中午飞离雅典。"
    + "土耳其 8 晚、希腊 7 晚。"
};
const PLANS = {
  A: {
    tr: () => TR,
    sub: "先飞卡帕多奇亚住 2 晚，清晨在观景台拍热气球，再飞回伊斯坦布尔取车南下——特洛伊、帕加马、"
      + "以弗所一路看到伊兹密尔，11-15 从伊兹密尔直飞雅典，当晚到。"
  },
  B: {
    tr: () => pickTR(["d6", "d7", "d8", "d9"]).concat(TR_B),
    sub: "先在伊斯坦布尔取车南下——特洛伊、帕加马、以弗所一路看到伊兹密尔，再飞卡帕多奇亚住 2 晚收尾，"
      + "11-15 经伊斯坦布尔转机去雅典，下午两点多就到。机票要另订一套。"
  },
  C: {
    tr: () => pickTR(["d6", "d7", "d8", "d9", "d10", "d11", "d12"]).concat(TR_C),
    sub: "机票与 A 完全相同，只把伊兹密尔两晚换成塞尔丘克 + 棉花堡——特洛伊、帕加马后直接宿塞尔丘克，"
      + "次日开门即进以弗所，下午转去棉花堡看日落，第三天日出加希拉波利斯，再开回 ADB 还车飞雅典。"
  }
};
let plan = "A";
try { const p = localStorage.getItem("trip-plan"); if (p === "A" || p === "B") plan = p } catch (e) { }

const allDays = () => [...TR, ...TR_B, ...TR_C, ...GR];
const cityMeta = c => { const o = plan === "B" ? c.b : plan === "C" ? c.c : null; return o ? { ...c, ...o } : c; };

/* 当天交通：直接从 plan 文本里的 ✈ / 🚗 推出来 */
function modes(x) {
  const s = x.plan.map(r => r[1]).join(" ");
  return (s.includes("✈") ? "✈️" : "") + (s.includes("🚗") ? "🚗" : "");
}

/* ---------- 行程：单列，每天一行 ---------- */
function rows(list) {
  return `<ul class="rows">` + list.map(x => `<li>
    <button class="row" data-day="${x.id}">
      <span class="d"><b>${esc("11-" + x.d)}</b>${esc(x.w)}</span>
      <span class="t">${esc(x.t)}<i>${x.stay ? "住 " + esc(x.stay) : x.redeye ? "过夜 " + esc(x.redeye) : ""}</i></span>
      <span class="m">${x.note ? `<i class="nb">备注</i>` : ""}<i class="mi">${modes(x)}</i></span>
    </button></li>`).join("") + `</ul>`;
}
function renderTrip() {
  el("trip").innerHTML =
    `<div class="leg tr"><div class="leg-h"><b>土耳其</b><span>11-6 – 11-15 · 8 晚</span></div>${rows(PLANS[plan].tr())}</div>` +
    `<div class="leg gr"><div class="leg-h"><b>希腊　两方案相同</b><span>11-15 – 11-22 · 7 晚</span></div>${rows(GR)}</div>`;
  el("pnote").innerHTML = esc(OVERVIEW.pre)
    + `<mark>${esc(PLANS[plan].sub)}</mark>`
    + esc(OVERVIEW.post);
  [...document.querySelectorAll(".pbtn")].forEach(b => {
    const on = b.dataset.plan === plan;
    b.classList.toggle("on", on);
    b.setAttribute("aria-selected", on);
  });
  document.querySelector(".map").dataset.plan = plan;
  [...document.querySelectorAll(".map .stop")].forEach(g => {
    const n = g.dataset["n" + plan.toLowerCase()];
    if (n) g.querySelector("text.n").textContent = n;
  });
}
document.addEventListener("click", e => {
  const b = e.target.closest(".pbtn");
  if (!b) return;
  plan = b.dataset.plan;
  try { localStorage.setItem("trip-plan", plan) } catch (e) { }
  renderTrip();
  if (!MO.hidden) closeMO();
});

/* ---------- 每天对应的城市：城市速览并进行程，从当天 popup 跳过去 ---------- */
const DAY2CITY = {
  d7: ["伊斯坦布尔"], d8: ["伊斯坦布尔"], d9: ["伊斯坦布尔"],
  d10: ["卡帕多奇亚"], d11: ["卡帕多奇亚"],
  d12: ["恰纳卡莱"], d13: ["恰纳卡莱", "伊兹密尔"],
  d14: ["以弗所 · 塞尔丘克"], d15: ["伊兹密尔"],
  /* 方案 B 的土耳其段 */
  b10: ["恰纳卡莱"], b11: ["恰纳卡莱", "伊兹密尔"], b12: ["以弗所 · 塞尔丘克"],
  b13: ["伊兹密尔", "卡帕多奇亚"], b14: ["卡帕多奇亚"], b15: ["卡帕多奇亚"],
  /* 方案 C 的最后三天 */
  c13: ["恰纳卡莱", "以弗所 · 塞尔丘克"], c14: ["以弗所 · 塞尔丘克", "棉花堡"],
  c15: ["棉花堡", "伊兹密尔"],
  d16: ["雅典"], d17: ["雅典"], d18: ["德尔斐"], d19: ["约阿尼纳"],
  d20: ["迈泰奥拉 · 卡斯特拉基"], d21: ["迈泰奥拉 · 卡斯特拉基", "雅典"], d22: ["雅典"]
};
const cityIdx = name => CITIES.findIndex(c => c.n === name);

/* ---------- 待定 / 讨论点 ---------- */
function topicRow(t) {
  return `<li>
    <div class="tq"><span>${esc(t.dt)}</span>${esc(t.q)}</div>
    <p class="ta">${esc(t.a)}${t.link ? ` <a class="tlink" href="${esc(t.link.u)}" target="_blank" rel="noopener">${esc(t.link.t)} ↗</a>` : ""}</p>
    ${t.opts ? `<ul class="topts">${t.opts.map(o =>
    `<li class="${o.v}"><b>${esc(o.n)}</b>${o.vt ? `<u>${esc(o.vt)}</u>` : ""}${esc(o.a)}</li>`).join("")}</ul>` : ""}
    <p class="tnow">现行方案　<b>${esc(t.now)}</b></p>
  </li>`;
}
function renderTopics() {
  if (!el("tlist")) return;              /* 极简版已隐藏讨论点 */
  const hard = TOPICS.filter(t => !t.soft), soft = TOPICS.filter(t => t.soft);
  el("tlist").innerHTML = hard.map(topicRow).join("")
    + (soft.length ? `<li class="tsoft">不影响订票订房，当天再定</li>` + soft.map(topicRow).join("") : "");
  if (el("tcount")) el("tcount").textContent = TOPICS.length + " 项";
}

/* ---------- 图片 ---------- */
function shotOf(entry) {
  const [t, cap, m] = entry;
  if (m && m.src) return { src: encodeURI(m.src), cap, credit: m.credit || "", href: "" };
  const r = IMG[t];
  if (!r) return null;
  return {
    src: r.src, cap, credit: "Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(r.file)
  };
}
const creditHTML = s => s.credit
  ? (s.href ? `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.credit)} ↗</a>` : esc(s.credit))
  : "";

/* ---------- popup ---------- */
const MO = el("mo");
let opener = null;

function openMO(kind, arg) {
  cur = { kind, arg };
  const body = el("mobody");
  if (kind === "day") {
    const x = allDays().find(d => d.id === arg); if (!x) return;
    MO.className = "mo " + (GR.includes(x) ? "gr" : "tr");
    el("mokick").textContent = "11-" + x.d + " · " + x.w;
    el("motitle").textContent = x.t;
    el("mosub").textContent = x.stay ? "住 " + x.stay : x.redeye ? "过夜 " + x.redeye : "";
    const shots = x.img.map(shotOf).filter(Boolean);
    body.innerHTML =
      `<h4>当天安排</h4>
       <ul class="plan">${x.plan.map(([a, b]) => `<li><i>${esc(a)}</i><span>${esc(b)}</span></li>`).join("")}</ul>
       ${x.tip ? `<h4>提示</h4><p>${esc(x.tip)}</p>` : ""}
       ${x.note ? `<h4>备注</h4><ul class="notes">${x.note.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
       ${x.link ? `<p class="dlink"><a class="tlink" href="${esc(x.link.u)}" target="_blank" rel="noopener">${esc(x.link.t)} ↗</a></p>` : ""}
       ${shots.length ? `<h4>图片</h4><div class="shots">${shots.map(s =>
        `<figure><img src="${esc(s.src)}" alt="${esc(s.cap)}" loading="lazy"><figcaption>${esc(s.cap)}<br>${creditHTML(s)}</figcaption></figure>`).join("")}</div>` : ""}`;
    /* 城市速览入口放在卡片头部 */
    const ids = (DAY2CITY[x.id] || []).map(cityIdx).filter(i => i >= 0);
    el("mocross").innerHTML = ids.map(i =>
      `<button class="xlink" data-city="${i}">${esc(CITIES[i].n)}速览 →</button>`).join("");
  } else {
    const x = cityMeta(CITIES[arg]); if (!x) return;
    MO.className = "mo " + x.c;
    el("mokick").textContent = x.dt + " · " + x.nt;
    el("motitle").textContent = x.n;
    el("mosub").textContent = x.en;
    const s = shotOf([x.img, x.n]);
    body.innerHTML =
      `${s ? `<figure class="cover"><img src="${esc(s.src)}" alt="${esc(x.n)}" loading="lazy"><figcaption>${creditHTML(s)}</figcaption></figure>` : ""}
       <h4>关于</h4><p>${esc(x.intro)}</p>
       <h4>必看</h4><ul class="hl">${x.hl.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}</ul>
       <h4>吃</h4><p>${esc(x.food)}</p>
       <h4>提示</h4><p>${esc(x.tips)}</p>`;
    el("mocross").innerHTML =
      `<button class="xlink" data-day="${esc(x.to)}">看 ${esc(x.dt.split("、")[0].split(" ")[0])} 当天 →</button>`;
  }
  if (MO.hidden) { opener = document.activeElement; MO.hidden = false; document.documentElement.style.overflow = "hidden" }
  body.scrollTop = 0;
  el("moclose").focus({ preventScroll: true });
}
function closeMO() {
  MO.hidden = true; cur = null;
  el("mobody").innerHTML = "";
  document.documentElement.style.overflow = "";
  if (opener && opener.focus) opener.focus({ preventScroll: true });
  opener = null;
}

el("moclose").addEventListener("click", closeMO);
MO.addEventListener("click", e => { if (e.target === MO) closeMO() });
document.addEventListener("keydown", e => {
  if (!MO.hidden && e.key === "Escape") { closeMO(); e.preventDefault() }
});
document.addEventListener("click", e => {
  const day = e.target.closest("[data-day]");
  if (day) { openMO("day", day.dataset.day); return }
  const city = e.target.closest("[data-city]");
  if (city) { openMO("city", +city.dataset.city); return }
});

/* ---------- Wikipedia 主图（与完整版共用 localStorage 缓存） ---------- */
async function loadImgMap() {
  const titles = [...new Set(
    [...TR, ...GR].flatMap(d => d.img.map(i => i[0])).concat(CITIES.map(c => c.img))
  )];
  let map = {};
  try { const c = JSON.parse(localStorage.getItem("trip-img-v1") || "null"); if (c) map = c } catch (e) { }
  const missing = titles.filter(t => !(t in map));
  for (let i = 0; i < missing.length; i += 40) {
    const batch = missing.slice(i, i + 40);
    try {
      const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1"
        + "&prop=pageimages&piprop=thumbnail|name&pithumbsize=1000&pilicense=free&titles="
        + encodeURIComponent(batch.join("|"));
      const j = await (await fetch(url)).json();
      const alias = {};
      (j.query.normalized || []).forEach(r => alias[r.from] = r.to);
      (j.query.redirects || []).forEach(r => alias[r.from] = r.to);
      const byTitle = {};
      Object.values(j.query.pages || {}).forEach(p => { if (p.thumbnail) byTitle[p.title] = { src: p.thumbnail.source, file: p.pageimage } });
      batch.forEach(t => { let k = t; for (let n = 0; n < 3 && alias[k]; n++) k = alias[k]; map[t] = byTitle[k] || null });
    } catch (e) { }
  }
  try { localStorage.setItem("trip-img-v1", JSON.stringify(map)) } catch (e) { }
  IMG = map;
  if (cur) openMO(cur.kind, cur.arg);   /* 取图晚于开窗时补上 */
}

renderTrip(); renderTopics(); loadImgMap();
