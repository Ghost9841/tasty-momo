import { serif } from '@/lib/fonts'

// The navy "Menu" + orange "Book a table" pair used in the hero, welcome and chef sections.
const ActionButtons = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <a
        href="#menu"
        className={`${serif.className} rounded-lg bg-[#121b2b] px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_24px_-8px_rgba(18,27,43,0.45)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121b2b]`}
      >
        Menu
      </a>
      <a
        href="#booking"
        className={`${serif.className} rounded-lg bg-[#ee7125] px-8 py-3.5 text-sm font-medium text-white shadow-[0_14px_24px_-8px_rgba(238,113,37,0.55)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7125]`}
      >
        Book a table
      </a>
    </div>
  )
}

export default ActionButtons
