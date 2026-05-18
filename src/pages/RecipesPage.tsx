import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Utensils, Leaf, Droplets, Apple, Heart, Flame, Moon, Coffee, Sun, Sunset } from 'lucide-react';
import { PROGRAM_INFO, BUENOS_HABITOS, ESQUEMA_DIARIO, OPCIONES_PROTEINA, OPCIONES_PROTEINA_VEGETAL, VEGETALES_ILIMITADOS, OPCIONES_CARBOHIDRATOS, OPCIONES_GRASA, OPCIONES_FRUTAS, ADEREZOS, RIESGO_CARDIOVASCULAR } from '../data/guide';
import { PLAN_SEMANAL } from '../data/mealplan';
import type { DayPlan } from '../data/mealplan';
import { getWhatsAppUrl } from '../components/WhatsAppButton';

type TabId = 'programa' | 'esquema' | 'plan' | 'alimentos' | 'habitos';

const mealIcons: Record<string, typeof Coffee> = {
  'AL DESPERTAR': Droplets,
  'DESAYUNO': Coffee,
  'MEDIA MAÑANA': Sun,
  'ALMUERZO': Utensils,
  'MEDIA TARDE': Sunset,
  'CENA': Moon,
};
const mealColors = ['bg-blue-400','bg-green-500','bg-orange-500','bg-purple-500','bg-yellow-500','bg-indigo-500'];

