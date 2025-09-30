'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface LanguageContextType {
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.flightOps': 'Flight Operations',
    'nav.resources': 'Resources',
    'nav.events': 'Events',
    'nav.profile': 'Profile',
    'nav.language': 'Language',
    'nav.theme': 'Theme',
    
    // Flight Operations
    'flightOps.liveMap': 'Live Map',
    'flightOps.flights': 'Flights',
    'flightOps.myBids': 'My Bids',
    'flightOps.events': 'Events',
    'flightOps.tours': 'Tours',
    'flightOps.fleet': 'Fleet',
    'flightOps.hubs': 'Hubs',
    'flightOps.pilotReport': 'Pilot Report',
    
    // Resources
    'resources.download': 'Download',
    'resources.rank': 'Rank',
    'resources.awards': 'Awards',
    'resources.stats': 'Stats',
    'resources.handbook': 'Pilot Handbook',
    
    // Profile
    'profile.login': 'Login with IVAO',
    'profile.pireps': 'PIREPS',
    'profile.admin': 'Admin',
    'profile.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.refresh': 'Refresh',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.activeFlights': 'Active Flights',
    'dashboard.onlinePilots': 'Online Pilots',
    'dashboard.upcomingEvents': 'Upcoming Events',
    'dashboard.recentFlights': 'Recent Flights',
    
    // Flight
    'flight.callsign': 'Callsign',
    'flight.aircraft': 'Aircraft',
    'flight.departure': 'Departure',
    'flight.arrival': 'Arrival',
    'flight.route': 'Route',
    'flight.altitude': 'Altitude',
    'flight.speed': 'Speed',
    'flight.heading': 'Heading',
    'flight.status': 'Status',
    'flight.pilot': 'Pilot',
    'flight.departureTime': 'Departure Time',
    'flight.arrivalTime': 'Arrival Time',
    
    // Status
    'status.departed': 'Departed',
    'status.enRoute': 'En Route',
    'status.arrived': 'Arrived',
    'status.cancelled': 'Cancelled',
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.flying': 'Flying',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.flightOps': 'عمليات الطيران',
    'nav.resources': 'الموارد',
    'nav.events': 'الأحداث',
    'nav.profile': 'الملف الشخصي',
    'nav.language': 'اللغة',
    'nav.theme': 'المظهر',
    
    // Flight Operations
    'flightOps.liveMap': 'الخريطة المباشرة',
    'flightOps.flights': 'الرحلات',
    'flightOps.myBids': 'عروضي',
    'flightOps.events': 'الأحداث',
    'flightOps.tours': 'الجولات',
    'flightOps.fleet': 'الأسطول',
    'flightOps.hubs': 'المحاور',
    'flightOps.pilotReport': 'تقرير الطيار',
    
    // Resources
    'resources.download': 'التحميلات',
    'resources.rank': 'الرتبة',
    'resources.awards': 'الجوائز',
    'resources.stats': 'الإحصائيات',
    'resources.handbook': 'دليل الطيار',
    
    // Profile
    'profile.login': 'تسجيل الدخول عبر IVAO',
    'profile.pireps': 'التقارير',
    'profile.admin': 'الإدارة',
    'profile.logout': 'تسجيل الخروج',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.refresh': 'تحديث',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.activeFlights': 'الرحلات النشطة',
    'dashboard.onlinePilots': 'الطيارون المتصلون',
    'dashboard.upcomingEvents': 'الأحداث القادمة',
    'dashboard.recentFlights': 'الرحلات الأخيرة',
    
    // Flight
    'flight.callsign': 'رمز النداء',
    'flight.aircraft': 'الطائرة',
    'flight.departure': 'المغادرة',
    'flight.arrival': 'الوصول',
    'flight.route': 'المسار',
    'flight.altitude': 'الارتفاع',
    'flight.speed': 'السرعة',
    'flight.heading': 'الاتجاه',
    'flight.status': 'الحالة',
    'flight.pilot': 'الطيار',
    'flight.departureTime': 'وقت المغادرة',
    'flight.arrivalTime': 'وقت الوصول',
    
    // Status
    'status.departed': 'غادر',
    'status.enRoute': 'في الطريق',
    'status.arrived': 'وصل',
    'status.cancelled': 'ملغي',
    'status.online': 'متصل',
    'status.offline': 'غير متصل',
    'status.flying': 'يطير',
  }
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
