import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <span className="text-xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                    SmartReach AI
                </span>
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} SmartReach AI. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
