import PageLayout from '../components/PageLayout';

const datosContacto = [
  {
    icono: '📍',
    titulo: 'Dirección Principal',
    lineas: ['Av. Principal del Cine #452, Local 3', 'Ciudad de la Ficción, CP 44100'],
  },
  {
    icono: '🕒',
    titulo: 'Horarios de Atención',
    lineas: ['Lunes a Viernes: 10:00 AM - 10:00 PM', 'Sábados y Domingos: 12:00 PM - 11:30 PM'],
  },
  {
    icono: '📞',
    titulo: 'Contacto Directo',
    lineas: ['Teléfono: +34 900 555 333', 'Email: contacto@accionvideoclub.com'],
  },
];

export default function Ubicacion() {
  return (
    <PageLayout
      title="Nuestra Ubicación"
      description="Ven a visitarnos, descubre nuestros estrenos en físico y vive la mejor experiencia de cine."
    >
      <div id="ubicacion" className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="vc-panel min-w-0 space-y-7 overflow-hidden p-6 lg:col-span-1">
          {datosContacto.map((dato) => (
            <div key={dato.titulo} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-400/30 bg-brand-700/20 text-lg shadow-[0_0_18px_rgba(220,38,38,0.25)]">
                {dato.icono}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-xs font-extrabold uppercase tracking-[0.18em] text-brand-300">
                  {dato.titulo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {dato.lineas.map((linea) => (
                    <span key={linea} className="block break-words [overflow-wrap:anywhere]">
                      {linea}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[400px] min-w-0 overflow-hidden rounded-2xl border border-brand-500/20 bg-[#08090e] shadow-xl md:h-[450px] lg:col-span-2">
          <iframe
            title="Mapa de Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194154846819!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1ses!2sus!4v1625000000000!5m2!1ses!2sus"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0 [filter:invert(90%)_hue-rotate(180deg)_contrast(125%)] opacity-85"
          />

          <div className="absolute inset-x-4 bottom-4 flex min-w-0 flex-col items-center justify-between gap-3 rounded-xl border border-brand-500/20 bg-[#0a0709]/90 p-4 backdrop-blur-md sm:flex-row">
            <div className="min-w-0">
              <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-brand-400">
                Sucursal Central
              </span>
              <h3 className="vc-title mt-1 break-words text-lg font-bold text-white">
                Acción Videoclub Store
              </h3>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="vc-btn-primary shrink-0 whitespace-nowrap px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
