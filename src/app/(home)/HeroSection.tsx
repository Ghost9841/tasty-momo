'use client'

import { motion } from 'framer-motion'
const HeroSection = () => {
    return (
        <section id="hero" className="bg-gray-100 py-20 max-w-8xl mx-auto">
            <motion.img src="/FoodDeliciousTastyMomo.png"
            alt="Hero Image" 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 10 }} 
            />
            <h1 className='text-6xl font-bold'>We provide the <br/> best foor for you</h1>
        </section>
    )
}

export default HeroSection