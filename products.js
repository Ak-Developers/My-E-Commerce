/* =========================================================
   PRODUCTS.JS — this is the file you edit day-to-day.
   Add, remove, or change products by editing the list below.
   Don't touch script.js or style.css unless you want to
   change how the site behaves or looks.
   ========================================================= */

// ---- 1. YOUR SHOP SETTINGS ----
const SHOP_CONFIG = {
  shopName: "AK Stores",
  tagline: "Browse the catalogue, tap a piece, chat with us on WhatsApp.",
  // Your WhatsApp number in international format, digits only, no + or spaces.
  // Example: Kenya number 0712 345 678 -> "254712345678"
  whatsappNumber: "254727169060",
  currencySymbol: "KSh ",
  siteUrl: "https://e-commercecatalogue.netlify.app",
};

// ---- 2. YOUR PRODUCTS ----
// Copy an existing block (from { to },) to add a new product.
// "image" can be any image URL. If you leave it blank, a placeholder shows.
const PRODUCTS = [
  {
    id: "p1",
    name: "Woven Market Tote",
    category: "Bags",
    price: 2500,
    description: "Hand-woven sisal tote, lined interior, reinforced handles. Roomy enough for daily errands or a beach day.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    inStock: true,
  },
  {
    id: "p2",
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 3200,
    description: "Matte-glazed ceramic dripper and mug, made in small batches. Fits standard No. 2 filters.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&q=80",
    inStock: true,
  },
  {
    id: "p3",
    name: "Linen Wrap Shirt",
    category: "Clothing",
    price: 4100,
    description: "100% linen, relaxed fit, tie waist. Runs true to size. Available in sand, olive, and rust.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    inStock: true,
  },
  {
    id: "p4",
    name: "Beaded Drop Earrings",
    category: "Jewelry",
    price: 950,
    description: "Brass and glass bead drop earrings, hypoallergenic hooks. Each pair is slightly one-of-a-kind.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    inStock: false,
  },
  {
    id: "p5",
    name: "Clay Table Lamp",
    category: "Home",
    price: 5600,
    description: "Terracotta base with a natural linen shade. Warm, soft light, great for a reading corner.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    inStock: true,
  },
  {
    id: "p6",
    name: "Canvas Zip Pouch",
    category: "Bags",
    price: 800,
    description: "Sturdy waxed canvas pouch, leather zip pull. Fits a phone, cards, and keys.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    inStock: true,
  },
];
if (typeof module !== "undefined" && module.exports)
   { module.exports = { SHOP_CONFIG, PRODUCTS }; }
