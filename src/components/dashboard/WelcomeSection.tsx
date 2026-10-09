'use client';

import React from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconSparkles, IconCalendar, IconGraduationCap } from '@/components/ui/icons';

export function WelcomeSection() {
  const { user, openModal } = usePlanner();

  // Format today's date dynamically
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-700/30">
      {/* Subtle background glow effect */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -top-10 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 backdrop-blur-xs flex items-center space-x-1">
              <IconGraduationCap className="w-3.5 h-3.5" />
              <span>{user.major} • {user.academicYear}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Demo Mode
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 font-normal leading-relaxed">
            &ldquo;Focus on progress, not perfection. Master one concept at a time.&rdquo;
          </p>

          <div className="flex items-center space-x-2 text-xs text-indigo-200 pt-1">
            <IconCalendar className="w-4 h-4 text-indigo-300" />
            <span>{todayFormatted}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => openModal('isPlanDayOpen')}
            className="px-5 py-3 rounded-2xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <IconSparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Plan My Study Day</span>
          </button>
        </div>
      </div>
    </div>
  );
}
