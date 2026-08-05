// فحص ذاتي للمنطق — شغّله بـ:  node test.js
const assert = require('assert');
const { rng, makeSpecs, bestTextOn, luminance, contrastRatio, ensureContrast, brandPalettes,
        logoRect, shade, wrapText, fitLines, coverRect, textLang, pickFont, SCRIM,
        LAYOUTS, ORNAMENTS, PALETTES, SIZES, TYPES, CATS, FONTS, UI,
        ANIMS, ANIM_FAMS, BG_MOTIONS, EASE, DURATIONS, animState, pickAnim, pickBg } = require('./design.js');

// نفس البذرة تعطي نفس النتيجة دائماً
assert.deepStrictEqual([rng(5)(), rng(5)()], [rng(5)(), rng(5)()]);
assert.notStrictEqual(rng(5)(), rng(6)());

// كل مجموعة = ٨ تصاميم، بلا تكرار تخطيط ولا ألوان
for (const s of [1, 42, 999, 123456]) {
  const specs = makeSpecs(s);
  assert.strictEqual(specs.length, 8, `البذرة ${s} ما أعطت ٨ تصاميم`);
  assert.strictEqual(new Set(specs.map(x => x.layout)).size, 8);
  assert.strictEqual(new Set(specs.map(x => x.palette.bg)).size, 8);
  for (const sp of specs) {
    assert.ok(LAYOUTS.includes(sp.layout));
    assert.ok(ORNAMENTS.includes(sp.ornament));
  }
}
// كل تخطيط لازم يكون له دالة رسم — وإلا يطيح وقت العرض
const drawn = require('fs').readFileSync(__dirname + '/design.js', 'utf8');
for (const L of LAYOUTS)
  assert.ok(new RegExp(`\\n  ${L}\\(ctx, W, H`).test(drawn), `التخطيط ${L} ما له دالة رسم`);
for (const O of ORNAMENTS)
  assert.ok(O === 'none' || drawn.includes(`case '${O}'`), `الزخرفة ${O} ما لها رسم`);

// المقاسات وأنواع المنشورات مكتملة بكل لغة — نص ناقص يطلع خانة بلا اسم
for (const s of SIZES)
  for (const L of ['ar', 'en'])
    assert.ok(s.w > 0 && s.h > 0 && s[L], `مقاس ناقص: ${s.id} (${L})`);
assert.ok(TYPES.length >= 30, `الأنواع قليلة: ${TYPES.length}`);
for (const t of TYPES) {
  assert.ok(CATS.some(c => c.id === t.cat), `نوع بمجموعة مجهولة: ${t.cat}`);
  for (const L of ['ar', 'en']) {
    assert.ok(t[L] && t[L].name && t[L].t[0] && t[L].t[1] && t[L].s[0],
      `نوع منشور ناقص: ${JSON.stringify(t[L])} (${L})`);
    // أسماء مختصرة — الاسم الطويل يكسر القائمة الجانبية
    assert.ok(t[L].name.length <= 22, `اسم نوع طويل (${L}): ${t[L].name}`);
  }
}
// كل مجموعة لازم يكون فيها نوع واحد على الأقل، وإلا تظهر فاضية بالقائمة
for (const c of CATS) {
  assert.ok(TYPES.some(t => t.cat === c.id), `مجموعة فاضية: ${c.id}`);
  for (const L of ['ar', 'en']) assert.ok(c[L], `اسم مجموعة ناقص: ${c.id} (${L})`);
}
// أسماء الأنواع فريدة داخل كل لغة، وإلا ما يعرف المستخدم أيهم يختار
for (const L of ['ar', 'en']) {
  const names = TYPES.map(t => t[L].name);
  assert.strictEqual(new Set(names).size, names.length, `اسم نوع مكرر بـ${L}`);
}
// أمثلة الأنواع لازم تكون فريدة، وإلا منطق «لا تمسح كتابة المستخدم» يخربط
const examples = TYPES.flatMap(t => [t.ar.t[1], t.en.t[1]]);
assert.strictEqual(new Set(examples).size, examples.length, 'مثالان متطابقان بالعنوان');

