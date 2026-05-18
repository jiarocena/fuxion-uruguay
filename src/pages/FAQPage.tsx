import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import { getWhatsAppUrl } from '../components/WhatsAppButton';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
            Centro de Ayuda
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-fx-dark mt-2 mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h1>
          <p className="text-fx-gray font-body max-w-xl mx-auto">
            Encontrá respuestas a las preguntas más comunes sobre nuestros 
            productos, envíos y formas de pago.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'bg-white border-fx-green/30 shadow-lg shadow-fx-green/5'
                  : 'bg-white border-fx-gray-lighter hover:border-fx-green/20 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center gap-4 p-5 text-left"
                id={`faq-${index}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index
                      ? 'bg-fx-green/10 text-fx-green'
                      : 'bg-fx-gray-bg text-fx-gray-light'
                  }`}
                >
                  <HelpCircle size={18} />
                </div>
                <span className="flex-1 font-heading font-semibold text-fx-dark text-sm sm:text-base">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={18} className="text-fx-green flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-fx-gray-light flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 pl-[4.25rem] animate-fade-in">
                  <p className="text-fx-gray text-sm font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-white border border-fx-gray-lighter shadow-sm">
          <h3 className="font-heading font-bold text-fx-dark text-lg mb-2">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-fx-gray text-sm mb-6 font-body">
            Contactanos por WhatsApp y te ayudamos con cualquier consulta.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.open(getWhatsAppUrl('Hola, tengo una consulta sobre los productos FuXion'), '_blank', 'noopener,noreferrer'); }}
            className="btn-green py-3 px-6"
          >
            💬 Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
