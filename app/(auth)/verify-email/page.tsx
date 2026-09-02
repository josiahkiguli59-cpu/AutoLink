'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, MailCheck, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function VerifyEmailPage() {
  const { user, resendVerificationEmail, isEmailVerified } = useAuth();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setResending(true);
    setMessage(null);
    const res = await resendVerificationEmail();
    setResending(false);
    if (res.success) {
      setMessage('Verification link has been resent to your email address.');
    } else {
      setMessage(res.error || 'Failed to resend. Please try again later.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-surface-400 font-bold shadow-lg shadow-gold-500/20">
              <Car className="h-7 w-7 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Confirm your email address to activate all seller and buyer features
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface-300/90 p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
            <MailCheck className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              {isEmailVerified ? 'Email Verified!' : 'Check your inbox'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEmailVerified ? (
                'Your email has been confirmed. Your account is fully verified and ready to use.'
              ) : (
                <>
                  We sent a confirmation link to{' '}
                  <strong className="text-white">{user?.email || 'your email'}</strong>. Click the link in that email to verify your AutoLink account.
                </>
              )}
            </p>
          </div>

          {message && (
            <div className="flex items-center gap-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 p-3 text-xs text-gold-300 text-left">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            {!isEmailVerified && (
              <button
                onClick={handleResend}
                disabled={resending}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-200 py-2.5 text-xs font-semibold text-slate-200 hover:bg-surface-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${resending ? 'animate-spin' : ''}`} />
                <span>{resending ? 'Sending...' : 'Resend Verification Email'}</span>
              </button>
            )}

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 py-3 text-xs font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-md shadow-gold-500/20 transition-all"
            >
              <span>Continue to AutoLink</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
