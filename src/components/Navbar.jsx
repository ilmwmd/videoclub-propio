import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/add-movie', label: 'Formulario' },
  { to: '/ubicacion', label: 'Ubicación' },
];

function enlaceClass({ isActive }) {
  return `relative py-1 font-semibold transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand-500 after:transition-transform after:duration-200 hover:text-brand-300 hover:after:scale-x-100 ${
    isActive
      ? 'text-brand-400 after:scale-x-100'
      : 'text-slate-300'
  }`;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-500/20 bg-[#0a0709]/85 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-8">
        {/* Logo: mismo dragón rojo que el favicon */}
        <NavLink to="/" className="flex items-center gap-3 group" aria-label="Ir al inicio">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 text-xl ring-2 ring-brand-400/70 shadow-[0_0_28px_rgba(239,68,68,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            🐉
            <span className="absolute -inset-1 rounded-full border border-brand-400/30 animate-pulse" aria-hidden="true" />
          </span>

          <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-widest text-white">
            Acción
            <span className="mt-0.5 block text-[0.62rem] font-semibold tracking-[0.38em] text-brand-400">
              Videoclub
            </span>
          </span>
        </NavLink>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Navegación principal">
          {enlaces.map((enlace) => (
            <NavLink key={enlace.to} to={enlace.to} className={enlaceClass} end={enlace.to === '/'}>
              {enlace.label}
            </NavLink>
          ))}
          <span className="vc-chip px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest">
            <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
            Cartelera activa
          </span>
        </nav>

        {/* Botón de menú móvil */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((abierto) => !abierto)}
          className="rounded-lg border border-brand-500/30 px-3 py-2 text-2xl leading-none text-white transition-colors hover:bg-brand-700/30 md:hidden"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú móvil animado */}
      <nav
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-brand-500/20 bg-[#0a0709]/98 backdrop-blur-xl transition-all duration-300 ease-out md:hidden ${
          isMenuOpen
            ? 'max-h-80 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0 -translate-y-2'
        }`}
        aria-label="Navegación móvil"
      >
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            end={enlace.to === '/'}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block border-b border-white/5 px-6 py-4 font-semibold transition-colors ${
                isActive ? 'bg-brand-700/20 text-brand-300' : 'text-slate-300 hover:bg-brand-700/10 hover:text-brand-300'
              }`
            }
          >
            {enlace.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
