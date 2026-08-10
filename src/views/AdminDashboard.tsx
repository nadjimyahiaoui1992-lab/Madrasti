import React from "react";
import {
  Users,
  School,
  BookOpen,
  CheckCircle2,
  FileCheck,
  Megaphone,
  TrendingUp,
  BarChart3,
  Plus,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Student, SchoolClass, Announcement } from "../types";

interface AdminDashboardProps {
  students: Student[];
  classes: SchoolClass[];
  announcements: Announcement[];
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  classes,
  announcements,
  setActiveTab,
}) => {
  const stats = [
    { label: "إجمالي التلاميذ", value: "120", icon: Users, color: "emerald", bg: "bg-emerald-50 text-emerald-700" },
    { label: "الهيئة التدريسية", value: "18", icon: School, color: "indigo", bg: "bg-indigo-50 text-indigo-700" },
    { label: "الأقسام الفعالة", value: "8", icon: Building, color: "amber", bg: "bg-amber-50 text-amber-700" },
    { label: "الواجبات المنشورة", value: "45", icon: FileCheck, color: "sky", bg: "bg-sky-50 text-sky-700" },
    { label: "نسبة الحضور اليوم", value: "94%", icon: CheckCircle2, color: "teal", bg: "bg-teal-50 text-teal-700" },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>إدارة مدرسة الأمل الابتدائية</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">لوحة التحكم والمراقبة العامة</h1>
            <p className="text-xs text-slate-300 mt-1">
              إدارة التلاميذ، الأولياء، الهيئة التدريسية، والأقسام بدون تدخل أي طرف خارجي.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("admin_management")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إدارة التلاميذ والأساتذة</span>
            </button>
            <button
              onClick={() => setActiveTab("announcements")}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Megaphone className="w-4 h-4" />
              <span>نشر إعلان عام</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Main Admin Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center font-bold`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Analytical Visual Progress Bars */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Attendance & Completion Rates Analytics */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">مؤشرات الأداء الأكاديمي والانضباط</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">الأسبوع الحالي</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>نسبة الانضباط والحضور العام بالمدرسة</span>
                <span className="text-emerald-700">94%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>معدل إنجاز الواجبات اليومية بالتفوق</span>
                <span className="text-indigo-700">88%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>تفاعل الأولياء عبر المنصة والرسائل</span>
                <span className="text-amber-700 font-extrabold">92%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[92%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Classes List Overview */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">الأقسام المدرسية 🏫</h3>
          <div className="space-y-3">
            {classes.map((cls) => (
              <div key={cls.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs text-slate-900">{cls.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{cls.mainTeacherName} • {cls.studentCount} طالب</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  نشط 🟢
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
