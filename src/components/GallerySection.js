'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { galleryItems } from '../data/furniture';
import '../styles/GallerySection.css';

const filterCategories = [
  { id: 'all', label: 'All Inspirations' },
  { id: 'sofas', label: 'Living Rooms' },
  { id: 'beds', label: 'Bedrooms' },
  { id: 'dining', label: 'Dining' },
  { id: 'mandirs', label: 'Pooja Units' },
  { id: 'cabinets', label: 'Storage & Cabinets' },
  { id: 'craftsmanship', label: 'Craft Details' },
];

export default function GallerySection({ isStandalonePage = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <section className="section-padding gallery-section" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Furniture Inspiration</span>
          <h2 className="section-title">Design Ideas for Every Living Space</h2>
          <p className="section-desc">
            Explore curated room arrangements and woodworking craftsmanship. Use these inspiration examples to visualize proportions, material finishes, and room flow for your home.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="gallery-filters" role="tablist" aria-label="Gallery category filters">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat.id}
              className={`gallery-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              aria-label={`View enlarged image: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="gallery-thumb-img"
              />
              <div className="gallery-overlay">
                <span className="gallery-item-tag">{item.categoryLabel}</span>
                <h3 className="gallery-item-title">{item.title}</h3>
                <p className="gallery-item-caption">{item.caption}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent-gold)', fontSize: '0.75rem', marginTop: '6px' }}>
                  <ZoomIn size={14} />
                  <span>Click to enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>

            <div className="lightbox-img-wrap">
              <Image
                src={selectedItem.image}
                alt={selectedItem.alt}
                fill
                sizes="900px"
                className="lightbox-img"
                priority
              />
            </div>

            <div className="lightbox-info">
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                {selectedItem.categoryLabel}
              </div>
              <h3 className="lightbox-title">{selectedItem.title}</h3>
              <p className="lightbox-caption">{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
