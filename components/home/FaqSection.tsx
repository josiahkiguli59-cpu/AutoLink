"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I contact a vehicle seller or arrange a test drive?",
      a: 'Every vehicle listing has a direct "WhatsApp" button that opens an instant conversation with the verified dealership or private owner, pre-filling the car title and price. You can also click "Call Seller" or use the inspection request form on the car details page.',
    },
    {
      q: "What is included in the AutoLink 200-Point Mechanical Inspection?",
      a: "Our certified partner technicians inspect engine compression, turbocharger health, transmission shift smoothness, computer diagnostic error codes (OBD-II), suspension bushings, brake rotor wear, 4WD transfer case, and chassis structural integrity to verify no major past collision history.",
    },
    {
      q: "Are asking prices inclusive of Uganda Revenue Authority (URA) import taxes?",
      a: "Yes, listings explicitly state whether the car is already registered (e.g., UBF/UBG series with number plates attached) or foreign-used in bond with duty fully cleared upon purchase. There are zero surprise broker fees.",
    },
    {
      q: "Can I trade in my old car or get bank asset financing?",
      a: "Yes! Most certified dealerships on AutoLink accept trade-ins following a physical valuation. We also provide an integrated loan calculator on each car details page and can connect you with partner commercial banks offering asset financing up to 70%.",
    },
    {
      q: "How do I list my own car for sale as a dealer or private seller?",
      a: 'Simply click "Sell Car" in the navigation, create a free Seller Account, and use our multi-photo upload dashboard. Enter the make, model, year, asking price, and WhatsApp number, and your listing will be published immediately.',
    },
    {
      q: "How does the side-by-side car comparison feature work?",
      a: 'While browsing any car listing, tap the "Compare" icon. You can select up to 4 vehicles. Then tap the comparison floating bar or visit /compare to view specs, mileage, prices, and features side by side.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-400 border border-gold-500/20 mb-2">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Everything you need to know about buying and selling verified cars
            on AutoLink Uganda.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface-300 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-gold-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-border/40 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center rounded-2xl border border-border bg-surface-200 p-6">
          <h3 className="text-sm font-bold text-white">
            Still have questions?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Our automotive support team is available on WhatsApp 7 days a week.
          </p>
          <div className="mt-4">
            <a
              href="https://wa.me/256770864985?text=Hello%20AutoLink%20Team!%20I%20have%20a%20question%20about%20a%20vehicle."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-[#20bd5a] px-5 py-2.5 text-xs font-bold text-slate-950 transition-all shadow-md shadow-whatsapp/15 active:scale-95"
            >
              <MessageCircle className="h-4 w-4 fill-slate-950" />
              <span>Ask Support on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
