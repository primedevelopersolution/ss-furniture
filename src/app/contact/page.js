import ContactForm from '../../components/ContactForm';
import MapSection from '../../components/MapSection';
import JsonLd from '../../components/JsonLd';

export const metadata = {
  title: 'Contact Us | S.S. Furniture Showroom & Enquiries',
  description:
    'Contact S.S. Furniture at Shop no. 5, Aai Chandika Hills, Waki Pada, near Sargam Residency Bapane, Naigaon East, Maharashtra 401208. Call +91 9823599547, email contact@ssfurniture.in, or connect via WhatsApp.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
      />

      <section className="page-hero page-hero-contact">
        <div className="container">
          <span className="section-subtitle light">Get In Touch</span>
          <h1 className="page-hero-title">Contact S.S. Furniture</h1>
          <p className="page-hero-subtitle">
            Visit our showroom at Shop no. 5, Aai Chandika Hills, Waki Pada, Bapane, Naigaon East. Reach out to our team directly via telephone, email, WhatsApp, or through the enquiry form below.
          </p>
        </div>
      </section>

      <ContactForm />
      <MapSection />
    </>
  );
}
