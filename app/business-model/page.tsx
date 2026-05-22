'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Cog, 
  Sparkles, 
  Heart, 
  Users, 
  Database, 
  Share2, 
  DollarSign, 
  TrendingUp,
  GraduationCap,
  Car,
  Wifi,
  MapPin,
  Smartphone,
  MessageCircle,
  Star,
  Shield,
  Clock,
  Zap,
  Globe,
  Cloud,
  Server,
  Truck,
  Wrench,
  CreditCard,
  Plane,
  Umbrella,
  Building,
  Factory,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Fuel,
  Ticket,
  Bell,
  Trophy,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BusinessModelPage() {
  const { language } = useLanguage();

  const partners = [
    { icon: GraduationCap, name: language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª' : 'UniversitÃ©s', desc: language === 'ar' ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©' : 'Partenariats stratÃ©giques' },
    { icon: Car, name: language === 'ar' ? 'Ù…Ø³ØªØ«Ù…Ø±Ùˆ Ø§Ù„Ù†Ù‚Ù„' : 'Investisseurs transport', desc: language === 'ar' ? 'ØªÙ…ÙˆÙŠÙ„ Ø£Ø³Ø·ÙˆÙ„' : 'Financement flotte' },
    { icon: Umbrella, name: language === 'ar' ? 'Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ†' : 'SociÃ©tÃ©s assurances', desc: language === 'ar' ? 'ØªØºØ·ÙŠØ© Ø´Ø§Ù…Ù„Ø©' : 'Couverture complÃ¨te' },
    { icon: Cloud, name: language === 'ar' ? 'Ø§Ù„Ø³Ø­Ø§Ø¨Ø©/Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª' : 'Cloud/Software', desc: language === 'ar' ? 'Ø¨Ù†ÙŠØ© ØªØ­ØªÙŠØ©' : 'Infrastructure' },
    { icon: Wrench, name: language === 'ar' ? 'Ø§Ù„ØµÙŠØ§Ù†Ø©' : 'Maintenance', desc: language === 'ar' ? 'Ø®Ø¯Ù…Ø§Øª ÙÙ†ÙŠØ©' : 'Services techniques' },
    { icon: Phone, name: language === 'ar' ? 'Ø§Ù„Ø§ØªØµØ§Ù„Ø§Øª' : 'TÃ©lÃ©communications', desc: language === 'ar' ? 'Ø§ØªØµØ§Ù„ Ù…Ø³ØªÙ…Ø±' : 'ConnectivitÃ© continue' },
    { icon: Wifi, name: language === 'ar' ? 'Ù…Ø²ÙˆØ¯ÙŠ Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª' : 'Fournisseurs internet', desc: language === 'ar' ? 'Wi-Fi Ø¹Ø§Ù„ÙŠ Ø§Ù„Ø³Ø±Ø¹Ø©' : 'Wi-Fi haute vitesse' },
    { icon: CreditCard, name: language === 'ar' ? 'Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' : 'Paiement Ã©lectronique', desc: language === 'ar' ? 'Ø­Ù„ÙˆÙ„ Ø¯ÙØ¹' : 'Solutions paiement' },
    { icon: Plane, name: language === 'ar' ? 'Ø§Ù„Ø³ÙŠØ§Ø­Ø©' : 'Tourisme', desc: language === 'ar' ? 'Ø±Ø­Ù„Ø§Øª Ø³ÙŠØ§Ø­ÙŠØ©' : 'Voyages touristiques' },
  ];

  const activities = [
    { icon: Smartphone, name: language === 'ar' ? 'ØªØ·Ø¨ÙŠÙ‚ Android/iOS' : 'App Android/iOS', desc: language === 'ar' ? 'ØªØ·Ø¨ÙŠÙ‚ Ù…ÙˆØ¨Ø§ÙŠÙ„' : 'Application mobile' },
    { icon: Globe, name: language === 'ar' ? 'Ù…Ù†ØµØ© ÙˆÙŠØ¨' : 'Plateforme web', desc: language === 'ar' ? 'Ø¨ÙˆØ§Ø¨Ø© Ø±Ù‚Ù…ÙŠØ©' : 'Portail numÃ©rique' },
    { icon: MapPin, name: language === 'ar' ? 'Ø­Ø¬Ø² Ø°ÙƒÙŠ' : 'RÃ©servation intelligente', desc: language === 'ar' ? 'Ù†Ø¸Ø§Ù… Ø­Ø¬Ø²' : 'SystÃ¨me rÃ©servation' },
    { icon: MapPin, name: language === 'ar' ? 'ØªØªØ¨Ø¹ GPS' : 'GPS tracking', desc: language === 'ar' ? 'Ù…ÙˆÙ‚Ø¹ ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ' : 'Position temps rÃ©el' },
    { icon: Bell, name: language === 'ar' ? 'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª' : 'Notifications', desc: language === 'ar' ? 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø°ÙƒÙŠØ©' : 'Alertes intelligentes' },
    { icon: Users, name: language === 'ar' ? 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø³Ø§Ø¦Ù‚ÙŠÙ†' : 'Gestion chauffeurs', desc: language === 'ar' ? 'ÙØ±ÙŠÙ‚ Ù…Ø­ØªØ±Ù' : 'Ã‰quipe professionnelle' },
    { icon: Car, name: language === 'ar' ? 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø±Ø­Ù„Ø§Øª' : 'Gestion trajets', desc: language === 'ar' ? 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª' : 'Optimisation itinÃ©raires' },
    { icon: Wrench, name: language === 'ar' ? 'Ø§Ù„ØµÙŠØ§Ù†Ø©' : 'Maintenance', desc: language === 'ar' ? 'ØµÙŠØ§Ù†Ø© Ø¯ÙˆØ±ÙŠØ©' : 'Maintenance prÃ©ventive' },
    { icon: CreditCard, name: language === 'ar' ? 'Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' : 'Paiement Ã©lectronique', desc: language === 'ar' ? 'Ø¯ÙØ¹ Ø¢Ù…Ù†' : 'Paiement sÃ©curisÃ©' },
    { icon: DollarSign, name: language === 'ar' ? 'Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù†Ù‚Ø¯ÙŠ' : 'Paiement cash', desc: language === 'ar' ? 'Ø®ÙŠØ§Ø±Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø©' : 'Options multiples' },
    { icon: MessageCircle, name: language === 'ar' ? 'Ø¯Ø¹Ù… Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡' : 'Support client', desc: language === 'ar' ? 'Ø®Ø¯Ù…Ø© 24/7' : 'Service 24/7' },
    { icon: TrendingUp, name: language === 'ar' ? 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚' : 'Marketing', desc: language === 'ar' ? 'Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª Ù†Ù…Ùˆ' : 'StratÃ©gies croissance' },
  ];

  const valueProposition = [
    { icon: Shield, name: language === 'ar' ? 'Ø­Ø¬Ø² Ù…Ø¶Ù…ÙˆÙ†' : 'RÃ©servation garantie', desc: language === 'ar' ? 'Ø¶Ù…Ø§Ù† Ø§Ù„Ù…Ù‚Ø¹Ø¯' : 'Garantie siÃ¨ge' },
    { icon: Heart, name: language === 'ar' ? 'ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„ØªÙˆØªØ±' : 'RÃ©duction stress', desc: language === 'ar' ? 'Ø±Ø§Ø­Ø© Ø°Ù‡Ù†ÙŠØ©' : 'SÃ©rÃ©nitÃ© mentale' },
    { icon: Clock, name: language === 'ar' ? 'ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„ØªØ£Ø®ÙŠØ±' : 'RÃ©duction retards', desc: language === 'ar' ? 'Ø§Ù„ÙˆØµÙˆÙ„ ÙÙŠ Ø§Ù„ÙˆÙ‚Øª' : 'ArrivÃ©e Ã  temps' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi Ù…Ø¯Ù…Ø¬' : 'Wi-Fi embarquÃ©', desc: language === 'ar' ? 'Ø¥Ù†ØªØ±Ù†Øª Ø¹Ø§Ù„ÙŠ Ø§Ù„Ø³Ø±Ø¹Ø©' : 'Internet haute vitesse' },
    { icon: Bell, name: language === 'ar' ? 'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø°ÙƒÙŠØ©' : 'Notifications intelligentes', desc: language === 'ar' ? 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ' : 'Alertes temps rÃ©el' },
    { icon: Shield, name: language === 'ar' ? 'Ø£Ù…Ø§Ù†' : 'SÃ©curitÃ©', desc: language === 'ar' ? 'Ø±Ø­Ù„Ø§Øª Ø¢Ù…Ù†Ø©' : 'Trajets sÃ©curisÃ©s' },
    { icon: Cog, name: language === 'ar' ? 'ØªÙ†Ø¸ÙŠÙ… Ø°ÙƒÙŠ' : 'Organisation intelligente', desc: language === 'ar' ? 'Ø¥Ø¯Ø§Ø±Ø© Ù…Ø­Ø³Ù†Ø©' : 'Gestion optimisÃ©e' },
    { icon: Clock, name: language === 'ar' ? 'ØªÙˆÙÙŠØ± Ø§Ù„ÙˆÙ‚Øª' : 'Gain de temps', desc: language === 'ar' ? 'ÙƒÙØ§Ø¡Ø© Ø¹Ø§Ù„ÙŠØ©' : 'Haute efficacitÃ©' },
    { icon: Smartphone, name: language === 'ar' ? 'Ø¨Ø·Ø§Ù‚Ø© QR' : 'QR transport card', desc: language === 'ar' ? 'ÙˆØµÙˆÙ„ Ø³Ù‡Ù„' : 'AccÃ¨s facile' },
    { icon: CreditCard, name: language === 'ar' ? 'Ø¯ÙØ¹ Ù…Ø±Ù†' : 'Paiement flexible', desc: language === 'ar' ? 'Ø®ÙŠØ§Ø±Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø©' : 'Options multiples' },
    { icon: Plane, name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ù…Ø·Ø§Ø±' : 'Transport aÃ©roport', desc: language === 'ar' ? 'Ø®Ø¯Ù…Ø© VIP' : 'Service VIP' },
    { icon: Star, name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ø£Ø­Ø¯Ø§Ø«' : 'Transport Ã©vÃ©nements', desc: language === 'ar' ? 'Ù…Ù†Ø§Ø³Ø¨Ø§Øª Ø®Ø§ØµØ©' : 'Ã‰vÃ©nements spÃ©ciaux' },
    { icon: Plane, name: language === 'ar' ? 'Ø±Ø­Ù„Ø§Øª Ø³ÙŠØ§Ø­ÙŠØ©' : 'Voyages touristiques', desc: language === 'ar' ? 'Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±' : 'DÃ©couverte AlgÃ©rie' },
    { icon: Trophy, name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ù…Ø³Ø§Ø¨Ù‚Ø§Øª' : 'Transport compÃ©titions', desc: language === 'ar' ? 'Ø¯Ø¹Ù… Ø±ÙŠØ§Ø¶ÙŠ' : 'Support sportif' },
  ];

  const segments = [
    { icon: Users, name: language === 'ar' ? 'Ø·Ù„Ø§Ø¨ Licence' : 'Ã‰tudiants Licence', count: '60%' },
    { icon: GraduationCap, name: language === 'ar' ? 'Ø·Ù„Ø§Ø¨ Master' : 'Ã‰tudiants Master', count: '25%' },
    { icon: Award, name: language === 'ar' ? 'Ø¯ÙƒØªÙˆØ±Ø§Ù‡' : 'Doctorants', count: '5%' },
    { icon: Building2, name: language === 'ar' ? 'Ø£Ø³Ø§ØªØ°Ø©' : 'Enseignants', count: '7%' },
    { icon: Building, name: language === 'ar' ? 'Ø¥Ø¯Ø§Ø±ÙŠÙˆÙ†' : 'Administratifs', count: '2%' },
    { icon: Star, name: language === 'ar' ? 'Ø£Ù†Ø¯ÙŠØ© Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'Clubs universitaires', count: '1%' },
  ];

  const relationships = [
    { icon: MessageCircle, name: language === 'ar' ? 'Ø¯Ø¹Ù… ØªÙ‚Ù†ÙŠ' : 'Support technique', desc: language === 'ar' ? 'Ù…Ø³Ø§Ø¹Ø¯Ø© 24/7' : 'Assistance 24/7' },
    { icon: MessageCircle, name: language === 'ar' ? 'Ø¯Ø¹Ù… WhatsApp' : 'Support WhatsApp', desc: language === 'ar' ? 'ØªÙˆØ§ØµÙ„ Ø³Ø±ÙŠØ¹' : 'Communication rapide' },
    { icon: Bell, name: language === 'ar' ? 'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø°ÙƒÙŠØ©' : 'Notifications intelligentes', desc: language === 'ar' ? 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ù…ÙÙŠØ¯Ø©' : 'Alertes utiles' },
    { icon: Smartphone, name: language === 'ar' ? 'Ø¯Ø¹Ù… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'Support application', desc: language === 'ar' ? 'ØªÙˆØ¬ÙŠÙ‡ Ù…Ø³ØªÙ…Ø±' : 'Guidance continue' },
    { icon: Facebook, name: language === 'ar' ? 'Ø§Ù„Ø´Ø¨ÙƒØ§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©' : 'RÃ©seaux sociaux', desc: language === 'ar' ? 'Ù…Ø¬ØªÙ…Ø¹ Ù†Ø´Ø·' : 'CommunautÃ© active' },
    { icon: MessageCircle, name: language === 'ar' ? 'Ø¯Ø±Ø¯Ø´Ø© Ù…Ø¨Ø§Ø´Ø±Ø©' : 'Chat support', desc: language === 'ar' ? 'Ù…Ø­Ø§Ø¯Ø«Ø© ÙÙˆØ±ÙŠØ©' : 'Conversation instantanÃ©e' },
    { icon: Star, name: language === 'ar' ? 'Ù†Ø¸Ø§Ù… Ø§Ù„ØªÙ‚ÙŠÙŠÙ…' : 'SystÃ¨me notation', desc: language === 'ar' ? 'ØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø±' : 'AmÃ©lioration continue' },
    { icon: Heart, name: language === 'ar' ? 'ÙˆÙ„Ø§Ø¡ Ø§Ù„Ø·Ù„Ø§Ø¨' : 'FidÃ©lisation Ã©tudiants', desc: language === 'ar' ? 'Ø¨Ø±Ø§Ù…Ø¬ Ù…ÙƒØ§ÙØ¢Øª' : 'Programmes rÃ©compenses' },
  ];

  const resources = [
    { icon: Globe, name: language === 'ar' ? 'Ù…Ù†ØµØ© UNIMOVE-DZ' : 'Plateforme UNIMOVE-DZ', desc: language === 'ar' ? 'ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ Ù…ØªÙ‚Ø¯Ù…Ø©' : 'Technologie avancÃ©e' },
    { icon: Car, name: language === 'ar' ? 'Ø£Ø³Ø·ÙˆÙ„ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª' : 'Flotte vÃ©hicules', desc: language === 'ar' ? 'Ø­Ø¯ÙŠØ«Ø© ÙˆÙ…Ø±ÙŠØ­Ø©' : 'Modernes et confortables' },
    { icon: Users, name: language === 'ar' ? 'Ø§Ù„Ø³Ø§Ø¦Ù‚ÙˆÙ†' : 'Chauffeurs', desc: language === 'ar' ? 'Ù…Ø­ØªØ±ÙÙˆÙ† Ù…Ø¹ØªÙ…Ø¯ÙˆÙ†' : 'Professionnels certifiÃ©s' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', desc: language === 'ar' ? 'Ø¥Ù†ØªØ±Ù†Øª Ø¹Ø§Ù„ÙŠ Ø§Ù„Ø³Ø±Ø¹Ø©' : 'Internet haute vitesse' },
    { icon: MapPin, name: language === 'ar' ? 'Ù†Ø¸Ø§Ù… GPS' : 'SystÃ¨me GPS', desc: language === 'ar' ? 'ØªØªØ¨Ø¹ Ø¯Ù‚ÙŠÙ‚' : 'Suivi prÃ©cis' },
    { icon: Cloud, name: language === 'ar' ? 'Ø¨Ù†ÙŠØ© ØªØ­ØªÙŠØ© Ø³Ø­Ø§Ø¨ÙŠØ©' : 'Infrastructure cloud', desc: language === 'ar' ? 'Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙˆØ³Ø¹' : 'Scalable' },
    { icon: Database, name: language === 'ar' ? 'Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª' : 'Base de donnÃ©es', desc: language === 'ar' ? 'Ø¢Ù…Ù†Ø© ÙˆÙ…ÙˆØ«ÙˆÙ‚Ø©' : 'SÃ©curisÃ©e et fiable' },
    { icon: Cog, name: language === 'ar' ? 'Ø§Ù„ÙØ±ÙŠÙ‚ Ø§Ù„ØªÙ‚Ù†ÙŠ' : 'Ã‰quipe technique', desc: language === 'ar' ? 'Ø®Ø¨Ø±Ø§Ø¡ Ù…Ø¨Ø¯Ø¹ÙˆÙ†' : 'Experts innovants' },
    { icon: Building2, name: language === 'ar' ? 'Ø´Ø¨ÙƒØ© Ø§Ù„Ø´Ø±ÙƒØ§Ø¡' : 'RÃ©seau partenaires', desc: language === 'ar' ? 'Ø¹Ù„Ø§Ù‚Ø§Øª Ù‚ÙˆÙŠØ©' : 'Relations solides' },
  ];

  const channels = [
    { icon: Smartphone, name: language === 'ar' ? 'ØªØ·Ø¨ÙŠÙ‚ Ù…ÙˆØ¨Ø§ÙŠÙ„' : 'Application mobile', desc: language === 'ar' ? 'Android & iOS' : 'Android & iOS' },
    { icon: Globe, name: language === 'ar' ? 'ØªØ·Ø¨ÙŠÙ‚ ÙˆÙŠØ¨' : 'Application web', desc: language === 'ar' ? 'accessible partout' : 'Accessible partout' },
    { icon: MessageCircle, name: language === 'ar' ? 'SMS' : 'SMS', desc: language === 'ar' ? 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª ÙÙˆØ±ÙŠØ©' : 'Alertes instantanÃ©es' },
    { icon: Mail, name: language === 'ar' ? 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' : 'Email', desc: language === 'ar' ? 'Ø§ØªØµØ§Ù„ Ø±Ø³Ù…ÙŠ' : 'Communication formelle' },
    { icon: MessageCircle, name: language === 'ar' ? 'WhatsApp' : 'WhatsApp', desc: language === 'ar' ? 'Ù…Ø­Ø§Ø¯Ø«Ø© Ø³Ø±ÙŠØ¹Ø©' : 'Conversation rapide' },
    { icon: Facebook, name: language === 'ar' ? 'Ø§Ù„Ø´Ø¨ÙƒØ§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©' : 'RÃ©seaux sociaux', desc: language === 'ar' ? 'Facebook, Instagram, Twitter' : 'Facebook, Instagram, Twitter' },
    { icon: GraduationCap, name: language === 'ar' ? 'Ø­Ù…Ù„Ø§Øª Ø¬Ø§Ù…Ø¹ÙŠØ©' : 'Campagnes universitaires', desc: language === 'ar' ? 'ØªØ±ÙˆÙŠØ¬ Ø§Ù„Ø­Ø±Ù… Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ' : 'Promotion campus' },
    { icon: Building2, name: language === 'ar' ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª' : 'Partenariats universitÃ©s', desc: language === 'ar' ? 'ØªÙƒØ§Ù…Ù„ Ù…Ø¤Ø³Ø³ÙŠ' : 'IntÃ©gration institutionnelle' },
  ];

  const costStructure = [
    { icon: Smartphone, name: language === 'ar' ? 'ØªØ·ÙˆÙŠØ± Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'DÃ©veloppement application', value: '25%' },
    { icon: Cloud, name: language === 'ar' ? 'Ø§Ø³ØªØ¶Ø§ÙØ© Ø§Ù„Ø³Ø­Ø§Ø¨Ø©' : 'HÃ©bergement cloud', value: '15%' },
    { icon: Wifi, name: language === 'ar' ? 'Wi-Fi' : 'Wi-Fi', value: '10%' },
    { icon: Fuel, name: language === 'ar' ? 'Ø§Ù„ÙˆÙ‚ÙˆØ¯' : 'Carburant', value: '20%' },
    { icon: Wrench, name: language === 'ar' ? 'Ø§Ù„ØµÙŠØ§Ù†Ø©' : 'Maintenance', value: '12%' },
    { icon: Users, name: language === 'ar' ? 'Ø§Ù„Ø±ÙˆØ§ØªØ¨' : 'Salaires', value: '10%' },
    { icon: TrendingUp, name: language === 'ar' ? 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚' : 'Marketing', value: '5%' },
    { icon: Umbrella, name: language === 'ar' ? 'Ø§Ù„ØªØ£Ù…ÙŠÙ†Ø§Øª' : 'Assurances', value: '2%' },
    { icon: Building, name: language === 'ar' ? 'Ø§Ù„Ù…ÙƒØªØ¨' : 'Bureau', value: '1%' },
    { icon: Building, name: language === 'ar' ? 'Ø§Ù„Ø¶Ø±Ø§Ø¦Ø¨' : 'Taxes', value: '1%' },
  ];

  const revenueStreams = [
    { icon: Ticket, name: language === 'ar' ? 'Ø­Ø¬ÙˆØ²Ø§Øª Ù…Ø¨Ø§Ø´Ø±Ø©' : 'RÃ©servations directes', value: '30%' },
    { icon: Calendar, name: language === 'ar' ? 'Ø§Ø´ØªØ±Ø§Ùƒ ÙŠÙˆÙ…ÙŠ' : 'Abonnement journalier', value: '15%' },
    { icon: Calendar, name: language === 'ar' ? 'Ø§Ø´ØªØ±Ø§Ùƒ Ø£Ø³Ø¨ÙˆØ¹ÙŠ' : 'Abonnement hebdomadaire', value: '20%' },
    { icon: Calendar, name: language === 'ar' ? 'Ø§Ø´ØªØ±Ø§Ùƒ Ø´Ù‡Ø±ÙŠ' : 'Abonnement mensuel', value: '25%' },
    { icon: TrendingUp, name: language === 'ar' ? 'Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚' : 'PublicitÃ© application', value: '3%' },
    { icon: DollarSign, name: language === 'ar' ? 'Ø¹Ù…ÙˆÙ„Ø§Øª Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ†' : 'Commissions investisseurs', value: '2%' },
    { icon: Star, name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ø£Ø­Ø¯Ø§Ø«' : 'Transport Ã©vÃ©nements', value: '3%' },
    { icon: Plane, name: language === 'ar' ? 'Ù†Ù‚Ù„ Ø§Ù„Ù…Ø·Ø§Ø±' : 'Transport aÃ©roport', value: '1%' },
    { icon: Plane, name: language === 'ar' ? 'Ø±Ø­Ù„Ø§Øª Ø³ÙŠØ§Ø­ÙŠØ©' : 'Voyages touristiques', value: '1%' },
    { icon: GraduationCap, name: language === 'ar' ? 'Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª' : 'Partenariats universitÃ©s', value: '1%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-blue-50/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {language === 'ar' ? 'Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„' : 'Business Model Canvas'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {language === 'ar' ? 'UNIMOVE-DZ' : 'UNIMOVE-DZ'}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'Ù…Ù†ØµØ© Ø°ÙƒÙŠØ© Ù„Ù„Ù†Ù‚Ù„ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ - Ù†Ù…ÙˆØ°Ø¬ Ø£Ø¹Ù…Ø§Ù„ Ù…Ø¨ØªÙƒØ±'
                : 'Plateforme intelligente de transport universitaire - ModÃ¨le Ã©conomique innovant'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* BMC Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Key Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø§Ù„Ø´Ø±ÙƒØ§Ø¡ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠÙˆÙ†' : 'Partenaires ClÃ©s'}
                </h2>
              </div>
              <div className="space-y-3">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-emerald-50 transition-colors"
                  >
                    <partner.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{partner.name}</p>
                      <p className="text-sm text-gray-600">{partner.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Key Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                  <Cog className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' : 'ActivitÃ©s ClÃ©s'}
                </h2>
              </div>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-colors"
                  >
                    <activity.icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…Ù‚ØªØ±Ø­Ø©' : 'Proposition de Valeur'}
                </h2>
              </div>
              <div className="space-y-3">
                {valueProposition.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <value.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{value.name}</p>
                      <p className="text-sm text-gray-600">{value.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Customer Relationships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø¹Ù„Ø§Ù‚Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡' : 'Relations Clients'}
                </h2>
              </div>
              <div className="space-y-3">
                {relationships.map((rel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-pink-50 transition-colors"
                  >
                    <rel.icon className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{rel.name}</p>
                      <p className="text-sm text-gray-600">{rel.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Customer Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø´Ø±Ø§Ø¦Ø­ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡' : 'Segments Clients'}
                </h2>
              </div>
              <div className="space-y-3">
                {segments.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <segment.icon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{segment.name}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {segment.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Key Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl">
                  <Database className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©' : 'Ressources ClÃ©s'}
                </h2>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-orange-50 transition-colors"
                  >
                    <resource.icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{resource.name}</p>
                      <p className="text-sm text-gray-600">{resource.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl">
                  <Share2 className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ø§Ù„Ù‚Ù†ÙˆØ§Øª' : 'Canaux'}
                </h2>
              </div>
              <div className="space-y-3">
                {channels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition-colors"
                  >
                    <channel.icon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-600">{channel.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Cost Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ù‡ÙŠÙƒÙ„ Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ' : 'Structure des CoÃ»ts'}
                </h2>
              </div>
              <div className="space-y-3">
                {costStructure.map((cost, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <cost.icon className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{cost.name}</p>
                    </div>
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {cost.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Revenue Streams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="md:col-span-1"
          >
            <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {language === 'ar' ? 'Ù…ØµØ§Ø¯Ø± Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª' : 'Sources de Revenus'}
                </h2>
              </div>
              <div className="space-y-3">
                {revenueStreams.map((revenue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <revenue.icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <p className="font-semibold text-gray-900">{revenue.name}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      {revenue.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Academic Info Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <Card className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©' : 'Informations AcadÃ©miques du Projet'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø·Ø§Ù„Ø¨Ø©:' : 'Ã‰tudiante:'}</span> Ù…Ø±Ø§Ø­ Ø§Ø¨ØªØ³Ø§Ù…</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ù…Ø§Ø³ØªØ± 2:' : 'Master 2:'}</span> {language === 'ar' ? 'Ù‚Ø§Ù†ÙˆÙ† Ø¹Ø§Ù…' : 'Droit GÃ©nÃ©ral'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ©:' : 'AnnÃ©e Universitaire:'}</span> 2025/2026</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„ÙƒÙ„ÙŠØ©:' : 'FacultÃ©:'}</span> {language === 'ar' ? 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ù‚ÙˆÙ‚ ÙˆØ§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ©' : 'FacultÃ© de Droit et Sciences Politiques'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'Ø§Ù„Ø¬Ø§Ù…Ø¹Ø©:' : 'UniversitÃ©:'}</span> {language === 'ar' ? 'Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ø¬ÙŠÙ„Ø§Ù„ÙŠ Ø§Ù„ÙŠØ§Ø¨Ø³ Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³' : 'UniversitÃ© Djilali LiabÃ¨s Sidi Bel AbbÃ¨s'}</p>
                <p><span className="font-semibold text-white">{language === 'ar' ? 'الإشراف:' : 'Supervision:'}</span> {language === 'ar' ? 'د:رمدوم نورة' : 'DR RAMDOUM NORA'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 text-emerald-400">
                {language === 'ar' ? 'Ø§Ù„Ø¥Ù†ØªØ§Ø¬ ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±' : 'Production et DÃ©veloppement'}
              </h3>
              <div className="space-y-3 text-slate-300">
                <p><span className="font-semibold text-white">DR:</span> BEHIRI ABDELKADER</p>
                <p className="text-2xl font-bold text-emerald-400">Ø¯ Ø¨Ø­ÙŠØ±ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ù‚Ø§Ø¯Ø±</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
