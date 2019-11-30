import React, { createContext } from 'react'
import { useServerStatus } from '../hooks/statusHooks'

export const RunningContext = createContext({
    running: false,
    update: () => {}
})

export const RunningStatusProvider = ({ children }) => {
    const [running, check] = useServerStatus()

    const value = {
        running,
        update: check
    }

    return (
        <RunningContext.Provider value={value}>
            {children}
        </RunningContext.Provider>
    )
}