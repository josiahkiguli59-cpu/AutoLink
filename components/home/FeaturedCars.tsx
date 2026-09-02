'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import CarCard from '@/components/cars/CarCard';

export default function FeaturedCars() {
  const { cars } = useCars();
  const featuredCars = cars.filter((car) => car.is_featured).slice(0, 4);

  return (
    <section className="py-20 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-400 border border-gold-500/20 mb-2">
              <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              <span>Staff Picks &amp; Verified Deals</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Featured Luxury &amp; Everyday Vehicles
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Hand-picked verified cars inspected by certified mechanical engineers in Kampala
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
