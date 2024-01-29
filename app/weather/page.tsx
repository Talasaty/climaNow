'use client'

import { FormEvent, useState, useRef } from 'react'
import styles from './weather.module.css'
import React from 'react'
import dynamic from 'next/dynamic'
import { Loader } from '@/app/components/loader/Loader'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import PrivateLayout from '../components/privateLayout/privateLayout'

const Button = dynamic(() => import('../components/button/Button'), {
    loading: () => <Loader loaderSize={40} />
})

const TemperatureChart = dynamic(
    () => import('../components/temperatureChart/TemperatureChart'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

const Card = dynamic(() => import('../components/card/Card'), {
    loading: () => <Loader loaderSize={40} />
})

const TitleAndDescription = dynamic(
    () => import('../components/titleAndDescription/TitleAndDescription'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

export default function Page() {
    const [location, setLocation] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null) // Uso esta ref solo para mostrar un caso de uso de las useRef
    const title = 'Buscador'
    const description =
        'Aquí podrás buscar el tiempo de cualquier municipio del mundo 😲'
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const inputValue: string = inputRef.current?.value || ''
        if (inputValue && inputValue.length >= 4) {
            setLocation(inputValue)
        }
    }

    return (
        <PrivateLayout>
            <div className={styles.container}>
                <ErrorBoundary>
                    <TitleAndDescription
                        title={title}
                        description={description}
                    />
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            className='halfInput'
                            placeholder='Buscar clima en tu ciudad...'
                            autoFocus
                            ref={inputRef}
                        />
                        <Button type='submit' isHalfButton>
                            Buscar
                        </Button>
                    </form>
                    <Card location={location} showErrorContent />

                    <TemperatureChart location={location} />
                </ErrorBoundary>
            </div>
        </PrivateLayout>
    )
}
