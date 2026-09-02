'use client';

import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { FilterParams } from '@/types';
import { POPULAR_BRANDS, BODY_TYPES } from '@/lib/mock-data';

interface CarFiltersProps {
  filters: FilterParams;
  onChange: (newFilters: FilterParams) => void;
  onReset: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function CarFilters({
  filters,
  onChange,
  onReset,
  isMobile = false,
  onCloseMobile,
}: CarFiltersProps) {
  const updateField = (field: keyof FilterParams, value: any) => {
    onChange({
      ...filters,
      [field]: value === '' ? undefined : value,
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-surface-300 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Filter className="h-4 w-4 text-gold-400" />
          <span>Filter Inventory</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-gold-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Make / Brand
        </label>
        <select
          value={filters.make || ''}
          onChange={(e) => updateField('make', e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">All Brands</option>
          {POPULAR_BRANDS.map((b) => (
            <option key={b.name} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Condition
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {['Brand New', 'Foreign Used', 'Local Used'].map((c) => {
            const isSelected = filters.condition === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => updateField('condition', isSelected ? undefined : c)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gold-500 text-surface-400'
                    : 'bg-surface-200 text-slate-300 hover:bg-surface-100 hover:text-white'
                }`}
              >
                <span>{c}</span>
                {isSelected && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Body Type
        </label>
        <select
          value={filters.body_type || ''}
          onChange={(e) => updateField('body_type', e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">All Body Types</option>
          {BODY_TYPES.map((bt) => (
            <option key={bt.name} value={bt.name}>
              {bt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range (UGX) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Max Price (UGX)
        </label>
        <select
          value={filters.max_price || ''}
          onChange={(e) => updateField('max_price', e.target.value ? Number(e.target.value) : undefined)}
          className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">Any Price</option>
          <option value="50000000">Under 50M UGX</option>
          <option value="100000000">Under 100M UGX</option>
          <option value="180000000">Under 180M UGX</option>
          <option value="250000000">Under 250M UGX</option>
          <option value="400000000">Under 400M UGX</option>
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Transmission
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Automatic', 'Manual'].map((t) => {
            const isSelected = filters.transmission === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => updateField('transmission', isSelected ? undefined : t)}
                className={`py-2 text-center rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gold-500 text-surface-400'
                    : 'bg-surface-200 text-slate-300 hover:bg-surface-100 hover:text-white'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Fuel Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((f) => {
            const isSelected = filters.fuel_type === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => updateField('fuel_type', isSelected ? undefined : f)}
                className={`py-2 text-center rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gold-500 text-surface-400'
                    : 'bg-surface-200 text-slate-300 hover:bg-surface-100 hover:text-white'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Location
        </label>
        <select
          value={filters.location || ''}
          onChange={(e) => updateField('location', e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">All Locations</option>
          <option value="Kampala">Kampala</option>
          <option value="Entebbe">Entebbe</option>
          <option value="Wakiso">Wakiso</option>
          <option value="Jinja">Jinja</option>
        </select>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Min Model Year
        </label>
        <select
          value={filters.min_year || ''}
          onChange={(e) => updateField('min_year', e.target.value ? Number(e.target.value) : undefined)}
          className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
        >
          <option value="">Any Year</option>
          <option value="2024">2024 or newer</option>
          <option value="2022">2022 or newer</option>
          <option value="2020">2020 or newer</option>
          <option value="2018">2018 or newer</option>
          <option value="2015">2015 or newer</option>
        </select>
      </div>
    </div>
  );
}
