import { Gelasio, Inter } from 'next/font/google'

// Serif for headings + buttons, sans for body copy. Shared by every section.
export const serif = Gelasio({ subsets: ['latin'], weight: ['500', '600', '700'] })
export const sans = Inter({ subsets: ['latin'] })