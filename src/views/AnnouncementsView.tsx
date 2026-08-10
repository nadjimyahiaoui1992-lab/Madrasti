import React, { useState } from "react";
import { Megaphone, Pin, Plus, Calendar, User, X } from "lucide-react";
import { Announcement, UserRole } from "../types";

interface AnnouncementsViewProps {
  announcements: Announcement[];
  userRole: UserRole;
  onAddAnnouncement: (ann: { title: string; content: string }) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  userRole,
  onAddAnnouncement,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleText.trim() || !contentText.trim()) return;
    onAddAnnouncement({ title: titleText, content: contentText });
    setTitleText("");
    setContentText("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg">إعلانات وإخطارات المدرسة</h1>
            <p className="text-xs text-slate-500">أخبار ونشرات المدرسة الرسمية الموجهة لأولياء الأمور</p>
          </div>
        </div>

        {(userRole === "admin" || userRole === "teacher") && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>نشر إعلان جديد</span>
          </button>
        )}
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-3xl border transition-all text-right space-y-3 relative overflow-hidden ${
              ann.isPinned
                ? "bg-gradient-to-r from-sky-50/80 to-indigo-50/80 border-sky-300/80 shadow-xs"
                : "bg-white border-slate-200/80"
            }`}
          >
            {ann.isPinned && (
              <div className="absolute top-4 left-4 bg-sky-600 text-white p-1.5 rounded-xl shadow-xs" title="إعلان مثبت">
                <Pin className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                {ann.category || "إداري"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{ann.publishedAt}</span>
            </div>

            <h3 className="font-extrabold text-base text-slate-900">{ann.title}</h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {ann.content}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>المصدر: {ann.publisherName}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">نشر إعلان رسمي جديد 📢</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الإعلان</label>
                <input
                  type="text"
                  required
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  placeholder="مثال: رحلة مدرسية استكشافية إلى المتحف..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">محتوى الإعلان</label>
                <textarea
                  required
                  rows={4}
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  placeholder="اكتب التنبيه والتعليمات للأولياء بكل توضيح..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-md"
                >
                  نشر الإعلان الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
