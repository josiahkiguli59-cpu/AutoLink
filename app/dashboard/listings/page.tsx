'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlusCircle, 
  Car, 
  Eye, 
  Trash2, 
  CheckCircle, 
  ExternalLink, 
  Search,
  Filter
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { useAuth } from '@/lib/context/AuthContext';
import { formatPrice } from '@/lib/utils';

export default function ManageListingsPage() {
  const { user } = useAuth();
  const { cars, updateCar, deleteCar } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');

  const sellerCars = cars.filter(
    (c) => c.seller_id === user?.id || user?.role === 'admin' || c.seller_id === 'seller-1'
  );

  const filtered = sellerCars.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchTerm && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleToggleSold = (carId: string, currentStatus: string) => {
    updateCar(carId, {
      status: currentStatus === 'sold' ? 'available' : 'sold',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">
            Manage Inventory Listings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Total {sellerCars.length} vehicles under your dealership profile
          </p>
        </div>

        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Upload Car</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'available', 'sold'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-gold-500 text-surface-400'
                  : 'bg-surface-200 text-slate-300 hover:bg-surface-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your listings..."
            className="w-full rounded-xl border border-border bg-surface-200 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-border bg-surface-300 overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No listings found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-200/60 text-slate-400 uppercase tracking-wider font-bold border-b border-border">
                <tr>
                  <th className="p-4">Car</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((car) => (
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
                      <span className="rounded-full bg-surface-200 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                        {car.condition}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
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
                          title="View Live"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete ${car.title}?`)) {
                              deleteCar(car.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-400"
                          title="Delete"
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
