'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'
import Navbar from '@/components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </div>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
