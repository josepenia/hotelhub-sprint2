import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import { getProductosAleatorios, getCategorias, getAllProductos } from '../services/api';
import './Home.css';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getProductosAleatorios(), getCategorias()])
      .then(([prods, cats]) => {
        setProductos(prods);
        setCategorias(cats);
      })
      .catch(() => setError('No se pudieron cargar los productos. Verificá que el backend esté corriendo.'))
      .finally(() => setLoading(false));
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    try {
      setLoading(true);
      const data = await getAllProductos(0, 10);
      const filtrados = data.content.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
      setProductos(filtrados);
    } catch {
      setError('Error al buscar productos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoria = async (catId) => {
    try {
      setLoading(true);
      const data = await getAllProductos(0, 10);
      const filtrados = data.content.filter(p => p.categoriaId === catId);
      setProductos(filtrados);
    } catch {
      setError('Error al filtrar por categoría.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerTodos = async () => {
    setBusqueda('');
    setLoading(true);
    try {
      const prods = await getProductosAleatorios();
      setProductos(prods);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home">
      {/* Buscador */}
      <section className="home-hero">
        <div className="container">
          <h1 className="home-hero-title">Encontrá tu habitación ideal</h1>
          <p className="home-hero-sub">Las mejores habitaciones al mejor precio</p>
          <form className="home-search" onSubmit={handleBuscar}>
            <input
              type="text"
              placeholder="Buscar habitaciones..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="home-search-input"
            />
            <button type="submit" className="btn btn-accent">Buscar</button>
            {busqueda && (
              <button type="button" className="btn btn-outline home-search-clear" onClick={handleVerTodos}>
                Ver todos
              </button>
            )}
          </form>
        </div>
      </section>

      <div className="container home-body">
        {/* Categorías */}
        <section className="home-cats">
          <h2 className="section-title">Categorías</h2>
          <div className="home-cats-grid">
            {categorias.map(cat => (
              <button
                key={cat.id}
                className="cat-chip"
                onClick={() => handleCategoria(cat.id)}
              >
                <span className="cat-icon">{cat.icono}</span>
                {cat.nombre}
              </button>
            ))}
          </div>
        </section>

        {/* Productos recomendados */}
        <section className="home-products">
          <h2 className="section-title">Recomendaciones</h2>

          {error && <div className="error-msg">{error}</div>}

          {loading ? (
            <div className="loading">Cargando habitaciones...</div>
          ) : productos.length === 0 ? (
            <p className="home-empty">No se encontraron resultados.</p>
          ) : (
            <div className="home-products-grid">
              {productos.map(p => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
