import {
    FiveDaysWeatherLocation,
    Location,
    WeatherLocation,
    WeatherLocationQueryModel
} from '@/app/entities/models/weatherModels'
import { apiClient } from '@/app/api/ApiClient'
import {
    fiveDayWeatherQueryToModel,
    locationsDTOToModel,
    wheatherQueryDTOToModel,
    wheatherQueryModelToDTO
} from '@/app/api/weatherMappers'
import {
    FiveDayWeatherLocationResponseDTO,
    LocationDTO,
    TodaysWeatherLocationResponseDTO
} from '@/app/entities/DTO/weatherDTO'
import { objectToQueryParams } from '@/app/lib/utils'

const getTodaysWeatherLocation = async (
    params: WeatherLocationQueryModel
): Promise<WeatherLocation> => {
    const paramsDTO = wheatherQueryModelToDTO(params)
    const url: string = `${process.env.NEXT_PUBLIC_BASE_PATH_WEATHER}`
    const paramsParsed: string = objectToQueryParams(paramsDTO)
    const apiKey: string = `${process.env.NEXT_PUBLIC_API_KEY}`
    const query: string = `${url}/weather?${paramsParsed}&appid=${apiKey}&units=metric&lan=sp`

    const response: TodaysWeatherLocationResponseDTO =
        await apiClient.getWithQueryParams<TodaysWeatherLocationResponseDTO>(
            query
        )

    return wheatherQueryDTOToModel(response)
}

const getFiveDayWeatherLocation = async (
    params: WeatherLocationQueryModel
): Promise<FiveDaysWeatherLocation> => {
    const paramsDTO = wheatherQueryModelToDTO(params)
    const url: string = `${process.env.NEXT_PUBLIC_BASE_PATH_WEATHER}`
    const paramsParsed: string = objectToQueryParams(paramsDTO)
    const apiKey: string = `${process.env.NEXT_PUBLIC_API_KEY}`
    const query: string = `${url}/forecast?${paramsParsed}&appid=${apiKey}&units=metric&lan=sp`

    const response: FiveDayWeatherLocationResponseDTO =
        await apiClient.getWithQueryParams<FiveDayWeatherLocationResponseDTO>(
            query
        )
    console.log(
        'media DTO:',
        response.list.map(el => el.main.temp)
    )
    return fiveDayWeatherQueryToModel(response)
}

const getLocationsOfSpain = (): Location[] => {
    const locationsOfSpain = require('./locations').default
    return locationsOfSpain
        .map((location: LocationDTO) => locationsDTOToModel(location))
        .reverse()
}

export const weatherRepository = {
    getTodaysWeatherLocation,
    getFiveDayWeatherLocation,
    getLocationsOfSpain
}
