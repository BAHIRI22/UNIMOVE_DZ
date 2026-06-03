export interface PricingResult {
  estimatedDistanceKm: number;
  estimatedTravelTimeMins: number;
  basePrice: number;
  distancePrice: number;
  subtotal: number;
  transportNatureMultiplier: number;
  discounts: {
    studentVerified: boolean;
    activeSubscription: boolean;
    groupDiscountPercent: number;
    roundTripDiscountPercent: number;
    specialNeedsPercent: number;
  };
  totalDiscountsPercent: number;
  estimatedPrice: number;
  pricingDetailsAr: string;
  pricingDetailsFr: string;
  discountDetailsAr: string;
  discountDetailsFr: string;
}

export type TransportNature =
  | 'individual'
  | 'shared'
  | 'group'
  | 'daily_university'
  | 'private'
  | 'vip'
  | 'night'
  | 'accessible'
  | 'teacher'
  | 'scientific_event'
  | 'airport_transfer'
  | 'port_transfer';

export const TRANSPORT_NATURE_OPTIONS: { value: TransportNature; labelAr: string; labelFr: string; multiplier: number }[] = [
  { value: 'individual', labelAr: 'نقل فردي', labelFr: 'Individual transport', multiplier: 1.25 },
  { value: 'shared', labelAr: 'نقل مشترك', labelFr: 'Shared transport', multiplier: 0.9 },
  { value: 'group', labelAr: 'نقل جماعي', labelFr: 'Group transport', multiplier: 0.85 },
  { value: 'daily_university', labelAr: 'نقل جامعي يومي', labelFr: 'Daily university shuttle', multiplier: 1.0 },
  { value: 'private', labelAr: 'نقل خاص', labelFr: 'Private transport', multiplier: 1.3 },
  { value: 'vip', labelAr: 'نقل VIP', labelFr: 'VIP transport', multiplier: 1.5 },
  { value: 'night', labelAr: 'نقل ليلي', labelFr: 'Night transport', multiplier: 1.2 },
  { value: 'accessible', labelAr: 'نقل مهيأ لذوي الاحتياجات الخاصة', labelFr: 'Accessible transport', multiplier: 1.2 },
  { value: 'teacher', labelAr: 'نقل للأساتذة', labelFr: 'Teacher transport', multiplier: 1.15 },
  { value: 'scientific_event', labelAr: 'نقل للمناسبات العلمية', labelFr: 'Scientific event transport', multiplier: 1.2 },
  { value: 'airport_transfer', labelAr: 'نقل للمطارات', labelFr: 'Airport transfer', multiplier: 1.2 },
  { value: 'port_transfer', labelAr: 'نقل للموانئ', labelFr: 'Port transfer', multiplier: 1.2 },
];

export function getTransportNatureMultiplier(nature: TransportNature): number {
  const found = TRANSPORT_NATURE_OPTIONS.find((o) => o.value === nature);
  return found ? found.multiplier : 1.0;
}

export function recommendVehicle(passengersCount: number): {
  type: 'car' | 'minibus' | 'bus';
  labelAr: string;
  labelFr: string;
  capacityTextAr: string;
  capacityTextFr: string;
} {
  if (passengersCount <= 4) {
    return {
      type: 'car',
      labelAr: 'سيارة',
      labelFr: 'Voiture',
      capacityTextAr: 'سعة 1 إلى 4 ركاب (سريعة ومرنة)',
      capacityTextFr: 'Capacité 1 à 4 passagers (Rapide et Flexible)',
    };
  } else if (passengersCount <= 18) {
    return {
      type: 'minibus',
      labelAr: 'حافلة صغيرة',
      labelFr: 'Mini Bus',
      capacityTextAr: 'سعة 5 إلى 18 راكباً (نقل شبه جماعي)',
      capacityTextFr: 'Capacité 5 à 18 passagers (Semi-collectif)',
    };
  } else {
    return {
      type: 'bus',
      labelAr: 'حافلة كبيرة',
      labelFr: 'Bus',
      capacityTextAr: 'سعة 19 إلى 60 راكباً (نقل جماعي اقتصادي)',
      capacityTextFr: 'Capacité 19 à 60 passagers (Collectif économique)',
    };
  }
}

