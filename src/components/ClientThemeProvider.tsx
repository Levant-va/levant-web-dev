'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'

interface ClientThemeProviderProps {
  children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div suppressHydrationWarning>{children}</div>
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
