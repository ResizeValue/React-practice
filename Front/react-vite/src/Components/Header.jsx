import React from 'react'
import { Link } from 'react-router-dom'

const Header = props => {

    return (
        <header className="flex flex-row bg-slate-600 shadow-lg">
            <nav className="flex flex-row container mx-auto">
                <Link to="/">
                    <p className="text-4xl p-3 font-bold text-sky-500">React Products</p>
                </Link>
            </nav>
        </header>
    )
}

export default Header