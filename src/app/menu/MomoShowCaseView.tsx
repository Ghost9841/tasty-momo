"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { Play, ShoppingBag } from "lucide-react";
import { Barlow_Condensed } from "next/font/google";
import { Button } from "@/components/ui/button";
import { DISHES } from "./dataMomo";
import InfoMenucard from "./InfoCardMenu";
import ThumbnailRail from "./ThumbnailRail";


const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "800"],
});

/* ------------------------------------------------------------------ */
/* Geometry, all in `cqw` (1% of the stage width), so it scales        */
/* ------------------------------------------------------------------ */
const R = 70; // wheel radius: distance from wheel centre to each plate
const CX = 63; // wheel centre x
const CY = 75; // wheel centre y (below the stage, so only the top arc shows)
const PLATE = 27; // plate diameter
const START = -40; // angle of the active slot, degrees clockwise from 12 o'clock
const RING_W = 12; // thickness of the pastel arc

/* Height taken by the navbar above the hero (mt-8 + header). Adjust if it changes.
   The stage keeps full width (so everything stays big) but its height is clamped
   to what is left of the screen under the navbar, between MIN_H and MAX_H (in cqw). */
const NAV_OFFSET = "8.5rem";
const MIN_H = 46;
const MAX_H = 60;

const mod = (a: number, n: number) => ((a % n) + n) % n;
const ease = [0.65, 0, 0.35, 1] as const;

/* Text wipe: slides + clips in from the left, out to the right */
const wipe: Variants = {
  hidden: { clipPath: "inset(-5% 100% -5% 0%)", x: -24 },
  show: {
    clipPath: "inset(-5% -2% -5% -2%)",
    x: 0,
    transition: { duration: 0.7, ease },
  },
  exit: {
    clipPath: "inset(-5% -2% -5% 100%)",
    x: 24,
    transition: { duration: 0.3, ease },
  },
};
const group: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.04 } },
};