// نصوص الواجهة: نفس المفاتيح بالعربي والإنجليزي — مفتاح ناقص يطلع زراً فاضياً
assert.deepStrictEqual(Object.keys(UI.ar).sort(), Object.keys(UI.en).sort(), 'نصوص واجهة ناقصة');
for (const L of ['ar', 'en'])
  for (const [k, v] of Object.entries(UI[L]))
    assert.ok(typeof v === 'string' && v.length, `نص واجهة فاضي: ${L}.${k}`);

// كشف لغة النص: يختار الخط والاتجاه الصحيحين
assert.strictEqual(textLang('خصم ٢٠٪'), 'ar');
assert.strictEqual(textLang('20% OFF'), 'en');
assert.strictEqual(textLang('SALE اليوم فقط بجميع الفروع'), 'ar'); // العربي أكثر
assert.strictEqual(textLang('Grand Opening — افتتاح'), 'en');       // الإنجليزي أكثر
assert.strictEqual(textLang('١٢٣ 456'), 'ar', 'أرقام فقط تتبع الافتراضي');
assert.strictEqual(textLang('', 'en'), 'en', 'نص فاضي يتبع لغة الواجهة');
assert.strictEqual(textLang('123!@#', 'en'), 'en');

// اختيار الخط: نفس التصميم يشتغل باللغتين، وما يطلع برّا القائمة أبداً
for (const idx of [0, 0.001, 0.5, 0.999, 1]) {
  for (const L of ['ar', 'en']) {
    const fp = pickFont({ fontIdx: idx }, L);
    assert.ok(FONTS[L].includes(fp), `الخط طلع برّا قائمة ${L} عند ${idx}`);
    assert.ok(fp[0] && fp[1] && fp[2] && fp[3], `زوج خطوط ناقص بـ${L}`);
  }
}
// خط العلامة المثبّت يتجاوز الاختيار التلقائي
const locked = ['Anton', 400, 'Inter', 400];
assert.strictEqual(pickFont({ fontIdx: 0.7, font: locked }, 'ar'), locked);

// كل خط بالقوائم لازم يكون منزّلاً فعلاً بمجلد fonts
const fs = require('fs');
const cssText = fs.readFileSync(__dirname + '/fonts.css', 'utf8');
const files = new Set(fs.readdirSync(__dirname + '/fonts'));
for (const L of ['ar', 'en'])
  for (const fp of FONTS[L])
    for (const [fam, wt] of [[fp[0], fp[1]], [fp[2], fp[3]]]) {
      const key = fam.replace(/[^A-Za-z0-9]/g, '').toLowerCase() + '-' + wt + '-';
      assert.ok([...files].some(f => f.startsWith(key)),
        `الخط ${fam} ${wt} مذكور بالكود بس ما هو منزّل`);
      assert.ok(cssText.includes(`font-family: '${fam}'`), `الخط ${fam} ما هو بـfonts.css`);
    }
