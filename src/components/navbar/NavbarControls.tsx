'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe, User, LogOut } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/Card'

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-[220px] h-[220px]">
        <Image
          src="/img/levant-logo.jpg"
          alt="Levant VA Logo"
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
    </Link>
  )
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-32 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button
          onClick={() => setLanguage('en')}
          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
            language === 'en' 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
            language === 'ar' 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          🇸🇦 العربية
        </button>
      </div>
    </div>
  )
}


export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const { success } = useToast()

  const handleLogout = () => {
    logout()
    success('Logged Out', 'You have been successfully logged out')
  }

  if (!isAuthenticated || !user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          {t('profile.login')}
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {user.callsign}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('profile.logout')}
      </Button>
    </div>
  )
}
