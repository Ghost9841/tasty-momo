'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gelasio, Inter } from 'next/font/google'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

// Serif for headline + buttons, clean sans for body copy
const serif = Gelasio({ subsets: ['latin'], weight: ['500', '600', '700'] })
const sans = Inter({ subsets: ['latin'] })

const socials = [
  { label: 'Facebook', Icon: FaFacebook, href: '#' },
  { label: 'Instagram', Icon: FaInstagram, href: '#' },
  { label: 'Twitter', Icon: FaTwitter, href: '#' },
]

const HeroSection = () => {
  return (
    <section
      id="hero"
      className={`${sans.className} relative isolate overflow-hidden bg-white`}
    >
      {/* Thin decorative arcs, top-left */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-72 -z-10 h-[640px] w-[640px] text-gray-300"
        viewBox="0 0 640 640"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="320" cy="320" r="300" />
        <circle cx="320" cy="320" r="360" />
        <circle cx="320" cy="320" r="420" />
      </svg>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-12 lg:py-28">
        {/* ───────── LEFT: copy ───────── */}
        <div className="relative">
          {/* Circular rotating badge */}
          <motion.svg
            aria-hidden
            viewBox="0 0 100 100"
            className="mb-16 h-24 w-24 text-[#121b2b]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          >
            <defs>
              <path
                id="badge-circle"
                d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
              />
            </defs>
            <text fontSize="10" fontWeight="600" letterSpacing="5" fill="currentColor">
              <textPath href="#badge-circle">FOODSDELICIOSE</textPath>
            </text>
          </motion.svg>

          <h1
            className={`${serif.className} text-5xl font-semibold leading-[1.1] tracking-tight text-[#121b2b] md:text-6xl`}
          >
            We provide the
            <br />
            best food for you
          </h1>

          <p className="mt-12 max-w-sm text-sm leading-7 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Buttons: soft coloured shadows are what give them the "floating" look */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#menu"
              className={`${serif.className} rounded-lg bg-[#121b2b] px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_24px_-8px_rgba(18,27,43,0.45)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121b2b]`}
            >
              Menu
            </a>
            <a
              href="#booking"
              className={`${serif.className} rounded-lg bg-[#ee7125] px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_24px_-8px_rgba(238,113,37,0.55)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7125]`}
            >
              Book a table
            </a>
          </div>

          {/* Socials + trailing line */}
          <div className="mt-16 flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#121b2b] text-[#121b2b] transition hover:bg-[#121b2b] hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
            <span className="ml-3 h-px w-24 bg-gray-300" />
          </div>
        </div>

        {/* ───────── RIGHT: imagery ───────── */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Botanical sketches sit BEHIND the photo (low z-index, pale grey) */}
          <Image
            src="/herb-top.png"
            alt=""
            aria-hidden
            width={260}
            height={200}
            className="pointer-events-none absolute -top-16 left-0 -z-10 opacity-60"
          />
          <Image
            src="/leaf-top-right.png"
            alt=""
            aria-hidden
            width={200}
            height={260}
            className="pointer-events-none absolute -right-10 -top-20 -z-10 opacity-60"
          />
          <Image
            src="/herb-bottom-right.png"
            alt=""
            aria-hidden
            width={220}
            height={300}
            className="pointer-events-none absolute -right-14 bottom-16 -z-10 opacity-60"
          />

          {/* Photo with uneven corners: small on the left, big sweep bottom-right */}
          <div className="relative ml-auto aspect-[4/5] w-[78%] overflow-hidden rounded-tl-[44px] rounded-tr-[44px] rounded-br-[100px] rounded-bl-[24px] bg-black">
            <Image
              src="/restaurant.jpg"
              alt="Warmly lit restaurant interior with pendant lamps and wooden chairs"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>

          {/* Plate overlaps the photo's bottom-left edge. Use a transparent PNG. */}
          <motion.div
            className="absolute -left-2 bottom-10 w-[52%] drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)] sm:-left-6 lg:-left-10"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          >
            <Image
              src="/FoodDeliciousTastyMomo.png"
              alt="Plate of fresh papaya salad"
              width={420}
              height={420}
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection