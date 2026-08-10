import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, RefreshCw, Lightbulb, GraduationCap, CheckCircle2, UserCheck, School } from "lucide-react";
import { AiChatMessage } from "../types";

interface AiAssistantViewProps {
  chatHistory: AiChatMessage[];
  onSendMessage: (text: string, mode?: "parent" | "student" | "teacher") => Promise<void>;
  isLoading: boolean;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  chatHistory,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState<"parent" | "student" | "teacher">("parent");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modePrompts = {
    parent: [
      { text: "كيف أشرح درس الجمع بالاحتفاظ لطفلي بطريقة بسيطة ومسلية؟ 👨‍👩‍👦", label: "شرح درس للطفل" },
      { text: "طفلي يواجه صعوبة في التركيز أثناء إنجاز الواجبات، ما هي الحلول التربوية؟ 💡", label: "نصيحة تركيز" },
      { text: "كيف أجهز طفلي للاختبارات القادمة دون إشعاره بالخوف أو القلق؟ 📝", label: "الاستعداد للاختبار" },
    ],
    student: [
      { text: "اشرح لي هذا السؤال بطريقة سهلة وممتعة يا مساعدي الذكي 🤖", label: "تبسيط سؤال" },
      { text: "لماذا نحتفظ بالواحد فوق العشرات عندما نجمع الأعداد؟ 🔢", label: "فهم خطوة حسابية" },
      { text: "أعطني لغزاً رياضياً صغيراً وممتعاً لأختبر ذكائي! 🌟", label: "تحدي ذكي" },
    ],
    teacher: [
      { text: "أنشئ لي اختبارًا قصيراً في الرياضيات للسنة الثانية ابتدائي 📝", label: "إنشاء اختبار" },
      { text: "صغ لي نصوص إملاء قصيرة تناسب تلاميذ السنة الثانية مع الكلمات المفتاحية 📖", label: "نص إملاء" },
      { text: "اقترح عليّ نشاطاً تفاعلياً لدرس النشاط العلمي عن الكائنات الحية 🔬", label: "نشاط تفاعلي" },
    ],
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput("");
    await onSendMessage(userText, activeMode);
  };

  const handlePromptClick = async (promptText: string) => {
    if (isLoading) return;
    await onSendMessage(promptText, activeMode);
  };

  return (
    <div className="space-y-4 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <h1 className="font-black text-xl">🤖 مساعد مدرستي الذكي</h1>
          </div>
          <p className="text-xs text-emerald-100 font-medium">
            مساعد رفيق محلي ذكي يخدم الأولياء والأستاذ والأطفال بلغة عربية مبسطة ومشجعة
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-100 bg-white/10 px-3.5 py-1.5 rounded-2xl border border-white/20 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>مدعوم بـ Gemini AI 🚀</span>
        </div>
      </div>

      {/* 3 Modes Selector Bar (ثلاثة أوضاع) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-black text-slate-800">اختر وضع المحادثة المناسب:</span>

        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode("parent")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeMode === "parent"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>للولي 👨‍👩‍👦</span>
          </button>

          <button
            onClick={() => setActiveMode("student")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeMode === "student"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>للتلميذ 🎒</span>
          </button>

          <button
            onClick={() => setActiveMode("teacher")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              activeMode === "teacher"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>للأستاذ 👨‍🏫</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[580px] overflow-hidden">
        
        {/* Quick Prompts Bar based on Active Mode */}
        <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">أسئلة مقترحة لوضع ({activeMode === "parent" ? "الأولياء" : activeMode === "student" ? "التلميذ" : "الأستاذ"}):</span>
          {modePrompts[activeMode].map((p, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handlePromptClick(p.text)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-all shrink-0 shadow-2xs disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-2xl shadow-xs">
                🤖
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm">مرحباً بك في مساعد مدرستي الذكي!</h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                {activeMode === "parent" && "يسعدني مساعدتك كولي أمر في شرح المناهج وتوجيه طفلك وتربيته بنجاح."}
                {activeMode === "student" && "أهلاً يا بطلي الصغير! اطلب مني الشرح وسأساعدك لتصبح عبقرياً بأسلوب مشجع ومرح."}
                {activeMode === "teacher" && "مرحباً أستاذنا القدير! يمكنني مساعدتك في صياغة تمارين واختبارات وأفكار دروس مبتكرة."}
              </p>
            </div>
          ) : (
            chatHistory.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isUser ? "mr-auto flex-row-reverse" : "ml-auto flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 mt-1 font-bold ${
                      isUser ? "bg-emerald-600 text-white" : "bg-teal-700 text-white"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-4 rounded-3xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-emerald-600 text-white rounded-tl-none font-medium"
                        : "bg-slate-100 text-slate-900 rounded-tr-none border border-slate-200/80 font-normal whitespace-pre-wrap"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%] ml-auto items-center">
              <div className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center shrink-0 font-bold animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-100 rounded-2xl text-xs text-slate-500 font-medium flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>جاري صياغة إجابة مبسطة ومفيدة...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={
              activeMode === "parent"
                ? "اسأل المساعد: كيف أشرح هذا الدرس لطفلي؟"
                : activeMode === "student"
                ? "اسأل المساعد: اشرح لي هذا السؤال بطريقة سهلة يا ذكي..."
                : "اسأل المساعد: أنشئ لي اختباراً في الرياضيات للسنة الثانية..."
            }
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-40"
          >
            <span>إرسال</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
