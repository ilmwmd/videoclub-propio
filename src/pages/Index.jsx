import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PosterImage from '../components/PosterImage';

const peliculasIniciales = [
  {
    id: 1,
    titulo: 'Shelter: El Protector',
    categoria: 'ACCIÓN',
    desc: 'Un ex-agente debe proteger a una joven de una red criminal.',
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.OYY8WxeAxs4rgoCAtqHn0wHaKl%3Fr%3D0%26pid%3DApi&f=1&ipt=30ed885897a7ed4447b7b9c14815070dee4af39ff09506670dee9b5d28b0d312&ipo=images',
  },
  {
    id: 2,
    titulo: 'Venom',
    categoria: 'CIENCIA FICCIÓN',
    desc: 'Un periodista entra en contacto con un simbionte alienígena.',
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.YmwOe4TidzpeQeEyfmq8OwHaKq%3Fr%3D0%26pid%3DApi&f=1&ipt=1c82dbf8f39f0f8f1a0edd90de4be37fa9d24004aa4d55a7d595d8519d9a333d&ipo=images',
  },
  {
    id: 3,
    titulo: 'The Dark Knight',
    categoria: 'ACCIÓN',
    desc: 'Batman se enfrenta al Joker para salvar Gotham.',
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.C58MrUTynA5UG12vuT_jwwHaLH%3Fr%3D0%26pid%3DApi&f=1&ipt=91b401b3085f1d53e7cdcc72209108753d6715b6ed8d2c432ee618d8f33ce76e&ipo=images',
  },
];

function GridPeliculas({ peliculas, onSeleccionar }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {peliculas.map((pelicula) => (
        <button
          key={pelicula.id}
          type="button"
          className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl border border-brand-500/20 bg-[#08090e] text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-[0_24px_50px_-20px_rgba(220,38,38,0.6)]"
          onClick={() => onSeleccionar(pelicula)}
        >
          <PosterImage
            src={pelicula.img}
            alt={pelicula.titulo}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-brand-900/25" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
            <span className="vc-chip mb-2 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest">
              {pelicula.categoria}
            </span>
            <span className="vc-title block text-2xl font-extrabold text-white">{pelicula.titulo}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Index() {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  return (
    <PageLayout
      title="Acción Videoclub"
      description="Explora películas, descubre tus próximos favoritos y disfruta de nuestra selección de acción y otros géneros."
    >
      {/* Banner principal */}
      <div className="relative mb-12 overflow-hidden rounded-2xl border border-brand-500/20 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.28),transparent_55%),linear-gradient(120deg,#1a0b0e,#0a0b11)] px-6 py-10 text-center md:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-600/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-800/30 blur-3xl" aria-hidden="true" />
        <span aria-hidden="true" className="relative block text-4xl drop-shadow-[0_0_18px_rgba(239,68,68,0.8)]">🐉</span>
        <h2 className="vc-title relative mt-3 text-3xl font-black md:text-5xl">
          Tu próxima historia empieza aquí
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
          Un catálogo pensado para los que aman el cine: estrenos, clásicos y
          recomendaciones listas para disfrutar.
        </p>
        <div className="relative mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/catalogo" className="vc-btn-primary px-6 py-3 text-sm">
            Explorar catálogo
          </Link>
          <Link to="/ubicacion" className="vc-btn-ghost px-6 py-3 text-sm">
            Cómo llegar
          </Link>
        </div>
      </div>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="vc-eyebrow">Selección de la casa</span>
            <h2 className="vc-title mt-1 text-3xl font-black md:text-4xl">Estrenos destacados</h2>
          </div>
          <Link to="/catalogo" className="hidden text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200 sm:block">
            Ver todo →
          </Link>
        </div>
        <p className="mb-6 text-sm text-slate-400">
          Selección de películas para empezar a explorar.
        </p>
        <GridPeliculas
          peliculas={peliculasIniciales.slice(0, 3)}
          onSeleccionar={setPeliculaSeleccionada}
        />
      </section>

      {peliculaSeleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPeliculaSeleccionada(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pelicula-titulo"
            className="vc-panel w-full max-w-lg p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="vc-eyebrow">Estreno destacado</span>
            <h2 id="pelicula-titulo" className="vc-title mt-2 text-3xl font-black">
              {peliculaSeleccionada.titulo}
            </h2>
            <p className="mt-5 text-sm text-slate-300">
              <strong className="text-brand-300">Categoría:</strong> {peliculaSeleccionada.categoria}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{peliculaSeleccionada.desc}</p>
            <button
              type="button"
              className="vc-btn-primary mt-7 px-5 py-2.5 text-sm"
              onClick={() => setPeliculaSeleccionada(null)}
            >
              Cerrar
            </button>
          </section>
        </div>
      )}
    </PageLayout>
  );
}
