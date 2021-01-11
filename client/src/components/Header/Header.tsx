import React, {useState} from 'react';
import useAuth from "../../context/auth";
import {Link, LinkGetProps, LinkProps} from '@reach/router';

export function Header() {
    const {state: {user}} = useAuth();
    const [isDropdown, setIsDropdown] = useState(false);

    return (
        <div className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="#">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10"
                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt=""/>
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button type="button"
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        <NavLink to="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Home
                        </NavLink>
                        <NavLink to="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Docs
                        </NavLink>
                    </nav>
                    {
                        user ? <div className="relative inline-block text-left">
                            <div>
                                <button onClick={() => {
                                    setIsDropdown(!isDropdown)
                                }} type="button" className='flex -space-x-2 overflow-hidden'>
                                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                         src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>
                            <div className={isDropdown ? 'block' : 'hidden'}>
                                <div
                                    className=" origin-top-right absolute right-0 mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                                    role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <div className="py-1">
                                        <Link to="#"
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                              role="menuitem">My Account</Link>
                                    </div>
                                    <div className="py-1">
                                        <Link to="#"
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                              role="menuitem">Log out</Link>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <Link to="/login"
                                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Sign in
                            </Link>
                            <Link to="/register"
                                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Sign up
                            </Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

const NavLink = (props: LinkProps<{}>) => (
    // @ts-ignore
    <Link getProps={isActive} {...props} />
);

const isActive = ({isCurrent}: LinkGetProps) => {
    return isCurrent
        ? {className: 'nav-link active'}
        : {className: 'nav-link'};
};
