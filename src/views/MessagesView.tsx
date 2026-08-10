import React, { useState } from "react";
import { MessageSquare, Send, Paperclip, CheckCheck, User, Image, FileText, ArrowRight, Search } from "lucide-react";
import { Message, TeacherConversation, UserRole } from "../types";

interface MessagesViewProps {
  conversations: TeacherConversation[];
  messages: Record<string, Message[]>;
  currentRole: UserRole;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  messages,
  currentRole,
  onSendMessage,
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || "conv-1");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileThread, setShowMobileThread] = useState(false);

  const filteredConvs = conversations.filter(
    (c) =>
      c.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const currentThread = messages[activeConvId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeConvId, inputText);
    setInputText("");
  };

  return (
    <div className="space-y-4 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base">التواصل المباشر والمنظم</h1>
            <p className="text-xs text-slate-500">رسائل آمنة بين أستاذ المادة وإدارة المدرسة والأولياء</p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
          تواصل مدرسي محمي 🔒
        </span>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden h-[600px] grid grid-cols-12">
        
        {/* Right Conversations List */}
        <div
          className={`col-span-12 md:col-span-5 border-l border-slate-100 flex flex-col ${
            showMobileThread ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-100 bg-slate-50 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في المحادثات..."
                className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400">جهة الاتصال (الأستاذ / الإدارة):</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConvs.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setShowMobileThread(true);
                  }}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? "bg-emerald-50/70 border-r-4 border-emerald-600" : "hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={conv.avatar}
                    alt={conv.teacherName}
                    className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-slate-200"
                  />

                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">{conv.teacherName}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium truncate mb-1">{conv.subjectName}</p>
                    <p className="text-xs text-slate-600 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left Message Thread View */}
        <div
          className={`col-span-12 md:col-span-7 flex flex-col bg-slate-50/50 ${
            showMobileThread ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Thread Top Bar */}
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileThread(false)}
                className="md:hidden p-1 text-slate-500 hover:text-slate-800"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <img
                src={activeConv?.avatar}
                alt={activeConv?.teacherName}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <h3 className="font-extrabold text-xs text-slate-900">{activeConv?.teacherName}</h3>
                <p className="text-[10px] text-slate-500 font-medium">{activeConv?.subjectName}</p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              متواجد للمتابعة 🟢
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentThread.map((msg) => {
              const isMe =
                currentRole === "parent" ? msg.senderRole === "parent" : msg.senderRole === "teacher";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${isMe ? "mr-auto items-end" : "ml-auto items-start"}`}
                >
                  <div className="text-[10px] font-bold text-slate-400 mb-1 px-1">{msg.senderName}</div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed text-right space-y-1 shadow-2xs ${
                      isMe
                        ? "bg-emerald-600 text-white rounded-tl-none"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-tr-none"
                    }`}
                  >
                    <p>{msg.text}</p>

                    <div className={`flex items-center justify-end gap-1 text-[9px] pt-1 ${
                      isMe ? "text-emerald-200" : "text-slate-400"
                    }`}>
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-200" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("يمكنك إرفاق صورة أو مستند واجب في المراسلات المباشرة.")}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              title="إرفاق ملف أو صورة"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب رسالتك إلى الأستاذ بكل أدب واحترام..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-md transition-colors shrink-0"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
