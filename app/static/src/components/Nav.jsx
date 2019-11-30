import React from 'react'

const Nav = ({links = []}) => {
    return (
        <nav class="nav">
            {links.map(l => <a class="nav-link" href={l.href}>{l.name}</a>)}
        </nav>
    )
}

export default Nav