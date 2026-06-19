import { Link } from 'react-router-dom';
import { MessageCircle, Globe, ExternalLink, Heart } from 'lucide-react';
import { getWhatsAppUrl } from './WhatsAppButton';

export default function Footer() {
  return (
    <footer className="bg-fx-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
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
            <p className="text-white/70 text-sm leading-relaxed mb-4 font-body">
              Productos naturales de alta calidad basados en la biodiversidad 
              amazónica y andina. Mejorá tu bienestar de forma natural.
            </p>
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
                href="https://instagram.com/fuxionoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500/30 flex items-center justify-center text-white/70 hover:text-pink-400 transition-all"
                aria-label="Instagram"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://fuxion.com/uy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-fx-green/30 flex items-center justify-center text-white/70 hover:text-fx-green transition-all"
                aria-label="Sitio oficial FuXion"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/productos', label: 'Productos' },
                // { to: '/recetas', label: 'Recetas & Guía' },
                { to: '/faq', label: 'Preguntas Frecuentes' },
                { to: '/nosotros', label: 'Sobre Nosotros' },
                { to: '/terminos', label: 'Términos y Condiciones' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 text-sm hover:text-fx-green transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
              <li>
                <a
                  href="https://fuxion.com/uy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-fx-green transition-colors font-body"
                >
                  <ExternalLink size={16} />
                  fuxion.com/uy
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/60 leading-relaxed font-body">
                🇺🇾 Distribuidor autorizado FuXion en Uruguay. 
                Envíos a todo el país.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs flex items-center gap-1 font-body">
            Hecho con <Heart size={12} className="text-red-400" /> en Uruguay
          </p>
        </div>
      </div>
    </footer>
  );
}
