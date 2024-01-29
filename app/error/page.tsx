import PrivateLayout from '@/app/components/privateLayout/privateLayout'
import styles from '@/app/components/card/card.module.css'
import Image from 'next/image'
import React from 'react'
import dynamic from 'next/dynamic'
import { Loader } from '@/app/components/loader/Loader'

const TitleAndDescription = dynamic(
    () => import('../components/titleAndDescription/TitleAndDescription'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

export default function ErrorPage() {
    const title: string = 'ERROR'
    const description: string =
        'Se ha producido un error, disculpe las molestia, puede intentarlo de nuevo más tarde'

    return (
        <>
            <PrivateLayout>
                <div className={styles.cardWrapper}>
                    <div className={styles.weatherCard}>
                        <TitleAndDescription
                            title={title}
                            description={description}
                        />
                        <div className={styles.weatherInfo}>
                            <Image
                                src='/error.png.webp'
                                alt='error picture'
                                width={200}
                                height={250}
                                loading='lazy'
                            />
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        </>
    )
}
