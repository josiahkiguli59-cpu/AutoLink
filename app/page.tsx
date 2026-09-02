import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PopularBrands from '@/components/home/PopularBrands';
import FeaturedCars from '@/components/home/FeaturedCars';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import LatestCars from '@/components/home/LatestCars';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CompareCallout from '@/components/home/CompareCallout';
import Testimonials from '@/components/home/Testimonials';
import FaqSection from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PopularBrands />
      <FeaturedCars />
      <CategoriesGrid />
      <LatestCars />
      <WhyChooseUs />
      <CompareCallout />
      <Testimonials />
      <FaqSection />
    </div>
  );
}
