import React from 'react'
import { NextPageContext } from 'next'

interface ErrorProps {
    statusCode?: number
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
    return (
        <div>
            {statusCode
                ? `Ocurrió un error en el servidor con código de estado: ${statusCode}`
                : 'Ocurrió un error en el cliente'}
        </div>
    )
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default ErrorPage
