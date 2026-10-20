import Link from 'next/link';
import { siteConfig } from '../../data/site';
import JsonLd from '../../components/JsonLd';
import '../../styles/LegalPage.css';

export const metadata = {
  title: 'Privacy Policy | S.S. Furniture',
  description:
    'Learn how S.S. Furniture collects, uses, and protects your personal information when you submit enquiries through our showroom website.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
      />

      <section className="page-hero page-hero-legal">
        <div className="container">
          <span className="section-subtitle light">Data Privacy</span>
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-subtitle">
            How S.S. Furniture protects and handles personal details submitted by customers and visitors.
          </p>
        </div>
      </section>

      <section className="legal-page-content">
        <div className="container">
          <article className="legal-article">
            <div className="legal-meta-box">
              <strong>Last Updated:</strong> October 2026 • <strong>Entity:</strong> {siteConfig.name} • <strong>Location:</strong> {siteConfig.displayAddress}
            </div>

            <h2>1. Introduction</h2>
            <p>
              At <strong>S.S. Furniture</strong>, we respect your privacy and are committed to safeguarding personal information collected when you browse our website or communicate with us. This Privacy Policy details our data practices regarding collection, usage, and security.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We only collect information that you voluntarily provide when making an enquiry or requesting showroom details:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Your full name, email address, and telephone/mobile number.</li>
              <li><strong>Furniture Requirements:</strong> The furniture category, product interest, room measurements, and custom requirements described in your message.</li>
              <li><strong>Technical Metadata:</strong> Standard non-identifying server logs (such as IP addresses and browser types) used strictly for security monitoring, spam prevention, and rate-limiting.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              Information collected through our website is used strictly for legitimate business communication:
            </p>
            <ul>
              <li>To respond to your furniture enquiries, price requests, and dimension questions.</li>
              <li>To dispatch automated customer email confirmations verifying receipt of your enquiry.</li>
              <li>To coordinate showroom visits, consultations, and personalized woodwork recommendations.</li>
              <li>To protect our website against malicious automated submissions and spam.</li>
            </ul>

            <h2>4. Information Sharing &amp; Disclosure</h2>
            <p>
              <strong>We never sell, rent, trade, or distribute your personal information to third-party marketing companies.</strong>
            </p>
            <p>
              Your contact details are accessed solely by our showroom staff and trusted email infrastructure providers (e.g., SMTP servers) solely for the purpose of communicating with you. We may disclose information only if required by applicable Indian law or lawful governmental request.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security safeguards to protect your personal details during transmission and storage. Server-side route handlers enforce input sanitization, anti-spam honeypot protections, and encryption via TLS during email transmission.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              Our website integrates direct external links to WhatsApp and Google Maps. When you click these external links, you interact directly with those services under their respective privacy policies.
            </p>

            <h2>7. Your Privacy Rights</h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or ask us to delete your contact records from our inquiry database. To exercise these rights, please contact our showroom directly.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              For any questions regarding this Privacy Policy or our data handling practices, please connect with us:
            </p>
            <ul>
              <li><strong>Showroom Address:</strong> {siteConfig.displayAddress}</li>
              <li><strong>Telephone:</strong> <a href={`tel:${siteConfig.rawPhone}`} style={{ color: 'var(--color-accent)' }}>{siteConfig.phoneDisplay}</a></li>
              <li><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-accent)' }}>{siteConfig.email}</a></li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
