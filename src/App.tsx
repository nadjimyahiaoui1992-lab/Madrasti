import React, { useState } from "react";
import {
  initialStudents,
  initialClasses,
  initialSubjects,
  initialLessons,
  initialAssignments,
  initialSchedule,
  initialCalendarEvents,
  initialNotifications,
  initialConversations,
  initialMessages,
  initialTeacherTips,
  initialAnnouncements,
  initialAttendanceRecords,
} from "./data/initialData";

import {
  UserRole,
  Student,
  Lesson,
  Assignment,
  CalendarEvent,
  TeacherTip,
  Announcement,
  AttendanceRecord,
  AppNotification,
  Message,
  AiChatMessage,
  SchoolClass,
} from "./types";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { BottomNav } from "./components/BottomNav";
import { NotificationDrawer } from "./components/NotificationDrawer";

import { LoginPage } from "./views/LoginPage";
import { ParentDashboard } from "./views/ParentDashboard";
import { TeacherDashboard } from "./views/TeacherDashboard";
import { AdminDashboard } from "./views/AdminDashboard";
import { ChildProfileView } from "./views/ChildProfileView";
import { ScheduleView } from "./views/ScheduleView";
import { LessonsView } from "./views/LessonsView";
import { AssignmentsView } from "./views/AssignmentsView";
import { ExamsCalendarView } from "./views/ExamsCalendarView";
import { MessagesView } from "./views/MessagesView";
import { TeacherTipsView } from "./views/TeacherTipsView";
import { AnnouncementsView } from "./views/AnnouncementsView";
import { AttendanceView } from "./views/AttendanceView";
import { AiAssistantView } from "./views/AiAssistantView";
import { AdminManagementView } from "./views/AdminManagementView";
import { ProfileSettingsView } from "./views/ProfileSettingsView";

