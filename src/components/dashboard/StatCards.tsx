'use client';

import React from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconBook,
  IconCheckSquare,
  IconClock,
  IconTrendingUp,
} from '@/components/ui/icons';

export function StatCards() {
  const { courses, tasks, weeklyActivity } = usePlanner();

  const totalCoursesCount = courses.length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalStudyHoursThisWeek = weeklyActivity.reduce((acc, curr) => acc + curr.hours, 0);

  const stats = [
    {
      title: 'Total Courses',
      value: totalCoursesCount,
      subtitle: 'Enrolled CS Subjects',
      icon: IconBook,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      badge: `${totalCoursesCount} Active`,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasksCount,
      subtitle: 'Assignments & Exams',
      icon: IconCheckSquare,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      badge: pendingTasksCount > 0 ? `${pendingTasksCount} Urgent` : 'All Done',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Study Hours This Week',
      value: `${totalStudyHoursThisWeek.toFixed(1)}h`,
      subtitle: 'Target: 25.0h / week',
      icon: IconClock,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
      badge: '+12% vs last week',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: 'Tasks Completed',
      value: completedTasksCount,
      subtitle: 'Overall Progress',
      icon: IconTrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      badge: `${Math.round((completedTasksCount / (tasks.length || 1)) * 100)}% Rate`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {stat.title}
              </span>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {stat.subtitle}
                </p>
              </div>

              <span
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
