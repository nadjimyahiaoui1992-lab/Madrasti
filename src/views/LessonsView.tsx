import React, { useState } from "react";
import { BookOpen, Search, Filter, FileText, Download, X, ArrowLeft, User, Calendar } from "lucide-react";
import { Lesson, Subject } from "../types";

interface LessonsViewProps {
  lessons: Lesson[];
  subjects: Subject[];
  onOpenLesson: (lesson: Lesson) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ lessons, subjects, onOpenLesson }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLessonModal, setSelectedLessonModal] = useState<Lesson | null>(null);

  const filteredLessons = lessons.filter((les) => {
    const matchesSubject = selectedSubjectId === "all" || les.subjectId === selectedSubjectId;
    const matchesSearch =
      les.title.includes(searchQuery) ||
      les.summary.includes(searchQuery) ||
      les.teacherName.includes(searchQuery);
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">مكتبة الدروس والملخصات</h1>
              <p className="text-xs text-slate-500">دروس تفاعلية مبسطة صادرة مباشرة من معلّمي المدرسة</p>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            {filteredLessons.length} درس متوفر
          </div>
        </div>

        {/* Search & Subject Chips Bar */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن درس بالاسم أو بالمعلم..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white pr-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSubjectId("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedSubjectId === "all"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
              }`}
            >
              الكل 📚
            </button>

            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedSubjectId === sub.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons List Grid */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 space-y-2">
          <p className="font-extrabold text-slate-700 text-sm">لا توجد دروس مطابقة لمحددات البحث 🔍</p>
          <p className="text-xs text-slate-400">جرب البحث بكلمة مختلفة أو تغيير تصنيف المادة.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((les) => (
            <div
              key={les.id}
              onClick={() => setSelectedLessonModal(les)}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                    {les.subjectName}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">{les.publishedAt}</span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">
                  {les.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {les.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1 text-[11px]">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {les.teacherName}
                </span>

                <span className="font-bold text-emerald-700 flex items-center gap-1 group">
                  قراءة الدرس
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Lesson Modal */}
      {selectedLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                  {selectedLessonModal.subjectName}
                </span>
                <h2 className="font-black text-lg text-slate-900">{selectedLessonModal.title}</h2>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>{selectedLessonModal.teacherName}</span>
                  <span>•</span>
                  <span>تاريخ النشر: {selectedLessonModal.publishedAt}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedLessonModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              {selectedLessonModal.content}
            </div>

            {/* Attachments Section */}
            {selectedLessonModal.attachments && selectedLessonModal.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-700">الملفات والمرفقات العلمية:</h4>
                <div className="space-y-2">
                  {selectedLessonModal.attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-800">{att.name}</span>
                        <span className="text-[10px] text-slate-400">({att.size})</span>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`تم بدء تحميل الملف التجريبي: ${att.name}`);
                        }}
                        className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        تحميل
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLessonModal(null)}
                className="px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-700 shadow-md"
              >
                إغلاق الدرس
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
