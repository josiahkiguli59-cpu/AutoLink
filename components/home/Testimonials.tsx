import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Dr. Patrick Mugisha',
      role: 'Consultant Physician, Mulago Hospital',
      location: 'Kampala',
      car: 'Bought: 2022 Toyota Fortuner 2.8 GD-6',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment:
        'Finding a genuine foreign-used Fortuner in Kampala without getting ripped off by roadside brokers used to be impossible. AutoLink connected me directly to the bond manager via WhatsApp. The 200-point inspection report gave me 100% peace of mind.',
    },
    {
      name: 'Brenda Namutebi',
      role: 'Managing Director, Horizon Logistics',
      location: 'Entebbe',
      car: 'Bought: 2021 Mercedes-Benz C-Class AMG',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment:
        'The vehicle comparison feature on AutoLink saved me hours. I was torn between the BMW 3 Series and Mercedes C200. Comparing the specs, duty status, and monthly finance estimates made the choice crystal clear. Delivered in pristine condition!',
    },
    {
      name: 'Eng. Isaac Byaruhanga',
      role: 'Civil Contractor',
      location: 'Jinja',
      car: 'Bought: 2023 Ford Ranger Wildtrak 4x4',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment:
        'I needed a rugged pickup for upcountry project sites in Karamoja. The seller answered all my WhatsApp questions with video walkarounds within 5 minutes. Best automotive buying experience in East Africa.',
    },
  ];

  return (
    <section className="py-20 border-t border-border/60 bg-surface-400/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Real Stories, Real Drivers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Loved by Thousands of Car Buyers
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Here is what drivers across Kampala, Entebbe, and Jinja have to say about AutoLink.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 flex flex-col justify-between hover:border-gold-500/40 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-gold-500/20 mb-3" />

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="h-11 w-11 rounded-full object-cover border border-gold-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-slate-400">{rev.role}</p>
                    <p className="text-[10px] text-gold-400 font-medium mt-0.5">{rev.car}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
