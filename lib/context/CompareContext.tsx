'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Car } from '@/types';
import { INITIAL_CARS } from '@/lib/mock-data';

interface CompareContextType {
  compareList: Car[];
  addToCompare: (car: Car) => { success: boolean; message?: string };
  removeFromCompare: (carId: string) => void;
  isInCompare: (carId: string) => boolean;
  clearCompare: () => void;
  isBarVisible: boolean;
  setIsBarVisible: (visible: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [isBarVisible, setIsBarVisible] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('autolink_compare');
    if (saved) {
      try {
        const ids: string[] = JSON.parse(saved);
        const matched = INITIAL_CARS.filter((c) => ids.includes(c.id));
        setCompareList(matched);
        if (matched.length > 0) setIsBarVisible(true);
      } catch (e) {
        setCompareList([]);
      }
    }
  }, []);

  const addToCompare = (car: Car) => {
    if (compareList.some((c) => c.id === car.id)) {
      return { success: false, message: 'Vehicle is already in comparison list.' };
    }

    if (compareList.length >= 4) {
      return { success: false, message: 'You can compare up to 4 vehicles at a time.' };
    }

    const updated = [...compareList, car];
    setCompareList(updated);
    setIsBarVisible(true);
    localStorage.setItem('autolink_compare', JSON.stringify(updated.map((c) => c.id)));
    return { success: true };
  };

  const removeFromCompare = (carId: string) => {
    const updated = compareList.filter((c) => c.id !== carId);
    setCompareList(updated);
    if (updated.length === 0) setIsBarVisible(false);
    localStorage.setItem('autolink_compare', JSON.stringify(updated.map((c) => c.id)));
  };

  const isInCompare = (carId: string) => compareList.some((c) => c.id === carId);

  const clearCompare = () => {
    setCompareList([]);
    setIsBarVisible(false);
    localStorage.removeItem('autolink_compare');
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isBarVisible,
        setIsBarVisible,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
