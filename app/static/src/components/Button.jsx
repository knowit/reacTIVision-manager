import React from 'react'

export const Button = ({
    children,
    color = "primary",
    outline = false,
    disabled = false,
    onClick = () => {}
}) => {
    const className = `btn ${outline ? 'btn-outline' : 'btn'}-${color}`

    return (
        <button 
            type="button" 
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button> 
    )
}

export const LoadingButton = ({ loading, children, ...props}) => {

    const loadingComponent = loading 
        ? <span className="spinner-border spinner-border-sm"></span> 
        : null

    props.disabled = props.disabled || loading
    return (
        <Button {...props}>
            {loadingComponent}
            {children}
        </Button>
    )
}