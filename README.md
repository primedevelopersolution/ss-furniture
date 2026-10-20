# S.S. Furniture — Official Website

A production-ready website for **S.S. Furniture**, a home furniture showroom located in Naigaon East, Maharashtra.

Built with Next.js (App Router), React, vanilla CSS, and Node.js server route handlers with Nodemailer for three-way email notifications.

---

## 1. Business Overview

- **Business Name:** S.S. Furniture
- **Business Type:** Furniture Showroom (selling home furniture products)
- **Showroom Phone:** `+91 9823599547` (Click-to-Call & WhatsApp)
- **Showroom Email:** `contact@ssfurniture.in`
- **Showroom Address:** Shop no. 5, Aai Chandika Hills, Waki Pada, near Sargam Residency Bapane, Naigaon East, Maharashtra 401208
- **Coordinates:** `19.3631019, 72.8841798`
- **Google Maps Profile:** [https://share.google/kiZ6JeMcrNIOdsCSl](https://share.google/kiZ6JeMcrNIOdsCSl)
- **Products & Showroom Range:**
  - Beds & Bedroom Sets (King/Queen, solid wood, storage beds)
  - Sofas & Living Room Seating (L-shaped sectionals, 3-seaters)
  - Cabinets & Storage Furniture (crockery units, wardrobes)
  - Handcrafted Home Mandirs & Pooja Units
  - Dining Tables & Dining Suites (4-seater & 6-seater)
  - Centre Tables & Coffee Tables
  - Dressing Units & Complementary Home Furniture

---

## 2. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Language:** JavaScript only (No TypeScript)
- **Styles:** Plain CSS with modern CSS custom properties (Variables), responsive layout grids, and mobile-first rules (No Tailwind, No Bootstrap)
- **Icons:** `lucide-react`
- **Email Delivery:** `nodemailer` on Node.js Serverless Route Handlers
- **Deployment Platform:** Vercel (Edge-ready static prerendering + Node.js Serverless Function for `/api/contact`)
- **Version Control:** Git & GitHub

---

## 3. Project Directory Structure

```text
ss-furniture/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── images/
│       ├── ss-furniture-logo.svg        # Primary vector logo
│       ├── ss-furniture-logo-light.svg  # Light logo for dark backgrounds
│       ├── products/                    # Realistic furniture photography
│       │   ├── bed-wooden-luxury.jpg
│       │   ├── sofa-sectional-l-shape.jpg
│       │   ├── cabinet-crockery-storage.jpg
│       │   ├── mandir-wooden-pooja.jpg
│       │   ├── dining-table-6-seater.jpg
│       │   ├── centre-table-coffee.jpg
│       │   └── dressing-table-wardrobe.jpg
│       └── sections/                    # Section photography
│           ├── hero-living-room.jpg
│           ├── about-craftsmanship.jpg
│           └── contact-showroom-interior.jpg
├── src/
│   ├── app/
│   │   ├── layout.js                    # Root layout with metadata & JSON-LD
│   │   ├── page.js                      # Home page
│   │   ├── globals.css                  # Design system & CSS variables
│   │   ├── not-found.js                 # Custom 404 page
│   │   ├── robots.js                    # Search engine robots.txt
│   │   ├── sitemap.js                   # Dynamic XML sitemap generator
│   │   ├── about/
│   │   │   └── page.js                  # About Us page
│   │   ├── furniture/
│   │   │   ├── page.js                  # Furniture catalogue wrapper
│   │   │   └── FurnitureClient.js       # Interactive catalogue & filtering
│   │   ├── gallery/
│   │   │   └── page.js                  # Inspiration gallery & lightbox
│   │   ├── contact/
│   │   │   └── page.js                  # Contact page with enquiry form & map
│   │   └── api/
│   │       └── contact/
│   │           └── route.js             # Node.js 3-way email endpoint
│   ├── components/
│   │   ├── TopHeader.js                 # Quick contact bar
│   │   ├── Header.js                    # Sticky navigation & mobile drawer
│   │   ├── Footer.js                    # Comprehensive site footer
│   │   ├── Hero.js                      # High-impact furniture hero section
│   │   ├── FurnitureCategory.js         # Category grid
│   │   ├── FeaturedFurniture.js         # Signature product cards with WhatsApp
│   │   ├── AboutSection.js              # Craftsmanship narrative
│   │   ├── WhyChooseUs.js               # Practical shopping considerations
│   │   ├── GallerySection.js            # Category filterable gallery + lightbox
│   │   ├── ContactForm.js               # Client validated enquiry form
│   │   ├── MapSection.js                # Responsive Google Maps embed
│   │   ├── CtaBanner.js                 # Pre-footer consultation banner
│   │   ├── WhatsAppButton.js            # Floating WhatsApp action
│   │   └── JsonLd.js                    # Schema.org structured data
│   ├── data/
│   │   ├── site.js                      # Site configuration & business details
│   │   └── furniture.js                 # Product catalogue & gallery data
│   └── styles/                          # Component-specific stylesheets
├── .env.example                         # Environment variables template
├── .gitignore                           # Git ignore rules (secrets protected)
├── next.config.js                       # Next.js configuration
├── package.json                         # Dependencies & scripts
└── README.md                            # Comprehensive documentation
```

---

## 4. Environment Variables

Create a `.env.local` file in the project root for local development. Never commit `.env.local` or secrets to Git.

| Variable Name | Required | Default / Example | Purpose |
| :--- | :---: | :--- | :--- |
| `OWNER_EMAIL` | **Yes** | `owner@example.com` | Showroom recipient for new customer enquiries. |
| `DEVELOPER_EMAIL` | Optional | `dev@example.com` | Developer recipient for diagnostic enquiry alerts. |
| `SMTP_HOST` | **Yes** | `smtp.gmail.com` | SMTP host of your email provider. |
| `SMTP_PORT` | **Yes** | `587` | SMTP port (`587` for TLS, `465` for SSL). |
| `SMTP_SECURE` | Optional | `false` | `true` for port 465, `false` for port 587. |
| `SMTP_USER` | **Yes** | `showroom@gmail.com` | Authenticated SMTP username / email address. |
| `SMTP_PASS` | **Yes** | `xxxx xxxx xxxx xxxx` | SMTP app password or API key. |
| `SMTP_FROM_EMAIL` | Optional | `showroom@gmail.com` | Verified sender email address. |
| `SMTP_FROM_NAME` | Optional | `S.S. Furniture` | Sender display name. |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://your-domain.vercel.app` | Canonical site base URL for SEO and sitemaps. |

---

## 5. Three-Way Email Notification Architecture

When a customer submits an enquiry via the website (`/api/contact`), the server executes strict sanitization and validation before triggering three distinct email messages:

1. **Email 1: Shop Owner Notification (`OWNER_EMAIL`)**
   - **Subject:** `New Furniture Enquiry — [Customer Name] [[Category]]`
   - **Contents:** Full customer name, validated email address, phone number, category of interest, full customer message, formatted timestamp, and direct `replyTo` header set to the customer's email.
2. **Email 2: Developer Notification (`DEVELOPER_EMAIL`)**
   - **Subject:** `New S.S. Furniture Website Enquiry — [Customer Name]`
   - **Contents:** Technical debug context, submission timestamp, client IP, and form data.
3. **Email 3: Customer Confirmation (Customer's Email)**
   - **Subject:** `We Received Your Furniture Enquiry — S.S. Furniture`
   - **Contents:** Branded confirmation thanking the customer, summarizing their chosen furniture category and message, and providing showroom direct telephone and WhatsApp links.

### Security & Spam Controls
- **Honeypot Protection:** Hidden honeypot field (`company_website`) traps automated spam bots without burdening real users.
- **Header Injection Defense:** All user input is sanitized to strip out newline breaks (`\r` and `\n`) before headers are constructed.
- **In-Memory Rate Limiting:** Enforces rate limits per client IP (maximum 5 submissions per 10 minutes).
- **Graceful Error Handling:** If SMTP credentials are not configured or connection fails, the server responds with a clear status code (`503` or `502`) and diagnostic details, avoiding false success reporting.

---

## 6. Local Development

### 1. Prerequisites
- Node.js `v18.17+` or `v20+` (tested on Node v24)
- npm `v9+` or `v10+`

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
copy .env.example .env.local
```
Fill in your SMTP credentials in `.env.local`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Production Build Locally
```bash
npm run build
npm run start
```

---

## 7. GitHub & Vercel Deployment Guide

### Step 1: Initialize Git and Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new), for example `ss-furniture`.
2. Commit your local files and push:
   ```bash
   git add .
   git commit -m "feat: complete production-ready S.S. Furniture website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ss-furniture.git
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import the `ss-furniture` repository from GitHub.
4. Framework Preset will be automatically detected as **Next.js**.
5. Working Directory: `./`

### Step 3: Configure Environment Variables in Vercel
In the Vercel project configuration screen, open the **Environment Variables** tab and enter:
- `OWNER_EMAIL`
- `DEVELOPER_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL`
- `SMTP_FROM_NAME`
- `NEXT_PUBLIC_SITE_URL` (set to your Vercel deployment URL or production custom domain)

### Step 4: Deploy & Verify
1. Click **Deploy**. Vercel will build the project and output a live preview URL.
2. Verify all pages (`/`, `/about`, `/furniture`, `/gallery`, `/contact`).
3. Submit a test enquiry through the contact form to confirm delivery of all three email notifications.

### Step 5: Custom Domain & Search Console
1. Under **Settings -> Domains** in Vercel, attach your custom domain (e.g., `ssfurniture.in`).
2. Add the required CNAME and A records at your DNS registrar.
3. Open [Google Search Console](https://search.google.com/search-console).
4. Verify site ownership using the HTML tag or DNS TXT record.
5. Submit your sitemap URL: `https://your-domain.com/sitemap.xml`.
6. Request indexing for the homepage and major category pages.

---

## 8. Verification & Testing Checklist

- [x] All 5 pages render without console errors (`/`, `/about`, `/furniture`, `/gallery`, `/contact`).
- [x] Custom branded 404 page exists and functions properly.
- [x] Primary SVG logo and favicon load crisply across both light and dark backgrounds.
- [x] Mobile navigation drawer opens, locks scrolling, and navigates seamlessly.
- [x] All 10 generated photographic furniture images load without broken URLs.
- [x] Category filtering and item prefill routes work as expected.
- [x] Accessible Lightbox modal in Gallery opens, closes with button or ESC key.
- [x] Click-to-call link connects to `+91 9823599547`.
- [x] WhatsApp buttons link to `https://wa.me/919823599547` with prefilled message.
- [x] Google Maps embed loads exact verified coordinates (`19.3631019, 72.8841798`).
- [x] Client and server-side form validation rejects empty, short, or invalid inputs.
- [x] Honeypot rejects automated bot submissions.
- [x] Safe SMTP diagnostic reporting prevents false success states.
- [x] Open Graph, Twitter Cards, canonical URLs, `robots.txt`, and `sitemap.xml` are active.
- [x] Schema.org `FurnitureStore` JSON-LD structured data is valid.
- [x] Production build passes cleanly with zero errors.

---

## 9. Real Business Information Required from Shop Owner

Before final public launch, collect these optional details from the business owner:

1. **SMTP Mail Credentials:** Real SMTP credentials (e.g. Gmail App Password, Zoho Mail, or Brevo SMTP key) to activate live three-way email sending.
2. **Shop Owner Email:** The specific email address where the shop owner wishes to receive enquiries (`OWNER_EMAIL`).
3. **Showroom Visiting Hours:** Daily opening and closing hours (e.g. 10:00 AM – 8:30 PM).
4. **Complete Postal Address / Landmark:** Detailed street address, shop number, or local landmark in Vasai-Virar.
5. **Custom Production Domain:** The registered domain name (e.g. `ssfurniture.in`) to link to Vercel and Google Search Console.
