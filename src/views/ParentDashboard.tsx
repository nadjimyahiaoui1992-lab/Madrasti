import React from "react";
import {
  Sparkles,
  BookOpen,
  FileCheck,
  Calendar,
  CalendarDays,
  MessageSquare,
  Megaphone,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  GraduationCap,
  UserCheck,
  ChevronLeft,
} from "lucide-react";
import { Student, Lesson, Assignment, CalendarEvent, TeacherTip, Announcement } from "../types";

interface ParentDashboardProps {
  child: Student;
  lessons: Lesson[];
  assignments: Assignment[];
  calendarEvents: CalendarEvent[];
  teacherTip?: TeacherTip;
  announcements: Announcement[];
  setActiveTab: (tab: string) => void;
  onOpenAssignment: (ass: Assignment) => void;
  onOpenLesson: (les: Lesson) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  child,
  lessons,
  assignments,
  calendarEvents,
  teacherTip,
  announcements,
  setActiveTab,
  onOpenAssignment,
  onOpenLesson,
}) => {
  const pendingAssignments = assignments.filter((a) => a.status !== "completed");
  const upcomingExams = calendarEvents.filter((e) => e.type === "exam" || e.type === "quiz");

  const todayLesson = lessons[0] || {
    id: "les-today",
    title: "الجمع والطرح العمودي",
    subjectName: "الرياضيات",
    teacherName: "الأستاذ أحمد القاسمي",
    timeSlot: "08:00 - 09:00",
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Welcome & Greeting */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-emerald-100 border border-white/20">
              <GraduationCap className="w-4 h-4" />
              <span>{child.schoolName || "مدرسة الأمل الابتدائية"}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              مرحبًا بك 👋
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 font-bold">
              أنت تتابع اليوم رحلة <span className="text-white underline decoration-emerald-300 underline-offset-4 font-black">{child.name}</span> التعليمية
            </p>
          </div>

          {/* 2. Child Profile Card (بطاقة الطفل) */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 flex items-center gap-4 shrink-0 shadow-md">
            <img
              src={child.avatar}
              alt={child.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/60 shadow-xs"
            />
            <div className="text-right">
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{child.name}</span>
                <span className="text-[10px] bg-emerald-400/30 px-2 py-0.5 rounded-md font-bold text-emerald-100 border border-emerald-300/30">
                  متابع
                </span>
              </div>
              <div className="text-xs text-emerald-100 font-semibold mt-0.5">
                {child.gradeLevel || "السنة الثانية ابتدائي"}
              </div>
              <div className="text-[11px] text-emerald-200 font-medium mt-0.5 flex items-center gap-2">
                <span>القسم: {child.className}</span>
                <span>•</span>
                <span>{child.teacherName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "ماذا يحتاج طفلي اليوم؟" Needs Grid */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <span>ماذا يحتاج طفلي اليوم؟</span>
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            تنبيهات سريعة 🎯
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          
          <button
            onClick={() => setActiveTab("lessons")}
            className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-right transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📚</span>
              <span className="text-[10px] font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full">جديد</span>
            </div>
            <div>
              <div className="font-extrabold text-xs text-emerald-950 group-hover:text-emerald-800">درس جديد</div>
              <div className="text-[10px] text-emerald-700 mt-0.5 font-medium line-clamp-1">متابعة الشرح والتطبيق</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className="p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 text-right transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">✏️</span>
              {pendingAssignments.length > 0 && (
                <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full">
                  {pendingAssignments.length} متبقي
                </span>
              )}
            </div>
            <div>
              <div className="font-extrabold text-xs text-indigo-950 group-hover:text-indigo-800">واجب لم ينجز</div>
              <div className="text-[10px] text-indigo-700 mt-0.5 font-medium line-clamp-1">تمارين اليوم الحسابية</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200/80 text-right transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📅</span>
              <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">قريباً</span>
            </div>
            <div>
              <div className="font-extrabold text-xs text-rose-950 group-hover:text-rose-800">اختبار قادم</div>
              <div className="text-[10px] text-rose-700 mt-0.5 font-medium line-clamp-1">فرض مادة الرياضيات</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className="p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-right transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">💬</span>
              <span className="text-[10px] font-bold bg-teal-200 text-teal-900 px-2 py-0.5 rounded-full">تواصل</span>
            </div>
            <div>
              <div className="font-extrabold text-xs text-teal-950 group-hover:text-teal-800">رسالة من الأستاذ</div>
              <div className="text-[10px] text-teal-700 mt-0.5 font-medium line-clamp-1">ملاحظة الأستاذ أحمد</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className="p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200/80 text-right transition-all group flex flex-col justify-between col-span-2 sm:col-span-1"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📢</span>
              <span className="text-[10px] font-bold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">هام</span>
            </div>
            <div>
              <div className="font-extrabold text-xs text-sky-950 group-hover:text-sky-800">إعلان المدرسة</div>
              <div className="text-[10px] text-sky-700 mt-0.5 font-medium line-clamp-1">مواعيد اجتماع الأولياء</div>
            </div>
          </button>

        </div>
      </div>

      {/* 4. Academic Progress Section (التقدم الدراسي) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-black text-slate-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>التقدم الدراسي لطفلك</span>
          </span>
          <button
            onClick={() => setActiveTab("profile")}
            className="text-xs text-emerald-700 font-extrabold hover:underline flex items-center gap-1"
          >
            <span>تقرير الأداء التفصيلي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div className="text-xs font-extrabold text-slate-500 mb-1">نسبة إنجاز الواجبات</div>
            <div className="text-2xl font-black text-indigo-700">{child.homeworkCompletionRate}%</div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${child.homeworkCompletionRate}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div className="text-xs font-extrabold text-slate-500 mb-1">الحضور والانتظام</div>
            <div className="text-2xl font-black text-emerald-600">{child.attendanceRate}%</div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${child.attendanceRate}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div className="text-xs font-extrabold text-slate-500 mb-1">الدروس المكتملة</div>
            <div className="text-2xl font-black text-teal-700">24</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">درس ملخص ومراجع</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div className="text-xs font-extrabold text-slate-500 mb-1">الواجبات المتبقية</div>
            <div className="text-2xl font-black text-rose-600">{pendingAssignments.length || 3}</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">تستوجب الحل هذا الأسبوع</p>
          </div>
        </div>
      </div>

      {/* 5. Today's Lesson & Upcoming Homework */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Today's Lesson (درس اليوم) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-6 rounded-3xl shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-emerald-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>درس اليوم: 08:00 - 09:00</span>
              </span>
              <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                مقرر اليوم
              </span>
            </div>

            <div>
              <div className="text-xs text-emerald-200 font-extrabold uppercase tracking-wider">
                {todayLesson.subjectName || "الرياضيات"}
              </div>
              <h3 className="text-xl font-black mt-1 leading-snug">
                {todayLesson.title || "الجمع والطرح العمودي"}
              </h3>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                {todayLesson.summary || "شرح مبسط لعمليات الجمع والطرح بالاحتفاظ للأعداد من 0 إلى 99 مع تمارين تطبيقية."}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenLesson(todayLesson as any);
                setActiveTab("lessons");
              }}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>فتح الدرس ومراجعة الشرح</span>
            </button>
          </div>
        </div>

        {/* 6. Upcoming Assignments (الواجبات القادمة) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              <span>الواجبات القادمة ({assignments.length})</span>
            </h3>

            <button
              onClick={() => setActiveTab("assignments")}
              className="text-xs text-indigo-600 font-extrabold hover:underline"
            >
              عرض الكل ←
            </button>
          </div>

          <div className="space-y-3">
            {assignments.slice(0, 3).map((ass) => (
              <div
                key={ass.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3 hover:border-slate-300 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                      {ass.subjectName}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      • {ass.teacherName}
                    </span>
                  </div>

                  <div className="font-extrabold text-xs text-slate-900">{ass.title}</div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>موعد التسليم: {ass.dueDate}</span>
                  </div>
                </div>

                <div className="shrink-0 text-left">
                  {ass.status === "completed" ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      مكتمل
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenAssignment(ass);
                        setActiveTab("assignments");
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      ابدأ الحل
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
