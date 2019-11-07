const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);

router.get('/celebrities', controller.celebritieslist);
router.get('/celebrities/:id', controller.celebritydetail);

router.get('/movies', controller.movieslist);
router.get('/movies/:id', controller.moviedetail);

module.exports = router;