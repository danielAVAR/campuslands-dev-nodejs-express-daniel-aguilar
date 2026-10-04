# Ejercicio 03 — Módulos CommonJS

**Temática:** MOBA esports · **Nivel:** Básico inicial

## Objetivo

Practicar el sistema de módulos **CommonJS** (`require` / `module.exports`) organizando una API pequeña de héroes de un MOBA en varios archivos.

## Requisitos

- Node.js 20 o superior

## Instalación y ejecución

```bash
npm install
npm start
npm run dev
npm test
```

Servidor en `http://localhost:3000` (configurable con `PORT`).

## Estructura

```text
ejercicio-03/
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/index.js
│   ├── controllers/heroes.controller.js
│   ├── services/heroes.service.js
│   └── utils/format.js
└── test/app.test.js
```

## Cómo se usa CommonJS aquí

| Archivo | Forma de exportar | Forma de importar |
| --- | --- | --- |
| `utils/format.js` | `module.exports = formatRole` (una función) | `const formatRole = require('../utils/format')` |
| `services/heroes.service.js` | `module.exports = { listHeroes, getHeroById }` (un objeto) | `const { listHeroes } = require(...)` |
| `controllers/heroes.controller.js` | `module.exports = { info, list, detail }` | `const controller = require(...)` |

## Endpoints

| Método | Ruta | Descripción | Códigos |
| --- | --- | --- | --- |
| GET | `/health` | Estado del servicio | 200 |
| GET | `/basico/ejercicio-03` | Endpoint principal | 200 |
| GET | `/heroes` | Lista de héroes | 200 |
| GET | `/heroes/:id` | Detalle de un héroe | 200, 400, 404 |

## Ejemplos

```bash
curl http://localhost:3000/basico/ejercicio-03
curl http://localhost:3000/heroes
curl http://localhost:3000/heroes/3
curl -i http://localhost:3000/heroes/abc    # 400
curl -i http://localhost:3000/heroes/99     # 404
```

Respuesta de `GET /heroes/3`:

```json
{
  "ok": true,
  "hero": { "id": 3, "name": "Cielo", "role": "Support", "winRate": 54.1 }
}
```

## Errores manejados

- `400` si el `id` no es un entero positivo.
- `404` si el héroe no existe o la ruta es desconocida.

## Pruebas

```bash
npm test
```
