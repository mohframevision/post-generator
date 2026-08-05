// منطق الواجهة — مشترك بين الصفحة العربية والإنجليزية.
// اللغة تُؤخذ من الصفحة نفسها (<html lang>)، وكل صفحة رابط مستقل بعنوانها الخاص.

const grid = document.getElementById('grid');
const titleEl = document.getElementById('title');
const subEl = document.getElementById('sub');
const nameEl = document.getElementById('name');
const typeEl = document.getElementById('type');
const sizeEl = document.getElementById('size');
const brandFont = document.getElementById('brandFont');
const COUNT = 8;

const ui = document.documentElement.lang === 'ar' ? 'ar' : 'en';
const T = () => UI[ui];

const base = Math.floor(Math.random() * 1e9);
let step = 0;      // كل ضغطة «غيرها» تزيد خطوة، و«السابق» ينقصها — والنتيجة ثابتة لكل خطوة
let specs = [];
let image = null, logo = null;

// لغة النص المكتوب هي اللي تحدّد الخط والاتجاه — لا لغة الصفحة
const postLang = () => textLang(titleEl.value + ' ' + subEl.value + ' ' + nameEl.value, ui);
const fields = () => ({
  title: titleEl.value, sub: subEl.value, name: nameEl.value,
  image, logo, lang: postLang(),
  mood: TYPES[typeEl.value || 0].mood,   // الحركة تتبع مزاج نوع المنشور
  power: +powerEl.value,                  // وشدّتها يضبطها المستخدم
  animId: animPick.value || null,         // واختياره اليدوي يتقدّم على المزاج
  bgId: bgPick.value || null,
  logoPos: logoPosEl.value || null,
  scrim: +scrimEl.value / 100,
  textScale: (TEXT_SCALES.find(s => s.id === textSize) || TEXT_SCALES[1]).v,
});

// تدرّج اختاره المستخدم يستبدل لوحة ألوان التصميم كاملةً — الألوان تجي معه
const applyGrad = spec => {
  const g = gradEl.value && GRADIENTS.find(x => x.id === gradEl.value);
  return g ? { ...spec, palette: { bg: g.bg, fg: g.fg, ac: g.ac, grad: g.grad } } : spec;
};
const size = () => SIZES[sizeEl.value];

// ===== الثيم =====
const themeBtn = document.getElementById('theme');
const paintTheme = () => themeBtn.textContent =
  document.documentElement.dataset.theme === 'dark' ? T().light : T().dark;
themeBtn.onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  paintTheme();
};

// ===== نصوص الواجهة والقوائم =====
function paintUI() {
  const t = T();
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t[el.dataset.i18nPh]);
  fillTypes();
  fillExtras();
  fillChips();
  fillTextSize();
  SIZES.forEach((x, i) => sizeEl.add(new Option(x[ui], i)));
  brandFont.add(new Option(t.autoFont, ''));
  for (const key of ['ar', 'en']) {
    const grp = document.createElement('optgroup');
    grp.label = key === 'ar' ? 'عربي' : 'English';
    FONTS[key].forEach((fp, i) => grp.appendChild(new Option(fp[0], key + ':' + i)));
    brandFont.appendChild(grp);
  }
  paintTheme();
}

// ===== حجم النصّ: ثلاث درجات =====
let textSize = localStorage.getItem('textSize') || 'm';

function fillTextSize() {
  const box = document.getElementById('textSize');
  box.innerHTML = '';
  for (const s of TEXT_SCALES) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'seg' + (s.id === textSize ? ' on' : '');
    b.textContent = s[ui];
    b.onclick = () => {
      textSize = s.id; localStorage.setItem('textSize', s.id);
      [...box.children].forEach(c => c.classList.toggle('on', c === b));
      render();
    };
    box.appendChild(b);
  }
}

// ===== إشعار قصير =====
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ===== نسخ الوصف مع وسوم نوع المنشور =====
async function copyCaption() {
  const txt = caption(fields(), TYPES[typeEl.value || 0].cat, ui);
  try { await navigator.clipboard.writeText(txt); toast(T().copied); }
  catch { toast(T().copyFailed); }
}

// ===== ضوابط الصورة والشعار والتدرّج =====
const logoPosEl = document.getElementById('logoPos');
const scrimEl = document.getElementById('scrim');
const gradEl = document.getElementById('grad');

