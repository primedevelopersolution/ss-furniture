import { MapPin, Navigation } from 'lucide-react';
import { siteConfig } from '../data/site';
import '../styles/MapSection.css';

export default function MapSection() {
  return (
    <section className="section-padding map-section" id="location">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Showroom Location</span>
          <h2 className="section-title">Visit S.S. Furniture</h2>
          <p className="section-desc">
            Experience our furniture craftsmanship in person. Plan your visit to our showroom located in Naigaon East, Maharashtra.
          </p>
        </div>

        <div className="map-card-wrapper">
          <div className="map-header-bar">
            <div className="map-location-info">
              <div className="map-location-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="map-header-title">{siteConfig.name} Showroom</h3>
                <p className="map-header-subtitle">
                  {siteConfig.displayAddress}
                </p>
              </div>
            </div>

            <a
              href={siteConfig.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{ padding: '9px 18px', fontSize: '0.85rem' }}
            >
              <Navigation size={14} />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="map-iframe-container">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              title="S.S. Furniture location on Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="map-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
