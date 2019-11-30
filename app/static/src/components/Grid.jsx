import React from 'react'

export const Container = ({children}) => <div className="container">{children}</div>

export const Row = ({children}) => <div className="row">{children}</div>

export const Col = ({children, size = null}) => 
    <div className={size == null ? "col" : `col-${size}`}>{children}</div>