function fillExtras() {
  const t = T();
  logoPosEl.innerHTML = ''; gradEl.innerHTML = '';
  LOGO_POS.forEach(p => logoPosEl.add(new Option(p[ui], p.id)));
  gradEl.add(new Option(t.noGrad, ''));
  GRADIENTS.forEach(g => gradEl.add(new Option(g[ui], g.id)));
}
const paintScrim = () => document.getElementById('scrimVal').textContent = scrimEl.value + '٪';
[logoPosEl, gradEl].forEach(el => el.addEventListener('change', () => {
  localStorage.setItem(el.id, el.value); render();
}));
scrimEl.addEventListener('input', () => {
  localStorage.setItem('scrim', scrimEl.value); paintScrim(); render();
});

// ===== رقائق سريعة: تختار نوعاً جاهزاً بضغطة بدل فتح القائمة =====
// ponytail: تشير للأنواع الموجودة لا لنصوص جديدة — مصدر واحد للأمثلة.
const QUICK = ['خصم', 'مواعيد الدوام', 'قريباً'];

function fillChips() {
  const box = document.getElementById('chips');
  box.innerHTML = '';
  const lbl = document.createElement('span');
  lbl.className = 'hint'; lbl.textContent = T().presets;
  box.appendChild(lbl);
  for (const arName of QUICK) {
    const i = TYPES.findIndex(x => x.ar.name === arName);
    if (i < 0) continue;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = TYPES[i][ui].name;
    b.onclick = () => {
      searchEl.value = ''; fillTypes();
      typeEl.value = String(i);
      titleEl.value = ''; subEl.value = '';   // نفرّغها ليحطّ المثال الجاهز
      applyType();
      loadFonts().then(render);
    };
    box.appendChild(b);
  }
}

// ===== نوع المنشور: مجموعات + بحث =====
// القائمة مبنية بـoptgroup لأن الأنواع كثيرة، والبحث يعيد بناءها بالمطابقات فقط
const searchEl = document.getElementById('typeSearch');
const noteEl = document.getElementById('typeNote');

function fillTypes(q = '') {
  const keep = typeEl.value;
  const needle = q.trim().toLowerCase();
  const hit = i => !needle ||
    [TYPES[i].ar.name, TYPES[i].en.name, TYPES[i].ar.t[1], TYPES[i].en.t[1],
     CATS.find(c => c.id === TYPES[i].cat)[ui]].join(' ').toLowerCase().includes(needle);

  typeEl.innerHTML = '';
  for (const cat of CATS) {
    const hits = [...TYPES.entries()].filter(([i, t]) => t.cat === cat.id && hit(i));
    if (!hits.length) continue;
    const g = document.createElement('optgroup');
    g.label = cat[ui];
    hits.forEach(([i, t]) => g.appendChild(new Option(t[ui].name, i)));
    typeEl.appendChild(g);
  }
  if (!typeEl.options.length) {  // ما فيه مطابقة — نرجّع الكل ونقول له، لا نتجاهل بصمت
    fillTypes('');               // ينظّف الملاحظة، فنضعها بعده لا قبله
    noteEl.textContent = T().noTypes;
    noteEl.hidden = false;
    return;
  }
  noteEl.hidden = true;
  typeEl.value = [...typeEl.options].some(o => o.value === keep) ? keep : typeEl.options[0].value;
}

searchEl.addEventListener('input', () => {
  const before = typeEl.value;
  fillTypes(searchEl.value);
  if (typeEl.value !== before) applyType();
});

function applyType() {
  const t = TYPES[typeEl.value][ui];
  document.getElementById('titleLabel').textContent = t.t[0];
  document.getElementById('subLabel').textContent = t.s[0];
  // نحطّ المثال بس لو الخانة فاضية أو فيها مثال جاهز — ما نمسح كتابة المستخدم
  if (isExample(titleEl.value, 't')) titleEl.value = t.t[1];
  if (isExample(subEl.value, 's')) subEl.value = t.s[1];
  render();
}
const isExample = (v, k) => !v.trim() ||
  TYPES.some(x => x.ar[k][1] === v || x.en[k][1] === v);

typeEl.addEventListener('change', applyType);
sizeEl.addEventListener('change', render);

// ===== الرسم =====
const canShareFiles = !!(navigator.canShare &&
  navigator.canShare({ files: [new File([''], 'x.png', { type: 'image/png' })] }));

