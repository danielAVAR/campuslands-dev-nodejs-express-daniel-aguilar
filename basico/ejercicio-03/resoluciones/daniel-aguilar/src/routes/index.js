const { Router } = require('express');
const controller = require('../controllers/heroes.controller');

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, status: 'up' }));
router.get('/basico/ejercicio-03', controller.info);
router.get('/heroes', controller.list);
router.get('/heroes/:id', controller.detail);

module.exports = router;
