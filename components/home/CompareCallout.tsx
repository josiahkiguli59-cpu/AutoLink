import React from 'react';
import Link from 'next/link';
import { Layers, Check, ArrowRight, Zap } from 'lucide-react';

export default function CompareCallout() {
  return (
    <section className="py-20 bg-background border-t border-border/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
              <Layers className="h-3.5 w-3.5" />
              <span>Smart Comparison Engine</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Can't Decide Between Two Cars?{' '}
              <span className="gold-gradient-text">Compare Side-by-Side</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              AutoLink lets you stack up to 4 vehicles side-by-side to compare asking prices, engine displacements, fuel efficiency, ground clearance, transmissions, and luxury interior options.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span>Compare UGX and USD pricing with estimated bank loan monthly payments</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span>Evaluate engine capacities (cc), fuel types, and 4WD vs 2WD systems</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <span>Direct WhatsApp contact with both sellers from the same comparison view</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-sm font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-xl shadow-gold-500/20 active:scale-95 transition-all"
              >
                <Layers className="h-4 w-4" />
                <span>Launch Vehicle Comparison Tool</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="rounded-3xl border border-border bg-surface-300 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-gold-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Side-by-Side Matrix Preview
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Up to 4 vehicles</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Car 1 */}
              <div className="rounded-2xl border border-gold-500/30 bg-surface-200 p-3 space-y-2">
                <div className="h-28 rounded-xl bg-surface-100 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80"
                    alt="Toyota Fortuner"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-black text-surface-400 uppercase">
                    Fortuner
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">Toyota Fortuner 2.8 GD-6</div>
                <div className="text-xs font-black text-gold-400">UGX 245,000,000</div>
                <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-border/50">
                  <div>Engine: <strong>2800cc Diesel</strong></div>
                  <div>Drive: <strong>4WD</strong></div>
                  <div>Seats: <strong>7 Leather</strong></div>
                </div>
              </div>

              {/* Car 2 */}
              <div className="rounded-2xl border border-border bg-surface-200 p-3 space-y-2">
                <div className="h-28 rounded-xl bg-surface-100 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=400&q=80"
                    alt="Toyota Prado"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-surface-400/90 px-2 py-0.5 text-[9px] font-bold text-slate-200 uppercase">
                    Prado TX-L
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">Land Cruiser Prado TX-L</div>
                <div className="text-xs font-black text-gold-400">UGX 310,000,000</div>
                <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-border/50">
                  <div>Engine: <strong>2800cc Turbo</strong></div>
                  <div>Drive: <strong>Full-time 4WD</strong></div>
                  <div>Seats: <strong>7 Leather + Sunroof</strong></div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-200/50 p-3 text-center text-xs text-slate-400">
              Pick any cars on AutoLink and tap <strong className="text-white">"Compare"</strong> to view full specifications side by side.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
