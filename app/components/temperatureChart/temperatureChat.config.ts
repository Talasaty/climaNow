import { FiveDaysWeatherLocation } from '@/app/entities/models/weatherModels'

const dataBuilder = (dataFromApi: FiveDaysWeatherLocation) => ({
    labels: dataFromApi.tempAndPressure.map((el, index) => `Día ${index}`),
    datasets: [
        {
            label: 'Temperatura Máxima',
            data: dataFromApi.tempAndPressure.map(temp => temp.temperatureMax),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            hoverBackgroundColor: 'yellow',
            hoverRadius: 10,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointBorderColor: 'rgb(255, 99, 132)'
        },
        {
            label: 'Temperatura Mínima',
            data: dataFromApi.tempAndPressure.map(temp => temp.temperatureMin),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            hoverBackgroundColor: 'yellow',
            hoverRadius: 10,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(54, 162, 235, 0.5)',
            pointBorderColor: 'rgb(54, 162, 235)'
        },
        {
            label: 'Temperatura media',
            data: dataFromApi.tempAndPressure.map(temp => temp.temperature),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            hoverBackgroundColor: 'yellow',
            hoverRadius: 10,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(255, 159, 64, 0.5)',
            pointBorderColor: 'rgb(255, 159, 64)'
        }
    ]
})

export default dataBuilder
