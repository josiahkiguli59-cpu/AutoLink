'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car, Lock, Mail, User, Phone, ArrowRight, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { UserRole } from '@/types';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [role, setRole] = useState<UserRole>('seller');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signup({
      fullName,
      email,
      password,
      role,
      phone,
      whatsapp: phone,
    });

    setLoading(false);

    if (res.success) {
      if (role === 'seller') {
        router.push('/dashboard');
      } else {
        router.push('/cars');
      }
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-surface-400 font-bold shadow-lg shadow-gold-500/20">
              <Car className="h-7 w-7 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Join thousands of automotive buyers and verified sellers
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface-300/90 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Account Role Selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                  role === 'buyer'
                    ? 'border-gold-500 bg-gold-500/10 text-white'
                    : 'border-border bg-surface-200 text-slate-400 hover:border-slate-600'
                }`}
              >
                <User className={`h-5 w-5 ${role === 'buyer' ? 'text-gold-400' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">Buy Vehicles</span>
                <span className="text-[10px] text-slate-400">Browse &amp; Compare</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                  role === 'seller'
                    ? 'border-gold-500 bg-gold-500/10 text-white'
                    : 'border-border bg-surface-200 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Car className={`h-5 w-5 ${role === 'seller' ? 'text-gold-400' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">Sell Vehicles</span>
                <span className="text-[10px] text-slate-400">Post Ads &amp; Manage</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name or Dealership Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Mukasa or Kampala Auto"
                  required
                  className="w-full rounded-xl border border-border bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phone &amp; WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 701 234 567"
                  required
                  className="w-full rounded-xl border border-border bg-surface-200 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
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
                  <span>Create {role === 'seller' ? 'Seller' : 'Buyer'} Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-gold-400 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
