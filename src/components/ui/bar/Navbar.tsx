import React from 'react'
import { Button } from '../button'
import { Utensils } from 'lucide-react'

const Navbar = () => {
    return (
        <header>
            <div className="flex justify-between items-center p-4 bg-gray-100 max-w-7xl mx-auto">
                <div className="flex gap-4 text-2xl font-bold">
                    <span><Utensils /></span>
                    Logo</div>
                <div className="flex items-center p-4">
                    <ul className='flex gap-8'>
                        <li>Menu</li>
                        <li>Events</li>
                        <li>Gallery</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <Button variant="outline" className="mr-4 rounded-bl-none rounded-tr-none p-6 shadow-sm">Book a table</Button>
            </div>
        </header>

    )
}

export default Navbar
