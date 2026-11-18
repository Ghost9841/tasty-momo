'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import ActionButtons from '@/components/ActionButtons'
import { serif, sans } from '@/lib/fonts'
import { Reveal, MaskText, ease, viewportOnce } from '@/lib/motion'

const WelcomeSection = () => {
  // The plate turns as the section scrolls past (smooth with Lenis)
  const plateRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: plateRef,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section
      id="welcome"
      className={`${sans.className} relative isolate overflow-hidden bg-[#f3f5f4] py-24`}
    >
      {/* Faint sketches */}
      <Reveal
        from="scale"
        duration={1.4}
        className="pointer-events-none absolute left-[52%] top-10 -z-10 hidden md:block"
      >
        <Image src="/landingpage/clover-leaf-2.png" alt="" aria-hidden width={220} height={140} />
      </Reveal>
      <Reveal
        from="scale"
        duration={1.4}
        delay={0.15}
        className="pointer-events-none absolute left-[12%] top-0 -z-10 hidden md:block"
      >
        <Image src="/landingpage/garlic-1.png" alt="" aria-hidden width={120} height={120} />
      </Reveal>
      <div className="pointer-events-none absolute -right-10 top-1/2 -z-10 hidden -translate-y-1/2 md:block">
        <Reveal from="right" duration={1.4}>
          <Image src="/landingpage/leaves.png" alt="" aria-hidden width={440} height={400} />
        </Reveal>
      </div>
      <Reveal
        from="scale"
        duration={1.4}
        delay={0.3}
        className="pointer-events-none absolute bottom-16 left-[52%] -z-10 hidden md:block"
      >
        <Image src="/landingpage/garlic-3.png" alt="" aria-hidden width={120} height={120} />
      </Reveal>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 lg:px-12">
        {/* Plate + basil leaves */}
        <div ref={plateRef} className="relative mx-auto w-full max-w-lg">
          {/* Plate grows in, then keeps turning with the scroll */}
          <motion.div
            className="drop-shadow-[0_24px_30px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease }}
          >
            <motion.div style={{ rotate }}>
              <Image
                src="/landingpage/dish-22.png"
                alt="Plate of fresh papaya salad"
                width={520}
                height={520}
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>

          {/* Leaves are static in the scroll turn, they just pop in around the plate */}
          <Reveal from="scale" delay={0.5} className="absolute -left-6 top-[18%] w-[22%]">
            <Image src="/landingpage/leaf-1.png" alt="" aria-hidden width={100} height={100}
              className="h-auto w-full -rotate-12" />
          </Reveal>
          <Reveal from="scale" delay={0.65} className="absolute -top-2 right-[-4%] w-[26%]">
            <Image src="/landingpage/leaf-3.png" alt="" aria-hidden width={110} height={110}
              className="h-auto w-full" />
          </Reveal>
          <Reveal from="scale" delay={0.8} className="absolute -bottom-2 left-[8%] w-[28%]">
            <Image src="/landingpage/leaf-2.png" alt="" aria-hidden width={100} height={100}
              className="h-auto w-full" />
          </Reveal>
          <Reveal from="scale" delay={0.95} className="absolute -bottom-2 left-[68%] w-[28%]">
            <Image src="/landingpage/leaf-4.png" alt="" aria-hidden width={110} height={110}
              className="h-auto w-full rotate-[80deg]" />
          </Reveal>
        </div>

        {/* Copy */}
        <div className="md:pl-6">
          <MaskText
            lines={['Welcome to Our', 'Restaurant']}
            className={`${serif.className} text-4xl font-semibold leading-tight tracking-tight text-[#121b2b] md:text-5xl`}
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xs text-sm leading-7 text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ActionButtons className="mt-8" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
