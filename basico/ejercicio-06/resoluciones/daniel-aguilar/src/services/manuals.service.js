const fs = require('node:fs/promises');
const path = require('node:path');

const MANUALS_DIR = path.resolve(__dirname, '..', '..', 'data', 'manuals');
const ALLOWED_EXTENSION = '.txt';

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

/**
 * Convierte el nombre que envia el cliente en una ruta absoluta DENTRO de MANUALS_DIR.
 * Si el resultado se sale de esa carpeta (path traversal) se rechaza.
 */
function resolveSafePath(fileName) {
  if (typeof fileName !== 'string' || fileName.trim() === '') {
    throw httpError(400, 'Debes enviar el parametro "file"');
  }
  if (fileName.includes('\0')) {
    throw httpError(400, 'Nombre de archivo invalido');
  }

  const target = path.resolve(MANUALS_DIR, fileName);
  const relative = path.relative(MANUALS_DIR, target);

  if (relative === '' || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw httpError(403, 'Ruta fuera de la carpeta permitida');
  }
  if (path.extname(target).toLowerCase() !== ALLOWED_EXTENSION) {
    throw httpError(400, `Solo se permiten archivos ${ALLOWED_EXTENSION}`);
  }
  return target;
}

async function listManuals() {
  const entries = await fs.readdir(MANUALS_DIR);
  return entries.filter((name) => path.extname(name) === ALLOWED_EXTENSION).sort();
}

async function readManual(fileName) {
  const target = resolveSafePath(fileName);
  try {
    return await fs.readFile(target, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') throw httpError(404, 'Manual no encontrado');
    if (error.code === 'EISDIR') throw httpError(400, 'La ruta indicada es una carpeta');
    throw error;
  }
}

module.exports = { resolveSafePath, listManuals, readManual };
