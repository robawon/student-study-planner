'use client';

import React from 'react';
import { usePlanner } from '@/lib/context/PlannerContext';
import { IconCheckCircle } from '@/components/ui/icons';

export function Toast() {
  const { toastMessage } = usePlanner();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-3 bg-gray-900 text-white text-xs font-semibold rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <IconCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
}
