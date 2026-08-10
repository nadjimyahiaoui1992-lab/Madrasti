import React, { useState, useEffect } from "react";
import { CalendarDays, Plus, Bell, Clock, Users, Calendar as CalendarIcon, X, Sparkles, AlertCircle } from "lucide-react";
import { CalendarEvent, UserRole } from "../types";

interface ExamsCalendarViewProps {
  events: CalendarEvent[];
  userRole: UserRole;
  onAddEvent?: (event: Partial<CalendarEvent>) => void;
}

export const ExamsCalendarView: React.FC<ExamsCalendarViewProps> = ({ events, userRole, onAddEvent }) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<'exam' | 'quiz' | 'meeting' | 'activity' | 'holiday'>("exam");
  const [eventDate, setEventDate] = useState("2026-08-18");
  const [eventTime, setEventTime] = useState("09:00 - 10:00");
  const [description, setDescription] = useState("");

  // Countdown timer logic
  const upcomingExam = events.find((e) => e.type === "exam" || e.type === "quiz") || {
    id: "ex-sample",
    title: "اختبار الفصل الثالث في مادة الرياضيات",
    date: "2026-08-18",
    time: "09:00 - 10:00",
    subjectName: "الرياضيات",
    teacherName: "الأستاذ أحمد القاسمي",
    description: "يشمل دروس الجمع العمودي والطرح والتناظر المحوري للشريط العددي.",
  };

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number }>({
    days: 2,
    hours: 5,
    minutes: 30,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(upcomingExam.date + "T09:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 2, hours: 5, minutes: 15 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, [upcomingExam]);

  const filteredEvents = events.filter((e) => {
    if (selectedType === "all") return true;
    return e.type === selectedType;
  });

  const getEventBadge = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "exam":
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">📝 اختبار رسمي</span>;
      case "quiz":
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">✏️ فرض قصير</span>;
      case "meeting":
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">🤝 اجتماع أولياء</span>;
      case "activity":
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">🎨 نشاط تربوي</span>;
      case "holiday":
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">🌴 عطلة مدرسية</span>;
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddEvent) {
      onAddEvent({
        title,
        type: eventType,
        date: eventDate,
        time: eventTime,
        description,
        className: "السنة الثانية - ب",
      });
    }
    setTitle("");
    setDescription("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">تقويم الاختبارات والمواعيد الهامة</h1>
              <p className="text-xs text-slate-500">الفروض، الاختبارات، اجتماعات الأولياء والأنشطة المبرمجة</p>
            </div>
          </div>

          {(userRole === "teacher" || userRole === "admin") && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة موعد جديد</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedType === "all" ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            جميع المواعيد ({events.length})
          </button>

          <button
            onClick={() => setSelectedType("exam")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedType === "exam" ? "bg-rose-600 text-white shadow-xs" : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            }`}
          >
            الاختبارات
          </button>

          <button
            onClick={() => setSelectedType("quiz")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedType === "quiz" ? "bg-amber-600 text-white shadow-xs" : "bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
          >
            الفروض
          </button>

          <button
            onClick={() => setSelectedType("meeting")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedType === "meeting" ? "bg-indigo-600 text-white shadow-xs" : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
            }`}
          >
            الاجتماعات
          </button>

          <button
            onClick={() => setSelectedType("activity")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedType === "activity" ? "bg-emerald-600 text-white shadow-xs" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            الأنشطة
          </button>
        </div>
      </div>

      {/* Prominent Live Countdown Card for Next Exam (اختبار قريب) */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-indigo-950 text-white p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-[11px] font-bold text-rose-100 border border-white/20">
              <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
              <span>اختبار قريب مستهدف</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black">{upcomingExam.title}</h2>
            
            <div className="text-xs text-rose-100/90 font-medium flex items-center gap-3">
              <span>📚 المادة: <strong className="text-white">{upcomingExam.subjectName || "الرياضيات"}</strong></span>
              <span>•</span>
              <span>👨‍🏫 الأستاذ: <strong className="text-white">{upcomingExam.teacherName || "الأستاذ أحمد القاسمي"}</strong></span>
              <span>•</span>
              <span>⏰ الوقت: <strong className="text-white">{upcomingExam.time || "09:00 - 10:00"}</strong></span>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-3 shrink-0 shadow-lg">
            <div className="text-center bg-white text-rose-900 px-3 py-2 rounded-xl shadow-xs">
              <span className="block text-xl font-black">{timeLeft.days}</span>
              <span className="text-[10px] font-extrabold uppercase">يوم</span>
            </div>
            <span className="text-xl font-black text-rose-200">:</span>
            <div className="text-center bg-white text-rose-900 px-3 py-2 rounded-xl shadow-xs">
              <span className="block text-xl font-black">{timeLeft.hours}</span>
              <span className="text-[10px] font-extrabold uppercase">ساعة</span>
            </div>
            <span className="text-xl font-black text-rose-200">:</span>
            <div className="text-center bg-white text-rose-900 px-3 py-2 rounded-xl shadow-xs">
              <span className="block text-xl font-black">{timeLeft.minutes}</span>
              <span className="text-[10px] font-extrabold uppercase">دقيقة</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-rose-200">
          <span>⏳ باقي {timeLeft.days} يوم و{timeLeft.hours} ساعات على موعد الاختبار</span>
          <span className="bg-white/10 px-2.5 py-1 rounded-lg">التاريخ: {upcomingExam.date}</span>
        </div>
      </div>

      {/* Events Timeline Cards */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 font-bold text-xs text-slate-400">
            لا توجد مواعيد مبرمجة ضمن هذا التصنيف 🎉
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="text-[10px] font-bold text-rose-600 uppercase">
                    {ev.date.split("-")[1]} / {ev.date.split("-")[2]}
                  </span>
                  <span className="text-xs font-black text-slate-800">
                    {ev.date.split("-")[0]}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getEventBadge(ev.type)}
                    {ev.subjectName && (
                      <span className="text-[10px] font-bold text-slate-500">
                        • {ev.subjectName}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900">{ev.title}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0">
                {ev.time && (
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {ev.time}
                  </span>
                )}

                <button
                  onClick={() => alert(`تم تفعيل التذكير بنجاح لموعد: ${ev.title}`)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="تفعيل تذكير الإشعار"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">إضافة موعد أو اختبار جديد 📅</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الموعد</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: فرض الثلاثي في الرياضيات..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نوع الموعد</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="exam">اختبار رسمي</option>
                    <option value="quiz">فرض قصير</option>
                    <option value="meeting">اجتماع أولياء</option>
                    <option value="activity">نشاط تربوي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">التاريخ</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الوقت والتفاصيل</label>
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="09:00 - 10:00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs mb-2"
                />
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ملاحظات وتفاصيل إضافية..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                >
                  حفظ الموعد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
