'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';

interface CarGalleryProps {
  images: string[];
  title: string;
}

export default function CarGallery({ images, title }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = images[selectedIndex] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80';

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div className="relative h-80 sm:h-[480px] w-full overflow-hidden rounded-3xl border border-border bg-surface-300 group">
        <Image
          src={currentImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Prev / Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-gold-500 hover:text-surface-400 transition-colors"
              title="Previous Photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-gold-500 hover:text-surface-400 transition-colors"
              title="Next Photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Bottom Bar: Counter & Fullscreen button */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1">
            <Camera className="h-3.5 w-3.5" />
            <span>{selectedIndex + 1} of {images.length} photos</span>
          </span>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 hover:bg-gold-500 hover:text-surface-400 transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">View Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-gold-500 ring-2 ring-gold-500/30 scale-105'
                  : 'border-border/80 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${title} - photo ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-surface-200 text-white hover:bg-red-500 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative h-[80vh] w-[90vw] max-w-5xl">
            <Image
              src={currentImage}
              alt={title}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-surface-200/80 text-white hover:bg-gold-500 hover:text-surface-400 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-surface-200/80 text-white hover:bg-gold-500 hover:text-surface-400 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-surface-300/80 px-4 py-1.5 text-xs text-slate-300 font-medium">
            Photo {selectedIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
