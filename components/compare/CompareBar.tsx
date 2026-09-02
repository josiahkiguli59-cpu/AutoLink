'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { useCompare } from '@/lib/context/CompareContext';
import { formatPrice } from '@/lib/utils';

export default function CompareBar() {
  const pathname = usePathname();
  const { compareList, removeFromCompare, clearCompare, isBarVisible, setIsBarVisible } = useCompare();

  // Do not show on the comparison page itself or if no items
  if (pathname === '/compare' || compareList.length === 0 || !isBarVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 animate-in slide-in-from-bottom-6 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gold-500/40 bg-surface-300/95 p-3 sm:p-4 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Compare Vehicles</span>
              <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-extrabold text-surface-400">
                {compareList.length} / 4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Side-by-side specs, price, mileage &amp; engine comparison
            </p>
          </div>
        </div>

        {/* Middle: Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xs sm:max-w-md py-1">
          {compareList.map((car) => (
            <div
              key={car.id}
              className="group relative flex items-center gap-2 rounded-xl bg-surface-200 p-1.5 border border-border shrink-0"
            >
              <div className="relative h-9 w-12 overflow-hidden rounded-lg">
                <Image
                  src={car.images[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:block text-left pr-1">
                <p className="text-xs font-semibold text-white truncate max-w-[90px]">
                  {car.make} {car.model}
                </p>
                <p className="text-[10px] text-gold-400 font-bold">
                  {formatPrice(car.price, car.currency)}
                </p>
              </div>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-100 text-slate-400 hover:text-red-400 hover:bg-surface-50 transition-colors"
                title="Remove"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
            title="Clear all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <Link
            href="/compare"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-2 text-xs font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-md shadow-gold-500/20 active:scale-95 transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setIsBarVisible(false)}
            className="p-1 text-slate-400 hover:text-white"
            title="Minimize"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
