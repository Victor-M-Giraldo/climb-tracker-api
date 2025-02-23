export function setItem(key: string, value: Record<string, unknown>): void {
    localStorage.setItem(key, JSON.stringify(value));
}
