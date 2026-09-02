'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import CarCard from '@/components/cars/CarCard';

export default function LatestCars() {
  const { cars } = useCars();
  // Get 4 latest cars
  const latestCars = [...cars].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);

  return (
    <section className="py-20 bg-background border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-surface-200 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-border mb-2">
              <Clock className="h-3.5 w-3.5 text-gold-400" />
              <span>Recently Added</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Latest Inventory Arrivals
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Freshly listed vehicles from verified bonds and individual owners across Uganda
            </p>
          </div>
          <Link
            href="/cars?sort_by=newest"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestCars.map((car) => (
            <CarCard key={car.id} car={car} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
