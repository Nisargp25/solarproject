/**
 * Indian currency formatting using the Indian numbering system
 * (e.g. ₹1,25,000). Uses en-IN locale which produces lakh/crore
 * grouping automatically.
 */
export function formatInr(n: number): string {
  return n.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/** Compact INR for large figures: ₹1.2L, ₹3.4Cr */
export function formatInrCompact(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return formatInr(n);
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}
