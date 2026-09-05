"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import { POPULAR_BRANDS, BODY_TYPES } from "@/lib/mock-data";

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "All" | "Brand New" | "Foreign Used" | "Local Used"
  >("All");
  const [make, setMake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== "All") params.set("condition", activeTab);
    if (make) params.set("make", make);
    if (bodyType) params.set("body_type", bodyType);
    if (maxPrice) params.set("max_price", maxPrice);
    if (keyword) params.set("keyword", keyword);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-24 overflow-hidden">
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1527524330007-3d820860b365?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-background/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="h-3.5 w-3.5 text-gold-400" />
          <span>Uganda's Leading Verified Automotive Marketplace</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Find, Compare &amp; Drive Your{" "}
          <span className="gold-gradient-text">Dream Vehicle</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Browse verified foreign-used, brand-new, and local luxury cars in
          Kampala. Compare specs side-by-side and chat directly with dealers on
          WhatsApp.
        </p>

        {/* Search Box Container */}
        <div className="mt-10 max-w-4xl mx-auto rounded-3xl border border-border/80 bg-surface-300/95 p-3 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-border/60">
            {(["All", "Brand New", "Foreign Used", "Local Used"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                    activeTab === tab
                      ? "bg-gold-500 text-surface-400 shadow-md shadow-gold-500/20"
                      : "text-slate-300 hover:text-white hover:bg-surface-200"
                  }`}
                >
                  {tab === "All" ? "All Cars" : tab}
                </button>
              ),
            )}
          </div>

          {/* Quick Filter Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left"
          >
            {/* Make */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Make / Brand
              </label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-3 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="">All Makes (Toyota, Benz...)</option>
                {POPULAR_BRANDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count}+)
                  </option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Body Type
              </label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-3 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="">All Types (SUV, Sedan...)</option>
                {BODY_TYPES.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Max Budget (UGX)
              </label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-3 text-xs font-medium text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="">Any Budget</option>
                <option value="60000000">Up to 60 Million UGX</option>
                <option value="120000000">Up to 120 Million UGX</option>
                <option value="200000000">Up to 200 Million UGX</option>
                <option value="300000000">Up to 300 Million UGX</option>
                <option value="500000000">Up to 500 Million UGX</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 py-3 px-4 text-sm font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-xl shadow-gold-500/20 active:scale-98 transition-all"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
                <span>Search Vehicles</span>
              </button>
            </div>
          </form>

          {/* Quick Keyword Search */}
          <div className="mt-3 pt-3 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="shrink-0 text-[11px] font-medium text-slate-300">
                Popular:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Prado TX-L",
                  "Fortuner",
                  "GLE 400",
                  "Hilux GR",
                  "Premio",
                ].map((keywordItem) => (
                  <button
                    key={keywordItem}
                    type="button"
                    onClick={() =>
                      router.push(
                        `/cars?keyword=${encodeURIComponent(keywordItem)}`,
                      )
                    }
                    className="rounded-lg bg-surface-200/80 px-2 py-0.5 text-[11px] text-slate-300 hover:text-gold-400 hover:bg-surface-100 transition-colors"
                  >
                    {keywordItem}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-gold-400/90 font-medium">
              Over 2,500+ cars ready for inspection in Kampala
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-border/40">
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              2,500+
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Verified Cars Available
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-black text-gold-400 font-display">
              200-Point
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Mechanical Inspection
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">
              Instant
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Dealer WhatsApp Contact
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              0% Hidden
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Middleman Broker Fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
