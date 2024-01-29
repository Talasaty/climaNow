import styles from './loader.module.css'
import Image from 'next/image'

interface Props {
    loaderSize: number
}

export function Loader({ loaderSize }: Props) {
    return (
        <Image
            src='/loading.svg'
            alt='home'
            width={loaderSize}
            height={loaderSize}
            className={styles.svgLoader}
            loading='lazy'
        />
    )
}
