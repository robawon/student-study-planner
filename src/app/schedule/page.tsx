'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconCalendar,
  IconPlus,
  IconClock,
  IconCheckCircle,
} from '@/components/ui/icons';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SchedulePage() {
  const { studySessions, toggleSessionCompletion, openModal } = usePlanner();
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const displaySessions = showEmptyPreview ? [] : studySessions;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Study Schedule</h1>
          <p className="text-xs text-gray-500 mt-1">
            Weekly revision planner and daily time-blocking calendar.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEmptyPreview(!showEmptyPreview)}
            className="text-xs text-gray-400 hover:text-gray-600 underline font-medium"
          >
            {showEmptyPreview ? 'Show Data' : 'Preview Empty'}
          </button>
          <button
            onClick={() => openModal('isAddSessionOpen')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>

      {/* Days of Week Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-xs flex items-center space-x-1 overflow-x-auto">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div>{day.slice(0, 3)}</div>
              <div
                className={`text-[10px] font-medium mt-0.5 ${
                  isSelected ? 'text-indigo-100' : 'text-gray-400'
                }`}
              >
                {day === 'Friday' ? 'Today' : 'Oct 2026'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Schedule Timeline Content */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <IconCalendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">
              Sessions for {selectedDay}
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {displaySessions.length} Study Blocks
          </span>
        </div>

        {displaySessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              <IconClock className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">No Study Sessions Scheduled</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              There are no sessions booked for {selectedDay}. Create a revision block now.
            </p>
            <button
              onClick={() => openModal('isAddSessionOpen')}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Schedule Session</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displaySessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  session.completed
                    ? 'bg-gray-50/70 border-gray-200 opacity-70'
                    : 'bg-white hover:bg-indigo-50/30 border-gray-200 shadow-2xs'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleSessionCompletion(session.id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      session.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-gray-300 hover:border-indigo-500 text-transparent'
                    }`}
                  >
                    <IconCheckCircle className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase">
                        {session.courseCode}
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {session.courseName}
                      </span>
                    </div>

                    <p
                      className={`text-xs ${
                        session.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {session.activity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0">
                  <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                    {session.startTime} - {session.endTime} ({session.durationMinutes} min)
                  </span>

                  <button
                    onClick={() => toggleSessionCompletion(session.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      session.completed
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 border-gray-200'
                    }`}
                  >
                    {session.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
