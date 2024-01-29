const getWithQueryParams = async <T>(url: string): Promise<T> => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(
            `Error al conectar con la API: ${response.status} ${response.statusText}`
        )
    }
    const data: T = await response.json()
    return data
}

export const apiClient = {
    getWithQueryParams
}
