import Image from 'next/image'
import { Soup } from 'lucide-react'
import { serif, sans } from '@/lib/fonts'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const navigation = [
  { label: 'Menu', href: '#menu' },
  { label: 'About us', href: '#welcome' },
  { label: 'Contact us', href: '#contact' },
  { label: 'Main dishes', href: '#special-dishes' },
]

const dishes = ['Fish & Veggies', 'Tofu Chili', 'Egg & Cucumber', 'Lumpia w/Sauce']

const hours = [
  { days: 'Monday - Friday', time: '8:00 am to 9:00 pm' },
  { days: 'Saturday', time: '8:00 am to 9:00 pm' },
  { days: 'Sunday', time: 'CLOSED' },
]

const socials = [
  { label: 'Facebook', Icon: FaFacebook },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'Twitter', Icon: FaTwitter },
]

const Footer = () => {
  return (
    <footer
      id="contact"
      className={`${sans.className} relative isolate overflow-hidden bg-white pt-20 text-[#121b2b]`}
    >
      <Image src="/plate-sketch.png" alt="" aria-hidden width={340} height={340}
        className="pointer-events-none absolute -bottom-10 left-[38%] -z-10 hidden opacity-40 md:block" />

      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        {/* Brand + opening hours */}
        <div>
          <a href="/" className={`${serif.className} flex items-center gap-2 text-xl font-bold`}>
            <Soup className="text-[#ee7125]" aria-hidden />
            restaurant
          </a>
          <p className="mt-5 max-w-xs text-xs leading-6 text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore.{' '}
            <a href="#welcome" className="underline underline-offset-2 hover:text-[#121b2b]">Learn more</a>
          </p>

          <h3 className="mt-8 text-[10px] font-semibold uppercase tracking-wider">Opening hours</h3>
          <dl className="mt-4 flex gap-6 text-xs text-slate-500">
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="mt-1">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider">Navigation</h3>
          <ul className="mt-5 space-y-4 text-xs text-slate-500">
            {navigation.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="hover:text-[#121b2b]">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider">Dishes</h3>
          <ul className="mt-5 space-y-4 text-xs text-slate-500">
            {dishes.map((d) => (
              <li key={d}>
                <a href="#special-dishes" className="hover:text-[#121b2b]">{d}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider">Follow us</h3>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#121b2b] transition hover:bg-[#121b2b] hover:text-white"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-14 max-w-5xl border-t border-gray-200 px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Restaurant. All Right Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#121b2b]">Terms of Service</a>
            <a href="#" className="hover:text-[#121b2b]">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer