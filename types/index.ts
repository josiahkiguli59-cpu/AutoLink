export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  role: UserRole;
  avatar_url?: string;
  is_verified?: boolean;
  created_at?: string;
}

export type CarCondition = 'Brand New' | 'Foreign Used' | 'Local Used';
export type Transmission = 'Automatic' | 'Manual';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type BodyType = 'SUV' | 'Sedan' | 'Pickup' | 'Hatchback' | 'Van' | 'Coupe' | 'Wagon';
export type CarStatus = 'available' | 'pending' | 'sold';

export interface Car {
  id: string;
  seller_id: string;
  seller?: {
    full_name: string;
    phone?: string;
    whatsapp?: string;
    avatar_url?: string;
    is_verified?: boolean;
    location?: string;
    dealership?: string;
  };
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: 'UGX' | 'USD';
  mileage: number; // in km
  fuel_type: FuelType;
  transmission: Transmission;
  condition: CarCondition;
  body_type: BodyType;
  color?: string;
  interior_color?: string;
  engine_capacity?: string;
  drivetrain?: '4WD' | 'AWD' | 'FWD' | 'RWD';
  location: string;
  description: string;
  features: string[];
  images: string[];
  is_featured: boolean;
  is_verified: boolean;
  status: CarStatus;
  views: number;
  created_at: string;
  updated_at?: string;
}

export interface FilterParams {
  keyword?: string;
  make?: string;
  model?: string;
  condition?: string;
  body_type?: string;
  fuel_type?: string;
  transmission?: string;
  min_price?: number;
  max_price?: number;
  min_year?: number;
  max_year?: number;
  location?: string;
  sort_by?: 'newest' | 'price_asc' | 'price_desc' | 'mileage_asc' | 'year_desc';
}

export interface Enquiry {
  id: string;
  car_id: string;
  car_title?: string;
  buyer_id?: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  message: string;
  status: 'new' | 'read' | 'contacted';
  created_at: string;
}
