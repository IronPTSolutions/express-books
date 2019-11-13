const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);

//list ----------------------------------------------
router.get('/celebrities', controller.listCelebrities);
router.get('/movies', controller.listMovies)

//create ----------------------------------------------
router.get('/create', controller.create); 
router.post('/create', controller.addCelebrity)
router.get('/movies/create', controller.createMovie); 
router.post('/movies/create', controller.addMovie) 


//add ----------------------------------------------
router.get('/celebrities/:id', controller.celebrityDetail); //ficha
router.get('/movies/:id', controller.movieDetail); //ficha

//edit & delete ----------------------------------------------
router.get('/celebrities/:id/edit', controller.edit);
router.get('/movies/:id/edit', controller.editMovie);

router.post('/celebrities/:id/delete', controller.delete);
router.post('/movies/:id/delete', controller.delete);

router.post('/celebrities/:id/edit', controller.editCelebrity);
router.post('/movies/:id/edit', controller.updateMovie);


module.exports = router; 