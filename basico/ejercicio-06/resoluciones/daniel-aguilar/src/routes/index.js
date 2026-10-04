const { Router } = require('express');
const controller = require('../controllers/manuals.controller');

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, status: 'up' }));
router.get('/basico/ejercicio-06', controller.info);
router.get('/manuals', controller.list);
router.get('/manuals/read', controller.read);

module.exports = router;
