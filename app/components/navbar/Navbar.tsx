'use client'
import styles from './navbar.module.css'
import { NameApp } from '@/app/components/nameApp/NameApp'
import Button from '@/app/components/button/Button'
import Link from 'next/link'
import { signOutHandler } from '@/app/lib/logout'
import routesConfig from '@/routes.config'

export function NavBar() {
    return (
        <>
            <div className={styles.wrapper}>
                <nav className={styles.menu}>
                    <div className='hidden lg:block h-full'>
                        <ul className={styles.list}>
                            <li className={styles.element}>
                                <Link href={routesConfig.home}>Inicio</Link>
                            </li>
                            <li className={styles.element}>
                                <Link href={routesConfig.weather}>
                                    Buscador por localidad
                                </Link>
                            </li>
                            <li
                                style={{ float: 'right' }}
                                className={styles.element}
                            >
                                <div className={styles.logoutSection}>
                                    <Button onClick={signOutHandler}>
                                        Cerrar sesión
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.nameContainer}>
                        <NameApp />
                    </div>
                </nav>
            </div>
        </>
    )
}
