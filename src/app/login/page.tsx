'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LogIn, User, Lock, Plane, Eye, EyeOff } from 'lucide-react'
import { Card, Button, Input, LoadingSpinner } from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/contexts/ToastContext'

export default function Login() {
  const [callsign, setCallsign] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const { t } = useLanguage()
  const { success, error } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)

    try {
      const success = await login(callsign, password)
      if (success) {
        success('Login Successful', `Welcome back, ${callsign}!`)
        router.push('/dashboard')
      } else {
        setLoginError('Invalid callsign or password')
        error('Login Failed', 'Invalid callsign or password')
      }
    } catch (err) {
      setLoginError('Login failed. Please try again.')
      error('Login Error', 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <img
              src="/img/levant-logo.jpg"
              alt="Levant VA Logo"
              className="w-full h-full object-contain rounded-xl shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Levant VA
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your pilot account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="IVAO Callsign"
                  placeholder="Enter your IVAO callsign"
                  value={callsign}
                  onChange={setCallsign}
                  type="text"
                  error={loginError}
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={setPassword}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg"
                >
                  <p className="text-sm text-red-800 dark:text-red-200">{loginError}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !callsign || !password}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Demo Credentials
                </p>
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-500">
                  <p>Callsign: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">LEV001</span></p>
                  <p>Password: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">demo123</span></p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full"
              >
                <Plane className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an IVAO account?{' '}
            <a
              href="https://www.ivao.aero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
