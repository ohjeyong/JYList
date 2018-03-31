const tokenName = 'token';

export function getAuthToken(): null | string {
    return localStorage.getItem(tokenName);
}

export function setAuthToken(value: string): void {
    return localStorage.setItem(tokenName, value);
}
