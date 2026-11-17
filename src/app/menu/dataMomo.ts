/* ------------------------------------------------------------------ */
/* Menu data: replace names, copy and images with your real menu       */
/* image = top-down photo, transparent PNG, square (e.g. 1000x1000)    */
/* ------------------------------------------------------------------ */
export type Dish = {
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

export const DISHES: Dish[] = [
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
    image: "/tastymomos/momo1.jpg",
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
    image: "/tastymomos/momo1.jpg",
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
    image: "/tastymomos/momo2.jpg",
  },
];