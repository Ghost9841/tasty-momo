'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { serif, sans } from '@/lib/fonts'

const testimonials = [
  { id: 1, name: 'Ama Ampomah', role: 'CEO & Founder Inc', avatar: '/avatars/ama.jpg', rating: 5,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
  { id: 2, name: 'Kweku Asante', role: 'CEO & Founder Inc', avatar: '/avatars/kweku.jpg', rating: 5,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
  { id: 3, name: 'Customer Three', role: 'Food Blogger', avatar: '/avatars/three.jpg', rating: 5,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
  { id: 4, name: 'Customer Four', role: 'Regular Guest', avatar: '/avatars/four.jpg', rating: 4,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
  { id: 5, name: 'Customer Five', role: 'Event Planner', avatar: '/avatars/five.jpg', rating: 5,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
  { id: 6, name: 'Customer Six', role: 'Local Guide', avatar: '/avatars/six.jpg', rating: 5,
    quote: 'Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Proin iaculis platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt tempus semper.' },
]

const GAP = 24 // matches gap-6

const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Distance between the start of one card and the next
  const step = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + GAP : 0
  }

  const handleScroll = () => {
    const s = step()
    if (!s || !trackRef.current) return
    setActive(Math.round(trackRef.current.scrollLeft / s))
  }

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: 'smooth' })

  return (
    <section
      id="testimonials"
      className={`${sans.className} relative isolate overflow-hidden bg-[#f3f5f4] pb-28 pt-20`}
    >
      {/* Fried-egg pan sketch, bleeding off the left edge */}
      <Image src="/pan-sketch.png" alt="" aria-hidden width={380} height={460}
        className="pointer-events-none absolute -left-24 top-6 -z-10 hidden opacity-60 md:block" />

      <div className="mx-auto max-w-md px-6 text-center">
        <h2 className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}>
          Our Happy Customers
        </h2>
        <p className="mt-6 text-sm leading-7 text-slate-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </p>
      </div>

      {/* Scroll-snap track: first card centred, next one peeks in */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        tabIndex={0}
        className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc((100vw_-_min(560px,85vw))/2)] pb-6 pt-12 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-[#121b2b] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="relative w-[min(560px,85vw)] shrink-0 snap-center rounded-tl-[44px] rounded-tr-[44px] rounded-br-[72px] rounded-bl-[16px] bg-white px-8 pb-10 pt-16 text-center shadow-[0_20px_40px_-24px_rgba(18,27,43,0.25)] sm:px-14"
          >
            {/* Avatar + stars overlap the top edge */}
            <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <Image
                src={t.avatar}
                alt={t.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border-4 border-[#f3f5f4] object-cover"
              />
              <div className="mt-2 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} aria-hidden
                    className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                ))}
              </div>
            </div>

            <blockquote className="mt-6 text-xs leading-6 text-slate-500">{t.quote}</blockquote>
            <figcaption className="mt-6">
              <p className={`${serif.className} text-sm font-semibold text-[#121b2b]`}>{t.name}</p>
              <p className="mt-1 text-xs text-slate-500">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-10 flex justify-center gap-3">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === active}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active ? 'bg-[#ee7125]' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
