import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ producto }) {
  const navigate = useNavigate();
  const imagen = producto.imagenes?.[0] || 'https://via.placeholder.com/400x250?text=Sin+imagen';

  return (
    <div className="product-card" onClick={() => navigate(`/producto/${producto.id}`)}>
      <div className="product-card-img">
        <img src={imagen} alt={producto.nombre} loading="lazy" />
        {producto.categoriaNombre && (
          <span className="product-card-badge">{producto.categoriaNombre}</span>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{producto.nombre}</h3>
        <p className="product-card-desc">{producto.descripcion}</p>
        <button className="btn btn-primary product-card-btn">Ver detalle</button>
      </div>
    </div>
  );
}
