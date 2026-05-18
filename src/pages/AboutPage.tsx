import { ExternalLink, Shield, Leaf, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-fx-green font-heading font-semibold text-sm uppercase tracking-wider">
            Nuestra Historia
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-fx-dark mt-2 mb-4">
            Sobre <span className="gradient-text">FuXion</span>
          </h1>
          <p className="text-fx-gray font-body max-w-2xl mx-auto">
            FuXion combina la sabiduría ancestral con la ciencia moderna 
            para crear productos naturales que transforman vidas.
          </p>
        </div>

        {/* Mission Card */}
        <div className="rounded-2xl p-8 md:p-10 bg-fx-gray-bg border border-fx-gray-lighter mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fx-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-heading font-bold text-fx-dark mb-4">
              🌿 Nuestra Misión
            </h2>
            <p className="text-fx-gray font-body leading-relaxed mb-4">
              FuXion es una empresa líder en nutrición funcional que utiliza 
              ingredientes de la biodiversidad amazónica y andina para crear 
              productos innovadores. Fundada con la visión de mejorar la calidad 
              de vida de las personas a través de la naturaleza, FuXion ha 
              transformado la vida de millones en más de 20 países.
            </p>
            <p className="text-fx-gray font-body leading-relaxed">
              En Uruguay, somos distribuidores autorizados comprometidos 
              con acercar estos productos de calidad premium a cada rincón 
              del país. Nuestro objetivo es ayudarte a alcanzar tu mejor 
              versión de forma natural y sostenible.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: Leaf,
              title: 'Ingredientes Naturales',
              desc: 'Utilizamos superalimentos de la biodiversidad amazónica y andina, seleccionados por sus propiedades nutricionales excepcionales.',
            },
            {
              icon: Shield,
              title: 'Ciencia + Naturaleza',
              desc: 'Cada producto es respaldado por investigación científica, combinando tecnología moderna con ingredientes ancestrales.',
            },
            {
              icon: Globe,
              title: 'Presencia Global',
              desc: 'Con presencia en más de 20 países, FuXion ha impactado positivamente la vida de millones de personas alrededor del mundo.',
            },
            {
              icon: Heart,
              title: 'Compromiso Social',
              desc: 'Trabajamos de la mano con comunidades locales para obtener nuestros ingredientes de manera sostenible y responsable.',
            },
          ].map((value) => (
            <div
              key={value.title}
              className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm hover:border-fx-green/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-fx-green/10 flex items-center justify-center mb-4 group-hover:bg-fx-green/15 transition-colors">
                <value.icon size={22} className="text-fx-green" />
              </div>
              <h3 className="font-heading font-bold text-fx-dark mb-2">
                {value.title}
              </h3>
              <p className="text-fx-gray text-sm font-body leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-3xl gradient-brand">
          <h3 className="font-heading font-bold text-white text-xl mb-3">
            Conocé más sobre FuXion
          </h3>
          <p className="text-white/80 text-sm font-body mb-6 max-w-md mx-auto">
            Visitá el sitio oficial de FuXion Uruguay para más información 
            sobre la empresa, productos y oportunidades.
          </p>
          <a
            href="https://fuxion.com/uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-fx-dark font-heading font-bold text-sm rounded-full hover:bg-white/90 transition-all shadow-lg uppercase tracking-wide"
          >
            Visitar fuxion.com/uy
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
