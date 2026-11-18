/* The whole menu. To add a section, add an object to MENU: the nav pill,
   scroll-spy, animations and accent colour all come for free.
   layout "list"  = rows with a dotted leader and price (simple items)
   layout "cards" = cards with an "includes" list (sets and platters)       */

export type Item = {
  name: string;
  price: string;
  note?: string;
  includes?: string[];
};
export type Block = { title?: string; note?: string; items: Item[] };
export type Section = {
  id: string; // used for the #anchor and scroll-spy
  nav: string; // short label for the nav pill
  title: string;
  intro?: string;
  layout: "list" | "cards";
  blocks: Block[];
};

// [name, price, note?] -> Item
const rows = (r: [string, string, string?][]): Item[] =>
  r.map(([name, price, note]) => ({ name, price, note }));

export const MENU: Section[] = [
  {
    id: "breakfast",
    nav: "Breakfast",
    title: "Breakfast",
    layout: "cards",
    blocks: [
      {
        items: [
          {
            name: "English Style Breakfast",
            price: "£9.99",
            includes: ["Egg bread", "Vegetable gravy", "Beans", "Sausage or chicken", "Potatoes", "Tea or coffee"],
          },
          {
            name: "Nepalese Style Breakfast",
            price: "£9.99",
            includes: ["Puri", "Channa tarkari", "Fried egg", "Tea or coffee"],
          },
        ],
      },
    ],
  },
  {
    id: "sides",
    nav: "Sides",
    title: "Sides",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Chatpate", "£5.99"],
          ["Panipuri", "£5.99"],
          ["Alu Sadeko", "£5.99"],
          ["Aludam", "£6.49"],
          ["Peanut Sadeko", "£6.49"],
          ["Veg Spring Roll", "£5.49"],
          ["Chicken Spring Roll", "£5.99"],
          ["Veg Pakori", "£6.49"],
          ["Chicken Pakori", "£7.99"],
          ["Samosa with Channa Tarkari", "£5.99"],
          ["Fried Masala Wings", "£5.99", "Spicy or non-spicy"],
        ]),
      },
    ],
  },
  {
    id: "soup",
    nav: "Soup",
    title: "Soup",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Chicken Soup", "£3.99"],
          ["Veg Soup", "£3.99"],
          ["Hot & Sour Mix Soup", "£4.99"],
        ]),
      },
    ],
  },
  {
    id: "momo",
    nav: "Momo",
    title: "Momo",
    intro: "Nepalese-style dumplings, veg or chicken. Extra soup £1.99.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Steam Momo", "£7.99", "Traditional steamed dumplings"],
          ["Kothey Momo", "£7.99", "Slightly pan-fried and steamed"],
          ["Jhol Momo", "£8.49", "Served with Himalayan soup"],
          ["Chilli Momo", "£9.99", "Himalayan mixed spices"],
          ["Momo Platter (17–18 pcs)", "£17.99", "Mixed steam, fried, kothey and chilli momo"],
        ]),
      },
    ],
  },
  {
    id: "chowmein",
    nav: "Chowmein",
    title: "Chowmein",
    intro: "Nepalese-style wok-fried noodles.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Veg Chowmein", "£6.99"],
          ["Egg & Veg Chowmein", "£7.49"],
          ["Chicken or Veg Chowmein", "£7.99"],
          ["Prawn Chowmein", "£8.49"],
          ["Mixed Chowmein", "£9.99", "Chicken, prawn, egg and vegetables"],
        ]),
      },
    ],
  },
  {
    id: "chilly",
    nav: "Chilly",
    title: "Chilly Dishes",
    intro: "Choose spicy or non-spicy.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Fries Chilly", "£6.49"],
          ["Paneer Chilly", "£8.99"],
          ["Sausage Chilly", "£6.49"],
          ["Chicken Chilly", "£9.99"],
          ["Mixed Spices Chilly Set", "£14.99", "Chicken chilly, fries chilly + rice or noodles"],
        ]),
      },
    ],
  },
  {
    id: "rice",
    nav: "Fried rice",
    title: "Fried Rice",
    intro: "Basmati fried rice with mixed vegetables or meat.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Veg or Egg Fried Rice", "£6.49"],
          ["Chicken Fried Rice", "£6.99"],
          ["Prawn Fried Rice", "£7.99"],
          ["Mix Fried Rice", "£8.99"],
        ]),
      },
    ],
  },
  {
    id: "thukpa",
    nav: "Thukpa",
    title: "Thukpa",
    intro: "Nepalese-style noodles with soup.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Veg Thukpa", "£6.49"],
          ["Egg + Veg Thukpa", "£6.99"],
          ["Chicken + Veg Thukpa", "£7.49"],
          ["Mixed Thukpa", "£7.99"],
        ]),
      },
    ],
  },
  {
    id: "thali",
    nav: "Thali",
    title: "Gorkhali Thali",
    intro: "Daalbhat or Dhedo set.",
    layout: "cards",
    blocks: [
      {
        items: [
          {
            name: "Chicken Set",
            price: "£23.99",
            includes: ["Rice", "Puri", "Daal", "Veg curry", "Chicken curry", "Alu or Sinki achar", "Papad", "Salad", "Gheu", "Dahee or Kulfi"],
          },
          {
            name: "Mutton Set",
            price: "£24.99",
            // TODO confirm: source lists one shared set, assumed "Mutton curry" here
            includes: ["Rice", "Puri", "Daal", "Veg curry", "Mutton curry", "Alu or Sinki achar", "Papad", "Salad", "Gheu", "Dahee or Kulfi"],
          },
          {
            name: "Veg Set",
            price: "£21.99",
            // TODO confirm: source only says "Paneer curry"; probably the same sides as above
            includes: ["Paneer curry"],
          },
        ],
      },
    ],
  },
  {
    id: "platters",
    nav: "Platters",
    title: "Tasty Special Platters",
    layout: "cards",
    blocks: [
      {
        items: [
          {
            name: "Tasty Special Platter",
            price: "£21.99",
            includes: ["Chicken or veg momos (10 pieces)", "Chowmein", "Fries", "Nepalese sauce"],
          },
        ],
      },
    ],
  },
  {
    id: "specials",
    nav: "Choila & Bhutuwa",
    title: "Choila & Bhutuwa Specials",
    layout: "cards",
    blocks: [
      {
        items: [
          {
            name: "Choila or Sukuti Set",
            price: "£17.99",
            note: "Choose chicken or lamb",
            includes: ["Bhujiya", "Choila", "Alu channa", "Mula achar", "Badam sadeko"],
          },
          {
            name: "Bhutuwa or Pagra Set",
            price: "£17.99",
            note: "Choose mutton or lamb",
            includes: ["Bhujiya", "Aludum", "Mula achar", "Badam sadeko", "Papad"],
          },
        ],
      },
    ],
  },
  {
    id: "khajja",
    nav: "Khajja",
    title: "Nepalese Style Khajja",
    intro: "Available in veg, egg, prawn or chicken (as applicable).",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Bhutuwa", "£9.99"],
          ["Pagra", "£8.49"],
          ["Choila (Chicken or Lamb)", "£9.99"],
          ["Sukuti (Mutton or Lamb)", "£12.99"],
          ["Bara Newari Style (Egg or Chicken)", "£7.99"],
        ]),
      },
    ],
  },
  {
    id: "drinks",
    nav: "Drinks",
    title: "Drinks",
    layout: "list",
    blocks: [
      {
        title: "Cold",
        items: rows([
          // TODO confirm prices: the Drinks poster lists £2.99 for Ice Lemon Tea and Ice Milk Tea / Coffee,
          // the main menu says £3.50. The poster is labelled "updated", so it is used here.
          ["Ice Lemon Tea", "£2.99"],
          ["Ice Milk Tea", "£2.99"],
          ["Ice Milk Coffee", "£2.99"],
          ["Mango Lassi", "£3.99"],
          ["Plain Lassi", "£3.49"],
          ["Sweet Lassi", "£3.50"],
          ["Strawberry Milk Shake", "£2.99"],
          ["Chocolate Milk Shake", "£3.50"],
          ["Rukumeli Mahi", "£2.99"],
          ["Soft Drinks", "£2.50"],
          ["Mineral Water", "£2.00"],
        ]),
      },
      {
        title: "Hot",
        items: rows([
          // Poster prices again (main menu: Chai £2.99, Hot Lemon with Honey £3.50,
          // Milk Tea or Coffee £2.99, Black Tea or Coffee £2.50)
          ["Himalayan Chai", "£3.50"],
          ["Hot Lemon with Honey", "£2.99"],
          ["Milk Tea or Coffee", "£2.50"],
          ["Black Tea or Coffee", "£1.99"],
          ["Hot Lemon Tea", "£2.99"],
          ["Hot Lemon Ginger + Honey", "£2.99"],
          ["Hot Chocolate Shake", "£3.50"],
        ]),
      },
    ],
  },
  {
    id: "dessert",
    nav: "Dessert",
    title: "Dessert",
    intro: "Choose any one for £3.99.",
    layout: "list",
    blocks: [
      {
        items: rows([
          ["Ice Cream", "£3.99"],
          ["Fruit Salad", "£3.99"],
          ["Sweet Yoghurt", "£3.99"],
          ["Rashbhari", "£3.99"],
        ]),
      },
    ],
  },
];