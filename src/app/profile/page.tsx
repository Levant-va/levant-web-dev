'use client'

import { motion } from 'framer-motion'
import { User, Mail, Calendar, Award, Plane, Clock, MapPin } from 'lucide-react'
import { Card, Button } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Profile() {
  const { t } = useLanguage()

  // Mock user data - in real app this would come from authentication
  const user = {
    id: '1',
    name: 'Ahmed Hassan',
    callsign: 'LEV001',
    email: 'ahmed.hassan@levantva.com',
    rank: 'Captain',
    totalHours: 1250,
    flights: 89,
    joinDate: new Date('2022-03-15'),
    status: 'online',
    location: 'Beirut, Lebanon',
    currentFlight: null,
    achievements: [
      { id: '1', name: 'First Flight', description: 'Completed your first flight', date: new Date('2022-03-20') },
      { id: '2', name: '100 Hours', description: 'Reached 100 flight hours', date: new Date('2022-08-15') },
      { id: '3', name: 'Long Haul', description: 'Completed a long-haul flight', date: new Date('2023-01-10') },
      { id: '4', name: 'Perfect Landing', description: 'Achieved perfect landing score', date: new Date('2023-06-22') }
    ],
    recentFlights: [
      { id: '1', callsign: 'LEV001', route: 'OLBA - OJAI', date: new Date('2024-01-15'), duration: '2h 30m', status: 'completed' },
      { id: '2', callsign: 'LEV001', route: 'OJAI - OLBA', date: new Date('2024-01-12'), duration: '2h 45m', status: 'completed' },
      { id: '3', callsign: 'LEV001', route: 'OLBA - OMDB', date: new Date('2024-01-10'), duration: '3h 15m', status: 'completed' }
    ]
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
            {t('nav.profile')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your pilot profile and track your progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {user.callsign} • {user.rank}
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.status}
                </span>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.location}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Joined {user.joinDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button className="w-full">
                  Edit Profile
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Stats and Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mx-auto mb-2">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.totalHours}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Hours
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full w-fit mx-auto mb-2">
                  <Plane className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.flights}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Flights
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mx-auto mb-2">
                  <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.achievements.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Achievements
                </p>
              </Card>
            </div>

            {/* Recent Flights */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Flights
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {user.recentFlights.map((flight) => (
                  <div key={flight.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {flight.callsign}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {flight.route}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {flight.date.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {flight.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Achievements
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {achievement.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
