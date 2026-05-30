'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const busIcon = new L.DivIcon({
  className: 'custom-bus-marker',
  html: `<div style="width:40px;height:40px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,0.35);border:3px solid white;transform:translate(-50%,-50%);">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 6v-4"/><path d="M16 6v-4"/><rect x="4" y="6" width="16" height="14" rx="2"/>
      <path d="M4 16h16"/><path d="M6 20v2"/><path d="M18 20v2"/>
    </svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const pinIcon = (color: string) =>
  new L.DivIcon({
    className: 'custom-pin-marker',
    html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22c0-7.732-6.268-14-14-14z" fill="${color}"/>
      <circle cx="14" cy="14" r="5" fill="white"/>
    </svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });

const departureIcon = pinIcon('#f59e0b');
const destinationIcon = pinIcon('#6366f1');

interface DemoMapViewProps {
  center: [number, number];
  vehiclePos: { lat: number; lng: number };
  routeLine: [number, number][];
  departure: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
  vehicleType: string;
  driverName: string;
  statusLabel: string;
  statusColor: string;
}

export default function DemoMapView({
  center,
  vehiclePos,
  routeLine,
  departure,
  destination,
  vehicleType,
  driverName,
  statusLabel,
  statusColor,
}: DemoMapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height: '100%', background: '#0f172a', borderRadius: 16 }} />;
  }

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: 16 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={routeLine}
        pathOptions={{ color: '#10b981', weight: 4, opacity: 0.8, dashArray: '6 6' }}
      />

      <Marker position={[departure.lat, departure.lng]} icon={departureIcon}>
        <Popup>
          <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700 }}>
            🟠 {departure.name}
          </div>
        </Popup>
      </Marker>

      <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
        <Popup>
          <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700 }}>
            📍 {destination.name}
          </div>
        </Popup>
      </Marker>

      <Marker position={[vehiclePos.lat, vehiclePos.lng]} icon={busIcon}>
        <Popup>
          <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700 }}>
            🚌 {vehicleType} · {driverName}
            <br />
            <span style={{ color: statusColor, fontSize: 12 }}>{statusLabel}</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
