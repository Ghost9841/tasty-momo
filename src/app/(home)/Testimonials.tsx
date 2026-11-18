'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Star } from 'lucide-react'
import { serif, sans } from '@/lib/fonts'
import { Reveal, MaskText, stagger, popIn, ease, viewportOnce } from '@/lib/motion'

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

const cardIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

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
      {/* Fried-egg pan sketch, slides in from the left edge */}
      <Reveal
        from="left"
        duration={1.4}
        className="pointer-events-none absolute top-6 -z-10 hidden md:block"
      >
        <Image src="/landingpage/pan-sketch.png" alt="" aria-hidden width={600} height={240} />
      </Reveal>

      <div className="mx-auto max-w-md px-6 text-center">
        <MaskText
          lines={['Our Happy Customers']}
          className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}
        />
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm leading-7 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
        </Reveal>
      </div>

      {/* Scroll-snap track: first card centred, next one peeks in. Cards rise in one by one. */}
      <motion.div
        ref={trackRef}
        onScroll={handleScroll}
        variants={stagger(0.15, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        tabIndex={0}
        className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc((100vw_-_min(560px,85vw))/2)] pb-6 pt-12 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-[#121b2b] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <motion.figure
            key={t.id}
            variants={cardIn}
            className="relative w-[min(560px,85vw)] shrink-0 snap-center rounded-tl-[72px] rounded-tr-[16px] rounded-br-[72px] rounded-bl-[16px] bg-white px-8 pb-10 pt-16 text-center shadow-[0_20px_40px_-24px_rgba(18,27,43,0.25)] sm:px-14"
          >
            {/* Avatar + stars overlap the top edge: avatar pops, stars twinkle in */}
            <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <motion.div variants={popIn(0.35)}>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border-4 border-[#f3f5f4] object-cover"
                />
              </motion.div>
              <div className="mt-2 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span key={i} variants={popIn(0.5 + i * 0.07)} className="flex">
                    <Star size={14} aria-hidden
                      className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  </motion.span>
                ))}
              </div>
            </div>

            <blockquote className="mt-6 text-xs leading-6 text-slate-500">{t.quote}</blockquote>
            <figcaption className="mt-6">
              <p className={`${serif.className} text-sm font-semibold text-[#121b2b]`}>{t.name}</p>
              <p className="mt-1 text-xs text-slate-500">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {/* Dots: the active one stretches into a pill */}
      <Reveal delay={0.3} className="mt-10 flex justify-center gap-3">
        {testimonials.map((t, i) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === active}
            className="h-1.5 rounded-full"
            initial={false}
            animate={{
              width: i === active ? 24 : 6,
              backgroundColor: i === active ? '#ee7125' : '#d1d5db',
            }}
            whileHover={{ scale: 1.35 }}
            transition={{ duration: 0.35, ease }}
          />
        ))}
      </Reveal>
    </section>
  )
}

export default Testimonials
