const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.celebrities);
router.get('/celebrities/new', controller.createCelebrity);
router.post('/celebrities/new', controller.doCreateCelebrity);
router.get('/celebrities/:id', controller.celebrity);
router.get('/celebrities/:id/edit', controller.editCelebrity);
router.post('celebrities/:id/edit', controller.doEditCelebrity);
router.post('/celebrities/:id/delete', controller.deleteCelebrity);
router.get('/movies', controller.movies);

module.exports = router;
