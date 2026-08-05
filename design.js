// مولّد تصاميم منشورات — الكود يعرف يرسم، والتنويع كله بيانات

// ===== البيانات: هنا نكبّر، مو بالكود =====

const PALETTES = [
  { bg: '#0F2027', fg: '#F5F0E6', ac: '#C9A227' },
  { bg: '#1B1B1B', fg: '#FFFFFF', ac: '#E63946' },
  { bg: '#FAF3E0', fg: '#2C2C2C', ac: '#B08968' },
  { bg: '#0B3D2E', fg: '#F2F7F5', ac: '#D4AF37' },
  { bg: '#FFFFFF', fg: '#111827', ac: '#2563EB' },
  { bg: '#2B2118', fg: '#F6E8D6', ac: '#E09F3E' },
  { bg: '#F4EDE4', fg: '#3A2E27', ac: '#A63D40' },
  { bg: '#101820', fg: '#FEE715', ac: '#FEE715' },
  { bg: '#264653', fg: '#F1FAEE', ac: '#E9C46A' },
  { bg: '#F7F3EE', fg: '#1D3557', ac: '#457B9D' },
  { bg: '#3D0C11', fg: '#FFF1E6', ac: '#E5B769' },
  { bg: '#EAE7DC', fg: '#2A2B2E', ac: '#E85A4F' },
  { bg: '#12263A', fg: '#F5F3F5', ac: '#F4A261' },
  { bg: '#FFF8F0', fg: '#4A2C2A', ac: '#D9713C' },
  { bg: '#1A1A2E', fg: '#EAEAEA', ac: '#E94560' },
  { bg: '#F0EBE3', fg: '#2F3E46', ac: '#84A98C' },
  { bg: '#22333B', fg: '#EAE0D5', ac: '#C6AC8F' },
  { bg: '#FDF0D5', fg: '#003049', ac: '#C1121F' },
  { bg: '#000000', fg: '#F5F5F5', ac: '#B8860B' },
  { bg: '#F2E9E4', fg: '#22223B', ac: '#9A8C98' },
  { bg: '#0D1B2A', fg: '#E0E1DD', ac: '#778DA9' },
  { bg: '#FFF3E2', fg: '#5C3D2E', ac: '#2E7D6F' },
  { bg: '#2D132C', fg: '#F5E9E2', ac: '#EE4540' },
  { bg: '#F5F5F5', fg: '#1F2937', ac: '#059669' },
  { bg: '#16302B', fg: '#EAF4F4', ac: '#F2C14E' },
  { bg: '#3A1F04', fg: '#FFE8C2', ac: '#E8A33D' },
  { bg: '#E8EDDF', fg: '#242423', ac: '#D08C34' },
  { bg: '#1D2D44', fg: '#F0EBD8', ac: '#748CAB' },
  { bg: '#FBF7F4', fg: '#3D2B1F', ac: '#8B5E3C' },
  { bg: '#111111', fg: '#EDEDED', ac: '#B8A1FF' },
  { bg: '#1E1B18', fg: '#F5EFE7', ac: '#C08457' },
  { bg: '#FFF9F0', fg: '#33302C', ac: '#A67C52' },
  { bg: '#07393C', fg: '#E8F4F8', ac: '#90DDF0' },
  { bg: '#F2F5EA', fg: '#26361F', ac: '#5B8C3E' },
  { bg: '#2B2D42', fg: '#EDF2F4', ac: '#EF233C' },
  { bg: '#FFFFFF', fg: '#1A1A1A', ac: '#FF6B35' },
  { bg: '#181818', fg: '#F0F0F0', ac: '#00C2A8' },
  { bg: '#FAF0CA', fg: '#33312E', ac: '#F4442E' },
  { bg: '#0A2472', fg: '#F0F3FF', ac: '#FFD166' },
  { bg: '#F6E7E7', fg: '#3D1F2B', ac: '#B23A48' },
  { bg: '#20232A', fg: '#E9ECEF', ac: '#8FD694' },
  { bg: '#FDFCF7', fg: '#2E2B26', ac: '#7D8C5C' },
  { bg: '#3E1F47', fg: '#F6EDF7', ac: '#E5B3FB' },
  { bg: '#E7ECEF', fg: '#274C77', ac: '#6096BA' },
  { bg: '#12100E', fg: '#EDE6DB', ac: '#D9A566' },
];

// [خط العنوان، وزنه، خط النص الصغير، وزنه] — قائمة لكل لغة
const FONTS = {
  ar: [
    ['Cairo', 900, 'Cairo', 400],
    ['Tajawal', 800, 'Tajawal', 400],
    ['Almarai', 800, 'Almarai', 400],
    ['Changa', 700, 'Cairo', 400],
    ['Reem Kufi', 700, 'Tajawal', 400],
    ['El Messiri', 700, 'Almarai', 400],
    ['Amiri', 700, 'Cairo', 400],
    ['Alexandria', 800, 'Alexandria', 400],
    ['Readex Pro', 700, 'Readex Pro', 400],
    ['IBM Plex Sans Arabic', 700, 'IBM Plex Sans Arabic', 400],
    ['Noto Kufi Arabic', 900, 'Tajawal', 400],
    ['Rakkas', 400, 'Cairo', 400],
    ['Lalezar', 400, 'Tajawal', 400],
    ['Aref Ruqaa', 700, 'Almarai', 400],
    ['Marhey', 700, 'Cairo', 400],
    ['Baloo Bhaijaan 2', 800, 'Tajawal', 400],
  ],
  en: [
    ['Anton', 400, 'Inter', 400],
    ['Bebas Neue', 400, 'Montserrat', 400],
    ['Archivo Black', 400, 'Inter', 400],
    ['Oswald', 700, 'Inter', 400],
    ['Montserrat', 900, 'Montserrat', 400],
    ['Poppins', 900, 'Poppins', 400],
    ['Inter', 900, 'Inter', 400],
    ['Playfair Display', 900, 'Montserrat', 400],
    ['Abril Fatface', 400, 'Libre Baskerville', 400],
    ['DM Serif Display', 400, 'Inter', 400],
    ['Space Grotesk', 700, 'Space Grotesk', 400],
    ['Outfit', 900, 'Outfit', 400],
    ['Syne', 800, 'Inter', 400],
    ['Fraunces', 900, 'Libre Baskerville', 400],
    ['Libre Baskerville', 700, 'Inter', 400],
    ['Rubik', 900, 'Rubik', 400],
  ],
};

// لغة النص نفسه، لا لغة الواجهة — عشان يختار الخط والاتجاه الصحيحين
function textLang(text, fallback = 'ar') {
  const ar = (text.match(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]/g) || []).length;
  const en = (text.match(/[A-Za-z]/g) || []).length;
  if (!ar && !en) return fallback;
  return ar >= en ? 'ar' : 'en';
}

// التصميم يخزّن رقماً بين ٠ و١ لا خطاً بعينه، عشان نفس التصميم يشتغل بأي لغة
function pickFont(spec, lang) {
  if (spec.font) return spec.font;
  const list = FONTS[lang];
  return list[Math.min(list.length - 1, Math.floor(spec.fontIdx * list.length))];
}

const LAYOUTS = ['center', 'band', 'topSplit', 'corner', 'frame', 'stack',
                 'bottomBand', 'boxed', 'duo', 'sideBar', 'outline'];
const ORNAMENTS = ['none', 'circles', 'stripes', 'dots', 'arc', 'squares',
                   'rings', 'brackets', 'waves', 'triangles', 'grid', 'burst', 'confetti'];
const BACKDROPS = ['solid', 'gradient'];

const FONT_FAMILIES = [...new Set(
  [...FONTS.ar, ...FONTS.en].flatMap(f => [f[0], f[2]]))];

// المقاسات المدعومة
const SIZES = [
  { id: 'square', w: 1080, h: 1080, ar: 'مربّع — منشور ١:١', en: 'Square — post 1:1' },
  { id: 'portrait', w: 1080, h: 1350, ar: 'عمودي — منشور ٤:٥', en: 'Portrait — post 4:5' },
  { id: 'story', w: 1080, h: 1920, ar: 'ستوري — ٩:١٦', en: 'Story — 9:16' },
];

// مجموعات أنواع المنشورات
const CATS = [
  { id: 'offers', ar: 'عروض وتخفيضات', en: 'Offers & sales' },
  { id: 'store', ar: 'متجر ومنتجات', en: 'Shop & products' },
  { id: 'food', ar: 'مطاعم ومقاهي', en: 'Food & drink' },
  { id: 'services', ar: 'خدمات ومواعيد', en: 'Services & hours' },
  { id: 'events', ar: 'مناسبات وفعاليات', en: 'Events & occasions' },
  { id: 'jobs', ar: 'توظيف', en: 'Hiring' },
  { id: 'content', ar: 'محتوى وتفاعل', en: 'Content & engagement' },
];

