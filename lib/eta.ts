// Simple ETA calculation utilities for UNIMOVE-DZ Phase 13

const AVG_SPEED_KMH = 40; // Average urban speed in Algeria

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateETA(
  currentLat: number,
  currentLon: number,
  destLat: number,
  destLon: number,
  avgSpeedKmh: number = AVG_SPEED_KMH
): { distanceKm: number; etaMinutes: number } {
  const distanceKm = haversineDistance(currentLat, currentLon, destLat, destLon);
  const etaMinutes = Math.ceil((distanceKm / avgSpeedKmh) * 60);
  return { distanceKm: Math.round(distanceKm * 100) / 100, etaMinutes };
}

export function formatETAMessage(etaMinutes: number, language: 'ar' | 'fr' = 'ar'): string {
  if (etaMinutes <= 1) {
    return language === 'ar' ? 'وصلت الآن 🚌' : 'Arrivée imminente 🚌';
  }
  if (etaMinutes <= 5) {
    return language === 'ar'
      ? `الوصول خلال ${etaMinutes} دقائق 🚌`
      : `Arrivée dans ${etaMinutes} minutes 🚌`;
  }
  return language === 'ar'
    ? `الوصول المتوقع خلال ${etaMinutes} دقيقة`
    : `Arrivée estimée dans ${etaMinutes} minutes`;
}
