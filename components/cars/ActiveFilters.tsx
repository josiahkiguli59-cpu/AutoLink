'use client';

import React from 'react';
import { X } from 'lucide-react';
import { FilterParams } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ActiveFiltersProps {
  filters: FilterParams;
  onRemove: (field: keyof FilterParams) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeChips: { field: keyof FilterParams; label: string }[] = [];

  if (filters.keyword) activeChips.push({ field: 'keyword', label: `Search: "${filters.keyword}"` });
  if (filters.make) activeChips.push({ field: 'make', label: `Make: ${filters.make}` });
  if (filters.condition) activeChips.push({ field: 'condition', label: `Condition: ${filters.condition}` });
  if (filters.body_type) activeChips.push({ field: 'body_type', label: `Type: ${filters.body_type}` });
  if (filters.fuel_type) activeChips.push({ field: 'fuel_type', label: `Fuel: ${filters.fuel_type}` });
  if (filters.transmission) activeChips.push({ field: 'transmission', label: `Gearbox: ${filters.transmission}` });
  if (filters.location) activeChips.push({ field: 'location', label: `Location: ${filters.location}` });
  if (filters.min_year) activeChips.push({ field: 'min_year', label: `Year ≥ ${filters.min_year}` });
  if (filters.max_price) activeChips.push({ field: 'max_price', label: `Max Price: ${formatPrice(filters.max_price)}` });

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-semibold text-slate-400">Active Filters:</span>
      {activeChips.map((chip) => (
        <span
          key={chip.field}
          className="inline-flex items-center gap-1 rounded-lg bg-surface-200 border border-border px-2.5 py-1 text-xs text-slate-200 font-medium"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemove(chip.field)}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-gold-400 hover:underline font-semibold ml-1"
      >
        Clear all
      </button>
    </div>
  );
}
