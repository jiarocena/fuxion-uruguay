export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  longDescription?: string;
  ingredients?: string;
  tagline?: string;
  benefits: string[];
  powerLink: string;
  imageUrl: string;
  galleryImages?: string[];
  category?: string;
  presentation?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PowerLink {
  id: string;
  product_ids: string[];
  power_link_url: string;
  name?: string;
}

export interface AnalyticsEvent {
  event_type: 'view' | 'add_to_cart' | 'checkout' | 'whatsapp_sent';
  product_id?: string;
  cart_items?: CartItem[];
  session_id: string;
  user_agent: string;
}

export interface Conversion {
  cart_items: CartItem[];
  power_link_used?: string;
  conversion_type: 'direct_link' | 'whatsapp';
}
