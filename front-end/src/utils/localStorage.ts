const authTokenName = 'token';

export function getAuthToken(): null | string {
    return localStorage.getItem(authTokenName);
}

export function setAuthToken(value: string): void {
    localStorage.setItem(authTokenName, value);
}

export function removeAuthToken(): void {
    localStorage.removeItem(authTokenName);
}