export default function RecipesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('programa');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedFood, setExpandedFood] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; emoji: string }[] = [
    { id: 'programa', label: 'Programa', emoji: '📋' },
    { id: 'esquema', label: 'Esquema Diario', emoji: '⏰' },
    { id: 'plan', label: 'Plan 7 Días', emoji: '🍽️' },
    { id: 'alimentos', label: 'Alimentos', emoji: '🥗' },
    { id: 'habitos', label: 'Buenos Hábitos', emoji: '💚' },
  ];

  const renderDayPlan = (day: DayPlan) => {
    const isExpanded = expandedDay === day.day;
    const meals = [
      { label: 'DESAYUNO', icon: Coffee, color: 'bg-green-500', product: 'Vita Xtra T+', title: day.desayuno.title, content: `**Jugo energizante:** ${day.desayuno.juice}\n\n${day.desayuno.meal}` },
      { label: 'MEDIA MAÑANA', icon: Sun, color: 'bg-orange-500', product: 'Thermo T3 + BioPro+ Fit', title: day.mediaMañana.title, content: day.mediaMañana.meal },
      { label: 'ALMUERZO', icon: Utensils, color: 'bg-purple-500', product: 'BioPro+ Fit', title: day.almuerzo.title, content: day.almuerzo.meal },
      { label: 'MEDIA TARDE', icon: Sunset, color: 'bg-yellow-500', product: 'NoCarb-T', title: day.mediaTarde.title, content: day.mediaTarde.meal },
      { label: 'CENA', icon: Moon, color: 'bg-indigo-500', product: 'Prunex1 + BioPro+ Fit', title: day.cena.title, content: day.cena.meal },
    ];

    return (
      <div key={day.day} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-white border-fx-green/30 shadow-lg' : 'bg-white border-fx-gray-lighter shadow-sm hover:border-fx-green/20'}`}>
        <button onClick={() => setExpandedDay(isExpanded ? null : day.day)} className="w-full flex items-center gap-4 p-5 text-left">
          <div className={`w-12 h-12 rounded-xl ${day.type === 'A' ? 'bg-fx-green' : 'bg-fx-dark'} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-heading font-bold text-lg">{day.day}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-fx-dark">Día {day.day} <span className={`text-xs px-2 py-0.5 rounded-full ${day.type === 'A' ? 'bg-fx-green/10 text-fx-green-darker' : 'bg-fx-dark/10 text-fx-dark'}`}>Tipo {day.type}</span></h3>
            <p className="text-fx-gray text-sm font-body">{day.desayuno.title} → {day.mediaMañana.title} → {day.mediaTarde.title}</p>
          </div>
          {isExpanded ? <ChevronUp size={18} className="text-fx-green" /> : <ChevronDown size={18} className="text-fx-gray-light" />}
        </button>
        {isExpanded && (
          <div className="px-5 pb-5 space-y-3 animate-fade-in">
            {/* Al despertar */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-xs font-heading font-bold text-blue-600 uppercase">Al despertar</span>
              </div>
              <p className="text-sm text-blue-800 font-body">1 vaso de agua tibia c/zumo de 1 limón</p>
            </div>
            {meals.map((meal, i) => {
              const Icon = meal.icon;
              return (
                <div key={i} className="p-4 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${meal.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-heading font-bold text-fx-dark uppercase">{meal.label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-fx-green/10 text-fx-green-darker font-heading font-semibold">{meal.product}</span>
                      </div>
                      <h4 className="font-heading font-bold text-fx-dark mt-1">{meal.title}</h4>
                    </div>
                  </div>
                  <p className="text-fx-gray text-sm font-body leading-relaxed whitespace-pre-line ml-11">{meal.content}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const FoodSection = ({ title, icon, items, type }: { title: string; icon: typeof Leaf; items: { name: string; amount: string }[]; type: string }) => {
    const isExpanded = expandedFood === type;
    const Icon = icon;
    return (
      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-white border-fx-green/30 shadow-lg' : 'bg-white border-fx-gray-lighter shadow-sm'}`}>
        <button onClick={() => setExpandedFood(isExpanded ? null : type)} className="w-full flex items-center gap-3 p-5 text-left">
          <div className="w-10 h-10 rounded-xl bg-fx-green/10 flex items-center justify-center"><Icon size={18} className="text-fx-green" /></div>
          <span className="flex-1 font-heading font-bold text-fx-dark">{title}</span>
          <span className="text-xs text-fx-gray-light font-body">{items.length} opciones</span>
          {isExpanded ? <ChevronUp size={16} className="text-fx-green" /> : <ChevronDown size={16} className="text-fx-gray-light" />}
        </button>
        {isExpanded && (
          <div className="px-5 pb-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-start gap-2 p-2.5 rounded-lg bg-fx-gray-bg text-sm">
                  <span className="text-fx-dark font-body font-medium">{item.name}</span>
                  <span className="text-fx-green-darker font-body text-xs text-right flex-shrink-0">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
            {PROGRAM_INFO.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-fx-dark mt-2 mb-4">
            Programa <span className="gradient-text">5/14</span> Keto
          </h1>
          <p className="text-fx-gray font-body max-w-2xl mx-auto text-sm leading-relaxed">
            {PROGRAM_INFO.description}
          </p>
        </div>

        {/* Pack contents */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {PROGRAM_INFO.packContents.map((item, i) => (
            <div key={i} className="rounded-xl p-3 bg-white border border-fx-gray-lighter shadow-sm text-center">
              <p className="text-xs font-body text-fx-dark font-semibold">{item}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-fx-green text-white shadow-md shadow-fx-green/20' : 'bg-white text-fx-gray hover:text-fx-dark border border-fx-gray-lighter'
              }`}>
              <span>{tab.emoji}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* ===== PROGRAMA ===== */}
        {activeTab === 'programa' && (
          <div className="space-y-6">
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/guide/meal-plan.png" alt="Plan de comidas keto con productos FuXion" className="w-full h-48 sm:h-64 object-cover" />
            </div>

            {/* Keto explanation */}
            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-3">🥑 Dieta Cetogénica</h2>
              <p className="text-fx-gray text-sm font-body leading-relaxed mb-4">{PROGRAM_INFO.keto}</p>
              <p className="text-fx-gray text-sm font-body leading-relaxed">5/14 KETO ayuda a mantener los niveles de saciedad, además de un mejor control de las calorías. Para mejores resultados, combínalo con el Pack Detox 5-Días.</p>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-4">✅ Características del Plan 5/14 Keto</h2>
              <div className="space-y-2">
                {PROGRAM_INFO.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-fx-gray font-body">
                    <span className="text-fx-green font-bold mt-0.5">✓</span><span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cardiovascular risk table */}
            <div className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-3">📏 Mide tu cintura - Riesgo Cardiovascular</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-heading font-semibold text-fx-dark text-sm mb-2">👨 Hombres</h4>
                  <div className="space-y-1">
                    {RIESGO_CARDIOVASCULAR.hombres.map((r) => (
                      <div key={r.riesgo} className={`flex justify-between p-2 rounded-lg text-sm font-body ${r.riesgo === 'Alto' ? 'bg-red-50 text-red-700' : r.riesgo === 'Moderado' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                        <span className="font-semibold">{r.riesgo}</span><span>{r.medida}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-fx-dark text-sm mb-2">👩 Mujeres</h4>
                  <div className="space-y-1">
                    {RIESGO_CARDIOVASCULAR.mujeres.map((r) => (
                      <div key={r.riesgo} className={`flex justify-between p-2 rounded-lg text-sm font-body ${r.riesgo === 'Alto' ? 'bg-red-50 text-red-700' : r.riesgo === 'Moderado' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                        <span className="font-semibold">{r.riesgo}</span><span>{r.medida}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ESQUEMA DIARIO ===== */}
        {activeTab === 'esquema' && (
          <div className="space-y-4">
            {/* Breakfast hero */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/guide/breakfast.png" alt="Desayuno saludable keto" className="w-full h-48 sm:h-56 object-cover" />
            </div>
            <div className="rounded-2xl p-5 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-2">⏰ Esquema de Alimentación Diaria</h2>
              <p className="text-fx-gray text-sm font-body">Días Tipo A {ESQUEMA_DIARIO.typeA} y Días Tipo B {ESQUEMA_DIARIO.typeB}</p>
            </div>
            <div className="relative">
              <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-fx-gray-lighter md:left-[31px]" />
              {ESQUEMA_DIARIO.meals.map((meal, i) => {
                const key = Object.keys(mealIcons).find(k => meal.time.includes(k)) || 'AL DESPERTAR';
                const Icon = mealIcons[key] || Droplets;
                return (
                  <div key={i} className="relative flex gap-4 mb-4 last:mb-0">
                    <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl ${mealColors[i]} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 rounded-2xl p-5 bg-white border border-fx-gray-lighter shadow-sm">
                      <span className="text-xs font-heading font-bold text-fx-green uppercase tracking-wider">{meal.time}</span>
                      {meal.product && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-fx-green/10 text-fx-green-darker font-heading font-semibold">{meal.product}</span>}
                      <p className="text-fx-gray text-sm font-body mt-2 leading-relaxed">{meal.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl p-5 bg-fx-dark text-white">
              <h3 className="font-heading font-bold text-lg mb-2">🌙 Ayuno Nocturno (14 horas)</h3>
              <p className="text-white/70 text-sm font-body leading-relaxed">Desde la cena hasta la media mañana. Este ayuno intermitente parcial ayuda a tu cuerpo a quemar reservas de grasa como fuente de energía.</p>
            </div>
          </div>
        )}

        {/* ===== PLAN 7 DÍAS ===== */}
        {activeTab === 'plan' && (
          <div className="space-y-3">
            {/* Lunch hero */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/guide/lunch.png" alt="Almuerzo keto saludable" className="w-full h-48 sm:h-56 object-cover" />
            </div>
            <div className="rounded-2xl p-4 bg-white border border-fx-gray-lighter shadow-sm mb-2">
              <p className="text-fx-gray text-sm font-body">
                <strong className="text-fx-dark">Plan nutricional basado en ~1300 Kcal/día</strong> (estatura 161-170 cm). 
                Los Días Tipo <strong className="text-fx-green">A</strong> son sin carbohidratos, los Días Tipo <strong className="text-fx-dark">B</strong> incluyen una porción de carbohidratos.
              </p>
            </div>
            {PLAN_SEMANAL.map(day => renderDayPlan(day))}
          </div>
        )}

        {/* ===== ALIMENTOS ===== */}
        {activeTab === 'alimentos' && (
          <div className="space-y-3">
            {/* Vegetables hero */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/guide/vegetables.png" alt="Alimentos keto saludables" className="w-full h-48 sm:h-56 object-cover" />
            </div>
            <FoodSection title="Proteína Animal" icon={Flame} items={OPCIONES_PROTEINA} type="proteina" />
            <FoodSection title="Proteína Vegetal" icon={Leaf} items={OPCIONES_PROTEINA_VEGETAL} type="proteina_veg" />
            <FoodSection title="Carbohidratos (solo Días 3 y 6)" icon={Apple} items={OPCIONES_CARBOHIDRATOS} type="carbos" />
            <FoodSection title="Grasas Saludables" icon={Droplets} items={OPCIONES_GRASA} type="grasa" />
            <FoodSection title="Frutas" icon={Heart} items={OPCIONES_FRUTAS} type="frutas" />
            
            {/* Vegetales ilimitados */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${expandedFood === 'veg' ? 'bg-white border-fx-green/30 shadow-lg' : 'bg-white border-fx-gray-lighter shadow-sm'}`}>
              <button onClick={() => setExpandedFood(expandedFood === 'veg' ? null : 'veg')} className="w-full flex items-center gap-3 p-5 text-left">
                <div className="w-10 h-10 rounded-xl bg-fx-green/10 flex items-center justify-center"><Leaf size={18} className="text-fx-green" /></div>
                <span className="flex-1 font-heading font-bold text-fx-dark">Vegetales ILIMITADOS</span>
                <span className="text-xs text-fx-gray-light font-body">{VEGETALES_ILIMITADOS.length} opciones</span>
                {expandedFood === 'veg' ? <ChevronUp size={16} className="text-fx-green" /> : <ChevronDown size={16} className="text-fx-gray-light" />}
              </button>
              {expandedFood === 'veg' && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {VEGETALES_ILIMITADOS.map((v, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-body">{v}</span>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-fx-gray-bg border border-fx-gray-lighter">
                    <h4 className="font-heading font-semibold text-fx-dark text-sm mb-2">🥗 Aderezos de ensalada</h4>
                    <ol className="space-y-2">
                      {ADEREZOS.map((a, i) => (
                        <li key={i} className="text-fx-gray text-sm font-body flex gap-2"><span className="text-fx-green font-bold">{i+1}.</span>{a}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== BUENOS HÁBITOS ===== */}
        {activeTab === 'habitos' && (
          <div className="space-y-3">
            <div className="rounded-2xl p-5 bg-white border border-fx-gray-lighter shadow-sm">
              <h2 className="font-heading font-bold text-fx-dark text-lg mb-2">💚 Buenos Hábitos a incorporar en tu vida desde hoy</h2>
            </div>
            {BUENOS_HABITOS.map((h, i) => (
              <div key={i} className="rounded-2xl p-5 bg-white border border-fx-gray-lighter shadow-sm hover:border-fx-green/20 transition-all">
                <h3 className="font-heading font-bold text-fx-dark text-base mb-2">{h.title}</h3>
                <p className="text-fx-gray text-sm font-body leading-relaxed">{h.desc}</p>
              </div>
            ))}
            <div className="rounded-2xl p-6 gradient-brand text-white text-center">
              <h3 className="font-heading font-bold text-xl mb-2">🚀 ¡Empezá hoy!</h3>
              <p className="text-white/80 text-sm font-body max-w-lg mx-auto mb-4">Contactanos por WhatsApp para conseguir tu Pack 5/14 Keto y empezar a transformar tu vida.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); window.open(getWhatsAppUrl('Hola! Quiero el Pack 5/14 Keto'), '_blank', 'noopener,noreferrer'); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-fx-dark font-heading font-bold text-sm rounded-full hover:bg-white/90 transition-all shadow-lg uppercase tracking-wide">
                💬 Quiero mi Pack 5/14
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
