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

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 mt-2 mb-4"
        >
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.dashboard')}
            </Link>
            
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('nav.flightOps')}
              </div>
              <div className="space-y-1 ml-4">
                {flightOpsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{t(item.label)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('nav.resources')}
              </div>
              <div className="space-y-1 ml-4">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{t(item.label)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/events" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.events')}
            </Link>

            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('nav.profile')}
              </div>
              <div className="space-y-1 ml-4">
                {profileItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{t(item.label)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
