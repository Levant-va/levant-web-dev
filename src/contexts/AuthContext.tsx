'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ivaoApi, IVAOUser } from '@/lib/ivao-api'

interface AuthContextType {
  user: IVAOUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (callsign: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<IVAOUser>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IVAOUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('levant_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        localStorage.removeItem('levant_user')
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (callsign: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const userData = await ivaoApi.authenticateUser(callsign, password)
      
      if (userData) {
        setUser(userData)
        localStorage.setItem('levant_user', JSON.stringify(userData))
        return true
      } else {
        // For demo purposes, create a mock user if authentication fails
        const mockUser: IVAOUser = {
          id: 'demo-user',
          firstName: 'Demo',
          lastName: 'User',
          callsign: callsign,
          division: 'Middle East',
          rating: 'Captain',
          status: 'online',
          totalHours: 1250,
          joinDate: '2022-03-15',
          email: `${callsign.toLowerCase()}@levantva.com`
        }
        
        setUser(mockUser)
        localStorage.setItem('levant_user', JSON.stringify(mockUser))
        return true
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('levant_user')
  }

  const updateUser = (userData: Partial<IVAOUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('levant_user', JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
