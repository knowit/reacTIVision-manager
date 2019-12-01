import React, {
    createContext,
    useEffect } from 'react'
import { LoadingButton } from './Button'
import { 
    useValue, 
    useOptions, 
    useForm } from '../hooks/formHooks'

export const FormContext = createContext()

export const Form = ({ 
    children, 
    readonly = false,
    loading = false,
    onSubmit = () => {}
}) => {
    const [form, onChange] = useForm()

    const context = {
        options: {
            readonly,
            loading,
            onChange,
            onSubmit: () => onSubmit(form)
        },
        form: form
    }

    return (
        <FormContext.Provider value={context}>
            <form>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export const FormGroup = ({
    name,
    label,
    children
}) => {
    const options = useOptions()
    const [form, onChange] = useForm()

    useEffect(
        () => options.onChange(name, form),
        [form])

    const context = {
        options: {
            ...options,
            onChange
        },
        form: form
    }

    return (
        <FormContext.Provider value={context}>
            <h4>{label}</h4>
            {children}
        </FormContext.Provider>
    )
}

export const TextField = ({
    label,
    name,
    initialValue,
    type = "text",
    readonly = false
}) => {
    const options = useOptions()
    const currentValue = useValue(name, initialValue)

    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                type={type} 
                className="form-control" 
                readOnly={options.readonly || readonly}
                value={currentValue}
                onChange={({target: { value }}) => options.onChange(name, value)}/>
        </div>
    )
}

export const CheckboxField = ({
    label,
    name,
    initialValue,
    readonly = false
}) => {
    const options = useOptions()
    const currentValue = useValue(name, initialValue)

    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                disabled={options.readonly || readonly}
                value={currentValue}
                checked={currentValue}
                onChange={() => options.onChange(name, !currentValue)}/>
            <label className="form-check-label">
                {label}
            </label>
        </div>
    )
}

export const SelectField = ({
    label,
    name,
    initialValue,
    items = [],
    readonly = false
}) => {
    const options = useOptions()
    const currentValue = useValue(name, initialValue)

    return (
        <div className="form-group">
        <label>{label}</label>
            <select 
                className="form-control"
                readOnly={options.readonly || readonly}
                value={currentValue}
                onChange={({target: { value }}) => options.onChange(name, value)}>
                    
                {items.map(i => <option key={i.value} value={i.value}>{i.label || i.value}</option>)}
            </select>
        </div>
    )
}

export const Submit = ({
    label,
    readonly = false,
    loading = false
}) => {
    const { onSubmit, ...options } = useOptions()

    return (
        <LoadingButton 
            type={"submit"} 
            disabled={options.readonly || readonly}
            loading={options.loading || loading}
            onClick={onSubmit}>
            {label}
        </LoadingButton>
    )
}

export const FormList = ({
    name,
    label,
    children: factory,
    items = []
}) => {
    const options = useOptions()
    const [form, onChange] = useForm(items.map((x, i) => { return { [i]: x } }))

    useEffect(
        () => options.onChange(name, form ? Object.values(form) : null),
        [form])

    const context = {
        options: {
            ...options,
            onChange
        },
        form: form
    }

    return (
        <FormContext.Provider value={context}>
            <h4>{label}</h4>
            {items.map((x, i) => (
                <FormGroup key={i} name={i}>
                    {factory(x)}
                </FormGroup>
            ))}
        </FormContext.Provider>
    )
}