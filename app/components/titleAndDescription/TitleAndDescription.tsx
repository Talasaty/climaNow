import styles from './TitleAndDescription.module.css'

interface TitleAndDescriptionProps {
    title: string
    description: string
}

export default function TitleAndDescription({
    title,
    description
}: TitleAndDescriptionProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.container}>{description}</p>
        </div>
    )
}
