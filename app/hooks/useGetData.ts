import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import serviceExecutor from '@/app/lib/serviceExecutor'

interface UseFetchDataProps<T> {
    fetchData: () => Promise<T>
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
    onBefore?: () => void
    onAfter?: () => void
    deps: ReadonlyArray<any>
}

export const useGetData = <T>({
    fetchData,
    onSuccess,
    onError,
    onBefore,
    onAfter,
    deps
}: UseFetchDataProps<T>) => {
    const [data, setData] = useState<T>({} as T)
    const router = useRouter()
    let executionCondition: boolean = true

    if (deps.length > 0) {
        executionCondition = deps.reduce(
            (result, currentValue) => result && Boolean(currentValue)
        )
    }

    const handlerSuccess = (response: T): void => {
        setData(response)
        if (onSuccess) {
            onSuccess(response)
        }
    }

    useEffect(() => {
        if (executionCondition) {
            serviceExecutor<T>({
                fetchData,
                onSuccess: response => handlerSuccess(response),
                onError,
                onAfter,
                onBefore,
                router
            })
        }
    }, deps)

    return data
}
