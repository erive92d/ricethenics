import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar bg-black py-8 px-12 border-b border-lime-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu text-lg menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href="/runs">Runs</Link></li>
                        <li><Link href="/calendar">Calendar</Link></li>
                        <li><Link href="/about">About</Link></li>

                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl text-lime-400 italic font-bold">RICETHENICS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    <li><Link href="/runs">Runs</Link></li>
                    <li><Link href="/calendar">Calendar</Link></li>
                    <li><Link href="/about">About</Link></li>

                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-ghost bg-lime-400 text-black">Join us</a>
            </div>
        </div>
    )
}
