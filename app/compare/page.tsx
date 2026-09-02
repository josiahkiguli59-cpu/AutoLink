'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Layers, 
  Trash2, 
  Plus, 
  X, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCompare } from '@/lib/context/CompareContext';
import { useCars } from '@/lib/context/CarsContext';
import { formatPrice, formatMileage, generateWhatsAppLink } from '@/lib/utils';
import { Car } from '@/types';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { cars } = useCars();
  const [selectorOpen, setSelectorOpen] = useState(false);

  // Available cars not already in compare
  const availableToAdd = cars.filter((c) => !compareList.some((item) => item.id === c.id));

  // Common distinct features list across compared cars
  const allFeatures = Array.from(
    new Set(compareList.flatMap((car) => car.features || []))
  ).slice(0, 10);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                <Layers className="h-4 w-4" />
              </div>
              <h1 className="font-display text-3xl font-extrabold text-white">
                Side-by-Side Vehicle Comparison
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comparing {compareList.length} of 4 maximum vehicles
            </p>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length < 4 && (
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15 transition-all"
              >
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Add Vehicle to Compare</span>
              </button>
            )}

            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-200 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-red-400 hover:border-red-500/30 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal: Quick Add Vehicle Picker */}
        {selectorOpen && (
          <div className="my-6 rounded-3xl border border-gold-500/40 bg-surface-300 p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Select a vehicle to compare</h3>
              <button
                onClick={() => setSelectorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {availableToAdd.length === 0 ? (
              <p className="text-xs text-slate-400">All available vehicles are already in comparison.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
                {availableToAdd.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => {
                      addToCompare(car);
                      setSelectorOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-2xl border border-border bg-surface-200 hover:border-gold-500/50 text-left transition-colors group"
                  >
                    <div className="relative h-12 w-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={car.images[0] || ''}
                        alt={car.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate group-hover:text-gold-400">
                        {car.make} {car.model}
                      </p>
                      <p className="text-[11px] text-gold-400 font-extrabold">
                        {formatPrice(car.price, car.currency)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {compareList.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-surface-300 p-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Comparison list is empty</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Select vehicles while browsing the inventory or click below to pick vehicles to compare side-by-side.
            </p>
            <div className="pt-2">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-xs font-bold text-surface-400 hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
              >
                <span>Browse Vehicles to Compare</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-surface-300 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80">
                  <th className="p-4 sm:p-6 w-48 text-xs font-bold uppercase tracking-wider text-slate-400 bg-surface-400/50">
                    Vehicle
                  </th>
                  {compareList.map((car) => {
                    const sellerPhone = car.seller?.whatsapp || car.seller?.phone || '+256701234567';
                    const whatsappUrl = generateWhatsAppLink({
                      phoneNumber: sellerPhone,
                      carTitle: `${car.year} ${car.make} ${car.model}`,
                      price: car.price,
                      currency: car.currency,
                    });

                    return (
                      <th key={car.id} className="p-4 sm:p-6 min-w-[260px] align-top">
                        <div className="space-y-3">
                          {/* Photo */}
                          <div className="relative h-44 rounded-2xl overflow-hidden bg-surface-200">
                            <Image
                              src={car.images[0] || ''}
                              alt={car.title}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => removeFromCompare(car.id)}
                              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-slate-300 hover:text-red-400 backdrop-blur-sm transition-colors"
                              title="Remove"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <span className="absolute bottom-2 left-2 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-black text-surface-400 uppercase">
                              {car.condition}
                            </span>
                          </div>

                          {/* Title */}
                          <div>
                            <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
                              {car.make}
                            </span>
                            <Link href={`/cars/${car.id}`}>
                              <h3 className="text-sm font-bold text-white hover:text-gold-400 transition-colors line-clamp-1">
                                {car.title}
                              </h3>
                            </Link>
                          </div>

                          {/* Price */}
                          <div className="text-lg font-extrabold text-gold-400 font-display">
                            {formatPrice(car.price, car.currency)}
                          </div>

                          {/* Direct Actions */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 rounded-xl bg-whatsapp hover:bg-[#20bd5a] py-2 text-[11px] font-bold text-slate-950 transition-all shadow-md shadow-whatsapp/15"
                            >
                              <MessageCircle className="h-3.5 w-3.5 fill-slate-950" />
                              <span>WhatsApp</span>
                            </a>
                            <Link
                              href={`/cars/${car.id}`}
                              className="flex items-center justify-center rounded-xl bg-surface-200 hover:bg-surface-100 py-2 text-[11px] font-semibold text-white transition-colors"
                            >
                              <span>Details</span>
                              <ChevronRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {/* Row: Model Year */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Model Year</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 font-semibold text-white">
                      {c.year}
                    </td>
                  ))}
                </tr>

                {/* Row: Mileage */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Mileage</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 font-semibold text-white">
                      {formatMileage(c.mileage)}
                    </td>
                  ))}
                </tr>

                {/* Row: Engine Capacity */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Engine</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 text-slate-200">
                      {c.engine_capacity || 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* Row: Transmission */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Transmission</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 font-semibold text-white">
                      {c.transmission}
                    </td>
                  ))}
                </tr>

                {/* Row: Fuel Type */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Fuel Type</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 text-slate-200">
                      {c.fuel_type}
                    </td>
                  ))}
                </tr>

                {/* Row: Drivetrain */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Drivetrain</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 font-semibold text-gold-400">
                      {c.drivetrain || '2WD'}
                    </td>
                  ))}
                </tr>

                {/* Row: Body Type */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Body Type</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 text-slate-200">
                      {c.body_type}
                    </td>
                  ))}
                </tr>

                {/* Row: Colors */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Exterior / Interior</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 text-slate-300">
                      {c.color || 'Standard'} / {c.interior_color || 'Standard'}
                    </td>
                  ))}
                </tr>

                {/* Row: Location */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">Location</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4 text-slate-200 font-semibold">
                      {c.location}
                    </td>
                  ))}
                </tr>

                {/* Row: Verified Inspection */}
                <tr className="hover:bg-surface-200/30">
                  <td className="p-4 font-bold text-slate-400 bg-surface-400/30">200-Pt Inspection</td>
                  {compareList.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.is_verified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Passed
                        </span>
                      ) : (
                        <span className="text-slate-400">On Request</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Key Features Rows */}
                {allFeatures.map((feat) => (
                  <tr key={feat} className="hover:bg-surface-200/30">
                    <td className="p-4 font-medium text-slate-400 bg-surface-400/30">{feat}</td>
                    {compareList.map((c) => {
                      const hasFeature = c.features?.includes(feat);
                      return (
                        <td key={c.id} className="p-4">
                          {hasFeature ? (
                            <span className="flex items-center gap-1 text-gold-400 font-bold">
                              <Check className="h-4 w-4 stroke-[3]" /> Yes
                            </span>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>
                      );
                    })}
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
