'use client'

import { useGetLocationOfSpain } from '@/app/hooks/useGetLocations'
import styles from './home.module.css'

import dynamic from 'next/dynamic'
import { Loader } from '@/app/components/loader/Loader'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import PrivateLayout from '../components/privateLayout/privateLayout'

const InfiniteScroll = dynamic(
    () => import('../components/infiniteScroll/InfiniteScroll'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

const TitleAndDescription = dynamic(
    () => import('../components/titleAndDescription/TitleAndDescription'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

export default function Home() {
    const locations: string[] = useGetLocationOfSpain()
    const title = 'Inicio'
    const description =
        'En esta página puedes ver el tiempo que hará hoy en todos los municipios de España'

    return (
        <>
            <PrivateLayout>
                <div className={styles.homeWrapper}>
                    <ErrorBoundary>
                        <TitleAndDescription
                            title={title}
                            description={description}
                        />

                        <div className={styles.homeContainer}>
                            <InfiniteScroll data={locations} />
                        </div>
                    </ErrorBoundary>
                </div>
            </PrivateLayout>
        </>
    )
}
