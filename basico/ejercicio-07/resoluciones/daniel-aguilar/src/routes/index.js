const { Router } = require('express');
const controller = require('../controllers/cars.controller');

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, status: 'up' }));
router.get('/basico/ejercicio-07', controller.info);
router.get('/cars', controller.list);
router.get('/cars/:id', controller.detail);

module.exports = router;
