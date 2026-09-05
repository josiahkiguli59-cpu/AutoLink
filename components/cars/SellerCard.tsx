"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  Mail,
  Send,
  AlertTriangle,
  X,
} from "lucide-react";
import { Car } from "@/types";
import { generateWhatsAppLink, formatPrice } from "@/lib/utils";

interface SellerCardProps {
  car: Car;
}

export default function SellerCard({ car }: SellerCardProps) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [message, setMessage] = useState(
    `Hello, I would like to arrange a physical inspection and test drive for the ${car.year} ${car.make} ${car.model}. Please contact me.`,
  );
  const [enquirySent, setEnquirySent] = useState(false);

  const seller = car.seller || {
    full_name: "Victoria Motors Kampala",
    phone: "+256770864985",
    whatsapp: "+256770864985",
    avatar_url:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    is_verified: true,
    dealership: "Victoria Prestige Motors Ltd",
    location: "Yusuf Lule Road, Kampala",
  };

  const sellerPhone = seller.whatsapp || seller.phone || "+256770864985";
  const whatsappUrl = generateWhatsAppLink({
    phoneNumber: sellerPhone,
    carTitle: `${car.year} ${car.make} ${car.model}`,
    price: car.price,
    currency: car.currency,
    carUrl: typeof window !== "undefined" ? window.location.href : undefined,
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setEnquiryModalOpen(false);
    }, 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-surface-300 p-6 space-y-6 shadow-xl sticky top-28">
      {/* Header Info */}
      <div className="flex items-start gap-3.5 pb-5 border-b border-border/60">
        <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-surface-200 border border-gold-500/30 shrink-0">
          <Image
            src={
              seller.avatar_url ||
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80"
            }
            alt={seller.full_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-white truncate">
              {seller.full_name}
            </h4>
            {seller.is_verified && (
              <span title="Verified Seller">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              </span>
            )}
          </div>
          {seller.dealership && (
            <p className="text-xs text-gold-400 font-semibold truncate mt-0.5">
              {seller.dealership}
            </p>
          )}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span className="truncate">{seller.location || car.location}</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-surface-200/80 p-2.5 text-center">
          <Clock className="h-4 w-4 text-gold-400 mx-auto mb-1" />
          <span className="block text-[10px] text-slate-400">
            Response Time
          </span>
          <span className="font-bold text-white text-xs">Within 15 mins</span>
        </div>
        <div className="rounded-xl bg-surface-200/80 p-2.5 text-center">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
          <span className="block text-[10px] text-slate-400">Verification</span>
          <span className="font-bold text-emerald-400 text-xs">
            Bond Verified
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {/* Direct WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-whatsapp hover:bg-[#20bd5a] py-3.5 px-4 text-sm font-black text-slate-950 shadow-xl shadow-whatsapp/20 active:scale-98 transition-all"
        >
          <MessageCircle className="h-5 w-5 fill-slate-950" />
          <span>Chat on WhatsApp</span>
        </a>

        {/* Call Seller */}
        <a
          href={`tel:${seller.phone || sellerPhone}`}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-200 hover:bg-surface-100 py-3 px-4 text-xs font-bold text-white transition-colors"
        >
          <Phone className="h-4 w-4 text-gold-400" />
          <span>Call {seller.phone || sellerPhone}</span>
        </a>

        {/* In-app Message Modal Trigger */}
        <button
          type="button"
          onClick={() => setEnquiryModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500/20 py-3 px-4 text-xs font-bold text-gold-300 transition-colors"
        >
          <Mail className="h-4 w-4 text-gold-400" />
          <span>Request Inspection / Send Note</span>
        </button>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-border/80 bg-surface-200/50 p-3.5 flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
        <AlertTriangle className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-200">Buyer Safety Tip:</strong> Always
          inspect the vehicle physically at the car bond or dealership premises
          before making any payment.
        </span>
      </div>

      {/* Modal: Send Enquiry Form */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface-300 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <h3 className="text-sm font-bold text-white">
                Book Inspection / Send Message
              </h3>
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {enquirySent ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Enquiry Delivered!
                </h4>
                <p className="text-xs text-slate-400">
                  The seller will reach out to you via WhatsApp or phone
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5 mt-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+256 700 000 000"
                    className="w-full rounded-xl border border-border bg-surface-200 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface-200 p-3 text-xs text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 py-2.5 text-xs font-bold text-surface-400 shadow-md shadow-gold-500/15"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Enquiry to Seller</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
