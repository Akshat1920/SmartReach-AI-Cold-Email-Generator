import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const Hero = () => {

    const {user} = useAppContext();

  return (
     <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
                        Write Cold Emails That <br className="hidden md:block" />
                        <span className="text-blue-600 bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Actually Get Replies</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Stop wasting hours drafting outreach. Enter your prospect's context, and let our AI generate the perfect structured sequence. Email, Follow-up, and LinkedIn DM all at once.
                    </p>
                    <div className="mt-10 flex justify-center gap-x-6">
                        <Link
                            to={user ? "/dashboard" : "/signup"}
                            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                        >
                            Start Generating for Free
                            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default Hero
