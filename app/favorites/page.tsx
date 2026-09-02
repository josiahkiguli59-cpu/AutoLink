'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, Trash2, Car as CarIcon } from 'lucide-react';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useCars } from '@/lib/context/CarsContext';
import CarCard from '@/components/cars/CarCard';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { cars } = useCars();

  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-400">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <h1 className="font-display text-3xl font-extrabold text-white">
                Saved Favorites
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              You have {favoriteCars.length} vehicles saved in your wishlist
            </p>
          </div>

          {favoriteCars.length > 0 && (
            <button
              onClick={clearFavorites}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-200 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-red-400 hover:border-red-500/30 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mt-8">
          {favoriteCars.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface-300 p-12 text-center space-y-4 max-w-xl mx-auto">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No saved vehicles yet</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Browse our verified inventory and tap the heart icon on any car to save it to your personal shortlist.
              </p>
              <div className="pt-2">
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-xs font-bold text-surface-400 hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
                >
                  <CarIcon className="h-4 w-4" />
                  <span>Browse Available Inventory</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteCars.map((car) => (
                <CarCard key={car.id} car={car} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
