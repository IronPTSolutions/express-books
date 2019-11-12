const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.listCelebrities);
router.get('/create', controller.create); //ruta
router.post('/create', controller.addCelebrity) //form
router.get('/celebrities/:id', controller.celebrityDetail); //ficha c/u
router.get('/celebrities/:id/edit', controller.edit);
router.post('/celebrities/:id/delete', controller.delete);
router.post('/celebrities/:id/edit', controller.editCelebrity);

module.exports = router; 