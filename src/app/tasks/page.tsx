'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconCalendar,
  IconCheckCircle,
} from '@/components/ui/icons';

export default function TasksPage() {
  const { tasks, toggleTaskCompletion, deleteTask, openModal, searchQuery, setSearchQuery } = usePlanner();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const filteredTasks = showEmptyPreview
    ? []
    : tasks.filter((t) => {
        const matchesSearch =
          !searchQuery ||
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus =
          statusFilter === 'all'
            ? true
            : statusFilter === 'pending'
            ? !t.completed
            : t.completed;

        const matchesPriority =
          priorityFilter === 'all' || t.priority === priorityFilter;

        const matchesType = typeFilter === 'all' || t.type === typeFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesType;
      });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Assignments & Exams</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track coursework deadlines, project milestones, and exam dates.
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
            onClick={() => openModal('isAddTaskOpen')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <IconSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search assignments or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100/80 p-1 rounded-xl w-full sm:w-auto">
            {(['all', 'pending', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-500">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-500">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800"
            >
              <option value="all">All Types</option>
              <option value="assignment">Assignment</option>
              <option value="exam">Exam</option>
              <option value="project">Project</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
            <IconCheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Tasks Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            No assignments match your current filters. Create a new task or adjust your criteria.
          </p>
          <button
            onClick={() => openModal('isAddTaskOpen')}
            className="mt-4 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed
                  ? 'border-gray-200/80 bg-gray-50/50 opacity-70'
                  : 'border-gray-200 hover:border-indigo-200 shadow-2xs hover:shadow-xs'
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
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 text-indigo-800 uppercase">
                      {task.courseCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-700 capitalize">
                      {task.type}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                        task.priority === 'high'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : task.priority === 'medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                    <IconCalendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{task.dueDate}</span>
                  </div>
                  {task.dueTime && (
                    <p className="text-[10px] text-gray-400 mt-1">
                      Due at {task.dueTime}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Delete task"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
