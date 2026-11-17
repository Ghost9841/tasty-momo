"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Dish } from "./dataMomo";

/* Info card on the right. Sized in `cqw`, so it must sit inside the stage
   (the container set up in MomoShowcaseView). */
export default function InfoMenucard({ dish }: { dish: Dish }) {
  return (
    <Card
      className="absolute z-10 border-white/60 bg-white/55 shadow-xl shadow-black/5 backdrop-blur-md"
      style={{ right: "4cqw", top: "5.5cqw", width: "26cqw" }}
    >
      <CardContent style={{ padding: "1.8cqw" }}>
        <Tabs defaultValue="overview">
          <TabsList className="ml-auto flex h-auto w-fit gap-4 bg-transparent p-0">
            {["overview", "ingredients"].map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="rounded-2xl rounded-bl-none rounded-tr-none border-b-2 border-transparent px-2 py-4 capitalize shadow-none data-[state=active]:border-neutral-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "1cqw", lineHeight: 1.5 }}
                >
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
  );
}