'use client'
import { FormEvent } from 'react'
import Button from '@/app/components/button/Button'
import { signIn } from 'next-auth/react'
import { NameApp } from '@/app/components/nameApp/NameApp'
import { useRouter } from 'next/navigation'
import routesConfig from '@/routes.config'

export default function Login() {
    const router = useRouter()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username') as string // Asegúrate de que este nombre coincida con el campo del formulario
        const password = formData.get('password') as string // Asegúrate de que este nombre coincida con el campo del formulario

        const result = await signIn('credentials', {
            redirect: false,
            username,
            password
        })

        if (result?.error) {
            alert('Ha ocurrido un error, inténtelo de nuevo')
        } else {
            router.push(routesConfig.home)
        }
    }

    return (
        <div className='loginPage'>
            <NameApp />
            <form onSubmit={onSubmit} className='mt-4 flex flex-col'>
                <input
                    type='text'
                    placeholder='Usuario'
                    autoFocus
                    name='username'
                    autoComplete='username'
                    className='mb-4'
                />
                <input
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                    autoComplete='password'
                    className='mb-8'
                />
                <Button type='submit'>login</Button>
            </form>
        </div>
    )
}
