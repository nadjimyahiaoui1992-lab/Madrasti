import {
  User,
  Student,
  Subject,
  Lesson,
  Assignment,
  CalendarEvent,
  ScheduleItem,
  AttendanceRecord,
  Announcement,
  TeacherTip,
  AppNotification,
  TeacherConversation,
  Message,
  SchoolClass,
} from "../types";

export const initialUsers: User[] = [
  {
    id: "parent-1",
    name: "عبد القادر بن علي",
    email: "parent@demo.com",
    role: "parent",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    phone: "0661234567",
  },
  {
    id: "teacher-1",
    name: "الأستاذ أحمد القاسمي",
    email: "teacher@demo.com",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    phone: "0558901234",
  },
  {
    id: "admin-1",
    name: "المدير رشيد بن موسى",
    email: "admin@demo.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    phone: "0550001122",
  },
];

export const initialStudents: Student[] = [
  {
    id: "std-1",
    name: "أحمد محمد",
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=200",
    classId: "cls-2",
    className: "القسم: 2 أ",
    gradeLevel: "السنة الثانية ابتدائي",
    schoolName: "مدرسة الأمل الابتدائية",
    parentId: "parent-1",
    parentName: "عبد القادر بن علي",
    teacherName: "الأستاذ أحمد القاسمي",
    homeworkCompletionRate: 78,
    attendanceRate: 96,
    notesCount: 2,
  },
  {
    id: "std-2",
    name: "سارة محمد",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    classId: "cls-4",
    className: "القسم: 4 أ",
    gradeLevel: "السنة الرابعة ابتدائي",
    schoolName: "مدرسة الأمل الابتدائية",
    parentId: "parent-1",
    parentName: "عبد القادر بن علي",
    teacherName: "الأستاذة مريم البتول",
    homeworkCompletionRate: 92,
    attendanceRate: 98,
    notesCount: 1,
  },
  {
    id: "std-3",
    name: "يوسف بن منصور",
    avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=200",
    classId: "cls-2",
    className: "السنة الثانية - ب",
    schoolName: "مدرسة الأمل الابتدائية",
    parentId: "parent-2",
    parentName: "صالح بن منصور",
    teacherName: "الأستاذ أحمد القاسمي",
    homeworkCompletionRate: 90,
    attendanceRate: 95,
    notesCount: 0,
  },
  {
    id: "std-4",
    name: "سارة زروقي",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    classId: "cls-2",
    className: "السنة الثانية - ب",
    schoolName: "مدرسة الأمل الابتدائية",
    parentId: "parent-3",
    parentName: "كريم زروقي",
    teacherName: "الأستاذ أحمد القاسمي",
    homeworkCompletionRate: 75,
    attendanceRate: 92,
    notesCount: 3,
  },
  {
    id: "std-5",
    name: "محمد هلالي",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    classId: "cls-3",
    className: "السنة الثالثة - أ",
    schoolName: "مدرسة الأمل الابتدائية",
    parentId: "parent-4",
    parentName: "مصطفى هلالي",
    teacherName: "الأستاذ خالد العمراني",
    homeworkCompletionRate: 92,
    attendanceRate: 96,
    notesCount: 1,
  },
];

export const initialClasses: SchoolClass[] = [
  {
    id: "cls-1",
    name: "السنة الأولى - أ",
    gradeLevel: "السنة الأولى ابتدائي",
    studentCount: 38,
    mainTeacherName: "الأستاذة مريم البتول",
  },
  {
    id: "cls-2",
    name: "السنة الثانية - ب",
    gradeLevel: "السنة الثانية ابتدائي",
    studentCount: 42,
    mainTeacherName: "الأستاذ أحمد القاسمي",
  },
  {
    id: "cls-3",
    name: "السنة الثالثة - أ",
    gradeLevel: "السنة الثالثة ابتدائي",
    studentCount: 40,
    mainTeacherName: "الأستاذ خالد العمراني",
  },
];

