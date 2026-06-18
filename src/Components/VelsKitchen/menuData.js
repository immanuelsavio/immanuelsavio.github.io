export const ORDER_URLS = {
  doorDash: "https://www.doordash.com/store/vel's-kitchen-indian-chicago-39555939/",
  uberEats: 'https://www.ubereats.com/store/vels-kitchen-850-w-superior-st/nUIreKKaXv2wdt1tvBNEAg',
  grubhub: 'https://www.grubhub.com/restaurant/vels-kitchen-850-w-superior-st-chicago/13182952',
  direct: "https://www.doordash.com/store/vel's-kitchen-indian-chicago-39555939/",
};

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=850%20W%20Superior%20St%20Chicago%20IL%2060642';

export const NAV_LINKS = [
  { label: 'Home', to: '/velskitchen' },
  { label: 'Menu', to: '/velskitchen/menu' },
  { label: 'Specials', to: '/velskitchen/specials' },
  { label: 'Tasting', to: '/velskitchen/tasting' },
  { label: 'About', to: '/velskitchen/about' },
];

export const itemImages = {
  hero: 'image_1.jpg',
  logo: 'image_2.jpg',
  'Masala Dosa 1pc (Kal)': 'image_8.jpg',
  'Punugulu': 'image_9.jpg',
  'Idli (2 pcs)': 'image_11.jpg',
  'Idli (3 pcs)': 'image_11.jpg',
  'Pongal': 'image_12.jpg',
  'Ghee Karam Idli (2 pcs)': 'image_18.jpg',
  'Set Dosa 2 pcs (Kaal)': 'image_15.jpg',
  'Medhu Vadai 2pc': 'image_13.jpg',
  'Mini Tiffin': 'image_43.jpg',
  'Freshly Made Kothu Parotta with Chicken': 'image_16.jpg',
  'Freshly Made Parotta with Chicken Curry': 'image_30.jpg',
  'Freshly Made Parotta (2 pcs)': 'image_30.jpg',
  'Chappati and Dal': 'image_34.jpg',
  'Cut Mirchi Bajji': 'image_27.jpg',
  'Plantain Baji / Valakkai Baji': 'image_19.jpg',
  'Pav Bhaji': 'image_17.jpg',
  'Garlic Naan': 'image_24.jpg',
  'Egg Bonda': 'image_23.jpg',
  'Chicken 65': 'image_25.jpg',
  'Kongu Mutton Briyani': 'image_44.jpg',
  'Kongu Mutton Briyani + Chicken 65': 'image_51.jpg',
  'Hyderabadi Chicken Biryani': 'image_44.jpg',
  'Kingfish Tava Fry / Vanjaram Fry - 2 pcs': 'image_29.jpg',
  'Kongu Pepper Chicken Wrap': 'image_46.jpg',
  'Paneer Parotta Wrap': 'image_50.jpg',
  'Butter Chicken Masala Burrito Wrap': 'image_48.jpg',
  'Chicken Tikka Masala Burrito Wrap': 'image_49.jpg',
  'Chettinaad Chicken Rice Bowl': 'image_45.jpg',
  'Kongu Pepper Chicken Rice Bowl': 'image_47.jpg',
  'Chicken Fried Rice': 'image_38.jpg',
  'Butter Chicken Masala': 'image_52.jpg',
  'Chicken Tikka Masala': 'image_53.jpg',
  'Chicken Curry 16oz': 'image_56.jpg',
  'Yellow Tadka Dal 16oz': 'image_57.jpg',
  '16 oz Sambar': 'image_60.jpg',
  'Madras Filter Coffee': 'image_63.jpg',
  'Saffron Masala Chai': 'image_64.jpg',
  'Cardamom Chai': 'image_62.jpg',
  'Mango Lassi': 'image_65.jpg',
  'Jarritos Mandarin': 'image_68.jpg',
  'Jarritos Guava': 'image_69.jpg',
  'Jarritos Pineapple': 'image_67.jpg',
};

