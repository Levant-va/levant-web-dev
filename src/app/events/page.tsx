'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Clock, Award } from 'lucide-react'
import { Card, Button } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Events() {
  const { t } = useLanguage()

  const events = [
    {
      id: '1',
      title: 'Middle East Aviation Tour',
      description: 'Join us for an exciting tour across the beautiful airports of the Middle East. Experience the rich aviation culture and stunning landscapes.',
      date: new Date('2024-02-15'),
      time: '18:00 UTC',
      type: 'tour',
      participants: 15,
      maxParticipants: 25,
      status: 'upcoming',
      location: 'Various Airports',
      organizer: 'Levant VA Staff'
    },
    {
      id: '2',
      title: 'Advanced Landing Techniques Workshop',
      description: 'Learn advanced landing techniques and improve your piloting skills with our experienced instructors.',
      date: new Date('2024-02-10'),
      time: '20:00 UTC',
      type: 'training',
      participants: 8,
      maxParticipants: 12,
      status: 'upcoming',
      location: 'Online',
      organizer: 'Training Department'
    },
    {
      id: '3',
      title: 'Monthly Group Flight',
      description: 'Our monthly group flight event featuring scenic routes and community building activities.',
      date: new Date('2024-02-05'),
      time: '19:00 UTC',
      type: 'event',
      participants: 22,
      maxParticipants: 30,
      status: 'upcoming',
      location: 'OLBA - Beirut',
      organizer: 'Community Team'
    },
    {
      id: '4',
      title: 'Cross-Country Challenge',
      description: 'Test your navigation skills in our cross-country challenge covering multiple countries.',
      date: new Date('2024-01-28'),
      time: '17:00 UTC',
      type: 'event',
      participants: 30,
      maxParticipants: 30,
      status: 'completed',
      location: 'Multiple Routes',
      organizer: 'Events Team'
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tour':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'training':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'event':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'ongoing':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'completed':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
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
            {t('nav.events')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join our exciting aviation events and community activities
          </p>
        </motion.div>

        {/* Event Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {events.filter(e => e.status === 'upcoming').length}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upcoming Events
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {events.reduce((sum, event) => sum + event.participants, 0)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Total Participants
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {events.filter(e => e.status === 'completed').length}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Completed Events
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {event.date.toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {event.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {event.participants}/{event.maxParticipants} participants
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Organized by {event.organizer}
                  </div>
                  <div className="flex space-x-2">
                    {event.status === 'upcoming' && (
                      <Button size="sm">
                        Join Event
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Create Event Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button size="lg" className="px-8 py-4">
            Create New Event
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
