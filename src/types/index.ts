export interface Flight {
  id: string
  callsign: string
  aircraft: string
  departure: string
  arrival: string
  route: string
  altitude: number
  speed: number
  heading: number
  latitude: number
  longitude: number
  status: 'departed' | 'en-route' | 'arrived' | 'cancelled'
  departureTime: Date
  arrivalTime: Date
  pilot: {
    id: string
    name: string
    rank: string
  }
}

export interface Pilot {
  id: string
  name: string
  callsign: string
  rank: string
  totalHours: number
  flights: number
  joinDate: Date
  status: 'online' | 'offline' | 'flying'
  currentFlight?: Flight
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  type: 'tour' | 'event' | 'training'
  participants: number
  maxParticipants: number
  status: 'upcoming' | 'ongoing' | 'completed'
}

export interface Bid {
  id: string
  flight: Flight
  pilot: Pilot
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: Date
}

export interface Hub {
  id: string
  name: string
  icao: string
  country: string
  flights: number
  pilots: number
}

export interface Fleet {
  id: string
  name: string
  type: string
  manufacturer: string
  capacity: number
  range: number
  image: string
}

export interface Language {
  code: string
  name: string
  flag: string
}

export interface Theme {
  name: string
  value: 'light' | 'dark'
}
