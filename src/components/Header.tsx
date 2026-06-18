import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
    { to: '/componentes', label: 'Componentes' },
    { to: '/recetas', label: 'Recetas' },
    { to: '/faq', label: 'FAQ' },
    { to: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-black/5'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/maria-noel.png"
              alt="María Noel Acosta"
              className="w-10 h-10 rounded-full object-cover border-2 border-fx-green/30 group-hover:border-fx-green/60 transition-colors shadow-sm"
            />
            <div>
              <span className="font-heading font-bold text-sm text-fx-dark tracking-wide block leading-tight group-hover:text-fx-green transition-colors">
                María Noel Acosta
              </span>
              <span className="text-[10px] text-fx-green block font-body font-bold tracking-widest uppercase">
                Nutricionista
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full font-heading text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-fx-green bg-fx-green-bg'
                    : 'text-fx-charcoal hover:text-fx-green hover:bg-fx-green-bg'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              id="cart-button"
              onClick={toggleCart}
              className="relative p-2.5 rounded-full hover:bg-fx-gray-bg transition-all duration-200 group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart
                size={22}
                className="text-fx-charcoal group-hover:text-fx-green transition-colors"
              />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-fx-gray-bg transition-all"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? (
                <X size={22} className="text-fx-charcoal" />
              ) : (
                <Menu size={22} className="text-fx-charcoal" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-fx-gray-lighter animate-fade-in shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl font-heading text-sm font-semibold uppercase tracking-wide transition-all ${
                  location.pathname === link.to
                    ? 'text-fx-green bg-fx-green-bg'
                    : 'text-fx-charcoal hover:text-fx-green hover:bg-fx-green-bg'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
