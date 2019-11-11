const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.listCelebrities);
router.get('/create', controller.create); //ruta
router.post('/create', controller.addCelebrity) //form
router.get('/:id', controller.celebrityDetail);
//router.get('/:id/edit', controller.edit);
router.post('/:id/delete', controller.delete);
//router.post('/:id/edit', controller.editCelebrity);

module.exports = router;
