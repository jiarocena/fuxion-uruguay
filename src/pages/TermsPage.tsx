import { Shield, FileText, Truck, CreditCard, AlertTriangle, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-fx-gray-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-fx-dark mb-4">
            Términos y <span className="gradient-text">Condiciones</span>
          </h1>
          <p className="text-fx-gray font-body text-sm">
            Última actualización: Mayo 2026
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: FileText,
              title: '1. Información General',
              content:
                'Este sitio web es operado por un distribuidor autorizado de FuXion en Uruguay. Al realizar una compra a través de este sitio, aceptás los siguientes términos y condiciones. Los productos son comercializados bajo la marca FuXion y distribuidos desde Uruguay.',
            },
            {
              icon: Shield,
              title: '2. Productos',
              content:
                'Todos los productos ofrecidos son originales de la marca FuXion, importados oficialmente. Las descripciones, beneficios e información nutricional son proporcionados por el fabricante. Las imágenes son de referencia y pueden variar ligeramente del producto real.',
            },
            {
              icon: CreditCard,
              title: '3. Precios y Pagos',
              content:
                'Los precios están expresados en Pesos Uruguayos (UYU) e incluyen impuestos. Los métodos de pago aceptados incluyen: transferencia bancaria, Mercado Pago y efectivo contra entrega (solo en Montevideo). Los precios pueden cambiar sin previo aviso.',
            },
            {
              icon: Truck,
              title: '4. Envíos',
              content:
                'Los envíos en Montevideo se realizan en un plazo de 24-48 horas hábiles. Para el interior del país, el plazo es de 3-5 días hábiles. Los costos de envío se coordinan al momento de la compra vía WhatsApp. No realizamos envíos internacionales.',
            },
            {
              icon: AlertTriangle,
              title: '5. Devoluciones',
              content:
                'Se aceptan devoluciones dentro de los 7 días hábiles posteriores a la recepción del producto, siempre que este se encuentre en su embalaje original y sin abrir. Para gestionar una devolución, contactanos por WhatsApp al +598 99 003 391.',
            },
            {
              icon: Mail,
              title: '6. Contacto',
              content:
                'Para consultas, reclamos o sugerencias, podés contactarnos vía WhatsApp al +598 99 003 391. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas.',
            },
          ].map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-6 bg-white border border-fx-gray-lighter shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-fx-green/10 flex items-center justify-center">
                  <section.icon size={18} className="text-fx-green" />
                </div>
                <h2 className="font-heading font-bold text-fx-dark">
                  {section.title}
                </h2>
              </div>
              <p className="text-fx-gray text-sm font-body leading-relaxed pl-[3.25rem]">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
