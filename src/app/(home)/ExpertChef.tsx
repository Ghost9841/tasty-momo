'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import ActionButtons from '@/components/ActionButtons'
import { serif, sans } from '@/lib/fonts'
import { Reveal, MaskText, stagger, popIn, ease, viewportOnce } from '@/lib/motion'

const points = [
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
]

const item: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

const ExpertChef = () => {
  return (
    <section
      id="chef"
      className={`${sans.className} relative isolate overflow-hidden bg-white py-24`}
    >
      <Reveal
        from="scale"
        duration={1.4}
        className="pointer-events-none absolute -left-10 top-4 -z-10 hidden md:block"
      >
        <Image src="/landingpage/garlic-2.png" alt="" aria-hidden width={119} height={124} />
      </Reveal>
      <Reveal
        from="scale"
        duration={1.4}
        delay={0.2}
        className="pointer-events-none absolute left-30 top-4 -z-10 hidden md:block"
      >
        <Image src="/landingpage/full-garlic.png" alt="" aria-hidden width={260} height={260} />
      </Reveal>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 lg:px-12">
        {/* Copy */}
        <div>
          <MaskText
            lines={['Our Expert Chef']}
            className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xs text-sm leading-7 text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Reveal>

          {/* Points slide in one by one, each tick pops */}
          <motion.ul
            variants={stagger(0.1, 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2"
          >
            {points.map((text, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-start gap-3 text-xs leading-5 text-slate-500"
              >
                <motion.span
                  variants={popIn(0.15)}
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ee7125] text-white"
                >
                  <Check size={10} strokeWidth={3} aria-hidden />
                </motion.span>
                {text}
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.4}>
            <ActionButtons className="mt-12" />
          </Reveal>
        </div>

        {/* Chef in an orange circle: the circle grows, then the chef rises out of it */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute bottom-0 left-1/2 aspect-square w-[92%] -translate-x-1/2">
            <motion.div
              className="size-full origin-bottom rounded-full bg-gradient-to-br from-[#f58a2f] to-[#f0561f]"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease }}
            />
          </div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
          >
            <Image
              src="/landingpage/chef-1.png"
              alt="Smiling chef in a white uniform holding a plate of salad"
              fill
              sizes="(min-width: 768px) 24rem, 80vw"
              className="object-contain object-bottom"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ExpertChef
