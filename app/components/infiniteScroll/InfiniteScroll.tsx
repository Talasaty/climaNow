'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useScreenIsMobile from '@/app/hooks/useScreenIsMobile'
import { Loader } from '@/app/components/loader/Loader'
import dynamic from 'next/dynamic'

const Card = dynamic(() => import('../card/Card'), {
    loading: () => <Loader loaderSize={40} />
})

interface ItemsInterface {
    items: string[]
    page: number
}

const InfiniteScroll = ({ data }: { data: string[] }) => {
    const [newItems, setNewItems] = useState<ItemsInterface>({
        items: [],
        page: 0
    })

    const { ref, inView } = useInView()
    const isMobile = useScreenIsMobile()
    const itemsToShow = isMobile ? 3 : 10

    useEffect(() => {
        const loadMore = () => {
            const nextItems = data.slice(
                newItems.page * itemsToShow,
                (newItems.page + 1) * itemsToShow
            )

            setNewItems(prev => ({
                items: [...prev.items, ...nextItems],
                page: prev.page + 1
            }))
        }

        if (inView) {
            loadMore()
        }
    }, [inView])

    return (
        <>
            {newItems.items.map((item: string, index: number) => (
                <Card key={index} location={item} />
            ))}

            <div ref={ref}>
                <Loader loaderSize={40} />
            </div>
        </>
    )
}

export default InfiniteScroll
