# Ejercicio 06 — path y rutas seguras

**Temática:** motos y mecánica · **Nivel:** Básico inicial

## Objetivo

Usar el módulo `path` para construir rutas de forma segura y evitar **path traversal**: que un cliente lea archivos fuera de la carpeta permitida enviando valores como `../../package.json`.

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
ejercicio-06/
├── package.json
├── README.md
├── data/
│   ├── private.txt          # NO debe poder leerse desde la API
│   └── manuals/
│       ├── engine.txt
│       ├── brakes.txt
│       └── chain.txt
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/index.js
│   ├── controllers/manuals.controller.js
│   └── services/manuals.service.js
└── test/app.test.js
```

## Endpoints

| Método | Ruta | Descripción | Códigos |
| --- | --- | --- | --- |
| GET | `/health` | Estado del servicio | 200 |
| GET | `/basico/ejercicio-06` | Endpoint principal | 200 |
| GET | `/manuals` | Lista los manuales `.txt` | 200 |
| GET | `/manuals/read?file=engine.txt` | Lee un manual | 200, 400, 403, 404 |

## Ejemplos

```bash
curl http://localhost:3000/manuals
curl "http://localhost:3000/manuals/read?file=engine.txt"

# Intentos de salir de la carpeta (todos responden 403)
curl -i "http://localhost:3000/manuals/read?file=../private.txt"
curl -i "http://localhost:3000/manuals/read?file=../../package.json"
curl -i "http://localhost:3000/manuals/read?file=/etc/passwd"

curl -i "http://localhost:3000/manuals/read"                # 400: falta el parámetro
curl -i "http://localhost:3000/manuals/read?file=notas.md"  # 400: extensión no permitida
curl -i "http://localhost:3000/manuals/read?file=nada.txt"  # 404: no existe
```

## Cómo se valida la ruta

1. Se resuelve el nombre contra la carpeta base: `path.resolve(MANUALS_DIR, file)`.
2. Se calcula `path.relative(MANUALS_DIR, target)`.
3. Si el resultado empieza con `..` o es absoluto, el archivo está **fuera** de la carpeta → `403`.
4. Solo se aceptan archivos con extensión `.txt`.

Concatenar strings (`'data/manuals/' + file`) sería inseguro: `path.resolve` normaliza los `..` y permite comprobar el destino real.

## Errores manejados

| Caso | Código |
| --- | --- |
| Falta `file` o contiene caracteres nulos | 400 |
| Extensión distinta de `.txt` | 400 |
| Ruta fuera de la carpeta permitida | 403 |
| Manual inexistente | 404 |

## Pruebas

```bash
npm test
```
