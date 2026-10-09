'use client';

import React, { useState, useEffect } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { Priority, TaskType } from '@/types';
import { IconX, IconSparkles, IconBook, IconCheckSquare, IconClock } from '@/components/ui/icons';

export function AddCourseModal() {
  const { modals, closeModal, addCourse } = usePlanner();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState('4');
  const [color, setColor] = useState('#4F46E5');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!modals.isAddCourseOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!code.trim()) newErrors.code = 'Course code is required (e.g. CS401)';
    if (!name.trim()) newErrors.name = 'Course name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addCourse({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      instructor: instructor.trim() || 'TBA',
      credits: parseInt(credits) || 3,
      color,
    });

    // Reset form
    setCode('');
    setName('');
    setInstructor('');
    setErrors({});
  };

  return (
    <ModalBackdrop onClose={() => closeModal('isAddCourseOpen')}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => closeModal('isAddCourseOpen')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <IconBook className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Add New Course</h3>
            <p className="text-xs text-gray-500">Register a subject for this semester</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Course Code *
            </label>
            <input
              type="text"
              placeholder="e.g. CS401"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
            {errors.code && <p className="text-[11px] text-red-500 mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Course Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Distributed Systems Architecture"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Instructor
              </label>
              <input
                type="text"
                placeholder="Dr. Smith"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Credits
              </label>
              <select
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              >
                <option value="1">1 Credit</option>
                <option value="2">2 Credits</option>
                <option value="3">3 Credits</option>
                <option value="4">4 Credits</option>
                <option value="6">6 Credits (Capstone)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Course Accent Color
            </label>
            <div className="flex items-center space-x-2">
              {['#4F46E5', '#0284C7', '#7C3AED', '#059669', '#D97706', '#E11D48'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => closeModal('isAddCourseOpen')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

export function AddTaskModal() {
  const { modals, closeModal, addTask, courses } = usePlanner();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [dueDate, setDueDate] = useState('2026-10-15');
  const [dueTime, setDueTime] = useState('23:59');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [type, setType] = useState<'assignment' | 'exam' | 'project' | 'quiz'>('assignment');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (courses.length > 0 && !courseId) {
      setCourseId(courses[0].id);
    }
  }, [courses, courseId]);

  if (!modals.isAddTaskOpen) return null;

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Task title is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTask({
      title: title.trim(),
      courseId: selectedCourse ? selectedCourse.id : 'course-1',
      courseCode: selectedCourse ? selectedCourse.code : 'CS401',
      dueDate,
      dueTime,
      priority,
      type,
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <ModalBackdrop onClose={() => closeModal('isAddTaskOpen')}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => closeModal('isAddTaskOpen')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <IconCheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Add Assignment / Exam</h3>
            <p className="text-xs text-gray-500">Track deadlines and homework items</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Title / Item Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Raft Consensus Implementation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
            {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name.slice(0, 18)}...
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Task Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              >
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-2.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Due Time
              </label>
              <input
                type="text"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                placeholder="23:59"
                className="w-full px-2.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-2.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description / Notes
            </label>
            <textarea
              rows={2}
              placeholder="Instructions, guidelines, or link references..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => closeModal('isAddTaskOpen')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

export function AddSessionModal() {
  const { modals, closeModal, addStudySession, courses } = usePlanner();

  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [activity, setActivity] = useState('');
  const [startTime, setStartTime] = useState('04:00 PM');
  const [endTime, setEndTime] = useState('05:30 PM');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!modals.isAddSessionOpen) return null;

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) {
      setErrors({ activity: 'Please describe the planned study activity.' });
      return;
    }

    addStudySession({
      courseId: selectedCourse ? selectedCourse.id : 'course-1',
      courseCode: selectedCourse ? selectedCourse.code : 'CS401',
      courseName: selectedCourse ? selectedCourse.name : 'Distributed Systems',
      startTime,
      endTime,
      durationMinutes,
      activity: activity.trim(),
      date: 'Today',
    });

    setActivity('');
    setErrors({});
  };

  return (
    <ModalBackdrop onClose={() => closeModal('isAddSessionOpen')}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => closeModal('isAddSessionOpen')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <IconClock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Schedule Study Session</h3>
            <p className="text-xs text-gray-500">Block focused time for revision</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Study Activity Description *
            </label>
            <input
              type="text"
              placeholder="e.g. Review neural network backpropagation equations"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
            {errors.activity && <p className="text-[11px] text-red-500 mt-1">{errors.activity}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="text"
                placeholder="02:00 PM"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="text"
                placeholder="03:30 PM"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Duration (Minutes)
            </label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => closeModal('isAddSessionOpen')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

export function PlanDayModal() {
  const { modals, closeModal, showToast } = usePlanner();
  const [selectedFocus, setSelectedFocus] = useState('CS401 Raft Consensus');
  const [targetHours, setTargetHours] = useState('4');

  if (!modals.isPlanDayOpen) return null;

  const handleConfirmPlan = () => {
    closeModal('isPlanDayOpen');
    showToast(`Study plan generated! Goal set to ${targetHours} hours focused on ${selectedFocus}.`);
  };

  return (
    <ModalBackdrop onClose={() => closeModal('isPlanDayOpen')}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => closeModal('isPlanDayOpen')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
            <IconSparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Plan My Study Day</h3>
            <p className="text-xs text-gray-500">Intelligent daily study goal assistant</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-900">Suggested Focus Area Today</p>
            <p className="text-xs text-indigo-700 mt-1">
              Based on deadlines, <strong className="font-semibold">CS401 Raft Consensus</strong> is due in 3 days. We recommend 2.5 hours of code revision.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Main Priority Today
            </label>
            <input
              type="text"
              value={selectedFocus}
              onChange={(e) => setSelectedFocus(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Target Study Hours Today
            </label>
            <select
              value={targetHours}
              onChange={(e) => setTargetHours(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-900 font-medium"
            >
              <option value="2">2 Hours (Light Revision)</option>
              <option value="3">3 Hours (Standard)</option>
              <option value="4">4 Hours (Deep Work)</option>
              <option value="6">6 Hours (Exam Cram)</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
            <button
              onClick={() => closeModal('isPlanDayOpen')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPlan}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <IconSparkles className="w-3.5 h-3.5" />
              <span>Activate Daily Goal</span>
            </button>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function ModalBackdrop({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
