"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { Barlow_Condensed } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";
import { MENU, type Block, type Item, type Section } from "./menuData";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "800"],
});

// same pastel colours as the hero, cycled per section
const ACCENTS = ["#F59E5B", "#F2A0B5", "#9CCB86", "#F2CB4F", "#E8826A"];
const ease = [0.65, 0, 0.35, 1] as const;

/* Same motion language as the hero */
const wipe: Variants = {
  hidden: { clipPath: "inset(-5% 100% -5% 0%)", x: -24 },
  show: { clipPath: "inset(-5% -2% -5% -2%)", x: 0, transition: { duration: 0.7, ease } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
// plays once, when the element is a little inside the screen
const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-12%" },
} as const;

/* ---------- sticky category nav with scroll-spy ---------- */
function CategoryNav({
  active,
  onPick,
}: {
  active: string;
  onPick: (id: string) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  // keep the active pill centred in the (horizontally scrollable) bar
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (bar && el) {
      bar.scrollTo({
        left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-0 z-30 border-y border-black/5 bg-[#F6F4F0]/80 backdrop-blur-md"
    >
      <div
        ref={barRef}
        className="relative mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none]"
      >
        {MENU.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              data-id={s.id}
              onClick={() => onPick(s.id)}
              aria-current={isActive}
              className={`relative isolate whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {s.nav}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------- item layouts ---------- */
function Row({ item }: { item: Item }) {
  return (
    <motion.li
      variants={rise}
      whileHover={{ x: 6 }}
      className="flex items-baseline gap-3 py-3.5"
    >
      <div className="min-w-0">
        <p className="font-medium text-neutral-900">{item.name}</p>
        {item.note && <p className="text-sm text-neutral-500">{item.note}</p>}
      </div>
      <span
        aria-hidden
        className="h-0 min-w-6 flex-1 border-b border-dotted border-neutral-300"
      />
      <span className="font-semibold tabular-nums text-neutral-900">{item.price}</span>
    </motion.li>
  );
}

function CardItem({ item, accent }: { item: Item; accent: string }) {
  return (
    <motion.li variants={rise} whileHover={{ y: -4 }}>
      <Card className="h-full border-black/5 bg-white/70 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-lg font-semibold leading-snug">{item.name}</h4>
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold tabular-nums text-neutral-900"
              style={{ background: `${accent}55` }}
            >
              {item.price}
            </span>
          </div>
          {item.note && <p className="mt-1 text-sm text-neutral-500">{item.note}</p>}
          {item.includes && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {item.includes.map((x) => (
                <li key={x} className="rounded-full bg-black/5 px-2.5 py-0.5 text-sm text-neutral-600">
                  {x}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.li>
  );
}

function BlockView({
  block,
  layout,
  accent,
}: {
  block: Block;
  layout: Section["layout"];
  accent: string;
}) {
  return (
    <div>
      {block.title && (
        <h3 className="mb-1 text-lg font-semibold text-neutral-800">{block.title}</h3>
      )}
      {block.note && <p className="mb-2 text-sm text-neutral-500">{block.note}</p>}
      <motion.ul
        variants={stagger}
        {...inView}
        className={
          layout === "cards" ? "mt-3 grid gap-4 sm:grid-cols-2" : "divide-y divide-black/5"
        }
      >
        {block.items.map((it) =>
          layout === "cards" ? (
            <CardItem key={it.name} item={it} accent={accent} />
          ) : (
            <Row key={it.name} item={it} />
          )
        )}
      </motion.ul>
    </div>
  );
}

/* ---------- one menu section ---------- */
function MenuSection({ section, index }: { section: Section; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const ref = useRef<HTMLElement>(null);

  // the big pastel ring drifts as you scroll past, echoing the hero's arc
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id={section.id}
      ref={ref}
      className="relative scroll-mt-16 overflow-clip border-b border-black/5 py-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-8 size-[30rem] rounded-full border-[5rem] opacity-20"
        style={{ y: ringY, borderColor: accent }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[5fr_7fr]">
        {/* sticky heading on the left */}
        <motion.header
          variants={stagger}
          {...inView}
          className={`${display.className} lg:sticky lg:top-28 lg:self-start`}
        >
          <motion.div variants={wipe} className="mb-3 flex items-center gap-3 font-sans">
            <span className="h-1 w-10 rounded-full" style={{ background: accent }} />
            <span className="text-sm text-neutral-500">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
          <motion.h2
            variants={wipe}
            className="text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-800 sm:text-6xl"
          >
            {section.title}
          </motion.h2>
          {section.intro && (
            <motion.p variants={rise} className="mt-4 max-w-sm font-sans text-neutral-600">
              {section.intro}
            </motion.p>
          )}
        </motion.header>

        <div className="space-y-10">
          {section.blocks.map((b, i) => (
            <BlockView key={i} block={b} layout={section.layout} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- the whole menu ---------- */
export default function MenuSections() {
  const [active, setActive] = useState(MENU[0].id);
  const lenis = useLenis(); // undefined if SmoothScroll isn't mounted; we fall back below

  // scroll-spy: the section crossing the middle of the screen is "active"
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    MENU.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -56, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-[#F6F4F0]">
        <CategoryNav active={active} onPick={go} />
        {MENU.map((s, i) => (
          <MenuSection key={s.id} section={s} index={i} />
        ))}
      </div>
    </MotionConfig>
  );
}
