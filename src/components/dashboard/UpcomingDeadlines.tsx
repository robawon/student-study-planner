'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconCheckSquare,
  IconPlus,
  IconCalendar,
  IconCheckCircle,
} from '@/components/ui/icons';

export function UpcomingDeadlines() {
  const { tasks, toggleTaskCompletion, openModal, searchQuery } = usePlanner();
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const filteredTasks = showEmptyPreview
    ? []
    : tasks.filter((t) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.courseCode.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
        );
      });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
            Medium Priority
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded-md">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <IconCheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Upcoming Deadlines</h3>
            <p className="text-xs text-gray-500 font-medium">Assignments, projects, and exams</p>
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
            onClick={() => openModal('isAddTaskOpen')}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="flex-1 pt-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
              <IconCheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-900">No Upcoming Deadlines</p>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              You are all caught up! Enjoy your free time or prepare ahead.
            </p>
            <button
              onClick={() => openModal('isAddTaskOpen')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Add New Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                task.completed
                  ? 'bg-gray-50/60 border-gray-200 opacity-60'
                  : 'bg-white hover:bg-gray-50/80 border-gray-200/90 shadow-2xs'
              }`}
            >
              <div className="flex items-start space-x-3 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                />

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase">
                      {task.courseCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-700 capitalize">
                      {task.type}
                    </span>
                    {getPriorityBadge(task.priority)}
                  </div>

                  <p
                    className={`text-xs font-bold ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </p>

                  {task.description && (
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center space-x-1 text-xs font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                  <IconCalendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{task.dueDate}</span>
                </div>
                {task.dueTime && (
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">
                    Due at {task.dueTime}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
