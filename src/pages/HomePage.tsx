import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Truck, BookOpen, Zap, Scale, Dumbbell, Heart, Activity, ShieldCheck, MessageCircle, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { trackEvent } from '../lib/analytics';
import { getWhatsAppUrl } from '../components/WhatsAppButton';
import type { Product } from '../types';

const TREATMENTS = [
  {
    icon: Zap,
    title: 'Aumentar Energía',
    emoji: '⚡',
    desc: '¿Te sentís cansado/a todo el día? Un plan con Vita Xtra T+ y hábitos para tener energía sostenida sin bajones.',
    color: '#EA580C',
    colorLight: '#FFF7ED',
    products: 'Vita Xtra T+, Thermo T3',
    msg: 'Hola María Noel! Me interesa un asesoramiento para AUMENTAR MI ENERGÍA. ¿Podemos coordinar una consulta?',
    detail: {
      intro: 'La falta de energía es uno de los problemas más comunes hoy en día. El estrés, la mala alimentación, el sedentarismo y el mal descanso drenan tu vitalidad. Este plan combina suplementación natural con cambios de hábitos para que recuperes tu energía de forma sostenida, sin los bajones del café o las bebidas energizantes.',
      includes: [
        'Evaluación inicial de tus hábitos de sueño, alimentación y actividad física',
        'Plan de suplementación con Vita Xtra T+ (energía natural de Guayusa amazónica)',
        'Incorporación de Thermo T3 para activar tu metabolismo desde la mañana',
        'Guía de alimentación energética: qué comer y a qué hora para mantener la energía estable',
        'Rutina de hábitos: hidratación, pausas activas y técnicas de respiración',
        'Seguimiento semanal por WhatsApp con ajustes según tu evolución',
      ],
      forWhom: [
        'Personas que se sienten cansadas desde que se levantan',
        'Quienes dependen del café para funcionar',
        'Madres y padres con jornadas agotadoras',
        'Trabajadores con horarios exigentes o nocturnos',
        'Deportistas que necesitan más rendimiento',
      ],
      results: 'En las primeras 2 semanas notarás más claridad mental y menos fatiga. Al mes, la mayoría de las personas reportan energía sostenida durante todo el día sin necesidad de estimulantes artificiales.',
      duration: 'Plan inicial de 4 semanas · Seguimiento continuo disponible',
      note: 'La energía real viene de adentro. No se trata solo de tomar un producto, sino de entender cómo tu cuerpo produce y gasta energía. Te ayudo a encontrar tu equilibrio.',
    },
  },
  {
    icon: Scale,
    title: 'Adelgazar',
    emoji: '🎯',
    desc: 'Plan personalizado para pérdida de peso saludable con productos FuXion + guía nutricional y seguimiento semanal.',
    color: '#16A34A',
    colorLight: '#F0FDF4',
    products: 'Thermo T3, Prunex1, NoCarb-T',
    msg: 'Hola María Noel! Me interesa un plan personalizado para ADELGAZAR de forma saludable. ¿Podemos coordinar una consulta?',
    detail: {
      intro: 'Perder peso de forma saludable no es hacer dietas extremas. Es un proceso gradual donde combinamos productos FuXion con un plan alimentario real, adaptado a tu vida y tus gustos. Sin restricciones imposibles, sin rebote. El programa 5/14 Keto es la base ideal, y lo complementamos según tus necesidades.',
      includes: [
        'Evaluación de tu composición corporal y hábitos alimentarios actuales',
        'Plan nutricional personalizado basado en el programa 5/14 Keto FuXion',
        'Suplementación con Thermo T3 (metabolismo), Prunex1 (digestión) y NoCarb-T (control glucémico)',
        'Plan semanal de comidas con recetas fáciles y accesibles',
        'Guía de actividad física adaptada a tu nivel',
        'Seguimiento semanal con mediciones y ajustes del plan',
        'Grupo de apoyo con otras personas en el mismo programa',
      ],
      forWhom: [
        'Personas con sobrepeso que quieren bajar de forma saludable',
        'Quienes han probado dietas sin resultados duraderos',
        'Personas con metabolismo lento o resistencia a la insulina',
        'Post-embarazo: recuperar el peso de forma gradual',
        'Personas sedentarias que quieren empezar un cambio integral',
      ],
      results: 'Pérdida gradual de 2-4 kg por mes de forma sostenible. Reducción de hinchazón abdominal desde la primera semana. Mayor energía y mejor digestión como efectos secundarios positivos.',
      duration: 'Plan inicial de 5 a 14 días (Programa Keto) · Seguimiento de 3 meses recomendado',
      note: 'No te prometo resultados mágicos ni pérdidas de peso irreales. Te prometo un plan honesto, basado en ciencia y adaptado a vos. El cambio real es gradual, pero permanente.',
    },
  },
  {
    icon: Dumbbell,
    title: 'Aumentar Masa Muscular',
    emoji: '💪',
    desc: 'Combinación de proteína de alta calidad + colostro + plan de alimentación para potenciar tu entrenamiento.',
    color: '#3B82F6',
    colorLight: '#EFF6FF',
    products: 'BioPro+ Fit',
    msg: 'Hola María Noel! Me interesa un plan para AUMENTAR MASA MUSCULAR con suplementación FuXion. ¿Podemos coordinar una consulta?',
    detail: {
      intro: 'Ganar músculo requiere tres pilares: entrenamiento adecuado, alimentación suficiente y recuperación. BioPro+ Fit combina proteína de suero de alta biodisponibilidad con colostro bovino, lo que te da los bloques de construcción muscular más la recuperación inmune que necesitás para entrenar consistentemente.',
      includes: [
        'Evaluación de tu rutina de entrenamiento actual y objetivos',
        'Cálculo de requerimiento proteico diario según tu peso y actividad',
        'Plan de suplementación con BioPro+ Fit: cuándo y cómo tomarlo para máxima absorción',
        'Guía alimentaria hiperproteica con opciones prácticas',
        'Timing nutricional: qué comer antes, durante y después del entrenamiento',
        'Seguimiento mensual con ajustes según tu progreso',
      ],
      forWhom: [
        'Personas que entrenan en gimnasio y quieren más resultados',
        'Deportistas que necesitan mejor recuperación entre sesiones',
        'Adultos +40 que pierden masa muscular con la edad (sarcopenia)',
        'Quienes no llegan a su requerimiento de proteína solo con la alimentación',
        'Vegetarianos que necesitan complementar su ingesta proteica',
      ],
      results: 'Mejor recuperación post-entrenamiento desde la primera semana. Ganancia muscular visible en 6-8 semanas con entrenamiento consistente. Menos dolores musculares y más fuerza progresiva.',
      duration: 'Plan continuo · Evaluaciones mensuales · Ajustes cada 4 semanas',
      note: 'La proteína es importante, pero no lo es todo. Te ayudo a armar un plan completo donde la suplementación sea el complemento perfecto de tu entrenamiento y alimentación.',
    },
  },
  {
    icon: Heart,
    title: 'Mejorar Digestión',
    emoji: '🌿',
    desc: 'Problemas de constipación, hinchazón o intestino irritable. Plan con fibras + prebióticos para regularizar tu tránsito.',
    color: '#D97706',
    colorLight: '#FFFBEB',
    products: 'Prunex1, NoCarb-T',
    msg: 'Hola María Noel! Tengo PROBLEMAS DIGESTIVOS y me gustaría un asesoramiento personalizado. ¿Podemos coordinar?',
    detail: {
      intro: 'Los problemas digestivos afectan tu calidad de vida diaria: hinchazón, constipación, gases, pesadez. Prunex1 combina psyllium (la fibra con más evidencia científica) + inulina (prebiótico) + linaza para un efecto completo. Pero un producto solo no alcanza: necesitás cambiar hábitos de hidratación y alimentación.',
      includes: [
        'Evaluación de tus síntomas digestivos y hábitos alimentarios',
        'Plan de suplementación con Prunex1 (fibra + prebióticos)',
        'Incorporación gradual de NoCarb-T para fortalecer la microbiota',
        'Guía de hidratación: cuánta agua y cuándo tomarla (fundamental con psyllium)',
        'Plan de alimentación rico en fibra con incorporación progresiva',
        'Identificación de alimentos que te provocan molestias',
        'Seguimiento semanal con registro de síntomas',
      ],
      forWhom: [
        'Personas con constipación crónica u ocasional',
        'Quienes sufren de hinchazón abdominal frecuente',
        'Personas con intestino irritable (SII) tipo constipación',
        'Dietas bajas en fibra o muy procesadas',
        'Personas con colesterol elevado (el psyllium ayuda a controlarlo)',
      ],
      results: 'Mejora del tránsito intestinal desde los primeros 3-5 días. Reducción significativa de hinchazón en 2 semanas. Mayor regularidad y bienestar digestivo al mes.',
      duration: 'Plan inicial de 4 semanas · Mantenimiento con hábitos adquiridos',
      note: 'El intestino es tu "segundo cerebro". Cuando tu digestión funciona bien, todo mejora: energía, ánimo, piel, sueño. No subestimes el poder de un intestino sano.',
    },
  },
  {
    icon: Activity,
    title: 'Control Metabólico',
    emoji: '📊',
    desc: 'Resistencia a la insulina, prediabetes o control de azúcar. Plan con cromo + inulina + cambios de hábitos.',
    color: '#7C3AED',
    colorLight: '#F5F3FF',
    products: 'NoCarb-T',
    msg: 'Hola María Noel! Necesito ayuda con CONTROL METABÓLICO (glucosa/insulina). ¿Podemos coordinar una consulta?',
    detail: {
      intro: 'El descontrol del azúcar en sangre no solo es un problema de diabéticos. La resistencia a la insulina afecta a millones de personas y causa: aumento de peso, fatiga post-comidas, antojos de dulces y riesgo cardiovascular. NoCarb-T combina cromo (que mejora la sensibilidad a la insulina) + inulina (prebiótico que reduce glucemia) para un enfoque integral.',
      includes: [
        'Evaluación de tus análisis de sangre recientes (glucemia, insulina, HbA1c)',
        'Plan de suplementación con NoCarb-T (cromo + inulina + fibra)',
        'Plan alimentario de bajo índice glucémico personalizado',
        'Guía de combinación de alimentos para evitar picos de glucosa',
        'Estrategias de timing alimentario (cuándo comer para estabilizar glucemia)',
        'Incorporación de actividad física para mejorar sensibilidad insulínica',
        'Seguimiento con monitoreo de síntomas y, si es posible, mediciones de glucosa',
      ],
      forWhom: [
        'Personas diagnosticadas con prediabetes',
        'Resistencia a la insulina confirmada o sospechada',
        'Síndrome metabólico',
        'Síndrome de ovario poliquístico (SOP)',
        'Personas con antojos constantes de dulces y carbohidratos',
        'Quienes sienten fatiga intensa después de comer',
      ],
      results: 'Reducción de antojos en la primera semana. Estabilización de la energía post-comidas en 2-3 semanas. Mejora de marcadores de glucemia en 1-2 meses con adherencia al plan.',
      duration: 'Plan de 8 semanas con evaluación de resultados · Seguimiento continuo',
      note: 'Este plan es un COMPLEMENTO, nunca un reemplazo del tratamiento médico. Si tenés diabetes diagnosticada, trabajamos junto a tu médico para potenciar resultados de forma segura.',
    },
  },
  {
    icon: ShieldCheck,
    title: 'Fortalecer Inmunidad',
    emoji: '🛡️',
    desc: 'Reforzá tus defensas con colostro + plan nutricional antiinflamatorio. Ideal para cambios de estación.',
    color: '#CA8A04',
    colorLight: '#FEFCE8',
    products: 'BioPro+ Fit, Vita Xtra T+',
    msg: 'Hola María Noel! Quiero FORTALECER MI SISTEMA INMUNE. ¿Podemos coordinar una consulta personalizada?',
    detail: {
      intro: 'Tu sistema inmune es tu escudo natural. El colostro bovino presente en BioPro+ Fit aporta inmunoglobulinas (anticuerpos naturales) y factores de crecimiento que fortalecen tus defensas. Combinado con Vita Xtra T+ (antioxidantes + vitaminas) y un plan antiinflamatorio, lográs una inmunidad robusta.',
      includes: [
        'Evaluación de tu historial de enfermedades frecuentes y estilo de vida',
        'Plan de suplementación con BioPro+ Fit (colostro + proteína) y Vita Xtra T+',
        'Guía de alimentación antiinflamatoria rica en antioxidantes',
        'Plan de mejora del sueño (fundamental para la inmunidad)',
        'Estrategias de manejo del estrés (el estrés crónico destruye defensas)',
        'Protocolo estacional: cómo prepararte para cambios de estación',
        'Seguimiento mensual con ajustes según la época del año',
      ],
      forWhom: [
        'Personas que se enferman con frecuencia (resfríos, gripes recurrentes)',
        'Atletas con entrenamientos intensos (el sobreentrenamiento baja defensas)',
        'Adultos mayores con sistema inmune debilitado',
        'Personas en recuperación post-enfermedad o cirugía',
        'Quienes trabajan con público o en ambientes de riesgo',
        'Cambio de estación: preparación preventiva',
      ],
      results: 'Reducción de episodios de enfermedad en 2-3 meses. Mejor recuperación cuando te enfermás. Mayor vitalidad general y resistencia al estrés.',
      duration: 'Plan de 3 meses · Ideal mantener como hábito permanente',
      note: 'La inmunidad se construye todos los días con lo que comés, cómo dormís y cómo manejás el estrés. Los productos ayudan, pero el cambio real viene del estilo de vida.',
    },
  },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTreatment, setActiveTreatment] = useState<typeof TREATMENTS[0] | null>(null);

  useEffect(() => {
    trackEvent('view', {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - FuXion style green gradient */}
      <section className="gradient-hero relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-fx-green/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Distributor Badge with Photo */}
            <div className="flex flex-col items-center gap-3 mb-6 animate-fade-in-up opacity-0 stagger-1">
              <img
                src="/images/maria-noel.png"
                alt="María Noel Acosta"
                className="w-20 h-20 rounded-full object-cover border-3 border-white/40 shadow-lg"
              />
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs font-heading font-semibold text-white/90 uppercase tracking-wider text-center">
                  María Noel Acosta #3020487 — Distribuidora autorizada FuXion
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6 animate-fade-in-up opacity-0 stagger-2">
              Tu bienestar,{' '}
              <span className="text-fx-green-light">naturalmente</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 font-body leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-3">
              No hay un camino único ni una forma de alimentarse que le sirva a todas.
              <br /><br />
              Hay un punto de encuentro entre lo que querés, lo que tu cuerpo necesita y lo que tu vida permite.
              <br /><br />
              Eso es lo que construimos juntas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
              <Link to="/productos" className="btn-primary py-3.5 px-8 text-base bg-white !text-fx-dark hover:!shadow-white/30">
                Ver Productos
                <ArrowRight size={18} />
              </Link>
              <Link to="/recetas" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-heading font-semibold text-sm uppercase tracking-wide hover:bg-white/10 transition-all">
                <BookOpen size={18} />
                Recetas & Guía
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50C240 80 480 95 720 85C960 75 1200 30 1440 45V100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: '100% Natural',
                desc: 'Ingredientes de la biodiversidad amazónica y andina',
              },
              {
                icon: Shield,
                title: 'Calidad Garantizada',
                desc: 'Respaldados por ciencia y tecnología',
              },
              {
                icon: Truck,
                title: 'Envíos a todo Uruguay',
                desc: 'Recibí en tu domicilio',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 py-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-fx-green/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon size={24} className="text-fx-green" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-fx-dark text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-fx-gray text-xs font-body">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRATAMIENTOS PERSONALIZADOS ===== */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fx-green/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fx-green/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
              Asesoramiento Personalizado
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-fx-dark mt-2 mb-4">
              Tratamientos con <span className="gradient-text">María Noel</span>
            </h2>
            <p className="text-fx-gray font-body max-w-2xl mx-auto mb-6">
              Cada cuerpo es diferente. Recibí un plan nutricional personalizado con productos FuXion 
              según tus objetivos. Sesiones de asesoramiento con nutricionista certificada.
            </p>
            {/* Nutritionist badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-fx-gray-bg border border-fx-gray-lighter">
              <img
                src="/images/maria-noel.png"
                alt="María Noel Acosta"
                className="w-12 h-12 rounded-full object-cover border-2 border-fx-green/30"
              />
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-fx-dark">María Noel Acosta</p>
                <p className="text-[11px] font-body text-fx-gray">Nutricionista · Distribuidora FuXion #3020487</p>
              </div>
            </div>
          </div>

          {/* Treatment Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.title}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer"
                onClick={() => setActiveTreatment(treatment)}
              >
                {/* Top color accent */}
                <div className="h-1.5" style={{ backgroundColor: treatment.color }} />

                <div className="p-6">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: treatment.colorLight }}
                    >
                      <treatment.icon size={22} style={{ color: treatment.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-fx-dark group-hover:text-fx-green transition-colors">
                        {treatment.emoji} {treatment.title}
                      </h3>
                      <p className="text-[10px] font-heading font-semibold uppercase tracking-wider mt-0.5" style={{ color: treatment.color }}>
                        {treatment.products}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-body text-gray-600 leading-relaxed mb-4">
                    {treatment.desc}
                  </p>

                  {/* View more hint */}
                  <p className="text-xs font-heading font-semibold mb-4 flex items-center gap-1" style={{ color: treatment.color }}>
                    <BookOpen size={12} />
                    Ver plan completo
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </p>

                  {/* WhatsApp CTA */}
                  <button
                    onClick={(e) => { e.stopPropagation(); window.open(getWhatsAppUrl(treatment.msg), '_blank', 'noopener,noreferrer'); }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-heading font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                    style={{ backgroundColor: treatment.color }}
                  >
                    <MessageCircle size={16} />
                    Pedir asesoramiento
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-8">
            <p className="text-xs font-body text-gray-400">
              💬 Todas las consultas son por WhatsApp · Respuesta en menos de 24h · Seguimiento personalizado
            </p>
          </div>
        </div>
      </section>

      {/* ===== Treatment Detail Modal ===== */}
      {activeTreatment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setActiveTreatment(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative w-full sm:w-[520px] max-w-[95vw] max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl animate-slide-up bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with color */}
            <div className="relative px-6 pt-6 pb-5" style={{ backgroundColor: activeTreatment.colorLight }}>
              <button
                onClick={() => setActiveTreatment(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all shadow-sm"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: activeTreatment.color + '20' }}
                >
                  <activeTreatment.icon size={28} style={{ color: activeTreatment.color }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-fx-dark">
                    {activeTreatment.emoji} {activeTreatment.title}
                  </h3>
                  <p className="text-xs font-heading font-semibold uppercase tracking-wider mt-0.5" style={{ color: activeTreatment.color }}>
                    Productos: {activeTreatment.products}
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Intro */}
              <p className="text-sm font-body text-gray-700 leading-relaxed">
                {activeTreatment.detail.intro}
              </p>

              {/* What includes */}
              <div>
                <h4 className="font-heading font-bold text-sm text-fx-dark mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: activeTreatment.color }}>✓</span>
                  ¿Qué incluye el plan?
                </h4>
                <div className="space-y-2">
                  {activeTreatment.detail.includes.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm font-body text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeTreatment.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Who is it for */}
              <div className="rounded-xl p-4 border" style={{ backgroundColor: activeTreatment.colorLight, borderColor: activeTreatment.color + '30' }}>
                <h4 className="font-heading font-bold text-sm text-fx-dark mb-2">🎯 ¿Para quién es?</h4>
                <div className="space-y-1.5">
                  {activeTreatment.detail.forWhom.map((item: string, i: number) => (
                    <p key={i} className="text-xs font-body text-gray-600 flex items-start gap-1.5">
                      <span className="text-sm">•</span> {item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Expected results */}
              <div>
                <h4 className="font-heading font-bold text-sm text-fx-dark mb-2">📈 Resultados esperados</h4>
                <p className="text-sm font-body text-gray-600 leading-relaxed">
                  {activeTreatment.detail.results}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-3 rounded-xl p-3 bg-fx-gray-bg border border-fx-gray-lighter">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-lg">⏱️</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-xs text-fx-dark">Duración recomendada</p>
                  <p className="text-xs font-body text-gray-500">{activeTreatment.detail.duration}</p>
                </div>
              </div>

              {/* Nutritionist note */}
              <div className="flex items-start gap-3 rounded-xl p-4 bg-gradient-to-r from-fx-green/5 to-fx-green/10 border border-fx-green/20">
                <img
                  src="/images/maria-noel.png"
                  alt="María Noel"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white flex-shrink-0"
                />
                <div>
                  <p className="font-heading font-bold text-xs text-fx-dark mb-1">Nota de María Noel:</p>
                  <p className="text-xs font-body text-gray-600 italic leading-relaxed">
                    "{activeTreatment.detail.note}"
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky CTA */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white">
              <button
                onClick={() => window.open(getWhatsAppUrl(activeTreatment.msg), '_blank', 'noopener,noreferrer')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-white text-sm font-heading font-bold transition-all hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: activeTreatment.color }}
              >
                <MessageCircle size={18} />
                Pedir asesoramiento por WhatsApp
              </button>
              <p className="text-center text-[11px] font-body text-gray-400 mt-2">
                Respuesta personalizada en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-fx-gray-bg" id="productos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
              Nuestro Catálogo
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-fx-dark mt-2 mb-4">
              Productos <span className="gradient-text">FuXion</span>
            </h2>
            <p className="text-fx-gray font-body max-w-xl mx-auto">
              Cada producto está diseñado para mejorar tu calidad de vida. 
              Combiná varios para un programa nutricional completo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onViewDetail={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Guide CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden gradient-brand-dark">
            <div className="absolute top-0 right-0 w-96 h-96 bg-fx-green/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-fx-green/20 mb-6">
                <BookOpen size={28} className="text-fx-green-light" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                🍽️ Recetas & Guía Diaria
              </h2>
              <p className="text-white/70 font-body max-w-xl mx-auto mb-8">
                Descubrí recetas con nuestros productos, el programa 5/14 Keto 
                con tu guía diaria paso a paso, y buenos hábitos para 
                potenciar tus resultados.
              </p>
              <Link
                to="/recetas"
                className="btn-primary py-3.5 px-8 text-base"
              >
                <BookOpen size={18} />
                Ver Recetas
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
