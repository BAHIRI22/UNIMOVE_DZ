export function generateCardNumber(): string {
  const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `UNIMOVE-2026-${randomPart}`;
}

export function generateQRCode(data: string): string {
  // Using QR Code API
  const encoded = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
}

export function formatCardExpiry(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function isCardValid(validUntil: string): boolean {
  const expiryDate = new Date(validUntil);
  return expiryDate > new Date();
}
