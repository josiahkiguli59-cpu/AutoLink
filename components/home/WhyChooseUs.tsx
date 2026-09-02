import React from 'react';
import { ShieldCheck, MessageCircle, DollarSign, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '200-Point Mechanical Certification',
      description: 'Zero guesswork. Every vehicle listed on AutoLink can be verified through full mechanical diagnostics, chassis scan, and mileage verification.',
      color: 'text-gold-400',
      bg: 'bg-gold-500/10',
      border: 'border-gold-500/20',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Dealer Contact',
      description: 'Skip the middleman brokers. Chat directly with the actual bond managers or private owners to negotiate and request walkaround videos in seconds.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing & URA Duty Info',
      description: 'No hidden dealership markups. Clear breakdown of asking prices in UGX and USD, with URA taxes and registration status clearly indicated.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Wrench,
      title: 'Trade-In & Financing Assistance',
      description: 'Need to sell your current car first or explore asset financing with partner commercial banks? AutoLink makes vehicle ownership hassle-free.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 bg-surface-400/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            The AutoLink Advantage
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Why Car Buyers in Uganda Trust AutoLink
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            We built AutoLink to eliminate the frustration, scams, and inflated broker fees commonly associated with car shopping in East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-surface-300 p-6 flex flex-col justify-between hover:border-gold-500/40 hover:bg-surface-200/80 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.color} border ${item.border} mb-5`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-1 text-[11px] font-semibold text-gold-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 rounded-3xl border border-gold-500/30 bg-gradient-to-r from-surface-300 via-surface-200 to-surface-300 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Are You a Car Dealer or Bond Owner in Uganda?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              List your inventory on AutoLink and reach thousands of serious car buyers every month.
            </p>
          </div>
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-6 py-3 text-sm font-bold text-surface-400 shadow-xl shadow-gold-500/20 active:scale-95 transition-all shrink-0"
          >
            <span>Register as a Seller</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
