'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Car, 
  Heart, 
  Layers, 
  User, 
  PlusCircle, 
  Menu, 
  X, 
  LogOut, 
  Shield, 
  LayoutDashboard, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  Search
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useCompare } from '@/lib/context/CompareContext';

export default function Header() {
  const pathname = usePathname();
  const { user, logout, loginAsDemo } = useAuth();
  const { favorites } = useFavorites();
  const { compareList } = useCompare();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoSwitcherOpen, setDemoSwitcherOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Inventory', href: '/cars' },
    { name: 'Compare', href: '/compare', badge: compareList.length },
    { name: 'Saved Cars', href: '/favorites', badge: favorites.length },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-surface-400/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-surface-400 font-bold shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
            <Car className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Auto<span className="text-gold-400">Link</span>
              </span>
              <span className="rounded-full bg-gold-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-gold-400 border border-gold-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
              Uganda &middot; Verified Cars
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-gold-400 bg-surface-200/80'
                    : 'text-slate-300 hover:text-white hover:bg-surface-200/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.name}
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-surface-400">
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Post Car CTA */}
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2.5 text-sm font-bold text-surface-400 shadow-md shadow-gold-500/15 hover:from-gold-400 hover:to-gold-300 transition-all active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Sell Car</span>
          </Link>

          {/* User Auth or Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-200/80 px-3 py-2 text-sm text-slate-200 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 font-semibold text-xs border border-gold-500/30">
                  {user.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold text-slate-100 max-w-[100px] truncate">
                    {user.full_name}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-surface-300 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-border/60">
                    <p className="text-sm font-semibold text-white">{user.full_name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-gold-500/10 px-2 py-0.5 text-[11px] font-medium text-gold-400 border border-gold-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      Role: <span className="uppercase font-bold">{user.role}</span>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5 text-sm">
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-gold-500/15 hover:text-gold-300 transition-colors"
                      >
                        <Shield className="h-4 w-4 text-gold-400" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    {(user.role === 'seller' || user.role === 'admin') && (
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-surface-100 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-gold-400" />
                        <span>Seller Dashboard</span>
                      </Link>
                    )}

                    <Link
                      href="/favorites"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-surface-100 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>Saved Favorites ({favorites.length})</span>
                    </Link>

                    <Link
                      href="/compare"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-surface-100 transition-colors"
                    >
                      <Layers className="h-4 w-4 text-blue-400" />
                      <span>Compare Vehicles ({compareList.length})</span>
                    </Link>

                    {/* Fast Demo Role Switcher */}
                    <div className="pt-2 mt-2 border-t border-border/60">
                      <p className="px-3 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                        Switch Demo Role
                      </p>
                      <div className="grid grid-cols-3 gap-1 px-2 pt-1.5 pb-1">
                        <button
                          onClick={() => { loginAsDemo('buyer'); setProfileDropdownOpen(false); }}
                          className={`px-2 py-1 text-xs rounded-lg font-medium ${user.role === 'buyer' ? 'bg-gold-500 text-surface-400 font-bold' : 'bg-surface-200 text-slate-300 hover:bg-surface-100'}`}
                        >
                          Buyer
                        </button>
                        <button
                          onClick={() => { loginAsDemo('seller'); setProfileDropdownOpen(false); }}
                          className={`px-2 py-1 text-xs rounded-lg font-medium ${user.role === 'seller' ? 'bg-gold-500 text-surface-400 font-bold' : 'bg-surface-200 text-slate-300 hover:bg-surface-100'}`}
                        >
                          Seller
                        </button>
                        <button
                          onClick={() => { loginAsDemo('admin'); setProfileDropdownOpen(false); }}
                          className={`px-2 py-1 text-xs rounded-lg font-medium ${user.role === 'admin' ? 'bg-gold-500 text-surface-400 font-bold' : 'bg-surface-200 text-slate-300 hover:bg-surface-100'}`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => { logout(); setProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-surface-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl border border-gold-500/40 text-sm font-medium text-gold-400 hover:bg-gold-500/10 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/dashboard/new"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-surface-400"
          >
            <PlusCircle className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-200 text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface-400 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-surface-200"
              >
                <span>{link.name}</span>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-surface-400">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-border pt-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-10 w-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                    {user.full_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.full_name}</p>
                    <p className="text-xs text-gold-400 uppercase font-bold">{user.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(user.role === 'seller' || user.role === 'admin') && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl bg-surface-200 text-center text-xs font-semibold text-white"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl bg-gold-500/20 text-gold-400 text-center text-xs font-semibold"
                    >
                      Admin Panel
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-border py-2.5 text-center text-sm font-semibold text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-gold-500 py-2.5 text-center text-sm font-bold text-surface-400"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