export const hiResImages = {
  hero: 'banana_leaf_meal.webp',
  'Masala Dosa 1pc (Kal)': 'masala_dosa.jpg',
  'Mini Tiffin': 'mini_tiffin.webp',
  'Cut Mirchi Bajji': 'mirchi_bajji.jpg',
  'Kongu Mutton Briyani': 'mutton_biryani.jpg',
  'Kongu Mutton Briyani + Chicken 65': 'mutton_biryani.jpg',
  'Hyderabadi Chicken Biryani': 'hyd_chicken_biryani.jpg',
  'Kingfish Tava Fry / Vanjaram Fry - 2 pcs': 'kingfish-fry.jpg',
  'Freshly Made Parotta with Chicken Curry': 'parotta_with_chicken_curry.webp',
};

export function getImagePath(name) {
  const file = itemImages[name];
  return file ? `/velskitchen/images/${file}` : null;
}

export function getHiResPath(name) {
  const file = hiResImages[name];
  if (file) return `/velskitchen/images/${file}`;
  return getImagePath(name);
}

export const signatureItems = [
  { name: 'Mini Tiffin', price: '$14.00', description: 'Idli, mini dosa, pongal, medhu vadai, sweet, sambar, coconut chutney, and kara chutney.' },
  { name: 'Masala Dosa 1pc (Kal)', price: '$15.00', description: 'Golden crisp dosa filled with savory spiced potato masala, served with sambar and chutney.' },
  { name: 'Kongu Mutton Briyani', price: '$23.00', description: 'Kongu Nadu-style mutton biryani with tender mutton, seeraga samba rice, and traditional spices.' },
  { name: 'Madras Filter Coffee', price: '$4.49', description: 'Rich, frothy, slow-brewed South Indian filter coffee in a steel tumbler.' },
];

export const highlightCategories = [
  { name: 'Fresh Tiffin', emoji: '🫓' },
  { name: 'Dosas & Snacks', emoji: '🥘' },
  { name: 'Homestyle Curries', emoji: '🍛' },
  { name: 'Biryani & Rice', emoji: '🍚' },
  { name: 'Chai & Coffee', emoji: '☕' },
];

export const tastingMenus = [
  {
    id: 'tiffin-experience',
    name: 'The Tiffin Experience',
    price: '$35',
    serves: '1–2',
    tagline: 'A complete South Indian breakfast spread.',
    description: 'Everything you need for a proper South Indian morning. Steamed, fried, and fermented — the full range.',
    items: ['Mini Tiffin', 'Masala Dosa 1pc (Kal)', 'Madras Filter Coffee'],
    heroImage: 'mini_tiffin.webp',
  },
  {
    id: 'snack-hour',
    name: 'Snack Hour',
    price: '$25',
    serves: '2–3',
    tagline: 'Our crispiest snacks in one box.',
    description: 'Five different textures. Five different spice levels. One box of things you can’t stop eating.',
    items: ['Punugulu', 'Cut Mirchi Bajji', 'Medhu Vadai 2pc', 'Plantain Baji / Valakkai Baji', 'Saffron Masala Chai'],
    heroImage: 'mirchi_bajji.jpg',
  },
  {
    id: 'weekend-feast',
    name: 'The Weekend Feast',
    price: '$55',
    serves: '2',
    tagline: 'Kongu biryani, chicken 65, parotta, and filter coffee.',
    description: 'The meal that makes you cancel your evening plans. Seeraga samba biryani, crispy chicken 65, flaky hand-pulled parotta, and filter coffee to finish.',
    items: ['Kongu Mutton Briyani', 'Chicken 65', 'Freshly Made Parotta (2 pcs)', 'Madras Filter Coffee'],
    heroImage: 'mutton_biryani.jpg',
  },
  {
    id: 'dosa-chai',
    name: 'Dosa & Chai for Two',
    price: '$35',
    serves: '2',
    tagline: 'The classics, done right.',
    description: 'Stone-ground dosas, ghee-kissed idli, and two cups of saffron chai. Simple. No shortcuts.',
    items: ['Masala Dosa 1pc (Kal)', 'Set Dosa 2 pcs (Kaal)', 'Ghee Karam Idli (2 pcs)', 'Saffron Masala Chai ×2'],
    heroImage: 'masala_dosa.jpg',
  },
];

