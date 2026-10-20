import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bed, Sofa, Utensils, Archive, Sun, Home, CheckCircle } from 'lucide-react';
import AboutSection from '../../components/AboutSection';
import WhyChooseUs from '../../components/WhyChooseUs';
import CtaBanner from '../../components/CtaBanner';
import JsonLd from '../../components/JsonLd';
import '../../styles/AboutPage.css';

export const metadata = {
  title: 'About Us | S.S. Furniture Products Showroom & Wood Craftsmanship',
  description:
    'Learn about S.S. Furniture, our showroom in Naigaon East, and our dedication to handcrafted solid wood beds, sofas, cabinets, mandirs, and dining furniture products.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const roomRoles = [
    {
      icon: <Sofa size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'The Living Room',
      desc: 'The central gathering space where family and guests unwind. We offer solid wood frame L-shaped sectionals, tufted couches, and walnut centre tables that balance seating capacity with everyday comfort.',
    },
    {
      icon: <Bed size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'The Bedroom Sanctuary',
      desc: 'A private retreat dedicated to rest and rejuvenation. Our king and queen wooden beds feature solid hardwood framework, posture support, and integrated hydraulic storage systems.',
    },
    {
      icon: <Utensils size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'The Dining Space',
      desc: 'Where shared meals and lasting conversations unfold. Our 4-seater and 6-seater dining sets feature solid timber table tops finished with durable heat- and stain-resistant sealants.',
    },
    {
      icon: <Sun size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'The Home Pooja Room',
      desc: 'A sacred personal sanctuary for morning prayers and festivals. Our handcrafted home mandirs incorporate auspicious traditional carvings, brass accents, diya trays, and quiet illumination.',
    },
    {
      icon: <Archive size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'Storage & Organization',
      desc: 'Crockery units, display cabinets, and wardrobes engineered to eliminate clutter. Designed with soft-close mechanisms, dust-sealed glass panels, and adaptable shelving.',
    },
    {
      icon: <Home size={24} style={{ color: 'var(--color-accent)' }} />,
      room: 'Dressing & Accent Furniture',
      desc: 'Vanity consoles, dressing mirrors with drawers, shoe racks, and foyer accent benches crafted to provide functional elegance in your home.',
    },
  ];

  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      {/* Page Header */}
      <section className="page-hero page-hero-about">
        <div className="container">
          <span className="section-subtitle light">Our Story &amp; Approach</span>
          <h1 className="page-hero-title">Dedicated to the Art of Fine Home Furniture Products</h1>
          <p className="page-hero-subtitle">
            At S.S. Furniture, we help homeowners furnish welcoming, comfortable homes with furniture products built from seasoned woods, durable textiles, and dependable joinery.
          </p>
        </div>
      </section>

      {/* Core About Section */}
      <AboutSection showReadMore={false} />

      {/* The Role of Furniture in Modern Homes */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Thoughtful Spatial Design</span>
            <h2 className="section-title">Furniture Designed for Every Room in Your Home</h2>
            <p className="section-desc">
              Every room has a distinct rhythm and purpose. Here is how our curated furniture collections serve the practical and aesthetic needs of contemporary Indian homes.
            </p>
          </div>

          <div className="room-grid">
            {roomRoles.map((item, idx) => (
              <div key={idx} className="room-card">
                <div className="room-card-title">
                  {item.icon}
                  <span>{item.room}</span>
                </div>
                <p className="room-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Woodworking & Material Values */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>
              Materials &amp; Integrity
            </span>
            <h2 className="section-title text-center" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Our Approach to Quality &amp; Transparency
            </h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              <p>
                When choosing furniture, homeowners deserve honest information regarding the materials behind the polish. At S.S. Furniture, we focus on durable internal structures, utilizing seasoned solid timbers like teak, sal, and quality calibrated plywood that resist warping under tropical humidity.
              </p>
              <p>
                We do not believe in mass-manufactured flimsiness. For upholstery, we select high-resilience foams that retain their bounce and supportive ergonomics over years of daily relaxation. Our hardware fittings—from telescopic drawer runners to soft-closing door hinges—are tested for smooth, quiet operation.
              </p>
              <p>
                When you visit our showroom or reach out with your requirements, our priority is to understand your spatial needs, suggest appropriate dimensions, and ensure you invest in pieces that serve your household faithfully.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/furniture" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                <span>Browse Our Furniture Catalogue</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose S.S. Furniture */}
      <WhyChooseUs />

      {/* CTA Banner */}
      <CtaBanner
        title="Visit S.S. Furniture or Connect with Us Online"
        desc="Plan your visit to our showroom in Naigaon East (Bapane), or discuss your room requirements directly with our team."
      />
    </>
  );
}
