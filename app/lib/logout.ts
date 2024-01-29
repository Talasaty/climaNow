import { signOut } from 'next-auth/react'
import routesConfig from '@/routes.config'

export const signOutHandler = async () => {
    await signOut({ callbackUrl: routesConfig.login })
}
