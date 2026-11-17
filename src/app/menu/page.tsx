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
import { ChevronLeft, ChevronRight, Play, ShoppingBag } from "lucide-react";
import { Barlow_Condensed } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "800"],
});

/* ------------------------------------------------------------------ */
/* Data: replace names, copy and images with your real menu            */
/* image = top-down photo, transparent PNG, square (e.g. 1000x1000)    */
/* ------------------------------------------------------------------ */
type Dish = {
  id: string;
  line1: string; // light line
  line2: string; // heavy line
  accent: string; // drives ring + rating badge colour
  rating: number;
  price: string;
  chef: string;
  blurb: string;
  ingredients: string[];
  image: string;
};

const DISHES: Dish[] = [
  {
    id: "steamed",
    line1: "Chicken",
    line2: "Steamed",
    accent: "#F59E5B",
    rating: 4.9,
    price: "Rs 220",
    chef: "Chef Pema",
    blurb: "Hand-pleated wrappers around juicy chicken, steamed to order.",
    ingredients: ["Chicken", "Ginger", "Garlic", "Spring onion", "Timur"],
    image: "/tastymomos/momo1.jpg",
  },
  {
    id: "jhol",
    line1: "Jhol",
    line2: "Momo",
    accent: "#F2A0B5",
    rating: 4.8,
    price: "Rs 260",
    chef: "Chef Sonam",
    blurb: "Steamed momo swimming in a warm, tangy sesame-tomato broth.",
    ingredients: ["Sesame", "Tomato", "Chilli", "Coriander", "Momo"],
    image: "/tastymomos/momo2.jpg",
  },
  {
    id: "kothey",
    line1: "Pan-fried",
    line2: "Kothey",
    accent: "#9CCB86",
    rating: 4.7,
    price: "Rs 240",
    chef: "Chef Dolma",
    blurb: "Crisp golden base, soft top. Best with the house chutney.",
    ingredients: ["Pork", "Cabbage", "Garlic", "Soy", "Chives"],
    image: "/tastymomos/kothey.png",
  },
  {
    id: "chilli",
    line1: "Crispy",
    line2: "Chilli",
    accent: "#F2CB4F",
    rating: 4.6,
    price: "Rs 280",
    chef: "Chef Tashi",
    blurb: "Fried momo tossed with peppers and a sweet-hot glaze.",
    ingredients: ["Capsicum", "Onion", "Chilli", "Soy", "Honey"],
    image: "/tastymomos/chilli.png",
  },
  {
    id: "tandoori",
    line1: "Charcoal",
    line2: "Tandoori",
    accent: "#E8826A",
    rating: 4.8,
    price: "Rs 300",
    chef: "Chef Karma",
    blurb: "Marinated, then grilled until the edges blister and smoke.",
    ingredients: ["Yoghurt", "Kashmiri chilli", "Cumin", "Lemon", "Momo"],
    image: "/tastymomos/tandoori.png",
  },
];

/* ------------------------------------------------------------------ */
/* Geometry, all in `cqw` (1% of the stage width), so it scales        */
/* ------------------------------------------------------------------ */
const R = 70; // wheel radius: distance from wheel centre to each plate
const CX = 63; // wheel centre x
const CY = 79.6; // wheel centre y (below the stage, so only the top arc shows)
const PLATE = 27; // plate diameter
const START = -40; // angle of the active slot, degrees clockwise from 12 o'clock
const RING_W = 12; // thickness of the pastel arc

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
      className="relative mx-auto aspect-16/10 w-full max-w-5000 overflow-hidden bg-[#ECEAE6] @container"
      aria-roledescription="carousel"
      aria-label="Our momo"
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
        style={{ left: "33cqw", top: "14cqw", width: "36cqw" }}
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
              <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                <Play className="size-3.5" /> Watch it made
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                <ShoppingBag className="size-3.5" /> Order now
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* info card */}
      <Card
        className="absolute z-10 border-white/60 bg-white/55 shadow-xl shadow-black/5 backdrop-blur-md"
        style={{ right: "4cqw", top: "9cqw", width: "26cqw" }}
      >
        <CardContent style={{ padding: "1.8cqw" }}>
          <Tabs defaultValue="overview">
            <TabsList className="ml-auto flex h-auto w-fit gap-4 bg-transparent p-0">
              {["overview", "ingredients"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="rounded-none border-b-2 border-transparent px-0 py-0.5 capitalize shadow-none data-[state=active]:border-neutral-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  style={{ fontSize: "0.95cqw" }}
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                style={{ marginTop: "1.2cqw" }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="grid place-items-center rounded-2xl font-bold text-white"
                    style={{ width: "5.2cqw", height: "5.2cqw", fontSize: "2cqw" }}
                    initial={false}
                    animate={{ backgroundColor: dish.accent }}
                    transition={{ duration: 0.8 }}
                  >
                    {dish.rating}
                  </motion.div>
                  <div>
                    <p className="font-semibold" style={{ fontSize: "1.2cqw" }}>
                      {dish.chef}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.95cqw" }}>
                      {dish.price} per plate
                    </p>
                  </div>
                </div>

                <TabsContent value="overview" className="mt-3">
                  <p className="text-muted-foreground" style={{ fontSize: "1cqw", lineHeight: 1.5 }}>
                    {dish.blurb}
                  </p>
                </TabsContent>
                <TabsContent value="ingredients" className="mt-3">
                  <ul
                    className="flex flex-wrap gap-1.5 text-muted-foreground"
                    style={{ fontSize: "1cqw" }}
                  >
                    {dish.ingredients.map((x) => (
                      <li key={x} className="rounded-full bg-black/5 px-2.5 py-0.5">
                        {x}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* thumbnail rail */}
      <div
        className="absolute mt-0 left-1/2 z-10 flex -translate-x-1/2 items-center"
        style={{ bottom: "4cqw", gap: "1cqw" }}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous dish"
          onClick={() => onTurn(turn - 1)}
        >
          <ChevronLeft />
        </Button>
        {DISHES.map((d, i) => (
          <button
            key={d.id}
            onClick={() => goto(i)}
            aria-label={`${d.line1} ${d.line2}`}
            aria-current={i === active}
            className="flex flex-col items-center rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neutral-800 data-[active=true]:bg-white/70 data-[active=true]:shadow-sm"
            data-active={i === active}
            style={{ width: "8cqw", padding: "0.8cqw 0" }}
          >
            <span className="relative block" style={{ width: "3.6cqw", height: "3.6cqw" }}>
              <Image src={d.image} alt="" fill sizes="6vw" className="object-contain" />
            </span>
            <span
              className="mt-1 text-neutral-600"
              style={{ fontSize: "0.85cqw" }}
            >
              {d.line1} {d.line2}
            </span>
          </button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next dish"
          onClick={() => onTurn(turn + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}

/* Default: click / arrows drive it */
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