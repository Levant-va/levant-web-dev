'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plane, 
  Map, 
  Calendar, 
  User, 
  Download, 
  Award, 
  BarChart3,
  BookOpen,
  FileText,
  LogIn,
  LogOut,
  Settings
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Dropdown } from './Dropdown'

export function DesktopNavigation() {
  const { t } = useLanguage()

  const flightOpsItems = [
    { href: '/flight-ops/live-map', label: 'flightOps.liveMap', icon: Map },
    { href: '/flight-ops/flights', label: 'flightOps.flights', icon: Plane },
    { href: '/flight-ops/my-bids', label: 'flightOps.myBids', icon: FileText },
    { href: '/flight-ops/events', label: 'flightOps.events', icon: Calendar },
    { href: '/flight-ops/tours', label: 'flightOps.tours', icon: Map },
    { href: '/flight-ops/fleet', label: 'flightOps.fleet', icon: Plane },
    { href: '/flight-ops/hubs', label: 'flightOps.hubs', icon: Map },
    { href: '/flight-ops/pilot-report', label: 'flightOps.pilotReport', icon: FileText },
  ]

  const resourcesItems = [
    { href: '/resources/download', label: 'resources.download', icon: Download },
    { href: '/resources/rank', label: 'resources.rank', icon: Award },
    { href: '/resources/awards', label: 'resources.awards', icon: Award },
    { href: '/resources/stats', label: 'resources.stats', icon: BarChart3 },
    { href: '/resources/handbook', label: 'resources.handbook', icon: BookOpen },
  ]

  const profileItems = [
    { href: '/profile', label: 'nav.profile', icon: User },
    { href: '/profile/pireps', label: 'profile.pireps', icon: FileText },
    { href: '/profile/admin', label: 'profile.admin', icon: Settings },
    { href: '/login', label: 'profile.login', icon: LogIn },
    { href: '/logout', label: 'profile.logout', icon: LogOut },
  ]

  return (
    <div className="hidden lg:flex items-center space-x-8">
      <Link 
        href="/dashboard" 
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
      >
        {t('nav.dashboard')}
      </Link>

      <Dropdown 
        label="nav.flightOps"
        items={flightOpsItems}
        isOpen={false}
        setIsOpen={() => {}}
      />

      <Dropdown 
        label="nav.resources"
        items={resourcesItems}
        isOpen={false}
        setIsOpen={() => {}}
      />

      <Link 
        href="/events" 
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
      >
        {t('nav.events')}
      </Link>

      <Dropdown 
        label="nav.profile"
        items={profileItems}
        isOpen={false}
        setIsOpen={() => {}}
      />
    </div>
  )
}