// خط العلامة المثبّت (لو اختاره) يتجاوز الاختيار التلقائي
function applyFont(spec) {
  if (!brandFont.value) return spec;
  const [k, i] = brandFont.value.split(':');
  return { ...spec, font: FONTS[k][+i] };
}

let live = [];   // اللوحات المعروضة الحين، عشان حلقة الحركة تعيد رسمها

function render() {
  const f = fields(), sz = size();
  const pw = 440, ph = Math.round(pw * sz.h / sz.w);
  grid.innerHTML = '';
  live = [];
  specs.map(applyFont).map(applyGrad).forEach(spec => {
    const card = document.createElement('div');
    card.className = 'card';
    const c = document.createElement('canvas');
    c.width = pw; c.height = ph;
    const ctx = c.getContext('2d');
    drawPost(ctx, pw, ph, spec, f, animOn() ? 0 : null);
    live.push({ ctx, pw, ph, spec });
    c.title = T().zoomTip;
    c.onclick = () => openZoom(spec, c);
    card.appendChild(c);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.appendChild(makeBtn(T().download, () => save(spec)));
    if (canRecord) actions.appendChild(makeBtn(T().video, b => saveVideo(spec, b)));
    actions.appendChild(makeBtn(T().copy, copyCaption));
    if (canShareFiles) actions.appendChild(makeBtn(T().share, () => share(spec)));
    card.appendChild(actions);
    grid.appendChild(card);
  });
}

function makeBtn(label, fn) {
  const b = document.createElement('button');
  b.textContent = label;
  b.onclick = () => fn(b);
  return b;
}

// ===== الحركة =====
const animBox = document.getElementById('animate');
const speedEl = document.getElementById('speed');
const powerEl = document.getElementById('power');
const motionCtl = document.getElementById('motionCtl');
const stillMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const animOn = () => animBox.checked;
// المدة الفعلية بعد مزلاج السرعة — أعلى سرعة = دورة أقصر
const cycleMs = spec => spec.durationMs / +speedEl.value;
let t0 = performance.now();

// حلقة واحدة ترسم كل اللوحات — أرخص من حلقة لكل تصميم
function tick(now) {
  requestAnimationFrame(tick);
  if (!animOn() || document.hidden || !live.length) return;
  const f = fields();
  for (const L of live) {
    const d = cycleMs(L.spec);
    drawPost(L.ctx, L.pw, L.ph, L.spec, f, ((now - t0) % d) / d);
  }
}
requestAnimationFrame(tick);

// قائمتا اختيار الحركة، مقسّمتان لعائلات — نفس نمط قائمة أنواع المنشورات
const animPick = document.getElementById('animPick');
const bgPick = document.getElementById('bgPick');

function fillMotionPicks() {
  const t = T();
  animPick.innerHTML = ''; bgPick.innerHTML = '';
  animPick.add(new Option(t.autoAnim, ''));
  for (const fam of ANIM_FAMS) {
    const g = document.createElement('optgroup');
    g.label = fam[ui];
    ANIMS.filter(a => a.fam === fam.id).forEach(a => g.appendChild(new Option(a[ui], a.id)));
    animPick.appendChild(g);
  }
  bgPick.add(new Option(t.autoAnim, ''));
  BG_MOTIONS.forEach(b => bgPick.add(new Option(b[ui], b.id)));
  animPick.title = t.lAnim; bgPick.title = t.lBg;
}
[animPick, bgPick].forEach(el => el.addEventListener('change', () => {
  localStorage.setItem(el.id, el.value);
  render();
}));

function paintMotion() {
  motionCtl.hidden = !animBox.checked;
  document.getElementById('speedVal').textContent = (+speedEl.value).toFixed(1) + '×';
  document.getElementById('powerVal').textContent = (+powerEl.value).toFixed(1) + '×';
}
animBox.addEventListener('change', () => {
  localStorage.setItem('anim', animBox.checked ? '1' : '0');
  t0 = performance.now();
  paintMotion();
  render();
});
// المزالج تشتغل فوراً وأنت تسحب — الحلقة تلتقط القيمة الجديدة بالإطار الجاي
[speedEl, powerEl].forEach(el => el.addEventListener('input', () => {
  localStorage.setItem(el.id === 'speed' ? 'motionSpeed' : 'motionPower', el.value);
  paintMotion();
  if (!animOn()) render();
}));