// أنواع المنشورات: نفس محرّك التصميم، بس أسماء خانات وأمثلة مختلفة
const TYPES = [
  { cat: 'offers', mood: 'punchy',
    ar: { name: 'خصم', t: ['العنوان الكبير', 'خصم ٢٠٪'], s: ['سطر إضافي', 'على جميع الأصناف — اليوم فقط'] },
    en: { name: 'Discount', t: ['Headline', '20% OFF'], s: ['Extra line', 'Everything in store — today only'] } },
  { cat: 'offers', mood: 'punchy',
    ar: { name: 'عرض اليوم', t: ['العنوان الكبير', 'اليوم فقط'], s: ['سطر إضافي', 'ينتهي العرض ١٠ مساءً'] },
    en: { name: 'Today only', t: ['Headline', 'Today only'], s: ['Extra line', 'Offer ends at 10 PM'] } },
  { cat: 'offers', mood: 'punchy',
    ar: { name: 'قطعتين بسعر', t: ['العنوان الكبير', 'قطعتين بسعر وحدة'], s: ['سطر إضافي', 'على التشكيلة المختارة'] },
    en: { name: 'Buy 1 get 1', t: ['Headline', 'Buy 1 get 1'], s: ['Extra line', 'On selected items'] } },
  { cat: 'offers', mood: 'punchy',
    ar: { name: 'تصفية', t: ['العنوان الكبير', 'تصفية نهائية'], s: ['سطر إضافي', 'حتى نفاد الكمية'] },
    en: { name: 'Clearance', t: ['Headline', 'Final clearance'], s: ['Extra line', 'While stock lasts'] } },
  { cat: 'offers', mood: 'punchy',
    ar: { name: 'كود خصم', t: ['الكود', 'كود خصم ١٠٪'], s: ['التفاصيل', 'استخدم الكود عند الطلب'] },
    en: { name: 'Promo code', t: ['The code', '10% promo code'], s: ['Details', 'Use it at checkout'] } },

  { cat: 'store', mood: 'punchy',
    ar: { name: 'منتج جديد', t: ['اسم المنتج', 'وصل الجديد'], s: ['وصف قصير', 'تشكيلة الشتاء متوفرة الحين'] },
    en: { name: 'New arrival', t: ['Product name', 'New arrivals'], s: ['Short description', 'Winter collection in store now'] } },
  { cat: 'store', mood: 'calm',
    ar: { name: 'نفد المخزون', t: ['العنوان الكبير', 'نفدت الكمية'], s: ['سطر إضافي', 'شكراً لثقتكم — نوفّرها قريباً'] },
    en: { name: 'Sold out', t: ['Headline', 'Sold out'], s: ['Extra line', 'Thank you — restocking soon'] } },
  { cat: 'store', mood: 'friendly',
    ar: { name: 'رجع للتوفر', t: ['العنوان الكبير', 'رجع للتوفر'], s: ['سطر إضافي', 'كمية محدودة'] },
    en: { name: 'Back in stock', t: ['Headline', 'Back in stock'], s: ['Extra line', 'Limited quantity'] } },
  { cat: 'store', mood: 'friendly',
    ar: { name: 'الأكثر مبيعاً', t: ['العنوان الكبير', 'الأكثر طلباً'], s: ['سطر إضافي', 'اختيار عملائنا هذا الشهر'] },
    en: { name: 'Best seller', t: ['Headline', 'Best seller'], s: ['Extra line', "Our customers' pick this month"] } },
  { cat: 'store', mood: 'punchy',
    ar: { name: 'قريباً', t: ['العنوان الكبير', 'قريباً'], s: ['سطر إضافي', 'ترقّبوا الإعلان'] },
    en: { name: 'Coming soon', t: ['Headline', 'Coming soon'], s: ['Extra line', 'Stay tuned'] } },

  { cat: 'food', mood: 'punchy',
    ar: { name: 'صنف جديد', t: ['اسم الصنف', 'صنف جديد'], s: ['الوصف', 'جرّبه اليوم بفروعنا'] },
    en: { name: 'New dish', t: ['Dish name', 'New on the menu'], s: ['Description', 'Try it today at our branches'] } },
  { cat: 'food', mood: 'friendly',
    ar: { name: 'وجبة اليوم', t: ['العنوان الكبير', 'وجبة اليوم'], s: ['التفاصيل', 'وجبة كاملة بـ٢ دينار'] },
    en: { name: "Today's special", t: ['Headline', "Today's special"], s: ['Details', 'Full meal for 2 BD'] } },
  { cat: 'food', mood: 'friendly',
    ar: { name: 'توصيل مجاني', t: ['العنوان الكبير', 'توصيل مجاني'], s: ['الشرط', 'للطلبات فوق ٥ دنانير'] },
    en: { name: 'Free delivery', t: ['Headline', 'Free delivery'], s: ['The condition', 'On orders over 5 BD'] } },
  { cat: 'food', mood: 'friendly',
    ar: { name: 'بوفيه', t: ['العنوان الكبير', 'بوفيه مفتوح'], s: ['الوقت والسعر', 'كل خميس ٧ — ١١ مساءً'] },
    en: { name: 'Buffet', t: ['Headline', 'Open buffet'], s: ['Time and price', 'Every Thursday 7 — 11 PM'] } },
  { cat: 'food', mood: 'calm',
    ar: { name: 'حجز طاولة', t: ['العنوان الكبير', 'احجز طاولتك'], s: ['كيف', 'اتصل أو راسلنا واتساب'] },
    en: { name: 'Reservations', t: ['Headline', 'Book a table'], s: ['How', 'Call or WhatsApp us'] } },

  { cat: 'services', mood: 'calm',
    ar: { name: 'مواعيد الدوام', t: ['العنوان', 'مواعيد الدوام'], s: ['المواعيد', 'السبت — الخميس\n٩ صباحاً حتى ١١ مساءً'] },
    en: { name: 'Opening hours', t: ['Heading', 'Opening hours'], s: ['The hours', 'Saturday — Thursday\n9 AM until 11 PM'] } },
  { cat: 'services', mood: 'friendly',
    ar: { name: 'احجز موعد', t: ['العنوان الكبير', 'احجز موعدك'], s: ['كيف', 'المواعيد محدودة هذا الأسبوع'] },
    en: { name: 'Book now', t: ['Headline', 'Book your slot'], s: ['How', 'Limited slots this week'] } },
  { cat: 'services', mood: 'calm',
    ar: { name: 'الأسعار', t: ['العنوان', 'أسعارنا'], s: ['القائمة', 'قص شعر ٥ د.ب\nحلاقة ٣ د.ب'] },
    en: { name: 'Prices', t: ['Heading', 'Our prices'], s: ['The list', 'Haircut 5 BD\nShave 3 BD'] } },
  { cat: 'services', mood: 'punchy',
    ar: { name: 'خدمة جديدة', t: ['اسم الخدمة', 'خدمة جديدة'], s: ['الوصف', 'متوفرة من اليوم'] },
    en: { name: 'New service', t: ['Service name', 'New service'], s: ['Description', 'Available from today'] } },
  { cat: 'services', mood: 'calm',
    ar: { name: 'انتقلنا', t: ['العنوان الكبير', 'انتقلنا'], s: ['العنوان الجديد', 'الرفاع — شارع ٢١\nنفس الرقم'] },
    en: { name: 'We moved', t: ['Headline', 'We moved'], s: ['New address', 'Riffa — Road 21\nSame phone number'] } },

  { cat: 'events', mood: 'punchy',
    ar: { name: 'افتتاح', t: ['العنوان الكبير', 'افتتاح فرعنا الجديد'], s: ['المكان والوقت', 'الرفاع — بجانب المجمع\nالخميس ٧ مساءً'] },
    en: { name: 'Grand opening', t: ['Headline', 'Now open'], s: ['Where and when', 'Riffa — next to the mall\nThursday 7 PM'] } },
  { cat: 'events', mood: 'punchy',
    ar: { name: 'فعالية', t: ['اسم الفعالية', 'فعالية هذا الأسبوع'], s: ['المكان والوقت', 'الجمعة ٥ مساءً — الدخول مجاني'] },
    en: { name: 'Event', t: ['Event name', "This week's event"], s: ['Where and when', 'Friday 5 PM — free entry'] } },
  { cat: 'events', mood: 'punchy',
    ar: { name: 'مسابقة', t: ['العنوان الكبير', 'مسابقة'], s: ['الشروط', 'تابعنا وشارك المنشور\nالسحب الأحد'] },
    en: { name: 'Giveaway', t: ['Headline', 'Giveaway'], s: ['How to enter', 'Follow and share this post\nDraw on Sunday'] } },
  { cat: 'events', mood: 'friendly',
    ar: { name: 'تهنئة عيد', t: ['العنوان الكبير', 'عيدكم مبارك'], s: ['سطر إضافي', 'كل عام وأنتم بخير'] },
    en: { name: 'Eid greeting', t: ['Headline', 'Eid Mubarak'], s: ['Extra line', 'Wishing you a blessed Eid'] } },
  { cat: 'events', mood: 'friendly',
    ar: { name: 'اليوم الوطني', t: ['العنوان الكبير', 'اليوم الوطني'], s: ['سطر إضافي', 'كل عام والوطن بألف خير'] },
    en: { name: 'National day', t: ['Headline', 'National Day'], s: ['Extra line', 'Celebrating our country'] } },
  { cat: 'events', mood: 'calm',
    ar: { name: 'رمضان', t: ['العنوان الكبير', 'رمضان كريم'], s: ['التفاصيل', 'مواعيد الدوام بالشهر الفضيل\n٩ مساءً — ٢ فجراً'] },
    en: { name: 'Ramadan', t: ['Headline', 'Ramadan Kareem'], s: ['Details', 'Ramadan hours\n9 PM — 2 AM'] } },
  { cat: 'events', mood: 'calm',
    ar: { name: 'إجازة', t: ['العنوان', 'إجازة العيد'], s: ['التفاصيل', 'مسكّرين ٢٩ و٣٠ — نعتذر منكم'] },
    en: { name: 'Closed', t: ['Heading', 'Holiday closure'], s: ['Details', 'Closed on the 29th and 30th — sorry!'] } },

  { cat: 'jobs', mood: 'friendly',
    ar: { name: 'وظيفة شاغرة', t: ['العنوان الكبير', 'مطلوب موظف'], s: ['التفاصيل', 'خبرة سنة — دوام كامل\nواتساب ٣٣٣٣٣٣٣٣'] },
    en: { name: 'We are hiring', t: ['Headline', "We're hiring"], s: ['Details', 'One year experience — full time\nWhatsApp 33333333'] } },
  { cat: 'jobs', mood: 'friendly',
    ar: { name: 'تدريب', t: ['العنوان الكبير', 'فرصة تدريب'], s: ['التفاصيل', 'شهرين — للطلبة\nأرسل سيرتك'] },
    en: { name: 'Internship', t: ['Headline', 'Internship open'], s: ['Details', 'Two months — for students\nSend your CV'] } },

  { cat: 'content', mood: 'calm',
    ar: { name: 'عبارة', t: ['العبارة', 'خير الناس أنفعهم للناس'], s: ['المصدر (اختياري)', ''] },
    en: { name: 'Quote', t: ['The quote', 'Done is better than perfect'], s: ['Source (optional)', ''] } },
  { cat: 'content', mood: 'calm',
    ar: { name: 'نصيحة', t: ['النصيحة', 'نصيحة اليوم'], s: ['الشرح', 'اكتب هنا نصيحة قصيرة من مجالك'] },
    en: { name: 'Tip', t: ['The tip', 'Tip of the day'], s: ['Explanation', 'Write a short tip from your field'] } },
  { cat: 'content', mood: 'friendly',
    ar: { name: 'سؤال للمتابعين', t: ['السؤال', 'وش رأيكم؟'], s: ['التوضيح', 'قولوا لنا بالتعليقات'] },
    en: { name: 'Ask followers', t: ['The question', 'What do you think?'], s: ['Clarification', 'Tell us in the comments'] } },
  { cat: 'content', mood: 'friendly',
    ar: { name: 'شكراً لكم', t: ['العنوان الكبير', 'شكراً لكم'], s: ['سطر إضافي', 'وصلنا ١٠٠٠ متابع بفضلكم'] },
    en: { name: 'Thank you', t: ['Headline', 'Thank you'], s: ['Extra line', 'We reached 1,000 followers'] } },
  { cat: 'content', mood: 'punchy',
    ar: { name: 'قبل وبعد', t: ['العنوان الكبير', 'قبل وبعد'], s: ['التفاصيل', 'شغلنا يتكلم عنّا'] },
    en: { name: 'Before / after', t: ['Headline', 'Before and after'], s: ['Details', 'Our work speaks for itself'] } },
  { cat: 'content', mood: 'calm',
    ar: { name: 'رأي عميل', t: ['الاقتباس', 'رأي عميل'], s: ['الاسم', 'اكتب هنا كلام العميل كما قاله'] },
    en: { name: 'Testimonial', t: ['The quote', 'Customer review'], s: ['Name', "Write the customer's words here"] } },
  { cat: 'content', mood: 'friendly',
    ar: { name: 'تابعونا', t: ['العنوان الكبير', 'تابعونا'], s: ['الحسابات', 'إنستقرام وسناب: نفس الاسم'] },
    en: { name: 'Follow us', t: ['Headline', 'Follow us'], s: ['Accounts', 'Instagram and Snapchat: same handle'] } },
  { cat: 'content', mood: 'friendly',
    ar: { name: 'الرابط بالبايو', t: ['العنوان الكبير', 'الرابط بالبايو'], s: ['سطر إضافي', 'اطلب من الرابط أعلى الحساب'] },
    en: { name: 'Link in bio', t: ['Headline', 'Link in bio'], s: ['Extra line', 'Order from the link above'] } },
];

