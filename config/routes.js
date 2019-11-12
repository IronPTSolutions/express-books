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
router.get('/movies/new', controller.createMovie);
router.post('/movies/new', controller.doCreateMovie);
router.get('/movies/:id', controller.movie);
router.get('/movies/:id/edit', controller.editMovie);
router.post('movies/:id/edit', controller.doEditMovie);
router.post('/movies/:id/delete', controller.deleteMovie);

module.exports = router;
