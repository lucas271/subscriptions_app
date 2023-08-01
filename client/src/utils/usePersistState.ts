import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>
]

const usePersistState = <T>(key:string, initialState:unknown): Response<T> => {
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key)
        if (storageValue) return JSON.parse(storageValue)
        else {
            return initialState
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    })

    return [state, setState]
}

export default usePersistState