// نصوص الواجهة — الأزرار والعناوين القصيرة. الشرح الطويل موجود بالصفحة نفسها.
const UI = {
  ar: {
    dir: 'rtl', lang: 'ar', other: 'English', pageTitle: 'تصميم منشور إنستقرام بالعربي — بلا خبرة تصميم',
    h1: 'صمّم منشور إنستقرام — بلا أي خبرة',
    lede: 'اختر نوع المنشور، اكتب نصك، وبتشوف تصاميم جاهزة على طول. مجاني بالكامل، بلا تسجيل، ويشتغل من الجوال.',
    lType: 'نوع المنشور', lSize: 'المقاس', lName: 'اسم المحل (اختياري)',
    lPhoto: 'صورة من عندك (اختياري)', clearPhoto: 'احذف الصورة',
    back: '↩ السابق', more: 'تصاميم غيرها ↻',
    download: '⬇ تحميل', share: '↗ مشاركة', close: '✕ إغلاق', zoomTip: 'اضغط للتكبير',
    brand: 'علامتك التجارية (اختياري)', useBrand: 'استخدم ألوان علامتي بكل التصاميم',
    primary: 'اللون الأساسي', accent: 'اللون المميّز', bFont: 'خط العلامة',
    autoFont: 'تلقائي — خط مختلف بكل تصميم', lLogo: 'شعار المحل (صورة PNG بخلفية شفافة أفضل)',
    clearLogo: 'احذف الشعار', dark: '🌙 غامق', light: '☀️ فاتح',
    badImage: 'ما قدرنا نقرأ هذي الصورة. جرّب صورة ثانية.',
    animate: 'حركة', video: '🎬 فيديو', recording: 'يسجّل…',
    noVideo: 'متصفحك ما يدعم تصدير الفيديو. جرّب كروم أو إدج.',
    speed: 'السرعة', power: 'الشدة',
    searchTypes: 'ابحث عن نوع…', noTypes: 'ما فيه نوع بهذا الاسم', results: 'التصاميم',
    lAnim: 'حركة النص', lBg: 'حركة الخلفية', autoAnim: 'تلقائي — حسب نوع المنشور',
  },
  en: {
    dir: 'ltr', lang: 'en', other: 'العربية', pageTitle: 'Free Instagram Post Maker — no design skills',
    h1: 'Make an Instagram post — no design skills',
    lede: 'Pick a post type, type your text, and finished designs appear instantly. Completely free, no sign-up, works on your phone.',
    lType: 'Post type', lSize: 'Size', lName: 'Business name (optional)',
    lPhoto: 'Your photo (optional)', clearPhoto: 'Remove photo',
    back: '↩ Back', more: 'More designs ↻',
    download: '⬇ Download', share: '↗ Share', close: '✕ Close', zoomTip: 'Tap to enlarge',
    brand: 'Your brand (optional)', useBrand: 'Use my brand colours in every design',
    primary: 'Primary colour', accent: 'Accent colour', bFont: 'Brand font',
    autoFont: 'Automatic — a different font per design', lLogo: 'Your logo (PNG with transparent background is best)',
    clearLogo: 'Remove logo', dark: '🌙 Dark', light: '☀️ Light',
    badImage: "We couldn't read that image. Try another one.",
    animate: 'Motion', video: '🎬 Video', recording: 'Recording…',
    noVideo: "Your browser can't export video. Try Chrome or Edge.",
    speed: 'Speed', power: 'Strength',
    searchTypes: 'Search post types…', noTypes: 'No type matches that', results: 'Designs',
    lAnim: 'Text motion', lBg: 'Background motion', autoAnim: 'Automatic — follows post type',
  },
};

// ===== الحركة =====
// كل نوع منشور له مزاج، وكل حركة تناسب مزاجاً أو أكثر. خصم ٥٠٪ يستاهل حركة قوية،
// وإعلان إجازة عيد أو عبارة حكمة ما يستاهل — الحركة تتبع الموضوع لا العكس.

