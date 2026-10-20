import GallerySection from '../../components/GallerySection';
import CtaBanner from '../../components/CtaBanner';
import JsonLd from '../../components/JsonLd';

export const metadata = {
  title: 'Inspiration Gallery | Living, Bedroom, Dining & Mandir Designs',
  description:
    'Browse our furniture inspiration gallery featuring contemporary living rooms, solid wood beds, traditional pooja mandirs, and dining suites from S.S. Furniture.',
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Inspiration Gallery', path: '/gallery' },
        ]}
      />

      <section className="page-hero page-hero-gallery">
        <div className="container">
          <span className="section-subtitle light">Design Inspirations</span>
          <h1 className="page-hero-title">Home Furniture Inspiration Gallery</h1>
          <p className="page-hero-subtitle">
            Visual ideas illustrating living room arrangements, master bedroom suites, sacred pooja corners, and solid wood craftsmanship for modern homes.
          </p>
        </div>
      </section>

      <GallerySection isStandalonePage={true} />

      <CtaBanner
        title="Inspired by a Piece in Our Gallery?"
        desc="Let our team know which style caught your eye. We can share details on dimensions, timber options, and showroom availability."
      />
    </>
  );
}
