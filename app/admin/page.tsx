'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { formatPrice } from '@/lib/utils';

export default function AdminOverviewPage() {
  const { cars } = useCars();

  const totalListings = cars.length;
  const activeListings = cars.filter((c) => c.status === 'available').length;
  const featuredListings = cars.filter((c) => c.is_featured).length;
  const verifiedListings = cars.filter((c) => c.is_verified).length;
  const totalValue = cars.reduce((acc, c) => acc + c.price, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
            Platform Master Console
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-2">
          AutoLink Administration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage all dealership listings, user verification statuses, and platform security.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Listings</span>
            <Car className="h-4 w-4 text-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {totalListings}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">
            {activeListings} Active / {totalListings - activeListings} Sold
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Inventory Value</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-white font-display truncate">
            {formatPrice(totalValue)}
          </div>
          <p className="text-[11px] text-slate-400">Total gross inventory</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Featured Deals</span>
            <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-gold-400 font-display">
            {featuredListings}
          </div>
          <p className="text-[11px] text-slate-400">Promoted on homepage</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Inspected Units</span>
            <ShieldCheck className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-blue-400 font-display">
            {verifiedListings}
          </div>
          <p className="text-[11px] text-slate-400">200-pt verified</p>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border bg-surface-300 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Car className="h-4 w-4 text-gold-400" />
              <span>Listings Administration</span>
            </h3>
            <Link
              href="/admin/listings"
              className="text-xs font-semibold text-gold-400 hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Review live vehicles, toggle featured status on the homepage, certify 200-point mechanical inspection badges, or remove unverified listings.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/listings"
              className="inline-flex items-center gap-2 rounded-xl bg-surface-200 hover:bg-surface-100 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <span>Open Listings Console</span>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface-300 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>User &amp; Dealership Directory</span>
            </h3>
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-gold-400 hover:underline flex items-center gap-1"
            >
              <span>Manage users</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Assign user roles (Buyer, Seller, Administrator), verify bonded dealerships in Kampala, and inspect account activity.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 rounded-xl bg-surface-200 hover:bg-surface-100 px-4 py-2 text-xs font-semibold text-white transition-colors"
            >
              <span>Open Users Console</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
