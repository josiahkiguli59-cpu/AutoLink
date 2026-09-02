'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Car, 
  Star, 
  ShieldCheck, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { formatPrice } from '@/lib/utils';

export default function AdminListingsPage() {
  const { cars, updateCar, deleteCar } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState<string>('all');

  const filteredCars = cars.filter((c) => {
    if (filterCondition !== 'all' && c.condition !== filterCondition) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.make.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleFeatured = (carId: string, current: boolean) => {
    updateCar(carId, { is_featured: !current });
  };

  const toggleVerified = (carId: string, current: boolean) => {
    updateCar(carId, { is_verified: !current });
  };

  const toggleStatus = (carId: string, currentStatus: string) => {
    updateCar(carId, {
      status: currentStatus === 'available' ? 'sold' : 'available',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">
            All Platform Listings ({cars.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Certify mechanical inspections, promote featured deals, or moderate vehicle listings.
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Vehicle</span>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['all', 'Brand New', 'Foreign Used', 'Local Used'].map((cond) => (
            <button
              key={cond}
              onClick={() => setFilterCondition(cond)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterCondition === cond
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface-200 text-slate-300 hover:bg-surface-100'
              }`}
            >
              {cond === 'all' ? 'All Conditions' : cond}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search make, model, city..."
            className="w-full rounded-xl border border-border bg-surface-200 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Listings Table */}
      <div className="rounded-3xl border border-border bg-surface-300 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-200/60 text-slate-400 uppercase tracking-wider font-bold border-b border-border">
              <tr>
                <th className="p-4">Car Details</th>
                <th className="p-4">Price</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">200-Pt Verified</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCars.map((car) => (
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
                          {car.condition} &middot; {car.year} &middot; {car.mileage.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gold-400 font-display">
                    {formatPrice(car.price, car.currency)}
                  </td>
                  <td className="p-4 text-slate-300">
                    {car.location}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(car.id, car.is_featured)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        car.is_featured
                          ? 'border-gold-500 bg-gold-500/20 text-gold-400'
                          : 'border-border text-slate-500 hover:text-slate-300'
                      }`}
                      title={car.is_featured ? 'Featured on Home' : 'Promote to Featured'}
                    >
                      <Star className={`h-4 w-4 ${car.is_featured ? 'fill-gold-400' : ''}`} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleVerified(car.id, car.is_verified)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        car.is_verified
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                          : 'border-border text-slate-500 hover:text-slate-300'
                      }`}
                      title={car.is_verified ? '200-Point Inspected' : 'Grant Verified Badge'}
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(car.id, car.status)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        car.status === 'available'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20 hover:bg-slate-500/20'
                      }`}
                    >
                      {car.status}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/cars/${car.id}`}
                        target="_blank"
                        className="p-1 text-slate-400 hover:text-white"
                        title="View Public Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Admin action: Delete ${car.title}?`)) {
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
      </div>
    </div>
  );
}
