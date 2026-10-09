'use client';

import React from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconBook, IconCheckSquare, IconClock } from '@/components/ui/icons';

export function QuickActions() {
  const { openModal } = usePlanner();

  const actions = [
    {
      title: 'Add Course',
      subtitle: 'Register new subject',
      icon: IconBook,
      modalName: 'isAddCourseOpen' as const,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100',
    },
    {
      title: 'Add Assignment',
      subtitle: 'Track new task / exam',
      icon: IconCheckSquare,
      modalName: 'isAddTaskOpen' as const,
      color: 'bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-100',
    },
    {
      title: 'Schedule Study Session',
      subtitle: 'Book revision block',
      icon: IconClock,
      modalName: 'isAddSessionOpen' as const,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-gray-900">Quick Actions</h3>
        <p className="text-xs text-gray-500 font-medium">Create items with interactive forms</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.title}
              onClick={() => openModal(act.modalName)}
              className={`p-4 rounded-xl border transition-all text-left flex items-start space-x-3 group ${act.color}`}
            >
              <div className="p-2 rounded-lg bg-white shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-indigo-900">
                  {act.title}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {act.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