const EASE = {
  linear: p => p,
  out: p => 1 - Math.pow(1 - p, 3),
  outQuint: p => 1 - Math.pow(1 - p, 5),
  inOut: p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  outBack: p => { const c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
  outElastic: p => p <= 0 ? 0 : p >= 1 ? 1
    : Math.pow(2, -9 * p) * Math.sin((p * 10 - 0.75) * (2 * Math.PI / 3)) + 1,
};

// عائلات الحركة — أقسام يختار منها المستخدم
const ANIM_FAMS = [
  { id: 'fade', ar: 'ظهور تدريجي', en: 'Fade in' },
  { id: 'slide', ar: 'انزلاق', en: 'Slide' },
  { id: 'scale', ar: 'تكبير وتصغير', en: 'Scale' },
  { id: 'spring', ar: 'ارتداد', en: 'Spring' },
  { id: 'special', ar: 'حركات خاصة', en: 'Special' },
];

// at(p) يرجّع: a الشفافية، dx/dy الإزاحة (نسبة من المقاس)، sc التكبير
const ANIMS = [
  { id: 'fadeUp', fam: 'fade', ar: 'ظهور صاعد', en: 'Fade up', moods: ['punchy', 'calm', 'friendly'], ease: 'out', at: p => ({ a: p, dy: (1 - p) * 0.05 }) },
  { id: 'fadeIn', fam: 'fade', ar: 'ظهور بسيط', en: 'Simple fade', moods: ['punchy', 'calm', 'friendly'], ease: 'out', at: p => ({ a: p }) },
  { id: 'creep', fam: 'fade', ar: 'ظهور هادئ جداً', en: 'Very soft fade', moods: ['calm', 'friendly'], ease: 'linear', at: p => ({ a: p, dy: (1 - p) * 0.03 }) },
  { id: 'flash', fam: 'fade', ar: 'ظهور سريع', en: 'Quick fade', moods: ['punchy', 'calm'], ease: 'out', at: p => ({ a: Math.min(1, p * 2) }) },
  { id: 'wipe', fam: 'fade', ar: 'ظهور متأخّر', en: 'Late fade', moods: ['punchy', 'calm'], ease: 'out', at: p => ({ a: p * p * p, dy: (1 - p) * 0.02 }) },
  { id: 'rise', fam: 'slide', ar: 'صعود', en: 'Rise', moods: ['calm', 'friendly'], ease: 'outQuint', at: p => ({ a: p, dy: (1 - p) * 0.12 }) },
  { id: 'sink', fam: 'slide', ar: 'هبوط', en: 'Descend', moods: ['calm'], ease: 'outQuint', at: p => ({ a: p, dy: -(1 - p) * 0.1 }) },
  { id: 'slideUp', fam: 'slide', ar: 'انزلاق من الأسفل', en: 'Slide from below', moods: ['punchy', 'calm', 'friendly'], ease: 'out', at: p => ({ a: p, dy: (1 - p) * 0.18 }) },
  { id: 'slideDown', fam: 'slide', ar: 'انزلاق من الأعلى', en: 'Slide from above', moods: ['punchy', 'calm'], ease: 'out', at: p => ({ a: p, dy: -(1 - p) * 0.18 }) },
  { id: 'slideStart', fam: 'slide', ar: 'انزلاق من البداية', en: 'Slide from start', moods: ['punchy', 'friendly'], ease: 'out', at: p => ({ a: p, dx: (1 - p) * 0.3 }) },
  { id: 'slideEnd', fam: 'slide', ar: 'انزلاق من النهاية', en: 'Slide from end', moods: ['punchy', 'friendly'], ease: 'out', at: p => ({ a: p, dx: -(1 - p) * 0.3 }) },
  { id: 'glideStart', fam: 'slide', ar: 'انسياب طويل', en: 'Long glide', moods: ['calm', 'friendly'], ease: 'inOut', at: p => ({ a: p, dx: (1 - p) * 0.5 }) },
  { id: 'glideEnd', fam: 'slide', ar: 'انسياب معاكس', en: 'Reverse glide', moods: ['calm'], ease: 'inOut', at: p => ({ a: p, dx: -(1 - p) * 0.5 }) },
  { id: 'drift', fam: 'slide', ar: 'انزياح خفيف', en: 'Gentle drift', moods: ['calm'], ease: 'inOut', at: p => ({ a: p, dx: -(1 - p) * 0.06 }) },
  { id: 'grow', fam: 'scale', ar: 'نموّ', en: 'Grow', moods: ['calm', 'friendly'], ease: 'out', at: p => ({ a: p, sc: 0.9 + 0.1 * p }) },
  { id: 'swell', fam: 'scale', ar: 'نموّ واسع', en: 'Big grow', moods: ['calm', 'friendly'], ease: 'outQuint', at: p => ({ a: p, sc: 0.75 + 0.25 * p }) },
  { id: 'zoomBack', fam: 'scale', ar: 'تصغير', en: 'Zoom back', moods: ['calm'], ease: 'out', at: p => ({ a: p, sc: 1.15 - 0.15 * p }) },
  { id: 'recede', fam: 'scale', ar: 'تصغير واسع', en: 'Big zoom back', moods: ['calm'], ease: 'outQuint', at: p => ({ a: p, sc: 1.3 - 0.3 * p }) },
  { id: 'shrinkIn', fam: 'scale', ar: 'انكماش', en: 'Shrink in', moods: ['punchy'], ease: 'out', at: p => ({ a: p, sc: 1.35 - 0.35 * p }) },
  { id: 'pop', fam: 'scale', ar: 'انبثاق', en: 'Pop', moods: ['punchy', 'friendly'], ease: 'outBack', at: p => ({ a: p * 2.2, sc: 0.55 + 0.45 * p }) },
  { id: 'slam', fam: 'scale', ar: 'ارتطام', en: 'Slam', moods: ['punchy'], ease: 'out', at: p => ({ a: p * 1.8, sc: 1.8 - 0.8 * p }) },
  { id: 'bounce', fam: 'spring', ar: 'ارتداد', en: 'Bounce', moods: ['friendly'], ease: 'outElastic', at: p => ({ a: p * 3, dy: (1 - p) * 0.06 }) },
  { id: 'springUp', fam: 'spring', ar: 'نبض صاعد', en: 'Spring up', moods: ['punchy', 'friendly'], ease: 'outElastic', at: p => ({ a: p * 3, sc: 0.8 + 0.2 * p }) },
  { id: 'jelly', fam: 'spring', ar: 'اهتزاز', en: 'Jelly', moods: ['punchy', 'friendly'], ease: 'outElastic', at: p => ({ a: p * 3, sc: 1.25 - 0.25 * p }) },
  { id: 'dropIn', fam: 'spring', ar: 'سقوط', en: 'Drop in', moods: ['punchy', 'friendly'], ease: 'outBack', at: p => ({ a: Math.min(1, p * 2), dy: -(1 - p) * 0.22 }) },
  { id: 'hopUp', fam: 'spring', ar: 'قفزة', en: 'Hop', moods: ['punchy', 'friendly'], ease: 'outElastic', at: p => ({ a: Math.min(1, p * 2.5), dy: (1 - p) * 0.14 }) },
  { id: 'tiltIn', fam: 'special', ar: 'ميلان', en: 'Tilt in', moods: ['punchy', 'friendly'], ease: 'out', at: p => ({ a: p, dx: (1 - p) * 0.12, sc: 0.94 + 0.06 * p }) },
  { id: 'skewIn', fam: 'special', ar: 'انحراف', en: 'Skew in', moods: ['punchy'], ease: 'out', at: p => ({ a: p, dx: -(1 - p) * 0.16, dy: (1 - p) * 0.04 }) },
];

// حركة الخلفية. orn تحدّد أسلوب حركة الزخارف — وكل شكل داخلها يتحرك لحاله لا ككتلة.
// كلها دورية (تبدأ وتنتهي بنفس الحالة) عشان التكرار ما يقفز.
const BG_MOTIONS = [
  { id: 'still', orn: 'none', ar: 'ساكنة', en: 'Still', moods: ['punchy', 'calm', 'friendly'], at: () => ({}) },
  { id: 'kenBurns', orn: 'float', ar: 'تقريب بطيء', en: 'Slow zoom', moods: ['punchy', 'calm', 'friendly'], at: p => ({ zoom: 1 + 0.07 * cyc(p) }) },
  { id: 'breathe', orn: 'pulse', ar: 'تنفّس', en: 'Breathe', moods: ['calm', 'friendly'], at: p => ({ zoom: 1 + 0.025 * cyc(p) }) },
  { id: 'driftPan', orn: 'float', ar: 'انزياح جانبي', en: 'Side drift', moods: ['calm'], at: p => ({ zoom: 1.06, panX: Math.sin(p * 2 * Math.PI) * 0.02 }) },
  { id: 'ripple', orn: 'ripple', ar: 'تموّج', en: 'Ripple', moods: ['calm', 'friendly'], at: () => ({}) },
  { id: 'throb', orn: 'scatter', ar: 'خفقان', en: 'Throb', moods: ['punchy'], at: p => ({ zoom: 1 + 0.02 * cyc(p * 2) }) },
  { id: 'spin', orn: 'spin', ar: 'دوران', en: 'Spin', moods: ['punchy', 'friendly'], at: () => ({}) },
  { id: 'swirl', orn: 'swirl', ar: 'دوّامة', en: 'Swirl', moods: ['punchy', 'friendly'], at: p => ({ zoom: 1 + 0.03 * cyc(p) }) },
  { id: 'tumble', orn: 'tumble', ar: 'تدحرج', en: 'Tumble', moods: ['punchy'], at: () => ({}) },
  { id: 'orbit', orn: 'orbit', ar: 'مدار', en: 'Orbit', moods: ['punchy', 'friendly'], at: p => ({ zoom: 1 + 0.02 * cyc(p) }) },
  { id: 'wobble', orn: 'wobble', ar: 'ترنّح', en: 'Wobble', moods: ['friendly', 'punchy'], at: () => ({}) },
  { id: 'zoomOut', orn: 'float', ar: 'إبعاد', en: 'Zoom out', moods: ['calm', 'friendly'], at: p => ({ zoom: 1.09 - 0.09 * cyc(p) }) },
  { id: 'sway', orn: 'wobble', ar: 'تمايل', en: 'Sway', moods: ['calm', 'friendly'], at: p => ({ zoom: 1.05, panX: Math.sin(p * 2 * Math.PI) * 0.03 }) },
  { id: 'shimmer', orn: 'ripple', ar: 'لمعان', en: 'Shimmer', moods: ['punchy', 'calm'], at: p => ({ zoom: 1 + 0.015 * cyc(p * 2) }) },
];

// موجة دورية: بعدد دورات صحيح، فتبدأ وتنتهي بنفس القيمة
const wave = (t, phase, cycles = 1) => Math.sin((t * cycles + phase) * 2 * Math.PI);

// حركة شكل واحد داخل الزخرفة. k رقم الشكل، dist بعده عن المركز (٠..١).
// كل شكل ياخذ طوراً وسرعة واتجاهاً مختلفين — هذا اللي يمنع الحركة الجماعية الميكانيكية.
// power شدة الحركة: ١ العادي، ٠ سكون تام، وفوق ١ مبالغة — يتحكم فيها المستخدم بمزلاج
function ornMotion(style, t, k, M, phase, dist = 0, power = 1) {
  const still = { dx: 0, dy: 0, sc: 1, rot: 0 };
  if (t === null || style === 'none' || power <= 0) return still;
  const ph = phase + k * 0.37;          // طور مختلف لكل شكل
  const sp = 1 + (k % 3);               // سرعة مختلفة (دورات صحيحة عشان ما تقفز)
  const dir = (k % 2 ? 1 : -1) * power; // نصهم يمين ونصهم يسار، والشدة تضبط المقدار
  const A = M * 0.035 * power;
  const P = v => 1 + (v - 1) * power;   // تكبير مضروب بالشدة حول ١
  switch (style) {
    case 'float':   return { dx: wave(t, ph) * A, dy: wave(t, ph + 0.25) * A, sc: 1, rot: 0 };
    case 'pulse':   return { dx: 0, dy: 0, sc: P(1 + 0.22 * wave(t, ph, sp)), rot: 0 };
    // الدوران وحده ما يبيّن على شكل دائري، فنضيف دوراناً حول نقطة كمان
    case 'spin':    return { dx: Math.cos((t * sp + ph) * 2 * Math.PI) * A * 0.6,
                             dy: Math.sin((t * sp + ph) * 2 * Math.PI) * A * 0.6,
                             sc: 1, rot: (t * sp + ph) * 2 * Math.PI * dir };
    case 'swirl':   return { dx: wave(t, ph, 2) * A, dy: wave(t, ph + 0.3, 2) * A,
                             sc: P(1 + 0.14 * wave(t, ph)), rot: (t + ph) * 2 * Math.PI * dir };
    case 'scatter': return { dx: wave(t, ph, sp) * A * 1.8, dy: wave(t, ph + 0.5, 4 - sp) * A * 1.8,
                             sc: P(1 + 0.18 * wave(t, ph, 2)), rot: 0 };
    case 'ripple':  return { dx: 0, dy: 0, sc: P(1 + 0.4 * wave(t, ph - dist * 1.6)), rot: 0 };
    case 'tumble':  return { dx: wave(t, ph, sp) * A, dy: wave(t, ph + 0.4, 4 - sp) * A,
                             sc: P(1 + 0.2 * wave(t, ph, sp)), rot: (t * (k % 2 ? 1 : 2) + ph) * 2 * Math.PI * dir };
    // مدار: الشكل يلفّ حول نقطة بلا أن يدور حول نفسه
    case 'orbit':   return { dx: Math.cos((t * sp + ph) * 2 * Math.PI) * A * 1.4,
                             dy: Math.sin((t * sp + ph) * 2 * Math.PI) * A * 1.4, sc: 1, rot: 0 };
    // ترنّح: دوران ذهاباً وإياباً لا لفّة كاملة
    case 'wobble':  return { dx: 0, dy: wave(t, ph, sp) * A * 0.5, sc: P(1 + 0.06 * wave(t, ph, 2)),
                             rot: wave(t, ph, sp) * 0.35 * dir };
    default: return still;
  }
}

// موجة من ٠ إلى ١ ورجوع لـ٠ — عشان الحركة تقفل دورتها بلا قفزة
const cyc = p => 0.5 - 0.5 * Math.cos(p * 2 * Math.PI);

const IN_DUR = 0.22, OUT_START = 0.86, OUT_DUR = 0.14;
const DURATIONS = [2400, 3000, 3600, 4200];
const STAGGERS = [0.04, 0.07, 0.1];

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const byMood = (list, mood) => {
  const hit = list.filter(x => x.moods.includes(mood));
  return hit.length ? hit : list;
};
// نفس فكرة الخطوط: التصميم يخزّن رقماً، والاختيار يصير وقت الرسم حسب مزاج الموضوع.
// وإن اختار المستخدم حركة بعينها فاختياره يتقدّم على المزاج.
const byId = (list, id, fallback) => (id && list.find(x => x.id === id)) || fallback;
const pickAnim = (spec, mood, id) => byId(ANIMS, id,
  byMood(ANIMS, mood)[Math.min(byMood(ANIMS, mood).length - 1,
    Math.floor(spec.animIdx * byMood(ANIMS, mood).length))]);
const pickBg = (spec, mood, id) => byId(BG_MOTIONS, id,
  byMood(BG_MOTIONS, mood)[Math.min(byMood(BG_MOTIONS, mood).length - 1,
    Math.floor(spec.bgIdx * byMood(BG_MOTIONS, mood).length))]);

// حالة الحركة عند اللحظة t (٠..١ من دورة كاملة)
// power شدة الحركة. عند ٠ يبقى الظهور التدريجي بلا أي إزاحة أو تكبير.
function animState(spec, mood, t, power = 1, pick = {}) {
  const a = pickAnim(spec, mood, pick.anim), ease = EASE[a.ease];
  const el = i => {
    const p = t >= OUT_START
      ? Math.max(0, 1 - (t - OUT_START) / OUT_DUR)          // الخروج: الكل مع بعض
      : clamp01((t - i * spec.stagger) / IN_DUR);           // الدخول: عنصر بعد عنصر
    const v = a.at(ease(p));
    return {
      a: clamp01(v.a === undefined ? 1 : v.a),
      dx: (v.dx || 0) * power,
      dy: (v.dy || 0) * power,
      sc: 1 + ((v.sc === undefined ? 1 : v.sc) - 1) * power,
    };
  };
  const bgm = pickBg(spec, mood, pick.bg);
  return { els: [el(0), el(1), el(2)], bg: bgm.at(t), orn: bgm.orn };
}

// ===== منطق خالص (مفحوص في test.js) =====

// مولّد أرقام شبه عشوائية ثابت: نفس البذرة = نفس النتيجة
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// يبني مجموعة تصاميم مختلفة من بذرة واحدة
function makeSpecs(seed, count = 8, palettes = PALETTES) {
  const r = rng(seed);
  const specs = [];
  const usedLayouts = new Set(), usedPalettes = new Set();
  let guard = 0;
  while (specs.length < count && guard++ < 3000) {
    const layout = LAYOUTS[Math.floor(r() * LAYOUTS.length)];
    const pi = Math.floor(r() * palettes.length);
    // نتجنب تكرار نفس التخطيط أو نفس الألوان داخل نفس المجموعة
    if (usedLayouts.size < LAYOUTS.length && usedLayouts.has(layout)) continue;
    if (usedPalettes.size < palettes.length && usedPalettes.has(pi)) continue;
    usedLayouts.add(layout); usedPalettes.add(pi);
    specs.push({
      layout,
      palette: palettes[pi],
      fontIdx: r(), // رقم بين ٠ و١ — يتحوّل لخط حسب لغة النص وقت الرسم
      animIdx: r(), // ونفس الشي للحركة، بس حسب مزاج نوع المنشور
      bgIdx: r(),
      ornPhase: r(), // طور بداية حركة الزخارف — يخلي كل تصميم يبدأ من مكان مختلف
      durationMs: DURATIONS[Math.floor(r() * DURATIONS.length)],
      stagger: STAGGERS[Math.floor(r() * STAGGERS.length)],
      ornament: ORNAMENTS[Math.floor(r() * ORNAMENTS.length)],
      backdrop: BACKDROPS[Math.floor(r() * BACKDROPS.length)],
    });
  }
  return specs;
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// أي لون نكتب فيه فوق خلفية ملوّنة عشان يبان — نقارن التباين الفعلي لا التخمين
function bestTextOn(hex) {
  const L = luminance(hex);
  return (L + 0.05) / 0.05 >= 1.05 / (L + 0.05) ? '#111111' : '#FFFFFF';
}

// نسبة الوضوح بين لونين (١ = ما يبان أبداً، ٢١ = أقصى وضوح)
function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// يغمّق أو يفتّح لون النص حتى يبان فوق خلفيته — وإن ما نفع يرجع للأبيض أو الأسود
function ensureContrast(fg, bg, target = 4.5) {
  const goLight = bestTextOn(bg) === '#FFFFFF';
  let c = fg;
  for (let i = 0; i < 24 && contrastRatio(c, bg) < target; i++) c = shade(c, goLight ? 0.08 : -0.08);
  return contrastRatio(c, bg) >= target ? c : bestTextOn(bg);
}

// يبني ٦ لوحات ألوان من لوني العلامة التجارية — تنوّع بالشكل، ثبات بالهوية
function brandPalettes(brand, accent) {
  // لو اللونان متقاربان، الثاني ما يبان فوق الأول — نبعّدهما
  const ac = contrastRatio(accent, brand) < 1.6
    ? shade(accent, luminance(brand) > 0.5 ? -0.45 : 0.55) : accent;
  const dark = shade(brand, -0.6), light = shade(brand, 0.88);
  // اللون المميّز لازم يبان فوق خلفية كل لوحة، مو بس فوق اللون الأساسي
  const vis = (c, bg) => contrastRatio(c, bg) >= 2 ? c : ensureContrast(c, bg, 2);
  return [
    { bg: brand, fg: bestTextOn(brand), ac: vis(ac, brand) },
    { bg: '#FFFFFF', fg: ensureContrast(brand, '#FFFFFF'), ac: vis(ac, '#FFFFFF') },
    { bg: dark, fg: ensureContrast(light, dark), ac: vis(ac, dark) },
    { bg: light, fg: ensureContrast(dark, light), ac: vis(brand, light) },
    { bg: '#111111', fg: '#F5F5F5', ac: vis(ac, '#111111') },
    { bg: ac, fg: bestTextOn(ac), ac: bestTextOn(ac) },
  ];
}

// يفتّح أو يغمّق لوناً (amt بين -1 و 1)
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v =>
    Math.max(0, Math.min(255, Math.round(v + (amt > 0 ? (255 - v) * amt : v * amt))))
  );
  return '#' + ch.map(v => v.toString(16).padStart(2, '0')).join('');
}

