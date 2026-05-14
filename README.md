# HotelHub – Sistema de Reservas 🏨
> Sprint 1 – Desafío Profesional

## Estructura del proyecto

```
hotel-reservas/
├── backend/          → API REST con Java Spring Boot
└── frontend/         → Interfaz web con React
```

---

## Backend (Spring Boot)

### Requisitos
- Java 17+
- Maven

### Cómo correr

```bash
cd backend
./mvnw spring-boot:run
```

La API corre en `http://localhost:8080`

### Endpoints disponibles

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/productos/aleatorios` | Hasta 10 productos aleatorios (Home) |
| GET | `/api/productos?page=0&size=10` | Listado paginado |
| GET | `/api/productos/{id}` | Detalle de un producto |
| POST | `/api/productos` | Crear producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |
| GET | `/api/categorias` | Listar categorías |

### Consola H2 (base de datos)
Disponible en `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:hoteldb`
- Usuario: `sa` / Sin contraseña

---

## Frontend (React)

### Requisitos
- Node.js 16+
- npm

### Cómo correr

```bash
cd frontend
npm install
npm start
```

La app corre en `http://localhost:3000`

### Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con buscador, categorías y productos aleatorios |
| `/producto/:id` | Detalle con galería de imágenes |
| `/administracion` | Panel admin (agregar, listar, eliminar) |

---

## User Stories implementadas (Sprint 1)

- ✅ #1 Header fijo con logo, lema y botones
- ✅ #2 Main con buscador, categorías y recomendaciones
- ✅ #3 Agregar producto (panel admin)
- ✅ #4 Visualizar hasta 10 productos aleatorios en el Home
- ✅ #5 Detalle de producto
- ✅ #6 Galería de imágenes (principal + grilla 2x2 + "Ver más")
- ✅ #7 Footer con isologotipo, año y copyright
- ✅ #8 Paginación de productos
- ✅ #9 Panel de administración en `/administracion`
- ✅ #10 Listar productos (con ID, Nombre y Acciones)
- ✅ #11 Eliminar producto con confirmación

---

## Tecnologías

- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, H2 Database, Lombok
- **Frontend:** React 18, React Router v6, Axios, CSS puro
