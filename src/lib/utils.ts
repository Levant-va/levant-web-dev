import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatDistance(nm: number): string {
  if (nm < 1) {
    return `${Math.round(nm * 1000)}m`
  }
  return `${nm.toFixed(1)}nm`
}

export function formatSpeed(kts: number): string {
  return `${kts.toFixed(0)}kts`
}

export function formatAltitude(ft: number): string {
  return `FL${Math.floor(ft / 100)}`
}
