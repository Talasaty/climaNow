export interface WeatherDescription {
    id: number
    summary: string
    description: string
    icon: string
}

export interface WeatherLocation {
    weather: WeatherDescription[]
    temperature: number
    thermalSensation: number
    temperatureMin: number
    temperatureMax: number
    pressure: number
    humidity: number
    cloudiness: number
    id: number
    location: string
}

export interface Location {
    id: number
    country: string
    name: string
}

export interface WeatherLocationQueryModel {
    location: string
}

export interface TempAndPressure {
    temperature: number
    thermalSensation: number
    temperatureMin: number
    temperatureMax: number
    pressure: number
    humidity: number
}

export interface FiveDaysWeatherLocation {
    id: number
    location: string
    tempAndPressure: TempAndPressure[]
    weather: WeatherDescription[]
}