// من يكره الحركة ما نفرضها عليه، ومن حفظ اختياره نحترمه
animBox.checked = (localStorage.getItem('anim') ?? (stillMotion ? '0' : '1')) === '1';
// الافتراضي مضبوط بالعين لا بالتخمين: حركة هادئة وخفيفة تناسب أغلب المنشورات
const MOTION_DEFAULTS = { speed: '0.8', power: '0.3' };
speedEl.value = localStorage.getItem('motionSpeed') ?? MOTION_DEFAULTS.speed;
powerEl.value = localStorage.getItem('motionPower') ?? MOTION_DEFAULTS.power;
fillMotionPicks();
animPick.value = localStorage.getItem('animPick') ?? '';
bgPick.value = localStorage.getItem('bgPick') ?? '';
paintMotion();

// كل اختيارات المستخدم ترجع كما تركها.
// لازم تُستدعى بعد paintUI لأن ضبط قيمة قائمة قبل بناء خياراتها يضيع بصمت.
function loadExtras() {
  logoPosEl.value = localStorage.getItem('logoPos') ?? '';
  gradEl.value = localStorage.getItem('grad') ?? '';
  scrimEl.value = localStorage.getItem('scrim') ?? '40';
  paintScrim();
  const savedLogo = localStorage.getItem('logo');
  if (savedLogo) useLogo(savedLogo, false);
}

// ننزّل خطوط هذي المجموعة فقط — عندنا ٣٢ عائلة، تحميلها كلها يقتل جوال بشريحة
function loadFonts() {
  const f = fields();
  const text = (f.title + f.sub + f.name) || 'Aa';
  const jobs = specs.map(applyFont).map(applyGrad).flatMap(s => {
    const [df, dw, bf, bw] = pickFont(s, f.lang);
    return [`${dw} 100px "${df}"`, `${bw} 100px "${bf}"`];
  });
  return Promise.all([...new Set(jobs)].map(j =>
    document.fonts.load(j, text).catch(() => {})));
}

// ===== التكبير =====
const zoomDlg = document.getElementById('zoom');
const zoomCanvas = document.getElementById('zoomCanvas');
const zoomActions = document.getElementById('zoomActions');

function openZoom(spec, fromEl) {
  const sz = size();
  zoomCanvas.width = sz.w; zoomCanvas.height = sz.h;
  const ctx = zoomCanvas.getContext('2d');
  drawPost(ctx, sz.w, sz.h, spec, fields(), animOn() ? 0 : null);
  // النافذة تدخل حلقة الحركة نفسها، وتخرج منها لما تنسكّر
  live.push({ ctx, pw: sz.w, ph: sz.h, spec, zoom: true });
  zoomActions.innerHTML = '';
  zoomActions.appendChild(makeBtn(T().download, () => save(spec)));
  if (canRecord) zoomActions.appendChild(makeBtn(T().video, b => saveVideo(spec, b)));
  if (canShareFiles) zoomActions.appendChild(makeBtn(T().share, () => share(spec)));
  zoomActions.appendChild(makeBtn(T().close, () => zoomDlg.close()));
  zoomDlg.showModal();

  if (stillMotion) return;
  // نكبّر من مكان الصورة اللي ضغطها بالضبط إلى مكانها النهائي
  const from = fromEl.getBoundingClientRect(), to = zoomDlg.getBoundingClientRect();
  const scale = from.width / to.width;
  const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
  const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
  zoomDlg.animate(
    [{ transform: `translate(${dx}px,${dy}px) scale(${scale})`, opacity: 0.4 },
     { transform: 'none', opacity: 1 }],
    { duration: 220, easing: 'cubic-bezier(.2,.75,.3,1)' });
}
// الضغط على الخلفية السوداء يسكّر (وزر Esc يشتغل من نفسه)
zoomDlg.onclick = e => { if (e.target === zoomDlg) zoomDlg.close(); };
zoomDlg.addEventListener('close', () => { live = live.filter(L => !L.zoom); });

// ===== التحميل والمشاركة =====
function toBlob(spec) {
  const sz = size(), c = document.createElement('canvas');
  c.width = sz.w; c.height = sz.h;
  drawPost(c.getContext('2d'), sz.w, sz.h, applyGrad(applyFont(spec)), fields());
  return new Promise(res => c.toBlob(res, 'image/png'));
}

// اسم كل ملف فريد — تنزيل عدة تصاميم ما يتعارض ولا يستبدل بعضه
const outName = ext => postFileName(TYPES[typeEl.value || 0].en.name, size().id, ext);

