import Hero from '../components/Hero';
import FurnitureCategory from '../components/FurnitureCategory';
import FeaturedFurniture from '../components/FeaturedFurniture';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import GallerySection from '../components/GallerySection';
import ContactForm from '../components/ContactForm';
import MapSection from '../components/MapSection';
import CtaBanner from '../components/CtaBanner';

export const metadata = {
  title: 'S.S. Furniture | Beds, Sofas, Dining Tables & Home Furniture',
  description:
    'S.S. Furniture showroom offers handcrafted wooden beds, sofa sets, storage cabinets, pooja mandirs, and dining tables at Shop no. 5, Aai Chandika Hills, Waki Pada, Naigaon East, Maharashtra. Visit our showroom or enquire online.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FurnitureCategory />
      <FeaturedFurniture />
      <AboutSection />
      <WhyChooseUs />
      <GallerySection />
      <ContactForm />
      <MapSection />
      <CtaBanner />
    </>
  );
}
