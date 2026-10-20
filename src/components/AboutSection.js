import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import '../styles/AboutSection.css';

export default function AboutSection({ showReadMore = true }) {
  return (
    <section className="section-padding about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Collage Images */}
          <div className="about-images-collage">
            <div className="about-img-main-wrap">
              <Image
                src="/images/sections/about-craftsmanship.jpg"
                alt="Artisanal solid teak woodworking details and joint precision at S.S. Furniture"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="about-img"
              />
            </div>
            <div className="about-img-secondary-wrap">
              <Image
                src="/images/sections/contact-showroom-interior.jpg"
                alt="Contemporary home living room sofa and seating furniture"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                className="about-img"
              />
            </div>

            <div className="about-badge-card">
              <div className="about-badge-title">Genuine Craft</div>
              <p className="about-badge-subtitle">
                Solid timber structures, balanced joinery, and durable finishes.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="section-subtitle">About S.S. Furniture</span>
            <h2 className="section-title">
              Crafting Furniture That Brings Warmth, Comfort &amp; Character to Your Home
            </h2>
            <p className="section-desc" style={{ textAlign: 'justify' }}>
              At <strong>S.S. Furniture</strong>, we believe that home furniture should be both an enduring functional investment and an expression of gracious living. Our showroom presents a broad selection of carefully designed furniture pieces—from robust solid wood beds and spacious family sofas to architectural display cabinets, handcrafted home mandirs, and elegant dining arrangements.
            </p>
            <p className="section-desc" style={{ textAlign: 'justify', marginTop: '1rem' }}>
              Every piece in our catalogue is chosen with careful attention to material seasoning, structural stability, and everyday ergonomics. Whether you are furnishing a new apartment or revitalizing an existing room, our showroom team is here to assist with dimensions, material advice, and configuration ideas.
            </p>

            <div className="about-features-list">
              <div className="about-feature-item">
                <CheckCircle2 size={18} />
                <span>Seasoned Hardwood Frames</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 size={18} />
                <span>Custom Sizing Available</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 size={18} />
                <span>High-Resilience Upholstery</span>
              </div>
              <div className="about-feature-item">
                <CheckCircle2 size={18} />
                <span>Direct Showroom Assistance</span>
              </div>
            </div>

            {showReadMore && (
              <div style={{ marginTop: '2rem' }}>
                <Link href="/about" className="btn btn-primary">
                  <span>Learn More About Us</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
