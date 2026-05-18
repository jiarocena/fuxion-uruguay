export interface ComponentSlide {
  type: 'cover' | 'what' | 'benefits' | 'evidence' | 'product';
  title?: string;
  subtitle?: string;
  content?: string;
  items?: { icon: string; title: string; desc: string }[];
  study?: { quote: string; source: string };
  products?: { name: string; desc: string; image: string; price: number }[];
  highlight?: { text: string; sub: string };
}

export interface ComponentData {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  image: string;
  color: string; // tailwind color key
  colorHex: string;
  colorLight: string;
  origin: string;
  evidenceLevel: number; // 1-5 stars
  productIds: string[];
  slides: ComponentSlide[];
}

export const COMPONENTS_DATA: ComponentData[] = [
  {
    id: 'proteina-suero',
    name: 'Proteína de Suero',
    tagline: 'El constructor muscular',
    emoji: '🥛',
    image: '/images/components/proteina.png',
    color: 'blue',
    colorHex: '#3B82F6',
    colorLight: '#EFF6FF',
    origin: 'Leche de vaca',
    evidenceLevel: 5,
    productIds: ['biopro-fit'],
    slides: [
      {
        type: 'cover',
        title: 'PROTEÍNA DE SUERO',
        subtitle: 'El constructor muscular',
        content: 'Viene de la leche\n100% biodisponible',
        highlight: { text: 'Lo encontrás en:', sub: 'BIOPRO+ FIT' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'La proteína de suero (whey protein) es la fracción líquida que se separa de la leche durante la fabricación del queso. Es una proteína "COMPLETA": contiene los 9 aminoácidos esenciales que tu cuerpo no puede producir.',
        highlight: { text: 'Contiene 10-12% de LEUCINA', sub: 'El aminoácido que "enciende" la síntesis de proteína muscular' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '💪', title: 'Construcción muscular', desc: 'Repara y construye tejido muscular' },
          { icon: '⚡', title: 'Recuperación rápida', desc: 'Post-entrenamiento inmediato' },
          { icon: '😊', title: 'Control del apetito', desc: 'Te mantiene saciado por horas' },
          { icon: '🛡️', title: 'Preserva músculo', desc: 'Durante pérdida de peso' },
        ],
        content: '¿Quién la necesita? Personas que entrenan, adultos +40, quienes no llegan a su requerimiento proteico',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: 'SÍ. Un estudio científico analizó 49 investigaciones con 1,863 personas y confirmó: la proteína de suero aumenta masa muscular cuando entrenás con pesas.',
        study: {
          quote: 'La suplementación con proteína de suero aumentó significativamente la masa muscular y la fuerza en adultos que entrenan resistencia',
          source: 'Metaanálisis, British Journal of Sports Medicine (2018)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'BIOPRO+ FIT', desc: 'Proteína de suero de alta calidad + Colostro para potenciar recuperación', image: '/images/biopro-fit.png', price: 1425 },
        ],
      },
    ],
  },
  {
    id: 'psyllium',
    name: 'Psyllium',
    tagline: 'Tu aliado para el intestino feliz',
    emoji: '🌾',
    image: '/images/components/psyllium.png',
    color: 'amber',
    colorHex: '#D97706',
    colorLight: '#FFFBEB',
    origin: 'Plantago ovata (India)',
    evidenceLevel: 5,
    productIds: ['prunex1'],
    slides: [
      {
        type: 'cover',
        title: 'PSYLLIUM',
        subtitle: 'Tu aliado para el intestino feliz',
        content: 'Planta Plantago ovata\nCultivada hace +1,000 años',
        highlight: { text: 'Lo encontrás en:', sub: 'PRUNEX1' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'El psyllium es la cáscara de las semillas de Plantago ovata, una planta originaria de India e Irán. Cuando entra en contacto con agua, forma un gel suave que actúa como una "escoba natural" en tu intestino.',
        highlight: { text: 'Usado en medicina ayurvédica', sub: 'Tradición milenaria respaldada por la ciencia moderna' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🎯', title: 'Regulariza tránsito', desc: 'Adiós constipación' },
          { icon: '💨', title: 'Reduce hinchazón', desc: 'Menos hinchazón abdominal' },
          { icon: '😊', title: 'Efecto saciante', desc: 'Te mantiene satisfecho más tiempo' },
          { icon: '❤️', title: 'Control colesterol', desc: 'Ayuda a niveles saludables' },
        ],
        content: '⚠️ SIEMPRE con ABUNDANTE AGUA (mínimo 250ml)',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: '100% SÍ. Es la fibra con MAYOR EVIDENCIA CIENTÍFICA para constipación. Las guías médicas de gastroenterología la recomiendan como tratamiento de primera línea.',
        study: {
          quote: 'El psyllium es efectivo para constipación funcional con nivel de evidencia A (el más alto)',
          source: 'Metaanálisis, Alimentary Pharmacology & Therapeutics (2011)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'PRUNEX1', desc: 'Psyllium + Inulina + Linaza para un efecto completo en tu digestión', image: '/images/prunex1.png', price: 1710 },
        ],
      },
    ],
  },
  {
    id: 'inulina',
    name: 'Inulina',
    tagline: 'El prebiótico que tu microbiota ama',
    emoji: '🌿',
    image: '/images/components/inulina.png',
    color: 'emerald',
    colorHex: '#059669',
    colorLight: '#ECFDF5',
    origin: 'Raíz de achicoria',
    evidenceLevel: 4,
    productIds: ['nocarb-t', 'prunex1'],
    slides: [
      {
        type: 'cover',
        title: 'INULINA',
        subtitle: 'El prebiótico que tu microbiota ama',
        content: 'Raíz de achicoria\nPrebiótico natural',
        highlight: { text: 'Lo encontrás en:', sub: 'NOCARB-T y PRUNEX1' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'La inulina es una fibra soluble que actúa como "comida" para tus bacterias intestinales buenas. Es un prebiótico natural que mejora tu flora intestinal desde adentro. Tu intestino tiene 100 BILLONES de bacterias.',
        highlight: { text: '70% de tu sistema inmune', sub: 'Está en tu intestino. Al mejorar tu microbiota, fortalecés tus defensas' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🦠', title: 'Alimenta bacterias buenas', desc: 'Probióticos naturales' },
          { icon: '🩸', title: 'Control de azúcar', desc: 'Mejora glucemia en sangre' },
          { icon: '📉', title: 'Reduce triglicéridos', desc: 'Mejora perfil de lípidos' },
          { icon: '🦴', title: 'Absorción de calcio', desc: 'Mejora la absorción mineral' },
        ],
        content: 'También en: ajo, cebolla, espárragos, banana',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: 'SÍ. Un estudio científico analizó 33 investigaciones y encontró que la inulina REDUCE la glucemia en ayunas y mejora el perfil de lípidos.',
        study: {
          quote: 'La suplementación con inulina redujo glucemia en ayunas (-4.8 mg/dL) y triglicéridos en 33 estudios clínicos',
          source: 'Metaanálisis, European Journal of Clinical Nutrition (2017)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'NOCARB-T', desc: 'Inulina + Cromo para control glucémico completo', image: '/images/nocarb-t.png', price: 1710 },
          { name: 'PRUNEX1', desc: 'Inulina + Psyllium para digestión completa', image: '/images/prunex1.png', price: 1710 },
        ],
      },
    ],
  },
  {
    id: 'catequinas',
    name: 'Catequinas del Té Verde',
    tagline: 'El secreto milenario del té verde',
    emoji: '🍵',
    image: '/images/components/teverde.png',
    color: 'green',
    colorHex: '#16A34A',
    colorLight: '#F0FDF4',
    origin: 'Hojas de Camellia sinensis',
    evidenceLevel: 4,
    productIds: ['thermo-t3', 'nocarb-t', 'vita-xtra-t'],
    slides: [
      {
        type: 'cover',
        title: 'CATEQUINAS',
        subtitle: 'El secreto milenario del té verde',
        content: 'Hojas de Camellia sinensis\nCultivada hace 5,000 años',
        highlight: { text: 'Lo encontrás en:', sub: 'THERMO T3, NOCARB-T, VITA XTRA T+' },
      },
      {
        type: 'what',
        title: '¿QUÉ SON?',
        content: 'Las catequinas son antioxidantes potentes presentes en el té verde. La más estudiada es la EGCG (epigalocatequina galato), responsable de la mayoría de sus beneficios. Los monjes budistas lo toman hace más de 4,000 años.',
        highlight: { text: 'Té verde NO fermentado', sub: 'Por eso conserva más catequinas que el té negro' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVEN?',
        items: [
          { icon: '🔥', title: 'Gasto energético', desc: 'Quemás ~100 kcal/día extra' },
          { icon: '📉', title: 'Oxidación de grasas', desc: 'Mejora el metabolismo lipídico' },
          { icon: '🛡️', title: 'Protección antioxidante', desc: 'Contra daño oxidativo' },
          { icon: '🧠', title: 'Estado de alerta', desc: 'Combinadas con cafeína' },
        ],
        content: 'IMPORTANTE: NO son una "pastilla mágica". Son un APOYO MODESTO dentro de un plan completo.',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONAN REALMENTE?',
        content: 'SÍ, pero con expectativas realistas. Un metaanálisis encontró que las catequinas del té verde + cafeína aumentan el gasto energético y la oxidación de grasas. Aprox. 1-2 kg adicionales en 12 semanas, SIEMPRE combinado con dieta y ejercicio.',
        study: {
          quote: 'Las catequinas del té verde combinadas con cafeína aumentan el gasto energético en ~100 kcal/día y mejoran la oxidación de grasas',
          source: 'Metaanálisis, American Journal of Clinical Nutrition (2009)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'THERMO T3', desc: 'Mix de 3 tés para metabolismo óptimo', image: '/images/thermo-t3.png', price: 1710 },
          { name: 'NOCARB-T', desc: 'Incluye té verde por sus antioxidantes', image: '/images/nocarb-t.png', price: 1710 },
          { name: 'VITA XTRA T+', desc: 'Té verde para protección antioxidante', image: '/images/vita-xtra-t.png', price: 1710 },
        ],
      },
    ],
  },
  {
    id: 'cafeina',
    name: 'Cafeína',
    tagline: 'El ergogénico más estudiado del mundo',
    emoji: '☕',
    image: '/images/components/cafeina.png',
    color: 'orange',
    colorHex: '#EA580C',
    colorLight: '#FFF7ED',
    origin: 'Café, Té, Guayusa amazónica',
    evidenceLevel: 5,
    productIds: ['vita-xtra-t', 'thermo-t3'],
    slides: [
      {
        type: 'cover',
        title: 'CAFEÍNA',
        subtitle: 'El ergogénico más estudiado del mundo',
        content: '3 mil millones de tazas/día\nLa sustancia más consumida del planeta',
        highlight: { text: 'Lo encontrás en:', sub: 'VITA XTRA T+ y THERMO T3' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'La cafeína es un alcaloide natural que actúa como estimulante del sistema nervioso central. Es la sustancia psicoactiva más consumida del planeta. Viene de: granos de café, hojas de té, Guayusa amazónica y cacao.',
        highlight: { text: 'Guayusa amazónica', sub: 'Fuente natural de cafeína usada en Vita Xtra T+' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🧠', title: 'Estado de alerta', desc: 'Aumenta concentración y enfoque' },
          { icon: '⚡', title: 'Reduce fatiga', desc: 'Menos cansancio percibido' },
          { icon: '🏃', title: 'Rendimiento físico', desc: 'Mejora fuerza y resistencia' },
          { icon: '🔥', title: 'Acelera metabolismo', desc: 'Mayor gasto energético' },
        ],
        content: '⚠️ Cuidado con: consumo después de las 16h, sensibilidad individual, hipertensión.',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: 'ABSOLUTAMENTE. Es el suplemento ergogénico con MÁS evidencia científica. Una revisión analizó cientos de estudios y confirmó: la cafeína mejora alerta, rendimiento físico y fuerza muscular.',
        study: {
          quote: 'La cafeína mejora significativamente el rendimiento físico, la fuerza muscular, la potencia y la resistencia',
          source: 'Revisión, Sports Medicine (2010)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'VITA XTRA T+', desc: 'Cafeína natural de Guayusa amazónica', image: '/images/vita-xtra-t.png', price: 1710 },
          { name: 'THERMO T3', desc: 'Cafeína de té verde para metabolismo', image: '/images/thermo-t3.png', price: 1710 },
        ],
      },
    ],
  },
  {
    id: 'cromo',
    name: 'Cromo',
    tagline: 'El mineral que tu glucosa necesita',
    emoji: '⚡',
    image: '/images/components/cromo.png',
    color: 'slate',
    colorHex: '#475569',
    colorLight: '#F8FAFC',
    origin: 'Brócoli, levadura de cerveza',
    evidenceLevel: 3,
    productIds: ['nocarb-t'],
    slides: [
      {
        type: 'cover',
        title: 'CROMO',
        subtitle: 'El mineral que tu glucosa necesita',
        content: 'Mineral esencial traza\nPequeño pero poderoso',
        highlight: { text: 'Lo encontrás en:', sub: 'NOCARB-T' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'El cromo es un mineral esencial que tu cuerpo necesita en cantidades muy pequeñas (microgramos). Participa directamente en el metabolismo de la glucosa. Se pierde en el procesamiento de alimentos, por eso muchas personas tienen déficit.',
        highlight: { text: 'Potencia la acción de la insulina', sub: 'Hace que la "llave" de la insulina funcione mejor para tus células' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🩸', title: 'Sensibilidad insulina', desc: 'Mejora la respuesta insulínica' },
          { icon: '📊', title: 'Control de azúcar', desc: 'Ayuda a regular glucemia' },
          { icon: '🍬', title: 'Reduce antojos', desc: 'Menos antojos de carbohidratos' },
          { icon: '⚙️', title: 'Metabolismo', desc: 'Apoya metabolismo de grasas y proteínas' },
        ],
        content: 'Señales de déficit: antojos incontrolables, glucemia alterada, fatiga después de comer.',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: 'SÍ, especialmente en personas con sobrepeso y glucemia alterada. Un metaanálisis de 25 estudios encontró que el cromo mejora la glucemia en ayunas.',
        study: {
          quote: 'La suplementación con cromo mejoró la glucemia en ayunas (-0.50 mmol/L) en personas con sobrepeso',
          source: 'Metaanálisis, Diabetes Care (2013)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'NOCARB-T', desc: 'Cromo + Inulina + Fibra para control glucémico completo', image: '/images/nocarb-t.png', price: 1710 },
        ],
      },
    ],
  },
  {
    id: 'colostro',
    name: 'Colostro Bovino',
    tagline: 'El primer alimento (y el más poderoso)',
    emoji: '🛡️',
    image: '/images/components/colostro.png',
    color: 'yellow',
    colorHex: '#CA8A04',
    colorLight: '#FEFCE8',
    origin: 'Vacas lecheras (primeras 72h)',
    evidenceLevel: 3,
    productIds: ['biopro-fit'],
    slides: [
      {
        type: 'cover',
        title: 'COLOSTRO BOVINO',
        subtitle: 'El primer alimento (y el más poderoso)',
        content: 'Primeras 72h post-parto\nCargado de anticuerpos',
        highlight: { text: 'Lo encontrás en:', sub: 'BIOPRO+ FIT' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'El colostro es el líquido amarillento que producen las vacas en las primeras 72 horas después del parto. Está CARGADO de anticuerpos, factores de crecimiento y nutrientes bioactivos. Se recolecta el excedente sin afectar al ternero.',
        highlight: { text: 'Contiene Inmunoglobulinas + IGF-1', sub: 'Anticuerpos + Factor de Crecimiento para recuperación' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🛡️', title: 'Sistema inmune', desc: 'Fortalece defensas naturales' },
          { icon: '💪', title: 'Recuperación muscular', desc: 'Acelera reparación post-ejercicio' },
          { icon: '🩹', title: 'Repara intestino', desc: 'Mejora permeabilidad intestinal' },
          { icon: '🔬', title: 'Anti-inflamatorio', desc: 'Reduce inflamación sistémica' },
        ],
        content: 'Ideal para: atletas, sistema inmune debilitado, adultos mayores (sarcopenia).',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: 'SÍ. Una revisión científica documentó que el colostro contiene inmunoglobulinas y factores de crecimiento que mejoran recuperación muscular e inmunidad. Otro estudio encontró que reduce la inmunosupresión por ejercicio intenso.',
        study: {
          quote: 'El colostro bovino contiene factores de crecimiento y inmunoglobulinas que mejoran recuperación muscular y función inmune',
          source: 'Revisión, Sports Medicine (2009)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'BIOPRO+ FIT', desc: 'Proteína de suero + Colostro para máxima recuperación y síntesis muscular', image: '/images/biopro-fit.png', price: 1425 },
        ],
      },
    ],
  },
  {
    id: 'l-carnitina',
    name: 'L-Carnitina',
    tagline: '¿Quemador de grasas o solo marketing?',
    emoji: '🔥',
    image: '/images/components/carnitina.png',
    color: 'red',
    colorHex: '#DC2626',
    colorLight: '#FEF2F2',
    origin: 'Carne roja, cordero, pescado',
    evidenceLevel: 2,
    productIds: ['thermo-t3'],
    slides: [
      {
        type: 'cover',
        title: 'L-CARNITINA',
        subtitle: '¿Quemador de grasas o solo marketing?',
        content: '"Carnis" = carne en latín\nTu cuerpo la produce naturalmente',
        highlight: { text: 'Lo encontrás en:', sub: 'THERMO T3' },
      },
      {
        type: 'what',
        title: '¿QUÉ ES?',
        content: 'La L-Carnitina es un compuesto natural que tu cuerpo produce a partir de dos aminoácidos: lisina y metionina. Su función principal es transportar ácidos grasos hacia las mitocondrias (las "centrales eléctricas" de tus células).',
        highlight: { text: 'La verdad honesta', sub: 'NO es una "quema grasa mágica" si tu cuerpo ya produce suficiente' },
      },
      {
        type: 'benefits',
        title: '¿PARA QUÉ SIRVE?',
        items: [
          { icon: '🚛', title: 'Transporte de grasas', desc: 'Lleva grasas a las mitocondrias' },
          { icon: '😓', title: 'Reduce fatiga', desc: 'Menos fatiga muscular' },
          { icon: '🔄', title: 'Recuperación', desc: 'Apoyo post-ejercicio' },
          { icon: '🧠', title: 'Función cerebral', desc: 'Apoya salud cognitiva' },
        ],
        content: 'Útil en: vegetarianos, deportistas de alto rendimiento, adultos mayores.',
      },
      {
        type: 'evidence',
        title: '¿FUNCIONA REALMENTE?',
        content: '⚠️ EVIDENCIA MIXTA. Para pérdida de grasa: los estudios NO muestran efecto significativo. Para recuperación muscular: algunos estudios sugieren beneficio, pero resultados inconsistentes. NO es el ingrediente "estrella" de Thermo T3.',
        study: {
          quote: 'La L-Carnitina NO promovió pérdida de peso adicional en mujeres con sobrepeso que realizaban ejercicio aeróbico',
          source: 'Villani RG, et al. International Journal of Sport Nutrition (2000)',
        },
      },
      {
        type: 'product',
        title: 'LO ENCONTRÁS EN:',
        products: [
          { name: 'THERMO T3', desc: 'Té verde (evidencia sólida) + L-Carnitina + otros ingredientes termogénicos', image: '/images/thermo-t3.png', price: 1710 },
        ],
      },
    ],
  },
];