export const specialsConfig = {
  weekend: ['Freshly Made Parotta with Chicken Curry', 'Kongu Mutton Briyani + Chicken 65', 'Hyderabadi Chicken Biryani', 'Kingfish Tava Fry / Vanjaram Fry - 2 pcs'],
  featured: ['Masala Dosa 1pc (Kal)', 'Mini Tiffin', 'Chicken 65', 'Freshly Made Parotta with Chicken Curry', 'Madras Filter Coffee', 'Pongal'],
  newItems: ['Freshly Made Kothu Parotta with Chicken', 'Butter Chicken Masala Burrito Wrap', 'Chicken Fried Rice'],
};

export const menuData = [
  {
    category: 'Tiffin',
    items: [
      { name: 'Mini Tiffin', price: '$14.00', description: 'Idli, mini dosa, pongal, medhu vadai, sweet, sambar, coconut chutney, and kara chutney.', tags: ['Vegetarian', 'Sampler'] },
      { name: 'Idli (3 pcs)', price: '$8.00', description: 'Soft steamed rice and lentil cakes served with sambar and chutney.', tags: ['Vegetarian'] },
      { name: 'Idli (2 pcs)', price: '$10.00', description: 'Soft fermented rice and lentil cakes, light and comforting.', tags: ['Vegetarian'] },
      { name: 'Ghee Karam Idli (2 pcs)', price: '$9.00', description: 'Soft idlis finished with ghee and spicy karam podi.', tags: ['Vegetarian', 'Spicy'] },
      { name: 'Pongal', price: '$9.00', description: 'Rice and lentil comfort dish tempered with black pepper, cumin, ginger, and ghee.', tags: ['Vegetarian'] },
      { name: 'Masala Dosa 1pc (Kal)', price: '$15.00', description: 'Golden crisp dosa filled with savory spiced potato masala, served with sambar and coconut chutney.', tags: ['Vegetarian', 'Popular'] },
      { name: 'Set Dosa 2 pcs (Kaal)', price: '$8.00', description: 'Soft South Indian set dosas served with chutney and sambar.', tags: ['Vegetarian'] },
      { name: 'Chappati and Dal', price: '$8.00', description: 'Soft chapati served with comforting dal.', tags: ['Vegetarian'] },
      { name: 'Freshly Made Parotta (2 pcs)', price: '$11.00', description: 'Flaky layered South Indian flatbread, pan-fried until golden.', tags: ['Vegetarian'] },
      { name: 'Freshly Made Parotta with Chicken Curry', price: '$13.00', description: 'Flaky parotta served with homestyle chicken curry.', tags: ['Popular'] },
      { name: 'Freshly Made Kothu Parotta with Chicken', price: '$15.00', description: 'Chopped parotta tossed with egg, green chili, salna, onion, and chicken.', tags: ['Popular', 'Spicy'] },
    ],
  },
  {
    category: 'Snacks',
    items: [
      { name: 'Punugulu', price: '$8.00', description: 'Fermented rice and lentil deep-fried dumplings.', tags: ['Vegetarian'] },
      { name: 'Cut Mirchi Bajji', price: '$7.00', description: 'Batter-fried long hot pepper, cut and fried to a golden brown.', tags: ['Vegetarian', 'Spicy'] },
      { name: 'Plantain Baji / Valakkai Baji', price: '$5.00', description: 'Raw plantain slices coated in lightly spiced gram flour batter and fried crisp.', tags: ['Vegetarian'] },
      { name: 'Medhu Vadai 2pc', price: '$5.00', description: 'Crispy South Indian lentil doughnuts served with chutney and sambar.', tags: ['Vegetarian'] },
      { name: 'Pav Bhaji', price: '$11.00', description: 'Mumbai street-style mashed vegetable curry served with toasted pav buns.', tags: ['Vegetarian'] },
      { name: 'Garlic Naan', price: '$4.00', description: 'Soft Indian bread infused with garlic and herbs.', tags: ['Vegetarian'] },
      { name: 'Egg Bonda', price: '$3.00', description: 'Boiled egg dipped in bajji batter and fried.', tags: ['Egg'] },
      { name: 'Chicken 65', price: '$14.00', description: 'Crispy chicken bites tossed with South Indian spices, curry leaves, and green chilies.', tags: ['Spicy', 'Popular'] },
    ],
  },
  {
    category: 'Biryani & Weekend Specials',
    items: [
      { name: 'Kongu Mutton Briyani', price: '$23.00', description: 'Kongu Nadu-style mutton biryani with tender mutton, seeraga samba rice, and traditional spices.', tags: ['Weekend', 'Special'] },
      { name: 'Kongu Mutton Briyani + Chicken 65', price: '$30.00', description: 'Kongu mutton biryani paired with spicy Chicken 65.', tags: ['Weekend', 'Popular'] },
      { name: 'Hyderabadi Chicken Biryani', price: '$16.99', description: 'Dum-style chicken biryani layered with fragrant rice, spices, fried onions, and herbs.', tags: ['Weekend'] },
      { name: 'Kingfish Tava Fry / Vanjaram Fry - 2 pcs', price: '$17.00', description: 'Kingfish marinated with chili, turmeric, pepper, ginger-garlic, and coastal spices, then tava-fried.', tags: ['Seafood', 'Popular'] },
    ],
  },
  {
    category: 'Wraps',
    items: [
      { name: 'Chicken Chettinaad Wrap', price: '$13.99', description: 'Spiced Chettinaad chicken wrapped in a soft tortilla.', tags: ['Chicken'] },
      { name: 'Paneer Parotta Wrap', price: '$14.00', description: 'Paneer marinated in aromatic spices, wrapped in flaky parotta.', tags: ['Vegetarian'] },
      { name: 'Kongu Pepper Chicken Wrap', price: '$13.99', description: 'Pepper-spiced chicken wrapped in a toasted tortilla.', tags: ['Chicken', 'Spicy'] },
      { name: 'Kongu Pepper Paneer Wrap', price: '$13.99', description: 'Pepper-spiced paneer wrapped in a toasted tortilla.', tags: ['Vegetarian', 'Spicy'] },
      { name: 'Chicken Tikka Masala Burrito Wrap', price: '$14.99', description: 'Chicken tikka masala with lettuce, onions, bell peppers, and soft wrap.', tags: ['Chicken'] },
      { name: 'Paneer Tikka Masala Burrito Wrap', price: '$14.99', description: 'Paneer tikka masala with crisp vegetables in a soft wrap.', tags: ['Vegetarian'] },
      { name: 'Butter Chicken Masala Burrito Wrap', price: '$14.99', description: 'Creamy butter chicken masala with fresh vegetables in a soft wrap.', tags: ['Chicken'] },
      { name: 'Butter Paneer Masala Burrito Wrap', price: '$14.99', description: 'Creamy butter paneer masala with fresh vegetables in a soft wrap.', tags: ['Vegetarian'] },
      { name: 'Chappati Paneer Wrap', price: '$13.99', description: 'Paneer wrapped in soft wheat chapati.', tags: ['Vegetarian'] },
    ],
  },
  {
    category: 'Rice Bowls & Combos',
    items: [
      { name: 'Madras Chicken Rice Bowl', price: '$14.99', description: 'Chicken in aromatic Madras-style spices served over rice with fresh vegetables.', tags: ['Chicken'] },
      { name: 'Chettinaad Chicken Rice Bowl', price: '$14.00', description: 'Chettinaad-style chicken served over rice.', tags: ['Chicken'] },
      { name: 'Chettinaad Paneer Rice Bowl', price: '$12.99', description: 'Paneer with Chettinaad-style spices served over rice.', tags: ['Vegetarian'] },
      { name: 'Kongu Pepper Chicken Rice Bowl', price: '$13.99', description: 'Pepper-spiced chicken served over rice.', tags: ['Chicken', 'Spicy'] },
      { name: 'Kongu Pepper Paneer Rice Bowl', price: '$13.99', description: 'Pepper-spiced paneer served over rice.', tags: ['Vegetarian', 'Spicy'] },
      { name: 'Chicken Fried Rice', price: '$16.85', description: 'Wok-tossed rice with chicken, vegetables, egg, garlic, soy sauce, and spring onions.', tags: ['Chicken'] },
      { name: 'Paneer Fried Rice', price: '$15.99', description: 'Spiced paneer fried rice with onions and curry masala.', tags: ['Vegetarian'] },
      { name: 'Madras Paneer Rice Bowl', price: '$12.99', description: 'Paneer in Madras-style spices served over aromatic rice.', tags: ['Vegetarian'] },
    ],
  },
  {
    category: 'North Indian Dishes',
    items: [
      { name: 'Chicken Tikka Masala', price: '$16.99', description: 'Grilled chicken simmered in rich, creamy tomato-based masala.', tags: ['Chicken'] },
      { name: 'Butter Chicken Masala', price: '$17.00', description: 'Tender chicken simmered in creamy butter masala sauce.', tags: ['Chicken'] },
      { name: 'Paneer Butter Masala', price: '$15.99', description: 'Paneer cubes simmered in buttery tomato and cashew-based gravy.', tags: ['Vegetarian'] },
      { name: 'Paneer Tikka Masala', price: '$15.99', description: 'Grilled paneer cubes simmered in spiced tomato cream sauce.', tags: ['Vegetarian'] },
    ],
  },
  {
    category: 'Homestyle Curry',
    items: [
      { name: 'Chicken Curry 16oz', price: '$14.00', description: 'Homestyle chicken curry for rice, chapati, idli, dosa, or parotta.', tags: ['Chicken'] },
      { name: 'Yellow Tadka Dal 16oz', price: '$14.00', description: 'Comforting yellow dal tempered with spices.', tags: ['Vegetarian'] },
      { name: '16 oz Sambar', price: '$6.00', description: 'South Indian lentil and vegetable stew, perfect with rice, idli, dosa, or chapati.', tags: ['Vegetarian'] },
    ],
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Madras Filter Coffee', price: '$4.49', description: 'Rich, frothy, slow-brewed South Indian filter coffee.', tags: ['Best Seller'] },
      { name: 'Saffron Masala Chai', price: '$4.00', description: 'Warm masala chai infused with saffron and spices.', tags: ['Best Seller'] },
      { name: 'Mango Lassi', price: '$5.99', description: 'Creamy mango yogurt drink.', tags: ['Cold'] },
      { name: 'Cardamom Chai', price: '$4.49', description: 'Light, aromatic chai with cardamom.', tags: ['Hot'] },
      { name: 'Jarritos Mandarin', price: '$3.99', description: 'Mandarin-flavored soda.', tags: ['Cold'] },
      { name: 'Jarritos Guava', price: '$3.99', description: 'Guava-flavored soda.', tags: ['Cold'] },
      { name: 'Jarritos Pineapple', price: '$3.99', description: 'Pineapple-flavored soda.', tags: ['Cold'] },
    ],
  },
];

export function findMenuItem(name) {
  for (const cat of menuData) {
    const item = cat.items.find((i) => i.name === name);
    if (item) return { ...item, category: cat.category };
  }
  return null;
}
