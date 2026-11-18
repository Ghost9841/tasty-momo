'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { serif, sans } from '@/lib/fonts'
import { Button } from '@/components/ui/button'
import { Reveal, MaskText, ease, viewportOnce } from '@/lib/motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send `email` to your API / mailing-list provider here
    setStatus('done')
    setEmail('')
  }

  return (
    // Half grey / half white background so the card straddles the two sections
    <section
      id="newsletter"
      className={`${sans.className} bg-[linear-gradient(to_bottom,#f3f5f4_50%,#ffffff_50%)] px-6`}
    >
      {/* Card grows in; the photo inside settles from a slow zoom */}
      <motion.div
        className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease }}
      >
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 2, ease }}
        >
          <Image
            src="/landingpage/cta-img-bg-1.png"
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="px-6 py-14 text-center sm:px-12">
          <MaskText
            lines={['Get our promo code by subscribing', 'to our newsletter']}
            delay={0.3}
            className={`${serif.className} mx-auto max-w-xl text-3xl font-semibold leading-snug text-white md:text-4xl`}
          />

          <Reveal delay={0.7}>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-1.5 shadow-lg"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-[#121b2b] placeholder:text-slate-400 focus:outline-none"
              />
              <motion.div whileTap={{ scale: 0.95 }} className="shrink-0">
                <Button
                  type="submit"
                  className=" bg-[#ee7125] text-white rounded-bl-none rounded-tr-none p-6 shadow-sm transition hover:bg-[#d9631d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7125]"
                >
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </Reveal>

          {/* Thank-you message fades up when it appears */}
          <p role="status" className="mt-4 h-5 text-sm text-white">
            <AnimatePresence>
              {status === 'done' && (
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  Thanks! Check your inbox for your promo code.
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default Newsletter
