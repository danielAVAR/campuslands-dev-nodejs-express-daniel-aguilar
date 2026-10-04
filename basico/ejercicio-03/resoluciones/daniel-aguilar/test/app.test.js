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

test('GET /basico/ejercicio-03', async () => {
  const body = await (await get('/basico/ejercicio-03')).json();
  assert.equal(body.topic, 'modulos CommonJS');
});

test('GET /heroes devuelve los roles formateados', async () => {
  const body = await (await get('/heroes')).json();
  assert.equal(body.heroes[0].role, 'Mid');
  assert.equal(body.heroes[1].role, 'Tank');
});

test('GET /heroes/:id valida y maneja errores', async () => {
  assert.equal((await get('/heroes/3')).status, 200);
  assert.equal((await get('/heroes/99')).status, 404);
  assert.equal((await get('/heroes/abc')).status, 400);
});
