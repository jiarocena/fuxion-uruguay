import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { findPowerLink, trackConversion, trackEvent, trackMetaPixel } from '../lib/analytics';
import { getWhatsAppUrl } from './WhatsAppButton';

export default function CartDrawer() {
  const { items, isOpen, totalPrice, closeCart, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    trackEvent('checkout', { cartItems: items });
    trackMetaPixel('InitiateCheckout', {
      content_ids: items.map((item) => item.product.id),
      num_items: items.reduce((s, i) => s + i.quantity, 0),
      value: totalPrice,
      currency: 'UYU',
    });

    try {
      // Check if all items are single products with quantity 1
      const isSingleProduct = items.length === 1 && items[0].quantity === 1;

      if (isSingleProduct) {
        const item = items[0];
        await trackConversion('direct_link', items, item.product.powerLink);
        trackMetaPixel('Purchase', {
          content_ids: [item.product.id],
          value: totalPrice,
          currency: 'UYU',
        });
        window.open(item.product.powerLink, '_blank');
        clearCart();
        setIsCheckingOut(false);
        return;
      }

      // Try to find a matching power link for the combination
      const productIds = items.map((item) => item.product.id);
      const powerLinkUrl = await findPowerLink(productIds);

      if (powerLinkUrl) {
        await trackConversion('direct_link', items, powerLinkUrl);
        trackMetaPixel('Purchase', {
          content_ids: productIds,
          value: totalPrice,
          currency: 'UYU',
        });
        window.open(powerLinkUrl, '_blank');
        clearCart();
      } else {
        // No power link found -> WhatsApp
        const message = generateWhatsAppMessage();
        await trackConversion('whatsapp', items);
        window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const message = generateWhatsAppMessage();
      window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    }

    setIsCheckingOut(false);
  };

  const generateWhatsAppMessage = () => {
    let message = '🛒 *Pedido de FuXion Uruguay*\n\n';

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name} - $${(
        item.product.price * item.quantity
      ).toLocaleString()}\n`;
    });

    message += `\n*Total: $${totalPrice.toLocaleString()} UYU*\n\n`;
    message += '¡Hola! Me gustaría realizar este pedido. ¿Está disponible?';

    return message;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay animate-fade-in" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-fx-gray-lighter z-50 animate-slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fx-gray-lighter">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fx-green flex items-center justify-center">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-fx-dark text-lg">
                Tu Carrito
              </h2>
              <p className="text-fx-gray-light text-xs font-body">
                {items.length} {items.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-fx-gray-bg transition-all text-fx-gray hover:text-fx-charcoal"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-fx-gray-bg flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-fx-gray-light" />
              </div>
              <p className="font-heading font-semibold text-fx-gray mb-1">
                Carrito vacío
              </p>
              <p className="text-fx-gray-light text-sm font-body">
                Agregá productos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter animate-scale-in"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-fx-gray-lighter">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-fx-dark truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-fx-green font-heading font-bold text-sm mt-0.5">
                      ${(item.product.price * item.quantity).toLocaleString()} UYU
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Reducir cantidad"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-heading font-semibold text-sm text-fx-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-2 rounded-lg hover:bg-red-50 text-fx-gray-light hover:text-red-500 transition-all"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-fx-gray-lighter bg-fx-gray-bg/50">
            <button
              onClick={clearCart}
              className="w-full mb-3 py-2 text-fx-gray-light text-xs hover:text-red-500 transition-colors font-body"
            >
              Vaciar carrito
            </button>

            <div className="flex items-center justify-between mb-4">
              <span className="text-fx-gray font-body">Subtotal</span>
              <span className="text-2xl font-heading font-bold text-fx-green">
                ${totalPrice.toLocaleString()} UYU
              </span>
            </div>

            <button
              id="checkout-button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full btn-green py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Finalizar Compra
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="text-center text-fx-gray-light text-xs mt-3 font-body">
              Serás redirigido a la tienda FuXion o WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}
