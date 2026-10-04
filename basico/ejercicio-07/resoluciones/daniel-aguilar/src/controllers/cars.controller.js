const { listCars, findCarById } = require('../services/cars.service');

const info = (req, res) =>
  res.json({
    ok: true,
    message: 'Ejercicio ejecutado correctamente',
    topic: 'process.argv y CLI',
  });

function list(req, res) {
  const filters = {};
  if (req.query.brand) filters.brand = String(req.query.brand);
  if (req.query.max !== undefined) {
    const max = Number(req.query.max);
    if (!Number.isFinite(max) || max <= 0) {
      return res.status(400).json({ ok: false, message: 'max debe ser un numero positivo' });
    }
    filters.maxPrice = max;
  }
  const cars = listCars(filters);
  res.json({ ok: true, total: cars.length, cars });
}

function detail(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ ok: false, message: 'El id debe ser un entero positivo' });
  }
  const car = findCarById(id);
  if (!car) return res.status(404).json({ ok: false, message: 'Auto no encontrado' });
  res.json({ ok: true, car });
}

module.exports = { info, list, detail };
