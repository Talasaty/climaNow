// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (
                    credentials &&
                    credentials.username === 'admin' &&
                    credentials.password === 'password'
                ) {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: 'admin@example.com'
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = {
                ...session.user,

                name: token.name,
                email: token.email
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})
