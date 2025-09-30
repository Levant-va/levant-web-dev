'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plane, Users, Globe, Award } from 'lucide-react'
import { Card, Button } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src="/img/levant-logo.jpg"
              alt="Levant VA Logo"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Levant Virtual Airlines
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Professional Flight Simulation Community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mx-auto mb-4">
              <Plane className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Flight Operations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track flights, manage bids, and explore our fleet
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Community
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join our vibrant community of aviation enthusiasts
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Global Reach
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fly to destinations across the Middle East and beyond
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Achievements
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Earn ranks, awards, and recognition for your flights
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <Button 
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Enter Dashboard
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirecting automatically in 3 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  )
}
