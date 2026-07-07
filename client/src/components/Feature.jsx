import React from 'react'
import { BoltIcon ,DocumentTextIcon , ChartBarIcon} from '@heroicons/react/24/outline';


const Feature = () => {
    const features = [
            {
                name: 'Lightning Fast Generation',
                description: 'Generate highly custom cold emails in seconds using state-of-the-art AI.',
                icon: BoltIcon,
            },
            {
                name: 'Omnichannel Outreach',
                description: 'Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect.',
                icon: DocumentTextIcon,
            },
            {
                name: ' Higher Conversion Rates',
                description: 'Personalized copy ensures higher open rates and better reply outcomes.',
                icon: ChartBarIcon,
            },
        ];
  return (
    <div className="py-24 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to close more deals</h2>
                        <p className="mt-4 text-lg text-gray-600 border-b-2 border-transparent inline-block pb-1">Built for sales teams who demand performance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                                    <feature.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
  )
}

export default Feature
