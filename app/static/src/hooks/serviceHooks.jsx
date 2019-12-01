import { 
    useEffect, 
    useState, 
    useCallback,
    useMemo } from 'react'


export const useService = ({ url, method = 'GET' }) => {    
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    
    const fetcher = useCallback(
        (body) => fetch(url, { 
            method, 
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()),
        [url, method])

    var service = useCallback(
        (body) => {
            setLoading(true)
            fetcher(body).then(res => {
                setData(res)
                setLoading(false)
            })
        },
        [fetcher])

    return [ 
        service,
        loading,
        data
    ]
}

export const useData = ({ url }) => {
    const [service, loading, data] = useService({ url })
    
    useEffect(() => service(), [url])

    return [data, data === null || loading]
}