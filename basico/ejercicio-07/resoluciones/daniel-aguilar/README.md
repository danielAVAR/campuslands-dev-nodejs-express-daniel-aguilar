# Ejercicio 07 — process.argv y CLI

**Temática:** autos de lujo · **Nivel:** Básico inicial

## Objetivo

Leer argumentos de la línea de comandos con `process.argv`, construir una pequeña CLI con comandos y opciones, y devolver códigos de salida correctos. La misma lógica de negocio (`cars.service.js`) se reutiliza desde la CLI y desde la API.

## Requisitos

- Node.js 20 o superior

## Instalación y ejecución

```bash
npm install
npm start          # API en http://localhost:3000
npm run dev
npm test
```

## Uso de la CLI

```bash
npm run cli -- help
npm run cli -- list
npm run cli -- find 2
npm run cli -- search --brand=Bentley
npm run cli -- search --brand Bentley --max 220000
npm run cli -- list --json
```

> Con `npm run`, los argumentos del script van después de `--`. También puede ejecutarse directo: `node src/cli.js list`.

Ejemplo de salida:

```text
$ node src/cli.js find 2
#2 Rolls-Royce Ghost (2023) - USD 355,000
```

### Códigos de salida

| Situación | Exit code |
| --- | --- |
| Comando ejecutado correctamente | 0 |
| Falta un id, id inválido, auto inexistente, `--max` inválido o comando desconocido | 1 |

## Cómo funciona `process.argv`

`process.argv` es un arreglo: `[ruta de node, ruta del script, ...argumentos]`. Se usa `process.argv.slice(2)` para quedarse solo con lo que escribió el usuario, y `src/utils/args.js` lo transforma en `{ command, positional, flags }`. Soporta `--flag=valor`, `--flag valor` y `--flag` (booleano).

## Estructura

```text
ejercicio-07/
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   ├── cli.js
│   ├── utils/args.js
│   ├── routes/index.js
│   ├── controllers/cars.controller.js
│   └── services/cars.service.js
└── test/app.test.js
```

## Endpoints de la API

| Método | Ruta | Descripción | Códigos |
| --- | --- | --- | --- |
| GET | `/health` | Estado del servicio | 200 |
| GET | `/basico/ejercicio-07` | Endpoint principal | 200 |
| GET | `/cars?brand=Bentley&max=220000` | Lista con filtros opcionales | 200, 400 |
| GET | `/cars/:id` | Detalle de un auto | 200, 400, 404 |

```bash
curl http://localhost:3000/cars
curl "http://localhost:3000/cars?brand=Bentley&max=220000"
curl -i http://localhost:3000/cars/99     # 404
```

## Pruebas

```bash
npm test
```

Las pruebas cubren el parser de argumentos, la CLI (salida y exit codes) y la API.
