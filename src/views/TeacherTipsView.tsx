import React, { useState } from "react";
import { Lightbulb, ThumbsUp, Plus, User, Search, X } from "lucide-react";
import { TeacherTip, UserRole } from "../types";

interface TeacherTipsViewProps {
  tips: TeacherTip[];
  userRole: UserRole;
  onLikeTip: (id: string) => void;
  onAddTip: (content: string) => void;
}

export const TeacherTipsView: React.FC<TeacherTipsViewProps> = ({
  tips,
  userRole,
  onLikeTip,
  onAddTip,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTipText, setNewTipText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTipText.trim()) return;
    onAddTip(newTipText);
    setNewTipText("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Lightbulb className="w-6 h-6 text-amber-100" />
            </div>
            <h1 className="font-extrabold text-xl">💡 نصيحة الأستاذ اليومية للأولياء</h1>
          </div>
          <p className="text-xs text-amber-100 font-medium">إرشادات ونظام تربوي من المعلمين لمساعدة الطفل في المنزل</p>
        </div>

        {userRole === "teacher" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>نشر نصيحة جديدة</span>
          </button>
        )}
      </div>

      {/* Tips Feed Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-4 text-right"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={tip.avatar}
                  alt={tip.teacherName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/30"
                />
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900">{tip.teacherName}</h3>
                  <p className="text-[10px] text-amber-700 font-bold">{tip.subjectName}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100">
                "{tip.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-medium">{tip.publishedAt}</span>

              <button
                onClick={() => onLikeTip(tip.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  tip.isLiked
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>إعجاب ({tip.likesCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tip Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">نشر نصيحة تربوية للأولياء 💡</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص النصيحة التربوية</label>
                <textarea
                  required
                  rows={4}
                  value={newTipText}
                  onChange={(e) => setNewTipText(e.target.value)}
                  placeholder="مثال: تخصيص 15 دقيقة يومياً لمراجعة جدول الضرب يطور ذكاء الطفل بشكل ملحوظ..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500"
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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-md"
                >
                  نشر النصيحة الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
