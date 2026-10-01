import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

// ₹1500 -> "₹1,500"
export function formatPrice(price: number) {
  return inrFormatter.format(price)
}

// Strips emoji only — keeps ₹, curly quotes, dashes and • bullets intact
export const EMOJI_REGEX = new RegExp(
  "[\\p{Extended_Pictographic}\\u{1F1E6}-\\u{1F1FF}\\uFE0F\\u200D\\u20E3]",
  "gu",
)

// One-line plain-text summary (e.g. meta description) from a CMS description
export function summarize(text: string | undefined, max = 160) {
  const plain = (text ?? "")
    .replace(EMOJI_REGEX, "")
    .replace(/^\s*(?:[•\-*]|\d+\.)\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim()
  return plain.length > max ? `${plain.slice(0, max - 1).trimEnd()}…` : plain
}
