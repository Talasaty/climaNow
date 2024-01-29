export interface weatherDescriptionDTO {
    id: number
    main: string
    description: string
    icon: string
}

export interface TodaysWeatherLocationResponseDTO {
    coord: {
        lon: number
        lat: number
    }
    weather: weatherDescriptionDTO[]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

export interface WeatherLocationQueryDTO {
    q: string
}

export interface DayOfFiveDayQueryResponseDTO {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
    }
    weather: weatherDescriptionDTO[]
    clouds: {
        all: number
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }
    visibility: number
    pop: number
    sys: {
        pod: string
    }
    dt_txt: string
}

export interface FiveDayWeatherLocationResponseDTO {
    cod: string
    message: number
    cnt: number
    list: DayOfFiveDayQueryResponseDTO[]
    city: {
        id: number
        name: string
        coord: {
            lat: number
            lon: number
        }
        country: string
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}

export interface LocationDTO {
    id: number
    name: string
    state: string
    country: string
    coord: {
        lon: number
        lat: number
    }
}
