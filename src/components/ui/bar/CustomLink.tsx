'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CustomLink = ({
  href,
  title,
  className = '',
}: {
  href: string
  title: string
  className?: string
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${className} relative group text-sm font-medium tracking-wide
        text-dark/70 dark:text-light/60
        hover:text-dark dark:hover:text-light
        transition-colors duration-200`}
    >
      {title}
      <span
        className={`
          absolute left-0 -bottom-0.5 h-[1.5px] rounded-full
          bg-red-500 dark:bg-light
          transition-all duration-300 ease-in-out hover:cursor-default
          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
        `}
      />
    </Link>
  )
}

export default CustomLink