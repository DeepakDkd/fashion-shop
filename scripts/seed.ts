/**
 * Seed Script — Run once to populate sample products & shop info
 * Usage: npx ts-node --project tsconfig.json scripts/seed.ts
 * OR: Add to package.json: "seed": "npx tsx scripts/seed.ts"
 * Then run: npm run seed
 */

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-shop'

const ProductSchema = new mongoose.Schema({
  name_hi: String, name_en: String,
  desc_hi: String, desc_en: String,
  price: Number, price_label: String,
  images: [String],
  category: String, slug: String,
  featured: Boolean, isNewArrival: Boolean, inStock: Boolean,
}, { timestamps: true })

const ShopInfoSchema = new mongoose.Schema({
  name_hi: String, name_en: String,
  address: String, phone: String,
  whatsapp: String, hours: String, mapLink: String,
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
const ShopInfo = mongoose.models.ShopInfo || mongoose.model('ShopInfo', ShopInfoSchema)

const PLACEHOLDER = 'https://placehold.co/400x500/fce7f3/be185d?text='

const products = [
  {
    name_hi: 'बनारसी रेशम साड़ी',
    name_en: 'Banarasi Silk Saree',
    desc_hi: 'उत्कृष्ट बनारसी रेशम की साड़ी, सुनहरे ज़री के काम के साथ। शादी और त्योहारों के लिए परफेक्ट।',
    desc_en: 'Exquisite Banarasi silk saree with golden zari work. Perfect for weddings and festivals.',
    price: 2499,
    price_label: 'से शुरू',
    images: [PLACEHOLDER + 'Banarasi+Saree'],
    category: 'saree', slug: 'banarasi-silk-saree',
    featured: true, isNewArrival: true, inStock: true,
  },
  {
    name_hi: 'कॉटन प्रिंटेड साड़ी',
    name_en: 'Cotton Printed Saree',
    desc_hi: 'आरामदायक कॉटन साड़ी, सुंदर प्रिंट के साथ। रोज़मर्रा के लिए बेहतरीन।',
    desc_en: 'Comfortable cotton saree with beautiful prints. Great for everyday wear.',
    price: 799,
    images: [PLACEHOLDER + 'Cotton+Saree'],
    category: 'saree', slug: 'cotton-printed-saree',
    featured: false, isNewArrival: true, inStock: true,
  },
  {
    name_hi: 'एंब्रॉयडरी अनारकली सूट',
    name_en: 'Embroidery Anarkali Suit',
    desc_hi: 'खूबसूरत एंब्रॉयडरी वाला अनारकली सूट। पार्टी और फंक्शन के लिए परफेक्ट।',
    desc_en: 'Beautiful embroidery Anarkali suit. Perfect for parties and functions.',
    price: 1599,
    images: [PLACEHOLDER + 'Anarkali+Suit'],
    category: 'suit', slug: 'embroidery-anarkali-suit',
    featured: true, isNewArrival: false, inStock: true,
  },
  {
    name_hi: 'पंजाबी सूट सेट',
    name_en: 'Punjabi Suit Set',
    desc_hi: 'तीन पीस पंजाबी सूट सेट — कुर्ती, पजामा और दुपट्टा।',
    desc_en: 'Three piece Punjabi suit set — kurti, pajama and dupatta.',
    price: 1199,
    images: [PLACEHOLDER + 'Punjabi+Suit'],
    category: 'suit', slug: 'punjabi-suit-set',
    featured: false, isNewArrival: true, inStock: true,
  },
  {
    name_hi: 'डिज़ाइनर ब्लाउज़',
    name_en: 'Designer Blouse',
    desc_hi: 'हाथ से कढ़ाई किया हुआ डिज़ाइनर ब्लाउज़। सभी साड़ियों के साथ मैच होता है।',
    desc_en: 'Hand embroidered designer blouse. Matches with all sarees.',
    price: 599,
    images: [PLACEHOLDER + 'Designer+Blouse'],
    category: 'blouse', slug: 'designer-blouse',
    featured: true, isNewArrival: false, inStock: true,
  },
  {
    name_hi: 'प्लेन ब्लाउज़ (रेडीमेड)',
    name_en: 'Plain Blouse (Readymade)',
    desc_hi: 'सादा रेडीमेड ब्लाउज़, सभी साइज़ में उपलब्ध।',
    desc_en: 'Plain readymade blouse, available in all sizes.',
    price: 299,
    images: [PLACEHOLDER + 'Plain+Blouse'],
    category: 'blouse', slug: 'plain-blouse-readymade',
    featured: false, isNewArrival: false, inStock: true,
  },
  {
    name_hi: 'ब्राइडल हील्स',
    name_en: 'Bridal Heels',
    desc_hi: 'शादी के लिए खूबसूरत हील्स, कढ़ाई और स्टोन वर्क के साथ।',
    desc_en: 'Beautiful bridal heels with embroidery and stone work.',
    price: 999,
    images: [PLACEHOLDER + 'Bridal+Heels'],
    category: 'footwear', slug: 'bridal-heels',
    featured: true, isNewArrival: true, inStock: true,
  },
  {
    name_hi: 'फ्लैट चप्पल',
    name_en: 'Flat Slippers',
    desc_hi: 'आरामदायक और स्टाइलिश फ्लैट चप्पल। रोज़ पहनने के लिए।',
    desc_en: 'Comfortable and stylish flat slippers for daily use.',
    price: 399,
    images: [PLACEHOLDER + 'Flat+Slippers'],
    category: 'footwear', slug: 'flat-slippers',
    featured: false, isNewArrival: false, inStock: true,
  },
]

const shopInfo = {
  name_hi: 'श्रृंगार फैशन',
  name_en: 'Shringar Fashion',
  address: 'राजवाड़ा रोड, इंदौर, मध्यप्रदेश 452001',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  hours: 'सोमवार–शनिवार: सुबह 10 बजे – रात 8 बजे',
  mapLink: '',
}

async function seed() {
  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected!')

  // Clear existing
  await Product.deleteMany({})
  await ShopInfo.deleteMany({})
  console.log('🗑️  Cleared existing data')

  // Insert products
  await Product.insertMany(products)
  console.log(`✅ Inserted ${products.length} products`)

  // Insert shop info
  await ShopInfo.create(shopInfo)
  console.log('✅ Inserted shop info')

  await mongoose.disconnect()
  console.log('🎉 Seed complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
