'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconTrendingUp } from '@/components/ui/icons';

export function WeeklyStudyChart() {
  const { weeklyActivity } = usePlanner();
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);

  const displayData = showEmptyPreview
    ? weeklyActivity.map((d) => ({ ...d, hours: 0 }))
    : weeklyActivity;

  const maxHours = Math.max(...displayData.map((d) => d.hours), 6);
  const totalHours = displayData.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <IconTrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Weekly Study Activity</h3>
            <p className="text-xs text-gray-500 font-medium">Logged revision hours (Mon - Sun)</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEmptyPreview(!showEmptyPreview)}
            className="text-[11px] font-medium text-gray-400 hover:text-gray-600 underline"
          >
            {showEmptyPreview ? 'Show Data' : 'Preview Empty'}
          </button>
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              Total: {totalHours.toFixed(1)} hrs
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-6 flex flex-col justify-end">
        {totalHours === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-sm font-bold text-gray-900">No Study Activity Logged</p>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Start a study session to track your daily progress bars here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Target line indicator */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 border-b border-dashed border-gray-200 pb-1">
              <span>Target Goal: 4.0h / day</span>
              <span>Max Scale: {maxHours}h</span>
            </div>

            {/* Bar chart grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-4 px-2">
              {displayData.map((item) => {
                const heightPercentage = Math.round((item.hours / maxHours) * 100);
                const isGoalMet = item.hours >= 4;

                return (
                  <div
                    key={item.day}
                    className="flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-md">
                      {item.hours} hrs ({item.day})
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[36px] bg-gray-100 rounded-t-xl overflow-hidden h-full flex flex-col justify-end p-0.5">
                      <div
                        style={{ height: `${heightPercentage}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          item.isToday
                            ? 'bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-md'
                            : isGoalMet
                            ? 'bg-indigo-400 group-hover:bg-indigo-500'
                            : 'bg-indigo-200 group-hover:bg-indigo-300'
                        }`}
                      />
                    </div>

                    {/* Day label */}
                    <div className="mt-2 text-center">
                      <span
                        className={`text-xs font-bold block ${
                          item.isToday ? 'text-indigo-600' : 'text-gray-600'
                        }`}
                      >
                        {item.shortDay}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {item.hours > 0 ? `${item.hours}h` : '-'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
