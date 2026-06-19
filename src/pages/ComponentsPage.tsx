import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, ShoppingCart, FlaskConical, Leaf, BookOpen, ArrowRight } from 'lucide-react';
import { COMPONENTS_DATA } from '../data/components';
import type { ComponentData, ComponentSlide } from '../data/components';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

function EvidenceStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

/* ======= Individual Slide Renderers ======= */
function CoverSlide({ slide, comp }: { slide: ComponentSlide; comp: ComponentData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6" style={{ backgroundColor: comp.colorLight }}>
      {/* Ingredient photo */}
      <div className="w-36 h-36 rounded-2xl overflow-hidden mb-4 shadow-lg border-2 border-white">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
      </div>
      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-2" style={{ color: comp.colorHex }}>
        {slide.title}
      </h2>
      <p className="font-heading font-semibold text-lg mb-4" style={{ color: comp.colorHex, opacity: 0.7 }}>
        {slide.subtitle}
      </p>
      {slide.content && (
        <p className="text-sm font-body text-gray-600 whitespace-pre-line mb-4">{slide.content}</p>
      )}
      {slide.highlight && (
        <div className="rounded-xl px-6 py-3 text-white font-heading font-bold text-sm" style={{ backgroundColor: comp.colorHex }}>
          <div className="text-xs opacity-80">{slide.highlight.text}</div>
          <div className="text-base">{slide.highlight.sub}</div>
        </div>
      )}
    </div>
  );
}

function WhatSlide({ slide, comp }: { slide: ComponentSlide; comp: ComponentData }) {
  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto" style={{ backgroundColor: comp.colorLight }}>
      <h2 className="font-heading font-extrabold text-2xl mb-5" style={{ color: comp.colorHex }}>
        {slide.title}
      </h2>
      <div className="rounded-2xl bg-white/80 border border-gray-200 p-5 mb-5 shadow-sm">
        <p className="text-sm font-body text-gray-700 leading-relaxed">
          {slide.content}
        </p>
      </div>
      {slide.highlight && (
        <div className="rounded-xl p-4 text-white" style={{ backgroundColor: comp.colorHex }}>
          <p className="font-heading font-bold text-sm">{slide.highlight.text}</p>
          <p className="text-xs opacity-80 mt-1">{slide.highlight.sub}</p>
        </div>
      )}
    </div>
  );
}

function BenefitsSlide({ slide, comp }: { slide: ComponentSlide; comp: ComponentData }) {
  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto" style={{ backgroundColor: comp.colorLight }}>
      <div className="text-xs font-heading font-semibold mb-1" style={{ color: comp.colorHex, opacity: 0.6 }}>
        {/* slide number shown by parent */}
      </div>
      <h2 className="font-heading font-extrabold text-2xl mb-5" style={{ color: comp.colorHex }}>
        {slide.title}
      </h2>
      <div className="space-y-3 mb-5">
        {slide.items?.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-white/80 border border-gray-200 p-4 shadow-sm">
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <p className="font-heading font-bold text-sm text-gray-800">{item.title}</p>
              <p className="text-xs font-body text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {slide.content && (
        <p className="text-xs font-body text-gray-500 text-center mt-auto">{slide.content}</p>
      )}
    </div>
  );
}

function EvidenceSlide({ slide, comp }: { slide: ComponentSlide; comp: ComponentData }) {
  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto" style={{ backgroundColor: comp.colorLight }}>
      <h2 className="font-heading font-extrabold text-2xl mb-5" style={{ color: comp.colorHex }}>
        {slide.title}
      </h2>
      <p className="text-sm font-body text-gray-700 leading-relaxed mb-5">
        {slide.content}
      </p>
      {slide.study && (
        <div className="rounded-2xl bg-white border-2 p-5 shadow-sm" style={{ borderColor: comp.colorHex + '40' }}>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={16} style={{ color: comp.colorHex }} />
            <span className="font-heading font-bold text-xs uppercase tracking-wider" style={{ color: comp.colorHex }}>
              Respaldo científico
            </span>
          </div>
          <blockquote className="text-sm font-body text-gray-700 italic leading-relaxed mb-3 pl-3 border-l-2" style={{ borderColor: comp.colorHex }}>
            "{slide.study.quote}"
          </blockquote>
          <p className="text-[11px] font-body text-gray-500">
            📎 {slide.study.source}
          </p>
        </div>
      )}
    </div>
  );
}

