'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  PlusCircle, 
  Upload, 
  X, 
  Car, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles,
  DollarSign,
  MapPin,
  Camera
} from 'lucide-react';
import { useCars } from '@/lib/context/CarsContext';
import { useAuth } from '@/lib/context/AuthContext';
import { POPULAR_BRANDS, BODY_TYPES } from '@/lib/mock-data';
import { CarCondition, FuelType, Transmission, BodyType } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function NewCarListingPage() {
  const router = useRouter();
  const { addCar } = useCars();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2022);
  const [price, setPrice] = useState<number>(150000000);
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [mileage, setMileage] = useState<number>(35000);
  const [fuelType, setFuelType] = useState<FuelType>('Diesel');
  const [transmission, setTransmission] = useState<Transmission>('Automatic');
  const [condition, setCondition] = useState<CarCondition>('Foreign Used');
  const [bodyType, setBodyType] = useState<BodyType>('SUV');
  const [engineCapacity, setEngineCapacity] = useState('2800cc Turbo');
  const [drivetrain, setDrivetrain] = useState<'4WD' | 'AWD' | 'FWD' | 'RWD'>('4WD');
  const [color, setColor] = useState('Pearl White');
  const [interiorColor, setInteriorColor] = useState('Black Leather');
  const [location, setLocation] = useState('Kampala');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp || user?.phone || '+256701234567');
  const [phone, setPhone] = useState(user?.phone || '+256701234567');

  // Photo URLs state (allows adding custom image URLs or sample images)
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Selected features
  const availableFeatures = [
    'Sunroof / Panoramic Roof',
    'Leather Heated Seats',
    '360 Degree Camera',
    'Keyless Push Start',
    'Apple CarPlay & Android Auto',
    'Differential Lock (4x4)',
    'Lane Departure Warning',
    'Adaptive Cruise Control',
    'Power Tailgate',
    'JBL / Harman Kardon Sound',
    'Alloy Wheels',
    'Cool Box / Fridge',
  ];
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Leather Heated Seats',
    '360 Degree Camera',
    'Keyless Push Start',
    'Apple CarPlay & Android Auto',
  ]);

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim() && !images.includes(customImageUrl.trim())) {
      setImages([...images, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Sample photos helper
  const addSamplePhoto = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError('Please add at least one vehicle photo.');
      return;
    }

    setLoading(true);

    try {
      const generatedTitle = title.trim() || `${year} ${make} ${model}`;

      const newCar = await addCar({
        seller_id: user?.id || 'seller-1',
        seller: {
          full_name: user?.full_name || 'Victoria Motors Kampala',
          phone: phone,
          whatsapp: whatsapp,
          avatar_url: user?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
          is_verified: true,
          location: location,
        },
        title: generatedTitle,
        make,
        model: model || make,
        year: Number(year),
        price: Number(price),
        currency,
        mileage: Number(mileage),
        fuel_type: fuelType,
        transmission,
        condition,
        body_type: bodyType,
        engine_capacity: engineCapacity,
        drivetrain,
        color,
        interior_color: interiorColor,
        location,
        description: description || `Clean ${year} ${make} ${model} available in ${location}. Excellent mechanical condition, duty paid.`,
        features: selectedFeatures,
        images,
        is_featured: false,
        is_verified: true,
        status: 'available',
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/cars/${newCar.id}`);
      }, 1500);
    } catch (err: any) {
      setError(err?.message || 'Failed to publish listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border/60">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Upload New Vehicle Listing
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Provide accurate specs, images, and WhatsApp contact to reach buyers across Uganda.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Listing published successfully! Redirecting to vehicle page...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Photo Upload */}
        <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="h-5 w-5 text-gold-400" />
                <span>Vehicle Photos ({images.length})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add clear exterior and interior photos. High quality pictures increase buyer enquiries by 80%.
              </p>
            </div>
          </div>

          {/* Photos Grid & Remove */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative h-32 rounded-2xl overflow-hidden border border-border bg-surface-200"
              >
                <Image src={imgUrl} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-black text-surface-400 uppercase">
                    Cover Photo
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-slate-300 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Image URL Form */}
          <div className="pt-3 border-t border-border/60">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Add Photo by Image URL (or select sample presets below)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/car-photo.jpg"
                className="flex-1 rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="rounded-xl bg-surface-200 hover:bg-surface-100 border border-border px-4 py-2 text-xs font-semibold text-white"
              >
                Add Photo
              </button>
            </div>

            {/* Quick Sample Photos */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
              <span>Quick add presets:</span>
              <button
                type="button"
                onClick={() => addSamplePhoto('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80')}
                className="rounded-lg bg-surface-200 px-2.5 py-1 text-slate-300 hover:text-gold-400 hover:bg-surface-100"
              >
                + Luxury SUV Front
              </button>
              <button
                type="button"
                onClick={() => addSamplePhoto('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80')}
                className="rounded-lg bg-surface-200 px-2.5 py-1 text-slate-300 hover:text-gold-400 hover:bg-surface-100"
              >
                + Leather Interior
              </button>
              <button
                type="button"
                onClick={() => addSamplePhoto('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80')}
                className="rounded-lg bg-surface-200 px-2.5 py-1 text-slate-300 hover:text-gold-400 hover:bg-surface-100"
              >
                + Side Profile
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Core Vehicle Details */}
        <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-border/60">
            <Car className="h-5 w-5 text-gold-400" />
            <span>Vehicle Specifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Make */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Make</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                {POPULAR_BRANDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Fortuner, Prado, GLE, Hilux"
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Year</label>
              <input
                type="number"
                required
                min="1995"
                max="2026"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Asking Price ({currency})
              </label>
              <input
                type="number"
                required
                min="5000000"
                step="500000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
              <span className="text-[10px] text-gold-400 mt-1 block font-semibold">
                Formatted: {formatPrice(price, currency)}
              </span>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="UGX">UGX (Ugandan Shilling)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mileage (km)
              </label>
              <input
                type="number"
                required
                min="0"
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="Foreign Used">Foreign Used (Imported)</option>
                <option value="Brand New">Brand New</option>
                <option value="Local Used">Local Used (UG Number Plates)</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Body Type</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                {BODY_TYPES.map((bt) => (
                  <option key={bt.name} value={bt.name}>
                    {bt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Engine Capacity */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Engine Capacity
              </label>
              <input
                type="text"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                placeholder="e.g. 2800cc GD-6, 3.0L V6"
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Drivetrain */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Drivetrain</label>
              <select
                value={drivetrain}
                onChange={(e) => setDrivetrain(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="4WD">4WD (Four-Wheel Drive)</option>
                <option value="AWD">AWD (All-Wheel Drive)</option>
                <option value="FWD">FWD (Front-Wheel Drive)</option>
                <option value="RWD">RWD (Rear-Wheel Drive)</option>
              </select>
            </div>

            {/* Exterior Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Exterior Color
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Pearl White, Black Metallic"
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Interior Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Interior Color
              </label>
              <input
                type="text"
                value={interiorColor}
                onChange={(e) => setInteriorColor(e.target.value)}
                placeholder="e.g. Black Leather, Beige"
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="Kampala">Kampala</option>
                <option value="Entebbe">Entebbe</option>
                <option value="Wakiso">Wakiso</option>
                <option value="Jinja">Jinja</option>
                <option value="Mbarara">Mbarara</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Detailed Description &amp; History
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe condition, servicing history, modifications, duty status, and any extra equipment..."
              className="w-full rounded-xl border border-border bg-surface-200 p-3 text-xs text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Section 3: Equipment Checklist */}
        <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-border/60">
            Features &amp; Equipment Checklist
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {availableFeatures.map((feat) => {
              const isChecked = selectedFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  type="button"
                  onClick={() => handleFeatureToggle(feat)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    isChecked
                      ? 'border-gold-500 bg-gold-500/10 text-white'
                      : 'border-border bg-surface-200 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      isChecked
                        ? 'border-gold-500 bg-gold-500 text-surface-400'
                        : 'border-slate-500'
                    }`}
                  >
                    {isChecked && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="truncate">{feat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Seller Contact Info */}
        <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-border/60">
            Seller Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                WhatsApp Phone Number (For Direct Buyer Messages)
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+256 700 000 000"
                className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Direct Phone Call Line
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+256 700 000 000"
                className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl border border-border text-xs font-semibold text-slate-300 hover:bg-surface-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3 text-sm font-bold text-surface-400 hover:from-gold-400 hover:to-gold-300 shadow-xl shadow-gold-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-surface-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Publish Vehicle Listing</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
