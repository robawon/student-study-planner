'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconClock, IconPlus, IconCheckCircle } from '@/components/ui/icons';

export function TodaySchedule() {
  const { studySessions, toggleSessionCompletion, openModal, searchQuery } = usePlanner();
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  // Filter by search query if applicable
  const filteredSessions = showEmptyPreview
    ? []
    : studySessions.filter((s) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          s.activity.toLowerCase().includes(q) ||
          s.courseCode.toLowerCase().includes(q) ||
          s.courseName.toLowerCase().includes(q)
        );
      });

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <IconClock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Today&apos;s Study Schedule</h3>
            <p className="text-xs text-gray-500 font-medium">Timeline of scheduled revision blocks</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEmptyPreview(!showEmptyPreview)}
            className="text-[11px] font-medium text-gray-400 hover:text-gray-600 underline"
          >
            {showEmptyPreview ? 'Show Data' : 'Preview Empty'}
          </button>
          <button
            onClick={() => openModal('isAddSessionOpen')}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Add Session</span>
          </button>
        </div>
      </div>

      <div className="flex-1 pt-5">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              <IconClock className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-900">No Study Sessions Scheduled</p>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              You haven&apos;t scheduled any study blocks for today yet.
            </p>
            <button
              onClick={() => openModal('isAddSessionOpen')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Schedule Session</span>
            </button>
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {filteredSessions.map((session) => {
              const isCompleted = session.completed;
              return (
                <div key={session.id} className="relative group">
                  {/* Timeline node */}
                  <button
                    onClick={() => toggleSessionCompletion(session.id)}
                    className={`absolute -left-[1.625rem] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-indigo-400 hover:border-indigo-600 text-transparent'
                    }`}
                  >
                    <IconCheckCircle className="w-3.5 h-3.5" />
                  </button>

                  <div className="bg-gray-50/80 hover:bg-indigo-50/40 p-3.5 rounded-xl border border-gray-200/80 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                          {session.courseCode}
                        </span>
                        <span className="text-xs font-semibold text-gray-900">
                          {session.courseName}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          ({session.durationMinutes} mins)
                        </span>
                      </div>

                      <p
                        className={`text-xs ${
                          isCompleted
                            ? 'line-through text-gray-400'
                            : 'text-gray-700 font-medium'
                        }`}
                      >
                        {session.activity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0">
                      <span className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs">
                        {session.startTime} - {session.endTime}
                      </span>
                      <button
                        onClick={() => toggleSessionCompletion(session.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 border-gray-200'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
