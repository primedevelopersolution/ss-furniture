'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, X, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/site';
import { furnitureCategories } from '../data/furniture';
import '../styles/Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navCategories = furnitureCategories.filter((c) => c.id !== 'all');

  return (
    <>
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="main-header-inner">
            {/* Logo */}
            <Link href="/" className="logo-link" aria-label="S.S. Furniture Home">
              <img
                src="/images/ss-furniture-logo.svg"
                alt="S.S. Furniture Logo"
                className="header-logo-img"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="nav-menu" aria-label="Main Navigation">
              <div className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                >
                  About Us
                </Link>
              </div>

              {/* Furniture with Dropdown */}
              <div className="nav-item">
                <Link
                  href="/furniture"
                  className={`nav-link ${pathname.startsWith('/furniture') ? 'active' : ''}`}
                >
                  <span>Furniture</span>
                  <ChevronDown size={14} />
                </Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link href="/furniture">
                      <span>All Furniture</span>
                      <ArrowRight size={13} />
                    </Link>
                  </li>
                  {navCategories.map((cat) => (
                    <li key={cat.id} className="dropdown-item">
                      <Link href={`/furniture?category=${cat.id}`}>
                        <span>{cat.name}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nav-item">
                <Link
                  href="/gallery"
                  className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`}
                >
                  Gallery
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact Us
                </Link>
              </div>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <Link href="/contact" className="btn btn-primary header-cta-btn">
                <span>Enquire Now</span>
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open Navigation Menu"
                aria-expanded={mobileOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-drawer-header">
          <img
            src="/images/ss-furniture-logo-light.svg"
            alt="S.S. Furniture"
            className="mobile-logo-img"
          />
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav-list">
          <Link
            href="/"
            className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/furniture"
            className={`mobile-nav-link ${pathname.startsWith('/furniture') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Furniture Collection
          </Link>

          <div className="mobile-sub-list">
            {navCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/furniture?category=${cat.id}`}
                className="mobile-sub-link"
                onClick={() => setMobileOpen(false)}
              >
                • {cat.name}
              </Link>
            ))}
          </div>

          <Link
            href="/gallery"
            className={`mobile-nav-link ${pathname === '/gallery' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Inspiration Gallery
          </Link>
          <Link
            href="/contact"
            className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact &amp; Location
          </Link>
        </nav>

        <div className="mobile-drawer-footer">
          <div style={{ fontSize: '0.8125rem', color: '#B8B0A6' }}>
            Showroom Direct Line:
          </div>
          <a
            href={`tel:${siteConfig.rawPhone}`}
            className="mobile-drawer-phone"
          >
            {siteConfig.phoneDisplay}
          </a>
          <div style={{ fontSize: '0.8125rem', color: '#B8B0A6', marginTop: '8px' }}>
            Email Showroom:
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            style={{ color: '#FFFFFF', fontSize: '0.9rem', display: 'block', marginTop: '2px' }}
          >
            {siteConfig.email}
          </a>
          <div style={{ marginTop: '14px' }}>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                'Hello S.S. Furniture, I would like to enquire about your furniture.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '10px' }}
            >
              <MessageSquare size={16} />
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
