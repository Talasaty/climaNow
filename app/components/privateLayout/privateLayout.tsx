'use client'

import styles from './privateLayout.module.css'
import { NavBar } from '@/app/components/navbar/Navbar'
import { BottomBar } from '@/app/components/bottomBar/BottomBar'

export default function PrivateLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.childrenContainer}>{children}</div>
            </div>
            <BottomBar />
        </main>
    )
}
