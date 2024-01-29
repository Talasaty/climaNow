import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js'
import { useGetData } from '@/app/hooks/useGetData'
import { weatherRepository } from '@/app/api/repository'
import {
    FiveDaysWeatherLocation,
    WeatherLocationQueryModel
} from '@/app/entities/models/weatherModels'
import { useState } from 'react'
import dataBuilder from '@/app/components/temperatureChart/temperatureChat.config'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options: ChartOptions<'line'> = {
    animations: {
        radius: {
            duration: 400,
            easing: 'linear',
            loop: context => context.active,
            from: 5,
            to: 10
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
    },
    plugins: {
        tooltip: {
            enabled: true
        }
    }
}

function TemperatureChart({ location }: { location: string }) {
    const [error, setError] = useState<string>('')
    const temperatureChartData: FiveDaysWeatherLocation =
        useGetData<FiveDaysWeatherLocation>({
            fetchData: () =>
                weatherRepository.getFiveDayWeatherLocation({
                    location
                }),
            onSuccess: () => setError(''),
            onError: error => setError(error),
            deps: [location]
        })

    if (error) {
        return <>Ha ocurrido un error al generar la gráfica</>
    }
    if (temperatureChartData.location && !error) {
        return (
            <div className='hidden lg:block p-10 w-full'>
                <Line
                    data={dataBuilder(temperatureChartData)}
                    options={options}
                />
            </div>
        )
    }
}

export default TemperatureChart
