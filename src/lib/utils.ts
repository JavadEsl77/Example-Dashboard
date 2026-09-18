import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits }).format(num);
}

export function formatCurrency(num: number): string {
  // Usually we just show the number formatted for Iranian Rial/Toman
  return formatNumber(num);
}

export function formatPercent(num: number): string {
  const sign = num > 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 }).format(num)}٪`;
}

export function formatJalali(date: Date | string | number, formatStr: 'full' | 'short' | 'time' | 'datetime' = 'short'): string {
  const d = new Date(date);
  if (formatStr === 'full') {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' }).format(d);
  }
  if (formatStr === 'time') {
    return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(d);
  }
  if (formatStr === 'datetime') {
    return new Intl.DateTimeFormat('fa-IR', { 
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  }
  return new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' }).format(d);
}

// Ensure Recharts doesn't show Gregorian text when we map data
export function getChartTimeLabel(timestamp: number) {
  return formatJalali(timestamp, 'time');
}
export function getChartDateLabel(timestamp: number) {
  return formatJalali(timestamp, 'short');
}
