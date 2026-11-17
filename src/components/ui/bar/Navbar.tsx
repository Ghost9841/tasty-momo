
'use client'

import { Button } from '../button'
import { Utensils, Menu, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CustomLink from './CustomLink'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet'

const navLinks = [
    { href: '/menu', title: 'Menu', number: '01' },
    { href: '/events', title: 'Events', number: '02' },
    { href: '/gallery', title: 'Gallery', number: '03' },
    { href: '/about', title: 'About', number: '04' },
    { href: '/contact', title: 'Contact', number: '05' },
]
const mobilenavLinks = [
    { href: '/', title: 'Home', number: '00' },
    { href: '/menu', title: 'Menu', number: '01' },
    { href: '/events', title: 'Events', number: '02' },
    { href: '/gallery', title: 'Gallery', number: '03' },
    { href: '/about', title: 'About', number: '04' },
    { href: '/contact', title: 'Contact', number: '05' },
]

const menuVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.15,
        },
    },
}

const linkVariants = {
    hidden: { opacity: 0, x: 25 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const Navbar = () => {
    return (
        <nav className="px-4">
            <header className="bg-white mt-4 md:mt-8 rounded-lg shadow-sm">
                <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
                        <Utensils className="text-[#ee7125]" size={28} />
                        Logo
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <CustomLink
                                    key={link.href}
                                    href={link.href}
                                    title={link.title}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Booking */}
                    <div className="hidden lg:block">
                        <Button
                            className="bg-[#ee7125] text-white hover:bg-[#d96019] rounded-bl-none rounded-tr-none px-6 py-6 shadow-sm"
                        >
                            Book a table
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger
                                className="h-11 w-11 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                                aria-label="Open navigation menu"
                            >
                                <Menu size={25} />
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-[min(88vw,400px)] sm:max-w-100 p-0 border-l-0 bg-[#fffdf9]"
                            >
                                {/* Drawer Header */}
                                <SheetHeader className="p-7 pb-6 border-b border-orange-100 text-left">
                                    <SheetTitle className="flex items-center gap-3 text-2xl font-bold">
                                        <Utensils className="text-[#ee7125]" size={27} />
                                        Logo
                                    </SheetTitle>

                                    <p className="text-sm text-gray-400 font-normal mt-2">
                                        A little taste of something special.
                                    </p>
                                </SheetHeader>

                                {/* Navigation Links */}
                                <div className="px-7 pt-10">
                                    <p className="text-xs font-semibold tracking-[0.2em] text-[#ee7125] uppercase mb-7">
                                        Explore
                                    </p>

                                    <motion.div
                                        variants={menuVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="flex flex-col"
                                    >
                                        {mobilenavLinks.map((link) => (
                                            <motion.div
                                                key={link.href}
                                                variants={linkVariants}
                                            >
                                                <SheetClose
                                                    nativeButton={false}
                                                    render={
                                                        <Link
                                                            href={link.href}
                                                            className="group flex items-center justify-between py-4 border-b border-gray-200/80"
                                                        >
                                                            <div className="flex items-center gap-5">
                                                                <span className="text-xs text-gray-400 font-medium">
                                                                    {link.number}
                                                                </span>

                                                                <span className="text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#ee7125]">
                                                                    {link.title}
                                                                </span>
                                                            </div>

                                                            <ArrowUpRight
                                                                size={19}
                                                                className="text-gray-300 transition-all duration-300 group-hover:text-[#ee7125] group-hover:-translate-y-1 group-hover:translate-x-1"
                                                            />
                                                        </Link>
                                                    }
                                                />

                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Booking Section */}
                                {/* Booking Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                    className="px-7 mt-10"
                                >
                                    <SheetClose
                                        render={
                                            <Button className="w-full h-14 bg-[#ee7125] hover:bg-[#d96019] text-white text-base font-semibold rounded-bl-none rounded-tr-none shadow-md">
                                                Book a table
                                                <ArrowUpRight size={19} className="ml-2" />
                                            </Button>
                                        }
                                    />

                                    <p className="text-center text-xs text-gray-400 mt-6">
                                        We look forward to serving you.
                                    </p>
                                </motion.div>

                                {/* Bottom Decoration */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ee7125]" />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </nav>
    )
}

export default Navbar
