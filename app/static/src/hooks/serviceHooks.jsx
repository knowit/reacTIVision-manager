import React, { 
    useEffect, 
    useState, 
    useCallback,
    useMemo } from 'react'


export const useService = ({ url }) => {    
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    
    const fetcher = useMemo(
        () => () => fetch(url).then(res => res.json()),
        [url])

    var service = useCallback(
        () => {
            setLoading(true)
            fetcher().then(res => {
                setLoading(false)
                setData(res)
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

    return [data, loading]
}