import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            {/* Desktop */}
            <nav
                className={`max-md:absolute max-md:top-20  max-md:pt-10 max-md:w-full max-md:text-center max-md:h-auto max-md:left-0
    max-md:bg-transparent max-md:backdrop-blur-xl max-md:z-1 max-md:pb-10 max-md:z-50 max-md:transition transition-transform transform ${isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
                    }`}
            >
                <ul className="navItems flex gap-10 max-md:flex-col max-md:gap-10 max-md:gap-1 max-md:w-full ">
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? " bg-gray-500/60 p-4 rounded-xl" : "text-white"} onClick={toggleMobileMenu}>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to='words' className={({ isActive }) => isActive ? "bg-gray-500/60 p-4 rounded-xl" : "text-white"} onClick={toggleMobileMenu}>WORDS</NavLink>
                    </li>
                    <li>
                        <NavLink to='/learn' className={({ isActive }) => isActive ? "bg-gray-500/60 p-4 rounded-xl" : "text-white"} onClick={toggleMobileMenu}>LEARN</NavLink>
                    </li>
                    <li>
                        <NavLink to='/archive' className={({ isActive }) => isActive ? "bg-gray-500/60 p-4 rounded-xl" : "text-white" } onClick={toggleMobileMenu}>ARCHIVE</NavLink>
                    </li>
                </ul>
            </nav>

            {/* Mobile */}
            <div className="md:hidden">
                <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
                    {isOpen ? (
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 6h16" y1="8" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h16" y1="14" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 18h16" y1="20" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
};

export default Nav;