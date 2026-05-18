import { useState } from 'react';
import { ShoppingCart, Check, Sparkles, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { trackEvent, trackMetaPixel } from '../lib/analytics';

interface ProductCardProps {
  product: Product;
  index?: number;
  onViewDetail?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onViewDetail }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

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
    <div
      className={`product-card flex flex-col animate-fade-in-up opacity-0 stagger-${index + 1}`}
    >
      {/* Image — clickable to open detail */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-fx-gray-bg to-white p-6 pb-4 cursor-pointer group"
        onClick={() => onViewDetail?.(product)}
      >
        {/* Category badge */}
        {product.category && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-heading font-semibold rounded-full bg-fx-dark text-white z-10">
            {product.category}
          </span>
        )}

        {/* View detail hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-[5] flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-fx-dark text-xs font-heading font-semibold shadow-lg">
            <Eye size={12} />
            Ver detalle
          </span>
        </div>

        <div className="flex items-center justify-center h-48 sm:h-56">
          {!imageLoaded && (
            <div className="absolute inset-0 m-6 rounded-xl bg-fx-gray-bg animate-pulse" />
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-3">
        <h3
          className="font-heading font-bold text-lg text-fx-dark mb-1 cursor-pointer hover:text-fx-green transition-colors"
          onClick={() => onViewDetail?.(product)}
        >
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-fx-green text-xs font-heading font-semibold mb-1 uppercase tracking-wide">
            {product.tagline}
          </p>
        )}
        <p className="text-fx-gray text-sm leading-relaxed mb-3 line-clamp-2 font-body">
          {product.description}
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits.slice(0, 2).map((benefit, i) => (
            <span key={i} className="benefit-tag">
              <Sparkles size={10} />
              {benefit}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-2xl font-heading font-bold text-fx-green">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-fx-gray-light text-xs block font-body">UYU</span>
            {product.presentation && (
              <span className="text-fx-gray-light text-[10px] font-body">{product.presentation}</span>
            )}
          </div>
          <button
            id={`add-to-cart-${product.slug}`}
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${
              isAdded
                ? 'bg-fx-green text-white shadow-lg shadow-fx-green/30'
                : 'btn-primary'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
