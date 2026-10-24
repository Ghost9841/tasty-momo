'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Gelasio, Inter } from 'next/font/google'

const serif = Gelasio({ subsets: ['latin'], weight: ['500', '600', '700'] })
const sans = Inter({ subsets: ['latin'] })

const dishes = [
  {
    id: 1,
    name: 'Lumpia with Sauce',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/images/dish1.png', // transparent PNG, cropped to the plate
  },
  {
    id: 2,
    name: 'Fish and Veggie',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/images/dish2.png',
  },
  {
    id: 3,
    name: 'Tofu Chili',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/images/dish3.png',
  },
  {
    id: 4,
    name: 'Egg and Cucumber',
    description: 'Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor',
    price: 12,
    image: '/images/dish4.png',
  },
]

const SpecialDishes = () => {
  // The first card starts "selected" (white fill). Hover/focus moves the highlight.
  const [active, setActive] = useState(1)

  return (
    <section
      id="special-dishes"
      className={`${sans.className} relative isolate overflow-hidden bg-[#f3f5f4] py-20`}
    >
      {/* Faint botanical sketches behind everything */}
      <Image
        src="/basil.png"
        alt=""
        aria-hidden
        width={300}
        height={220}
        className="pointer-events-none absolute left-[12%] top-6 -z-10 hidden opacity-50 md:block"
      />
      <Image
        src="/rosemary.png"
        alt=""
        aria-hidden
        width={200}
        height={280}
        className="pointer-events-none absolute right-[18%] top-0 -z-10 hidden opacity-50 md:block"
      />
      <Image
        src="/garlic.png"
        alt=""
        aria-hidden
        width={200}
        height={150}
        className="pointer-events-none absolute bottom-16 right-[8%] -z-10 hidden opacity-50 md:block"
      />
      <Image
        src="/parsley.png"
        alt=""
        aria-hidden
        width={220}
        height={140}
        className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 hidden -translate-x-1/2 opacity-50 md:block"
      />

      {/* Heading */}
      <div className="mx-auto max-w-md px-6 text-center">
        <h2
          className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}
        >
          Our Special Dishes
        </h2>
        <p className="mt-6 text-sm leading-7 text-slate-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-28 grid max-w-6xl gap-x-6 gap-y-28 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => {
          const isActive = dish.id === active

          return (
            <article
              key={dish.id}
              tabIndex={0}
              onMouseEnter={() => setActive(dish.id)}
              onFocus={() => setActive(dish.id)}
              // Uneven corners: big top-left + bottom-right, small on the other two
              className={`relative rounded-tl-[44px] rounded-tr-[14px] rounded-br-[44px] rounded-bl-[14px] border-2 px-6 pb-12 pt-32 text-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#121b2b] ${
                isActive
                  ? 'border-white bg-white shadow-[0_20px_40px_-20px_rgba(18,27,43,0.25)]'
                  : 'border-white/90 bg-transparent'
              }`}
            >
              {/* Plate sticks out of the top of the card */}
              <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="160px"
                  className="object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.18)]"
                />

                {/* Price badge */}
                <span className="absolute -right-3 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#121b2b] text-sm font-semibold text-white shadow-[0_10px_18px_-6px_rgba(18,27,43,0.5)]">
                  ${dish.price}
                </span>
              </div>

              <h3
                className={`${serif.className} mt-6 text-base font-semibold text-[#121b2b]`}
              >
                {dish.name}
              </h3>
              <p className="mx-auto mt-5 max-w-[14rem] text-xs leading-6 text-slate-500">
                {dish.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SpecialDishes