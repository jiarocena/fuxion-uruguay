import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, BarChart3, Link as LinkIcon, ShoppingCart, Eye, MessageCircle, ArrowRightLeft } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

const ADMIN_PASSWORD = 'fuxion2026';

interface PowerLinkEntry {
  id: string;
  product_ids: string[];
  power_link_url: string;
  name: string;
}

interface AnalyticsSummary {
  views: number;
  addToCarts: number;
  checkouts: number;
  whatsappSent: number;
  directLinks: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [powerLinks, setPowerLinks] = useState<PowerLinkEntry[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkName, setNewLinkName] = useState('');

  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    views: 0, addToCarts: 0, checkouts: 0, whatsappSent: 0, directLinks: 0,
  });

  const [activeTab, setActiveTab] = useState<'links' | 'analytics'>('links');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  useEffect(() => {
    if (isAuthenticated && isSupabaseConfigured) {
      loadPowerLinks();
      loadAnalytics();
    }
  }, [isAuthenticated]);

  const loadPowerLinks = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('power_links').select('*').order('created_at', { ascending: false });
    if (data) setPowerLinks(data as PowerLinkEntry[]);
  };

  const loadAnalytics = async () => {
    if (!supabase) return;
    const { data: analyticsData } = await supabase.from('analytics').select('event_type');
    const { data: conversionData } = await supabase.from('conversions').select('conversion_type');

    if (analyticsData) {
      setAnalytics({
        views: analyticsData.filter((e: { event_type: string }) => e.event_type === 'view').length,
        addToCarts: analyticsData.filter((e: { event_type: string }) => e.event_type === 'add_to_cart').length,
        checkouts: analyticsData.filter((e: { event_type: string }) => e.event_type === 'checkout').length,
        whatsappSent: conversionData?.filter((c: { conversion_type: string }) => c.conversion_type === 'whatsapp').length || 0,
        directLinks: conversionData?.filter((c: { conversion_type: string }) => c.conversion_type === 'direct_link').length || 0,
      });
    }
  };

  const handleAddPowerLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || selectedProducts.length === 0 || !newLinkUrl) return;
    const sortedIds = [...selectedProducts].sort();
    await supabase.from('power_links').insert({
      product_ids: sortedIds,
      power_link_url: newLinkUrl,
      name: newLinkName || `Combo de ${sortedIds.length} productos`,
    });
    setSelectedProducts([]);
    setNewLinkUrl('');
    setNewLinkName('');
    loadPowerLinks();
  };

  const handleDeletePowerLink = async (id: string) => {
    if (!supabase) return;
    await supabase.from('power_links').delete().eq('id', id);
    loadPowerLinks();
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-fx-gray-bg">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-8 bg-white border border-fx-gray-lighter shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-fx-green/10 flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-fx-green" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-fx-dark">
                Panel de Administración
              </h1>
              <p className="text-fx-gray text-sm mt-1 font-body">
                Ingresá tu contraseña para acceder
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter text-fx-charcoal font-body placeholder:text-fx-gray-light focus:outline-none focus:border-fx-green focus:ring-2 focus:ring-fx-green/20 transition-all mb-4"
              />
              {error && (
                <p className="text-red-500 text-sm mb-4 font-body">{error}</p>
              )}
              <button type="submit" className="w-full btn-primary py-3">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-fx-dark mb-2">
            Panel de <span className="gradient-text">Administración</span>
          </h1>
          <p className="text-fx-gray font-body">
            Gestioná Power Links y consultá analytics de la tienda.
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-body">
            ⚠️ Supabase no está configurado. Configurá las variables de entorno 
            VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para habilitar la gestión de datos.
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('links')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm uppercase tracking-wide transition-all ${
              activeTab === 'links'
                ? 'bg-fx-green text-white shadow-md shadow-fx-green/20'
                : 'bg-white text-fx-gray hover:text-fx-dark border border-fx-gray-lighter'
            }`}
          >
            <LinkIcon size={16} />
            Power Links
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm uppercase tracking-wide transition-all ${
              activeTab === 'analytics'
                ? 'bg-fx-green text-white shadow-md shadow-fx-green/20'
                : 'bg-white text-fx-gray hover:text-fx-dark border border-fx-gray-lighter'
            }`}
          >
            <BarChart3 size={16} />
            Analytics
          </button>
        </div>

        {/* Power Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-4 flex items-center gap-2">
                <Plus size={18} className="text-fx-green" />
                Agregar Power Link
              </h2>
              <form onSubmit={handleAddPowerLink} className="space-y-4">
                <div>
                  <label className="text-fx-gray text-sm font-body block mb-2">
                    Seleccioná los productos del combo:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRODUCTS.map((product) => (
                      <label
                        key={product.id}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                          selectedProducts.includes(product.id)
                            ? 'bg-fx-green/5 border-fx-green/30 text-fx-dark'
                            : 'bg-fx-gray-bg border-fx-gray-lighter text-fx-gray hover:border-fx-green/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          className="accent-[#8CC63F] w-4 h-4"
                        />
                        <span className="text-sm font-body">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <input
                  type="url"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  placeholder="URL del Power Link"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter text-fx-charcoal font-body placeholder:text-fx-gray-light focus:outline-none focus:border-fx-green focus:ring-2 focus:ring-fx-green/20 transition-all"
                />
                <input
                  type="text"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="Nombre del combo (opcional)"
                  className="w-full px-4 py-3 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter text-fx-charcoal font-body placeholder:text-fx-gray-light focus:outline-none focus:border-fx-green focus:ring-2 focus:ring-fx-green/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={selectedProducts.length === 0 || !newLinkUrl || !isSupabaseConfigured}
                  className="btn-primary py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                  Agregar Power Link
                </button>
              </form>
            </div>

            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-4 flex items-center gap-2">
                <LinkIcon size={18} className="text-fx-green" />
                Power Links Existentes
              </h2>
              {powerLinks.length === 0 ? (
                <p className="text-fx-gray-light text-sm font-body text-center py-8">
                  No hay Power Links configurados. Los productos individuales 
                  usan su Power Link directo.
                </p>
              ) : (
                <div className="space-y-3">
                  {powerLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-semibold text-fx-dark text-sm truncate">
                          {link.name}
                        </p>
                        <p className="text-fx-gray-light text-xs truncate font-body">
                          {link.power_link_url}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {link.product_ids.map((pid) => {
                            const product = PRODUCTS.find((p) => p.id === pid);
                            return (
                              <span key={pid} className="text-xs px-2 py-0.5 rounded-full bg-fx-green/10 text-fx-green-darker">
                                {product?.name || pid}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePowerLink(link.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-fx-gray-light hover:text-red-500 transition-all flex-shrink-0"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Visitas', value: analytics.views, icon: Eye, color: 'fx-green' },
                { label: 'Al Carrito', value: analytics.addToCarts, icon: ShoppingCart, color: 'fx-green' },
                { label: 'Power Link', value: analytics.directLinks, icon: ArrowRightLeft, color: 'fx-dark' },
                { label: 'WhatsApp', value: analytics.whatsappSent, icon: MessageCircle, color: 'fx-dark' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl p-5 bg-white border border-fx-gray-lighter shadow-sm text-center">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon size={18} className={`text-${stat.color}`} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-fx-dark">{stat.value}</p>
                  <p className="text-fx-gray-light text-xs font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h3 className="font-heading font-bold text-fx-dark mb-4">Tasa de Conversión</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-4 rounded-full bg-fx-gray-bg overflow-hidden">
                    <div
                      className="h-full gradient-brand rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          analytics.checkouts > 0
                            ? Math.round(((analytics.directLinks + analytics.whatsappSent) / analytics.checkouts) * 100)
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <span className="font-heading font-bold text-fx-green text-lg">
                  {analytics.checkouts > 0
                    ? `${Math.round(((analytics.directLinks + analytics.whatsappSent) / analytics.checkouts) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
