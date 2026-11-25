import { useState } from 'react';

/**
 * Carga el póster desde una URL remota. Si falla, muestra un marcador
 * con la identidad visual del videoclub en lugar de una imagen rota.
 */
export default function PosterImage({ src, alt, className = '', loading = 'lazy' }) {
  const [estado, setEstado] = useState({ src, fallo: false });

  // Si cambia la URL, reiniciamos el estado derivado sin necesidad de un efecto.
  if (estado.src !== src) {
    setEstado({ src, fallo: false });
  }

  const fallo = estado.src === src && estado.fallo;

  if (!src || fallo) {
    return (
      <div className={`vc-poster-fallback ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true" className="vc-poster-fallback__dragon">🐉</span>
        <span className="vc-poster-fallback__title">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      className={`vc-poster ${className}`}
      onError={() => setEstado({ src, fallo: true })}
    />
  );
}
