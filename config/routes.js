const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.celebritiesList);
router.get('/celebrities/new', controller.newCelebrity);
router.post('/celebrities/new', controller.doNewCelebrity);
router.get('/movies', controller.moviesList);
router.get('/celebrities/:id', controller.celebrityDetail);
router.get('/movies/:id', controller.movieDetail);

module.exports = router;