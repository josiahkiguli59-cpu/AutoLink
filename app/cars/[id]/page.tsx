'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { 
  Heart, 
  Layers, 
  Share2, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  Eye, 
  ArrowLeft,
  CheckCircle2,
  Car as CarIcon
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useCompare } from '@/lib/context/CompareContext';
import { formatPrice, formatMileage, timeAgo } from '@/lib/utils';
import CarGallery from '@/components/cars/CarGallery';
import SellerCard from '@/components/cars/SellerCard';
import FinanceCalculator from '@/components/cars/FinanceCalculator';
import ShareModal from '@/components/cars/ShareModal';
import CarCard from '@/components/cars/CarCard';

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id as string;
  const { getCarById, cars } = useCars();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const car = getCarById(carId);

  if (!car) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
            <CarIcon className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Vehicle Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The vehicle listing you are looking for may have been sold or removed.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-xs font-bold text-surface-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Cars</span>
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  // Similar vehicles based on make or body type
  const similarCars = cars
    .filter((c) => c.id !== car.id && (c.make === car.make || c.body_type === car.body_type))
    .slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
          <Link href="/cars" className="hover:text-gold-400 transition-colors">Cars</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
          <Link href={`/cars?make=${encodeURIComponent(car.make)}`} className="hover:text-gold-400 transition-colors">
            {car.make}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
          <span className="text-slate-200 font-semibold truncate">{car.model}</span>
        </nav>

        {/* Header Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-gold-500 px-3 py-0.5 text-[11px] font-black text-surface-400 uppercase tracking-wider">
                {car.condition}
              </span>
              {car.is_verified && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  200-Point Inspected
                </span>
              )}
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-2">
                <MapPin className="h-3.5 w-3.5 text-gold-400" />
                {car.location}
              </span>
              <span className="text-xs text-slate-500">
                &middot; Listed {timeAgo(car.created_at)}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              {car.title}
            </h1>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="mr-2">
              <div className="text-2xl sm:text-4xl font-black text-gold-400 font-display">
                {formatPrice(car.price, car.currency)}
              </div>
              {car.currency === 'UGX' && (
                <span className="text-xs text-slate-400">
                  ≈ ${Math.round(car.price / 3750).toLocaleString()} USD
                </span>
              )}
            </div>

            <button
              onClick={() => toggleFavorite(car.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                favorited
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-border bg-surface-200 text-slate-300 hover:border-red-500/50 hover:text-red-400'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                inCompare
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : 'border-border bg-surface-200 text-slate-300 hover:border-blue-500/50 hover:text-blue-400'
              }`}
              title="Compare Vehicle"
            >
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-200 hover:bg-surface-100 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              title="Share Vehicle"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Gallery/Specs, Right Sticky Seller */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Gallery, Key Specs, Description, Features, Finance */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <CarGallery images={car.images} title={car.title} />

            {/* Key Specifications Grid */}
            <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-lg font-bold text-white">
                Key Vehicle Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mileage
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <Gauge className="h-4 w-4 text-gold-400" />
                    <span>{formatMileage(car.mileage)}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Model Year
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <Calendar className="h-4 w-4 text-gold-400" />
                    <span>{car.year}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Fuel Type
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <Fuel className="h-4 w-4 text-gold-400" />
                    <span>{car.fuel_type}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Transmission
                  </span>
                  <div className="text-sm font-bold text-white">
                    {car.transmission}
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Engine
                  </span>
                  <div className="text-sm font-bold text-slate-200">
                    {car.engine_capacity || 'N/A'}
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Drivetrain
                  </span>
                  <div className="text-sm font-bold text-gold-400">
                    {car.drivetrain || '2WD'}
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Body Style
                  </span>
                  <div className="text-sm font-bold text-slate-200">
                    {car.body_type}
                  </div>
                </div>

                <div className="rounded-2xl bg-surface-200 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Color
                  </span>
                  <div className="text-sm font-bold text-slate-200 truncate">
                    {car.color || 'Standard'}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                Vehicle Overview &amp; Condition Details
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {car.description}
              </p>
            </div>

            {/* Included Features & Options */}
            {car.features && car.features.length > 0 && (
              <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">
                  Included Features &amp; Equipment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {car.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl bg-surface-200 px-3.5 py-2.5 text-xs text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Finance Calculator */}
            <FinanceCalculator carPrice={car.price} carTitle={car.title} />
          </div>

          {/* Right Col: Sticky Seller Card */}
          <div className="lg:col-span-1">
            <SellerCard car={car} />
          </div>
        </div>

        {/* Similar Vehicles Section */}
        {similarCars.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Recommended For You
                </span>
                <h2 className="font-display text-2xl font-bold text-white mt-0.5">
                  Similar Vehicles in Uganda
                </h2>
              </div>
              <Link
                href={`/cars?make=${encodeURIComponent(car.make)}`}
                className="text-xs font-semibold text-gold-400 hover:underline"
              >
                View more {car.make} cars
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((simCar) => (
                <CarCard key={simCar.id} car={simCar} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={car.title}
        url={currentUrl}
      />
    </div>
  );
}
