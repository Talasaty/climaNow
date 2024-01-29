import Link from 'next/link'
import Image from 'next/image'
import Button from '@/app/components/button/Button'
import styles from './bottomBar.module.css'
import { signOutHandler } from '@/app/lib/logout'
import routesConfig from '@/routes.config'

export function BottomBar() {
    const sizeButton = 40
    return (
        <>
            <div className='block lg:hidden'>
                <div className={styles.bottomWrapper}>
                    <Link href={routesConfig.home}>
                        <Image
                            src='/climaNow.svg'
                            alt='home'
                            width={sizeButton}
                            height={sizeButton}
                            loading='lazy'
                        />
                    </Link>
                    <Link href={routesConfig.weather}>
                        <Image
                            src='/search.svg'
                            alt='home'
                            width={sizeButton}
                            height={sizeButton}
                            loading='lazy'
                        />
                    </Link>

                    <Button onClick={signOutHandler}>
                        <Image
                            src='/logout.svg'
                            alt='home'
                            width={sizeButton}
                            height={sizeButton}
                            loading='lazy'
                        />
                    </Button>
                </div>
            </div>
        </>
    )
}
