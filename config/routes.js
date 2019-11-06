const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);

router.get('/celebrities', controller.listCelebrities)
router.get('/celebrities/:celebrityId', controller.celebrityDetail)

router.get('/movies', controller.listMovies)
router.get('/movies/:movieId', controller.movieDetail)

module.exports = router;