import Image from 'next/image'
import { Check } from 'lucide-react'
import ActionButtons from '@/components/ActionButtons'
import { serif, sans } from '@/lib/fonts'

const points = [
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
  'Lorem ipsum dolor sit amet, consectetur',
]

const ExpertChef = () => {
  return (
    <section
      id="chef"
      className={`${sans.className} relative isolate overflow-hidden bg-white py-24`}
    >
      <Image src="/garlic.png" alt="" aria-hidden width={260} height={260}
        className="pointer-events-none absolute -left-10 top-4 -z-10 hidden opacity-50 md:block" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 lg:px-12">
        {/* Copy */}
        <div>
          <h2
            className={`${serif.className} text-4xl font-semibold tracking-tight text-[#121b2b] md:text-5xl`}
          >
            Our Expert Chef
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-7 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {points.map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-xs leading-5 text-slate-500">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ee7125] text-white">
                  <Check size={10} strokeWidth={3} aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <ActionButtons className="mt-12" />
        </div>

        {/* Chef in an orange circle: his head and hat break out of the top */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute bottom-0 left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#f58a2f] to-[#f0561f]" />
          <Image
            src="/chef.png"
            alt="Smiling chef in a white uniform holding a plate of salad"
            fill
            sizes="(min-width: 768px) 24rem, 80vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  )
}

export default ExpertChef
