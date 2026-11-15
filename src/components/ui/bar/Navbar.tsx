import React from 'react'
import { Button } from '../button'
import { Utensils } from 'lucide-react'
import CustomLink from './CustomLink'

const Navbar = () => {
    return (
        <nav className="">

        <header className="bg-white mt-8">
            <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                <div className="flex gap-4 text-2xl font-bold">
                    <span><Utensils /></span>
                    Logo</div>
                <div className="flex items-center p-4">
                    <ul className='flex gap-8'>
                       <CustomLink href="/menu" title="Menu" />
                       <CustomLink href="/events" title="Events" />
                       <CustomLink href="/gallery" title="Gallery" />
                       <CustomLink href="/about" title="About" />
                       <CustomLink href="/contact" title="Contact" />
                    </ul>
                </div>
                <Button variant="outline" className="mr-4 bg-[#ee7125] text-white rounded-bl-none rounded-tr-none p-6 shadow-sm">Book a table</Button>
            </div>
        </header>
        </nav>
    )
}

export default Navbar
