'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation, Bus, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import dynamic from 'next/dynamic';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
import L from 'leaflet';

// Custom car icon
const createCarIcon = () => {
  return L.divIcon({
    className: 'custom-car-icon',
    html: `
      <div style="
        background: linear-gradient(135deg, #10b981, #059669);
        border: 3px solid #ffffff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
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
};

// Custom start/end icons
const createStartIcon = () => {
  return L.divIcon({
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
};

const createEndIcon = () => {
  return L.divIcon({
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
};

export default function TripTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();
  const bookingId = params.bookingId as string;
  
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([35.1911, -0.6156]); // Default Sidi Bel Abbes
  const [routeProgress, setRouteProgress] = useState(0);
  const [timeUntilDeparture, setTimeUntilDeparture] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(30); // minutes
  const [tripStatus, setTripStatus] = useState<'waiting' | 'departed' | 'arrived'>('waiting');

  const isAr = language === 'ar';

  // Simulated route coordinates (Sidi Bel Abbes area)
  const routeCoordinates: [number, number][] = [
    [35.1911, -0.6156], // Start
    [35.1950, -0.6200],
    [35.2000, -0.6250],
    [35.2050, -0.6300],
    [35.2100, -0.6350], // End
  ];

  useEffect(() => {
    if (!bookingId || !user?.id) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'bookings', bookingId),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.userId === user.id) {
            setBooking({ id: docSnap.id, ...data });
            
            // Calculate time until departure
            const departureTime = new Date(`${data.date}T${data.time}`);
            const now = new Date();
            const diff = departureTime.getTime() - now.getTime();
            const minutesUntil = Math.floor(diff / (1000 * 60));
            
            setTimeUntilDeparture(minutesUntil);
            
            // Set trip status based on booking status and time
            if (data.status === 'started') {
              setTripStatus('departed');
            } else if (minutesUntil <= 0 && data.status === 'assigned') {
              setTripStatus('departed');
            } else {
              setTripStatus('waiting');
            }
          } else {
            setError(isAr ? 'غير مصرح لك بالوصول إلى هذه الرحلة' : 'Non autorisé à accéder à ce trajet');
          }
        } else {
          setError(isAr ? 'لم يتم العثور على الرحلة' : 'Trajet introuvable');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching booking:', err);
        setError(isAr ? 'حدث خطأ أثناء تحميل الرحلة' : 'Erreur lors du chargement du trajet');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [bookingId, user?.id, isAr]);

  // Update car position based on time
  useEffect(() => {
    if (!booking || tripStatus === 'waiting') return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsed = prev + 1;
        const progress = Math.min((newElapsed / estimatedDuration) * 100, 100);
        setRouteProgress(progress);
        
        // Update car position along route
        const routeIndex = Math.floor((progress / 100) * (routeCoordinates.length - 1));
        const nextIndex = Math.min(routeIndex + 1, routeCoordinates.length - 1);
        const segmentProgress = ((progress / 100) * (routeCoordinates.length - 1)) - routeIndex;
        
        if (routeCoordinates[routeIndex] && routeCoordinates[nextIndex]) {
          const lat = routeCoordinates[routeIndex][0] + (routeCoordinates[nextIndex][0] - routeCoordinates[routeIndex][0]) * segmentProgress;
          const lng = routeCoordinates[routeIndex][1] + (routeCoordinates[nextIndex][1] - routeCoordinates[routeIndex][1]) * segmentProgress;
          setCurrentPosition([lat, lng]);
        }
        
        if (progress >= 100) {
          setTripStatus('arrived');
          clearInterval(interval);
        }
        
        return newElapsed;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [booking, tripStatus, estimatedDuration]);

  // Update countdown timer
  useEffect(() => {
    if (tripStatus !== 'waiting' || timeUntilDeparture === null) return;

    const interval = setInterval(() => {
      setTimeUntilDeparture((prev) => {
        if (prev === null || prev <= 0) {
          setTripStatus('departed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tripStatus, timeUntilDeparture]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <DashboardLayout role="user" videoOverlay>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-gray-600">{isAr ? 'جاري التحميل...' : 'Chargement...'}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="user" videoOverlay>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 border border-gray-200 max-w-md text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isAr ? 'خطأ' : 'Erreur'}
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.back()} variant="outline">
              {isAr ? 'رجوع' : 'Retour'}
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="user" videoOverlay>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isAr ? 'تتبع الرحلة' : 'Suivi du trajet'}
            </h1>
            <p className="text-gray-600">
              {booking?.fromPoint} → {booking?.toDestination}
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trip Status */}
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              {tripStatus === 'waiting' && <Clock className="w-6 h-6 text-orange-500" />}
              {tripStatus === 'departed' && <Navigation className="w-6 h-6 text-blue-500" />}
              {tripStatus === 'arrived' && <CheckCircle className="w-6 h-6 text-green-500" />}
              <h3 className="font-bold text-gray-900">
                {isAr ? 'حالة الرحلة' : 'Statut du trajet'}
              </h3>
            </div>
            <p className="text-2xl font-bold">
              {tripStatus === 'waiting' && isAr ? 'في الانتظار' : tripStatus === 'waiting' ? 'En attente' : ''}
              {tripStatus === 'departed' && isAr ? 'في الطريق' : tripStatus === 'departed' ? 'En route' : ''}
              {tripStatus === 'arrived' && isAr ? 'وصلت' : tripStatus === 'arrived' ? 'Arrivé' : ''}
            </p>
          </Card>

          {/* Time Until Departure */}
          {tripStatus === 'waiting' && timeUntilDeparture !== null && (
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-gray-900">
                  {isAr ? 'الوقت المتبقي للانطلاق' : 'Temps restant'}
                </h3>
              </div>
              <p className="text-2xl font-bold text-primary">
                {formatTime(timeUntilDeparture)}
              </p>
            </Card>
          )}

          {/* Elapsed Time */}
          {tripStatus === 'departed' && (
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Navigation className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold text-gray-900">
                  {isAr ? 'الوقت المنقضي' : 'Temps écoulé'}
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-500">
                {formatSeconds(elapsedTime)}
              </p>
            </Card>
          )}

          {/* Remaining Time */}
          {tripStatus === 'departed' && (
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-gray-900">
                  {isAr ? 'الوقت المتبقي' : 'Temps restant'}
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-500">
                {formatSeconds(Math.max(0, estimatedDuration * 60 - elapsedTime))}
              </p>
            </Card>
          )}

          {/* Progress */}
          {tripStatus === 'departed' && (
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Bus className="w-6 h-6 text-purple-500" />
                <h3 className="font-bold text-gray-900">
                  {isAr ? 'التقدم' : 'Progression'}
                </h3>
              </div>
              <p className="text-2xl font-bold text-purple-500">
                {routeProgress.toFixed(0)}%
              </p>
            </Card>
          )}
        </div>

        {/* Map */}
        <Card className="p-4 border border-gray-200 overflow-hidden">
          <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <MapContainer
              center={currentPosition}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={routeCoordinates}
                color="#10b981"
                weight={4}
                opacity={0.8}
              />
              <Marker position={routeCoordinates[0]} icon={createStartIcon()} />
              <Marker position={routeCoordinates[routeCoordinates.length - 1]} icon={createEndIcon()} />
              <Marker position={currentPosition} icon={createCarIcon()} />
            </MapContainer>
          </div>
        </Card>

        {/* Trip Details */}
        <Card className="p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">
            {isAr ? 'تفاصيل الرحلة' : 'Détails du trajet'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{isAr ? 'نقطة الانطلاق' : 'Point de départ'}</p>
                <p className="font-bold">{booking?.fromPoint}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">{isAr ? 'الوجهة' : 'Destination'}</p>
                <p className="font-bold">{booking?.toDestination}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">{isAr ? 'وقت الانطلاق' : 'Heure de départ'}</p>
                <p className="font-bold">{booking?.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bus className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">{isAr ? 'المركبة' : 'Véhicule'}</p>
                <p className="font-bold">{booking?.vehicleType || 'حافلة'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
