'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icons using DivIcon (avoids Next.js static asset issues with PNGs)
const createSvgIcon = (color: string) =>
  new L.DivIcon({
    className: 'custom-marker',
    html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.732-6.268-14-14-14z" fill="${color}"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });

interface MapViewProps {
  center: [number, number];
  vehiclePos?: { lat: number; lng: number } | null;
  fromPoint?: string;
  toDestination?: string;
}

export default function MapView({ center, vehiclePos, fromPoint, toDestination }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: '100%', background: '#0f172a', borderRadius: 16 }} />;

  const vehicleIcon = createSvgIcon('#10b981');
  const destIcon = createSvgIcon('#6366f1');

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: 16 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehiclePos && (
        <Marker position={[vehiclePos.lat, vehiclePos.lng]} icon={vehicleIcon}>
          <Popup>
            <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700 }}>
              🚌 المركبة / Véhicule
            </div>
          </Popup>
        </Marker>
      )}
      <Marker position={center} icon={destIcon}>
        <Popup>
          <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700 }}>
            📍 {toDestination || 'Destination'}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