function ProductSlide({ slide, comp, onAddToCart }: { slide: ComponentSlide; comp: ComponentData; onAddToCart: (productId: string) => void }) {
  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto" style={{ backgroundColor: comp.colorLight }}>
      <h2 className="font-heading font-extrabold text-xl mb-5 text-center" style={{ color: comp.colorHex }}>
        {slide.title}
      </h2>
      <div className="space-y-4">
        {slide.products?.map((prod, i) => (
          <div key={i} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm text-center">
            <div className="w-32 h-32 mx-auto mb-3 flex items-center justify-center">
              <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="font-heading font-bold text-lg text-gray-800">{prod.name}</h3>
            <p className="text-xs font-body text-gray-500 mb-3">{prod.desc}</p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl font-heading font-bold" style={{ color: comp.colorHex }}>
                ${prod.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-body">UYU</span>
            </div>
            <button
              onClick={() => {
                const productData = PRODUCTS.find(p => p.imageUrl === prod.image);
                if (productData) onAddToCart(productData.id);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-heading font-semibold transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: comp.colorHex }}
            >
              <ShoppingCart size={14} />
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======= Slide Viewer (Modal) ======= */
function SlideViewer({ comp, onClose, onAddToCart }: { comp: ComponentData; onClose: () => void; onAddToCart: (id: string) => void }) {
  const [current, setCurrent] = useState(0);
  const total = comp.slides.length;
  const slide = comp.slides[current];

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  const renderSlide = () => {
    switch (slide.type) {
      case 'cover': return <CoverSlide slide={slide} comp={comp} />;
      case 'what': return <WhatSlide slide={slide} comp={comp} />;
      case 'benefits': return <BenefitsSlide slide={slide} comp={comp} />;
      case 'evidence': return <EvidenceSlide slide={slide} comp={comp} />;
      case 'product': return <ProductSlide slide={slide} comp={comp} onAddToCart={onAddToCart} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative w-full sm:w-[420px] max-w-[95vw] h-[85vh] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl animate-slide-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all shadow-md"
        >
          <X size={16} />
        </button>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-4 pt-3">
          {comp.slides.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full flex-1 transition-all duration-300"
              style={{
                backgroundColor: i <= current ? comp.colorHex : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-300">
            {renderSlide()}
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/20 to-transparent z-20">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md disabled:opacity-30 transition-all hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-heading font-semibold text-white/90 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {current + 1}/{total}
          </span>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md disabled:opacity-30 transition-all hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Touch/click areas for mobile swipe */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer" onClick={prev} />
        <div className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer" onClick={next} />
      </div>
    </div>
  );
}

/* ======= Component Card ======= */
function ComponentCard({ comp, index, onOpen }: { comp: ComponentData; index: number; onOpen: () => void }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-pointer group transition-all duration-400 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up opacity-0 stagger-${(index % 5) + 1}`}
      onClick={onOpen}
      style={{ borderTop: `3px solid ${comp.colorHex}` }}
    >
      {/* Ingredient image */}
      <div className="h-36 overflow-hidden relative">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-2 right-2 text-2xl drop-shadow-lg">{comp.emoji}</span>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-base text-gray-800 group-hover:text-fx-green transition-colors mb-0.5">
          {comp.name}
        </h3>
        <p className="text-xs font-body text-gray-500 mb-3">{comp.tagline}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-heading font-semibold text-gray-400 uppercase">Evidencia:</span>
            <EvidenceStars level={comp.evidenceLevel} />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-body text-gray-400">
            <Leaf size={10} />
            {comp.origin}
          </div>
        </div>

        {/* Product pills */}
        <div className="flex flex-wrap gap-1.5">
          {comp.productIds.map((pid) => {
            const prod = PRODUCTS.find((p) => p.id === pid);
            return prod ? (
              <span key={pid} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold" style={{ backgroundColor: comp.colorLight, color: comp.colorHex }}>
                {prod.name}
              </span>
            ) : null;
          })}
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs font-heading font-semibold transition-colors" style={{ color: comp.colorHex }}>
          <BookOpen size={12} />
          Ver fichas completas
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

/* ======= Main Page ======= */
export default function ComponentsPage() {
  const [activeComp, setActiveComp] = useState<ComponentData | null>(null);
  const { addItem } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) addItem(product);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
            Ciencia & Naturaleza
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-fx-dark mt-2 mb-4">
            <span className="gradient-text">Componentes</span> Activos
          </h1>
          <p className="text-fx-gray font-body max-w-2xl mx-auto">
            Conocé a fondo cada ingrediente que hace únicos a los productos FuXion. 
            Origen, beneficios y respaldo científico en fichas interactivas.
          </p>
        </div>

        {/* Evidence legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs font-body text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400 fill-yellow-400" /> = Nivel de evidencia científica
          </span>
          <span>⭐⭐⭐⭐⭐ = Excelente</span>
          <span>⭐⭐ = Evidencia mixta</span>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {COMPONENTS_DATA.map((comp, i) => (
            <ComponentCard
              key={comp.id}
              comp={comp}
              index={i}
              onOpen={() => setActiveComp(comp)}
            />
          ))}
        </div>

        {/* Summary Table */}
        <div className="mt-12 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-lg text-fx-dark">📋 Resumen de Componentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-fx-gray-bg text-left">
                  <th className="px-4 py-3 font-heading font-semibold text-fx-dark text-xs uppercase tracking-wider">Componente</th>
                  <th className="px-4 py-3 font-heading font-semibold text-fx-dark text-xs uppercase tracking-wider">Evidencia</th>
                  <th className="px-4 py-3 font-heading font-semibold text-fx-dark text-xs uppercase tracking-wider">Producto FuXion</th>
                  <th className="px-4 py-3 font-heading font-semibold text-fx-dark text-xs uppercase tracking-wider">Para qué sirve</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Proteína de suero', stars: 5, product: 'BioPro+ Fit', use: 'Construcción muscular' },
                  { name: 'Psyllium', stars: 5, product: 'Prunex1', use: 'Tránsito intestinal' },
                  { name: 'Inulina', stars: 4, product: 'NoCarb-T, Prunex1', use: 'Control glucémico' },
                  { name: 'Catequinas', stars: 4, product: 'Thermo T3', use: 'Metabolismo (modesto)' },
                  { name: 'Cafeína', stars: 5, product: 'Vita Xtra T+, Thermo T3', use: 'Energía y alerta' },
                  { name: 'Cromo', stars: 3, product: 'NoCarb-T', use: 'Sensibilidad insulina' },
                  { name: 'Colostro', stars: 3, product: 'BioPro+ Fit', use: 'Inmunidad y recuperación' },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-body font-semibold text-gray-800">{row.name}</td>
                    <td className="px-4 py-3"><EvidenceStars level={row.stars} /></td>
                    <td className="px-4 py-3 font-body text-fx-green font-semibold text-xs">{row.product}</td>
                    <td className="px-4 py-3 font-body text-gray-600 text-xs">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide Viewer Modal */}
      {activeComp && (
        <SlideViewer
          comp={activeComp}
          onClose={() => setActiveComp(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
