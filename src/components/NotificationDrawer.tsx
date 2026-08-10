import React from "react";
import { Bell, X, CheckCheck, BookOpen, FileCheck, MessageSquare, Megaphone, Calendar } from "lucide-react";
import { AppNotification } from "../types";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: AppNotification) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case "assignment":
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-amber-600" />;
      case "announcement":
        return <Megaphone className="w-4 h-4 text-sky-600" />;
      case "exam":
      case "attendance":
      default:
        return <Calendar className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-250">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">مركز الإشعارات</h3>
              <p className="text-[11px] text-slate-500">آخر المستجدات والتنبيهات المدرسية</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors"
              title="تحديد الكل كمقروء"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline">قراءة الكل</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-700 text-sm">لا توجد إشعارات حالياً 🎉</p>
              <p className="text-xs text-slate-400 mt-1">ستصلك التنبيهات فور نشر دروس أو واجبات جديدة.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right ${
                  notif.isRead
                    ? "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                    : "bg-emerald-50/60 border-emerald-200/80 text-slate-900 shadow-xs hover:bg-emerald-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs line-clamp-1">{notif.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0 mr-2">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{notif.body}</p>
                  </div>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-400">تطبيق مدرستي الذكية - نظام التنبيهات المباشر</p>
        </div>

      </div>
    </div>
  );
};
