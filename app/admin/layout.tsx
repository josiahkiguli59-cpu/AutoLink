'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutDashboard, Car, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, loginAsDemo } = useAuth();

  const links = [
    { name: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'All Platform Listings', href: '/admin/listings', icon: Car },
    { name: 'Manage Users & Roles', href: '/admin/users', icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        Loading admin panel...
      </div>
    );
  }

  // Admin access check
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-border bg-surface-300 p-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Shield className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Administrator Access Required</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              This area is restricted to AutoLink platform administrators. You can immediately switch into demo admin mode to test platform administration.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => loginAsDemo('admin')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 py-3 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Enter as Demo Administrator</span>
            </button>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-200 py-3 text-xs font-semibold text-slate-300 hover:bg-surface-100 transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-blue-500/30 bg-surface-300 p-5 space-y-6">
              <div className="flex items-center gap-3 pb-5 border-b border-border/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{user.full_name}</h3>
                  <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                    Super Admin
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-300 hover:bg-surface-200 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-border/60 space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs text-gold-400 hover:underline font-semibold"
                >
                  <span>Go to Seller Dashboard</span>
                </Link>
                <Link
                  href="/cars"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Public Site</span>
                </Link>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
