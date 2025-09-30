'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Map, Plane, Users, Clock, Navigation } from 'lucide-react'
import { Card, Button, LoadingSpinner } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { ivaoApi } from '@/lib/ivao-api'
import { Flight } from '@/types'
import { formatTime, formatDistance, formatSpeed, formatAltitude } from '@/lib/utils'

export default function LiveMap() {
  const { t } = useLanguage()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)
        const flightsData = await ivaoApi.getFlights()
        
        const transformedFlights: Flight[] = flightsData.map((flight) => ({
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
          arrivalTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          pilot: {
            id: flight.pilot.id,
            name: flight.pilot.name,
            rank: 'Captain'
          }
        }))

        setFlights(transformedFlights)
      } catch (error) {
        console.error('Error fetching flights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
    
    // Refresh every 10 seconds for live updates
    const interval = setInterval(fetchFlights, 10000)
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('flightOps.liveMap')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time flight tracking and monitoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="p-6 h-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Flight Map
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Live
                  </span>
                </div>
              </div>
              
              <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive map will be implemented with Leaflet
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {flights.length} active flights
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Flight List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active Flights
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {flights.length}
                </span>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {flights.map((flight) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedFlight?.id === flight.id
                        ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedFlight(flight)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {flight.callsign}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {flight.aircraft}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>{flight.departure}</span>
                        <span>→</span>
                        <span>{flight.arrival}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>{formatAltitude(flight.altitude)}</span>
                        <span>{formatSpeed(flight.speed)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Flight Details */}
        {selectedFlight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Flight Details
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedFlight(null)}
                >
                  Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Callsign
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedFlight.callsign}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Route
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedFlight.departure} → {selectedFlight.arrival}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Altitude
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatAltitude(selectedFlight.altitude)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Speed
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatSpeed(selectedFlight.speed)}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Aircraft
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedFlight.aircraft}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Pilot
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedFlight.pilot.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Status
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {selectedFlight.status}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
