# AutoLink — Modern Automotive Marketplace Web Application

A premium, modern automotive marketplace web application built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **Supabase** for authentication, role-based authorization, and database persistence.

---

## 🚀 Key Features

### 1. User Authentication & Authorization (Supabase)
- **Sign Up**: Register as a **Buyer** or **Seller** with full name, email, phone/WhatsApp, and password.
- **Login**: Secure email & password sign-in with session persistence.
- **Instant Demo Mode**: One-click demo switchers for **Buyer**, **Seller**, and **Admin** roles to test all platform features without manual registration.
- **Password Reset**: Self-service email password recovery flow.
- **Email Verification**: Confirmation status handling and resend verification email workflow.

### 2. Buyer Experience
- **Multi-Criteria Search & Filtering**: Filter by keyword, make, model, condition (Brand New, Foreign Used, Local Used), body type (SUV, Sedan, Pickup, etc.), transmission, fuel type, price range (UGX/USD), model year, and location (Kampala, Entebbe, Wakiso, Jinja).
- **Save Favorite Cars**: Heart icon wishlist saved across sessions with dedicated `/favorites` page.
- **Side-by-Side Comparison Matrix (`/compare`)**: Compare up to 4 vehicles simultaneously across pricing, mileage, engine displacement, drivetrain, interior, equipment checklist, and seller contacts.
- **Direct WhatsApp Seller Contact**: Prefilled WhatsApp link with car name, price, and URL for instant negotiations.
- **Interactive Finance & Loan Calculator**: Loan term, down payment percentage, and bank interest sliders with real-time monthly payment estimates.

### 3. Seller Dashboard (`/dashboard`)
- **Dashboard Overview**: Metrics for active listings, total view impressions, WhatsApp leads, and vehicles sold.
- **Upload New Car (`/dashboard/new`)**:
  - Multi-photo upload gallery preview with cover photo selection and remove controls.
  - Comprehensive vehicle specifications: Make, Model, Year, Price (UGX/USD), Mileage, Fuel Type, Transmission, Condition, Body Type, Engine CC, Drivetrain, Colors, Location, and Description.
  - Equipment & features selection checklist.
  - Seller WhatsApp & phone number.
- **Manage Inventory (`/dashboard/listings`)**: View all dealership cars, toggle between Available and Sold, edit details, or delete listings.

### 4. Admin Dashboard (`/admin`)
- **Platform Analytics**: Total active listings, gross inventory value, featured promotions, and 200-point inspected units.
- **Listings Moderation (`/admin/listings`)**: Feature vehicles on the homepage, certify 200-point mechanical inspection checkmarks, toggle availability, and moderate listings.
- **User Directory (`/admin/users`)**: Manage registered buyers, sellers, and administrators, and grant verified dealership badges.

### 5. Premium Homepage (`/`)
- Hero section with quick-search widget and automotive statistics.
- Popular brands grid (Toyota, Mercedes-Benz, BMW, Mitsubishi, Nissan, Ford, Audi, Subaru).
- Browse by body style (SUVs, Sedans, Pickups, Hatchbacks, Vans, Wagons).
- Curated staff picks & featured deals.
- Latest inventory arrivals with "Recently Added" badge.
- "Why Choose AutoLink" value proposition (200-Point Inspection, Direct WhatsApp, Transparent Pricing, Trade-Ins).
- Vehicle comparison showcase callout.
- Verified buyer testimonials from Kampala, Entebbe, and Jinja.
- Interactive FAQ accordion.
- Modern footer with quick links, Kampala showroom address, and newsletter signup.

---

## 📁 Folder Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx             # Sign In & 1-click Demo logins
│   │   ├── signup/page.tsx            # Sign Up with Buyer/Seller role picker
│   │   ├── forgot-password/page.tsx   # Password reset recovery
│   │   └── verify-email/page.tsx      # Email verification status & resend
│   ├── admin/
│   │   ├── layout.tsx                 # Protected admin layout
│   │   ├── page.tsx                   # Admin overview & platform stats
│   │   ├── listings/page.tsx          # Moderate, feature, & verify all cars
│   │   └── users/page.tsx             # Manage user accounts and roles
│   ├── cars/
│   │   ├── page.tsx                   # Inventory search & multi-filter page
│   │   └── [id]/page.tsx              # Vehicle details, gallery & finance calc
│   ├── compare/page.tsx               # 4-car side-by-side comparison matrix
│   ├── dashboard/
│   │   ├── layout.tsx                 # Seller dashboard layout
│   │   ├── page.tsx                   # Seller metrics & recent listings
│   │   ├── new/page.tsx               # Car upload form with photo gallery
│   │   └── listings/page.tsx          # Inventory management table
│   ├── favorites/page.tsx             # Saved cars wishlist
│   ├── globals.css                    # Tailwind directives & luxury styling
│   ├── layout.tsx                     # Root layout with providers & CompareBar
│   └── page.tsx                       # Premium homepage assembly
├── components/
│   ├── cars/                          # CarCard, CarFilters, ActiveFilters, CarGallery, SellerCard, FinanceCalc, ShareModal
│   ├── compare/                       # CompareBar floating drawer
│   ├── home/                          # Hero, Brands, Featured, Categories, Latest, WhyUs, CompareCallout, Testimonials, FAQ
│   └── layout/                        # Header with responsive mobile drawer, Footer
├── lib/
│   ├── context/                       # AuthContext, CarsContext, FavoritesContext, CompareContext
│   ├── supabase/                      # Supabase browser client with safe fallback
│   ├── mock-data.ts                   # Realistic East African / Uganda car inventory
│   └── utils.ts                       # Currency (UGX/USD), WhatsApp links, formatting
├── supabase/
│   └── schema.sql                     # Complete PostgreSQL tables, RLS policies, triggers, and indexes
└── types/
    └── index.ts                       # Core TypeScript interfaces
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials from your [Supabase Dashboard](https://app.supabase.com):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
*(Note: If you run without Supabase credentials, AutoLink automatically uses built-in realistic mock data and localStorage, so every single feature is fully interactive right away!)*

### 3. Setup Supabase Database
In your Supabase project:
1. Open the **SQL Editor**.
2. Copy and paste the contents of `supabase/schema.sql`.
3. Click **Run**. This creates the `profiles`, `cars`, `favorites`, and `enquiries` tables, sets up Row Level Security (RLS) policies, and creates the automatic profile trigger on signup.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

To test and create an optimized production build:
```bash
npm run build
npm start
```
