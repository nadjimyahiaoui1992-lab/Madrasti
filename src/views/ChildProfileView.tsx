import React from "react";
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  School,
  FileText,
} from "lucide-react";
import { Student, Subject } from "../types";

interface ChildProfileViewProps {
  child: Student;
  subjects: Subject[];
}

export const ChildProfileView: React.FC<ChildProfileViewProps> = ({ child, subjects }) => {
  const subjectProgress = [
    { name: "اللغة العربية", rate: 92, status: "ممتاز 🎉" },
    { name: "الرياضيات", rate: 85, status: "جيد جداً ⭐" },
    { name: "النشاط العلمي", rate: 95, status: "ممتاز 🎉" },
    { name: "التربية الإسلامية", rate: 98, status: "ممتاز جداً 🌟" },
    { name: "التربية الفنية", rate: 90, status: "مبدع 🎨" },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Child Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
          <img
            src={child.avatar}
            alt={child.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md shrink-0"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-slate-900">{child.name}</h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                طالب مجتهد
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {child.className} • {child.schoolName}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <School className="w-4 h-4 text-emerald-600" />
                الأستاذ المباشر: {child.teacherName}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                ولي الأمر: {child.parentName}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
          <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 mb-0.5">إنجاز الواجبات</div>
            <div className="text-xl font-black text-emerald-700">{child.homeworkCompletionRate}%</div>
          </div>

          <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 mb-0.5">نسبة الحضور</div>
            <div className="text-xl font-black text-teal-700">{child.attendanceRate}%</div>
          </div>

          <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 mb-0.5">ملاحظات الأستاذ</div>
            <div className="text-xl font-black text-amber-700">{child.notesCount}</div>
          </div>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <h2 className="font-extrabold text-slate-900 text-sm">مستوى التطور في المواد الدراسية 📈</h2>
        </div>

        <div className="space-y-4">
          {subjectProgress.map((sub, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">{sub.name}</span>
                <span className="text-emerald-700 font-extrabold">{sub.rate}% • {sub.status}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${sub.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Commentary Log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="font-extrabold text-slate-900 text-sm">سجل ملاحظات وتقييم الأستاذ 📝</h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span>الأستاذ أحمد القاسمي - الرياضيات</span>
              <span className="text-[10px] text-slate-400">منذ يومين</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              أمين أظهر استيعاباً سريعاً لعملية الجمع بالاحتفاظ العمودي، أنصحه بمواصلة التمارين المنزلية البسيطة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-indigo-900">
              <span>الأستاذة مريم البتول - اللغة العربية</span>
              <span className="text-[10px] text-slate-400">منذ 5 أيام</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              قراءة أمين معبرة وممتازة بالقسم، يرجى تشجيعه على كتابة سطر يومي لتحسين خط الرقعة.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
