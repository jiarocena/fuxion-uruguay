import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import type { Product } from '../types';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
            Catálogo Completo
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-fx-dark mt-2 mb-4">
            Nuestros <span className="gradient-text">Productos</span>
          </h1>
          <p className="text-fx-gray font-body max-w-2xl mx-auto">
            Todos nuestros productos están elaborados con ingredientes naturales 
            de la más alta calidad. Hacé clic en cualquier producto para ver más detalles.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onViewDetail={setSelectedProduct}
            />
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-fx-gray-lighter text-center shadow-sm">
          <p className="text-fx-gray font-body text-sm">
            💡 <strong className="text-fx-dark">Tip:</strong> Combiná varios productos 
            para un programa nutricional integral. Podés agregar todos al carrito y finalizar 
            la compra en un solo paso.
          </p>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
