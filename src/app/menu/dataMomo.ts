/* ------------------------------------------------------------------ */
/* Hero showcase: the five momo from the menu                          */
/* image = top-down photo, transparent PNG, square (e.g. 1000x1000)    */
/* ------------------------------------------------------------------ */
export type Dish = {
  id: string;
  line1: string; // light line
  line2: string; // heavy line
  accent: string; // drives ring + price badge colour
  price: string;
  tagline: string; // short line next to the price
  blurb: string; // "Overview" tab
  details: string[]; // "Details" tab chips
  image: string;
};

export const DISHES: Dish[] = [
  {
    id: "steam",
    line1: "Steam",
    line2: "Momo",
    accent: "#F59E5B",
    price: "£7.99",
    tagline: "Veg or chicken",
    blurb: "Traditional steamed dumplings.",
    details: ["Veg or chicken", "Extra soup £1.99"],
    image: "/tastymomos/momo1.jpg",
  },
  {
    id: "kothey",
    line1: "Kothey",
    line2: "Momo",
    accent: "#9CCB86",
    price: "£7.99",
    tagline: "Veg or chicken",
    blurb: "Slightly pan-fried and steamed.",
    details: ["Veg or chicken", "Extra soup £1.99"],
    image: "/tastymomos/momo2.jpg",
  },
  {
    id: "jhol",
    line1: "Jhol",
    line2: "Momo",
    accent: "#F2A0B5",
    price: "£8.49",
    tagline: "Veg or chicken",
    blurb: "Served with Himalayan soup.",
    details: ["Veg or chicken", "Extra soup £1.99"],
    image: "/tastymomos/momo1.jpg",
  },
  {
    id: "chilli",
    line1: "Chilli",
    line2: "Momo",
    accent: "#F2CB4F",
    price: "£9.99",
    tagline: "Veg or chicken",
    blurb: "Himalayan mixed spices.",
    details: ["Veg or chicken", "Extra soup £1.99"],
    image: "/tastymomos/momo2.jpg",
  },
  {
    id: "platter",
    line1: "Momo",
    line2: "Platter",
    accent: "#E8826A",
    price: "£17.99",
    tagline: "17–18 pieces",
    blurb: "Mixed steam, fried, kothey and chilli momo.",
    details: ["Steam", "Fried", "Kothey", "Chilli"],
    image: "/tastymomos/momo1.jpg",
  },
];