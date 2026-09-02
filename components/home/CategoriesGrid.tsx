import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BODY_TYPES } from '@/lib/mock-data';

export default function CategoriesGrid() {
  return (
    <section className="py-16 border-t border-border/60 bg-surface-400/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Browse by Body Style
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Find the Perfect Fit for Your Lifestyle
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            From rugged off-road 4x4s for safari and upcountry roads to executive sedans
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BODY_TYPES.map((cat) => (
            <Link
              key={cat.name}
              href={`/cars?body_type=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-border bg-surface-300 hover:border-gold-500/60 hover:bg-surface-200 transition-all text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">
                {cat.label}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {cat.count}+ vehicles
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
