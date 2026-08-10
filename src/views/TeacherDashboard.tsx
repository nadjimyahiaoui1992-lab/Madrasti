import React, { useState } from "react";
import {
  Users,
  BookOpen,
  FileCheck,
  CheckCircle2,
  MessageSquare,
  Plus,
  Megaphone,
  CalendarDays,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  X,
  Bot,
  Trash2,
  Edit2,
  Send,
  Loader2,
} from "lucide-react";
import { SchoolClass, Lesson, Assignment, CalendarEvent, Message, TeacherTip, Student } from "../types";

interface TeacherDashboardProps {
  classes: SchoolClass[];
  lessons: Lesson[];
  assignments: Assignment[];
  students?: Student[];
  onAddLesson: (lesson: Partial<Lesson>) => void;
  onAddAssignment: (assignment: Partial<Assignment>) => void;
  onAddAnnouncement: (ann: { title: string; content: string }) => void;
  onAddTip: (tip: string) => void;
  setActiveTab: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  classes,
  lessons,
  assignments,
  students = [],
  onAddLesson,
  onAddAssignment,
  onAddAnnouncement,
  onAddTip,
  setActiveTab,
}) => {
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [showAiExercisesModal, setShowAiExercisesModal] = useState(false);

  // New Lesson form state
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonSubject, setLessonSubject] = useState("الرياضيات");
  const [lessonContent, setLessonContent] = useState("");

  // New Assignment form state
  const [assTitle, setAssTitle] = useState("");
  const [assSubject, setAssSubject] = useState("الرياضيات");
  const [assDueDate, setAssDueDate] = useState("2026-08-18");
  const [assDesc, setAssDesc] = useState("");

  // Tip & Ann state
  const [tipText, setTipText] = useState("");
  const [annTitleText, setAnnTitleText] = useState("");
  const [annContentText, setAnnContentText] = useState("");

  // AI Exercise Generator State
  const [aiSubject, setAiSubject] = useState("الرياضيات");
  const [aiLevel, setAiLevel] = useState("السنة الثانية ابتدائي");
  const [aiTopic, setAiTopic] = useState("الجمع والطرح");
  const [aiCount, setAiCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState("متوسط");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLesson({
      title: lessonTitle,
      subjectName: lessonSubject,
      subjectId: lessonSubject === "الرياضيات" ? "subj-math" : "subj-arabic",
      classLevel: "السنة الثانية ابتدائي",
      teacherName: "الأستاذ أحمد القاسمي",
      publishedAt: new Date().toISOString().split("T")[0],
      summary: lessonContent.slice(0, 80) + "...",
      content: lessonContent,
    });
    setLessonTitle("");
    setLessonContent("");
    setShowLessonModal(false);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAssignment({
      title: assTitle,
      subjectName: assSubject,
      subjectId: assSubject === "الرياضيات" ? "subj-math" : "subj-arabic",
      teacherName: "الأستاذ أحمد القاسمي",
      publishedAt: new Date().toISOString().split("T")[0],
      dueDate: assDueDate,
      status: "not_started",
      description: assDesc,
    });
    setAssTitle("");
    setAssDesc("");
    setShowAssignmentModal(false);
  };

  const handleGenerateAiExercises = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingAi(true);

    try {
      const res = await fetch("/api/gemini/generate-exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: aiSubject,
          level: aiLevel,
          topic: aiTopic,
          count: aiCount,
          difficulty: aiDifficulty,
        }),
      });

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        setGeneratedQuestions(data.questions);
      } else {
        // Fallback default sample questions
        setGeneratedQuestions([
          { id: "q1", text: `احسب ناتج: 45 + 23 = ...`, options: ["68", "58", "78"], correctOptionIndex: 0 },
          { id: "q2", text: `احسب ناتج: 89 - 34 = ...`, options: ["55", "45", "65"], correctOptionIndex: 0 },
          { id: "q3", text: `ضع العلامة المناسبة بين العددين 76 و 82`, options: ["76 < 82", "76 > 82", "76 = 82"], correctOptionIndex: 0 },
        ]);
      }
    } catch (err) {
      console.error(err);
      setGeneratedQuestions([
        { id: "q1", text: `احسب ناتج: 45 + 23 = ...`, options: ["68", "58", "78"], correctOptionIndex: 0 },
        { id: "q2", text: `احسب ناتج: 89 - 34 = ...`, options: ["55", "45", "65"], correctOptionIndex: 0 },
      ]);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handlePublishAiHomework = () => {
    if (generatedQuestions.length === 0) return;
    onAddAssignment({
      title: `واجب ${aiSubject}: ${aiTopic}`,
      subjectName: aiSubject,
      teacherName: "الأستاذ أحمد القاسمي",
      publishedAt: new Date().toISOString().split("T")[0],
      dueDate: "2026-08-18",
      status: "not_started",
      description: `تمارين مولدة بالذكاء الاصطناعي لموضوع (${aiTopic}) لمستوى ${aiLevel}`,
      questions: generatedQuestions,
    });
    alert("تم نشر التمارين المولدة بالذكاء الاصطناعي كواجب منزل بنجاح للطلاب 🎉");
    setGeneratedQuestions([]);
    setShowAiExercisesModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
              لوحة المعلم(ة) • مدرستي الذكية
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">مرحبًا أستاذ أحمد 👋</h1>
            <p className="text-xs text-indigo-100/90 mt-1">
              مدرس مادة الرياضيات للسنة الثانية - ب والعديد من الأقسام المبدعة.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAiExercisesModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>🤖 تمارين بالذكاء الاصطناعي</span>
            </button>

            <button
              onClick={() => setShowLessonModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة درس</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Stat Counters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">عدد التلاميذ</p>
            <p className="text-2xl font-black text-slate-900">42</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">عدد الأقسام</p>
            <p className="text-2xl font-black text-indigo-700">{classes.length || 3}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">الواجبات</p>
            <p className="text-2xl font-black text-emerald-600">{assignments.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">الرسائل الجديدة</p>
            <p className="text-2xl font-black text-rose-600">2</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between col-span-2 md:col-span-1">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">الحضور اليوم</p>
            <p className="text-2xl font-black text-teal-600">96%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar (إجراءات سريعة) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="font-black text-sm text-slate-900">إجراءات سريعة للأستاذ ⚡</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2.5">
          
          <button
            onClick={() => setShowLessonModal(true)}
            className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
          >
            <Plus className="w-5 h-5 text-emerald-600" />
            <span>➕ إضافة درس</span>
          </button>

          <button
            onClick={() => setShowAssignmentModal(true)}
            className="p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
          >
            <FileCheck className="w-5 h-5 text-indigo-600" />
            <span>✏️ إنشاء واجب</span>
          </button>

          <button
            onClick={() => setShowAiExercisesModal(true)}
            className="p-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xs flex flex-col items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>🤖 تمارين بالذكاء</span>
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className="p-3 rounded-2xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>📝 تسجيل الحضور</span>
          </button>

          <button
            onClick={() => setShowAnnModal(true)}
            className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
          >
            <Megaphone className="w-5 h-5 text-sky-600" />
            <span>📢 إعلان</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-5 h-5 text-rose-600" />
            <span>💬 رسائل الأولياء</span>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 font-bold text-xs flex flex-col items-center gap-1.5 transition-all col-span-2 sm:col-span-1"
          >
            <CalendarDays className="w-5 h-5 text-amber-600" />
            <span>📅 إضافة اختبار</span>
          </button>

        </div>
      </div>

      {/* Class Roster Overview */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">الأقسام المسندة إليك 🏫</h3>
            <button onClick={() => setActiveTab("students")} className="text-xs text-indigo-600 font-bold">
              إدارة التلاميذ ←
            </button>
          </div>

          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
              >
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{cls.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{cls.gradeLevel} • {cls.studentCount} تلميذ</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("attendance")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    تسجيل الحضور
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Teacher Assistant Widget */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-5 rounded-3xl shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>مساعد مدرستي للأستاذ 🤖</span>
            </div>
            <h3 className="font-black text-base">إنشاء تمارين واختبارات بضغطة زر</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              استخدم الذكاء الاصطناعي المدمج لتوليد تمارين وأسئلة مستهدفة لأقسامك مع اقتراح الإجابات النموذجية.
            </p>
          </div>

          <button
            onClick={() => setShowAiExercisesModal(true)}
            className="w-full bg-white text-emerald-900 font-black text-xs py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-xs"
          >
            توليد تمارين للقسم الآن ✨
          </button>
        </div>

      </div>

      {/* AI Exercise Generator Modal (إنشاء تمارين بالذكاء الاصطناعي) */}
      {showAiExercisesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">إنشاء تمارين بالذكاء الاصطناعي 🤖</h3>
                  <p className="text-[11px] text-slate-500">قم بتوليد تمارين تفاعلية مخصصة للمرحلة الابتدائية ونشرها كواجبات منزلية</p>
                </div>
              </div>

              <button onClick={() => setShowAiExercisesModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Generator Form */}
            <form onSubmit={handleGenerateAiExercises} className="grid sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المادة</label>
                <select
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="الرياضيات">🔢 الرياضيات</option>
                  <option value="اللغة العربية">📖 اللغة العربية</option>
                  <option value="النشاط العلمي">🔬 النشاط العلمي</option>
                  <option value="التربية الإسلامية">🕌 التربية الإسلامية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المستوى الدراسي</label>
                <select
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="السنة الأولى ابتدائي">السنة الأولى ابتدائي</option>
                  <option value="السنة الثانية ابتدائي">السنة الثانية ابتدائي</option>
                  <option value="السنة الثالثة ابتدائي">السنة الثالثة ابتدائي</option>
                  <option value="السنة الرابعة ابتدائي">السنة الرابعة ابتدائي</option>
                  <option value="السنة الخامسة ابتدائي">السنة الخامسة ابتدائي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الموضوع المستهدف</label>
                <input
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="مثال: الجمع بالطرح، الأعداد إلى 99، الهمزة المتوسطة..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عدد الأسئلة</label>
                  <select
                    value={aiCount}
                    onChange={(e) => setAiCount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    <option value={3}>3 أسئلة</option>
                    <option value={5}>5 أسئلة</option>
                    <option value={10}>10 أسئلة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الصعوبة</label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    <option value="سهل">سهل 🟢</option>
                    <option value="متوسط">متوسط 🟡</option>
                    <option value="متقدم">متقدم 🔴</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isGeneratingAi}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري توليد الأسئلة بواسطة الذكاء الاصطناعي...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>إنشاء التمارين الذكية</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Generated Questions List */}
            {generatedQuestions.length > 0 && (
              <div className="space-y-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">
                    الأسئلة المولدة ({generatedQuestions.length}):
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    يمكنك التعديل أو النشر مباشرة
                  </span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200/60">
                  {generatedQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {idx + 1}. {q.text}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== idx))
                          }
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {q.options && Array.isArray(q.options) && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {q.options.map((opt: string, oIdx: number) => (
                            <span
                              key={oIdx}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${
                                oIdx === q.correctOptionIndex
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                  : "bg-slate-50 border-slate-200 text-slate-600"
                              }`}
                            >
                              {opt} {oIdx === q.correctOptionIndex ? "✓" : ""}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handlePublishAiHomework}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>نشر للطلاب كواجب منزل</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">نشر درس جديد للقسم</h3>
              <button onClick={() => setShowLessonModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLessonSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الدرس</label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="مثال: ترتيب الأعداد واستعمال الشريط العددي..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المادة</label>
                <select
                  value={lessonSubject}
                  onChange={(e) => setLessonSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                  <option value="النشاط العلمي">النشاط العلمي</option>
                  <option value="التربية الإسلامية">التربية الإسلامية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">محتوى وتفاصيل الدرس</label>
                <textarea
                  rows={4}
                  required
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  placeholder="اكتب خلاصة الشرح والقواعد الأساسية هنا..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                >
                  نشر الدرس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">إنشاء واجب منزل جديد</h3>
              <button onClick={() => setShowAssignmentModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignmentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الواجب</label>
                <input
                  type="text"
                  required
                  value={assTitle}
                  onChange={(e) => setAssTitle(e.target.value)}
                  placeholder="مثال: واجب الجمع العمودي صفحة 45..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المادة</label>
                  <select
                    value={assSubject}
                    onChange={(e) => setAssSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="الرياضيات">الرياضيات</option>
                    <option value="اللغة العربية">اللغة العربية</option>
                    <option value="النشاط العلمي">النشاط العلمي</option>
                    <option value="التربية الإسلامية">التربية الإسلامية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ التسليم</label>
                  <input
                    type="date"
                    required
                    value={assDueDate}
                    onChange={(e) => setAssDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تعليمات الواجب</label>
                <textarea
                  rows={3}
                  value={assDesc}
                  onChange={(e) => setAssDesc(e.target.value)}
                  placeholder="اكتب التمارين والصفحة المطلوبة..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                >
                  نشر الواجب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tip Modal */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">نشر نصيحة تربوية للأولياء 💡</h3>
              <button onClick={() => setShowTipModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onAddTip(tipText); setTipText(""); setShowTipModal(false); }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص النصيحة التربوية</label>
                <textarea
                  rows={3}
                  required
                  value={tipText}
                  onChange={(e) => setTipText(e.target.value)}
                  placeholder="مثال: خصص 15 دقيقة يومياً للقراءة الحرة مع طفلك وتجنب الضغط المفرط..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowTipModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-md"
                >
                  نشر النصيحة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">إرسال إعلان هام 📢</h3>
              <button onClick={() => setShowAnnModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onAddAnnouncement({ title: annTitleText, content: annContentText }); setAnnTitleText(""); setAnnContentText(""); setShowAnnModal(false); }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الإعلان</label>
                <input
                  type="text"
                  required
                  value={annTitleText}
                  onChange={(e) => setAnnTitleText(e.target.value)}
                  placeholder="مثال: اجتماع أولياء التلاميذ القادم..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص الإعلان</label>
                <textarea
                  rows={3}
                  required
                  value={annContentText}
                  onChange={(e) => setAnnContentText(e.target.value)}
                  placeholder="اكتب الإعلان هنا..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-md"
                >
                  إرسال الإعلان
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
