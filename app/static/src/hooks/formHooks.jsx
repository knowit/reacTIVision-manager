import {
    useContext,
    useEffect,
    useCallback,
    useState } from 'react'
import { FormContext } from '../components/Form'

export const useForm = (initial = null) => {
    const [form, setForm] = useState(initial)

    const onChange = useCallback(
        (fieldName, value) => {
            setForm({
                ...form,
                [fieldName]: value
            })
        }, [form])
    
    return [
        form,
        onChange
    ]
}

export const useValue = (name, initial) => {
    const {  options: { onChange }, form } = useContext(FormContext)
    
    useEffect(
        () => {
            if (!form || !(name in form)){
                onChange(name, initial)
            }
        },
        [form, name, initial])

    return form && (name in form) ? form[name] : initial
}

export const useOptionValues = (options) => {
    const [listValues, setListValues] = useState([])

    useEffect(
        () => {
            if (Array.isArray(options)) {
                setListValues(options)
                return
            }
            const { url, root } = options;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setListValues(res[root])
                })
        },
        [options])

    return listValues
}

export const useOptions = () => {
    const { options } = useContext(FormContext)
    return options
}