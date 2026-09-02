import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: 'UGX' | 'USD' = 'UGX'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Format UGX cleanly, e.g. "UGX 145,000,000"
  return `UGX ${price.toLocaleString('en-US')}`;
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString('en-US')} km`;
}

export function generateWhatsAppLink({
  phoneNumber,
  carTitle,
  price,
  currency = 'UGX',
  carUrl,
}: {
  phoneNumber: string;
  carTitle: string;
  price: number;
  currency?: 'UGX' | 'USD';
  carUrl?: string;
}): string {
  // Normalize phone number (remove spaces, dashes, leading +)
  let cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    // Standard Uganda prefix if starting with 07...
    cleanNumber = '256' + cleanNumber.substring(1);
  } else if (!cleanNumber.startsWith('256') && cleanNumber.length <= 9) {
    cleanNumber = '256' + cleanNumber;
  }

  const formattedPrice = formatPrice(price, currency);
  const text = `Hello AutoLink! I'm interested in the ${carTitle} (${formattedPrice}) listed on AutoLink. Is it still available?${carUrl ? `\n\nLink: ${carUrl}` : ''}`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
