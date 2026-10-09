export type Priority = 'high' | 'medium' | 'low';
export type TaskType = 'assignment' | 'exam' | 'project' | 'quiz';
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed';

export interface Course {
  id: string;
  code: string;
  name: string;
  color: string;
  instructor: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  credits: number;
}

export interface Task {
  id: string;
  title: string;
  courseId: string;
  courseCode: string;
  dueDate: string; // YYYY-MM-DD or formatted string
  dueTime?: string;
  priority: Priority;
  type: TaskType;
  completed: boolean;
  description?: string;
}

export interface StudySession {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:30 AM"
  durationMinutes: number;
  activity: string;
  date: string; // YYYY-MM-DD or "Today"
  completed: boolean;
  status: SessionStatus;
}

export interface DailyActivity {
  day: string;
  shortDay: string;
  hours: number;
  date: string;
  isToday?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  major: string;
  academicYear: string;
  university: string;
  weeklyTargetHours: number;
}
