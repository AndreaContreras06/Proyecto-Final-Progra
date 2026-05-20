# Proyecto Final 3er Trimestre — Galería Serie C
## Grupo 2

---

## Estructura del proyecto

```
galeria-proyecto/
├── backend/                        ← Proyecto Spring Boot (API REST)
│   ├── pom.xml
│   └── src/main/java/com/galeria/
│       ├── GaleriaApiApplication.java   ← Clase principal (arranque)
│       ├── model/
│       │   └── Elemento.java            ← POJO con los campos
│       ├── repository/
│       │   └── GaleriaRepository.java   ← Datos en memoria (sin BD)
│       └── controller/
│           └── GaleriaController.java   ← Endpoints REST
│
└── frontend/                       ← Archivos HTML (cliente)
    ├── index.html                   ← Galería principal con Bootstrap
    └── registro.html                ← Formulario de registro
```

---

## Cómo arrancar el proyecto

### 1. Backend — Spring Boot

**Requisitos:** Java 17+ y Maven instalados.

```bash
cd backend
mvn spring-boot:run
```

El servidor arranca en `http://localhost:8080`.
Deja esta terminal abierta mientras usas la galería.

**Verificar que funciona:**
Abre en el navegador: http://localhost:8080/api/galeria
Debe devolver un JSON con los 19 elementos.

### 2. Frontend — HTML

Abre `frontend/index.html` directamente en el navegador
(doble clic, o con un servidor local como Live Server en VS Code).

> **Nota:** Asegúrate de que el backend ya está en marcha antes de
> pulsar "Cargar galería" en el HTML.

---

## API REST — Endpoints

| Método | URL                        | Descripción                        |
|--------|----------------------------|------------------------------------|
| GET    | /api/galeria               | Lista todos los elementos          |
| GET    | /api/galeria/{id}          | Devuelve un elemento por ID        |
| POST   | /api/galeria               | Crea un nuevo elemento             |
| PUT    | /api/galeria/{id}          | Actualiza un elemento existente    |
| DELETE | /api/galeria/{id}          | Elimina un elemento                |

### Ejemplo de JSON para POST / PUT

```json
{
  "titulo": "Mi película",
  "categoria": "Terror - Comedia",
  "anio": 2024,
  "descripcion": "Sinopsis de la película..."
}
```

---

## Cambios respecto al 2º trimestre

| Aspecto          | 2º Trimestre              | 3er Trimestre                     |
|------------------|---------------------------|-----------------------------------|
| Datos            | `galeria.xml` (XML local) | API REST con Spring Boot (JSON)   |
| Estilos          | CSS custom propio         | Bootstrap 5 + CSS custom          |
| Imágenes         | Sí (carpeta `img/`)       | No (eliminadas según requisitos)  |
| CRUD             | Solo lectura              | Crear, leer, actualizar, eliminar |
| Iconos           | Texto/emoji               | Bootstrap Icons                   |

---

## Funcionalidades implementadas

- **Cargar galería** desde la API REST (GET /api/galeria)
- **Buscar** por título (filtro en tiempo real)
- **Filtrar** por género
- **Ver detalle** de un elemento en modal (requiere registro)
- **Añadir** nuevo elemento → POST /api/galeria
- **Editar** elemento existente → PUT /api/galeria/{id}
- **Eliminar** elemento → DELETE /api/galeria/{id}
- **Registro de usuario** (localStorage, sin backend de usuarios)
