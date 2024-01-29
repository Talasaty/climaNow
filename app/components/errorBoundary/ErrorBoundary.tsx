import React, { Component, ErrorInfo } from 'react'
import styles from '@/app/components/card/card.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Loader } from '@/app/components/loader/Loader'

const TitleAndDescription = dynamic(
    () => import('../titleAndDescription/TitleAndDescription'),
    {
        loading: () => <Loader loaderSize={40} />
    }
)

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ hasError: true, error })
    }

    render() {
        const title: string = 'ERROR'
        const description: string =
            'Se ha producido un error, disculpe las molestia, puede intentarlo de nuevo más tarde'

        if (this.state.hasError) {
            return (
                <>
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
                </>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