// يحسب مكان الصورة عشان تغطي التصميم كاملاً بلا تشويه (الزايد ينقص من الأطراف)
// ponytail: القصّ من الوسط دائماً. لو صار المستخدم يشتكي إن منتجه ينقصّ، نضيف سحب الصورة لتحريكها.
function coverRect(iw, ih, W, H, zoom = 1, panX = 0) {
  const s = Math.max(W / iw, H / ih) * zoom;
  const w = iw * s, h = ih * s;
  return { x: (W - w) / 2 + panX * W, y: (H - h) / 2, w, h };
}

// مقاس الشعار: ارتفاع ثابت، وإن كان الشعار عريضاً جداً نحدّه بالعرض
function logoRect(lw, lh, W) {
  let h = W * 0.11, w = (lw / lh) * h;
  if (w > W * 0.6) { w = W * 0.6; h = w * lh / lw; }
  return { w, h };
}

// كثافة الطبقة فوق الصورة: تكفي عشان النص يبان مهما كانت الصورة فاتحة أو غامقة
const SCRIM = 0.7;

// يقسّم النص إلى أسطر تناسب العرض. measure دالة تقيس عرض النص.
function wrapText(text, maxW, measure) {
  if (!text || !text.trim()) return [];
  const out = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const t = line ? line + ' ' + word : word;
      if (line && measure(t) > maxW) { out.push(line); line = word; }
      else line = t;
    }
    if (line) out.push(line);
  }
  return out;
}

