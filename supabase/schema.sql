-- ==============================================================================
-- AutoLink Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  role TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CAR LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.cars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  currency TEXT DEFAULT 'UGX',
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL, -- Petrol, Diesel, Hybrid, Electric
  transmission TEXT NOT NULL, -- Automatic, Manual
  condition TEXT NOT NULL, -- Brand New, Foreign Used, Local Used
  body_type TEXT NOT NULL, -- SUV, Sedan, Pickup, Hatchback, Van, Coupe
  color TEXT,
  interior_color TEXT,
  engine_capacity TEXT, -- e.g. 2800cc, 3.0L
  drivetrain TEXT, -- 4WD, AWD, FWD, RWD
  location TEXT NOT NULL, -- Kampala, Entebbe, Wakiso, Jinja, etc.
  description TEXT,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'pending', 'sold')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVED FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, car_id)
);

-- 5. BUYER ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Cars Policies
CREATE POLICY "Available cars are viewable by everyone" 
  ON public.cars FOR SELECT USING (true);

CREATE POLICY "Sellers and Admins can create car listings" 
  ON public.cars FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own car listings" 
  ON public.cars FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own car listings" 
  ON public.cars FOR DELETE USING (auth.uid() = seller_id);

-- Favorites Policies
CREATE POLICY "Users can view their own favorites" 
  ON public.favorites FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" 
  ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites" 
  ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Enquiries Policies
CREATE POLICY "Sellers can view enquiries for their cars" 
  ON public.enquiries FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.cars WHERE cars.id = enquiries.car_id AND cars.seller_id = auth.uid())
    OR auth.uid() = buyer_id
  );

CREATE POLICY "Anyone can submit an enquiry" 
  ON public.enquiries FOR INSERT WITH CHECK (true);

-- 7. AUTOMATIC USER PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, phone, whatsapp)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'AutoLink User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'whatsapp'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 8. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_cars_make_model ON public.cars(make, model);
CREATE INDEX IF NOT EXISTS idx_cars_price ON public.cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_year ON public.cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_condition ON public.cars(condition);
CREATE INDEX IF NOT EXISTS idx_cars_body_type ON public.cars(body_type);
CREATE INDEX IF NOT EXISTS idx_cars_status ON public.cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_is_featured ON public.cars(is_featured);
