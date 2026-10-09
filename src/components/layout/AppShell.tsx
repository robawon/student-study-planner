'use client';

import React, { useState } from 'react';
import { PlannerProvider } from '@/lib/context/PlannerContext';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { AddCourseModal, AddTaskModal, AddSessionModal, PlanDayModal } from '@/components/ui/Modals';
import { Toast } from '@/components/ui/Toast';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <PlannerProvider>
      <div className="flex h-screen bg-gray-50/60 text-gray-900 font-sans antialiased overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <TopNav onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
              {children}
            </div>
          </main>
        </div>

        {/* Global Modals & Toast */}
        <AddCourseModal />
        <AddTaskModal />
        <AddSessionModal />
        <PlanDayModal />
        <Toast />
      </div>
    </PlannerProvider>
  );
}
