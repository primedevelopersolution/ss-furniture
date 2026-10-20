import Link from 'next/link';
import { siteConfig } from '../../data/site';
import JsonLd from '../../components/JsonLd';
import '../../styles/LegalPage.css';

export const metadata = {
  title: 'Terms & Conditions | S.S. Furniture',
  description:
    'Review the official terms and conditions governing website use, showroom inquiries, orders, and delivery with S.S. Furniture.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        ]}
      />

      <section className="page-hero page-hero-legal">
        <div className="container">
          <span className="section-subtitle light">Business Terms</span>
          <h1 className="page-hero-title">Terms &amp; Conditions</h1>
          <p className="page-hero-subtitle">
            The terms governing website browsing, showroom consultations, quotations, and furniture orders with S.S. Furniture.
          </p>
        </div>
      </section>

      <section className="legal-page-content">
        <div className="container">
          <article className="legal-article">
            <div className="legal-meta-box">
              <strong>Entity:</strong> {siteConfig.name} • <strong>Showroom:</strong> {siteConfig.displayAddress} • <strong>Jurisdiction:</strong> Maharashtra, India
            </div>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing the <strong>S.S. Furniture</strong> website or submitting an enquiry through our digital forms, you acknowledge and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please discontinue using this website.
            </p>

            <h2>2. Nature of Website &amp; No Online Checkout</h2>
            <p>
              This website functions as an online showroom and enquiry catalogue. S.S. Furniture does not process payments, maintain customer shopping carts, or conduct e-commerce transactions directly through this website. All commercial purchase agreements, invoices, specifications, and payment arrangements are finalized directly with our showroom.
            </p>

            <h2>3. Product Quotations &amp; Order Placement</h2>
            <ul>
              <li><strong>Quotations:</strong> Quotations issued in response to website enquiries remain valid for the period specified on the formal quote (typically 15 to 30 days), subject to raw timber and material market fluctuations.</li>
              <li><strong>Custom Specifications:</strong> For bespoke furniture orders (such as custom bed dimensions, modular wardrobes, or customized sofa configurations), final technical drawings, wood stain samples, and fabric swatch selections must be reviewed and approved by the customer prior to fabrication.</li>
              <li><strong>Advance Deposits:</strong> Custom furniture manufacturing commences upon receipt of the agreed showroom advance deposit.</li>
            </ul>

            <h2>4. Delivery &amp; Inspection</h2>
            <ul>
              <li><strong>Delivery Schedules:</strong> Estimated delivery timelines are shared during order placement. S.S. Furniture endeavors to adhere strictly to mutually agreed schedules.</li>
              <li><strong>Customer Inspection:</strong> Customers are requested to inspect furniture pieces upon delivery or installation for finish quality, structural stability, and adherence to specified dimensions.</li>
              <li><strong>Site Clearances:</strong> It is the customer&apos;s responsibility to ensure adequate hallway, elevator, and staircase clearances for larger items such as king beds, 6-seater dining tables, and sectional sofas.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All original branding, logos, trademarks, website text, visual compositions, and layout elements on this website are the intellectual property of S.S. Furniture. Unauthorized copying, scraping, or commercial republication is strictly prohibited.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              S.S. Furniture shall not be liable for indirect, incidental, or consequential damages resulting from the use of this website, temporary site unavailability, or technical communication delays.
            </p>

            <h2>7. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with orders or showroom transactions shall be subject to the exclusive jurisdiction of the competent courts in Palghar / Thane District, Maharashtra.
            </p>

            <h2>8. Showroom Contact Details</h2>
            <p>
              For questions concerning our terms, orders, or policies, please reach out to:
            </p>
            <ul>
              <li><strong>Business Name:</strong> {siteConfig.name}</li>
              <li><strong>Showroom Address:</strong> {siteConfig.displayAddress}</li>
              <li><strong>Phone / WhatsApp:</strong> <a href={`tel:${siteConfig.rawPhone}`} style={{ color: 'var(--color-accent)' }}>{siteConfig.phoneDisplay}</a></li>
              <li><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-accent)' }}>{siteConfig.email}</a></li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
