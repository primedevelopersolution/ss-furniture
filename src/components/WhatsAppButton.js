import { MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/site';

export default function WhatsAppButton() {
  const defaultMessage = encodeURIComponent(
    'Hello S.S. Furniture, I am interested in your furniture collections. Could you please share more details?'
  );

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with S.S. Furniture on WhatsApp"
      title="Chat with S.S. Furniture on WhatsApp"
    >
      <MessageSquare />
    </a>
  );
}
