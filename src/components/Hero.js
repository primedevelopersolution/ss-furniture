'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/site';
import '../styles/Hero.css';

const slides = [
  {
    id: 1,
    tagline: 'Quality Home Furniture Products',
    title: 'Thoughtfully Handcrafted Furniture for Gracious Living',
    desc: 'Explore our signature showroom collections of solid wood beds, plush sofa sets, storage cabinets, bespoke dining tables, and artisanal home mandirs tailored to enhance every corner of your home.',
    image: '/images/sections/hero-living-room.jpg',
    alt: 'S.S. Furniture premium living room showcase featuring handcrafted sofa and centre table',
    ctaPrimary: { label: 'Explore Our Furniture', href: '/furniture' },
    ctaSecondary: { label: 'Contact Showroom', href: '/contact', isPhone: false },
    highlights: ['Solid Hardwoods', 'Tailored Dimensions', 'Personal Consultation'],
  },
  {
    id: 2,
    tagline: 'Restful Sanctuaries & Solid Wood Craft',
    title: 'Solid Teak & Hardwood Bedroom Collections',
    desc: 'Engineered with reinforced solid salwood and teak internal frames, hand-waxed smooth timber finishes, and optional hydraulic box storage designed for lasting relaxation and everyday utility.',
    image: '/images/products/bed-wooden-luxury.jpg',
    alt: 'Solid wood bed with coordinated bedside tables in warm modern bedroom',
    ctaPrimary: { label: 'View Bedroom Furniture', href: '/furniture?category=beds' },
    ctaSecondary: { label: 'Call Showroom', href: `tel:${siteConfig.rawPhone}`, isPhone: true },
    highlights: ['Hydraulic Storage Option', 'Seasoned Solid Hardwood', 'Custom Mattress Sizing'],
  },
  {
    id: 3,
    tagline: 'Family Gatherings & Sacred Spaces',
    title: 'Bespoke Dining Suites & Handcrafted Home Mandirs',
    desc: 'Bring warmth to every family meal with natural-grain solid timber dining sets, and create a serene devotional sanctuary with our carved wooden pooja mandirs featuring brass bells and diya storage.',
    image: '/images/products/dining-table-6-seater.jpg',
    alt: 'Solid wood 6-seater dining table with coordinated chairs in a contemporary home',
    ctaPrimary: { label: 'Explore Dining & Mandirs', href: '/furniture?category=dining' },
    ctaSecondary: {
      label: 'WhatsApp Showroom',
      href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello S.S. Furniture, I am interested in exploring your dining tables and home mandir designs.'
      )}`,
      isWhatsApp: true,
    },
    highlights: ['Heat-Resistant Sealant', 'Auspicious Carvings', 'Ergonomic Seating'],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="hero-section"
      aria-roledescription="carousel"
      aria-label="S.S. Furniture Featured Collections"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slider Backgrounds */}
      <div className="hero-slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === current ? 'active' : ''}`}
            aria-hidden={index !== current}
          >
            <div className="hero-slide-bg-wrap">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-bg-img"
              />
              <div className="hero-overlay" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Text Content */}
      <div className="container">
        <div className="hero-content" key={current}>
          <span className="hero-tagline">{slides[current].tagline}</span>

          <h1 className="hero-title">{slides[current].title}</h1>

          <p className="hero-desc">{slides[current].desc}</p>

          <div className="hero-buttons">
            <Link href={slides[current].ctaPrimary.href} className="btn btn-accent">
              <span>{slides[current].ctaPrimary.label}</span>
              <ArrowRight size={16} />
            </Link>

            {slides[current].ctaSecondary.isPhone ? (
              <a href={slides[current].ctaSecondary.href} className="btn btn-outline-light">
                <Phone size={16} />
                <span>{slides[current].ctaSecondary.label}</span>
              </a>
            ) : slides[current].ctaSecondary.isWhatsApp ? (
              <a
                href={slides[current].ctaSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={16} />
                <span>{slides[current].ctaSecondary.label}</span>
              </a>
            ) : (
              <Link href={slides[current].ctaSecondary.href} className="btn btn-outline-light">
                <Phone size={16} />
                <span>{slides[current].ctaSecondary.label}</span>
              </Link>
            )}
          </div>

          <div className="hero-highlights">
            {slides[current].highlights.map((item, idx) => (
              <div key={idx} className="hero-highlight-item">
                <CheckCircle2 size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Controls: Arrows & Dots */}
      <div className="hero-controls" aria-label="Hero slider controls">
        <button
          type="button"
          className="hero-arrow"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slide select">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}`}
              className={`hero-dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-arrow"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
