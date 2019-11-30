import React, { 
    useEffect,
    useContext } from 'react'
import { useService } from './serviceHooks'
import { RunningContext } from '../contexts/ServerStatus'

export const useRunningStatus = () => {
    const context = useContext(RunningContext)
    return [
        context.running,
        context.update
    ]
}

export const useServerStatus = () => {
    const [service, loading, data] = useService({ url: '/api/server/status' })

    useEffect(
        () => {
            const cb = () => {
                service()
                setTimeout(cb, 10000)
            }
            cb()
        },
        [])

    return [
        loading || !data ? false : data.running,
        service
    ]
}