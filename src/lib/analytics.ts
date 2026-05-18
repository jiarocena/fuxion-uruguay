import { supabase, isSupabaseConfigured } from './supabase';
import type { CartItem } from '../types';

// Generate or retrieve session ID
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('fuxion_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('fuxion_session_id', sessionId);
  }
  return sessionId;
}

// Track analytics events
export async function trackEvent(
  eventType: string,
  data: {
    productId?: string;
    cartItems?: CartItem[];
  } = {}
) {
  // Console log for development
  console.log(`[Analytics] ${eventType}`, data);

  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.from('analytics').insert({
      event_type: eventType,
      product_id: data.productId || null,
      cart_items: data.cartItems
        ? data.cartItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          }))
        : null,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

// Track conversions
export async function trackConversion(
  conversionType: 'direct_link' | 'whatsapp',
  cartItems: CartItem[],
  powerLinkUrl?: string
) {
  console.log(`[Conversion] ${conversionType}`, { cartItems, powerLinkUrl });

  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.from('conversions').insert({
      cart_items: cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      power_link_used: powerLinkUrl || null,
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Conversion tracking error:', error);
  }
}

// Find matching power link for cart items
export async function findPowerLink(
  productIds: string[]
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    // Fallback: if only one product, use its power link
    return null;
  }

  try {
    const sortedIds = [...productIds].sort();
    const { data } = await supabase
      .from('power_links')
      .select('*')
      .contains('product_ids', sortedIds);

    if (data && data.length > 0) {
      // Find exact match (same length)
      const exactMatch = data.find(
        (link: { product_ids: string[] }) =>
          link.product_ids.length === sortedIds.length &&
          [...link.product_ids].sort().join(',') === sortedIds.join(',')
      );
      return exactMatch?.power_link_url || null;
    }
    return null;
  } catch (error) {
    console.error('Power link lookup error:', error);
    return null;
  }
}

// Meta Pixel integration
export function trackMetaPixel(eventName: string, params?: Record<string, unknown>) {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || typeof window === 'undefined') return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbq = (window as any).fbq;
  if (fbq) {
    fbq('track', eventName, params);
  }
}