/* ------------------------------------------------------------------ */
/* Controlled view: `turn` is an unbounded counter (0, 1, 2, ... or -1) */
/* so the wheel always keeps spinning in one direction                 */
/* ------------------------------------------------------------------ */
export function MomoShowcaseView({
  turn,
  onTurn,
}: {
  turn: number;
  onTurn: (t: number) => void;
}) {
  const reduce = useReducedMotion();
  const n = DISHES.length;
  const step = 360 / n;
  const active = mod(turn, n);
  const dish = DISHES[active];

  const move = reduce ? { duration: 0 } : { duration: 1.1, ease };

  // jump to a thumbnail by the shortest way round the wheel
  const goto = (i: number) => {
    let d = mod(i - active, n);
    if (d > n / 2) d -= n;
    onTurn(turn + d);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#ECEAE6] @container"
      aria-roledescription="carousel"
      aria-label="Our momo"
    >
      {/* The section is the cqw container (full width). The stage inside it takes the
          rest of the screen under the navbar, so the thumbnail rail never falls below the fold. */}
      <div
        className="relative w-full"
        style={{
          height: `clamp(${MIN_H}cqw, calc(100svh - ${NAV_OFFSET}), ${MAX_H}cqw)`,
        }}
      >
        {/* the pastel arc: a thick ring whose colour follows the dish */}
        <motion.div
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: `${2 * (R + RING_W / 2)}cqw`,
            height: `${2 * (R + RING_W / 2)}cqw`,
            left: `${CX - (R + RING_W / 2)}cqw`,
            top: `${CY - (R + RING_W / 2)}cqw`,
            borderStyle: "solid",
            borderWidth: `${RING_W}cqw`,
            opacity: 0.28,
          }}
          initial={false}
          animate={{ borderColor: dish.accent }}
          transition={{ duration: 0.9 }}
        />

        {/* the wheel: plates sit on a circle, the circle rotates */}
        <motion.div
          className="absolute"
          style={{
            width: `${2 * R}cqw`,
            height: `${2 * R}cqw`,
            left: `${CX - R}cqw`,
            top: `${CY - R}cqw`,
          }}
          initial={false}
          animate={{ rotate: -turn * step }}
          transition={move}
        >
          {DISHES.map((d, i) => {
            const theta = START + i * step;
            const isActive = i === active;
            return (
              <div
                key={d.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: `${PLATE}cqw`,
                  height: `${PLATE}cqw`,
                  marginLeft: `${-PLATE / 2}cqw`,
                  marginTop: `${-PLATE / 2}cqw`,
                  // place on the circle, then undo the angle so it stays upright
                  transform: `rotate(${theta}deg) translateY(${-R}cqw) rotate(${-theta}deg)`,
                }}
              >
                {/* counter-rotate against the wheel, plus a little spin as it lands */}
                <motion.div
                  className="relative size-full"
                  style={{ filter: "drop-shadow(0 1.6cqw 2.2cqw rgba(0,0,0,.22))" }}
                  initial={false}
                  animate={{
                    rotate: turn * step + (isActive ? 0 : -35),
                    scale: isActive ? 1 : 0.65,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    rotate: move,
                    scale: { duration: reduce ? 0 : 0.8, delay: isActive ? 0.2 : 0 },
                    opacity: {
                      duration: reduce ? 0 : 0.3,
                      delay: reduce ? 0 : isActive ? 0.15 : 0.6,
                    },
                  }}
                >
                  <Image
                    src={d.image}
                    alt={isActive ? `${d.line1} ${d.line2} momo` : ""}
                    fill
                    sizes="30vw"
                    className="object-contain"
                    priority={i === 0}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* title block */}
        <div
          className="absolute z-10"
          style={{ left: "33cqw", top: "8.5cqw", width: "36cqw" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={dish.id}
              variants={group}
              initial="hidden"
              animate="show"
              exit="exit"
              className={display.className}
            >
              <motion.p
                variants={wipe}
                className="font-sans text-neutral-600"
                style={{ fontSize: "1.1cqw", marginBottom: "0.8cqw" }}
              >
                #{active + 1} most loved
              </motion.p>
              <motion.h2
                variants={wipe}
                className="font-light uppercase leading-[0.95] tracking-tight text-neutral-500"
                style={{ fontSize: "6.4cqw" }}
              >
                {dish.line1}
              </motion.h2>
              <motion.h2
                variants={wipe}
                className="font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-800"
                style={{ fontSize: "7.6cqw" }}
              >
                {dish.line2}
              </motion.h2>
              <motion.div
                variants={wipe}
                className="flex gap-2 font-sans"
                style={{ marginTop: "1.6cqw" }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden gap-1.5 px-2 md:inline-flex"
                >
                  <Play className="size-3.5" /> Watch it made
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                  <ShoppingBag className="size-3.5" /> Order now
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <InfoMenucard dish={dish} />

        <ThumbnailRail
          dishes={DISHES}
          active={active}
          onSelect={goto}
          onPrev={() => onTurn(turn - 1)}
          onNext={() => onTurn(turn + 1)}
        />
      </div>
    </section>
  );
}

/* Default: click / arrow keys drive it */
export default function MomoShowcase() {
  const [turn, setTurn] = useState(0);
  return <MomoShowcaseView turn={turn} onTurn={setTurn} />;
}

/* Optional: scroll drives it. Pinned stage, one dish per screen of scroll.
   This is where Lenis earns its place: smooth scroll gives smooth progress. */
export function MomoShowcaseScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [turn, setTurn] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setTurn(Math.min(DISHES.length - 1, Math.floor(v * DISHES.length)))
  );
  return (
    <div ref={ref} className="relative" style={{ height: `${DISHES.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <MomoShowcaseView turn={turn} onTurn={setTurn} />
      </div>
    </div>
  );
}