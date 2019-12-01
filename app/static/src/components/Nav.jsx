import React from 'react'

const Nav = ({links = []}) => {
    return (
        <nav className="nav">
            {links.map(l => <a className="nav-link" key={l.name} href={l.href}>{l.name}</a>)}
        </nav>
    )
}

export default Nav