import React from 'react'

function useScreenIsMobile() {
    const habemusWindow = typeof window !== 'undefined'
    const [isMobile, setIsMobile] = React.useState(
        habemusWindow && window?.innerWidth < 768
    )
    const listenerAdded = React.useRef(false)

    React.useEffect(() => {
        if (!listenerAdded.current && habemusWindow) {
            const handleResize = () => {
                setIsMobile(window?.innerWidth < 768)
            }

            window?.addEventListener('resize', handleResize)
            listenerAdded.current = true

            return () => {
                window?.removeEventListener('resize', handleResize)
                listenerAdded.current = false
            }
        }
    }, [])

    return isMobile
}

export default useScreenIsMobile