function download(blob, ext) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = outName(ext);
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

async function save(spec) { download(await toBlob(spec), 'png'); }

// ===== تصدير الفيديو =====
// نفضّل MP4 لأن إنستقرام يقبله مباشرة. WebM بديل لو المتصفح ما يعرف MP4.
const VIDEO_TYPES = ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'];
const videoType = typeof MediaRecorder === 'undefined' ? null
  : VIDEO_TYPES.find(t => MediaRecorder.isTypeSupported(t));
const canRecord = !!(videoType &&
  typeof document.createElement('canvas').captureStream === 'function');
const LOOPS = 2;   // دورتان ≈ ٥-٨ ثوانٍ، يناسب الستوري والريلز

async function saveVideo(spec, btn) {
  if (!canRecord) return alert(T().noVideo);
  const label = btn.textContent;
  btn.textContent = T().recording;
  btn.disabled = true;
  try {
    const sz = size(), f = fields();
    const c = document.createElement('canvas');
    c.width = sz.w; c.height = sz.h;
    const ctx = c.getContext('2d');
    const rec = new MediaRecorder(c.captureStream(30),
      { mimeType: videoType, videoBitsPerSecond: 8e6 });
    const chunks = [];
    rec.ondataavailable = e => e.data.size && chunks.push(e.data);
    const stopped = new Promise(r => rec.onstop = r);

    drawPost(ctx, sz.w, sz.h, spec, f, 0);
    rec.start();
    // الفيديو يتبع نفس السرعة والشدة اللي ضبطها بالمزالج — اللي يشوفه هو اللي ينزّله
    const dur = cycleMs(spec), total = dur * LOOPS;
    const start = performance.now();
    await new Promise(done => {
      const frame = now => {
        const el = now - start;
        drawPost(ctx, sz.w, sz.h, spec, f, (el % dur) / dur);
        el >= total ? done() : requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
    rec.stop();
    await stopped;

    download(new Blob(chunks, { type: videoType }),
      videoType.startsWith('video/mp4') ? 'mp4' : 'webm');
  } finally {
    btn.textContent = label;
    btn.disabled = false;
  }
}

async function share(spec) {
  const file = new File([await toBlob(spec)], 'post.png', { type: 'image/png' });
  if (!navigator.canShare || !navigator.canShare({ files: [file] })) return save(spec);
  navigator.share({ files: [file] }).catch(() => {}); // لو سكّر القائمة، ما نسوي شي
}

// ===== المجموعات والرجوع =====
const backBtn = document.getElementById('back');
const useBrand = document.getElementById('useBrand');
const brandColor = document.getElementById('brandColor');
const brandAccent = document.getElementById('brandAccent');
const palettes = () => useBrand.checked ? brandPalettes(brandColor.value, brandAccent.value) : PALETTES;

function build() {
  specs = makeSpecs((base + step * 7919) >>> 0, COUNT, palettes());
  backBtn.disabled = step === 0;
  render();
  loadFonts().then(render); // نعيد الرسم لما توصل الخطوط الحقيقية
}
const go = d => { step = Math.max(0, step + d); build(); };

document.getElementById('more').onclick = () => go(1);
backBtn.onclick = () => go(-1);
// تغيير النص ممكن يبدّل لغة المنشور، فنحتاج خطوطاً ثانية
[titleEl, subEl, nameEl].forEach(i => i.addEventListener('input', () => {
  render();
  loadFonts().then(render);
}));

// ===== العلامة التجارية =====
[useBrand, brandColor, brandAccent].forEach(el => el.addEventListener('input', build));
brandFont.addEventListener('change', () => { render(); loadFonts().then(render); });

const logoInput = document.getElementById('logo');
const clearLogo = document.getElementById('clearLogo');
// الشعار يُحفظ كصورة داخل المتصفح ليبقى بعد إغلاق الصفحة.
// ponytail: حدّ ٧٠٠ كيلوبايت — حصة التخزين ~٥ ميجابايت والصورة تكبر ٣٣٪ بالترميز.
// لو صار الناس يرفعون شعارات ضخمة، ننزّل المقاس قبل الحفظ بدل الرفض.
const LOGO_MAX = 700 * 1024;

function useLogo(src, save) {
  const img = new Image();
  img.onload = () => {
    logo = img; clearLogo.hidden = false; render();
    if (!save) return;
    try { localStorage.setItem('logo', src); }
    catch { localStorage.removeItem('logo'); alert(T().logoTooBig); }
  };
  img.onerror = () => { if (save) alert(T().badImage); else localStorage.removeItem('logo'); };
  img.src = src;
}

logoInput.addEventListener('change', () => {
  const file = logoInput.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    const src = r.result;
    if (src.length > LOGO_MAX) { useLogo(src, false); alert(T().logoTooBig); }
    else useLogo(src, true);
  };
  r.onerror = () => alert(T().badImage);
  r.readAsDataURL(file);
});
clearLogo.onclick = () => {
  logo = null; logoInput.value = ''; clearLogo.hidden = true;
  localStorage.removeItem('logo'); render();
};

// إعدادات العلامة تنحفظ بالمتصفح — يضبطها مرة وحدة وخلاص (الشعار ما ينحفظ)
const BRAND_KEY = 'brand';
function loadBrand() {
  try {
    const s = JSON.parse(localStorage.getItem(BRAND_KEY));
    if (!s) return;
    useBrand.checked = s.useBrand;
    brandColor.value = s.brandColor;
    brandAccent.value = s.brandAccent;
    brandFont.value = s.brandFont;
    if (s.useBrand || s.brandFont) document.getElementById('brandBox').open = true;
  } catch { /* إعدادات معطوبة؟ نبدأ بالافتراضي */ }
}
[useBrand, brandColor, brandAccent, brandFont].forEach(el =>
  el.addEventListener('change', () => localStorage.setItem(BRAND_KEY, JSON.stringify({
    useBrand: useBrand.checked, brandColor: brandColor.value,
    brandAccent: brandAccent.value, brandFont: brandFont.value,
  }))));

// ===== الصورة =====
const photoInput = document.getElementById('photo');
const clearPhoto = document.getElementById('clearPhoto');
photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (image) URL.revokeObjectURL(image.src);
  const img = new Image();
  img.onload = () => { image = img; clearPhoto.hidden = false; render(); };
  img.onerror = () => alert(T().badImage);
  img.src = URL.createObjectURL(file);
});
clearPhoto.onclick = () => {
  if (image) URL.revokeObjectURL(image.src);
  image = null; photoInput.value = ''; clearPhoto.hidden = true; render();
};

