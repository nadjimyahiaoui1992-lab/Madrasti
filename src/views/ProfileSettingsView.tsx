import React, { useState } from "react";
import { User, Settings, Bell, Lock, Globe, Moon, Sun, LogOut, ShieldCheck, Check, KeyRound } from "lucide-react";
import { UserRole } from "../types";

interface ProfileSettingsViewProps {
  currentRole: UserRole;
  userEmail: string;
  onLogout: () => void;
  onChangeRole: (role: UserRole) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  currentRole,
  userEmail,
  onLogout,
  onChangeRole,
}) => {
  const [enablePushNotifs, setEnablePushNotifs] = useState(true);
  const [enableSmsNotifs, setEnableSmsNotifs] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ar");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passSaved, setPassSaved] = useState(false);

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "ولي أمر (عبد القادر بن سعيد)";
      case "teacher":
        return "أستاذ(ة) (أحمد القاسمي)";
      case "admin":
        return "مدير(ة) المدرسة";
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassSaved(true);
    setTimeout(() => {
      setPassSaved(false);
      setShowPasswordModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg">{getRoleTitle(currentRole)}</h1>
            <p className="text-xs text-slate-500">{userEmail} • مدرسة الأمل الابتدائية</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>

      {/* Quick Demo Role Switcher Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-sm">التبديل بين الحسابات التجريبية (Demo Accounts):</div>
          <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full">سريع ⚡</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onChangeRole("parent")}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === "parent" ? "bg-white text-emerald-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            👨‍👩‍👧 ولي أمر
          </button>

          <button
            onClick={() => onChangeRole("teacher")}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === "teacher" ? "bg-white text-emerald-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            👨‍🏫 أستاذ(ة)
          </button>

          <button
            onClick={() => onChangeRole("admin")}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === "admin" ? "bg-white text-emerald-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            🏫 إدارة المدرسة
          </button>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        
        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>تفضيلات التنبيهات والإشعارات</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50">
              <div>
                <div className="font-bold text-xs text-slate-900">إشعارات التطبيق الفورية (Push Notifications)</div>
                <div className="text-[11px] text-slate-500">تنبيهات عند نشر دروس جديدة، واجبات أو رسائل</div>
              </div>

              <input
                type="checkbox"
                checked={enablePushNotifs}
                onChange={(e) => setEnablePushNotifs(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50">
              <div>
                <div className="font-bold text-xs text-slate-900">تنبيهات الرسائل النصية SMS</div>
                <div className="text-[11px] text-slate-500">رسائل نصية قصيرة في الحالات العاجلة الطارئة</div>
              </div>

              <input
                type="checkbox"
                checked={enableSmsNotifs}
                onChange={(e) => setEnableSmsNotifs(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Language & Interface */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>اللغة والواجهة الأساسية</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedLang("ar")}
              className={`p-3 rounded-2xl border text-right font-extrabold text-xs transition-all ${
                selectedLang === "ar"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              🇩🇿 العربية (الرئيسية مع دعم RTL)
            </button>

            <button
              onClick={() => setSelectedLang("fr")}
              className={`p-3 rounded-2xl border text-right font-bold text-xs transition-all ${
                selectedLang === "fr"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              🇫🇷 Français (قريباً)
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>الأمان وكلمة المرور</span>
          </h3>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-slate-600" />
            <span>تغيير كلمة المرور</span>
          </button>
        </div>

      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-extrabold text-base text-slate-900">تغيير كلمة المرور</h3>

            {passSaved ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl text-xs font-bold text-center border border-emerald-200">
                ✅ تم تغيير كلمة المرور بنجاح!
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <input
                  type="password"
                  required
                  placeholder="كلمة المرور الحالية"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="password"
                  required
                  placeholder="كلمة المرور الجديدة"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    تحديث
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
