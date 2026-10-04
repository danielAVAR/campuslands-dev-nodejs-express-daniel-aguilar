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
const { execFileSync, spawnSync } = require('node:child_process');
const path = require('node:path');
const { parseArgs } = require('../src/utils/args');

const CLI = path.join(__dirname, '..', 'src', 'cli.js');
const runCli = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf-8' });

test('GET /basico/ejercicio-07', async () => {
  const body = await (await get('/basico/ejercicio-07')).json();
  assert.equal(body.topic, 'process.argv y CLI');
});

test('API: filtros y errores', async () => {
  const body = await (await get('/cars?brand=bentley&max=220000')).json();
  assert.equal(body.total, 1);
  assert.equal((await get('/cars?max=abc')).status, 400);
  assert.equal((await get('/cars/99')).status, 404);
});

test('parseArgs entiende flags con = y con espacio', () => {
  assert.deepEqual(parseArgs(['search', '--brand=Bentley', '--max', '230000', '--json']), {
    command: 'search',
    positional: [],
    flags: { brand: 'Bentley', max: '230000', json: true },
  });
  assert.deepEqual(parseArgs(['find', '3']).positional, ['3']);
});

test('CLI list y find funcionan con exit code 0', () => {
  const out = execFileSync(process.execPath, [CLI, 'find', '2'], { encoding: 'utf-8' });
  assert.match(out, /Rolls-Royce Ghost/);
  assert.match(runCli('search', '--brand=Bentley', '--json').stdout, /"Continental GT"/);
});

test('CLI devuelve exit code 1 ante errores', () => {
  assert.equal(runCli('find', 'abc').status, 1);
  assert.equal(runCli('find', '99').status, 1);
  assert.equal(runCli('volar').status, 1);
});
