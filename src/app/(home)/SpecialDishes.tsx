'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Gelasio, Inter } from 'next/font/google'
import { Reveal, MaskText, stagger, rise, popIn, viewportOnce, ease } from '@/lib/motion'

const serif = Gelasio({ subsets: ['latin'], weight: ['500', '600', '700'] })
const sans = Inter({ subsets: ['latin'] })

const dishes = [
  {
    id: 1,
    name: 'Lumpia with Sauce',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/landingpage/dish-1-1.png', // transparent PNG, cropped to the plate
  },
  {
    id: 2,
    name: 'Fish and Veggie',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/landingpage/dish-2-1.png',
  },
  {
    id: 3,
    name: 'Tofu Chili',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/landingpage/dish-5.png',
  },
  {
    id: 4,
    name: 'Egg and Cucumber',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/landingpage/dish-4.png',
  },
]

// The plate drops in and untwists after its card has risen
const plateIn: Variants = {
  hidden: { opacity: 0, y: -50, rotate: -35, scale: 0.7 },
  show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 1, ease, delay: 0.2 } },
}

const SpecialDishes = () => {
  // The first card starts "selected" (white fill). Hover/focus moves the highlight.
  const [active, setActive] = useState(1)

  return (
    <section
      id="special-dishes"
      className={`${sans.className} relative isolate min-h-screen overflow-hidden bg-[#f3f5f4] py-20`}
    >
      {/* Faint botanical sketches behind everything */}
      <Reveal
        from="scale"
        duration={1.4}
        className="pointer-events-none absolute left-[12%] top-6 -z-10 hidden md:block"
      >
        <Image src="/landingpage/clover-leaf-2.png" alt="" aria-hidden width={300} height={220} />
      </Reveal>
      <Reveal
        from="scale"
        duration={1.4}
        delay={0.15}
        className="pointer-events-none absolute right-[18%] top-0 -z-10 hidden md:block"
      >
        <Image src="/landingpage/leaf-grass.png" alt="" aria-hidden width={200} height={280} />
      </Reveal>
      <Reveal
        from="scale"
        duration={1.4}
        delay={0.3}
        className="pointer-events-none absolute bottom-16 right-[8%] -z-10 hidden md:block"
      >
        <Image src="/landingpage/full-garlic.png" alt="" aria-hidden width={200} height={150} />
      </Reveal>
      <div className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 hidden -translate-x-1/2 md:block">
        <Reveal from="fade" duration={1.6} delay={0.3}>
          <Image
            src="/landingpage/fern-2.png"
            alt=""
            aria-hidden
            width={220}
            height={140}
            className="opacity-60"
          />
        </Reveal>
      </div>

      {/* Heading */}
      <div className="mx-auto max-w-lg px-6 text-center">
        <MaskText
          lines={['Our Special Dishes']}
          className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}
        />
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm leading-7 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </Reveal>
      </div>

      {/* Cards: rise one after another, then each plate drops in */}
      <motion.div
        variants={stagger(0.15, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-28 grid max-w-6xl gap-x-6 gap-y-28 px-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dishes.map((dish) => {
          const isActive = dish.id === active

          return (
            <motion.article
              key={dish.id}
              variants={rise}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              tabIndex={0}
              onMouseEnter={() => setActive(dish.id)}
              onFocus={() => setActive(dish.id)}
              // Uneven corners: big top-left + bottom-right, small on the other two.
              // Only colour/shadow use CSS transitions, so they don't fight the motion transforms.
              className={`relative rounded-tl-[44px] rounded-tr-[14px] rounded-br-[44px] rounded-bl-[14px] border-2 px-6 pb-12 pt-32 text-center outline-none transition-[background-color,border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#121b2b] ${
                isActive
                  ? 'border-white bg-white shadow-[0_20px_40px_-20px_rgba(18,27,43,0.25)]'
                  : 'border-white/90 bg-transparent'
              }`}
            >
              {/* Plate sticks out of the top of the card */}
              <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2">
                <motion.div
                  variants={plateIn}
                  whileHover={{
                    rotate: 8,
                    scale: 1.06,
                    transition: { type: 'spring', stiffness: 200, damping: 15 },
                  }}
                  className="relative size-full"
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.18)]"
                  />

                  {/* Price badge pops in last */}
                  <motion.span
                    variants={popIn(0.7)}
                    className="absolute -right-3 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#121b2b] text-sm font-semibold text-white shadow-[0_10px_18px_-6px_rgba(18,27,43,0.5)]"
                  >
                    ${dish.price}
                  </motion.span>
                </motion.div>
              </div>

              <h3 className={`${serif.className} mt-6 text-base font-semibold text-[#121b2b]`}>
                {dish.name}
              </h3>
              <p className="mx-auto mt-5 max-w-[14rem] text-xs leading-6 text-slate-500">
                {dish.description}
              </p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export default SpecialDishes
