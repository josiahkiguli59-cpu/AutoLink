'use client';

import React, { useState } from 'react';
import { Share2, X, Check, Copy, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this ${title} on AutoLink Uganda: ${url}`)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${title} on AutoLink Uganda: `)}&url=${encodeURIComponent(url)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-300 p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-gold-400" />
            <h3 className="text-sm font-bold text-white">Share Vehicle Listing</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mt-3 line-clamp-1">
          {title}
        </p>

        {/* Share Channels */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-surface-200 border border-border hover:border-whatsapp/50 hover:bg-whatsapp/10 transition-all text-center group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-whatsapp/20 text-whatsapp group-hover:scale-110 transition-transform">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">WhatsApp</span>
          </a>

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-surface-200 border border-border hover:border-sky-500/50 hover:bg-sky-500/10 transition-all text-center group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <span className="text-lg font-black font-sans">𝕏</span>
            </div>
            <span className="text-xs font-semibold text-slate-200">X (Twitter)</span>
          </a>

          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-surface-200 border border-border hover:border-blue-600/50 hover:bg-blue-600/10 transition-all text-center group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 group-hover:scale-110 transition-transform">
              <span className="text-lg font-black font-sans">f</span>
            </div>
            <span className="text-xs font-semibold text-slate-200">Facebook</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-400">
            Or copy direct listing link:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full rounded-xl border border-border bg-surface-200 px-3 py-2 text-xs text-slate-300 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-surface-400'
                  : 'bg-gold-500 text-surface-400 hover:bg-gold-400'
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
