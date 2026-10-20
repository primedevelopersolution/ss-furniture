import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/site';
import '../styles/TopHeader.css';

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="container">
        <div className="top-header-inner">
          <div className="top-header-contacts">
            <div className="top-header-item">
              <Phone size={14} />
              <span>Call Us:</span>
              <a href={`tel:${siteConfig.rawPhone}`}>{siteConfig.phoneDisplay}</a>
            </div>
            <div className="top-header-item">
              <Mail size={14} />
              <span>Email:</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
            <div className="top-header-item">
              <MessageSquare size={14} />
              <span>WhatsApp:</span>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello S.S. Furniture, I am interested in your furniture collections. Could you please share more details?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with Showroom
              </a>
            </div>
          </div>
          <div className="top-header-right">
            <span className="top-header-badge">
              <MapPin size={12} />
              Naigaon East, Maharashtra 401208
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
