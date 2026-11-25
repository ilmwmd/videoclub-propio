import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import PosterImage from '../components/PosterImage';
import movieService from '../services/services';

export default function Catalogo() {
  const [filtroActivo, setFiltroActivo] = useState('TODAS');
  const [peliculasTotales, setPeliculasTotales] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [limiteVisible, setLimiteVisible] = useState(9);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);
  const [intentoCarga, setIntentoCarga] = useState(0);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [peliculaEnEdicion, setPeliculaEnEdicion] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState(null);
  const [guardandoEdicion, setGuardandoEdicion] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [errorAccion, setErrorAccion] = useState('');

  const filtros = ['TODAS', 'POPULARES', 'NUEVAS', 'CALIFICACIÓN', 'AÑO', 'GÉNERO'];

  useEffect(() => {
    const controller = new AbortController();

    const cargarPeliculas = async () => {
      setCargando(true);
      setErrorCarga(false);

      try {
        const { data } = await movieService.getAll(controller.signal);

        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no contiene una lista de películas.');
        }

        setPeliculasTotales(data);
        setPeliculas(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error al cargar las películas:', error);
          setErrorCarga(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    };

    cargarPeliculas();
    return () => controller.abort();
  }, [intentoCarga]);

  const handleFiltroClick = (filtro) => {
    setFiltroActivo(filtro);
    setLimiteVisible(6);

    let peliculasOrdenadas = [...peliculasTotales];

    switch (filtro) {
      case 'POPULARES':
      case 'CALIFICACIÓN':
        peliculasOrdenadas.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'NUEVAS':
        peliculasOrdenadas.sort((a, b) => b.anio - a.anio);
        break;
      case 'AÑO':
        peliculasOrdenadas.sort((a, b) => a.anio - b.anio);
        break;
      case 'GÉNERO':
        peliculasOrdenadas.sort((a, b) => a.genero.localeCompare(b.genero));
        break;
      case 'TODAS':
      default:
        peliculasOrdenadas = [...peliculasTotales];
        break;
    }

    setPeliculas(peliculasOrdenadas);
  };

  const handleCargarMas = () => {
    setLimiteVisible((prevLimite) => prevLimite + 9);
  };

  const handleIniciarEdicion = (event, pelicula) => {
    event.stopPropagation();
    setErrorAccion('');
    setPeliculaSeleccionada(null);
    setPeliculaEnEdicion(pelicula);
    setDatosEdicion({
      titulo: pelicula.titulo,
      desc: pelicula.desc,
      genero: pelicula.genero,
      calificacion: pelicula.calificacion,
      anio: pelicula.anio,
      portada: pelicula.portada,
    });
  };

  const handleGuardarEdicion = async (event) => {
    event.preventDefault();
    const peliculaActualizada = {
      ...datosEdicion,
      calificacion: Number(datosEdicion.calificacion),
      anio: Number(datosEdicion.anio),
    };

    setGuardandoEdicion(true);
    setErrorAccion('');

    try {
      await movieService.update(peliculaEnEdicion.id, peliculaActualizada);

      const actualizarPelicula = (pelicula) =>
        pelicula.id === peliculaEnEdicion.id
          ? { ...pelicula, ...peliculaActualizada }
          : pelicula;

      setPeliculasTotales((actuales) => actuales.map(actualizarPelicula));
      setPeliculas((actuales) => actuales.map(actualizarPelicula));
      setPeliculaEnEdicion(null);
      setDatosEdicion(null);
    } catch (error) {
      console.error('Error al editar la película:', error);
      setErrorAccion('No se pudo guardar la película. Inténtalo de nuevo.');
    } finally {
      setGuardandoEdicion(false);
    }
  };

  const handleEliminar = async (event, pelicula) => {
    event.stopPropagation();

    if (!window.confirm(`¿Seguro que quieres eliminar "${pelicula.titulo}"?`)) {
      return;
    }

    setEliminandoId(pelicula.id);
    setErrorAccion('');

    try {
      await movieService.delete(pelicula.id);
      setPeliculasTotales((actuales) =>
        actuales.filter((actual) => actual.id !== pelicula.id),
      );
      setPeliculas((actuales) =>
        actuales.filter((actual) => actual.id !== pelicula.id),
      );
      setPeliculaSeleccionada((actual) =>
        actual?.id === pelicula.id ? null : actual,
      );
    } catch (error) {
      console.error('Error al eliminar la película:', error);
      setErrorAccion('No se pudo eliminar la película. Inténtalo de nuevo.');
    } finally {
      setEliminandoId(null);
    }
  };

  const peliculasVisibles = peliculas.slice(0, limiteVisible);

  return (
    <PageLayout
      title="Catálogo"
      description={`Explora películas y series${filtroActivo !== 'TODAS' ? ` • Ordenado por: ${filtroActivo}` : ''}`}
    >
      <div className="mb-9 flex flex-wrap justify-center gap-2.5">
        {filtros.map((filtro) => {
          const activo = filtroActivo === filtro;
          return (
            <button
              key={filtro}
              type="button"
              onClick={() => handleFiltroClick(filtro)}
              disabled={cargando || errorCarga}
              className={`cursor-pointer rounded-full border px-5 py-2 text-[0.7rem] font-extrabold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                activo
                  ? 'border-brand-400 bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-[0_10px_24px_-10px_rgba(239,68,68,0.9)]'
                  : 'border-brand-500/20 bg-white/[0.03] text-slate-300 hover:border-brand-400/70 hover:text-white'
              }`}
            >
              {filtro}
            </button>
          );
        })}
      </div>

      {cargando && (
        <p role="status" className="text-center text-sm text-slate-400">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          Cargando películas...
        </p>
      )}

      {errorCarga && (
        <div role="alert" className="text-center">
          <p className="text-brand-300">
            No se pudieron cargar las películas. Comprueba que el servidor de
            datos está iniciado.
          </p>
          <button
            type="button"
            onClick={() => setIntentoCarga((intento) => intento + 1)}
            className="vc-btn-primary mt-5 px-6 py-2.5 text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !errorCarga && peliculas.length === 0 && (
        <p className="text-center text-slate-400">
          Todavía no hay películas en el catálogo.
        </p>
      )}

      {errorAccion && (
        <p role="alert" className="mb-6 text-center text-sm text-brand-300">
          {errorAccion}
        </p>
      )}

      {!cargando && !errorCarga && peliculas.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {peliculasVisibles.map((pelicula) => (
              <article
                key={pelicula.id}
                className="group relative h-[360px] w-full overflow-hidden rounded-2xl border border-brand-500/15 bg-[#08090e] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-[0_24px_50px_-20px_rgba(220,38,38,0.65)]"
              >
                <button
                  type="button"
                  onClick={() => setPeliculaSeleccionada(pelicula)}
                  aria-label={`Ver detalles de ${pelicula.titulo}`}
                  className="absolute inset-0 z-0 h-full w-full cursor-pointer text-left"
                >
                  <PosterImage
                    src={pelicula.portada}
                    alt={pelicula.titulo}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />

                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" aria-hidden="true" />
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brand-900/45 to-transparent" aria-hidden="true" />

                  <span className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 pb-6">
                    <span className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-brand-300/40 bg-black/55 px-3 py-1 text-[10px] font-extrabold tracking-wider text-brand-200 backdrop-blur-sm">
                        {pelicula.genero}
                      </span>
                      <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        {pelicula.calificacion}
                        <span className="text-amber-400">★</span>
                      </span>
                    </span>

                    <span className="block space-y-1">
                      <span className="block text-xs font-semibold tracking-widest text-brand-300">
                        {pelicula.anio}
                      </span>
                      <span className="vc-title block text-2xl font-extrabold leading-tight drop-shadow-lg">
                        {pelicula.titulo}
                      </span>
                      <span className="block translate-y-2 pt-1 text-xs font-bold text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Ver ficha →
                      </span>
                    </span>
                  </span>
                </button>
              </article>
            ))}
          </div>

          {limiteVisible < peliculas.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleCargarMas}
                className="vc-btn-ghost cursor-pointer px-7 py-3 text-xs uppercase tracking-wider"
              >
                Cargar más películas...
              </button>
            </div>
          )}
        </>
      )}

      {peliculaSeleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPeliculaSeleccionada(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="pelicula-catalogo-titulo"
            className="vc-panel w-full max-w-lg p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="vc-eyebrow">Ficha de película</span>
            <h2 id="pelicula-catalogo-titulo" className="vc-title mt-2 text-3xl font-black">
              {peliculaSeleccionada.titulo}
            </h2>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
              <span><strong className="text-brand-300">Género:</strong> {peliculaSeleccionada.genero}</span>
              <span><strong className="text-brand-300">Año:</strong> {peliculaSeleccionada.anio}</span>
              <span><strong className="text-brand-300">Calificación:</strong> {peliculaSeleccionada.calificacion} ★</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{peliculaSeleccionada.desc}</p>
            {errorAccion && (
              <p role="alert" className="mt-4 text-sm text-brand-300">
                {errorAccion}
              </p>
            )}
            <div className="mt-7 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(event) => handleIniciarEdicion(event, peliculaSeleccionada)}
                  className="vc-btn-primary px-5 py-2.5 text-sm"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={(event) => handleEliminar(event, peliculaSeleccionada)}
                  disabled={eliminandoId === peliculaSeleccionada.id}
                  className="vc-btn-ghost px-5 py-2.5 text-sm hover:border-red-500! hover:bg-red-700/40!"
                >
                  {eliminandoId === peliculaSeleccionada.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setPeliculaSeleccionada(null)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </section>
        </div>
      )}

      {peliculaEnEdicion && datosEdicion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!guardandoEdicion) {
              setPeliculaEnEdicion(null);
              setDatosEdicion(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="editar-pelicula-titulo"
            className="vc-panel my-auto w-full max-w-lg p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="vc-eyebrow">Actualizar ficha</span>
            <h2 id="editar-pelicula-titulo" className="vc-title mt-2 text-3xl font-black">
              Editar película
            </h2>
            <form onSubmit={handleGuardarEdicion} className="mt-6 space-y-4">
              <div>
                <label htmlFor="editar-titulo" className="mb-1.5 block text-sm font-semibold text-slate-300">
                  Título
                </label>
                <input
                  id="editar-titulo"
                  required
                  value={datosEdicion.titulo}
                  onChange={(event) =>
                    setDatosEdicion({ ...datosEdicion, titulo: event.target.value })
                  }
                  className="vc-input"
                />
              </div>
              <div>
                <label htmlFor="editar-desc" className="mb-1.5 block text-sm font-semibold text-slate-300">
                  Descripción
                </label>
                <textarea
                  id="editar-desc"
                  required
                  rows="3"
                  value={datosEdicion.desc}
                  onChange={(event) =>
                    setDatosEdicion({ ...datosEdicion, desc: event.target.value })
                  }
                  className="vc-input resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editar-genero" className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Género
                  </label>
                  <input
                    id="editar-genero"
                    required
                    value={datosEdicion.genero}
                    onChange={(event) =>
                      setDatosEdicion({ ...datosEdicion, genero: event.target.value })
                    }
                    className="vc-input"
                  />
                </div>
                <div>
                  <label htmlFor="editar-calificacion" className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Calificación
                  </label>
                  <input
                    id="editar-calificacion"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    value={datosEdicion.calificacion}
                    onChange={(event) =>
                      setDatosEdicion({
                        ...datosEdicion,
                        calificacion: event.target.value,
                      })
                    }
                    className="vc-input"
                  />
                </div>
                <div>
                  <label htmlFor="editar-anio" className="mb-1.5 block text-sm font-semibold text-slate-300">
                    Año
                  </label>
                  <input
                    id="editar-anio"
                    type="number"
                    min="1888"
                    required
                    value={datosEdicion.anio}
                    onChange={(event) =>
                      setDatosEdicion({ ...datosEdicion, anio: event.target.value })
                    }
                    className="vc-input"
                  />
                </div>
                <div>
                  <label htmlFor="editar-portada" className="mb-1.5 block text-sm font-semibold text-slate-300">
                    URL de la portada
                  </label>
                  <input
                    id="editar-portada"
                    type="url"
                    required
                    value={datosEdicion.portada}
                    onChange={(event) =>
                      setDatosEdicion({ ...datosEdicion, portada: event.target.value })
                    }
                    className="vc-input"
                  />
                </div>
              </div>
              {errorAccion && (
                <p role="alert" className="text-sm text-brand-300">
                  {errorAccion}
                </p>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPeliculaEnEdicion(null);
                    setDatosEdicion(null);
                  }}
                  disabled={guardandoEdicion}
                  className="vc-btn-ghost px-5 py-2.5 text-sm disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardandoEdicion}
                  className="vc-btn-primary px-5 py-2.5 text-sm"
                >
                  {guardandoEdicion ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </PageLayout>
  );
}
