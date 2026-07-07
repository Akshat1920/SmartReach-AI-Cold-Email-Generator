import React from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'

const Header = () => {

    const { user } = useAppContext();
    return (
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md fixed w-full z-50 transition-all mb-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                            Smart<span className='text-blue-600'>Reach</span> AI
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 text-sm transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
