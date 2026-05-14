import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../services/api';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(0);

  useEffect(() => {
    getProductoById(id)
      .then(setProducto)
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading" style={{ paddingTop: '6rem' }}>Cargando...</div>;
  if (error) return <div className="container" style={{ paddingTop: '6rem' }}><div className="error-msg">{error}</div></div>;
  if (!producto) return null;

  const imagenes = producto.imagenes || [];
  const imgPrincipal = imagenes[0] || 'https://via.placeholder.com/800x500?text=Sin+imagen';
  const imgSecundarias = imagenes.slice(1, 5);

  return (
    <main className="detail">
      {/* Header del detalle */}
      <div className="detail-header">
        <h1 className="detail-title">{producto.nombre}</h1>
        <button className="btn btn-outline detail-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>

      <div className="container detail-body">
        {/* Galería */}
        <section className="detail-gallery">
          {/* Imagen principal */}
          <div className="gallery-main" onClick={() => { setImagenActiva(0); setGaleriaAbierta(true); }}>
            <img src={imgPrincipal} alt={producto.nombre} />
          </div>

          {/* Grilla 2x2 secundarias */}
          <div className="gallery-grid">
            {imgSecundarias.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumb ${i === 3 ? 'gallery-thumb-last' : ''}`}
                onClick={() => { setImagenActiva(i + 1); setGaleriaAbierta(true); }}
              >
                <img src={img} alt={`${producto.nombre} ${i + 2}`} />
                {i === 3 && imagenes.length > 5 && (
                  <div className="gallery-more-overlay">
                    <span>Ver más</span>
                  </div>
                )}
              </div>
            ))}
            {imgSecundarias.length > 0 && (
              <button
                className="gallery-ver-mas"
                onClick={() => setGaleriaAbierta(true)}
              >
                Ver más imágenes
              </button>
            )}
          </div>
        </section>

        {/* Descripción */}
        <section className="detail-info">
          {producto.categoriaNombre && (
            <span className="detail-badge">{producto.categoriaNombre}</span>
          )}
          <h2 className="detail-subtitle">Descripción</h2>
          <p className="detail-desc">{producto.descripcion}</p>
          {producto.caracteristicas && producto.caracteristicas.length > 0 && (
            <div className="detail-caracts">
              <h3>Características</h3>
              <div className="detail-caracts-grid">
                {producto.caracteristicas.map(c => (
                  <div key={c.id} className="detail-caract-item">
                    <span>{c.icono}</span><span>{c.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="btn btn-primary detail-reserve">Reservar ahora</button>
        </section>
      </div>

      {/* Modal galería completa */}
      {galeriaAbierta && (
        <div className="gallery-modal" onClick={() => setGaleriaAbierta(false)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setGaleriaAbierta(false)}>✕</button>
            <img
              src={imagenes[imagenActiva] || imgPrincipal}
              alt={producto.nombre}
              className="gallery-modal-img"
            />
            <div className="gallery-modal-thumbs">
              {imagenes.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb ${i}`}
                  className={`gallery-modal-thumb ${i === imagenActiva ? 'active' : ''}`}
                  onClick={() => setImagenActiva(i)}
                />
              ))}
            </div>
            <div className="gallery-modal-nav">
              <button
                className="btn btn-outline"
                onClick={() => setImagenActiva(i => Math.max(0, i - 1))}
                disabled={imagenActiva === 0}
              >← Anterior</button>
              <span>{imagenActiva + 1} / {imagenes.length}</span>
              <button
                className="btn btn-outline"
                onClick={() => setImagenActiva(i => Math.min(imagenes.length - 1, i + 1))}
                disabled={imagenActiva === imagenes.length - 1}
              >Siguiente →</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
