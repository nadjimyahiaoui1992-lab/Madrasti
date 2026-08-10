import React from "react";
import {
  Home,
  UserCheck,
  Calendar,
  BookOpen,
  FileCheck,
  CalendarDays,
  MessageSquare,
  Lightbulb,
  Megaphone,
  CheckCircle2,
  Sparkles,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { UserRole } from "../types";

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessagesCount: number;
  unreadAnnouncementsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  setActiveTab,
  unreadMessagesCount,
  unreadAnnouncementsCount,
}) => {
  const getNavItems = () => {
    if (role === "parent") {
      return [
        { id: "dashboard", label: "الرئيسية", icon: Home },
        { id: "profile", label: "ملف الطفل", icon: UserCheck },
        { id: "schedule", label: "البرنامج الدراسي", icon: Calendar },
        { id: "lessons", label: "مكتبة الدروس", icon: BookOpen },
        { id: "assignments", label: "الواجبات والتمارين", icon: FileCheck },
        { id: "calendar", label: "الاختبارات والمواعيد", icon: CalendarDays },
        { id: "messages", label: "التواصل مع الأستاذ", icon: MessageSquare, badge: unreadMessagesCount },
        { id: "tips", label: "نصيحة الأستاذ", icon: Lightbulb },
        { id: "announcements", label: "إعلانات المدرسة", icon: Megaphone, badge: unreadAnnouncementsCount },
        { id: "attendance", label: "الحضور والغياب", icon: CheckCircle2 },
        { id: "ai_assistant", label: "مساعد مدرستي 🤖", icon: Sparkles, isAi: true },
      ];
    } else if (role === "teacher") {
      return [
        { id: "dashboard", label: "لوحة التحكم", icon: Home },
        { id: "students", label: "قائمة التلاميذ", icon: Users },
        { id: "lessons", label: "الدروس والمحتوى", icon: BookOpen },
        { id: "assignments", label: "الواجبات المنزلية", icon: FileCheck },
        { id: "attendance", label: "تسجيل الحضور اليومي", icon: CheckCircle2 },
        { id: "messages", label: "رسائل الأولياء", icon: MessageSquare, badge: unreadMessagesCount },
        { id: "tips", label: "نصائح للأولياء", icon: Lightbulb },
        { id: "announcements", label: "إعلانات القسم", icon: Megaphone },
        { id: "calendar", label: "المواعيد والاختبارات", icon: CalendarDays },
        { id: "ai_assistant", label: "مساعد المعلم الذكي 🤖", icon: Sparkles, isAi: true },
      ];
    } else {
      // Admin
      return [
        { id: "dashboard", label: "لوحة الإدارة والإحصائيات", icon: Home },
        { id: "admin_management", label: "إدارة النظام والتلاميذ", icon: Users },
        { id: "announcements", label: "إعلانات المدرسة العامة", icon: Megaphone },
        { id: "calendar", label: "التقويم والمواعيد العامة", icon: CalendarDays },
        { id: "schedule", label: "البرامج والجدول الموحد", icon: Calendar },
        { id: "ai_assistant", label: "المساعد الذكي 🤖", icon: Sparkles, isAi: true },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-slate-200/80 shrink-0 min-h-[calc(100vh-4rem)] p-4 space-y-6">
      
      {/* Role Indicator Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/10 pointer-events-none" />
        <div className="flex items-center gap-2 mb-1 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>وضع الحساب الحالي</span>
        </div>
        <p className="font-extrabold text-sm">
          {role === "parent" ? "فضاء ولي الأمر" : role === "teacher" ? "فضاء الأستاذ(ة)" : "فضاء إدارة المدرسة"}
        </p>
        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
          {role === "parent"
            ? "متابعة شاملة لرحلة طفلك التعليمية والتواصل مع معلّمه."
            : role === "teacher"
            ? "إدارة الدروس والواجبات والتواصل المنظم مع أولياء تلاميذك."
            : "إدارة شاملة للتلاميذ والأساتذة والأقسام والبرامج."}
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-right ${
                isActive
                  ? item.isAi
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-emerald-50 text-emerald-800 border-r-4 border-emerald-600"
                  : item.isAi
                  ? "bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 shrink-0 ${isActive && !item.isAi ? "text-emerald-600" : ""}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && item.badge > 0 ? (
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Direct AI Assistant Card Prompt */}
      <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-200/60 text-right">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>هل تحتاج لمساعدة؟</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
          مساعد "مدرستي" الذكي جاهز للإجابة عن أسئلتك التربوية وشرح الدروس.
        </p>
        <button
          onClick={() => setActiveTab("ai_assistant")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-xs"
        >
          جرب المساعد الذكي الآن
        </button>
      </div>

    </aside>
  );
};
