'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Layers, 
  MapPin, 
  Fuel, 
  Gauge, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';
import { Car } from '@/types';
import { formatPrice, formatMileage, generateWhatsAppLink } from '@/lib/utils';
import { useFavorites } from '@/lib/context/FavoritesContext';
import { useCompare } from '@/lib/context/CompareContext';

interface CarCardProps {
  car: Car;
  viewMode?: 'grid' | 'list';
}

export default function CarCard({ car, viewMode = 'grid' }: CarCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const favorited = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  const mainImage = car.images[activeImageIndex] || car.images[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
  };

  const sellerPhone = car.seller?.whatsapp || car.seller?.phone || '+256701234567';
  const whatsappUrl = generateWhatsAppLink({
    phoneNumber: sellerPhone,
    carTitle: `${car.year} ${car.make} ${car.model}`,
    price: car.price,
    currency: car.currency,
    carUrl: typeof window !== 'undefined' ? `${window.location.origin}/cars/${car.id}` : undefined,
  });

  if (viewMode === 'list') {
    return (
      <div className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border bg-surface-300 hover:border-gold-500/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
        {/* Left: Image */}
        <div className="relative h-64 md:h-auto md:w-80 shrink-0 overflow-hidden bg-surface-200">
          <Image
            src={mainImage}
            alt={car.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-black text-surface-400 uppercase tracking-wider shadow-sm">
              {car.condition}
            </span>
            {car.is_verified && (
              <span className="flex items-center gap-1 rounded-full bg-surface-400/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={handleCompareClick}
              className={`flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
                inCompare
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface-400/80 text-slate-300 hover:text-white hover:bg-surface-400'
              }`}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <Layers className="h-4 w-4" />
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
                favorited
                  ? 'bg-red-500 text-white'
                  : 'bg-surface-400/80 text-slate-300 hover:text-red-400 hover:bg-surface-400'
              }`}
              title={favorited ? 'Saved to favorites' : 'Save to favorites'}
            >
              <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Photo Count */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] text-white">
            <Camera className="h-3 w-3" />
            <span>{car.images.length} photos</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                  {car.make} &middot; {car.body_type}
                </p>
                <Link href={`/cars/${car.id}`} className="hover:text-gold-400 transition-colors">
                  <h3 className="font-display text-lg font-bold text-white mt-1 line-clamp-1">
                    {car.title}
                  </h3>
                </Link>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-extrabold text-gold-400 font-display">
                  {formatPrice(car.price, car.currency)}
                </div>
                {car.currency === 'UGX' && (
                  <p className="text-[11px] text-slate-400">
                    ≈ ${Math.round(car.price / 3750).toLocaleString()} USD
                  </p>
                )}
              </div>
            </div>

            <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {car.description}
            </p>

            {/* Specs Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Gauge className="h-3.5 w-3.5 text-gold-400" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Fuel className="h-3.5 w-3.5 text-gold-400" />
                <span>{car.fuel_type}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-gold-400 font-bold text-[11px]">GEAR:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-gold-400" />
                <span>{car.location}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-border/60">
            <div className="text-xs text-slate-400 truncate max-w-[200px]">
              Seller: <strong className="text-slate-200">{car.seller?.full_name || 'Verified Dealer'}</strong>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-whatsapp hover:bg-[#20bd5a] px-3.5 py-2 text-xs font-bold text-slate-950 transition-all shadow-md shadow-whatsapp/15 active:scale-95"
              >
                <MessageCircle className="h-4 w-4 fill-slate-950" />
                <span>WhatsApp</span>
              </a>
              <Link
                href={`/cars/${car.id}`}
                className="flex items-center gap-1 rounded-xl bg-surface-100 hover:bg-surface-50 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
              >
                <span>Details</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-300 hover:border-gold-500/50 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">
      {/* Top Image Box */}
      <div className="relative h-56 w-full overflow-hidden bg-surface-200">
        <Image
          src={mainImage}
          alt={car.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Condition & Verified Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-black text-surface-400 uppercase tracking-wider shadow-sm">
            {car.condition}
          </span>
          {car.is_verified && (
            <span className="flex items-center gap-1 rounded-full bg-surface-400/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>

        {/* Compare & Favorite Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            className={`flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
              inCompare
                ? 'bg-blue-600 text-white'
                : 'bg-surface-400/80 text-slate-300 hover:text-white hover:bg-surface-400'
            }`}
            title={inCompare ? 'Remove from comparison' : 'Compare this car'}
          >
            <Layers className="h-4 w-4" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md transition-all ${
              favorited
                ? 'bg-red-500 text-white'
                : 'bg-surface-400/80 text-slate-300 hover:text-red-400 hover:bg-surface-400'
            }`}
            title={favorited ? 'Saved to favorites' : 'Save to favorites'}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location & Photo Count */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
          <span className="flex items-center gap-1 drop-shadow-md">
            <MapPin className="h-3.5 w-3.5 text-gold-400" />
            {car.location}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] text-white">
            <Camera className="h-3 w-3" />
            {car.images.length}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <p className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
            {car.make} &middot; {car.year} &middot; {car.body_type}
          </p>
          <Link href={`/cars/${car.id}`} className="group-hover:text-gold-400 transition-colors">
            <h3 className="font-display text-base font-bold text-white mt-1 line-clamp-1">
              {car.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-gold-400 font-display">
              {formatPrice(car.price, car.currency)}
            </span>
            {car.currency === 'UGX' && (
              <span className="text-[11px] text-slate-400">
                ≈ ${Math.round(car.price / 3750).toLocaleString()}
              </span>
            )}
          </div>

          {/* Specs Chips */}
          <div className="mt-3.5 grid grid-cols-3 gap-1.5 rounded-xl bg-surface-200/80 p-2 text-center text-[11px]">
            <div className="border-r border-border/50">
              <span className="block text-[10px] text-slate-400 font-medium">Mileage</span>
              <span className="font-semibold text-slate-200">{formatMileage(car.mileage)}</span>
            </div>
            <div className="border-r border-border/50">
              <span className="block text-[10px] text-slate-400 font-medium">Fuel</span>
              <span className="font-semibold text-slate-200">{car.fuel_type}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-medium">Gearbox</span>
              <span className="font-semibold text-slate-200">{car.transmission}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/60">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp hover:bg-[#20bd5a] py-2.5 text-xs font-bold text-slate-950 transition-all shadow-md shadow-whatsapp/15 active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-slate-950" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/cars/${car.id}`}
            className="flex items-center justify-center rounded-xl bg-surface-100 hover:bg-surface-50 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
            title="View Details"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
