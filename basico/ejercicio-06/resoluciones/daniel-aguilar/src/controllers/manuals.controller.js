const service = require('../services/manuals.service');

const info = (req, res) =>
  res.json({
    ok: true,
    message: 'Ejercicio ejecutado correctamente',
    topic: 'path y rutas seguras',
  });

async function list(req, res, next) {
  try {
    const manuals = await service.listManuals();
    res.json({ ok: true, total: manuals.length, manuals });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const content = await service.readManual(req.query.file);
    res.json({ ok: true, file: req.query.file, content });
  } catch (error) {
    next(error);
  }
}

module.exports = { info, list, read };
