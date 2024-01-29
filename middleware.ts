import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import routesConfig from '@/routes.config'

export async function middleware(request: NextRequest) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    if (
        !session &&
        request.nextUrl.pathname !== routesConfig.login &&
        !request.nextUrl.pathname.startsWith('/_next/static/')
    ) {
        return NextResponse.redirect(new URL(routesConfig.login, request.url))
    }

    if (request.nextUrl.pathname === routesConfig.login && session) {
        return NextResponse.redirect(new URL(routesConfig.home, request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
