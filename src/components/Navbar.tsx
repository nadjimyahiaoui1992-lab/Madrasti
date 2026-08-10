import React, { useState } from "react";
import {
  GraduationCap,
  Bell,
  ChevronDown,
  LogOut,
  Sparkles,
  User,
  School,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Student, UserRole } from "../types";

interface NavbarProps {
  currentRole: UserRole;
  activeStudent: Student;
  studentsList: Student[];
  onSelectStudent: (studentId: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onChangeRole: (role: UserRole) => void;
  onLogout: () => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  activeStudent,
  studentsList = [],
  onSelectStudent,
  unreadCount,
  onOpenNotifications,
  onChangeRole,
  onLogout,
  onOpenAi,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "ولي أمر (عبد القادر)";
      case "teacher":
        return "أستاذ(ة) (أحمد القاسمي)";
      case "admin":
        return "إدارة المدرسة";
    }
  };

  const roles: { id: UserRole; label: string; icon: any }[] = [
    { id: "parent", label: "ولي أمر", icon: User },
    { id: "teacher", label: "أستاذ(ة)", icon: UserCheck },
    { id: "admin", label: "إدارة المدرسة", icon: School },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Right Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                    مدرستي الذكية
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md border border-emerald-200/60">
                    الابتدائية
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  مدرسة الأمل النموذجية • الجزائر
                </p>
              </div>
            </div>
          </div>

          {/* Center: Child Selector (Only for Parents) */}
          {currentRole === "parent" && activeStudent && studentsList && studentsList.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                className="flex items-center gap-2.5 bg-slate-100/80 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/80 transition-all text-xs sm:text-sm font-semibold text-slate-800"
              >
                <img
                  src={activeStudent.avatar}
                  alt={activeStudent.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {activeStudent.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    {activeStudent.className}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
              </button>

              {showStudentDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 border-b border-slate-100">
                    اختر الطفل المتابع:
                  </div>
                  {studentsList.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        onSelectStudent(st.id);
                        setShowStudentDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-right hover:bg-emerald-50/60 transition-colors ${
                        st.id === activeStudent.id ? "bg-emerald-50 text-emerald-900 font-bold" : "text-slate-700"
                      }`}
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs">{st.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{st.className}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Left Actions: AI Assistant shortcut, Notifications, User Role Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/60"
            >
              <Sparkles className="w-4 h-4 text-emerald-500 fill-emerald-500/20 animate-pulse" />
              <span className="hidden sm:inline">مساعد مدرستي الذكي</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="الإشعارات"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Account / Role Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {currentRole === "parent" ? "👨‍👩‍👧" : currentRole === "teacher" ? "👨‍🏫" : "🏫"}
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{getRoleLabel(currentRole)}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    تبديل الحساب
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {showRoleDropdown && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{getRoleLabel(currentRole)}</p>
                    <p className="text-[11px] text-slate-500">حساب تجريبي فعال</p>
                  </div>

                  <div className="px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      التبديل بين الحسابات:
                    </p>
                    <div className="space-y-1">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            onChangeRole(r.id);
                            setShowRoleDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            currentRole === r.id
                              ? "bg-emerald-50 text-emerald-800 font-bold"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <r.icon className="w-4 h-4" />
                            {r.label}
                          </span>
                          {currentRole === r.id && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        setShowRoleDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