// يصغّر حجم الخط حتى يدخل النص بعدد الأسطر المسموح
function fitLines(text, maxW, maxLines, startSize, measureAt) {
  let size = startSize;
  while (size > 10) {
    const lines = wrapText(text, maxW, w => measureAt(w, size));
    if (lines.length <= maxLines) return { size, lines };
    size = Math.floor(size * 0.9);
  }
  return { size, lines: wrapText(text, maxW, w => measureAt(w, size)) };
}

// ===== الرسم (متصفح فقط) =====
// W العرض و H الارتفاع. مقاسات النص والمسافات الأفقية تتبع العرض،
// والمواضع العمودية تتبع الارتفاع — عشان نفس التخطيط يشتغل بمربّع وستوري.

// t: لحظة الحركة من ٠ إلى ١. لو null التصميم ثابت (صورة).
function drawPost(ctx, W, H, spec, f, t = null) {
  const { bg } = spec.palette;
  const lang = f.lang || 'ar';
  const power = f.power === undefined ? 1 : f.power;
  const A = t === null ? null
    : animState(spec, f.mood || 'calm', t, power, { anim: f.animId, bg: f.bgId });
  const M = A ? A.bg : {};
  ctx.save();
  ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';
  ctx.textBaseline = 'top';

  // الخلفية: صورة المستخدم لو رفع وحدة، وإلا لون اللوحة
  if (f.image) {
    const r = coverRect(f.image.naturalWidth || f.image.width, f.image.naturalHeight || f.image.height,
      W, H, M.zoom || 1, M.panX || 0);
    ctx.drawImage(f.image, r.x, r.y, r.w, r.h);
    // طبقة بلون اللوحة فوق الصورة — بدونها النص يضيع بالصور الفاتحة
    ctx.globalAlpha = SCRIM;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  } else {
    if (spec.backdrop === 'gradient') {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, shade(bg, luminance(bg) > 0.5 ? -0.08 : 0.12));
      g.addColorStop(1, bg);
      ctx.fillStyle = g;
    } else ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // الزخارف فوق الصورة تطلع زحمة، فما نرسمها إلا بلا صورة.
    // والتقريب والانزياح ينطبقان عليها هنا، وإلا ما بان فرقهما بلا صورة.
    ctx.save();
    if (M.zoom || M.panX) {
      ctx.translate(W / 2 + (M.panX || 0) * W, H / 2);
      ctx.scale(M.zoom || 1, M.zoom || 1);
      ctx.translate(-W / 2, -H / 2);
    }
    drawOrnament(ctx, W, H, spec, t, A ? A.orn : 'none', power);
    ctx.restore();
  }

  // كل تخطيط مكتوب باتجاه اليمين لليسار. للنص الإنجليزي نعكس المواضع بدل ما نكتب تخطيطات ثانية.
  const rtl = lang === 'ar';
  const geo = {
    rtl,
    font: pickFont(spec, lang),
    align: rtl ? 'right' : 'left',        // محاذاة الأسطر لجهة البداية
    px: v => rtl ? v : W - v,             // نقطة تنعكس حول منتصف العرض
    rx: (x, w) => rtl ? x : W - x - w,    // مستطيل ينعكس مع عرضه
    // تحويل الحركة للعنصر رقم i (٠ العنوان، ١ السطر الصغير، ٢ التوقيع) بالبكسل
    tf: i => A && ({ ...A.els[i], dx: A.els[i].dx * W, dy: A.els[i].dy * H }),
  };
  LAYOUT_FN[spec.layout](ctx, W, H, spec, f, geo);
  ctx.restore();
}

