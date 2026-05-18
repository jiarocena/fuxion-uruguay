import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  // On mobile, wa.me works great and opens the app directly.
  // On desktop, api.whatsapp.com/send opens WhatsApp Web reliably.
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
  if (isMobile) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
}

export { getWhatsAppUrl };

export default function WhatsAppButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = getWhatsAppUrl('Hola, tengo una consulta sobre los productos FuXion 🌿');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="whatsapp-float animate-pulse-glow"
      id="whatsapp-button"
      aria-label="Consultar por WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
