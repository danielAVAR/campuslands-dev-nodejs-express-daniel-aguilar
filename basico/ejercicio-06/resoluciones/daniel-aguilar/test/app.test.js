const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let base;

before(
  () =>
    new Promise((resolve) => {
      server = app.listen(0, () => {
        base = `http://localhost:${server.address().port}`;
        resolve();
      });
    })
);
after(() => server.close());

const get = (path) => fetch(base + path);
const send = (method, path, body) =>
  fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
const { resolveSafePath } = require('../src/services/manuals.service');

test('GET /basico/ejercicio-06', async () => {
  const body = await (await get('/basico/ejercicio-06')).json();
  assert.equal(body.topic, 'path y rutas seguras');
});

test('GET /manuals lista los .txt', async () => {
  const body = await (await get('/manuals')).json();
  assert.deepEqual(body.manuals, ['brakes.txt', 'chain.txt', 'engine.txt']);
});

test('GET /manuals/read lee un manual valido', async () => {
  const res = await get('/manuals/read?file=engine.txt');
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.match(body.content, /MOTOR/);
});

test('rechaza path traversal con 403', async () => {
  for (const file of ['../private.txt', '../../package.json', '..%2F..%2Fpackage.json', '/etc/passwd']) {
    const res = await get(`/manuals/read?file=${file}`);
    assert.equal(res.status, 403, file);
  }
});

test('valida parametro faltante, extension y archivo inexistente', async () => {
  assert.equal((await get('/manuals/read')).status, 400);
  assert.equal((await get('/manuals/read?file=notas.md')).status, 400);
  assert.equal((await get('/manuals/read?file=nada.txt')).status, 404);
});

test('resolveSafePath devuelve una ruta dentro de la carpeta permitida', () => {
  assert.ok(resolveSafePath('engine.txt').endsWith('engine.txt'));
  assert.throws(() => resolveSafePath('../x.txt'), { status: 403 });
});
