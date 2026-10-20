import Link from 'next/link';
import { Home, Compass, Phone } from 'lucide-react';
import { siteConfig } from '../data/site';

export const metadata = {
  title: 'Page Not Found (404) | S.S. Furniture',
  description: 'The requested page could not be found on S.S. Furniture.',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
            fontWeight: 800,
            color: 'var(--color-accent)',
            lineHeight: 1,
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          404
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          We could not find the page you were looking for. The link may have moved, or the address might be incorrect. Explore our furniture catalogue or return to the showroom homepage.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="btn btn-primary">
            <Home size={16} />
            <span>Back to Home</span>
          </Link>

          <Link href="/furniture" className="btn btn-accent">
            <Compass size={16} />
            <span>Explore Furniture</span>
          </Link>

          <Link href="/contact" className="btn btn-outline">
            <Phone size={16} />
            <span>Contact Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
