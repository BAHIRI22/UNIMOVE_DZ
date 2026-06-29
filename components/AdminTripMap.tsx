'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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

// Custom car/bus icon with animation
const createVehicleIcon = (color: string) =>
  new L.DivIcon({
    className: 'custom-vehicle-icon',
    html: `
      <div style="
        background: linear-gradient(135deg, ${color}, ${color}dd);
        border: 3px solid #ffffff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px ${color}66;
        animation: pulse 2s infinite;
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

// Custom start point icon
const createStartIcon = () =>
  new L.DivIcon({
    className: 'custom-start-icon',
    html: `
      <div style="
        background: #3b82f6;
        border: 3px solid #ffffff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
      ">
        <span style="color: white; font-weight: bold; font-size: 14px;">A</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

// Custom end point icon
const createEndIcon = () =>
  new L.DivIcon({
    className: 'custom-end-icon',
    html: `
      <div style="
        background: #ef4444;
        border: 3px solid #ffffff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
      ">
        <span style="color: white; font-weight: bold; font-size: 14px;">B</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
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
          minHeight: 400,
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
  const defaultCenter: [number, number] = [35.1911, -0.6156]; // Sidi Bel Abbes

  // Center on first active trip with coordinates, or default
  const firstWithCoords = activeTrips.find((t) => t.lat && t.lng);
  const center: [number, number] = firstWithCoords
    ? [firstWithCoords.lat!, firstWithCoords.lng!]
    : defaultCenter;

  return (
    <div style={{ height: '60vh', minHeight: 400, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(16,185,129,0.2)' }}>
      <MapContainer
        center={center}
        zoom={13}
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
          const label = statusLabels[trip.status] || { ar: trip.status, fr: trip.status };
          
          // Simulate route coordinates (in real app, these would come from the route data)
          const routeCoords: [number, number][] = [
            [trip.lat - 0.01, trip.lng - 0.01], // Start point
            [trip.lat, trip.lng], // Current position
            [trip.lat + 0.01, trip.lng + 0.01], // End point
          ];
          
          return (
            <div key={trip.id}>
              {/* Route line */}
              <Polyline
                positions={routeCoords}
                color={color}
                weight={4}
                opacity={0.6}
                dashArray="10, 10"
              />
              
              {/* Start point marker */}
              <Marker position={routeCoords[0]} icon={createStartIcon()}>
                <Popup>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                    <div style={{ color: '#3b82f6', fontSize: 12, fontWeight: 800 }}>
                      {language === 'ar' ? 'نقطة الانطلاق' : 'Point de départ'}
                    </div>
                    <div style={{ marginTop: 4 }}>{trip.fromPoint}</div>
                  </div>
                </Popup>
              </Marker>
              
              {/* End point marker */}
              <Marker position={routeCoords[2]} icon={createEndIcon()}>
                <Popup>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                    <div style={{ color: '#ef4444', fontSize: 12, fontWeight: 800 }}>
                      {language === 'ar' ? 'الوجهة' : 'Destination'}
                    </div>
                    <div style={{ marginTop: 4 }}>{trip.toDestination}</div>
                  </div>
                </Popup>
              </Marker>
              
              {/* Vehicle marker */}
              <Marker position={[trip.lat, trip.lng]} icon={createVehicleIcon(color)}>
                <Popup>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, direction: language === 'ar' ? 'rtl' : 'ltr', minWidth: 200 }}>
                    <div style={{ marginBottom: 6, fontSize: 14, color: '#1f2937' }}>
                      {trip.fullName}
                    </div>
                    <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>
                      {trip.fromPoint} → {trip.toDestination}
                    </div>
                    <div style={{ 
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 800,
                      background: `${color}20`,
                      color,
                      marginTop: 4
                    }}>
                      {language === 'ar' ? label.ar : label.fr}
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