// اسم المحل ما يتغيّر كل مرة — نحفظه بالمتصفح عشان ما يعيد كتابته
nameEl.value = localStorage.getItem('shopName') ||
  (ui === 'ar' ? 'مطعم الديوان' : 'Diwan Café');
nameEl.addEventListener('input', () => localStorage.setItem('shopName', nameEl.value));

// ===== معرض أمثلة — يُرسم بنفس المحرّك، لا صور جاهزة =====
// ponytail: بذور ثابتة عشان الأمثلة ما تتغيّر كل زيارة. لو بغيت تنويعاً، بدّل الأرقام.
const SHOWCASE = [
  { seed: 4111, type: 'افتتاح', name: 'مقهى الرواق' },
  { seed: 917, type: 'خصم', name: 'متجر ليان' },
  { seed: 2604, type: 'وجبة اليوم', name: 'مطعم الديوان' },
  { seed: 7788, type: 'وظيفة شاغرة', name: 'صالون نور' },
  { seed: 5150, type: 'مسابقة', name: 'حلويات بسمة' },
  { seed: 3322, type: 'مواعيد الدوام', name: 'عيادة الشفاء' },
];

function drawShowcase() {
  const box = document.getElementById('showcase');
  if (!box) return;
  box.innerHTML = '';
  for (const s of SHOWCASE) {
    const i = TYPES.findIndex(x => x.ar.name === s.type);
    if (i < 0) continue;
    const t = TYPES[i][ui];
    const spec = makeSpecs(s.seed, 1)[0];
    const c = document.createElement('canvas');
    c.width = 420; c.height = 420;
    drawPost(c.getContext('2d'), 420, 420, spec, {
      title: t.t[1], sub: t.s[1], name: ui === 'ar' ? s.name : t.name,
      lang: ui, mood: TYPES[i].mood, textScale: 1, scrim: 0.7,
    }, null);
    box.appendChild(c);
  }
}

paintUI();
loadBrand();
loadExtras();
applyType();
build();
drawShowcase();
loadFonts().then(drawShowcase);   // نعيد رسمه لمّا توصل الخطوط الحقيقية
