import styles from './card.module.css'
import { WeatherLocation } from '@/app/entities/models/weatherModels'
import { useGetData } from '@/app/hooks/useGetData'
import { weatherRepository } from '@/app/api/repository'
import { useState } from 'react'
import Image from 'next/image'
import { Loader } from '@/app/components/loader/Loader'

interface Props {
    location: string
    showErrorContent?: boolean
}

export default function Card({ location, showErrorContent }: Props) {
    const [error, setError] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)
    const handlerError = (error: string) => {
        setError(error)
    }

    const renderErrorContent = showErrorContent && !!error && !isLoading

    const weatherLocation: WeatherLocation = useGetData<WeatherLocation>({
        fetchData: () =>
            weatherRepository.getTodaysWeatherLocation({
                location
            }),
        onError: error => handlerError(error),
        onSuccess: () => setError(''),
        onBefore: () => setLoading(true),
        onAfter: () => setLoading(false),

        deps: [location]
    })

    if (isLoading && !error) {
        return (
            <>
                <div className={styles.cardWrapper}>
                    <div className={styles.weatherCard}>
                        <div className={styles.weatherInfo}>
                            <Loader loaderSize={60} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (weatherLocation?.location && !error && !isLoading) {
        return (
            <>
                <div className={styles.cardWrapper}>
                    <div className={styles.weatherCard}>
                        <h2 className={styles.locationName}>
                            {weatherLocation?.location}
                        </h2>
                        <div className={styles.weatherInfo}>
                            <img
                                src={weatherLocation?.weather[0].icon}
                                alt='Clear sky'
                            />
                        </div>
                        <div className={styles.additionalInfo}>
                            <p>
                                Temperatura actual:{' '}
                                {weatherLocation?.temperature}ºC
                            </p>
                            <p>
                                Máx: {weatherLocation?.temperatureMax}ºC, Mín:{' '}
                                {weatherLocation?.temperatureMin}°C
                            </p>
                            <p>Presión: {weatherLocation?.pressure} hPa</p>
                            <p>Humedad: {weatherLocation?.humidity}%</p>
                            <p>
                                Sensación Térmica:{' '}
                                {weatherLocation?.thermalSensation}°C
                            </p>
                            <p>Nubosidad: {weatherLocation?.cloudiness}%</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (renderErrorContent) {
        return (
            <>
                <div className={styles.cardWrapper}>
                    <div className={styles.weatherCard}>
                        <h2 className={styles.locationName}>
                            Se ha producido un error
                        </h2>
                        <div className={styles.weatherInfo}>
                            <Image
                                src='/error.png'
                                alt='error picture'
                                width={100}
                                height={100}
                                loading='lazy'
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
