import React from 'react'
import Header from '../components/Header'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BoltIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import CreateAccount from '../components/CreateAccount';
import Footer from '../components/Footer';

export default function LandingPage() {
    const {user} = useAppContext();

     
       
  return (
     <div className="bg-white min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
            {/* Navigation */}
            <Header/>

            {/* Hero Section */}
            <Hero/>

            {/* Feature Section */}
            <Feature/>

            {/* Premium Look CTA */}
            <CreateAccount/>

            {/* Footer */}
            <Footer/>
        </div>
  )
}
