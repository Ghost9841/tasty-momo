'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ActionButtons from '@/components/ActionButtons'
import { serif, sans } from '@/lib/fonts'

const WelcomeSection = () => {
  return (
    <section
      id="welcome"
      className={`${sans.className} relative isolate overflow-hidden bg-[#f3f5f4] py-24`}
    >
      {/* Faint sketches */}
      <Image src="/parsley.png" alt="" aria-hidden width={220} height={140}
        className="pointer-events-none absolute left-[42%] top-0 -z-10 hidden opacity-50 md:block" />
      <Image src="/rosemary-side.png" alt="" aria-hidden width={240} height={300}
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 hidden -translate-y-1/2 opacity-50 md:block" />
      <Image src="/garlic.png" alt="" aria-hidden width={120} height={120}
        className="pointer-events-none absolute bottom-16 left-[52%] -z-10 hidden opacity-50 md:block" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 lg:px-12">
        {/* Plate + basil leaves */}
        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
            className="drop-shadow-[0_24px_30px_rgba(0,0,0,0.3)]"
          >
            <Image
              src="/FoodDeliciousTastyMomo.png"
              alt="Plate of fresh papaya salad"
              width={520}
              height={520}
              className="h-auto w-full"
            />
          </motion.div>

          {/* Leaves are static so only the plate spins */}
          <Image src="/basil-leaf.png" alt="" aria-hidden width={110} height={110}
            className="absolute -left-6 top-[18%] w-[22%] -rotate-12" />
          <Image src="/basil-leaf.png" alt="" aria-hidden width={110} height={110}
            className="absolute -top-2 right-[-4%] w-[26%] rotate-[40deg]" />
          <Image src="/basil-leaf.png" alt="" aria-hidden width={110} height={110}
            className="absolute -bottom-2 left-[8%] w-[28%] rotate-[160deg]" />
        </div>

        {/* Copy */}
        <div className="md:pl-6">
          <h2
            className={`${serif.className} text-4xl font-semibold leading-tight tracking-tight text-[#121b2b] md:text-5xl`}
          >
            Welcome to Our
            <br />
            Restaurant
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-7 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ActionButtons className="mt-8" />
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection