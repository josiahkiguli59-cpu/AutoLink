'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Car } from '@/types';
import { INITIAL_CARS } from '@/lib/mock-data';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface FavoritesContextType {
  favorites: string[];
  favoriteCars: Car[];
  isFavorite: (carId: string) => boolean;
  toggleFavorite: (carId: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  // Load favorites from storage or Supabase
  useEffect(() => {
    async function loadFavorites() {
      if (isSupabaseConfigured && user) {
        try {
          const { data } = await supabase
            .from('favorites')
            .select('car_id')
            .eq('user_id', user.id);

          if (data) {
            setFavorites(data.map((item: any) => item.car_id));
            return;
          }
        } catch (e) {
          console.error('Error fetching Supabase favorites:', e);
        }
      }

      // Local storage fallback
      const saved = localStorage.getItem('autolink_favorites');
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (e) {
          setFavorites([]);
        }
      } else {
        // Initial default favorites for demo
        setFavorites(['car-1', 'car-2']);
      }
    }

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (carId: string) => {
    const isFav = favorites.includes(carId);
    const updated = isFav
      ? favorites.filter((id) => id !== carId)
      : [...favorites, carId];

    setFavorites(updated);
    localStorage.setItem('autolink_favorites', JSON.stringify(updated));

    if (isSupabaseConfigured && user) {
      try {
        if (isFav) {
          await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('car_id', carId);
        } else {
          await supabase
            .from('favorites')
            .insert({ user_id: user.id, car_id: carId });
        }
      } catch (e) {
        console.error('Error syncing favorite with Supabase:', e);
      }
    }
  };

  const isFavorite = (carId: string) => favorites.includes(carId);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('autolink_favorites');
  };

  // Find car objects matching IDs (from INITIAL_CARS or local cars)
  const favoriteCars = INITIAL_CARS.filter((car) => favorites.includes(car.id));

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteCars,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
