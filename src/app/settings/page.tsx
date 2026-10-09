'use client';

import React, { useState } from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconSettings, IconBell, IconSparkles } from '@/components/ui/icons';

export default function SettingsPage() {
  const { user, resetDemoData, showToast } = usePlanner();

  const [targetHours, setTargetHours] = useState('25');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Interface preferences saved! (Demo State)');
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <h1 className="text-xl font-bold text-gray-900">Settings & Preferences</h1>
        <p className="text-xs text-gray-500 mt-1">
          Customize your study dashboard appearance, notifications, and demo environment.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Study Target Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
            <IconSparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">Study Goals</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Weekly Target Study Hours
              </label>
              <input
                type="number"
                value={targetHours}
                onChange={(e) => setTargetHours(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary Major / Program
              </label>
              <input
                type="text"
                disabled
                value={user.major}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
            <IconBell className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">Notification Alerts</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 border border-gray-200 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-gray-900">Upcoming Deadline Reminders</p>
                <p className="text-[11px] text-gray-500">
                  Receive notifications 24 hours before assignment due dates.
                </p>
              </div>
              <input
                type="checkbox"
                checked={taskReminders}
                onChange={(e) => setTaskReminders(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 border border-gray-200 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-gray-900">Daily Study Digest</p>
                <p className="text-[11px] text-gray-500">
                  Morning summary of today&apos;s scheduled revision blocks.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
            </label>
          </div>
        </div>

        {/* Interface Customization */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
            <IconSettings className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">Interface Layout</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 border border-gray-200 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-gray-900">Compact Density</p>
                <p className="text-[11px] text-gray-500">
                  Reduce padding and card spacing for higher information density.
                </p>
              </div>
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
            </label>
          </div>
        </div>

        {/* Demo Environment Management */}
        <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-amber-900">Demo Environment State</h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            This phase uses client-side state for evaluation. No database persistence is configured yet. Resetting demo data will restore default Computer Science sample courses, assignments, and study sessions.
          </p>

          <button
            type="button"
            onClick={resetDemoData}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Reset Demo Data to Initial State
          </button>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
