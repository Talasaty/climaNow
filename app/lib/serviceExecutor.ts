import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import routesConfig from '@/routes.config'

interface ServiceExecutorProps<T> {
    fetchData: () => Promise<T>
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
    onBefore?: () => void
    onAfter?: () => void
    router: AppRouterInstance
}

const serviceExecutor = async <T>({
    fetchData,
    onSuccess,
    onError,
    onBefore,
    onAfter,
    router
}: ServiceExecutorProps<T>) => {
    if (onBefore) {
        onBefore()
    }

    try {
        const data = await fetchData()
        if (onSuccess) {
            onSuccess(data)
        }
    } catch (error) {
        if (error && onError) {
            onError(`${error}`)
        }
        router.push(routesConfig.error)
    } finally {
        if (onAfter) {
            onAfter()
        }
    }
}

export default serviceExecutor
