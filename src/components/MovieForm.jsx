import { useState } from 'react';
import movieService from '../services/services';
import PosterImage from './PosterImage';

const formularioVacio = {
  titulo: '',
  desc: '',
  genero: '',
  calificacion: '',
  anio: '',
  portada: '',
};

export default function MovieForm() {
  const [formData, setFormData] = useState(formularioVacio);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((actuales) => ({ ...actuales, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEnviando(true);
    setMensaje('');

    const nuevaPelicula = {
      ...formData,
      calificacion: Number(formData.calificacion),
      anio: Number(formData.anio),
    };

    try {
      await movieService.create(nuevaPelicula);
      setMensaje('¡Película añadida correctamente!');
      setFormData(formularioVacio);
    } catch (error) {
      console.error('Error al añadir la película:', error);
      setMensaje('No se ha podido añadir la película. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const handleReset = () => {
    setFormData(formularioVacio);
    setMensaje('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Título */}
      <div className="flex flex-col gap-2">
        <label htmlFor="titulo" className="text-sm font-semibold text-slate-300">
          Título de la película
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
          placeholder="Ej. Interstellar"
          className="vc-input"
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-2">
        <label htmlFor="desc" className="text-sm font-semibold text-slate-300">
          Descripción
        </label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Describe brevemente la película"
          className="vc-input resize-none"
        />
      </div>

      {/* Género y calificación */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="genero" className="text-sm font-semibold text-slate-300">
            Género
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="vc-input cursor-pointer"
          >
            <option value="" disabled>Selecciona un género</option>
            <option value="ACCIÓN">Acción</option>
            <option value="ANIMACIÓN">Animación</option>
            <option value="AVENTURA">Aventura</option>
            <option value="BÉLICA">Bélica</option>
            <option value="BIOGRÁFICA">Biográfica</option>
            <option value="CIENCIA FICCIÓN">Ciencia ficción</option>
            <option value="COMEDIA">Comedia</option>
            <option value="DRAMA">Drama</option>
            <option value="FANTASÍA">Fantasía</option>
            <option value="ROMANCE">Romance</option>
            <option value="SUSPENSO">Suspenso</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="calificacion" className="text-sm font-semibold text-slate-300">
            Calificación
          </label>
          <input
            type="number"
            id="calificacion"
            name="calificacion"
            min="0"
            max="5"
            step="0.1"
            value={formData.calificacion}
            onChange={handleChange}
            required
            placeholder="Ej. 4.8"
            className="vc-input"
          />
        </div>
      </div>

      {/* Año y portada */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="anio" className="text-sm font-semibold text-slate-300">
            Año de estreno
          </label>
          <input
            type="number"
            id="anio"
            name="anio"
            required
            value={formData.anio}
            onChange={handleChange}
            min="1888"
            placeholder="Ej. 2024"
            className="vc-input"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="portada" className="text-sm font-semibold text-slate-300">
            URL de la portada
          </label>
          <input
            type="url"
            id="portada"
            name="portada"
            value={formData.portada}
            onChange={handleChange}
            required
            placeholder="https://..."
            className="vc-input"
          />
        </div>
      </div>

      {/* Vista previa del póster remoto */}
      <div className="flex items-center gap-4 rounded-xl border border-brand-500/15 bg-black/25 p-4">
        <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-brand-500/25 shadow-lg">
          <PosterImage src={formData.portada} alt={formData.titulo || 'Vista previa'} />
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">
            Vista previa
          </p>
          <p className="mt-2 text-sm text-slate-400">
            La portada se carga desde la URL indicada. Si no está disponible,
            mostraremos nuestro póster de reserva.
          </p>
        </div>
      </div>

      {mensaje && (
        <p
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm ${
            mensaje.startsWith('¡')
              ? 'border-brand-500/30 bg-brand-700/15 text-brand-200'
              : 'border-red-500/30 bg-red-700/15 text-red-200'
          }`}
        >
          {mensaje}
        </p>
      )}

      {/* Botones */}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row">
        <button type="submit" disabled={enviando} className="vc-btn-primary flex-1 px-6 py-3.5 text-sm uppercase tracking-wider">
          {enviando ? 'Añadiendo...' : 'Añadir película'}
        </button>
        <button type="button" onClick={handleReset} className="vc-btn-ghost flex-1 px-6 py-3.5 text-sm uppercase tracking-wider">
          Limpiar formulario
        </button>
      </div>
    </form>
  );
}
