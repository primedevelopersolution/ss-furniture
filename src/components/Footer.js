import Link from 'next/link';
import { Phone, MessageSquare, MapPin, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/site';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link href="/" aria-label="S.S. Furniture Home">
              <img
                src="/images/ss-furniture-logo-light.svg"
                alt="S.S. Furniture Logo"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-bio">
              <strong>S.S. Furniture</strong> is a dedicated furniture showroom offering thoughtfully designed home furniture, including solid wood beds, plush sofa sets, storage cabinets, handcrafted home mandirs, and dining suites tailored for modern living spaces.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-gold)', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Dedicated Quality Craftsmanship</span>
            </div>
          </div>

          {/* Furniture Categories */}
          <div>
            <h3 className="footer-title">Our Collections</h3>
            <ul className="footer-links-list">
              {siteConfig.footerCategories.map((cat, i) => (
                <li key={i} className="footer-link-item">
                  <Link href={cat.href}>
                    <ArrowRight size={13} />
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link href="/">
                  <ArrowRight size={13} />
                  <span>Home</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/about">
                  <ArrowRight size={13} />
                  <span>About S.S. Furniture</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/furniture">
                  <ArrowRight size={13} />
                  <span>Furniture Catalogue</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/gallery">
                  <ArrowRight size={13} />
                  <span>Inspiration Gallery</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/contact">
                  <ArrowRight size={13} />
                  <span>Contact Showroom</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/disclaimer">
                  <ArrowRight size={13} />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/privacy-policy">
                  <ArrowRight size={13} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/terms-and-conditions">
                  <ArrowRight size={13} />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h3 className="footer-title">Showroom Contact</h3>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Phone size={16} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9E9488' }}>Direct Telephone</div>
                  <a href={`tel:${siteConfig.rawPhone}`}>{siteConfig.phoneDisplay}</a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Mail size={16} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9E9488' }}>Email Address</div>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
              </div>

              <div className="footer-contact-row">
                <MessageSquare size={16} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9E9488' }}>WhatsApp Inquiries</div>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      'Hello S.S. Furniture, I am interested in exploring your furniture collections.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <MapPin size={16} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9E9488' }}>Showroom Address</div>
                  <div style={{ color: '#E8E2DA', lineHeight: 1.5 }}>
                    {siteConfig.displayAddress}
                  </div>
                  <a
                    href={siteConfig.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.82rem', textDecoration: 'underline', marginTop: '4px', display: 'inline-block' }}
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="footer-bottom">
          <div>
            © {currentYear} <strong>{siteConfig.name}</strong>. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link href="/disclaimer">Disclaimer</Link>
            <span>•</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
          <div>
            Home Furniture Products Showroom • Naigaon East, Maharashtra
          </div>
        </div>
      </div>
    </footer>
  );
}
