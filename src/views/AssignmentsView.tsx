import React, { useState } from "react";
import { FileCheck, Clock, CheckCircle2, AlertCircle, PlayCircle, X, Sparkles, Trophy } from "lucide-react";
import { Assignment, AssignmentStatus } from "../types";

interface AssignmentsViewProps {
  assignments: Assignment[];
  onSolveAssignment: (assId: string) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({ assignments, onSolveAssignment }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeSolverModal, setActiveSolverModal] = useState<Assignment | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const filteredAssignments = assignments.filter((a) => {
    if (selectedStatus === "all") return true;
    return a.status === selectedStatus;
  });

  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            🟢 مكتمل
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            🟡 قيد الإنجاز
          </span>
        );
      case "not_started":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
            🔴 لم ينجز
          </span>
        );
    }
  };

  const handleOpenSolver = (ass: Assignment) => {
    setActiveSolverModal(ass);
    setSelectedAnswers({});
    setShowResult(false);
  };

  const handleAnswerSelect = (qId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCompleteSubmission = () => {
    if (activeSolverModal) {
      onSolveAssignment(activeSolverModal.id);
      setShowResult(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">الواجبات والتمارين المنزلية</h1>
              <p className="text-xs text-slate-500">تابع تمارين طفلك وحلها مباشرة عبر المنصة</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>التشريح حسب الحالة:</span>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedStatus === "all" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            جميع الواجبات ({assignments.length})
          </button>

          <button
            onClick={() => setSelectedStatus("not_started")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedStatus === "not_started" ? "bg-rose-600 text-white shadow-xs" : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            }`}
          >
            🔴 لم ينجز ({assignments.filter((a) => a.status === "not_started").length})
          </button>

          <button
            onClick={() => setSelectedStatus("in_progress")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedStatus === "in_progress" ? "bg-amber-600 text-white shadow-xs" : "bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
          >
            🟡 قيد الإنجاز ({assignments.filter((a) => a.status === "in_progress").length})
          </button>

          <button
            onClick={() => setSelectedStatus("completed")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedStatus === "completed" ? "bg-emerald-600 text-white shadow-xs" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            🟢 مكتمل ({assignments.filter((a) => a.status === "completed").length})
          </button>
        </div>
      </div>

      {/* Homework List Grid */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-100">
          <p className="font-extrabold text-slate-700 text-sm">لا توجد واجبات متطابقة مع التصفية المختارة 🎉</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((ass) => (
            <div
              key={ass.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800">
                    {ass.subjectName}
                  </span>
                  {getStatusBadge(ass.status)}
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{ass.title}</h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{ass.description}</p>

                <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between pt-1">
                  <span>الأستاذ: {ass.teacherName}</span>
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    تسليم: {ass.dueDate}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                {ass.status === "completed" ? (
                  <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-2xl text-xs font-bold text-center border border-emerald-200">
                    ✅ تم حل هذا الواجب وتسليمه بنجاح!
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenSolver(ass)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>حل التمرين الآن ✏️</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Homework Solver Modal */}
      {activeSolverModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800">
                  {activeSolverModal.subjectName}
                </span>
                <h2 className="font-extrabold text-base text-slate-900 mt-1">{activeSolverModal.title}</h2>
              </div>

              <button
                onClick={() => setActiveSolverModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showResult ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-3xl text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base">رائع جداً! تم حفظ إجابات طفلك بنجاح 🎉</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تم تسجيل حل الواجب وإشعار أستاذ المادة ({activeSolverModal.teacherName}) بالمستوى المنجز.
                </p>
                <button
                  onClick={() => setActiveSolverModal(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
                >
                  العودة للواجبات
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                  {activeSolverModal.description}
                </p>

                {activeSolverModal.questions && activeSolverModal.questions.length > 0 ? (
                  <div className="space-y-4">
                    {activeSolverModal.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="font-bold text-xs text-slate-900">
                          سؤال {idx + 1}: {q.text}
                        </div>

                        {q.options && (
                          <div className="space-y-2">
                            {q.options.map((opt, optionIdx) => {
                              const isSelected = selectedAnswers[q.id] === optionIdx;
                              return (
                                <button
                                  key={optionIdx}
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, optionIdx)}
                                  className={`w-full p-2.5 rounded-xl text-right text-xs font-semibold transition-all flex items-center gap-2 border ${
                                    isSelected
                                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                    isSelected ? "border-white bg-white/20" : "border-slate-300"
                                  }`}>
                                    {optionIdx + 1}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-600">
                    يرجى حل التمرين في كراس الواجبات وإعلام الأستاذ عند الاقتضاء.
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveSolverModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCompleteSubmission}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  >
                    تأكيد وتسليم الحل ✅
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
