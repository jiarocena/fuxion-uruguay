import { Link } from 'react-router-dom';
import { MessageCircle, Heart } from 'lucide-react';
import { getWhatsAppUrl } from './WhatsAppButton';

export default function Footer() {
  return (
    <footer className="bg-fx-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src="/images/maria-noel.png"
                alt="María Noel Acosta"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover:border-fx-green/60 transition-colors shadow-sm"
              />
              <div>
                <span className="font-heading font-bold text-sm text-white tracking-wide block leading-tight group-hover:text-fx-green transition-colors">
                  María Noel Acosta
                </span>
                <span className="text-[10px] text-fx-green block font-body font-bold tracking-widest uppercase">
                  Licenciada en nutrición
                </span>
              </div>
            </Link>
            <div className="flex gap-3">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.open(getWhatsAppUrl('Hola! Consulta desde la web FuXion Uruguay'), '_blank', 'noopener,noreferrer'); }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366]/30 flex items-center justify-center text-white/70 hover:text-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.instagram.com/pikyacosta1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500/30 flex items-center justify-center text-white/70 hover:text-pink-400 transition-all"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.open(getWhatsAppUrl('Hola! Consulta desde la web FuXion Uruguay'), '_blank', 'noopener,noreferrer'); }}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-[#25D366] transition-colors font-body"
                >
                  <MessageCircle size={16} />
                  +598 99 003 391
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/terminos"
            className="text-white/40 text-xs hover:text-fx-green transition-colors font-body"
          >
            Términos y Condiciones
          </Link>
          <p className="text-white/40 text-xs flex items-center gap-1 font-body">
            Hecho con <Heart size={12} className="text-red-400" /> en Uruguay
          </p>
        </div>
      </div>
    </footer>
  );
}
