import { ShieldCheck, Ruler, Users, Layers } from 'lucide-react';
import '../styles/WhyChooseUs.css';

export default function WhyChooseUs() {
  const points = [
    {
      icon: <ShieldCheck size={26} />,
      title: 'Durable Materials & Joinery',
      desc: 'Selected solid woods, sturdy joint assemblies, and quality hardware constructed to maintain structural integrity through years of daily family use.',
    },
    {
      icon: <Ruler size={26} />,
      title: 'Considered Spatial Dimensions',
      desc: 'We assist you in verifying room measurements and walking clearances so your chosen sofa, bed, or dining set fits harmoniously without crowding your home.',
    },
    {
      icon: <Users size={26} />,
      title: 'In-Person Showroom Guidance',
      desc: 'Experience materials directly, evaluate seating comfort, inspect fabric textures, and discuss your furniture product requirements with dedicated showroom staff.',
    },
    {
      icon: <Layers size={26} />,
      title: 'Cohesive Whole-Home Suites',
      desc: 'From bedrooms and living spaces to dining rooms and traditional pooja mandirs, discover complementary finishes that create a unified aesthetic.',
    },
  ];

  return (
    <section className="section-padding why-section" id="why-choose-us">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle light">Shopping Considerations</span>
          <h2 className="section-title light">Why Homeowners Choose S.S. Furniture</h2>
          <p className="section-desc light">
            Furniture is a foundational element of daily living. Here are practical factors that distinguish our showroom approach and customer assistance.
          </p>
        </div>

        <div className="why-grid">
          {points.map((pt, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-wrap">{pt.icon}</div>
              <h3 className="why-card-title">{pt.title}</h3>
              <p className="why-card-desc">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
