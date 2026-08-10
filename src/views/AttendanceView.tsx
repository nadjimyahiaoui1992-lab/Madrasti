import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Calendar, Save, Check } from "lucide-react";
import { AttendanceRecord, Student, UserRole } from "../types";

interface AttendanceViewProps {
  attendanceRecords: AttendanceRecord[];
  students: Student[];
  userRole: UserRole;
  onUpdateAttendance?: (studentId: string, status: AttendanceRecord["status"]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendanceRecords,
  students,
  userRole,
  onUpdateAttendance,
}) => {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStatusChange = (studentId: string, status: AttendanceRecord["status"]) => {
    if (onUpdateAttendance) {
      onUpdateAttendance(studentId, status);
    }
  };

  const handleSaveRollCall = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const presentCount = attendanceRecords.filter((r) => r.status === "present").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "absent").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "late").length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg">متابعة الحضور والغياب اليومي</h1>
            <p className="text-xs text-slate-500">سجل الانضباط والتأخيرات المدرسية الموثق</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>تاريخ اليوم: 2026-08-10</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-1">
          <span className="text-[11px] font-bold text-emerald-800">حاضر 🟢</span>
          <p className="text-xl font-black text-emerald-900">{presentCount}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center space-y-1">
          <span className="text-[11px] font-bold text-amber-800">متأخر 🟡</span>
          <p className="text-xl font-black text-amber-900">{lateCount}</p>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center space-y-1">
          <span className="text-[11px] font-bold text-rose-800">غائب 🔴</span>
          <p className="text-xl font-black text-rose-900">{absentCount}</p>
        </div>
      </div>

      {/* Teacher Interactive Roll Call View OR Parent View */}
      {userRole === "teacher" || userRole === "admin" ? (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900">قائمة المناداة والتسجيل اليومي للقسم (السنة الثانية - ب)</h3>

            <button
              onClick={handleSaveRollCall}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>حفظ ورصد الحضور</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-2xl text-xs font-bold text-center animate-in fade-in">
              ✅ تم تسجيل ورصد الحضور وإشعار أسر التلاميذ المغادرين أو الغائبين بنجاح!
            </div>
          )}

          <div className="space-y-3">
            {students.map((st) => {
              const rec = attendanceRecords.find((r) => r.studentId === st.id) || {
                studentId: st.id,
                status: "present",
              };

              return (
                <div
                  key={st.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200" />
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">{st.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">ولي الأمر: {st.parentName}</p>
                    </div>
                  </div>

                  {/* Status Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "present")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                        rec.status === "present"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      حاضر 🟢
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "late")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                        rec.status === "late"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      متأخر 🟡
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "absent")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                        rec.status === "absent"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      غائب 🔴
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Parent View */
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">سجل الانضباط والحضور الأسبوعي والشهري</h3>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
              نسبة الحضور الشهري: 96% 🌟
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { day: "الأحد", date: "2026-08-09", status: "present", label: "✅ الأحد — حاضر" },
              { day: "الإثنين", date: "2026-08-10", status: "present", label: "✅ الإثنين — حاضر" },
              { day: "الثلاثاء", date: "2026-08-11", status: "absent", label: "❌ الثلاثاء — غائب (بعذر طبي)" },
              { day: "الأربعاء", date: "2026-08-12", status: "late", label: "⏰ الأربعاء — متأخر 10 دقائق" },
              { day: "الخميس", date: "2026-08-13", status: "present", label: "✅ الخميس — حاضر" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{item.label}</span>
                </div>

                <span className="text-[11px] font-semibold text-slate-400">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
