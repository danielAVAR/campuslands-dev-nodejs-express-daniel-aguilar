const { listHeroes, getHeroById } = require('../services/heroes.service');

function info(req, res) {
  res.json({
    ok: true,
    message: 'Ejercicio ejecutado correctamente',
    topic: 'modulos CommonJS',
  });
}

function list(req, res) {
  res.json({ ok: true, heroes: listHeroes() });
}

function detail(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ ok: false, message: 'El id debe ser un entero positivo' });
  }
  const hero = getHeroById(id);
  if (!hero) {
    return res.status(404).json({ ok: false, message: 'Heroe no encontrado' });
  }
  res.json({ ok: true, hero });
}

module.exports = { info, list, detail };
