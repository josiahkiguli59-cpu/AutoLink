import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/80 bg-surface-400 text-slate-400 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-surface-400 font-bold shadow-md shadow-gold-500/20">
                <Car className="h-5 w-5 stroke-[2.2]" />
              </div>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Auto<span className="text-gold-400">Link</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Uganda's most reliable premium automotive marketplace. Connecting verified car buyers and trusted dealerships with direct WhatsApp contact and comprehensive mechanical inspection history.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/256701234567?text=Hello%20AutoLink%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp/15 px-3.5 py-2 text-xs font-semibold text-whatsapp hover:bg-whatsapp/25 transition-colors border border-whatsapp/30"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                <span>Verified Inspection</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cars" className="hover:text-gold-400 transition-colors">
                  All Inventory
                </Link>
              </li>
              <li>
                <Link href="/cars?condition=Brand+New" className="hover:text-gold-400 transition-colors">
                  Brand New Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?condition=Foreign+Used" className="hover:text-gold-400 transition-colors">
                  Foreign Used Imports
                </Link>
              </li>
              <li>
                <Link href="/cars?body_type=SUV" className="hover:text-gold-400 transition-colors">
                  SUVs & 4x4s
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-gold-400 transition-colors">
                  Compare Vehicles
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-gold-400 transition-colors">
                  Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Searches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Popular Models
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cars?make=Toyota" className="hover:text-gold-400 transition-colors">
                  Toyota Land Cruiser
                </Link>
              </li>
              <li>
                <Link href="/cars?make=Toyota&model=Fortuner" className="hover:text-gold-400 transition-colors">
                  Toyota Fortuner GD-6
                </Link>
              </li>
              <li>
                <Link href="/cars?make=Mercedes-Benz" className="hover:text-gold-400 transition-colors">
                  Mercedes GLE & C-Class
                </Link>
              </li>
              <li>
                <Link href="/cars?make=BMW" className="hover:text-gold-400 transition-colors">
                  BMW X5 M Sport
                </Link>
              </li>
              <li>
                <Link href="/cars?make=Ford&model=Ranger" className="hover:text-gold-400 transition-colors">
                  Ford Ranger Wildtrak
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Showroom */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contact & Showroom
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold-400 mt-1 shrink-0" />
                <span>Yusuf Lule Road &amp; Lugogo Bypass, Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-400 shrink-0" />
                <a href="tel:+256701234567" className="hover:text-white transition-colors">
                  +256 701 234 567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-400 shrink-0" />
                <a href="mailto:sales@autolink.ug" className="hover:text-white transition-colors">
                  sales@autolink.ug
                </a>
              </div>
            </div>

            {/* Newsletter Mini */}
            <div className="pt-2">
              <p className="text-xs text-slate-300 font-medium mb-1.5">
                Get price drops &amp; new arrivals:
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to AutoLink car alerts!'); }} className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg bg-surface-200 border border-border px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-bold text-surface-400 hover:bg-gold-400"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AutoLink Automotive Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/safety" className="hover:text-slate-300">Buyer Safety Tips</Link>
            <span className="text-gold-400">Built with Next.js &amp; Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