export function calculateEstimatedDistanceAndTime(category: string): {
  distanceKm: number;
  timeMins: number;
} {
  switch (category) {
    case 'daily_university':
      return { distanceKm: 5, timeMins: 15 };
    case 'inter_commune':
      return { distanceKm: 8, timeMins: 20 };
    case 'inter_daira':
      return { distanceKm: 18, timeMins: 35 };
    case 'inter_wilaya':
      return { distanceKm: 120, timeMins: 110 };
    case 'airport_transfer':
      return { distanceKm: 80, timeMins: 75 };
    case 'port_transfer':
      return { distanceKm: 65, timeMins: 60 };
    case 'scientific_event':
    case 'conference_trip':
      return { distanceKm: 50, timeMins: 45 };
    case 'sport_event':
    case 'cultural_event':
      return { distanceKm: 35, timeMins: 35 };
    case 'tourism_trip':
      return { distanceKm: 140, timeMins: 130 };
    case 'competition_trip':
    case 'internship_trip':
      return { distanceKm: 90, timeMins: 85 };
    case 'special_trip':
    case 'group_trip':
    case 'recurring_trip':
    default:
      return { distanceKm: 40, timeMins: 45 };
  }
}

export function calculateDynamicPricing(params: {
  vehicleType: 'car' | 'minibus' | 'bus';
  tripCategory: string;
  passengersCount: number;
  isStudentVerified: boolean;
  isSubscriptionActive: boolean;
  isRoundTrip: boolean;
  transportNature?: TransportNature;
  isSpecialNeeds?: boolean;
}): PricingResult {
  const {
    vehicleType,
    tripCategory,
    passengersCount = 1,
    isStudentVerified = false,
    isSubscriptionActive = false,
    isRoundTrip = false,
    transportNature = 'daily_university',
    isSpecialNeeds = false,
  } = params;

  // 1. Get Distance and Travel Time
  const { distanceKm, timeMins } = calculateEstimatedDistanceAndTime(tripCategory);

  // 2. Base Price by Category
  let basePrice = 80; // Default
  switch (tripCategory) {
    case 'daily_university':
      basePrice = 80;
      break;
    case 'inter_commune':
      basePrice = 150;
      break;
    case 'inter_daira':
      basePrice = 250;
      break;
    case 'inter_wilaya':
      basePrice = 500;
      break;
    case 'airport_transfer':
    case 'port_transfer':
      basePrice = 1000;
      break;
    case 'scientific_event':
    case 'sport_event':
    case 'cultural_event':
    case 'conference_trip':
    case 'competition_trip':
    case 'internship_trip':
      basePrice = 800;
      break;
    case 'tourism_trip':
      basePrice = 1200;
      break;
    case 'special_trip':
    case 'group_trip':
    case 'recurring_trip':
    default:
      basePrice = 600;
      break;
  }

  // 3. Price per KM by Vehicle Type
  // Voiture: 35 DA/km, Mini Bus: 25 DA/km, Bus: 18 DA/km
  let pricePerKm = 18;
  if (vehicleType === 'car') {
    pricePerKm = 35;
  } else if (vehicleType === 'minibus') {
    pricePerKm = 25;
  }

  const distancePrice = distanceKm * pricePerKm;
  let subtotal = basePrice + distancePrice;

  // 4. Round trip multiplier (single * 1.8)
  if (isRoundTrip) {
    subtotal = subtotal * 1.8;
  }

  // 5. Calculate Discounts
  let totalDiscountsPercent = 0;
  const discountDetailsListAr: string[] = [];
  const discountDetailsListFr: string[] = [];

  if (isStudentVerified) {
    totalDiscountsPercent += 10;
    discountDetailsListAr.push('خصم طالب موثق (-10%)');
    discountDetailsListFr.push('Étudiant vérifié (-10%)');
  }

  if (isSubscriptionActive) {
    totalDiscountsPercent += 15;
    discountDetailsListAr.push('خصم اشتراك نشط (-15%)');
    discountDetailsListFr.push('Abonnement actif (-15%)');
  }

  if (isSpecialNeeds) {
    totalDiscountsPercent += 50;
    discountDetailsListAr.push('خصم ذوي الاحتياجات الخاصة (-50%)');
    discountDetailsListFr.push('Réduction handicap (-50%)');
  }

  // Group size discount
  let groupDiscountPercent = 0;
  if (passengersCount >= 20) {
    groupDiscountPercent = 20;
    totalDiscountsPercent += 20;
    discountDetailsListAr.push('خصم مجموعة كبرى ≥ 20 (-20%)');
    discountDetailsListFr.push('Grand groupe ≥ 20 (-20%)');
  } else if (passengersCount >= 5) {
    groupDiscountPercent = 10;
    totalDiscountsPercent += 10;
    discountDetailsListAr.push('خصم مجموعة ≥ 5 (-10%)');
    discountDetailsListFr.push('Groupe ≥ 5 (-10%)');
  }

  // Apply transport nature multiplier
  const transportNatureMultiplier = getTransportNatureMultiplier(transportNature);
  subtotal = subtotal * transportNatureMultiplier;

  // Calculate final price with discounts
  let estimatedPrice = 0;
  if (isSubscriptionActive) {
    estimatedPrice = 0;
    totalDiscountsPercent = 100;
  } else {
    const discountAmount = subtotal * (totalDiscountsPercent / 100);
    estimatedPrice = subtotal - discountAmount;

    // Minimum price restriction (100 DA)
    if (estimatedPrice < 100) {
      estimatedPrice = 100;
    }

    // Round to nearest 5 DA
    estimatedPrice = Math.round(estimatedPrice / 5) * 5;
  }

  // Build Arabic & French Descriptions
  const vehicleLabelAr = vehicleType === 'car' ? 'سيارة' : vehicleType === 'minibus' ? 'حافلة صغيرة' : 'حافلة كبيرة';
  const vehicleLabelFr = vehicleType === 'car' ? 'Voiture' : vehicleType === 'minibus' ? 'Mini Bus' : 'Bus';

  const pricingDetailsAr = isSubscriptionActive
    ? 'هذه الرحلة مشمولة بالكامل ومجانية ضمن اشتراكك النشط في UNIMOVE-DZ.'
    : `السعر الأساسي للمسار: ${basePrice} د.ج + تكلفة المسافة (${distanceKm} كم × ${pricePerKm} د.ج) = ${basePrice + distancePrice} د.ج${isRoundTrip ? ' (× 1.8 للذهاب والإياب)' : ''}.`;
  const pricingDetailsFr = isSubscriptionActive
    ? 'Ce trajet est entièrement inclus et gratuit dans votre abonnement actif UNIMOVE-DZ.'
    : `Prix de base : ${basePrice} DA + Distance (${distanceKm} km × ${pricePerKm} DA/km) = ${basePrice + distancePrice} DA${isRoundTrip ? ' (× 1.8 Aller-Retour)' : ''}.`;

  const discountDetailsAr = isSubscriptionActive
    ? 'تم تطبيق خصم الاشتراك الفعال بنسبة 100% (رحلة مجانية).'
    : discountDetailsListAr.length > 0
      ? `تخفيضات مطبقة: ${discountDetailsListAr.join(' + ')} (إجمالي الخصم: -${totalDiscountsPercent}%)`
      : 'لا توجد تخفيضات مطبقة على هذا الطلب.';
  const discountDetailsFr = isSubscriptionActive
    ? "Remise d'abonnement actif de 100% appliquée (trajet gratuit)."
    : discountDetailsListFr.length > 0
      ? `Réductions appliquées : ${discountDetailsListFr.join(' + ')} (Total : -${totalDiscountsPercent}%)`
      : 'Aucune réduction appliquée à cette demande.';

  return {
    estimatedDistanceKm: distanceKm,
    estimatedTravelTimeMins: timeMins,
    basePrice,
    distancePrice,
    subtotal,
    transportNatureMultiplier,
    discounts: {
      studentVerified: isStudentVerified,
      activeSubscription: isSubscriptionActive,
      groupDiscountPercent,
      roundTripDiscountPercent: isRoundTrip ? 10 : 0, // logical reference
      specialNeedsPercent: isSpecialNeeds ? 50 : 0,
    },
    totalDiscountsPercent,
    estimatedPrice,
    pricingDetailsAr,
    pricingDetailsFr,
    discountDetailsAr,
    discountDetailsFr,
  };
}
