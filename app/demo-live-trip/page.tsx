'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { calculateETA, formatETAMessage } from '@/lib/eta';
import {
  Navigation,
  ArrowRight,
  Bus,
  MapPin,
  Clock,
  Route,
  Activity,
  Radio,
  User,
  RotateCcw,
  Play,
  CheckCircle2,
  Gauge,
} from 'lucide-react';

const DemoMapView = dynamic(() => import('./DemoMapView'), { ssr: false });

// ── Demo constants ──────────────────────────────────────────────

const DEPARTURE = { lat: 35.05, lng: -0.8, name: 'سفيزف' };
const DESTINATION = {
  lat: 34.86,
  lng: -0.63,
  name: 'جامعة جيلالي ليابيس - سيدي بلعباس',
};

const DRIVER_NAME = 'محمد العربي';
const VEHICLE_TYPE = 'Mini Bus';
const PLATE_NUMBER = 'H-12345-25';

const TOTAL_STEPS = 20; // 20 × 3s = 60s total demo
const UPDATE_INTERVAL_MS = 3000;
const AVG_SPEED_KMH = 45;

type DemoStatus =
  | 'assigned'
  | 'driver_on_way'
  | 'arrived_pickup'
  | 'started'
  | 'near_destination'
  | 'completed';

const STATUS_LABELS: Record<DemoStatus, string> = {
  assigned: 'تم التعيين',
  driver_on_way: 'السائق في الطريق',
  arrived_pickup: 'وصل لنقطة الانطلاق',
  started: 'الرحلة بدأت',
  near_destination: 'بالقرب من الوجهة',
  completed: 'اكتملت الرحلة',
};

const STATUS_COLORS: Record<DemoStatus, string> = {
  assigned: '#f59e0b',
  driver_on_way: '#3b82f6',
  arrived_pickup: '#8b5cf6',
  started: '#10b981',
  near_destination: '#06b6d4',
  completed: '#059669',
};

// ── Helpers ───────────────────────────────────────────────────

function generateWaypoints(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  count: number
) {
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const curve = Math.sin(t * Math.PI) * 0.018;
    pts.push({
      lat: start.lat + (end.lat - start.lat) * t + curve,
      lng: start.lng + (end.lng - start.lng) * t,
    });
  }
  return pts;
}

function getStatusForProgress(pct: number): DemoStatus {
  if (pct >= 100) return 'completed';
  if (pct >= 85) return 'near_destination';
  if (pct >= 40) return 'started';
  if (pct >= 25) return 'arrived_pickup';
  if (pct >= 5) return 'driver_on_way';
  return 'assigned';
}

function formatRemainingTime(minutes: number): string {
  if (minutes <= 0) return 'وصلنا!';
  if (minutes < 1) return 'أقل من دقيقة';
  return `${minutes} دقيقة`;
}

// ── Component ─────────────────────────────────────────────────

