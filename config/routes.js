const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.showCelebrities)
router.get('/celebrities/new', controller.addCelebrity)
router.post('/celebrities/new', controller.doAddCelebrity)
router.get('/celebrities/:id', controller.celebrityDetail)
router.post('/celebrities/:id/delete', controller.deleteCelebrity)
router.get('/celebrities/:id/edit', controller.editCelebrity)
router.post('/celebrities/:id', controller.doEditCelebrity)

// MOVIES
router.get('/movies', controller.listMovies)
router.get('/movies/new', controller.addMovie)
router.post('/movies/new', controller.doAddMovie)
router.get('/movies/:id', controller.movieDetail)
router.post('/movies/:id/delete', controller.deleteMovie)
router.get('/movies/:id/edit', controller.editMovie)
router.post('/movies/:id', controller.doEditMovie)

module.exports = router;