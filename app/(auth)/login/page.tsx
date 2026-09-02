'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Car, Lock, Mail, ArrowRight, AlertCircle, CheckCircle, Sparkles, User, Shield } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginAsDemo, isEmailVerified } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isResetSuccess = searchParams.get('mode') === 'reset';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Invalid credentials. Please check your details.');
    }
  };

  const handleDemo = (role: 'buyer' | 'seller' | 'admin') => {
    loginAsDemo(role);
    if (role === 'admin') router.push('/admin');
    else if (role === 'seller') router.push('/dashboard');
    else router.push('/cars');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-surface-400 font-bold shadow-lg shadow-gold-500/20">
              <Car className="h-7 w-7 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your vehicle inventory or saved cars
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-border bg-surface-300/90 p-8 shadow-2xl backdrop-blur-xl">
          {/* Notifications */}
          {isResetSuccess && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Password reset link sent or completed! You can now log in.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-border bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-border bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 py-3 text-sm font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/20 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-surface-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="mt-8 pt-6 border-t border-border/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span>Instant One-Click Demo Access</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('buyer')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-surface-200 border border-border hover:border-gold-500/50 hover:bg-surface-100 transition-all text-left"
              >
                <User className="h-4 w-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-white">Buyer</span>
                <span className="text-[9px] text-slate-400">Browse &amp; Save</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('seller')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-surface-200 border border-border hover:border-gold-500/50 hover:bg-surface-100 transition-all text-left"
              >
                <Car className="h-4 w-4 text-gold-400" />
                <span className="text-[11px] font-bold text-white">Seller</span>
                <span className="text-[9px] text-slate-400">Post Cars</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('admin')}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-surface-200 border border-border hover:border-gold-500/50 hover:bg-surface-100 transition-all text-left"
              >
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-[11px] font-bold text-white">Admin</span>
                <span className="text-[9px] text-slate-400">Full Control</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-gold-400 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