// رقم ثابت بين -١ و١ من البذرة ورقم الشكل — يخلي كل تصميم يوزّع زخارفه بشكل مختلف
function jit(seed, k, i) {
  const v = Math.sin((seed * 97.13 + k * 31.7 + i * 13.3) * 12.9898) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

function drawOrnament(ctx, W, H, spec, t = null, style = 'none', power = 1) {
  const M = Math.min(W, H);
  const ph = spec.ornPhase || 0;
  const half = Math.hypot(W / 2, H / 2);
  const J = (k, i, amt) => 1 + jit(ph, k, i) * amt;   // مضاعِف حول ١
  const Jo = (k, i, amt) => jit(ph, k, i) * amt;      // إزاحة حول ٠
  ctx.save();
  ctx.fillStyle = ctx.strokeStyle = spec.palette.ac;

  // يرسم شكلاً واحداً بحركته الخاصة حول مركزه هو، لا حول مركز التصميم
  let k = 0;
  const put = (cx, cy, draw) => {
    const o = ornMotion(style, t, k++, M, ph, Math.hypot(cx - W / 2, cy - H / 2) / half, power);
    ctx.save();
    ctx.translate(cx + o.dx, cy + o.dy);
    ctx.rotate(o.rot);
    ctx.scale(o.sc, o.sc);
    ctx.translate(-cx, -cy);
    draw();
    ctx.restore();
  };

  switch (spec.ornament) {
    case 'circles':
      ctx.globalAlpha = 0.12;
      for (const [i, [x, y, r]] of [[0.15, 0.12, 0.22], [0.88, 0.85, 0.3], [0.75, 0.1, 0.12]].entries()) {
        const cx = (x + Jo(1, i, 0.12)) * W, cy = (y + Jo(2, i, 0.12)) * H, rr = r * M * J(3, i, 0.35);
        put(cx, cy, () => { ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fill(); });
      }
      break;
    case 'stripes':
      ctx.globalAlpha = 0.09; ctx.lineWidth = M * 0.02;
      for (let i = -H; i < W + H; i += M * 0.08)
        put(i + H / 2, H / 2, () => { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke(); });
      break;
    case 'dots': {
      ctx.globalAlpha = 0.16;
      const gap = M * 0.06 * J(15, 0, 0.45), rad = M * 0.006 * J(16, 0, 0.8);
      for (let x = gap * 0.8; x < W; x += gap)
        for (let y = gap * 0.8; y < H; y += gap)
          put(x, y, () => { ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill(); });
      break;
    }
    case 'arc':
      ctx.globalAlpha = 0.18;
      put(0, H, () => { ctx.beginPath(); ctx.arc(0, H, M * 0.55, 0, 7); ctx.fill(); });
      break;
    case 'squares':
      ctx.globalAlpha = 0.1; ctx.lineWidth = M * 0.008;
      for (let x = M * 0.1; x < W; x += M * 0.2)
        for (let y = M * 0.1; y < H; y += M * 0.2)
          put(x, y, () => {
            ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
            ctx.strokeRect(-M * 0.05, -M * 0.05, M * 0.1, M * 0.1); ctx.restore();
          });
      break;
    case 'rings': {
      ctx.globalAlpha = 0.14; ctx.lineWidth = M * 0.01;
      // مركز الحلقات وتباعدها يختلفان من تصميم لتصميم
      const cx = (0.9 + Jo(4, 0, 0.5)) * W, cy = (0.08 + Jo(5, 0, 0.5)) * H;
      const gap = M * 0.09 * J(6, 0, 0.4);
      let i = 0;
      for (let r = M * 0.12; r < M * 0.62; r += gap) {
        const rr = r;
        put(cx, cy, () => { ctx.beginPath(); ctx.arc(cx, cy, rr * J(7, i, 0.06), 0, 7); ctx.stroke(); });
        i++;
      }
      break;
    }
    case 'brackets':
      ctx.globalAlpha = 0.5; ctx.lineWidth = M * 0.012;
      for (const [x, y, dx, dy] of [[0.07, 0.05, 1, 1], [0.93, 0.95, -1, -1]])
        put(x * W, y * H, () => {
          ctx.beginPath();
          ctx.moveTo(x * W, y * H + 0.08 * M * dy);
          ctx.lineTo(x * W, y * H);
          ctx.lineTo(x * W + 0.08 * M * dx, y * H);
          ctx.stroke();
        });
      break;
    case 'waves':
      // الموجات تتحرك بإزاحة طور الجيب نفسه، فتجري فعلاً بدل ما تنزلق ككتلة
      ctx.globalAlpha = 0.12; ctx.lineWidth = M * 0.012;
      {
        const top = 0.78 + Jo(11, 0, 0.35);              // مكان شريط الموجات
        const gap = M * 0.05 * J(12, 0, 0.5);            // تباعدها
        const len = M * 0.13 * J(13, 0, 0.6);            // طول الموجة
        for (let j = 0; j < 5; j++) {
          const amp = M * 0.03 * J(14, j, 0.5);          // ارتفاع كل موجة لحالها
          const flow = t === null || style === 'none' ? 0
            : (t * (1 + j % 3) + ph + j * 0.37) * 2 * Math.PI * (j % 2 ? 1 : -1) * power;
          ctx.beginPath();
          for (let x = 0; x <= W; x += M * 0.02) {
            const y = H * top + j * gap + Math.sin(x / len + flow) * amp;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      break;
    case 'grid': {
      ctx.globalAlpha = 0.1; ctx.lineWidth = M * 0.006;
      const gap = M * 0.14 * J(17, 0, 0.4);
      for (let x = gap; x < W; x += gap)
        put(x, H / 2, () => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); });
      for (let y = gap; y < H; y += gap)
        put(W / 2, y, () => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); });
      break;
    }
    case 'burst': {
      ctx.globalAlpha = 0.09; ctx.lineWidth = M * 0.014;
      const ox = (0.5 + Jo(18, 0, 0.9)) * W, oy = (0.5 + Jo(19, 0, 0.9)) * H;
      const n = 12;
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * 2 * Math.PI + ph;
        const ex = ox + Math.cos(ang) * M * 1.6, ey = oy + Math.sin(ang) * M * 1.6;
        put(ox + Math.cos(ang) * M * 0.4, oy + Math.sin(ang) * M * 0.4,
          () => { ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke(); });
      }
      break;
    }
    case 'confetti': {
      ctx.globalAlpha = 0.16;
      for (let i = 0; i < 22; i++) {
        const x = (0.5 + jit(ph, 20, i) * 0.52) * W, y = (0.5 + jit(ph, 21, i) * 0.52) * H;
        const w = M * 0.018 * J(22, i, 0.6), h = w * (1.6 + jit(ph, 23, i));
        const a = jit(ph, 24, i) * Math.PI;
        put(x, y, () => {
          ctx.save(); ctx.translate(x, y); ctx.rotate(a);
          ctx.fillRect(-w / 2, -h / 2, w, Math.abs(h)); ctx.restore();
        });
      }
      break;
    }
    case 'triangles':
      ctx.globalAlpha = 0.11;
      for (const [i, [x, y, s]] of [[0.1, 0.9, 0.3], [0.85, 0.15, 0.22], [0.6, 0.95, 0.16]].entries()) {
        const cx = (x + Jo(8, i, 0.14)) * W, cy = (y + Jo(9, i, 0.14)) * H, ss = s * M * J(10, i, 0.4);
        put(cx, cy, () => {
          ctx.beginPath();
          ctx.moveTo(cx, cy - ss);
          ctx.lineTo(cx - ss, cy);
          ctx.lineTo(cx + ss, cy);
          ctx.closePath(); ctx.fill();
        });
      }
      break;
  }
  ctx.restore();
}

// الحروف العربية تتداخل ببعضها بشكل طبيعي. لو رسمناها بشفافية جزئية مباشرة،
// المتصفح يمزج كل حرف لحاله فتظهر خطوط التداخل. الحل: نرسم على طبقة كاملة الوضوح
// ثم ندمجها دفعة واحدة. ponytail: طبقة مشتركة يُعاد استخدامها — الرسم متسلسل فما فيه تعارض.
let _layer = null;
function paintLayer(ctx, alpha, paint) {
  if (alpha >= 0.999) return paint(ctx);
  if (alpha <= 0.001) return;
  const w = ctx.canvas.width, h = ctx.canvas.height;
  if (!_layer) _layer = document.createElement('canvas');
  if (_layer.width !== w || _layer.height !== h) { _layer.width = w; _layer.height = h; }
  const g = _layer.getContext('2d');
  g.clearRect(0, 0, w, h);
  g.direction = ctx.direction;
  g.textBaseline = ctx.textBaseline;
  paint(g);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = prev * alpha;
  ctx.drawImage(_layer, 0, 0);
  ctx.globalAlpha = prev;
}

// يرسم كتلة نص ويرجّع ارتفاعها. لو y === null يقيس بس بلا رسم.
function block(ctx, text, o) {
  const { family, weight, maxSize, maxLines, maxW, color, align, x, y, stroke, tf } = o;
  const measureAt = (w, size) => { ctx.font = `${weight} ${size}px "${family}"`; return ctx.measureText(w).width; };
  const { size, lines } = fitLines(text, maxW, maxLines, maxSize, measureAt);
  if (!lines.length) return 0;
  const lh = size * 1.3;
  if (y !== null) {
    const cy = y + lines.length * lh / 2;   // التكبير حول منتصف الكتلة عشان ما تزحف لجهة
    paintLayer(ctx, tf ? tf.a : 1, g => {
      g.save();
      if (tf) moveTo(g, tf, x, cy);
      g.font = `${weight} ${size}px "${family}"`;
      g.textAlign = align;
      if (stroke) {
        g.lineWidth = size * 0.045;
        g.strokeStyle = color;
        lines.forEach((ln, i) => g.strokeText(ln, x, y + i * lh));
      } else {
        g.fillStyle = color;
        lines.forEach((ln, i) => g.fillText(ln, x, y + i * lh));
      }
      g.restore();
    });
  }
  return lines.length * lh;
}

// إزاحة وتكبير الحركة. الشفافية ما تنطبق هنا — تنطبق عند دمج الطبقة.
function moveTo(g, tf, cx, cy) {
  g.translate(cx + tf.dx, cy + tf.dy);
  g.scale(tf.sc, tf.sc);
  g.translate(-cx, -cy);
}

// توقيع المحل أسفل التصميم: شعاره لو رفع واحداً، وإلا شريط باسمه
function mark(ctx, f, W, { tf, color, textColor, cx, y, family }) {
  // نفس السبب: الشريط والاسم فوقه، لو رُسما بشفافية جزئية بان الشريط من خلف الحروف
  paintLayer(ctx, tf ? tf.a : 1, g => {
    g.save();
    if (tf) moveTo(g, tf, cx, y);
    drawMark(g, f, W, { color, textColor, cx, y, family });
    g.restore();
  });
}

function drawMark(ctx, f, W, { color, textColor, cx, y, family }) {
  if (f.logo) {
    const { w, h } = logoRect(f.logo.naturalWidth || f.logo.width, f.logo.naturalHeight || f.logo.height, W);
    ctx.drawImage(f.logo, cx - w / 2, y, w, h);
    return;
  }
  if (!f.name || !f.name.trim()) return;
  const size = W * 0.036;
  ctx.font = `700 ${size}px "${family}"`;
  const w = ctx.measureText(f.name).width + W * 0.09;
  const h = size * 2.1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText(f.name, cx, y + (h - size * 1.25) / 2);
}

