import React, { useState } from "react";
import { Users, School, Building, Plus, Search, Trash2, Edit, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { Student, SchoolClass } from "../types";

interface AdminManagementViewProps {
  students: Student[];
  classes: SchoolClass[];
  onAddStudent: (st: Partial<Student>) => void;
  onAddClass: (cls: Partial<SchoolClass>) => void;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  students,
  classes,
  onAddStudent,
  onAddClass,
}) => {
  const [activeTab, setActiveTab] = useState<"students" | "teachers" | "classes">("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  // New Student form
  const [stName, setStName] = useState("");
  const [stClass, setStClass] = useState("السنة الثانية - ب");
  const [stParentName, setStParentName] = useState("");

  // New Class form
  const [clsName, setClsName] = useState("");
  const [clsTeacher, setClsTeacher] = useState("الأستاذ أحمد القاسمي");

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      name: stName,
      className: stClass,
      parentName: stParentName,
      gradeLevel: "السنة الثانية ابتدائي",
      schoolName: "مدرسة الأمل الابتدائية",
      teacherName: "الأستاذ أحمد القاسمي",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
      attendanceRate: 100,
      homeworkCompletionRate: 100,
      notesCount: 0,
    });
    setStName("");
    setStParentName("");
    setShowAddStudentModal(false);
  };

  const handleAddClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClass({
      name: clsName,
      gradeLevel: "السنة الثانية ابتدائي",
      mainTeacherName: clsTeacher,
      studentCount: 20,
    });
    setClsName("");
    setShowAddClassModal(false);
  };

  const filteredStudents = students.filter(
    (s) => s.name.includes(searchQuery) || s.parentName.includes(searchQuery) || s.className.includes(searchQuery)
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg">إدارة المدرسة الحصرية</h1>
            <p className="text-xs text-slate-500">إدارة سجلات التلاميذ والأساتذة والأقسام بدون أي تدخل خارجي</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "students" && (
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>تسجيل تلميذ جديد</span>
            </button>
          )}

          {activeTab === "classes" && (
            <button
              onClick={() => setShowAddClassModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة قسم جديد</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
            activeTab === "students" ? "bg-emerald-600 text-white shadow-xs" : "bg-white text-slate-700 border hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>التلاميذ والأولياء ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("teachers")}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
            activeTab === "teachers" ? "bg-emerald-600 text-white shadow-xs" : "bg-white text-slate-700 border hover:bg-slate-50"
          }`}
        >
          <School className="w-4 h-4" />
          <span>الهيئة التدريسية (18 أستاذ)</span>
        </button>

        <button
          onClick={() => setActiveTab("classes")}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
            activeTab === "classes" ? "bg-emerald-600 text-white shadow-xs" : "bg-white text-slate-700 border hover:bg-slate-50"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>الأقسام الدراسية ({classes.length})</span>
        </button>
      </div>

      {/* Tab 1: Students Management */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن تلميذ بالاسم أو بالولي..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10 shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-extrabold">
                  <tr>
                    <th className="p-4">اسم التلميذ</th>
                    <th className="p-4">القسم</th>
                    <th className="p-4">ولي الأمر</th>
                    <th className="p-4">الأستاذ المباشر</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-full object-cover" />
                        <span className="font-extrabold">{st.name}</span>
                      </td>
                      <td className="p-4">{st.className}</td>
                      <td className="p-4">{st.parentName}</td>
                      <td className="p-4">{st.teacherName}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => alert(`تعديل بيانات الطالب: ${st.name}`)}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Teachers Management */}
      {activeTab === "teachers" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="الأستاذ أحمد القاسمي"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">الأستاذ أحمد القاسمي</h3>
                <p className="text-xs text-emerald-700 font-bold">استاذ مادة الرياضيات والعلوم</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">المسند: السنة الثانية - ب، السنة الثالثة - أ</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1580894732413-b7ce29584318?auto=format&fit=crop&q=80&w=200"
                alt="الأستاذة مريم البتول"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">الأستاذة مريم البتول</h3>
                <p className="text-xs text-indigo-700 font-bold">استاذة اللغة العربية والتربية الإسلامية</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">المسند: السنة الأولى - أ، السنة الثانية - ب</p>
          </div>
        </div>
      )}

      {/* Tab 3: Classes Management */}
      {activeTab === "classes" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">{c.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {c.studentCount} طالب
                </span>
              </div>
              <p className="text-xs text-slate-500">الأستاذ الرئيسي: {c.mainTeacherName}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">تسجيل تلميذ جديد</h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم التلميذ الكامل</label>
                <input
                  type="text"
                  required
                  value={stName}
                  onChange={(e) => setStName(e.target.value)}
                  placeholder="مثال: يوسف العربي"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم ولي الأمر</label>
                <input
                  type="text"
                  required
                  value={stParentName}
                  onChange={(e) => setStParentName(e.target.value)}
                  placeholder="مثال: خالد العربي"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">القسم المستهدف</label>
                <select
                  value={stClass}
                  onChange={(e) => setStClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                >
                  حفظ وتسجيل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">إضافة قسم دراسي جديد 🏫</h3>
              <button onClick={() => setShowAddClassModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClassSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم القسم</label>
                <input
                  type="text"
                  required
                  value={clsName}
                  onChange={(e) => setClsName(e.target.value)}
                  placeholder="مثال: السنة الثالثة - أ"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الأستاذ الرئيسي</label>
                <input
                  type="text"
                  required
                  value={clsTeacher}
                  onChange={(e) => setClsTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                >
                  إنشاء القسم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
