'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconSearch,
  IconBell,
  IconMenu,
  IconSparkles,
  IconCheckCircle,
  IconAlertTriangle,
  IconX,
} from '@/components/ui/icons';

interface TopNavProps {
  onMenuClick?: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Dashboard Overview',
    subtitle: 'Track your course progress, upcoming tasks, and daily study schedule.',
  },
  '/courses': {
    title: 'My Courses',
    subtitle: 'Manage enrolled Computer Science subjects, credits, and syllabus.',
  },
  '/tasks': {
    title: 'Assignments & Exams',
    subtitle: 'Stay on top of coursework, lab reports, and exam deadlines.',
  },
  '/schedule': {
    title: 'Study Schedule',
    subtitle: 'Plan your weekly revision routines and focus blocks.',
  },
  '/progress': {
    title: 'Progress & Statistics',
    subtitle: 'Analyze study hours, completion rates, and academic performance.',
  },
  '/settings': {
    title: 'Settings & Preferences',
    subtitle: 'Customize layout, goals, and local demo environment.',
  },
};

export function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const {
    user,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationsAsRead,
    resetDemoData,
    openModal,
  } = usePlanner();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const pageInfo = pageTitles[pathname] || {
    title: 'Student Study Planner',
    subtitle: 'Computer Science Final Year Project',
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-all">
      {/* Left section: Hamburger (mobile) + Page Titles */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <IconMenu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {pageInfo.title}
          </h2>
          <p className="hidden sm:block text-xs text-gray-500 font-medium truncate max-w-xs md:max-w-md">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right section: Search bar, Notifications, Avatar */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Search Input */}
        <div className="relative hidden sm:block w-48 lg:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <IconSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks or courses..."
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-gray-100/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              <IconX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Button: Quick Session */}
        <button
          onClick={() => openModal('isPlanDayOpen')}
          className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
        >
          <IconSparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Plan Day</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) markNotificationsAsRead();
            }}
            className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <IconBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs text-gray-900">Notifications</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
                    {notifications.length}
                  </span>
                </div>
                <button
                  onClick={markNotificationsAsRead}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 flex items-start space-x-3 transition-colors ${
                      n.unread ? 'bg-indigo-50/40' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'warning' ? (
                        <IconAlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : n.type === 'success' ? (
                        <IconCheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <IconBell className="w-4 h-4 text-indigo-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 leading-snug">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-200 transition-all focus:outline-none"
            aria-label="User menu"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60">
                <p className="text-xs font-bold text-gray-900">{user.name}</p>
                <p className="text-[11px] text-gray-500">{user.role} • {user.university}</p>
                <p className="text-[10px] text-indigo-600 font-semibold mt-1">
                  Demo Environment (No Auth)
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    openModal('isAddCourseOpen');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  + Add New Course
                </button>
                <button
                  onClick={() => {
                    openModal('isAddTaskOpen');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  + Add New Task
                </button>
                <button
                  onClick={() => {
                    resetDemoData();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
