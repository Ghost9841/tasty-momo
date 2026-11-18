"use client";

import type { KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dish } from "./dataMomo";


type Props = {
  dishes: Dish[];
  active: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

/* Thumbnail rail at the bottom. Sized in `cqw`, so it must sit inside the stage. */
export default function ThumbnailRail({
  dishes,
  active,
  onSelect,
  onPrev,
  onNext,
}: Props) {
  // Arrow keys work whenever focus is inside the rail (a chevron or a thumbnail),
  // because key events from those buttons bubble up to this wrapper.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <div
      role="group"
      aria-label="Choose a dish"
      onKeyDown={onKeyDown}
      className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center"
      style={{ bottom: "1.8cqw", gap: "1cqw" }}
    >
      <Button variant="ghost" size="icon" aria-label="Previous dish" onClick={onPrev}>
        <ChevronLeft />
      </Button>

      {dishes.map((d, i) => (
        <button
          key={d.id}
          onClick={() => onSelect(i)}
          aria-label={`${d.line1} ${d.line2}`}
          aria-current={i === active}
          data-active={i === active}
          className="flex flex-col items-center rounded-2xl rounded-bl-none rounded-tr-none px-4 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neutral-800 data-[active=true]:bg-white/70 data-[active=true]:shadow-sm"
          style={{ width: "7.2cqw", padding: "0.6cqw 0" }}
        >
          <span className="relative block" style={{ width: "3cqw", height: "3cqw" }}>
            <Image
              loading="eager"
              src={d.image}
              alt=""
              fill
              sizes="6vw"
              className="object-contain"
            />
          </span>
          <span className="mt-1 text-neutral-600" style={{ fontSize: "0.85cqw" }}>
            {d.line1} {d.line2}
          </span>
        </button>
      ))}

      <Button variant="ghost" size="icon" aria-label="Next dish" onClick={onNext}>
        <ChevronRight />
      </Button>
    </div>
  );
}