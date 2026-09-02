import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { POPULAR_BRANDS } from '@/lib/mock-data';

export default function PopularBrands() {
  return (
    <section className="py-16 border-t border-border/60 bg-surface-400/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Trusted Manufacturers
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Popular Car Brands in Uganda
            </h2>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>View All Makes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {POPULAR_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/cars?make=${encodeURIComponent(brand.name)}`}
              className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-border bg-surface-300 hover:border-gold-500/50 hover:bg-surface-200 transition-all text-center hover:scale-[1.03]"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {brand.logo}
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-gold-400 transition-colors">
                {brand.name}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {brand.count}+ cars
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
