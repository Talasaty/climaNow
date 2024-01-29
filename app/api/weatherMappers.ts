import {
    FiveDaysWeatherLocation,
    TempAndPressure,
    WeatherDescription,
    WeatherLocation,
    WeatherLocationQueryModel,
    Location
} from '@/app/entities/models/weatherModels'
import {
    DayOfFiveDayQueryResponseDTO,
    FiveDayWeatherLocationResponseDTO,
    weatherDescriptionDTO,
    WeatherLocationQueryDTO,
    TodaysWeatherLocationResponseDTO,
    LocationDTO
} from '@/app/entities/DTO/weatherDTO'

export const wheatherQueryModelToDTO = (
    data: WeatherLocationQueryModel
): WeatherLocationQueryDTO => ({
    q: data.location
})

const weatherArray = (elements: weatherDescriptionDTO): WeatherDescription => ({
    id: elements?.id,
    summary: elements?.main,
    description: elements?.description,
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH_IMG}${elements?.icon}${process.env.NEXT_PUBLIC_SUFFIX_PATH_GET_IMG}`
})

export const wheatherQueryDTOToModel = (
    data: TodaysWeatherLocationResponseDTO
): WeatherLocation => ({
    weather:
        data?.weather &&
        data.weather.map((el: weatherDescriptionDTO) => weatherArray(el)),
    temperature: data?.main?.temp,
    thermalSensation: data?.main?.feels_like,
    temperatureMin: data?.main?.temp_min,
    temperatureMax: data?.main?.temp_max,
    pressure: data?.main?.pressure,
    humidity: data?.main?.humidity,

    cloudiness: data?.clouds?.all,
    id: data?.id,
    location: data?.name
})

const tempAndPressureMapper = (
    data: DayOfFiveDayQueryResponseDTO[]
): TempAndPressure[] => {
    const arrayOfValues: TempAndPressure[] = data.map(
        (el: DayOfFiveDayQueryResponseDTO): TempAndPressure => ({
            temperature: el?.main?.temp,
            thermalSensation: el?.main?.feels_like,
            temperatureMin: el?.main?.temp_min,
            temperatureMax: el?.main?.temp_max,
            pressure: el?.main?.pressure,
            humidity: el?.main?.humidity
        })
    )

    return arrayOfValues
}

const fiveDaysWeatherMapper = (
    data: DayOfFiveDayQueryResponseDTO[]
): WeatherDescription[] => {
    return data.map((el: DayOfFiveDayQueryResponseDTO) =>
        weatherArray(el.weather[0])
    )
}

export const fiveDayWeatherQueryToModel = (
    data: FiveDayWeatherLocationResponseDTO
): FiveDaysWeatherLocation => ({
    id: data?.city?.id,
    location: data?.city?.name,
    tempAndPressure: tempAndPressureMapper(data?.list),
    weather: fiveDaysWeatherMapper(data?.list)
})

export const locationsDTOToModel = (location: LocationDTO): Location => ({
    id: location.id,
    country: location.country,
    name: location.name
})
