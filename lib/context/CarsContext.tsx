'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Car } from '@/types';
import { INITIAL_CARS } from '@/lib/mock-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface CarsContextType {
  cars: Car[];
  loading: boolean;
  addCar: (car: Omit<Car, 'id' | 'views' | 'created_at'>) => Promise<Car>;
  updateCar: (id: string, updates: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  getCarById: (id: string) => Car | undefined;
  refreshCars: () => Promise<void>;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export function CarsProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCars = async () => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('cars')
          .select('*, seller:seller_id(*)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setCars(data as Car[]);
          setLoading(false);
          return;
        }
      }

      // Check local storage for added / modified cars
      const saved = localStorage.getItem('autolink_cars_catalog');
      if (saved) {
        setCars(JSON.parse(saved));
      } else {
        setCars(INITIAL_CARS);
        localStorage.setItem('autolink_cars_catalog', JSON.stringify(INITIAL_CARS));
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      setCars(INITIAL_CARS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const addCar = async (carData: Omit<Car, 'id' | 'views' | 'created_at'>): Promise<Car> => {
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`,
      views: 1,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('cars').insert(carData).select().single();
        if (!error && data) {
          setCars((prev) => [data as Car, ...prev]);
          return data as Car;
        }
      } catch (e) {
        console.error('Supabase insert error, falling back to local:', e);
      }
    }

    const updated = [newCar, ...cars];
    setCars(updated);
    localStorage.setItem('autolink_cars_catalog', JSON.stringify(updated));
    return newCar;
  };

  const updateCar = async (id: string, updates: Partial<Car>) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('cars').update(updates).eq('id', id);
      } catch (e) {
        console.error('Supabase update error:', e);
      }
    }

    const updated = cars.map((car) => (car.id === id ? { ...car, ...updates } : car));
    setCars(updated);
    localStorage.setItem('autolink_cars_catalog', JSON.stringify(updated));
  };

  const deleteCar = async (id: string) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('cars').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase delete error:', e);
      }
    }

    const updated = cars.filter((car) => car.id !== id);
    setCars(updated);
    localStorage.setItem('autolink_cars_catalog', JSON.stringify(updated));
  };

  const getCarById = (id: string) => {
    return cars.find((car) => car.id === id);
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        addCar,
        updateCar,
        deleteCar,
        getCarById,
        refreshCars: fetchCars,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
}
