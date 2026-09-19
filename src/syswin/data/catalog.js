import {
  productCategories, getProductName, getVisualAidUrl, getOneMgLinks, oneMgProductLinks,
} from './products.js';

/* Speciality copy. Names/slugs come from the product data; descriptions are site copy. */
const specialityMeta = {
  physician: { label: 'Physician', blurb: 'Cardiometabolic, gastro and everyday general-practice care.' },
  ortho: { label: 'Orthopaedics', blurb: 'Pain, inflammation and bone health for musculoskeletal practice.' },
  gynae: { label: 'Gynaecology', blurb: "Women's health, nutrition and infection care." },
  derma: { label: 'Dermatology', blurb: 'Antifungals, topicals and skin-care essentials.' },
  dental: { label: 'Dental', blurb: 'Anti-infectives and pain relief for dental practice.' },
  ophtho: { label: 'Ophthalmology', blurb: 'Allergy and supportive care for eye practice.' },
};

export const specialities = productCategories.map((c) => ({
  slug: c.slug,
  name: specialityMeta[c.slug]?.label ?? c.name,
  blurb: specialityMeta[c.slug]?.blurb ?? '',
  images: c.images,
}));

/** "Telwis-40-80" -> "Telwis 40/80", "Wincit-5-10--M" -> "Wincit 5/10 M" */
export function displayName(raw) {
  const tokens = raw.replace(/[….]+$/g, '').split('-').filter(Boolean);
  const words = [];
  const nums = [];
  const tail = [];
  tokens.forEach((t) => {
    if (/^\d/.test(t)) nums.push(t);
    else if (nums.length) tail.push(t);
    else words.push(t);
  });
  return [words.join('-'), nums.join('/'), tail.join(' ')].filter(Boolean).join(' ');
}

// Same display name = same product (e.g. "Wincit-5-10--M" and "Wincit-5-M-10").
const keyOf = (raw) => displayName(raw).toLowerCase();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// One entry per product, tagged with every speciality it appears in.
const byKey = new Map();
productCategories.forEach((c) => {
  c.images.forEach((image) => {
    const raw = getProductName(image);
    const key = keyOf(raw);
    const entry = byKey.get(key) ?? {
      id: slugify(displayName(raw)),
      raw,
      name: displayName(raw),
      image,
      specialities: [],
      visualAid: null,
    };
    if (!entry.specialities.includes(c.slug)) entry.specialities.push(c.slug);
    entry.visualAid = entry.visualAid ?? getVisualAidUrl(image, c.slug);
    byKey.set(key, entry);
  });
});

export const products = [...byKey.values()]
  .map((p) => ({ ...p, oneMg: getOneMgLinks(p.raw) }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const specialityName = (slug) => specialities.find((s) => s.slug === slug)?.name ?? slug;

export const countIn = (slug) => products.filter((p) => p.specialities.includes(slug)).length;

export const stats = {
  products: products.length,
  specialities: specialities.length,
  oneMgListings: Object.keys(oneMgProductLinks).length,
};

export const company = {
  name: 'Syswin Pharmaceuticals Pvt. Ltd.',
  short: 'Syswin',
  addressLines: ['No. 661, 80 Feet Road, 2nd Main', '7th Block, 2nd Phase, Banashankari 3rd Stage', 'Bengaluru 560 085'],
  phone: '080-26721522',
  phoneHref: 'tel:+918026721522',
  emails: ['syswinpharma@gmail.com', 'info@syswinpharma.com'],
  mapQuery: 'Banashankari 3rd Stage, 80 Feet Road, Bengaluru 560085',
  iso: 'ISO 9001:2015',
};
