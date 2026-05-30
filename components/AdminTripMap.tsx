'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TripMapItem {
  id: string;
  fullName: string;
  fromPoint: string;
  toDestination: string;
  status: string;
  lat?: number;
  lng?: number;
}

const createSvgIcon = (color: string) =>
  new L.DivIcon({
    className: 'custom-marker',
    html: `<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" fill="${color}"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>`,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32],
  });

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  approved: '#3b82f6',
  assigned: '#8b5cf6',
  started: '#10b981',
  completed: '#059669',
  cancelled: '#ef4444',
};

const statusLabels: Record<string, { ar: string; fr: string }> = {
  pending: { ar: 'في الانتظار', fr: 'En attente' },
  approved: { ar: 'معتمدة', fr: 'Approuvée' },
  assigned: { ar: 'معينة', fr: 'Assignée' },
  started: { ar: 'جارية', fr: 'En cours' },
  completed: { ar: 'مكتملة', fr: 'Terminée' },
  cancelled: { ar: 'ملغاة', fr: 'Annulée' },
};

interface AdminTripMapProps {
  trips: TripMapItem[];
  language: 'ar' | 'fr';
}

export default function AdminTripMap({ trips, language }: AdminTripMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height: '100%',
          minHeight: 360,
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
        }}
      >
        {language === 'ar' ? 'جاري تحميل الخريطة...' : 'Chargement de la carte...'}
      </div>
    );
  }

  const activeTrips = trips.filter((t) => ['pending', 'approved', 'assigned', 'started'].includes(t.status));
  const defaultCenter: [number, number] = [34.85, -0.6333];

  // Center on first active trip with coordinates, or default
  const firstWithCoords = activeTrips.find((t) => t.lat && t.lng);
  const center: [number, number] = firstWithCoords
    ? [firstWithCoords.lat!, firstWithCoords.lng!]
    : defaultCenter;

  return (
    <div style={{ height: '50vh', minHeight: 360, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(16,185,129,0.2)' }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeTrips.map((trip) => {
          if (!trip.lat || !trip.lng) return null;
          const color = statusColors[trip.status] || '#10b981';
          const icon = createSvgIcon(color);
          const label = statusLabels[trip.status] || { ar: trip.status, fr: trip.status };
          return (
            <Marker key={trip.id} position={[trip.lat, trip.lng]} icon={icon}>
              <Popup>
                <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                  <div style={{ marginBottom: 6, fontSize: 14 }}>
                    {trip.fullName}
                  </div>
                  <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>
                    {trip.fromPoint} → {trip.toDestination}
                  </div>
                  <div style={{ color, fontSize: 12, fontWeight: 800 }}>
                    {language === 'ar' ? label.ar : label.fr}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
