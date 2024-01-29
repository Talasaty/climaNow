import { Location } from '@/app/entities/models/weatherModels'
import { useEffect, useState } from 'react'
import { weatherRepository } from '@/app/api/repository'

export const useGetLocationOfSpain = (): string[] => {
    const [allLocationsOfSpain, setAllLocationsOfSpain] = useState<Location[]>(
        []
    )

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let locationsInCache = null
            locationsInCache = localStorage.getItem('locations')
            if (!locationsInCache) {
                const data = weatherRepository.getLocationsOfSpain()
                setAllLocationsOfSpain(data)
                if (!!data && data.length > 0) {
                    localStorage.setItem('locations', JSON.stringify(data))
                }
            } else {
                setAllLocationsOfSpain(JSON.parse(locationsInCache))
            }
        }
    }, [])

    return allLocationsOfSpain.map((location: Location) => location.name)
}