export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>("parent");
  const [userEmail, setUserEmail] = useState("parent@demo.com");

  // Navigation state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // App domain state
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeStudentId, setActiveStudentId] = useState<string>(initialStudents[0].id);
  const [classes, setClasses] = useState<SchoolClass[]>(initialClasses);
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [schedule] = useState(initialSchedule);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [conversations] = useState(initialConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [teacherTips, setTeacherTips] = useState<TeacherTip[]>(initialTeacherTips);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [chatHistory, setChatHistory] = useState<AiChatMessage[]>([
    {
      id: "init-ai",
      role: "assistant",
      text: "أهلاً بك! أنا مساعد مدرستي الذكي 🤖. كيف يمكنني مساعدتك اليوم في تحضير الدروس، أفكار الفروض، أو نصائح المراجعة مع طفلك؟",
      timestamp: "الآن",
    },
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  // Login handler
  const handleLogin = (email: string, role: UserRole) => {
    setUserEmail(email);
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveTab("dashboard");
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Role Switcher handler
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === "parent") setUserEmail("parent@demo.com");
    if (newRole === "teacher") setUserEmail("teacher@demo.com");
    if (newRole === "admin") setUserEmail("admin@demo.com");
    setActiveTab("dashboard");
  };

  // Notification handlers
  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    setIsNotificationOpen(false);
  };

  // Add Lesson handler
  const handleAddLesson = (newLes: Partial<Lesson>) => {
    const created: Lesson = {
      id: `les-${Date.now()}`,
      title: newLes.title || "درس جديد",
      subjectId: newLes.subjectId || "subj-math",
      subjectName: newLes.subjectName || "الرياضيات",
      classLevel: newLes.classLevel || "السنة الثانية ابتدائي",
      teacherName: newLes.teacherName || "الأستاذ أحمد القاسمي",
      publishedAt: newLes.publishedAt || "2026-08-10",
      summary: newLes.summary || "شرح ممتع وجديد للقسم...",
      content: newLes.content || "محتوى الشرح...",
    };
    setLessons((prev) => [created, ...prev]);

    // Push Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `درس جديد في ${created.subjectName} 📚`,
      body: `قام الأستاذ ${created.teacherName} بنشر درس: "${created.title}".`,
      timestamp: "الآن",
      isRead: false,
      type: "lesson",
      targetTab: "lessons",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Add Assignment handler
  const handleAddAssignment = (newAss: Partial<Assignment>) => {
    const created: Assignment = {
      id: `ass-${Date.now()}`,
      title: newAss.title || "واجب جديد",
      subjectId: newAss.subjectId || "subj-math",
      subjectName: newAss.subjectName || "الرياضيات",
      teacherName: newAss.teacherName || "الأستاذ أحمد القاسمي",
      publishedAt: newAss.publishedAt || "2026-08-10",
      dueDate: newAss.dueDate || "2026-08-15",
      status: "not_started",
      description: newAss.description || "تفاصيل الواجب...",
    };
    setAssignments((prev) => [created, ...prev]);

    // Push Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `واجب منزل جديد في ${created.subjectName} ✏️`,
      body: `تم تكليف القسم بـ: "${created.title}" التسليم بحلول ${created.dueDate}.`,
      timestamp: "الآن",
      isRead: false,
      type: "assignment",
      targetTab: "assignments",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Solve Assignment handler
  const handleSolveAssignment = (assId: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assId ? { ...a, status: "completed" } : a))
    );
  };

  // Like Tip handler
  const handleLikeTip = (tipId: string) => {
    setTeacherTips((prev) =>
      prev.map((t) => {
        if (t.id === tipId) {
          const isLiked = !t.isLiked;
          return {
            ...t,
            isLiked,
            likesCount: isLiked ? t.likesCount + 1 : t.likesCount - 1,
          };
        }
        return t;
      })
    );
  };

  // Add Tip handler
  const handleAddTip = (content: string) => {
    const created: TeacherTip = {
      id: `tip-${Date.now()}`,
      teacherName: "الأستاذ أحمد القاسمي",
      subjectName: "مدرس الرياضيات والنشاط العلمي",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      content,
      publishedAt: "الآن",
      likesCount: 1,
      isLiked: true,
    };
    setTeacherTips((prev) => [created, ...prev]);
  };

  // Add Announcement handler
  const handleAddAnnouncement = (ann: { title: string; content: string }) => {
    const created: Announcement = {
      id: `ann-${Date.now()}`,
      title: ann.title,
      content: ann.content,
      publisherName: userRole === "admin" ? "إدارة مدرسة الأمل" : "الأستاذ أحمد القاسمي",
      publishedAt: "2026-08-10",
      category: "إداري",
      isPinned: true,
    };
    setAnnouncements((prev) => [created, ...prev]);

    // Push Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `إعلان مهم من المدرسة 📢`,
      body: created.title,
      timestamp: "الآن",
      isRead: false,
      type: "announcement",
      targetTab: "announcements",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Add Event handler
  const handleAddEvent = (ev: Partial<CalendarEvent>) => {
    const created: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: ev.title || "موعد جديد",
      type: ev.type || "exam",
      date: ev.date || "2026-08-18",
      time: ev.time || "09:00",
      description: ev.description || "",
      className: ev.className || "السنة الثانية - ب",
    };
    setCalendarEvents((prev) => [...prev, created]);
  };

  // Send Direct Message handler
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: userRole === "parent" ? "parent-1" : "teacher-1",
      senderRole: userRole === "parent" ? "parent" : "teacher",
      senderName: userRole === "parent" ? activeStudent.parentName : "الأستاذ أحمد القاسمي",
      text,
      timestamp: "الآن",
      isRead: true,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));
  };

  // Attendance Update handler
  const handleUpdateAttendance = (studentId: string, status: AttendanceRecord["status"]) => {
    setAttendanceRecords((prev) => {
      const exists = prev.some((r) => r.studentId === studentId);
      if (exists) {
        return prev.map((r) => (r.studentId === studentId ? { ...r, status } : r));
      } else {
        return [
          ...prev,
          {
            studentId,
            date: "2026-08-10",
            status,
          },
        ];
      }
    });
  };

  // Add Student handler
  const handleAddStudent = (st: Partial<Student>) => {
    const created: Student = {
      id: `st-${Date.now()}`,
      name: st.name || "طالب جديد",
      gradeLevel: st.gradeLevel || "السنة الثانية ابتدائي",
      className: st.className || "السنة الثانية - ب",
      schoolName: "مدرسة الأمل الابتدائية",
      teacherName: st.teacherName || "الأستاذ أحمد القاسمي",
      parentName: st.parentName || "ولي الأمر",
      avatar: st.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
      attendanceRate: 100,
      homeworkCompletionRate: 100,
      notesCount: 0,
    };
    setStudents((prev) => [...prev, created]);
  };

  // Add Class handler
  const handleAddClass = (cls: Partial<SchoolClass>) => {
    const created: SchoolClass = {
      id: `cls-${Date.now()}`,
      name: cls.name || "قسم جديد",
      gradeLevel: cls.gradeLevel || "السنة الثانية ابتدائي",
      mainTeacherName: cls.mainTeacherName || "الأستاذ أحمد القاسمي",
      studentCount: cls.studentCount || 20,
    };
    setClasses((prev) => [...prev, created]);
  };

  // AI Assistant Chat Handler
  const handleSendAiMessage = async (text: string) => {
    const userMsg: AiChatMessage = {
      id: `ai-${Date.now()}`,
      role: "user",
      text,
      timestamp: "الآن",
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      const apiHistory = chatHistory.map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: apiHistory }),
      });

      const data = await res.json();

      const aiReplyText = data.reply || "عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي.";

      const aiMsg: AiChatMessage = {
        id: `ai-reply-${Date.now()}`,
        role: "assistant",
        text: aiReplyText,
        timestamp: "الآن",
      };

      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: AiChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: "assistant",
        text: "عذراً! تعذر الاتصال بمركز الذكاء الاصطناعي، يرجى المحاولة بعد قليل.",
        timestamp: "الآن",
      };
      setChatHistory((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // If not logged in, render LoginPage
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans dir-rtl text-right flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={userRole}
        activeStudent={activeStudent}
        studentsList={students}
        onSelectStudent={(id) => setActiveStudentId(id)}
        unreadCount={unreadNotifCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onChangeRole={handleRoleChange}
        onLogout={handleLogout}
        onOpenAi={() => setActiveTab("ai_assistant")}
      />

      {/* Body Content with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        
        {/* Desktop Sidebar */}
        <Sidebar
          currentRole={userRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadNotifCount={unreadNotifCount}
        />

        {/* Main View Area */}
        <main className="flex-1 min-w-0">
          
          {/* Dashboard View Router */}
          {activeTab === "dashboard" && userRole === "parent" && (
            <ParentDashboard
              child={activeStudent}
              lessons={lessons}
              assignments={assignments}
              calendarEvents={calendarEvents}
              teacherTip={teacherTips[0]}
              announcements={announcements}
              setActiveTab={setActiveTab}
              onOpenAssignment={() => setActiveTab("assignments")}
              onOpenLesson={() => setActiveTab("lessons")}
            />
          )}

          {activeTab === "dashboard" && userRole === "teacher" && (
            <TeacherDashboard
              classes={classes}
              lessons={lessons}
              assignments={assignments}
              onAddLesson={handleAddLesson}
              onAddAssignment={handleAddAssignment}
              onAddAnnouncement={handleAddAnnouncement}
              onAddTip={(tip) => handleAddTip(tip)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "dashboard" && userRole === "admin" && (
            <AdminDashboard
              students={students}
              classes={classes}
              announcements={announcements}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Child Profile View */}
          {activeTab === "profile" && (
            <ChildProfileView child={activeStudent} subjects={initialSubjects} />
          )}

          {/* Weekly Schedule View */}
          {activeTab === "schedule" && (
            <ScheduleView schedule={schedule} className={activeStudent.className} />
          )}

          {/* Lessons Library View */}
          {activeTab === "lessons" && (
            <LessonsView
              lessons={lessons}
              subjects={initialSubjects}
              onOpenLesson={() => {}}
            />
          )}

          {/* Homework Assignments View */}
          {activeTab === "assignments" && (
            <AssignmentsView
              assignments={assignments}
              onSolveAssignment={handleSolveAssignment}
            />
          )}

          {/* Exams & Calendar View */}
          {activeTab === "calendar" && (
            <ExamsCalendarView
              events={calendarEvents}
              userRole={userRole}
              onAddEvent={handleAddEvent}
            />
          )}

          {/* Direct Messaging View */}
          {activeTab === "messages" && (
            <MessagesView
              conversations={conversations}
              messages={messages}
              currentRole={userRole}
              onSendMessage={handleSendMessage}
            />
          )}

          {/* Teacher Pedagogical Tips View */}
          {activeTab === "tips" && (
            <TeacherTipsView
              tips={teacherTips}
              userRole={userRole}
              onLikeTip={handleLikeTip}
              onAddTip={handleAddTip}
            />
          )}

          {/* School Announcements View */}
          {activeTab === "announcements" && (
            <AnnouncementsView
              announcements={announcements}
              userRole={userRole}
              onAddAnnouncement={handleAddAnnouncement}
            />
          )}

          {/* Attendance Tracking View */}
          {activeTab === "attendance" && (
            <AttendanceView
              attendanceRecords={attendanceRecords}
              students={students}
              userRole={userRole}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}

          {/* AI Assistant View */}
          {activeTab === "ai_assistant" && (
            <AiAssistantView
              chatHistory={chatHistory}
              onSendMessage={handleSendAiMessage}
              isLoading={isAiLoading}
            />
          )}

          {/* Admin Exclusive Management View */}
          {activeTab === "admin_management" && (
            <AdminManagementView
              students={students}
              classes={classes}
              onAddStudent={handleAddStudent}
              onAddClass={handleAddClass}
            />
          )}

          {/* Settings & Account View */}
          {activeTab === "settings" && (
            <ProfileSettingsView
              currentRole={userRole}
              userEmail={userEmail}
              onLogout={handleLogout}
              onChangeRole={handleRoleChange}
            />
          )}

        </main>
      </div>

      {/* Notification Drawer Modal Sidebar */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentRole={userRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadNotifCount={unreadNotifCount}
      />

    </div>
  );
}
