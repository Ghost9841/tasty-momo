'use client'

import { useState } from 'react'
import Image from 'next/image'
import { serif, sans } from '@/lib/fonts'

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
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl">
        <Image
          src="/newsletter-bg.jpg"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="px-6 py-14 text-center sm:px-12">
          <h2
            className={`${serif.className} mx-auto max-w-xl text-3xl font-semibold leading-snug text-white md:text-4xl`}
          >
            Get our promo code by subscribing to our newsletter
          </h2>

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
            <button
              type="submit"
              className="rounded-xl bg-[#ee7125] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#d9631d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7125]"
            >
              Subscribe
            </button>
          </form>

          <p role="status" className="mt-4 h-5 text-sm text-white">
            {status === 'done' && 'Thanks! Check your inbox for your promo code.'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
