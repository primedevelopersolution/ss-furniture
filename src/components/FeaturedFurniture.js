import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, MessageSquare, PhoneCall } from 'lucide-react';
import { furnitureProducts } from '../data/furniture';
import { siteConfig } from '../data/site';
import '../styles/FeaturedFurniture.css';

export default function FeaturedFurniture() {
  const featured = furnitureProducts.filter((p) => p.featured);

  return (
    <section className="section-padding featured-section" id="featured">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Showroom Highlights</span>
          <h2 className="section-title">Signature Furniture Pieces</h2>
          <p className="section-desc">
            Carefully curated showcases illustrating our woodworking precision, high-density upholstery, and versatile home layouts.
          </p>
        </div>

        <div className="featured-grid">
          {featured.map((item) => {
            const whatsappText = encodeURIComponent(
              `Hello S.S. Furniture, I am interested in your ${item.name} (${item.categoryName}). Could you please share details on dimensions and showroom availability?`
            );

            return (
              <div key={item.id} className="product-card">
                <div className="product-img-wrap">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="product-img"
                  />
                  <span className="product-badge">{item.categoryName}</span>
                </div>

                <div className="product-body">
                  <span className="product-category-tag">{item.categoryName}</span>
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-desc">{item.description}</p>

                  <ul className="product-features-list">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="product-feature-item">
                        <Check size={14} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="product-card-footer">
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/contact?product=${encodeURIComponent(item.name)}&category=${encodeURIComponent(item.category)}`}
                      className="btn btn-primary"
                      title="Send Enquiry Form"
                    >
                      <span>Enquire</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link href="/furniture" className="btn btn-outline" style={{ padding: '14px 32px' }}>
            <span>View Full Furniture Catalogue</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
