'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Car, 
  User, 
  LogOut, 
  ShieldAlert, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, loginAsDemo } = useAuth();

  const links = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload New Car', href: '/dashboard/new', icon: PlusCircle },
    { name: 'Manage My Listings', href: '/dashboard/listings', icon: Car },
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  // If user is not logged in or is not seller/admin, provide instant demo activation
  if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-border bg-surface-300 p-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Car className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Seller Dashboard Access</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You are currently browsing as a buyer or guest. Switch to a Seller Account to upload vehicles, manage inventory, and receive direct WhatsApp leads.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => loginAsDemo('seller')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 py-3 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Continue as Demo Seller</span>
            </button>
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-200 py-3 text-xs font-semibold text-slate-300 hover:bg-surface-100 transition-colors"
            >
              <span>Sign In with Existing Account</span>
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
          {/* Sidebar Nav */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-border bg-surface-300 p-5 space-y-6">
              {/* User Card */}
              <div className="flex items-center gap-3 pb-5 border-b border-border/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 font-bold text-base border border-gold-500/30 shrink-0">
                  {user.full_name?.charAt(0) || 'S'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{user.full_name}</h3>
                  <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">
                    {user.role} Account
                  </p>
                </div>
              </div>

              {/* Navigation */}
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
                          ? 'bg-gold-500 text-surface-400 shadow-md shadow-gold-500/15'
                          : 'text-slate-300 hover:bg-surface-200 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Quick Links */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                <Link
                  href="/cars"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Return to Public Site</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
