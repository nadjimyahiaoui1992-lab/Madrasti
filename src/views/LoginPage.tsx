import React, { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  UserCheck,
  School,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { UserRole } from "../types";

interface LoginPageProps {
  onLogin: (email: string, role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("parent@demo.com");
  const [password, setPassword] = useState("••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("parent");
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const demoAccounts = [
    {
      role: "parent" as UserRole,
      email: "parent@demo.com",
      title: "حساب ولي الأمر",
      subtitle: "متابعة الأبناء والرسائل والواجبات",
      icon: UserCheck,
      color: "emerald",
    },
    {
      role: "teacher" as UserRole,
      email: "teacher@demo.com",
      title: "حساب الأستاذ(ة)",
      subtitle: "نشر الدروس والواجبات والحضور",
      icon: School,
      color: "indigo",
    },
    {
      role: "admin" as UserRole,
      email: "admin@demo.com",
      title: "حساب إدارة المدرسة",
      subtitle: "إدارة الأقسام والأساتذة والتلاميذ",
      icon: ShieldCheck,
      color: "amber",
    },
  ];

  const handleSelectDemo = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setSelectedRole(account.role);
    setPassword("123456");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, selectedRole);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotPassword(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100/20 my-8">
        
        {/* Right Side: Educational Brand Hero */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-8 text-white flex flex-col justify-between relative">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-black text-2xl tracking-tight leading-none">مدرستي الذكية</h1>
                <p className="text-emerald-200 text-xs mt-1 font-medium">المنصة المدرسية والأسرية الموحدة</p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <blockquote className="text-emerald-100 text-sm italic leading-relaxed border-r-2 border-emerald-400/80 pr-3">
                "تعليم أفضل... تواصل أسهل"
              </blockquote>

              <p className="text-xs text-emerald-100/90 leading-relaxed">
                تواصل مباشر ومنظم بين المدرسة وأولياء الأمور لمتابعة الدروس، الواجبات المنزلية، الاختبارات، وحضور الطفل لحظة بلحظة.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>متابعة لحظية لنشاط الطفل والغياب</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>مكتبة دروس وتمارين تفاعلية</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>مساعد ذكي للتدريس وللأولياء (AI) 🤖</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-emerald-200/80 text-[11px] flex items-center justify-between">
            <span>مدرسة الأمل الابتدائية</span>
            <span>النسخة التجريبية v2.5</span>
          </div>
        </div>

        {/* Left Side: Login Form & Demo Selector */}
        <div className="md:col-span-7 bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            <div>
              <h2 className="font-extrabold text-2xl text-slate-900">تسجيل الدخول</h2>
              <p className="text-xs text-slate-500 mt-1">اختر نوع حسابك التجريبي أو أدخل بياناتك:</p>
            </div>

            {/* Demo Accounts Quick Select Pills */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                الحسابات التجريبية الجاهزة (اضغط للتجربة السريعة):
              </p>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((acc) => {
                  const isSelected = selectedRole === acc.role;
                  const Icon = acc.icon;

                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleSelectDemo(acc)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 font-bold"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-600" : "text-slate-500"}`} />
                      <span className="text-xs">{acc.title.replace("حساب ", "")}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  البريد الإلكتروني أو رقم الهاتف
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@demo.com"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all pl-9"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all pl-9"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>تذكرني</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>دخول المنصة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </form>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-center text-[11px] text-slate-500">
              💡 يمكنك التبديل بين حسابات الأولياء والأساتذة والإدارة في أي وقت من القائمة العلوية للتطبيق.
            </div>

          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-extrabold text-base text-slate-900">استرجاع كلمة المرور</h3>
            <p className="text-xs text-slate-500">أدخل بريدك الإلكتروني ليصلك رابط إعادة الضبط:</p>

            {forgotSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl text-xs font-bold text-center border border-emerald-200">
                ✅ تم إرسال رابط إعادة الضبط بنجاح إلى بريدك!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your-email@demo.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    إرسال الرابط
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
