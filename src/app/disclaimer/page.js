import Link from 'next/link';
import { siteConfig } from '../../data/site';
import JsonLd from '../../components/JsonLd';
import '../../styles/LegalPage.css';

export const metadata = {
  title: 'Website Disclaimer | S.S. Furniture',
  description:
    'Read the official website disclaimer for S.S. Furniture regarding product showcases, timber variations, specifications, and showroom inquiries.',
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Disclaimer', path: '/disclaimer' },
        ]}
      />

      <section className="page-hero page-hero-legal">
        <div className="container">
          <span className="section-subtitle light">Legal Notice</span>
          <h1 className="page-hero-title">Website Disclaimer</h1>
          <p className="page-hero-subtitle">
            Important information regarding product representations, natural material characteristics, custom dimensions, and showroom consultation.
          </p>
        </div>
      </section>

      <section className="legal-page-content">
        <div className="container">
          <article className="legal-article">
            <div className="legal-meta-box">
              <strong>Business:</strong> {siteConfig.name} • <strong>Showroom Location:</strong> {siteConfig.displayAddress} • <strong>Contact:</strong> {siteConfig.phoneDisplay} / {siteConfig.email}
            </div>

            <h2>1. General Information &amp; Catalogue Nature</h2>
            <p>
              The information, photographs, illustrations, and specifications provided on this website are published in good faith for general informational, aesthetic, and showcase purposes. <strong>S.S. Furniture</strong> operates as a brick-and-mortar furniture showroom and seller of quality home furniture products.
            </p>
            <p>
              Furniture pieces, room settings, and gallery illustrations displayed on this website serve as design examples and craftsmanship showcases. Display on the website does not guarantee that a particular piece is in immediate ready-to-deliver stock. Individual stock availability, timber choices, upholstery fabrics, and delivery timelines are confirmed upon direct enquiry or showroom consultation.
            </p>

            <h2>2. Natural Wood Characteristics &amp; Variations</h2>
            <p>
              Solid timber is a living, organic material. Solid wood furniture (including seasoned teak, salwood, and hardwood varieties) naturally exhibits distinct variations, including:
            </p>
            <ul>
              <li>Natural grain patterns, color nuances, and growth rings.</li>
              <li>Occasional knots, minor mineral streaks, and natural timber markings.</li>
              <li>Subtle shifts in wood hue over time with exposure to ambient room light and humidity.</li>
            </ul>
            <p>
              These inherent characteristics attest to the authenticity of solid timber and do not constitute manufacturing defects. Due to digital display calibrations, photography lighting, and monitor settings, actual furniture finishes and fabric textures may exhibit slight variations from screen renderings.
            </p>

            <h2>3. Dimensions &amp; Room Planning</h2>
            <p>
              Standard product dimensions stated across the catalogue are approximate guidelines. Customers are strongly advised to measure room doorways, stairwells, passage widths, and installation areas before finalizing orders. S.S. Furniture provides custom dimension adjustments upon request to ensure seamless room fitting.
            </p>

            <h2>4. Quotations &amp; Pricing</h2>
            <p>
              Furniture prices depend on the selected solid wood species, internal framing, upholstery grade, hydraulic mechanisms, and customized dimension requirements. Any estimated prices, verbal quotes, or preliminary figures are confirmed via formal quotation during showroom consultation.
            </p>

            <h2>5. External Links &amp; Map Services</h2>
            <p>
              This website provides links to third-party services such as Google Maps and WhatsApp for visitor convenience. S.S. Furniture does not govern the terms, privacy practices, or operational availability of these third-party external platforms.
            </p>

            <h2>6. Contact for Clarifications</h2>
            <p>
              If you have any questions regarding this disclaimer, material specifications, or showroom policies, please contact us:
            </p>
            <ul>
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
