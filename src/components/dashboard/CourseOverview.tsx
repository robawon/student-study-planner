'use client';

import React from 'react';
import Link from 'next/link';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconBook, IconChevronRight, IconPlus } from '@/components/ui/icons';

export function CourseOverview() {
  const { courses, openModal, searchQuery } = usePlanner();

  const filteredCourses = courses.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <IconBook className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Enrolled Courses</h3>
            <p className="text-xs text-gray-500 font-medium">Syllabus completion & tasks</p>
          </div>
        </div>

        <Link
          href="/courses"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
        >
          <span>View All ({courses.length})</span>
          <IconChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex-1 pt-4 space-y-3">
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-sm font-bold text-gray-900">No Courses Found</p>
            <p className="text-xs text-gray-500 mt-1">Try matching your search or add a new course.</p>
            <button
              onClick={() => openModal('isAddCourseOpen')}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-xl"
            >
              Add Course
            </button>
          </div>
        ) : (
          filteredCourses.slice(0, 4).map((course) => (
            <div
              key={course.id}
              className="p-3.5 rounded-xl border border-gray-200/90 hover:border-indigo-200 bg-gray-50/50 hover:bg-white transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: course.color }}
                  />
                  <span className="text-xs font-bold text-gray-900">
                    {course.code}
                  </span>
                  <span className="text-xs font-medium text-gray-600 truncate max-w-[160px] sm:max-w-xs">
                    {course.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-900">
                  {course.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-200/80 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progress}%`,
                    backgroundColor: course.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>Instructor: {course.instructor}</span>
                <span>
                  {course.completedTasks} / {course.totalTasks} Tasks Done
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-gray-100 mt-2">
        <button
          onClick={() => openModal('isAddCourseOpen')}
          className="w-full py-2 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-xs font-semibold border border-gray-200 hover:border-indigo-200 transition-colors flex items-center justify-center space-x-1.5"
        >
          <IconPlus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>
    </div>
  );
}
