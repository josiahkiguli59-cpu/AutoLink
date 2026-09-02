'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Car as CarIcon, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { FilterParams } from '@/types';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import ActiveFilters from '@/components/cars/ActiveFilters';

function CarsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cars } = useCars();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState(searchParams.get('keyword') || '');

  // Extract initial filters from search params
  const [filters, setFilters] = useState<FilterParams>({
    keyword: searchParams.get('keyword') || undefined,
    make: searchParams.get('make') || undefined,
    model: searchParams.get('model') || undefined,
    condition: searchParams.get('condition') || undefined,
    body_type: searchParams.get('body_type') || undefined,
    fuel_type: searchParams.get('fuel_type') || undefined,
    transmission: searchParams.get('transmission') || undefined,
    location: searchParams.get('location') || undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    min_year: searchParams.get('min_year') ? Number(searchParams.get('min_year')) : undefined,
    sort_by: (searchParams.get('sort_by') as any) || 'newest',
  });

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
    // Sync to URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        params.set(key, String(val));
      }
    });
    router.replace(`/cars?${params.toString()}`, { scroll: false });
  };

  const handleRemoveFilter = (field: keyof FilterParams) => {
    handleFilterChange({
      ...filters,
      [field]: undefined,
    });
    if (field === 'keyword') setKeywordInput('');
  };

  const handleResetFilters = () => {
    setKeywordInput('');
    handleFilterChange({ sort_by: 'newest' });
  };

  const handleKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({
      ...filters,
      keyword: keywordInput || undefined,
    });
  };

  // Filtered & Sorted cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.keyword) {
        const q = filters.keyword.toLowerCase();
        const matchTitle = car.title.toLowerCase().includes(q);
        const matchMake = car.make.toLowerCase().includes(q);
        const matchModel = car.model.toLowerCase().includes(q);
        const matchDesc = car.description.toLowerCase().includes(q);
        if (!matchTitle && !matchMake && !matchModel && !matchDesc) return false;
      }
      if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.condition && car.condition !== filters.condition) return false;
      if (filters.body_type && car.body_type !== filters.body_type) return false;
      if (filters.fuel_type && car.fuel_type !== filters.fuel_type) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.max_price && car.price > filters.max_price) return false;
      if (filters.min_year && car.year < filters.min_year) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sort_by === 'price_asc') return a.price - b.price;
      if (filters.sort_by === 'price_desc') return b.price - a.price;
      if (filters.sort_by === 'mileage_asc') return a.mileage - b.mileage;
      if (filters.sort_by === 'year_desc') return b.year - a.year;
      // Default newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [cars, filters]);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border/60">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">
              Browse Vehicles for Sale in Uganda
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {filteredCars.length} available vehicles with verified specs and direct WhatsApp dealer contact
            </p>
          </div>

          {/* Quick Keyword Search Form */}
          <form onSubmit={handleKeywordSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Search by make, model, or keywords..."
                className="w-full rounded-xl border border-border bg-surface-200 pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2.5 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15"
            >
              Search
            </button>
          </form>
        </div>

        {/* Controls Bar: Sort, View Switcher, Mobile Filter Button */}
        <div className="my-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs font-semibold text-slate-200"
            >
              <SlidersHorizontal className="h-4 w-4 text-gold-400" />
              <span>Filters</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              <strong className="text-white">{filteredCars.length}</strong> vehicles matched
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort by:</span>
              <select
                value={filters.sort_by || 'newest'}
                onChange={(e) => handleFilterChange({ ...filters, sort_by: e.target.value as any })}
                className="rounded-xl border border-border bg-surface-200 px-3 py-1.5 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="mileage_asc">Lowest Mileage</option>
                <option value="year_desc">Newest Model Year</option>
              </select>
            </div>

            {/* Grid/List View Toggles */}
            <div className="hidden sm:flex items-center rounded-xl border border-border bg-surface-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gold-500 text-surface-400'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gold-500 text-surface-400'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilters
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={handleResetFilters}
        />

        {/* Main Grid: Sidebar + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <CarFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {filteredCars.length === 0 ? (
              <div className="rounded-3xl border border-border bg-surface-300 p-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <CarIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No vehicles found</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  We couldn't find any vehicles matching your current filter criteria. Try adjusting your filters or resetting them.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-xs font-bold text-surface-400 hover:bg-gold-400 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="relative ml-auto w-full max-w-xs h-full bg-surface-400 p-4 overflow-y-auto">
            <CarFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              isMobile
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading AutoLink Inventory...</div>}>
      <CarsContent />
    </Suspense>
  );
}
