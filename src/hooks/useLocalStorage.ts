import { useState } from 'react'

type UseLocalStorageType<K> = [
    K,
    (value: K) => void
]

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageType<T> {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue
        }
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setStorageValue = (value: T) => {
        try {
            setStoredValue(value)
            if (typeof window !== "undefined") {
                localStorage.setItem(key, JSON.stringify(value))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setStorageValue]
}

