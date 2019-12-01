import { 
    useEffect,
    useContext } from 'react'
import { useService } from './serviceHooks'
import { RunningContext } from '../components/ServerStatus'

export const useRunningStatus = () => {
    const context = useContext(RunningContext)
    return [
        context.running,
        context.update
    ]
}

export const useServerStatus = () => {
    const [service, _, data] = useService({ url: '/api/server/status' })

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
        data ? data.running : false,
        service
    ]
}