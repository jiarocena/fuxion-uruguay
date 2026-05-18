import { useState, useEffect } from 'react';
import { X, ShoppingCart, Check, Sparkles, Package, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { trackEvent, trackMetaPixel } from '../lib/analytics';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    setIsAdded(false);
    setActiveImage(0);
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const allImages = [product.imageUrl, ...(product.galleryImages || [])];

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    trackEvent('add_to_cart', { productId: product.id });
    trackMetaPixel('AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'UYU',
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full sm:w-[90vw] sm:max-w-2xl max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-fx-gray-lighter flex items-center justify-center text-fx-gray hover:text-fx-dark hover:bg-white transition-all shadow-lg"
        >
          <X size={18} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Image section */}
          <div className="relative bg-gradient-to-b from-fx-gray-bg to-white p-6 sm:p-8 pb-4">
            {/* Category badge */}
            {product.category && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-heading font-semibold rounded-full bg-fx-dark text-white z-10">
                {product.category}
              </span>
            )}

            {/* Main image */}
            <div className="flex items-center justify-center h-56 sm:h-72 relative">
              <img
                src={allImages[activeImage]}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-500"
              />

              {/* Image navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-fx-gray-lighter flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-fx-gray-lighter flex items-center justify-center shadow-md hover:bg-white transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Image dots */}
            {allImages.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeImage ? 'bg-fx-green w-5' : 'bg-fx-gray-light/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 pb-6">
            {/* Tagline */}
            {product.tagline && (
              <p className="text-fx-green font-heading font-bold text-xs uppercase tracking-wider mb-1">
                {product.tagline}
              </p>
            )}

            {/* Name & Price */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-fx-dark">
                {product.name}
              </h2>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-heading font-bold text-fx-green">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-fx-gray-light text-xs block font-body">UYU</span>
              </div>
            </div>

            {/* Presentation */}
            {product.presentation && (
              <div className="flex items-center gap-2 mb-4">
                <Package size={14} className="text-fx-gray-light" />
                <span className="text-fx-gray text-sm font-body">{product.presentation}</span>
              </div>
            )}

            {/* Short description */}
            <p className="text-fx-gray text-sm font-body leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Extended description */}
            {product.longDescription && (
              <p className="text-fx-gray text-sm font-body leading-relaxed mb-4 p-4 bg-fx-gray-bg rounded-xl border border-fx-gray-lighter">
                {product.longDescription}
              </p>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical size={14} className="text-fx-green" />
                  <span className="font-heading font-bold text-fx-dark text-xs uppercase tracking-wider">
                    Ingredientes Activos
                  </span>
                </div>
                <p className="text-fx-green-darker text-sm font-body leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="mb-5">
              <h3 className="font-heading font-bold text-fx-dark text-sm mb-3 uppercase tracking-wider">
                Beneficios
              </h3>
              <div className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-fx-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={10} className="text-fx-green" />
                    </div>
                    <span className="text-fx-gray font-body">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer with Add to Cart */}
        <div className="border-t border-fx-gray-lighter bg-white px-6 sm:px-8 py-4">
          <button
            id={`detail-add-to-cart-${product.slug}`}
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full font-heading font-bold text-base transition-all duration-300 ${
              isAdded
                ? 'bg-fx-green text-white shadow-lg shadow-fx-green/30'
                : 'btn-primary'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={20} />
                ¡Agregado al carrito!
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Agregar al carrito — ${product.price.toLocaleString()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
