import axios from 'axios'

const IVAO_API_BASE = 'https://api.ivao.aero/v2'
const IVAO_API_KEY = process.env.IVAO_API_KEY
const IVAO_BEARER_TOKEN = process.env.IVAO_BEARER_TOKEN

export interface IVAOFlight {
  id: string
  callsign: string
  aircraft: string
  departure: string
  arrival: string
  latitude: number
  longitude: number
  altitude: number
  speed: number
  heading: number
  pilot: {
    id: string
    name: string
    callsign: string
  }
}

export interface IVAOPilot {
  id: string
  name: string
  callsign: string
  division: string
  rating: string
  status: string
  totalHours?: number
  joinDate?: string
}

export interface IVAOUser {
  id: string
  firstName: string
  lastName: string
  callsign: string
  division: string
  rating: string
  status: string
  totalHours: number
  joinDate: string
  email?: string
}

class IVAOApiClient {
  private baseURL = IVAO_API_BASE
  private apiKey = IVAO_API_KEY
  private bearerToken = IVAO_BEARER_TOKEN

  constructor() {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials not found in environment variables. Please check your .env file.')
      console.warn('Required variables: IVAO_API_KEY and IVAO_BEARER_TOKEN')
    } else {
      console.log('IVAO API Client initialized successfully with credentials from .env file')
    }
  }

  private getHeaders() {
    if (!this.apiKey || !this.bearerToken) {
      throw new Error('IVAO API credentials are missing. Please check your .env file.')
    }
    
    return {
      'Authorization': `Bearer ${this.bearerToken}`,
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json'
    }
  }

  async getFlights(): Promise<IVAOFlight[]> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing. Using mock data.')
      return this.getMockFlights()
    }

    try {
      const response = await axios.get(`${this.baseURL}/flights`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error fetching flights from IVAO API:', error)
      console.log('Falling back to mock flights data')
      return this.getMockFlights()
    }
  }

  async getFlightById(id: string): Promise<IVAOFlight | null> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing.')
      return null
    }

    try {
      const response = await axios.get(`${this.baseURL}/flights/${id}`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error fetching flight:', error)
      return null
    }
  }

  async getPilotById(id: string): Promise<IVAOUser | null> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing.')
      return null
    }

    try {
      const response = await axios.get(`${this.baseURL}/pilots/${id}`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error fetching pilot:', error)
      return null
    }
  }

  async getOnlinePilots(): Promise<IVAOPilot[]> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing. Using mock data.')
      return this.getMockPilots()
    }

    try {
      const response = await axios.get(`${this.baseURL}/pilots/online`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error fetching online pilots from IVAO API:', error)
      console.log('Falling back to mock pilots data')
      return this.getMockPilots()
    }
  }

  async getFlightsByAirport(icao: string): Promise<IVAOFlight[]> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing.')
      return []
    }

    try {
      const response = await axios.get(`${this.baseURL}/flights/airport/${icao}`, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error fetching flights by airport:', error)
      return []
    }
  }

  async authenticateUser(callsign: string, password: string): Promise<IVAOUser | null> {
    if (!this.apiKey || !this.bearerToken) {
      console.warn('IVAO API credentials missing.')
      return null
    }

    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        callsign,
        password
      }, {
        headers: this.getHeaders()
      })
      return response.data
    } catch (error) {
      console.error('Error authenticating user:', error)
      return null
    }
  }

  // Mock data for development
  private getMockFlights(): IVAOFlight[] {
    return [
      {
        id: '1',
        callsign: 'LEV001',
        aircraft: 'Boeing 737-800',
        departure: 'OLBA',
        arrival: 'OJAI',
        latitude: 33.8209,
        longitude: 35.4883,
        altitude: 35000,
        speed: 450,
        heading: 90,
        pilot: {
          id: '1',
          name: 'Ahmed Hassan',
          callsign: 'LEV001'
        }
      },
      {
        id: '2',
        callsign: 'LEV002',
        aircraft: 'Airbus A320',
        departure: 'OMDB',
        arrival: 'OLBA',
        latitude: 25.2532,
        longitude: 55.3657,
        altitude: 38000,
        speed: 480,
        heading: 270,
        pilot: {
          id: '2',
          name: 'Sarah Al-Mahmoud',
          callsign: 'LEV002'
        }
      },
      {
        id: '3',
        callsign: 'LEV003',
        aircraft: 'Boeing 777-300ER',
        departure: 'OLBA',
        arrival: 'OMDB',
        latitude: 33.8209,
        longitude: 35.4883,
        altitude: 41000,
        speed: 520,
        heading: 135,
        pilot: {
          id: '3',
          name: 'Mohammed Khalil',
          callsign: 'LEV003'
        }
      }
    ]
  }

  private getMockPilots(): IVAOPilot[] {
    return [
      {
        id: '1',
        name: 'Ahmed Hassan',
        callsign: 'LEV001',
        division: 'Middle East',
        rating: 'Captain',
        status: 'online',
        totalHours: 1250,
        joinDate: '2022-03-15'
      },
      {
        id: '2',
        name: 'Sarah Al-Mahmoud',
        callsign: 'LEV002',
        division: 'Middle East',
        rating: 'First Officer',
        status: 'online',
        totalHours: 890,
        joinDate: '2022-07-20'
      },
      {
        id: '3',
        name: 'Mohammed Khalil',
        callsign: 'LEV003',
        division: 'Middle East',
        rating: 'Captain',
        status: 'online',
        totalHours: 2100,
        joinDate: '2021-11-08'
      },
      {
        id: '4',
        name: 'Fatima Al-Zahra',
        callsign: 'LEV004',
        division: 'Middle East',
        rating: 'First Officer',
        status: 'online',
        totalHours: 650,
        joinDate: '2023-01-12'
      },
      {
        id: '5',
        name: 'Omar Al-Rashid',
        callsign: 'LEV005',
        division: 'Middle East',
        rating: 'Captain',
        status: 'online',
        totalHours: 1800,
        joinDate: '2021-05-30'
      }
    ]
  }
}

export const ivaoApi = new IVAOApiClient()
