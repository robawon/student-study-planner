'use client';

import React from 'react';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { StatCards } from '@/components/dashboard/StatCards';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { WeeklyStudyChart } from '@/components/dashboard/WeeklyStudyChart';
import { CourseOverview } from '@/components/dashboard/CourseOverview';
import { QuickActions } from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8 pb-8">
      {/* 1. Welcome Header */}
      <WelcomeSection />

      {/* 2. Top Statistics Cards */}
      <StatCards />

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Schedule & Deadlines) */}
        <div className="lg:col-span-7 space-y-6">
          <TodaySchedule />
          <UpcomingDeadlines />
        </div>

        {/* Right Column (Weekly Activity & Course Overview) */}
        <div className="lg:col-span-5 space-y-6">
          <WeeklyStudyChart />
          <CourseOverview />
        </div>
      </div>

      {/* 4. Quick Actions */}
      <QuickActions />
    </div>
  );
}
