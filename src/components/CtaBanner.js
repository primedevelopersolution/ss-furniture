import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../data/site';
import '../styles/CtaBanner.css';

export default function CtaBanner({
  title = 'Have Questions or Specific Room Dimensions?',
  desc = 'Our showroom team in Naigaon East is ready to guide you on wood finishes, seating firmness, and custom dimension options for your home.',
}) {
  return (
    <section className="cta-banner" aria-label="Showroom Consultation Banner">
      <div className="container">
        <div className="cta-banner-inner">
          <div className="cta-banner-content">
            <span className="section-subtitle light" style={{ marginBottom: '6px' }}>
              Personal Furniture Consultation
            </span>
            <h2 className="cta-banner-title">{title}</h2>
            <p className="cta-banner-desc">{desc}</p>
          </div>

          <div className="cta-banner-actions">
            <Link href="/contact" className="btn btn-accent">
              <span>Send Enquiry</span>
              <ArrowRight size={15} />
            </Link>

            <a href={`tel:${siteConfig.rawPhone}`} className="btn btn-outline-light">
              <Phone size={15} />
              <span>Call Showroom</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
