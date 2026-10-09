'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlanner } from '@/lib/context/PlannerContext';
import {
  IconDashboard,
  IconBook,
  IconCheckSquare,
  IconCalendar,
  IconTrendingUp,
  IconSettings,
  IconGraduationCap,
  IconX,
} from '@/components/ui/icons';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: IconDashboard },
  { name: 'My Courses', href: '/courses', icon: IconBook },
  { name: 'Assignments & Exams', href: '/tasks', icon: IconCheckSquare },
  { name: 'Study Schedule', href: '/schedule', icon: IconCalendar },
  { name: 'Progress & Statistics', href: '/progress', icon: IconTrendingUp },
  { name: 'Settings', href: '/settings', icon: IconSettings },
];

export function Sidebar({ mobileOpen = false, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user } = usePlanner();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200/80 w-64 select-none">
      {/* App Header / Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:bg-indigo-700 transition-colors">
            <IconGraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
              StudyPlanner
            </h1>
            <p className="text-[11px] font-medium text-indigo-600 tracking-wide uppercase">
              CS Final Year
            </p>
          </div>
        </Link>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <IconX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
              <span>{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile Card at Bottom */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
            </div>
            <p className="text-xs text-gray-500 truncate">{user.role}</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full shrink-0">
            Demo Mode
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:hidden`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
