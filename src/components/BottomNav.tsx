import React, { useState } from "react";
import {
  Home,
  BookOpen,
  FileCheck,
  MessageSquare,
  MoreHorizontal,
  Users,
  Calendar,
  CalendarDays,
  UserCheck,
  CheckCircle2,
  Lightbulb,
  Megaphone,
  Sparkles,
  X,
} from "lucide-react";
import { UserRole } from "../types";

interface BottomNavProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessagesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  role,
  activeTab,
  setActiveTab,
  unreadMessagesCount,
}) => {
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  interface TabItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const parentMainTabs: TabItem[] = [
    { id: "dashboard", label: "الرئيسية", icon: Home },
    { id: "lessons", label: "الدروس", icon: BookOpen },
    { id: "assignments", label: "الواجبات", icon: FileCheck },
    { id: "messages", label: "الرسائل", icon: MessageSquare, badge: unreadMessagesCount },
  ];

  const teacherMainTabs: TabItem[] = [
    { id: "dashboard", label: "الرئيسية", icon: Home },
    { id: "students", label: "التلاميذ", icon: Users },
    { id: "lessons", label: "المحتوى", icon: BookOpen },
    { id: "messages", label: "الرسائل", icon: MessageSquare, badge: unreadMessagesCount },
  ];

  const adminMainTabs: TabItem[] = [
    { id: "dashboard", label: "الرئيسية", icon: Home },
    { id: "admin_management", label: "النظام", icon: Users },
    { id: "announcements", label: "الإعلانات", icon: Megaphone },
    { id: "ai_assistant", label: "المساعد 🤖", icon: Sparkles },
  ];

  const currentMainTabs =
    role === "parent" ? parentMainTabs : role === "teacher" ? teacherMainTabs : adminMainTabs;

  const getMoreItems = () => {
    if (role === "parent") {
      return [
        { id: "profile", label: "ملف الطفل", icon: UserCheck },
        { id: "schedule", label: "البرنامج الدراسي", icon: Calendar },
        { id: "calendar", label: "الاختبارات والمواعيد", icon: CalendarDays },
        { id: "attendance", label: "سجل الحضور والغياب", icon: CheckCircle2 },
        { id: "tips", label: "نصيحة الأستاذ", icon: Lightbulb },
        { id: "announcements", label: "إعلانات المدرسة", icon: Megaphone },
        { id: "ai_assistant", label: "مساعد مدرستي الذكي 🤖", icon: Sparkles, isAi: true },
      ];
    } else if (role === "teacher") {
      return [
        { id: "assignments", label: "الواجبات والتمارين", icon: FileCheck },
        { id: "attendance", label: "تسجيل الحضور اليومي", icon: CheckCircle2 },
        { id: "tips", label: "نصائح للأولياء", icon: Lightbulb },
        { id: "announcements", label: "إعلانات القسم", icon: Megaphone },
        { id: "calendar", label: "المواعيد والاختبارات", icon: CalendarDays },
        { id: "ai_assistant", label: "مساعد المعلم الذكي 🤖", icon: Sparkles, isAi: true },
      ];
    } else {
      return [
        { id: "schedule", label: "الجدول الموحد", icon: Calendar },
        { id: "calendar", label: "التقويم والمواعيد العامة", icon: CalendarDays },
      ];
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {currentMainTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMoreSheet(false);
                }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] min-h-[44px] rounded-xl transition-all ${
                  isActive
                    ? "text-emerald-700 font-extrabold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? "scale-110 text-emerald-600" : ""}`} />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-bold mt-1 line-clamp-1">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5" />
                )}
              </button>
            );
          })}

          {/* More Menu Button */}
          <button
            onClick={() => setShowMoreSheet(!showMoreSheet)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[64px] min-h-[44px] rounded-xl transition-all ${
              showMoreSheet ? "text-emerald-700 font-extrabold" : "text-slate-500"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">المزيد</span>
          </button>
        </div>
      </div>

      {/* More Bottom Sheet */}
      {showMoreSheet && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-extrabold text-slate-900 text-base">القائمة الكاملة</div>
              <button
                onClick={() => setShowMoreSheet(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {getMoreItems().map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMoreSheet(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-2xl font-bold text-xs text-right transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : item.isAi
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white text-slate-700 shadow-xs"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="line-clamp-2">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
