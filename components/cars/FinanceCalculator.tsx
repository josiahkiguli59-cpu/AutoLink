'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, ArrowRight, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FinanceCalculatorProps {
  carPrice: number;
  carTitle: string;
}

export default function FinanceCalculator({ carPrice, carTitle }: FinanceCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanPeriodMonths, setLoanPeriodMonths] = useState<number>(36);
  const [interestRateAnnual, setInterestRateAnnual] = useState<number>(16);

  // Calculations
  const downPaymentAmount = (carPrice * downPaymentPercent) / 100;
  const loanPrincipal = carPrice - downPaymentAmount;
  const monthlyInterestRate = interestRateAnnual / 100 / 12;

  // Monthly installment using amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyInstallment = Math.round(
    (loanPrincipal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriodMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanPeriodMonths) - 1)
  );

  const totalPayable = downPaymentAmount + monthlyInstallment * loanPeriodMonths;

  const handleFinanceWhatsApp = () => {
    const text = `Hello AutoLink Financing! I would like to request asset financing assistance for ${carTitle} (${formatPrice(carPrice)}). My planned down payment is ${downPaymentPercent}% (${formatPrice(downPaymentAmount)}) over ${loanPeriodMonths} months.`;
    window.open(`https://wa.me/256701234567?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="rounded-3xl border border-border bg-surface-300 p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Car Loan &amp; Finance Calculator</h3>
            <p className="text-xs text-slate-400">Estimate monthly payments with partner commercial banks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sliders */}
        <div className="space-y-4">
          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Down Payment: {downPaymentPercent}%</span>
              <span className="text-gold-400">{formatPrice(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          {/* Loan Period Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Loan Duration: {loanPeriodMonths} Months</span>
              <span className="text-gold-400">{loanPeriodMonths / 12} Years</span>
            </div>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={loanPeriodMonths}
              onChange={(e) => setLoanPeriodMonths(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Annual Bank Interest Rate</span>
              <span className="text-gold-400">{interestRateAnnual}% p.a.</span>
            </div>
            <input
              type="range"
              min="10"
              max="24"
              step="1"
              value={interestRateAnnual}
              onChange={(e) => setInterestRateAnnual(Number(e.target.value))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="rounded-2xl border border-gold-500/30 bg-surface-200/90 p-5 space-y-4 text-center sm:text-left">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Estimated Monthly Installment
            </span>
            <div className="text-2xl sm:text-3xl font-black text-gold-400 font-display mt-1">
              {formatPrice(monthlyInstallment)}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-border/60">
            <div>
              <span className="text-[10px] text-slate-400 block">Total Financed</span>
              <span className="font-bold text-white">{formatPrice(loanPrincipal)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Total Cost</span>
              <span className="font-bold text-white">{formatPrice(totalPayable)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinanceWhatsApp}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 py-2.5 text-xs font-bold text-surface-400 transition-all shadow-md shadow-gold-500/15"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Apply for Loan Assistance on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
