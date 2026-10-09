'use client';

import React, { createContext, useContext, useState } from 'react';
import { Course, Task, StudySession, DailyActivity, UserProfile, SessionStatus } from '@/types';
import {
  DEMO_USER,
  INITIAL_COURSES,
  INITIAL_TASKS,
  INITIAL_STUDY_SESSIONS,
  INITIAL_WEEKLY_ACTIVITY,
} from '@/lib/demo-data';

interface ModalState {
  isAddCourseOpen: boolean;
  isAddTaskOpen: boolean;
  isAddSessionOpen: boolean;
  isPlanDayOpen: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'info' | 'warning' | 'success';
}

interface PlannerContextType {
  user: UserProfile;
  courses: Course[];
  tasks: Task[];
  studySessions: StudySession[];
  weeklyActivity: DailyActivity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  modals: ModalState;
  openModal: (modalName: keyof ModalState) => void;
  closeModal: (modalName: keyof ModalState) => void;
  closeAllModals: () => void;
  // Actions
  toggleTaskCompletion: (taskId: string) => void;
  toggleSessionCompletion: (sessionId: string) => void;
  addCourse: (course: Omit<Course, 'id' | 'progress' | 'totalTasks' | 'completedTasks'>) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  addStudySession: (session: Omit<StudySession, 'id' | 'completed' | 'status'>) => void;
  deleteTask: (taskId: string) => void;
  deleteCourse: (courseId: string) => void;
  resetDemoData: () => void;
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<UserProfile>(DEMO_USER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [studySessions, setStudySessions] = useState<StudySession[]>(INITIAL_STUDY_SESSIONS);
  const [weeklyActivity, setWeeklyActivity] = useState<DailyActivity[]>(INITIAL_WEEKLY_ACTIVITY);
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      title: 'Upcoming High Priority Task',
      message: 'Raft Consensus Algorithm Implementation is due in 3 days.',
      time: '10 mins ago',
      unread: true,
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'Study Goal Reached',
      message: 'You completed 2 study sessions today! Keep it up.',
      time: '1 hour ago',
      unread: true,
      type: 'success',
    },
    {
      id: 'n3',
      title: 'Exam Reminder',
      message: 'CS420 Midterm Exam scheduled for Oct 16th.',
      time: 'Yesterday',
      unread: false,
      type: 'info',
    },
  ]);

  const [modals, setModals] = useState<ModalState>({
    isAddCourseOpen: false,
    isAddTaskOpen: false,
    isAddSessionOpen: false,
    isPlanDayOpen: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openModal = (modalName: keyof ModalState) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof ModalState) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const closeAllModals = () => {
    setModals({
      isAddCourseOpen: false,
      isAddTaskOpen: false,
      isAddSessionOpen: false,
      isPlanDayOpen: false,
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            showToast(`Task "${t.title}" marked as completed!`);
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const toggleSessionCompletion = (sessionId: string) => {
    setStudySessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const nextStatus: SessionStatus = s.completed ? 'scheduled' : 'completed';
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            showToast(`Study Session "${s.activity}" completed!`);
          }
          return {
            ...s,
            completed: nextCompleted,
            status: nextStatus,
          };
        }
        return s;
      })
    );
  };

  const addCourse = (newCourseData: Omit<Course, 'id' | 'progress' | 'totalTasks' | 'completedTasks'>) => {
    const newCourse: Course = {
      ...newCourseData,
      id: `course-${Date.now()}`,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
    closeModal('isAddCourseOpen');
    showToast(`Course ${newCourse.code} added successfully! (Demo State)`);
  };

  const addTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);

    // Update course total tasks count
    setCourses((prev) =>
      prev.map((c) =>
        c.id === newTask.courseId
          ? { ...c, totalTasks: c.totalTasks + 1 }
          : c
      )
    );

    closeModal('isAddTaskOpen');
    showToast(`Task "${newTask.title}" created successfully! (Demo State)`);
  };

  const addStudySession = (newSessionData: Omit<StudySession, 'id' | 'completed' | 'status'>) => {
    const newSession: StudySession = {
      ...newSessionData,
      id: `session-${Date.now()}`,
      completed: false,
      status: 'scheduled',
    };
    setStudySessions((prev) => [...prev, newSession]);
    closeModal('isAddSessionOpen');
    showToast(`Study Session scheduled for ${newSession.startTime}! (Demo State)`);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task removed.');
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('Course removed.');
  };

  const resetDemoData = () => {
    setCourses(INITIAL_COURSES);
    setTasks(INITIAL_TASKS);
    setStudySessions(INITIAL_STUDY_SESSIONS);
    setWeeklyActivity(INITIAL_WEEKLY_ACTIVITY);
    showToast('Demo data reset to default.');
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <PlannerContext.Provider
      value={{
        user,
        courses,
        tasks,
        studySessions,
        weeklyActivity,
        searchQuery,
        setSearchQuery,
        modals,
        openModal,
        closeModal,
        closeAllModals,
        toggleTaskCompletion,
        toggleSessionCompletion,
        addCourse,
        addTask,
        addStudySession,
        deleteTask,
        deleteCourse,
        resetDemoData,
        notifications,
        markNotificationsAsRead,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
}
