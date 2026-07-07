import React from 'react'
import { DocumentTextIcon, ChartBarIcon ,  } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const CreateAccount = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to scale your outreach?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Join hundreds of sales professionals using MailGen to accelerate their pipeline today.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/signup"
                                className="rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="gradient">
                            <stop stopColor="#4f46e5" />
                            <stop offset="1" stopColor="#818cf8" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
  )
}

export default CreateAccount
