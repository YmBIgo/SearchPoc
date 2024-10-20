export function initLocalStorage(key: string) {
    localStorage.setItem(key, JSON.stringify([]))
}