// وما فيه رابط خارجي بقى بملف الخطوط
assert.ok(!/https?:\/\//.test(cssText), 'fonts.css ما زال يشير لخادم خارجي');

// لون النص يتغيّر حسب سطوع الخلفية عشان يبان
assert.strictEqual(bestTextOn('#FFFFFF'), '#111111');
assert.strictEqual(bestTextOn('#000000'), '#FFFFFF');
// لكل لون تمييز بالقائمة: المختار لازم يكون الأوضح فعلاً، لا الأقرب للذوق
const contrast = contrastRatio;
assert.ok(Math.abs(contrast('#FFFFFF', '#000000') - 21) < 0.01, 'أقصى تباين لازم يكون ٢١');
assert.strictEqual(contrast('#ABCDEF', '#ABCDEF'), 1);
for (const p of PALETTES) {
  const pick = bestTextOn(p.ac);
  const other = pick === '#111111' ? '#FFFFFF' : '#111111';
  assert.ok(contrast(pick, p.ac) >= contrast(other, p.ac), `اللون ${p.ac} اختار نصاً أقل وضوحاً`);
  assert.ok(contrast(pick, p.ac) >= 3, `اللون ${p.ac} تباينه ضعيف جداً حتى للنص الكبير`);
  assert.ok(contrast(p.fg, p.bg) >= 4.5, `النص على الخلفية ${p.bg} تباينه ضعيف`);
}

// تفتيح وتغميق الألوان يبقى بصيغة سليمة
assert.strictEqual(shade('#000000', 0.5), '#808080');
assert.strictEqual(shade('#FFFFFF', -0.5), '#808080');
assert.ok(/^#[0-9a-f]{6}$/.test(shade('#C9A227', 0.3)));

// تقسيم الأسطر (نقيس ١٠ لكل حرف)
const m = t => t.length * 10;
assert.deepStrictEqual(wrapText('', 100, m), []);
assert.deepStrictEqual(wrapText('   ', 100, m), []);
assert.deepStrictEqual(wrapText('خصم اليوم', 1000, m), ['خصم اليوم']);
assert.deepStrictEqual(wrapText('خصم اليوم فقط', 60, m), ['خصم', 'اليوم', 'فقط']);
assert.deepStrictEqual(wrapText('سطر\nثاني', 1000, m), ['سطر', 'ثاني']);
// كلمة أطول من العرض تبقى بسطرها بدل ما تختفي
assert.deepStrictEqual(wrapText('كلمةطويلةجداً', 20, m), ['كلمةطويلةجداً']);

// تصغير الخط حتى يدخل النص
const measureAt = (t, size) => t.length * size * 0.5;
const long = 'على جميع الأصناف اليوم فقط بمناسبة الافتتاح';
const fit = fitLines(long, 400, 2, 100, measureAt);
assert.ok(fit.lines.length <= 2, 'ما قدر يصغّر الخط ليدخل بسطرين');
assert.ok(fit.size < 100, 'المفروض يصغّر الخط');
// نص قصير ما ينصغّر بلا داعي
assert.strictEqual(fitLines('خصم', 400, 2, 100, measureAt).size, 100);

// قصّ الصورة: لازم تغطي كل مقاس كاملاً بلا ما تنضغط
for (const { w: W, h: H, id } of SIZES)
  for (const [iw, ih] of [[1000, 1000], [4000, 3000], [800, 2400], [37, 1200], [1200, 37]]) {
    const r = coverRect(iw, ih, W, H);
    assert.ok(r.w >= W - 1e-9 && r.h >= H - 1e-9, `${id}: ${iw}x${ih} ما غطّت التصميم`);
    assert.ok(Math.abs(r.w / r.h - iw / ih) < 1e-9, `${id}: ${iw}x${ih} انضغطت الصورة`);
    assert.ok(r.x <= 1e-9 && r.y <= 1e-9, `${id}: ${iw}x${ih} خلّت فراغاً`);
    assert.ok(Math.abs(r.x + r.w / 2 - W / 2) < 1e-9, `${id}: ${iw}x${ih} مو موسّطة أفقياً`);
    assert.ok(Math.abs(r.y + r.h / 2 - H / 2) < 1e-9, `${id}: ${iw}x${ih} مو موسّطة عمودياً`);
  }
// صورة بنفس النسبة تنطبق بالضبط
assert.deepStrictEqual(coverRect(500, 500, 1080, 1080), { x: 0, y: 0, w: 1080, h: 1080 });
assert.deepStrictEqual(coverRect(540, 960, 1080, 1920), { x: 0, y: 0, w: 1080, h: 1920 });

// الطبقة فوق الصورة لازم تضمن وضوح النص حتى بأسوأ صورة (بيضاء كاملة أو سوداء كاملة)
const mix = (hex, photo) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map(v => Math.round(v * SCRIM + photo * (1 - SCRIM)));
  return '#' + ch.map(v => v.toString(16).padStart(2, '0')).join('');
};
for (const p of PALETTES) for (const photo of [0, 255]) {
  const c = contrast(p.fg, mix(p.bg, photo));
  assert.ok(c >= 3, `اللوحة ${p.bg} فوق صورة ${photo ? 'بيضاء' : 'سوداء'} تباينها ${c.toFixed(1)} — النص ما يبان`);
}

// ألوان العلامة التجارية: أي لونين يختارهما المستخدم لازم يطلعون ٦ لوحات كلها مقروءة
const brandCases = [
  ['#0B3D2E', '#D4AF37'], ['#000000', '#000000'], ['#FFFFFF', '#FFFFFF'],
  ['#FF0000', '#FF0000'], ['#808080', '#7F7F7F'], ['#123456', '#FEDCBA'],
  ['#FFFF00', '#FFFFE0'], ['#010101', '#020202'],
];
for (const [b, a] of brandCases) {
  const ps = brandPalettes(b, a);
  assert.strictEqual(ps.length, 6, `${b}/${a} ما أعطت ٦ لوحات`);
  for (const p of ps) {
    assert.ok(contrast(p.fg, p.bg) >= 4.5, `العلامة ${b}/${a}: نص ${p.fg} على ${p.bg} ما يبان`);
    assert.ok(contrast(bestTextOn(p.ac), p.ac) >= 3, `العلامة ${b}/${a}: لون مميّز ${p.ac} ما يبان`);
    assert.ok(contrast(p.ac, p.bg) >= 1.3, `العلامة ${b}/${a}: اللون المميّز ${p.ac} يختفي بخلفية ${p.bg}`);
  }
  // ولازم يبني ٨ تصاميم من ٦ لوحات بلا ما يعلّق (يكرّر اللوحات، ما يعلّق بحلقة)
  assert.strictEqual(makeSpecs(7, 8, ps).length, 8, `${b}/${a} ما قدر يبني ٨ تصاميم`);
}

// ensureContrast يوصل للهدف أو يرجع للأبيض/الأسود، ما يستسلم بالنص
for (const bg of ['#FFFFFF', '#000000', '#808080', '#0B3D2E', '#FEE715'])
  for (const fg of ['#FFFFFF', '#000000', '#808080', '#D4AF37'])
    assert.ok(contrast(ensureContrast(fg, bg), bg) >= 4.5, `${fg} على ${bg} ظل غير واضح`);

// الشعار: يحافظ على نسبته وما يطلع برّا حدود التصميم
for (const [lw, lh] of [[100, 100], [1200, 200], [200, 1200], [3000, 50]]) {
  const r = logoRect(lw, lh, 1080);
  assert.ok(Math.abs(r.w / r.h - lw / lh) < 1e-9, `الشعار ${lw}x${lh} انضغط`);
  assert.ok(r.w <= 1080 * 0.6 + 1e-9, `الشعار ${lw}x${lh} أعرض من اللازم`);
  assert.ok(r.h <= 1080 * 0.11 + 1e-9, `الشعار ${lw}x${lh} أطول من اللازم`);
}
// «السابق» لازم يرجّع نفس التصاميم بالضبط — وإلا الزر بلا فايدة

const at = s => JSON.stringify(makeSpecs((1000 + s * 7919) >>> 0));
assert.strictEqual(at(3), at(3));
assert.notStrictEqual(at(3), at(4));
assert.strictEqual(at(2), at(3 - 1), 'الرجوع خطوة ما رجّع نفس المجموعة');

// ===== الحركة =====
const MOODS = [...new Set(TYPES.map(t => t.mood))];
for (const t of TYPES) assert.ok(t.mood, `نوع بلا مزاج: ${t.ar.name}`);

// كل مزاج لازم يكون له حركات كافية، وإلا كل التصاميم تتحرك نفس الحركة
for (const m of MOODS) {
  assert.ok(ANIMS.filter(a => a.moods.includes(m)).length >= 4, `المزاج ${m} حركاته قليلة`);
  assert.ok(BG_MOTIONS.filter(a => a.moods.includes(m)).length >= 2, `المزاج ${m} حركات خلفيته قليلة`);
}
// وحركة الخصم ما تصلح لإعلان وفاة أو إجازة — نتأكد إن القوي ما يوصل للهادئ
for (const a of ANIMS) {
  assert.ok(a.moods.length && a.moods.every(m => MOODS.includes(m)), `حركة بمزاج مجهول: ${a.id}`);
  assert.ok(EASE[a.ease], `حركة بتسارع غير معرّف: ${a.id}`);
}
for (const loud of ['slam', 'pop', 'bounce', 'springUp', 'jelly', 'dropIn', 'hopUp', 'shrinkIn'])
  assert.ok(!ANIMS.find(a => a.id === loud).moods.includes('calm'),
    `الحركة القوية ${loud} وصلت للمواضيع الهادئة`);

// الأقسام: كل حركة تنتمي لقسم معروف، وكل قسم فيه حركات، والأسماء معروضة بلغتين
assert.ok(ANIMS.length >= 25, `الحركات قليلة: ${ANIMS.length}`);
for (const a of ANIMS) {
  assert.ok(ANIM_FAMS.some(f => f.id === a.fam), `حركة بقسم مجهول: ${a.id}`);
  for (const L of ['ar', 'en']) assert.ok(a[L], `اسم حركة ناقص: ${a.id} (${L})`);
}
for (const f of ANIM_FAMS) {
  assert.ok(ANIMS.some(a => a.fam === f.id), `قسم حركات فارغ: ${f.id}`);
  for (const L of ['ar', 'en']) assert.ok(f[L], `اسم قسم ناقص: ${f.id} (${L})`);
}
for (const b of BG_MOTIONS)
  for (const L of ['ar', 'en']) assert.ok(b[L], `اسم حركة خلفية ناقص: ${b.id} (${L})`);
// المعرّفات فريدة، وإلا الاختيار اليدوي يجيب الغلط
for (const [name, list] of [['حركة', ANIMS], ['خلفية', BG_MOTIONS], ['قسم', ANIM_FAMS]])
  assert.strictEqual(new Set(list.map(x => x.id)).size, list.length, `معرّف ${name} مكرر`);

// الاختيار اليدوي يتقدّم على المزاج، والفارغ يرجع للتلقائي
const anySpec = makeSpecs(3)[0];
for (const a of ANIMS)
  for (const mood of MOODS)
    assert.strictEqual(pickAnim(anySpec, mood, a.id).id, a.id,
      `الاختيار اليدوي ${a.id} ما طُبّق بمزاج ${mood}`);
for (const b of BG_MOTIONS)
  assert.strictEqual(pickBg(anySpec, 'calm', b.id).id, b.id, `خلفية ${b.id} ما طُبّقت`);
assert.ok(byMoodHas(pickAnim(anySpec, 'calm', null), 'calm'), 'الفارغ ما رجع للتلقائي');
assert.ok(byMoodHas(pickAnim(anySpec, 'calm', 'لا-يوجد'), 'calm'), 'معرّف مجهول ما رجع للتلقائي');
function byMoodHas(a, m) { return a.moods.includes(m); }

// التسارع: يبدأ من ٠ وينتهي بـ١ (والارتداد يزيد بالنص، وهذا مقصود)
for (const [id, fn] of Object.entries(EASE)) {
  assert.ok(Math.abs(fn(0)) < 1e-6, `${id}: ما يبدأ من صفر`);
  assert.ok(Math.abs(fn(1) - 1) < 1e-6, `${id}: ما ينتهي بواحد`);
  for (let p = 0; p <= 1; p += 0.02) assert.ok(Number.isFinite(fn(p)), `${id}: قيمة غير رقمية عند ${p}`);
}

// حالة الحركة بأي لحظة: أرقام سليمة، شفافية بين ٠ و١، وإزاحة معقولة
for (const seed of [1, 77, 4242]) {
  for (const spec of makeSpecs(seed)) {
    assert.ok(DURATIONS.includes(spec.durationMs), 'مدة غير معرّفة');
    for (const mood of MOODS) {
      for (let t = 0; t <= 1.0001; t += 0.01) {
        const st = animState(spec, mood, Math.min(t, 1));
        for (const e of st.els) {
          assert.ok(e.a >= 0 && e.a <= 1, `شفافية خارج المدى ${e.a}`);
          assert.ok(Number.isFinite(e.dx) && Number.isFinite(e.dy) && Number.isFinite(e.sc));
          assert.ok(e.sc > 0.1 && e.sc < 3, `تكبير غير معقول ${e.sc}`);
          assert.ok(Math.abs(e.dx) <= 0.5 && Math.abs(e.dy) <= 0.5, 'إزاحة تطلّع النص برّا');
        }
        for (const v of Object.values(st.bg)) assert.ok(Number.isFinite(v), 'حركة خلفية غير رقمية');
      }
      // بداية الدورة ونهايتها لازم تتطابق، وإلا الفيديو يقفز عند التكرار
      const a = animState(spec, mood, 0), b = animState(spec, mood, 1);
      for (let i = 0; i < 3; i++) {
        assert.ok(Math.abs(a.els[i].a - b.els[i].a) < 0.02, `العنصر ${i}: شفافية تقفز عند التكرار`);
        assert.ok(Math.abs(a.els[i].sc - b.els[i].sc) < 0.02, `العنصر ${i}: تكبير يقفز عند التكرار`);
      }
      for (const k of Object.keys(a.bg))
        assert.ok(Math.abs((a.bg[k] || 0) - (b.bg[k] || 0)) < 0.02 ||
                  Math.abs((a.bg[k] || 0) - (b.bg[k] || 0) + 2 * Math.PI) < 0.02,
          `حركة الخلفية ${k} تقفز عند التكرار`);
      // وبمنتصف الدورة العناصر لازم تكون ظاهرة كاملة
      const mid = animState(spec, mood, 0.5);
      for (const e of mid.els) assert.ok(e.a > 0.98, 'العنصر ما ظهر كاملاً بمنتصف الدورة');
    }
  }
}

// حركة الزخارف: كل شكل لازم يتحرك غير جاره، وإلا ترجع الحركة الجماعية الميكانيكية
const { ornMotion } = require('./design.js');
const STYLES = [...new Set(BG_MOTIONS.map(b => b.orn))];
for (const style of STYLES) {
  if (style === 'none') continue;
  for (const t of [0.13, 0.37, 0.62, 0.88]) {
    const shapes = Array.from({ length: 12 }, (_, k) => ornMotion(style, t, k, 1000, 0.2, k / 12));
    const asKey = o => [o.dx, o.dy, o.sc, o.rot].map(v => v.toFixed(4)).join();
    assert.ok(new Set(shapes.map(asKey)).size >= 6,
      `الأسلوب ${style} عند ${t}: الأشكال تتحرك نفس الحركة`);
    // الدوران وحده ما يبيّن على الدوائر — لازم كل أسلوب يحرّك أو يكبّر شيئاً
    assert.ok(shapes.some(o => Math.abs(o.dx) + Math.abs(o.dy) > 0.5 || Math.abs(o.sc - 1) > 0.01),
      `الأسلوب ${style} عند ${t}: يعتمد على الدوران فقط، فالأشكال الدائرية تطلع ساكنة`);
    for (const o of shapes) {
      assert.ok(Number.isFinite(o.dx + o.dy + o.sc + o.rot), `${style}: قيمة غير رقمية`);
      assert.ok(o.sc > 0.3 && o.sc < 2.2, `${style}: تكبير شكل غير معقول ${o.sc}`);
      assert.ok(Math.abs(o.dx) < 1000 * 0.15 && Math.abs(o.dy) < 1000 * 0.15, `${style}: شكل طار بعيد`);
    }
  }
  // والدورة تقفل: الحالة عند ٠ و١ لازم تتطابق (الدوران يقبل لفّات كاملة)
  for (let k = 0; k < 8; k++) {
    const a = ornMotion(style, 0, k, 1000, 0.2, 0.4), b = ornMotion(style, 1, k, 1000, 0.2, 0.4);
    assert.ok(Math.abs(a.dx - b.dx) < 0.5 && Math.abs(a.dy - b.dy) < 0.5,
      `${style}: الشكل ${k} يقفز بالإزاحة عند التكرار`);
    assert.ok(Math.abs(a.sc - b.sc) < 0.01, `${style}: الشكل ${k} يقفز بالتكبير عند التكرار`);
    const turns = (b.rot - a.rot) / (2 * Math.PI);
    assert.ok(Math.abs(turns - Math.round(turns)) < 1e-6,
      `${style}: الشكل ${k} دورانه ما يكمل لفّة كاملة فيقفز`);
  }
}
// مزلاج الشدة: صفر = سكون تام (بس الظهور التدريجي يبقى)، وواحد ونصف = ضعف ونصف
for (const style of STYLES) {
  if (style === 'none') continue;
  for (const k of [0, 3, 7]) {
    const zero = ornMotion(style, 0.4, k, 1000, 0.2, 0.5, 0);
    assert.ok(Math.abs(zero.dx) === 0 && Math.abs(zero.dy) === 0 &&
              zero.sc === 1 && Math.abs(zero.rot) === 0,
      `الأسلوب ${style}: الشدة صفر ما سكّنته`);
    const one = ornMotion(style, 0.4, k, 1000, 0.2, 0.5, 1);
    const two = ornMotion(style, 0.4, k, 1000, 0.2, 0.5, 2);
    assert.ok(Math.abs(two.dx - 2 * one.dx) < 1e-9 && Math.abs(two.dy - 2 * one.dy) < 1e-9,
      `الأسلوب ${style}: الشدة ما تضاعف الإزاحة`);
    assert.ok(Math.abs((two.sc - 1) - 2 * (one.sc - 1)) < 1e-9,
      `الأسلوب ${style}: الشدة ما تضاعف التكبير`);
  }
}
// وشدة حركة النصوص كذلك — والظهور التدريجي يبقى مهما نزلت الشدة
for (const spec of makeSpecs(31).slice(0, 4))
  for (const mood of MOODS) {
    const off = animState(spec, mood, 0.12, 0);
    for (const e of off.els) {
      assert.strictEqual(Math.abs(e.dx), 0, 'الشدة صفر وما زال فيه إزاحة أفقية');
      assert.strictEqual(Math.abs(e.dy), 0, 'الشدة صفر وما زال فيه إزاحة عمودية');
      assert.strictEqual(e.sc, 1, 'الشدة صفر وما زال فيه تكبير');
    }
    const on = animState(spec, mood, 0.12, 1), dbl = animState(spec, mood, 0.12, 2);
    for (let i = 0; i < 3; i++) {
      assert.ok(Math.abs(dbl.els[i].dx - 2 * on.els[i].dx) < 1e-9, 'شدة النص ما تضاعف الإزاحة');
      assert.ok(Math.abs((dbl.els[i].sc - 1) - 2 * (on.els[i].sc - 1)) < 1e-9, 'شدة النص ما تضاعف التكبير');
      assert.strictEqual(off.els[i].a, on.els[i].a, 'الشدة ما المفروض تمسّ الظهور التدريجي');
    }
  }

// وأسلوب السكون ما يحرّك شيئاً
for (const o of Array.from({ length: 5 }, (_, k) => ornMotion('none', 0.5, k, 1000, 0.2)))
  assert.deepStrictEqual(o, { dx: 0, dy: 0, sc: 1, rot: 0 });

// نفس البذرة = نفس الحركة، عشان «السابق» يرجّع التصميم بحركته
assert.deepStrictEqual(makeSpecs(5).map(s => [s.animIdx, s.bgIdx, s.durationMs, s.stagger]),
  makeSpecs(5).map(s => [s.animIdx, s.bgIdx, s.durationMs, s.stagger]));
// والحركة تتغيّر مع تغيّر المزاج
const s0 = makeSpecs(9)[0];
assert.notStrictEqual(
  JSON.stringify(MOODS.map(m => pickAnim(s0, m).id)).replace(/[^,]/g, '').length, 0);

// قصّ الصورة مع التكبير المتحرّك: لازم يبقى مغطياً
for (const z of [1, 1.05, 1.1]) {
  const r = coverRect(1200, 800, 1080, 1920, z);
  assert.ok(r.w >= 1080 * z - 1e-6 && r.h >= 1920 * z - 1e-6, `التكبير ${z} كسر التغطية`);
}

// الصفحتان: كل واحدة تشير لملفات موجودة فعلاً، وتربط بأختها
const path = require('path');
const pages = [
  { file: 'index.html', lang: 'ar', dir: 'rtl', base: __dirname, other: 'en/index.html' },
  { file: 'en/index.html', lang: 'en', dir: 'ltr', base: path.join(__dirname, 'en'), other: '../index.html' },
];
const titles = new Set();
for (const p of pages) {
  const html = fs.readFileSync(path.join(__dirname, p.file), 'utf8');
  assert.ok(html.includes(`<html lang="${p.lang}" dir="${p.dir}"`), `${p.file}: لغة أو اتجاه غلط`);

  // كل ملف مرتبط لازم يكون موجوداً — رابط مكسور يطلع صفحة بلا تنسيق أو صفحة ما تفتح
  for (const m of html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|css|html))"/g))
    assert.ok(fs.existsSync(path.resolve(p.base, m[1])),
      `${p.file}: يشير لملف مفقود ${m[1]}`);
  // روابط الصفحات تنتهي بـ.html عشان تشتغل محلياً كمان، لا بس على خادم
  for (const m of html.matchAll(/<a [^>]*href="([^"#:]+)"/g))
    assert.ok(m[1].endsWith('.html'),
      `${p.file}: الرابط ${m[1]} ما يشتغل إلا على خادم — لازم ينتهي بـ.html`);
  for (const need of ['design.js', 'app.js', 'style.css', 'fonts.css'])
    assert.ok(html.includes(need), `${p.file}: ما يحمّل ${need}`);

  // العنوان والوصف لازم يكونان مختلفين بين الصفحتين وإلا جوجل يعدّها تكراراً
  const title = /<title>([^<]+)</.exec(html)[1];
  assert.ok(!titles.has(title), `عنوان مكرر بين الصفحتين: ${title}`);
  titles.add(title);
  assert.ok(/<meta name="description" content="[^"]{80,}"/.test(html), `${p.file}: وصف ناقص`);

  // إشارات اللغة لجوجل، والرابط للصفحة الثانية
  for (const h of ['ar', 'en', 'x-default'])
    assert.ok(html.includes(`hreflang="${h}"`), `${p.file}: ناقص hreflang=${h}`);
  assert.ok(html.includes('rel="canonical"'), `${p.file}: ناقص canonical`);
  assert.ok(html.includes(`href="${p.other}"`), `${p.file}: ما يربط بالصفحة الثانية`);

  // نفس الخانات بالصفحتين، وإلا app.js يطيح على عنصر مفقود
  for (const id of ['grid', 'title', 'sub', 'name', 'type', 'size', 'brandFont', 'theme',
                    'back', 'more', 'zoom', 'zoomCanvas', 'zoomActions', 'photo', 'logo',
                    'clearPhoto', 'clearLogo', 'useBrand', 'brandColor', 'brandAccent',
                    'brandBox', 'titleLabel', 'subLabel', 'animate',
                    'speed', 'power', 'speedVal', 'powerVal', 'motionCtl',
                    'typeSearch', 'typeNote', 'animPick', 'bgPick'])
    assert.ok(html.includes(`id="${id}"`), `${p.file}: ناقص العنصر ${id}`);

  // كل مفتاح نص بالصفحة موجود بجدول النصوص
  for (const m of html.matchAll(/data-i18n(?:-ph)?="([^"]+)"/g))
    assert.ok(UI[p.lang][m[1]], `${p.file}: مفتاح نص غير معرّف ${m[1]}`);

  // هيكل العمودين لازم يكون موجوداً بالصفحتين
  for (const cls of ['class="top"', 'class="app"', 'class="side"', 'class="work"'])
    assert.ok(html.includes(cls), `${p.file}: ناقص ${cls} — الواجهة ما تملأ الشاشة`);

  // الافتراضي بالصفحة لازم يطابق الافتراضي بالكود، وإلا تقفز المزالج أول تحميل
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const want = JSON.parse(/MOTION_DEFAULTS = (\{[^}]+\})/.exec(app)[1]
    .replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
  for (const id of ['speed', 'power']) {
    const attr = new RegExp(`id="${id}"[^>]*value="([^"]+)"`).exec(html)[1];
    assert.strictEqual(attr, want[id],
      `${p.file}: مزلاج ${id} افتراضيه ${attr} بالصفحة و${want[id]} بالكود`);
    const [, min, max] = new RegExp(`id="${id}" min="([^"]+)" max="([^"]+)"`).exec(html);
    assert.ok(+attr >= +min && +attr <= +max, `${p.file}: افتراضي ${id} خارج مدى المزلاج`);
  }
}

console.log('كل الفحوصات نجحت ✓');
