import TopHeader from '../components/TopHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import JsonLd from '../components/JsonLd';
import { siteConfig } from '../data/site';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ssfurniture.in';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'S.S. Furniture | Beds, Sofas, Dining Tables & Home Furniture',
    template: '%s | S.S. Furniture',
  },
  description:
    'S.S. Furniture is a local furniture showroom located at Shop no. 5, Aai Chandika Hills, Waki Pada, near Sargam Residency Bapane, Naigaon East, Maharashtra 401208 offering handcrafted solid wood beds, sofa sets, storage cabinets, wooden home mandirs, dining tables, and quality home furniture products.',
  keywords: [
    'S.S. Furniture',
    'furniture showroom Naigaon East',
    'furniture shop Bapane',
    'furniture shop Vasai Virar',
    'wooden furniture Maharashtra',
    'beds and sofas Naigaon',
    'solid wood bed',
    'wooden mandir pooja unit',
    'dining tables',
    'storage cabinets',
    'centre tables',
    'furniture showroom near me',
  ],
  authors: [{ name: 'S.S. Furniture' }],
  creator: 'S.S. Furniture',
  publisher: 'S.S. Furniture',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'S.S. Furniture | Beds, Sofas, Dining Tables & Home Furniture',
    description:
      'Explore handcrafted solid wood beds, plush sofa sets, storage cabinets, artisanal home mandirs, and dining suites at S.S. Furniture.',
    url: siteUrl,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/sections/hero-living-room.jpg',
        width: 1200,
        height: 675,
        alt: 'S.S. Furniture Showroom Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S.S. Furniture | Beds, Sofas, Dining Tables & Home Furniture',
    description:
      'Handcrafted home furniture showroom in Naigaon East, Maharashtra. Solid wood beds, sofas, dining tables, cabinets, and mandirs.',
    images: ['/images/sections/hero-living-room.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#25160E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <JsonLd />
        <TopHeader />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
