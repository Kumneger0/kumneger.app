import Link from 'next/link';
import React from 'react'

function blogHeader() {
    return (
        <header className="bg-gray-800 p-6 fixed w-full z-50 overflow-x-hidden top-0 left-0">

            <nav className="flex items-center justify-between flex-wrap w-4/5 max-w-7xl mx-auto lg:gap-20">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link
                        href="/"
                        className="group text-white max-[500px]:text-lg text-2xl transition duration-300">
                        Kumneger Wondimu
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default blogHeader