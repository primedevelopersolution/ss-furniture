import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { furnitureCategories } from '../data/furniture';
import '../styles/FurnitureCategory.css';

export default function FurnitureCategory() {
  const displayCategories = furnitureCategories.filter((c) => c.id !== 'all');

  return (
    <section className="section-padding category-section" id="categories">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Furniture Collections</span>
          <h2 className="section-title">Designed for Comfort, Crafted for Life</h2>
          <p className="section-desc">
            Explore our curated collections across living, bedroom, dining, and devotional spaces. Each piece is constructed with seasoned woods, balanced proportions, and careful detailing.
          </p>
        </div>

        <div className="category-grid">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/furniture?category=${cat.id}`}
              className="category-card"
            >
              <div className="category-img-wrap">
                <Image
                  src={cat.image}
                  alt={`${cat.name} showroom collection at S.S. Furniture`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="category-img"
                />
              </div>

              <div className="category-card-body">
                <span className="category-tagline">{cat.tagline}</span>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
                <span className="category-link-text">
                  <span>Explore {cat.name}</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
