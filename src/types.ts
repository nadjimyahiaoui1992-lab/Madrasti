export type UserRole = 'parent' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  classId?: string;
  className: string;
  gradeLevel?: string;
  schoolName: string;
  parentId?: string;
  parentName: string;
  teacherName: string;
  homeworkCompletionRate: number; // e.g. 88%
  attendanceRate: number; // e.g. 96%
  notesCount: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class e.g., 'emerald'
  bgLight: string;
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  classLevel: string; // e.g. "السنة الثانية ابتدائي"
  teacherName: string;
  publishedAt: string; // e.g. "2026-08-08"
  summary: string;
  content: string;
  images?: string[];
  attachments?: { name: string; url: string; size: string }[];
  exerciseIds?: string[];
}

export type AssignmentStatus = 'completed' | 'in_progress' | 'not_started';

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  publishedAt: string;
  dueDate: string;
  status: AssignmentStatus;
  description: string;
  questions?: {
    id: string;
    text: string;
    type: 'choice' | 'text';
    options?: string[];
    correctOptionIndex?: number;
  }[];
  submissionNote?: string;
  submittedAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'exam' | 'quiz' | 'meeting' | 'activity' | 'holiday';
  date: string;
  time?: string;
  subjectName?: string;
  className?: string;
  description?: string;
  reminderSent?: boolean;
}

export interface ScheduleItem {
  id: string;
  day: 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس';
  timeSlot: string; // e.g. "08:00 - 09:00"
  subjectName: string;
  teacherName: string;
  room?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  studentName?: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId?: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachment?: { name: string; url: string; type: 'image' | 'file' };
}

export interface TeacherConversation {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publisherName: string;
  publisherRole?: string;
  publishedAt: string;
  priority?: 'urgent' | 'important' | 'normal'; // عاجل / هام / عادي
  category?: string;
  isPinned?: boolean;
  attachments?: { name: string; url: string }[];
}

export interface TeacherTip {
  id: string;
  teacherName: string;
  subjectName: string;
  avatar: string;
  content: string;
  publishedAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'lesson' | 'assignment' | 'exam' | 'attendance' | 'message' | 'announcement';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  targetTab?: string;
}

export interface SchoolClass {
  id: string;
  name: string; // e.g. "السنة الثانية - ب"
  gradeLevel: string; // e.g. "السنة الثانية"
  studentCount: number;
  mainTeacherName: string;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
