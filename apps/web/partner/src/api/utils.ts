export function createQueryParamsString(params: { [key: string]: any }): string {
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return `?${queryString}`;
}