export const initialSubjects: Subject[] = [
  {
    id: "subj-arabic",
    name: "اللغة العربية",
    icon: "BookOpen",
    color: "emerald",
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "subj-math",
    name: "الرياضيات",
    icon: "Calculator",
    color: "indigo",
    bgLight: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "subj-science",
    name: "النشاط العلمي",
    icon: "Microscope",
    color: "sky",
    bgLight: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "subj-islamic",
    name: "التربية الإسلامية",
    icon: "Moon",
    color: "amber",
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "subj-art",
    name: "التربية الفنية",
    icon: "Palette",
    color: "purple",
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export const initialLessons: Lesson[] = [
  {
    id: "les-1",
    title: "جمع الأعداد بالاحتفاظ من 0 إلى 99",
    subjectId: "subj-math",
    subjectName: "الرياضيات",
    classLevel: "السنة الثانية ابتدائي",
    teacherName: "الأستاذ أحمد القاسمي",
    publishedAt: "2026-08-09",
    summary: "شرح تفصيلي ومبسط لتقنية الجمع بالاحتفاظ مع وضع الآحاد تحت الآحاد والعشرات تحت العشرات.",
    content: `أهلاً بأبطال الرياضيات الصغار!

في هذا الدرس نتعلم كيف نجمع عددين متكونين من منزلتين عندما تتجاوز الآحاد النتيجة 9.

📌 الخطوة الأولى:
نكتُب العشرات تحت العشرات والآحاد تحت الآحاد عمودياً.
مثال: 37 + 25

📌 الخطوة الثانية:
نجمع الآحاد أولاً: 7 + 5 = 12.
نكتب 2 في منزلة الآحاد، ونحتفظ بالـ 1 فوق منزلة العشرات!

📌 الخطوة الثالثة:
نجمع العشرات مع الاحتفاظ: 1 + 3 + 2 = 6.
النتيجة النهائية هي 62 🎯.

تذكروا دائماً البدء بجمع الآحاد أولاً!`,
    attachments: [
      { name: "بطاقة_شرح_الجمع_بالاحتفاظ.pdf", url: "#", size: "1.2 ميغابايت" },
      { name: "تمارين_تدريبية_منزلية.pdf", url: "#", size: "850 كيلوبايت" },
    ],
  },
  {
    id: "les-2",
    title: "مطالعة وفهم نص: في حديقة المدرسة",
    subjectId: "subj-arabic",
    subjectName: "اللغة العربية",
    classLevel: "السنة الثانية ابتدائي",
    teacherName: "الأستاذة مريم البتول",
    publishedAt: "2026-08-08",
    summary: "قراءة جهرية معبرة لنص الحديقة واكتشاف رصيد لغوي جديد والتعبير المباشر.",
    content: `نص القراءة:
في صباح يوم الأحد الصباحي المشرق، اجتمع تلاميذ السنة الثانية في حديقة المدرسة.
قالت المعلمة: "يا أطفال، الحديقة بيت النباتات والأزهار الجميلة، وعلينا أن نحافظ على نظافتها ونعتني بأغصانها."
غرس أمين وزملاؤه شتلة ورد حمراء، وسقوها بالماء العذب وسعدوا برؤيتها.

📌 المفردات الجديدة:
- المشرق: المضيء بالندى والشمس.
- شتلة: نبتة صغيرة معدة للغرس.
- نعتني: نهتم ونحافظ.

📌 أسئلة الفهم:
1. أين اجتمع التلاميذ؟
2. ماذا قالت المعلمة للأطفال؟
3. ماذا غرس أمين وزملاؤه؟`,
  },
  {
    id: "les-3",
    title: "الحواس الخمس ووظائفها الأساسية",
    subjectId: "subj-science",
    subjectName: "النشاط العلمي",
    classLevel: "السنة الثانية ابتدائي",
    teacherName: "الأستاذ خالد العمراني",
    publishedAt: "2026-08-06",
    summary: "التعرف على أعضاء الحس الخمسة (العين، الأذن، الأنف، اللسان، الجلد) وكيفية حمايتها.",
    content: `الإنسان يستخدم حواسه الخمس لاستكشاف العالم المحيط به:
1. حاسة البصر: بعضوها العين لنرى الألوان والأشكال.
2. حاسة السمع: بعضوها الأذن لنسمع الأصوات الرقيقة والقوية.
3. حاسة الشم: بعضوها الأنف لنشم الروائح الزكية.
4. حاسة التذوق: بعضوها اللسان لنميز بين الحلو والمالح والحامض.
5. حاسة اللمس: بعضوها الجلد لنشعر بالحرارة والبرودة والنعومة.

💡 نصيحة صحية: تجنب النظر لفترات طويلة للشاشات لحماية عينيك!`,
  },
  {
    id: "les-4",
    title: "آداب الاستئذان في الإسلام",
    subjectId: "subj-islamic",
    subjectName: "التربية الإسلامية",
    classLevel: "السنة الثانية ابتدائي",
    teacherName: "الأستاذة مريم البتول",
    publishedAt: "2026-08-04",
    summary: "تعلم الطفل السلوك الصحيح عند الدخول على الآخرين والاستئذان ثلاثاً.",
    content: `قال رسول الله صلى الله عليه وسلم: "الاسْتِئْذَانُ ثَلاثٌ، فَإِنْ أُذِنَ لَكَ وَإِلاَّ فَارْجِعْ".

📌 من آداب المسلم الصغير:
- أطرق الباب بلطف ثلاث مرات.
- أقف بجانب الباب ولا أقف أمامه مباشرة.
- ألقي السلام بصوت طيب: "السلام عليكم ورحمة الله وبركاته".
- أستأذن والديّ قبل الدخول إلى غرفتهما.`,
  },
];

export const initialAssignments: Assignment[] = [
  {
    id: "ass-1",
    title: "تمرين تطبيقي: حل 5 عمليات جمع بالاحتفاظ",
    subjectId: "subj-math",
    subjectName: "الرياضيات",
    teacherName: "الأستاذ أحمد القاسمي",
    publishedAt: "2026-08-09",
    dueDate: "2026-08-12",
    status: "not_started",
    description: "أجب عن الأسئلة التالية بتركيز للتأكد من فهمك لدرس الجمع بالاحتفاظ.",
    questions: [
      {
        id: "q1",
        text: "احسب النتيجة: 48 + 27 = ؟",
        type: "choice",
        options: ["65", "75", "73", "85"],
        correctOptionIndex: 1,
      },
      {
        id: "q2",
        text: "عند جمع الآحاد في العملية (39 + 16)، كم نحتفظ فوق منزلة العشرات؟",
        type: "choice",
        options: ["1", "2", "5", "لا نحتفظ بشيء"],
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        text: "احسب النتيجة: 56 + 18 = ؟",
        type: "choice",
        options: ["64", "74", "84", "72"],
        correctOptionIndex: 1,
      },
    ],
  },
  {
    id: "ass-2",
    title: "واجب اللغة العربية: كتابة مفردات نص الحديقة",
    subjectId: "subj-arabic",
    subjectName: "اللغة العربية",
    teacherName: "الأستاذة مريم البتول",
    publishedAt: "2026-08-08",
    dueDate: "2026-08-11",
    status: "in_progress",
    description: "اختر المرادف الصحيح للكلمات التالية واستخرج جملة تعبيرية.",
    questions: [
      {
        id: "q1",
        text: "ما معنى كلمة 'شتلة' كما وردت في النص؟",
        type: "choice",
        options: ["شجرة كبيرة جداً", "نبتة صغيرة معدة للغرس", "زهرة اصطناعية"],
        correctOptionIndex: 1,
      },
      {
        id: "q2",
        text: "أين غرس أمين وزملاؤه شتلة الورد؟",
        type: "choice",
        options: ["في الشارع", "في حديقة المنزل", "في حديقة المدرسة"],
        correctOptionIndex: 2,
      },
    ],
  },
  {
    id: "ass-3",
    title: "تمرين النشاط العلمي: تمييز الحواس الخمس",
    subjectId: "subj-science",
    subjectName: "النشاط العلمي",
    teacherName: "الأستاذ خالد العمراني",
    publishedAt: "2026-08-05",
    dueDate: "2026-08-08",
    status: "completed",
    description: "صل كل عضو بالحاسة المناسبة له.",
    submissionNote: "تم الحل بامتياز مع الحصول على العلامة الكاملة 10/10 🎉",
    submittedAt: "2026-08-07",
    questions: [
      {
        id: "q1",
        text: "العضو المسئول عن حاسة التذوق هو:",
        type: "choice",
        options: ["العين", "الأذن", "اللسان", "الأنف"],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "اختبار قصير في الرياضيات (الجمع والإعداد)",
    type: "quiz",
    date: "2026-08-13",
    time: "09:00 - 10:00",
    subjectName: "الرياضيات",
    className: "السنة الثانية - ب",
    description: "اختبار تقويمي مدته 45 دقيقة يتضمن عمليات الجمع والتطبيقات المباشرة.",
    reminderSent: true,
  },
  {
    id: "ev-2",
    title: "اجتماع أولياء التلاميذ الدوري",
    type: "meeting",
    date: "2026-08-16",
    time: "10:30 - 12:00",
    className: "جميع الأقسام",
    description: "اجتماع لمناقشة النتائج وخطط الدعم التربوي للثلاثي القادم.",
    reminderSent: false,
  },
  {
    id: "ev-3",
    title: "فرض الاستظهار في التربية الإسلامية",
    type: "exam",
    date: "2026-08-18",
    time: "08:00 - 09:00",
    subjectName: "التربية الإسلامية",
    className: "السنة الثانية - ب",
    description: "استظهار سورة الكوثر وآداب الاستئذان.",
  },
  {
    id: "ev-4",
    title: "ورشة الرسم والتربية الفنية الجدارية",
    type: "activity",
    date: "2026-08-20",
    time: "14:00 - 16:00",
    className: "السنة الثانية - ب",
    description: "نشاط جماعي لزخرفة ساحة المدرسة بألوان صديقة للبيئة.",
  },
];

export const initialSchedule: ScheduleItem[] = [
  // Sunday
  { id: "sch-1", day: "الأحد", timeSlot: "08:00 - 09:00", subjectName: "اللغة العربية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  { id: "sch-2", day: "الأحد", timeSlot: "09:00 - 10:00", subjectName: "الرياضيات", teacherName: "الأستاذ أحمد القاسمي", room: "القاعة 4" },
  { id: "sch-3", day: "الأحد", timeSlot: "10:15 - 11:15", subjectName: "التربية الإسلامية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  // Monday
  { id: "sch-4", day: "الإثنين", timeSlot: "08:00 - 09:00", subjectName: "الرياضيات", teacherName: "الأستاذ أحمد القاسمي", room: "القاعة 4" },
  { id: "sch-5", day: "الإثنين", timeSlot: "09:00 - 10:00", subjectName: "اللغة العربية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  { id: "sch-6", day: "الإثنين", timeSlot: "10:15 - 11:15", subjectName: "النشاط العلمي", teacherName: "الأستاذ خالد العمراني", room: "المخبر التربوي" },
  // Tuesday
  { id: "sch-7", day: "الثلاثاء", timeSlot: "08:00 - 09:00", subjectName: "اللغة العربية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  { id: "sch-8", day: "الثلاثاء", timeSlot: "09:00 - 10:00", subjectName: "التربية الفنية", teacherName: "الأستاذ خالد العمراني", room: "ورشة الفنون" },
  // Wednesday
  { id: "sch-9", day: "الأربعاء", timeSlot: "08:00 - 09:00", subjectName: "الرياضيات", teacherName: "الأستاذ أحمد القاسمي", room: "القاعة 4" },
  { id: "sch-10", day: "الأربعاء", timeSlot: "09:00 - 10:00", subjectName: "النشاط العلمي", teacherName: "الأستاذ خالد العمراني", room: "القاعة 4" },
  { id: "sch-11", day: "الأربعاء", timeSlot: "10:15 - 11:15", subjectName: "التربية الإسلامية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  // Thursday
  { id: "sch-12", day: "الخميس", timeSlot: "08:00 - 09:00", subjectName: "اللغة العربية", teacherName: "الأستاذة مريم البتول", room: "القاعة 4" },
  { id: "sch-13", day: "الخميس", timeSlot: "09:00 - 10:00", subjectName: "الرياضيات", teacherName: "الأستاذ أحمد القاسمي", room: "القاعة 4" },
  { id: "sch-14", day: "الخميس", timeSlot: "10:15 - 11:15", subjectName: "مطالعة ونشاط حر", teacherName: "الأستاذة مريم البتول", room: "المكتبة" },
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  { id: "att-1", studentId: "std-1", studentName: "أمين بن علي", date: "2026-08-10", status: "present" },
  { id: "att-2", studentId: "std-1", studentName: "أمين بن علي", date: "2026-08-09", status: "present" },
  { id: "att-3", studentId: "std-1", studentName: "أمين بن علي", date: "2026-08-08", status: "late", notes: "تأخر 10 دقائق بعذر مقبول" },
  { id: "att-4", studentId: "std-1", studentName: "أمين بن علي", date: "2026-08-05", status: "present" },
  { id: "att-5", studentId: "std-1", studentName: "أمين بن علي", date: "2026-08-04", status: "present" },
  { id: "att-6", studentId: "std-2", studentName: "ريم بن علي", date: "2026-08-10", status: "present" },
  { id: "att-7", studentId: "std-3", studentName: "يوسف بن منصور", date: "2026-08-10", status: "absent", notes: "وعكة صحية خفيفة" },
  { id: "att-8", studentId: "std-4", studentName: "سارة زروقي", date: "2026-08-10", status: "present" },
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "anc-1",
    title: "افتراض ورشات التوعية الصحية المدرسية وترشيد استخدام الشاشات",
    content: "تعلن إدارة مدرسة الأمل الابتدائية عن تنظيم أسبوع التوعية بالصحة الرقمية والنوم الباكر للأطفال، نرجو من الأولياء الأفاضل متابعة نصائح الأساتذة.",
    publisherName: "إدارة مدرسة الأمل",
    publisherRole: "إدارة المدرسة",
    publishedAt: "2026-08-09",
    priority: "important",
  },
  {
    id: "anc-2",
    title: "تنبيه هام بشأن أدوات مادة التربية الفنية للأسبوع الحالي",
    content: "يرجى من أولياء تلاميذ السنة الثانية أحضار كراس الرسم وأقلام التلوين الخشبية لحصة يوم الثلاثاء القادم.",
    publisherName: "الأستاذ خالد العمراني",
    publisherRole: "أستاذ القسم",
    publishedAt: "2026-08-07",
    priority: "normal",
  },
  {
    id: "anc-3",
    title: "تعديل توقيت الدخول ليوم الأحد القادم بسبب الأشغال الصباحية",
    content: "نحيطكم علماً بأن الدخول لجميع الفصول سيكون بداية من الساعة 08:15 صباحاً بدلاً من 08:00 بشكل استثنائي لأعمال الصيانة.",
    publisherName: "إدارة مدرسة الأمل",
    publisherRole: "إدارة المدرسة",
    publishedAt: "2026-08-05",
    priority: "urgent",
  },
];

export const initialTeacherTips: TeacherTip[] = [
  {
    id: "tip-1",
    teacherName: "الأستاذ أحمد القاسمي",
    subjectName: "الرياضيات",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    content: "خصص 15 دقيقة يومياً لمراجعة جدول الضرب والجمع الشفهي مع طفلك عبر ألعاب سريعة في المنزل أثناء تحضير العشاء.",
    publishedAt: "منذ يومين",
    likesCount: 14,
    isLiked: true,
  },
  {
    id: "tip-2",
    teacherName: "الأستاذة مريم البتول",
    subjectName: "اللغة العربية",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    content: "اقرأ قصة قصيرة مع طفلك قبل النوم واطلب منه أن يعيد عليك أحداثها بأسلوبه الخاص، هذا ينمي الرصيد اللغوي والثقة بالنفس بشكل مذهل.",
    publishedAt: "منذ 3 أيام",
    likesCount: 22,
    isLiked: false,
  },
  {
    id: "tip-3",
    teacherName: "الأستاذ خالد العمراني",
    subjectName: "النشاط العلمي",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    content: "شجع طفلك على طرح الأسئلة حول الطبيعة والنباتات عند خروجكم في نزهة، ودونه في دفتر الملاحظات الصغير.",
    publishedAt: "منذ 5 أيام",
    likesCount: 9,
    isLiked: false,
  },
];

export const initialConversations: TeacherConversation[] = [
  {
    id: "conv-1",
    teacherId: "teacher-1",
    teacherName: "الأستاذ أحمد القاسمي",
    subjectName: "مدرس الرياضيات - السنة الثانية ب",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    lastMessage: "ممتاز جداً، أمين يتطور بشكل ملحوظ في عمليات الجمع بالاحتفاظ!",
    lastMessageTime: "10:30 ص",
    unreadCount: 1,
  },
  {
    id: "conv-2",
    teacherId: "teacher-2",
    teacherName: "الأستاذة مريم البتول",
    subjectName: "مدرسة اللغة العربية",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    lastMessage: "السلام عليكم، أريد التذكير بضرورة احضار كراس المطالعة غداً.",
    lastMessageTime: "أمس",
    unreadCount: 0,
  },
];

export const initialMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "m1",
      conversationId: "conv-1",
      senderId: "parent-1",
      senderName: "عبد القادر بن علي",
      senderRole: "parent",
      text: "السلام عليكم أستاذ أحمد، كيف تجد مستوى أمين في درس الجمع الأخير؟",
      timestamp: "09:15 ص",
      isRead: true,
    },
    {
      id: "m2",
      conversationId: "conv-1",
      senderId: "teacher-1",
      senderName: "الأستاذ أحمد القاسمي",
      senderRole: "teacher",
      text: "وعليكم السلام ورحمة الله أخي عبد القادر. أمين ماشاء الله مجتهد ومركز بالقسم، تمكن من حل أغلب التطبيقات العمودية بدقة.",
      timestamp: "09:40 ص",
      isRead: true,
    },
    {
      id: "m3",
      conversationId: "conv-1",
      senderId: "teacher-1",
      senderName: "الأستاذ أحمد القاسمي",
      senderRole: "teacher",
      text: "ممتاز جداً، أمين يتطور بشكل ملحوظ في عمليات الجمع بالاحتفاظ!",
      timestamp: "10:30 ص",
      isRead: false,
    },
  ],
  "conv-2": [
    {
      id: "m4",
      conversationId: "conv-2",
      senderId: "teacher-2",
      senderName: "الأستاذة مريم البتول",
      senderRole: "teacher",
      text: "السلام عليكم، أريد التذكير بضرورة احضار كراس المطالعة غداً.",
      timestamp: "أمس 16:20",
      isRead: true,
    },
  ],
};

export const initialNotifications: AppNotification[] = [
  {
    id: "notif-1",
    title: "نشر درس جديد في الرياضيات",
    body: "قام الأستاذ أحمد القاسمي بنشر درس 'جمع الأعداد بالاحتفاظ من 0 إلى 99'.",
    type: "lesson",
    timestamp: "منذ ساعة",
    isRead: false,
    linkTab: "lessons",
  },
  {
    id: "notif-2",
    title: "تذكير بموعد واجب منزلي",
    body: "آخر موعد لتسليم واجب اللغة العربية ينتهي بعد غد.",
    type: "assignment",
    timestamp: "منذ 3 ساعات",
    isRead: false,
    linkTab: "assignments",
  },
  {
    id: "notif-3",
    title: "رسالة جديدة من الأستاذ",
    body: "أرسل لك الأستاذ أحمد القاسمي ملاحظة جديدة حول أمين.",
    type: "message",
    timestamp: "منذ 4 ساعات",
    isRead: false,
    linkTab: "messages",
  },
  {
    id: "notif-4",
    title: "إعلان مدرسي جديد",
    body: "تنظيم أسبوع التوعية بالصحة الرقمية والنوم الباكر.",
    type: "announcement",
    timestamp: "منذ يوم",
    isRead: true,
    linkTab: "announcements",
  },
];
