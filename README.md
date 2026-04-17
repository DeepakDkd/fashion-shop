# 🌸 Shringar Fashion — Women's Clothing Catalog

> Next.js 14 + Tailwind CSS + MongoDB — Hindi-first women's fashion catalog with WhatsApp ordering

---

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/fashion-shop
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_SHOP_WHATSAPP=919876543210
ADMIN_PASSWORD=yourpassword
```

### 3. Seed Sample Data (Optional)
```bash
npm run seed
```
This adds 8 sample products and shop info.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000/hi](http://localhost:3000/hi)

### 5. Deploy to Vercel
```bash
npx vercel --prod
```
Add all `.env.local` variables in Vercel dashboard → Settings → Environment Variables.

---

## 🔑 Free Accounts Needed

| Service | What For | Free Tier |
|---------|----------|-----------|
| [MongoDB Atlas](https://cloud.mongodb.com) | Database | 512MB free |
| [Cloudinary](https://cloudinary.com) | Image storage | 25GB free |
| [Vercel](https://vercel.com) | Hosting | Free |

---

## 📱 Pages

| URL | Description |
|-----|-------------|
| `/hi` | Home page (Hindi default) |
| `/en` | Home page (English) |
| `/hi/products` | All products with search & filter |
| `/hi/products/[slug]` | Product detail |
| `/hi/category/saree` | Sarees category |
| `/hi/category/suit` | Suits category |
| `/hi/category/blouse` | Blouses category |
| `/hi/category/footwear` | Footwear category |
| `/hi/admin` | Admin dashboard (password protected) |
| `/hi/admin/products/new` | Add new product |
| `/hi/admin/products/[id]/edit` | Edit product |

---

## 🔐 Admin Login

Go to `/hi/admin` — browser will ask for username and password:
- **Username:** `admin`
- **Password:** whatever you set in `ADMIN_PASSWORD`

### Admin Features:
- ✅ Add new products with image upload
- ✅ Edit existing products
- ✅ Delete products
- ✅ Toggle featured / new arrival
- ✅ Dashboard with stats

---

## 📲 WhatsApp Integration

Each product has a "WhatsApp पर खरीदें" button. When clicked, it opens WhatsApp with a pre-filled message:

```
नमस्ते! मुझे यह उत्पाद चाहिए:
*बनारसी रेशम साड़ी*
कीमत: ₹2,499
Ref: banarasi-silk-saree

कृपया उपलब्धता बताएं।
```

Set your WhatsApp number in `.env.local`:
```
NEXT_PUBLIC_SHOP_WHATSAPP=919876543210
```
(Country code + number, no spaces, no +)

---

## 🌐 Language Toggle

- Default language: **Hindi (हिंदी)**
- Click the language button in the navbar to switch to English
- URL changes: `/hi/products` ↔ `/en/products`
- All product names, descriptions, and UI text switch

---

## 🏪 Update Shop Info

Edit via API or directly in MongoDB Atlas:
```json
{
  "name_hi": "आपकी दुकान का नाम",
  "name_en": "Your Shop Name",
  "address": "आपका पता, शहर",
  "phone": "+91 XXXXX XXXXX",
  "whatsapp": "91XXXXXXXXXX",
  "hours": "सोम-शनि: 10am - 8pm"
}
```

Or PUT to `/api/shop-info` with the updated fields.

---

## 📁 Project Structure

```
fashion-shop/
├── app/
│   ├── [locale]/           # Hindi & English routes
│   │   ├── page.tsx        # Home page
│   │   ├── products/       # Product listing + detail
│   │   ├── category/[cat]/ # Category pages
│   │   └── admin/          # Admin panel
│   └── api/                # REST API routes
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   ├── WhatsAppButton.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       └── ProductForm.tsx
├── lib/
│   ├── mongodb.ts
│   ├── cloudinary.ts
│   ├── whatsapp.ts
│   └── i18n.ts
├── models/
│   ├── Product.ts
│   └── ShopInfo.ts
├── messages/
│   ├── hi.json             # Hindi translations
│   └── en.json             # English translations
├── scripts/
│   └── seed.ts             # Sample data seeder
└── types/
    └── index.ts
```

---

## 🎨 Customization

### Change Shop Name
Edit in `components/Navbar.tsx` and `components/Footer.tsx`:
```tsx
// Change "श्रृंगार फैशन" to your shop name
```

### Change Colors
Edit `tailwind.config.ts` — the site uses `rose` as the primary color. Change to any Tailwind color.

### Add/Remove Categories
Edit the `CATEGORIES` arrays in:
- `app/api/categories/route.ts`
- `components/CategoryGrid.tsx`
- `components/ProductsClient.tsx`
- `models/Product.ts` (enum)

---

## 💡 Tips

1. **Best image size:** 400×500px (portrait) for product images
2. **Multiple images:** Upload 3-5 images per product for better customer trust
3. **Hindi typing:** Use Google Input Tools or similar for typing Hindi product names
4. **WhatsApp number:** Must include country code (91 for India), no + sign

---

## 🆘 Common Issues

**MongoDB connection error:**
- Check your MONGODB_URI in `.env.local`
- Whitelist your IP in MongoDB Atlas → Network Access

**Images not uploading:**
- Check Cloudinary credentials
- Ensure CLOUDINARY_API_SECRET is correct

**Admin page not asking for password:**
- Ensure ADMIN_PASSWORD is set in `.env.local`
- Hard-refresh the browser

---

Built with ❤️ for Indian women's fashion businesses
