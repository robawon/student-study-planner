'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconTrendingUp,
  IconClock,
  IconCheckSquare,
  IconGraduationCap,
} from '@/components/ui/icons';

export default function ProgressPage() {
  const { weeklyActivity, courses, tasks } = usePlanner();
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const totalHours = showEmptyPreview
    ? 0
    : weeklyActivity.reduce((acc, curr) => acc + curr.hours, 0);

  const avgHours = showEmptyPreview ? 0 : (totalHours / 7).toFixed(1);
  const completedTasks = showEmptyPreview
    ? 0
    : tasks.filter((t) => t.completed).length;

  const completionRate = showEmptyPreview
    ? 0
    : Math.round((completedTasks / (tasks.length || 1)) * 100);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Progress & Statistics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Analytics on your study habits, course distribution, and task completion.
          </p>
        </div>

        <button
          onClick={() => setShowEmptyPreview(!showEmptyPreview)}
          className="text-xs text-gray-400 hover:text-gray-600 underline font-medium self-start sm:self-auto"
        >
          {showEmptyPreview ? 'Show Data' : 'Preview Empty'}
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Total Hours Logged</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <IconClock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{totalHours.toFixed(1)}h</p>
          <p className="text-[11px] text-indigo-600 font-medium">This Week&apos;s Total</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Daily Average</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <IconTrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{avgHours}h / day</p>
          <p className="text-[11px] text-sky-600 font-medium">Target: 3.5h / day</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Task Completion Rate</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <IconCheckSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{completionRate}%</p>
          <p className="text-[11px] text-emerald-600 font-medium">
            {completedTasks} of {tasks.length} Tasks Finished
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Active Courses</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <IconGraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{courses.length}</p>
          <p className="text-[11px] text-purple-600 font-medium">20 Total Credits</p>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Hours Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">
            Estimated Course Hours Distribution
          </h3>

          {showEmptyPreview ? (
            <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-xs text-gray-500">No course activity logged yet.</p>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              {courses.map((course) => (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-800">{course.code} — {course.name}</span>
                    <span className="text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Goal Milestone */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">Weekly Target Progress</h3>

          <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                Weekly Target: 25.0 Hours
              </span>
              <span className="text-xs font-extrabold text-indigo-700">
                {Math.round((totalHours / 25) * 100)}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-indigo-200/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalHours / 25) * 100))}%` }}
              />
            </div>

            <p className="text-xs text-indigo-800">
              You are on track to achieve your weekly study goal! Keep consistent revision routines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