export default function DemoLiveTripPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<DemoStatus>('assigned');
  const [vehiclePos, setVehiclePos] = useState({ lat: DEPARTURE.lat, lng: DEPARTURE.lng });
  const [remainingKm, setRemainingKm] = useState(0);
  const [remainingMin, setRemainingMin] = useState(0);
  const [etaInfo, setEtaInfo] = useState<{ distanceKm: number; etaMinutes: number } | null>(null);

  const waypoints = useRef(generateWaypoints(DEPARTURE, DESTINATION, TOTAL_STEPS));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate total distance once
  const totalDistance = useRef(
    calculateETA(DEPARTURE.lat, DEPARTURE.lng, DESTINATION.lat, DESTINATION.lng, AVG_SPEED_KMH)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMetrics = useCallback(
    (currentStep: number) => {
      const pos = waypoints.current[currentStep];
      const pct = Math.round((currentStep / TOTAL_STEPS) * 100);
      const newStatus = getStatusForProgress(pct);

      const eta = calculateETA(pos.lat, pos.lng, DESTINATION.lat, DESTINATION.lng, AVG_SPEED_KMH);

      setVehiclePos(pos);
      setProgress(pct);
      setStatus(newStatus);
      setRemainingKm(eta.distanceKm);
      setRemainingMin(eta.etaMinutes);
      setEtaInfo(eta);
    },
    []
  );

  const startDemo = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(true);
    setStep(0);
    updateMetrics(0);

    let currentStep = 0;
    intervalRef.current = setInterval(() => {
      currentStep += 1;
      if (currentStep > TOTAL_STEPS) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setRunning(false);
        setProgress(100);
        setStatus('completed');
        setVehiclePos(DESTINATION);
        setRemainingKm(0);
        setRemainingMin(0);
        setEtaInfo({ distanceKm: 0, etaMinutes: 0 });
        return;
      }
      setStep(currentStep);
      updateMetrics(currentStep);
    }, UPDATE_INTERVAL_MS);
  }, [updateMetrics]);

  const resetDemo = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setStep(0);
    setProgress(0);
    setStatus('assigned');
    setVehiclePos(DEPARTURE);
    setRemainingKm(totalDistance.current.distanceKm);
    setRemainingMin(totalDistance.current.etaMinutes);
    setEtaInfo(totalDistance.current);
  }, []);

  useEffect(() => {
    // init metrics
    setRemainingKm(totalDistance.current.distanceKm);
    setRemainingMin(totalDistance.current.etaMinutes);
    setEtaInfo(totalDistance.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const routeLine = waypoints.current.map((p) => [p.lat, p.lng] as [number, number]);
  const mapCenter: [number, number] = [vehiclePos.lat, vehiclePos.lng];
  const statusColor = STATUS_COLORS[status];

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#02100d',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-center">
          <div
            style={{
              width: 50,
              height: 50,
              border: '4px solid #10b981',
              borderTop: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}
          />
          <p className="mt-4 text-emerald-400 font-bold">جاري تحميل التتبع التجريبي...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: '100vh', background: '#02100d', color: 'white' }}
      className="p-4 md:p-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white flex items-center gap-3">
            <Navigation className="w-8 h-8 text-emerald-400" />
            تتبع الرحلة التجريبي
          </h1>
          <p className="text-sm md:text-lg text-emerald-400/80 font-bold mt-1">
            {DEPARTURE.name} ← {DESTINATION.name}
          </p>
        </div>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outline"
          className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl"
        >
          <ArrowRight className="w-5 h-5 ml-2 rotate-180" />
          العودة للوحة التحكم
        </Button>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={startDemo}
          disabled={running}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl px-6 disabled:opacity-50"
        >
          <Play className="w-5 h-5 ml-2" />
          {running ? 'جاري التشغيل...' : 'بدء الرحلة التجريبية'}
        </Button>
        <Button
          onClick={resetDemo}
          variant="outline"
          className="border-white/10 hover:bg-white/5 text-white font-bold h-12 rounded-xl px-6"
        >
          <RotateCcw className="w-5 h-5 ml-2" />
          إعادة التعيين
        </Button>
      </div>

      {/* Trip progress steps */}
      <Card className="p-5 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-md rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold opacity-60">تقدم الرحلة</span>
          <span className="text-xs font-black" style={{ color: statusColor }}>
            {STATUS_LABELS[status]}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: statusColor }}
          />
        </div>
        <div className="flex justify-between items-center">
          {(['assigned', 'driver_on_way', 'arrived_pickup', 'started', 'near_destination', 'completed'] as DemoStatus[]).map(
            (s, idx) => {
              const stepLabels: Record<DemoStatus, string> = {
                assigned: 'تعيين',
                driver_on_way: 'في الطريق',
                arrived_pickup: 'التقاط',
                started: 'انطلاق',
                near_destination: 'قريب',
                completed: 'وصول',
              };
              const isActive =
                progress >= (idx / 5) * 100 || (idx === 5 && progress >= 100);
              const isCurrent =
                idx ===
                Math.min(
                  Math.floor((progress / 100) * 6),
                  5
                );
              return (
                <div key={s} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all"
                    style={{
                      background: isActive ? STATUS_COLORS[s] : 'transparent',
                      borderColor: isActive ? STATUS_COLORS[s] : 'rgba(255,255,255,0.2)',
                      color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                      boxShadow: isCurrent ? `0 0 12px ${STATUS_COLORS[s]}80` : 'none',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-[9px] font-bold opacity-70 hidden md:block">
                    {stepLabels[s]}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </Card>

      {/* Info cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Bus className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">الحالة</p>
            <p className="text-xs font-extrabold truncate" style={{ color: statusColor }}>
              {STATUS_LABELS[status]}
            </p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <User className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">السائق</p>
            <p className="text-xs font-extrabold text-white truncate">{DRIVER_NAME}</p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">المركبة</p>
            <p className="text-xs font-extrabold text-white truncate">
              {VEHICLE_TYPE} · {PLATE_NUMBER}
            </p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Clock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">الوصول المتوقع</p>
            <p className="text-xs font-extrabold text-white truncate">
              {etaInfo ? formatETAMessage(etaInfo.etaMinutes, 'ar') : '---'}
            </p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Route className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">المسافة المتبقية</p>
            <p className="text-xs font-extrabold text-white truncate">
              {remainingKm.toFixed(1)} كم
            </p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Gauge className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">السرعة</p>
            <p className="text-xs font-extrabold text-white truncate">
              {running ? `${AVG_SPEED_KMH} كم/س` : '0 كم/س'}
            </p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Activity className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">التقدم</p>
            <p className="text-xs font-extrabold text-white truncate">{progress}%</p>
          </div>
        </Card>

        <Card className="p-4 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl flex items-center gap-3">
          <Radio className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] opacity-60 font-bold truncate">الوقت المتبقي</p>
            <p className="text-xs font-extrabold text-white truncate">
              {formatRemainingTime(remainingMin)}
            </p>
          </div>
        </Card>
      </div>

      {/* Map */}
      <Card
        className="border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden mb-6"
        style={{ height: '55vh', minHeight: 350 }}
      >
        <DemoMapView
          center={mapCenter}
          vehiclePos={vehiclePos}
          routeLine={routeLine}
          departure={DEPARTURE}
          destination={DESTINATION}
          vehicleType={VEHICLE_TYPE}
          driverName={DRIVER_NAME}
          statusLabel={STATUS_LABELS[status]}
          statusColor={statusColor}
        />
      </Card>

      {/* Live update banner */}
      <Card className="p-5 border-2 border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-emerald-400" />
          <p className="text-xs opacity-60 font-bold">معلومات الرحلة التجريبية</p>
          <span className="mr-auto flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <Radio className="w-3 h-3" /> LIVE
          </span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          <span>Lat: {vehiclePos.lat.toFixed(5)}</span>
          <span>Lng: {vehiclePos.lng.toFixed(5)}</span>
          <span>السرعة: {running ? AVG_SPEED_KMH : 0} كم/س</span>
          <span>الخطوة: {step} / {TOTAL_STEPS}</span>
          {status === 'completed' && (
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              تم إنجاز الرحلة بنجاح
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
