'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { furnitureCategories, furnitureProducts } from '../../data/furniture';
import { siteConfig } from '../../data/site';
import '../../styles/CataloguePage.css';
import '../../styles/FeaturedFurniture.css';

export default function FurnitureClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      router.push('/furniture', { scroll: false });
    } else {
      router.push(`/furniture?category=${catId}`, { scroll: false });
    }
  };

  const filteredProducts =
    activeCategory === 'all'
      ? furnitureProducts
      : furnitureProducts.filter((p) => p.category === activeCategory);

  const currentCategoryObj =
    furnitureCategories.find((c) => c.id === activeCategory) || furnitureCategories[0];

  return (
    <>
      <section className="page-hero page-hero-furniture">
        <div className="container">
          <span className="section-subtitle light">Showroom Catalogue</span>
          <h1 className="page-hero-title">Home Furniture Products Catalogue</h1>
          <p className="page-hero-subtitle">
            Browse our curated furniture designs across beds, sofas, cabinets, home mandirs, and dining suites. Each piece can be tailored in wood finish, size, and upholstery to suit your home.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="container">
          {/* Category Horizontal Navigation */}
          <div className="catalogue-category-nav" role="tablist" aria-label="Furniture category filter">
            {furnitureCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`catalogue-nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleSelectCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Category Information Banner */}
          {activeCategory !== 'all' && (
            <div className="category-info-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                <Sparkles size={14} />
                <span>{currentCategoryObj.tagline}</span>
              </div>
              <h2 className="category-info-title">{currentCategoryObj.name}</h2>
              <p className="category-info-desc">{currentCategoryObj.description}</p>
            </div>
          )}

          {/* Product Grid */}
          <div className="catalogue-grid">
            {filteredProducts.map((item) => {
              const whatsappText = encodeURIComponent(
                `Hello S.S. Furniture, I am interested in your ${item.name} (${item.categoryName}). Could you please share more details regarding pricing, dimensions, and custom finishes?`
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

          {/* Custom Dimension Assistance Notice */}
          <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Need Custom Dimensions or Specific Wood Finishes?
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 1.5rem', fontSize: '0.92rem', lineHeight: '1.6' }}>
              We understand that every room layout is unique. S.S. Furniture provides custom dimension adjustments and fabric selections. Connect with our showroom team to discuss your floor plan.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-accent">
                <span>Request Custom Consultation</span>
                <ArrowRight size={14} />
              </Link>
              <a href={`tel:${siteConfig.rawPhone}`} className="btn btn-outline">
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
