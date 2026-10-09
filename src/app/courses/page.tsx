'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconBook,
  IconPlus,
  IconSearch,
  IconTrash,
  IconGraduationCap,
} from '@/components/ui/icons';

export default function CoursesPage() {
  const { courses, deleteCourse, openModal, searchQuery, setSearchQuery } = usePlanner();
  const [filterCredit, setFilterCredit] = useState<string>('all');
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const filteredCourses = showEmptyPreview
    ? []
    : courses.filter((c) => {
        const matchesSearch =
          !searchQuery ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCredit =
          filterCredit === 'all' || c.credits.toString() === filterCredit;

        return matchesSearch && matchesCredit;
      });

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Courses</h1>
          <p className="text-xs text-gray-500 mt-1">
            Enrolled Computer Science modules and syllabus progress tracking.
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
            onClick={() => openModal('isAddCourseOpen')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <IconSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500 shrink-0">
            Filter Credits:
          </span>
          <select
            value={filterCredit}
            onChange={(e) => setFilterCredit(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-800"
          >
            <option value="all">All Credits</option>
            <option value="3">3 Credits</option>
            <option value="4">4 Credits</option>
            <option value="6">6 Credits</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
            <IconBook className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Courses Available</h3>
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            No enrolled courses match your filter criteria or demo state. Click below to add your first course.
          </p>
          <button
            onClick={() => openModal('isAddCourseOpen')}
            className="mt-4 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2"
          >
            <IconPlus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="text-xs font-extrabold text-indigo-900 uppercase bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {course.code}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      {course.credits} Credits
                    </span>
                  </div>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-gray-300 hover:text-rose-600 p-1 rounded-lg transition-colors"
                    title="Remove course"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {course.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                    <IconGraduationCap className="w-3.5 h-3.5 text-gray-400" />
                    <span>{course.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">Syllabus Progress</span>
                  <span className="text-gray-900">{course.progress}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.color,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 font-medium">
                  <span>Completed: {course.completedTasks}</span>
                  <span>Total Tasks: {course.totalTasks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
