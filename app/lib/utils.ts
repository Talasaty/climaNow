export const objectToQueryParams = (params: object): string => {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
}
