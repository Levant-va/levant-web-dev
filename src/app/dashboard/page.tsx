'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plane, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  TrendingUp,
  Activity,
  Globe
} from 'lucide-react'
import { Card, Button, LoadingSpinner } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/contexts/ToastContext'
import { ivaoApi } from '@/lib/ivao-api'
import { Flight, Pilot, Event } from '@/types'
import { formatTime, formatDistance, formatSpeed, formatAltitude } from '@/lib/utils'

export default function Dashboard() {
  const { t } = useLanguage()
  const { success, error, info } = useToast()
  const [flights, setFlights] = useState<Flight[]>([])
  const [pilots, setPilots] = useState<Pilot[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [flightsData, pilotsData] = await Promise.all([
          ivaoApi.getFlights(),
          ivaoApi.getOnlinePilots()
        ])
        
        // Transform IVAO data to our format
        const transformedFlights: Flight[] = flightsData.map((flight, index) => ({
          id: flight.id,
          callsign: flight.callsign,
          aircraft: flight.aircraft,
          departure: flight.departure,
          arrival: flight.arrival,
          route: `${flight.departure} - ${flight.arrival}`,
          altitude: flight.altitude,
          speed: flight.speed,
          heading: flight.heading,
          latitude: flight.latitude,
          longitude: flight.longitude,
          status: 'en-route' as const,
          departureTime: new Date(),
          arrivalTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          pilot: {
            id: flight.pilot.id,
            name: flight.pilot.name,
            rank: 'Captain'
          }
        }))

        const transformedPilots: Pilot[] = pilotsData.map((pilot, index) => ({
          id: pilot.id,
          name: pilot.name,
          callsign: pilot.callsign,
          rank: pilot.rating,
          totalHours: Math.floor(Math.random() * 1000) + 100,
          flights: Math.floor(Math.random() * 200) + 10,
          joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          status: 'online' as const
        }))

        // Mock events data
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Middle East Tour',
            description: 'Explore the beautiful airports of the Middle East',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            type: 'tour',
            participants: 15,
            maxParticipants: 25,
            status: 'upcoming'
          },
          {
            id: '2',
            title: 'Training Session',
            description: 'Advanced landing techniques workshop',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            type: 'training',
            participants: 8,
            maxParticipants: 12,
            status: 'upcoming'
          }
        ]

        setFlights(transformedFlights)
        setPilots(transformedPilots)
        setEvents(mockEvents)
        success('Data Loaded', 'Dashboard data refreshed successfully')
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        error('Data Load Error', 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dashboard.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to Levant Virtual Airlines
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('dashboard.activeFlights')}
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {flights.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('dashboard.onlinePilots')}
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {pilots.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('dashboard.upcomingEvents')}
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {events.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Hours
                  </p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {pilots.reduce((sum, pilot) => sum + pilot.totalHours, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Flights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('dashboard.activeFlights')}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    info('Opening Live View', 'Redirecting to live flight map...')
                    // Add navigation to live map here
                  }}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Live View
                </Button>
              </div>
              
              <div className="space-y-4">
                {flights.slice(0, 5).map((flight) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Plane className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {flight.callsign}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {flight.aircraft}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {flight.departure} → {flight.arrival}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatAltitude(flight.altitude)} • {formatSpeed(flight.speed)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Online Pilots */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('dashboard.onlinePilots')}
                </h2>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div className="space-y-3">
                {pilots.slice(0, 6).map((pilot) => (
                  <motion.div
                    key={pilot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {pilot.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {pilot.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {pilot.callsign} • {pilot.rank}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {pilot.totalHours}h
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.upcomingEvents')}
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-blue-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.participants}/{event.maxParticipants}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
