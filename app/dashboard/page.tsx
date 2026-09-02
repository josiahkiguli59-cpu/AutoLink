'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Car, 
  Eye, 
  MessageCircle, 
  PlusCircle, 
  CheckCircle, 
  Trash2, 
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { useAuth } from '@/lib/context/AuthContext';
import { formatPrice, timeAgo } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const { cars, updateCar, deleteCar } = useCars();

  // Seller's own cars or all cars for demo
  const sellerCars = cars.filter(
    (c) => c.seller_id === user?.id || user?.role === 'admin' || c.seller_id === 'seller-1'
  );

  const activeCount = sellerCars.filter((c) => c.status === 'available').length;
  const soldCount = sellerCars.filter((c) => c.status === 'sold').length;
  const totalViews = sellerCars.reduce((acc, c) => acc + (c.views || 0), 0);
  const estimatedLeads = Math.round(totalViews * 0.08);

  const handleToggleSold = (carId: string, currentStatus: string) => {
    updateCar(carId, {
      status: currentStatus === 'sold' ? 'available' : 'sold',
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Seller Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back, {user?.full_name}. Monitor your vehicles and WhatsApp leads.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-surface-400 shadow-lg shadow-gold-500/15 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Upload New Car</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Listings</span>
            <Car className="h-4 w-4 text-gold-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {activeCount}
          </div>
          <p className="text-[11px] text-slate-400">Live on AutoLink</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Views</span>
            <Eye className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {totalViews.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Impression traffic</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">WhatsApp Leads</span>
            <MessageCircle className="h-4 w-4 text-whatsapp" />
          </div>
          <div className="text-2xl font-extrabold text-white font-display">
            {estimatedLeads}
          </div>
          <p className="text-[11px] text-slate-400">Direct buyer chats</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-300 p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Cars Sold</span>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">
            {soldCount}
          </div>
          <p className="text-[11px] text-slate-400">Successfully closed</p>
        </div>
      </div>

      {/* Upload Promo Banner */}
      <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-r from-surface-300 via-surface-200 to-surface-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Have a new vehicle in your yard or bond?</h3>
          <p className="text-xs text-slate-400">
            Add specs, upload up to 10 high-resolution photos, and start receiving verified buyer messages.
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="flex items-center gap-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-surface-400 shrink-0"
        >
          <span>List Car Now</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Recent Listings Table */}
      <div className="rounded-3xl border border-border bg-surface-300 overflow-hidden shadow-xl">
        <div className="p-5 sm:p-6 border-b border-border/60 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-white">
            My Vehicle Inventory ({sellerCars.length})
          </h3>
          <Link
            href="/dashboard/listings"
            className="text-xs font-semibold text-gold-400 hover:underline"
          >
            View All Listings
          </Link>
        </div>

        {sellerCars.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            You haven't uploaded any vehicles yet. Click "Upload New Car" to create your first listing.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-200/60 text-slate-400 uppercase tracking-wider font-bold border-b border-border">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sellerCars.slice(0, 5).map((car) => (
                  <tr key={car.id} className="hover:bg-surface-200/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-surface-200 shrink-0">
                          <Image
                            src={car.images[0] || ''}
                            alt={car.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate max-w-[200px]">
                            {car.title}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {car.year} &middot; {car.fuel_type} &middot; {car.transmission}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gold-400 font-display">
                      {formatPrice(car.price, car.currency)}
                    </td>
                    <td className="p-4">
                      <span className="rounded-full bg-surface-200 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300 border border-border">
                        {car.condition}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          car.status === 'available'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">
                      {car.views || 0}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSold(car.id, car.status)}
                          className="rounded-lg bg-surface-200 hover:bg-surface-100 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition-colors"
                        >
                          {car.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                        </button>
                        <Link
                          href={`/cars/${car.id}`}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-white"
                          title="View Live Listing"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${car.title}?`)) {
                              deleteCar(car.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-400"
                          title="Delete Listing"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