const LAYOUT_FN = {
  center(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    const T = { family: df, weight: dw, maxSize: W * 0.15, maxLines: 3, maxW: W * 0.82, color: fg, align: 'center', x: W / 2 };
    const B = { family: bf, weight: bw, maxSize: W * 0.055, maxLines: 4, maxW: W * 0.7, color: ac, align: 'center', x: W / 2 };
    // نقيس أولاً عشان نوسّط الكتلة كلها عمودياً
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    const h2 = block(ctx, f.sub, { tf: g.tf(1), ...B, y: null });
    const top = H * 0.46 - (h1 + (h2 ? W * 0.04 + h2 : 0)) / 2;
    block(ctx, f.title, { tf: g.tf(0), ...T, y: top });
    block(ctx, f.sub, { tf: g.tf(1), ...B, y: top + h1 + W * 0.04 });
    mark(ctx, f, W, { tf: g.tf(2), color: ac, textColor: bestTextOn(ac), cx: W / 2, y: H * 0.84, family: bf });
  },
  frame(ctx, W, H, spec, f, g) {
    const M = Math.min(W, H), I = M * 0.06;
    ctx.strokeStyle = spec.palette.ac;
    ctx.lineWidth = M * 0.008;
    ctx.strokeRect(I, I, W - 2 * I, H - 2 * I);
    LAYOUT_FN.center(ctx, W, H, spec, f, g);
  },
  band(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(0, H * 0.3, W, H * 0.34);
    const on = bestTextOn(ac);
    const T = { family: df, weight: dw, maxSize: W * 0.12, maxLines: 2, maxW: W * 0.84, color: on, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    block(ctx, f.title, { tf: g.tf(0), ...T, y: H * 0.47 - h1 / 2 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.055, maxLines: 2, maxW: W * 0.72, color: fg, align: 'center', x: W / 2, y: H * 0.7 });
    mark(ctx, f, W, { tf: g.tf(2), color: ac, textColor: on, cx: W / 2, y: H * 0.85, family: bf });
  },
  topSplit(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(0, 0, W, H * 0.46);
    const on = bestTextOn(ac);
    const T = { family: df, weight: dw, maxSize: W * 0.13, maxLines: 3, maxW: W * 0.82, color: on, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    block(ctx, f.title, { tf: g.tf(0), ...T, y: H * 0.23 - h1 / 2 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.06, maxLines: 3, maxW: W * 0.76, color: fg, align: 'center', x: W / 2, y: H * 0.58 });
    mark(ctx, f, W, { tf: g.tf(2), color: fg, textColor: bestTextOn(fg), cx: W / 2, y: H * 0.85, family: bf });
  },
  corner(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(g.rx(W * 0.88, W * 0.025), H * 0.1, W * 0.025, H * 0.35);
    const x = g.px(W * 0.82), maxW = W * 0.72;
    const h1 = block(ctx, f.title, { tf: g.tf(0), family: df, weight: dw, maxSize: W * 0.13, maxLines: 3, maxW, color: fg, align: g.align, x, y: H * 0.16 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.055, maxLines: 3, maxW, color: ac, align: g.align, x, y: H * 0.16 + h1 + W * 0.05 });
    mark(ctx, f, W, { tf: g.tf(2), color: ac, textColor: bestTextOn(ac), cx: W / 2, y: H * 0.85, family: bf });
  },
  stack(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    const x = g.px(W * 0.86), maxW = W * 0.76;
    block(ctx, f.title, { tf: g.tf(0), family: df, weight: dw, maxSize: W * 0.16, maxLines: 3, maxW, color: fg, align: g.align, x, y: H * 0.14 });
    ctx.fillStyle = ac;
    ctx.fillRect(g.rx(W * 0.14, W * 0.24), H * 0.66, W * 0.24, H * 0.012);
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.055, maxLines: 2, maxW, color: ac, align: g.align, x, y: H * 0.71 });
    mark(ctx, f, W, { tf: g.tf(2), color: fg, textColor: bestTextOn(fg), cx: W / 2, y: H * 0.86, family: bf });
  },
  bottomBand(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(0, H * 0.68, W, H * 0.32);
    const on = bestTextOn(ac);
    const T = { family: df, weight: dw, maxSize: W * 0.14, maxLines: 3, maxW: W * 0.82, color: fg, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    block(ctx, f.title, { tf: g.tf(0), ...T, y: H * 0.34 - h1 / 2 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.055, maxLines: 2, maxW: W * 0.78, color: on, align: 'center', x: W / 2, y: H * 0.75 });
    mark(ctx, f, W, { tf: g.tf(2), color: on, textColor: ac, cx: W / 2, y: H * 0.9, family: bf });
  },
  boxed(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    const on = bestTextOn(ac);
    ctx.fillStyle = ac;
    ctx.beginPath();
    ctx.roundRect(W * 0.1, H * 0.22, W * 0.8, H * 0.44, Math.min(W, H) * 0.04);
    ctx.fill();
    const T = { family: df, weight: dw, maxSize: W * 0.12, maxLines: 3, maxW: W * 0.68, color: on, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    block(ctx, f.title, { tf: g.tf(0), ...T, y: H * 0.44 - h1 / 2 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.055, maxLines: 2, maxW: W * 0.76, color: fg, align: 'center', x: W / 2, y: H * 0.72 });
    mark(ctx, f, W, { tf: g.tf(2), color: fg, textColor: bestTextOn(fg), cx: W / 2, y: H * 0.87, family: bf });
  },
  duo(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(0, H * 0.55, W, H * 0.45);
    const on = bestTextOn(ac);
    const T = { family: df, weight: dw, maxSize: W * 0.14, maxLines: 3, maxW: W * 0.82, color: fg, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    block(ctx, f.title, { tf: g.tf(0), ...T, y: H * 0.28 - h1 / 2 });
    block(ctx, f.sub, { tf: g.tf(1), family: bf, weight: bw, maxSize: W * 0.06, maxLines: 3, maxW: W * 0.78, color: on, align: 'center', x: W / 2, y: H * 0.64 });
    mark(ctx, f, W, { tf: g.tf(2), color: on, textColor: ac, cx: W / 2, y: H * 0.88, family: bf });
  },
  sideBar(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    ctx.fillStyle = ac;
    ctx.fillRect(g.rx(W * 0.82, W * 0.18), 0, W * 0.18, H);
    const cx = g.px(W * 0.41);
    const T = { family: df, weight: dw, maxSize: W * 0.13, maxLines: 3, maxW: W * 0.66, color: fg, align: 'center', x: cx };
    const B = { family: bf, weight: bw, maxSize: W * 0.05, maxLines: 3, maxW: W * 0.62, color: ac, align: 'center', x: cx };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    const h2 = block(ctx, f.sub, { tf: g.tf(1), ...B, y: null });
    const top = H * 0.44 - (h1 + (h2 ? W * 0.04 + h2 : 0)) / 2;
    block(ctx, f.title, { tf: g.tf(0), ...T, y: top });
    block(ctx, f.sub, { tf: g.tf(1), ...B, y: top + h1 + W * 0.04 });
    mark(ctx, f, W, { tf: g.tf(2), color: fg, textColor: bestTextOn(fg), cx, y: H * 0.85, family: bf });
  },
  outline(ctx, W, H, spec, f, g) {
    const { fg, ac } = spec.palette, [df, dw, bf, bw] = g.font;
    const T = { family: df, weight: dw, maxSize: W * 0.16, maxLines: 3, maxW: W * 0.84, color: ac, align: 'center', x: W / 2, stroke: true };
    const B = { family: bf, weight: bw, maxSize: W * 0.055, maxLines: 3, maxW: W * 0.7, color: fg, align: 'center', x: W / 2 };
    const h1 = block(ctx, f.title, { tf: g.tf(0), ...T, y: null });
    const h2 = block(ctx, f.sub, { tf: g.tf(1), ...B, y: null });
    const top = H * 0.45 - (h1 + (h2 ? W * 0.05 + h2 : 0)) / 2;
    block(ctx, f.title, { tf: g.tf(0), ...T, y: top });
    block(ctx, f.sub, { tf: g.tf(1), ...B, y: top + h1 + W * 0.05 });
    mark(ctx, f, W, { tf: g.tf(2), color: ac, textColor: bestTextOn(ac), cx: W / 2, y: H * 0.85, family: bf });
  },
};

if (typeof module !== 'undefined') module.exports = {
  rng, makeSpecs, luminance, bestTextOn, contrastRatio, ensureContrast, brandPalettes,
  logoRect, shade, wrapText, fitLines, coverRect, textLang, pickFont, SCRIM,
  PALETTES, LAYOUTS, ORNAMENTS, FONTS, SIZES, TYPES, CATS, UI,
  ANIMS, ANIM_FAMS, BG_MOTIONS, EASE, DURATIONS, animState, pickAnim, pickBg, ornMotion,
};
