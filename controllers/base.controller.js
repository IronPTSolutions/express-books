const createError = require('http-errors');
const mongoose = require('mongoose');
const celebrity = require('../models/celebrity.model')
const movie = require('../models/movie.model')

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Welcome to your CRUD project'
    });
};

module.exports.listCelebrities = (req, res, next) => {
    celebrity.find()
        .then(celebrity => res.render('celebrities/index.hbs', {celebrity}))
        .catch(err => next(err))
};

module.exports.celebrityDetail = (req, res, next) => {
    celebrity.findOne({_id: req.params.celebrityId})
        .then(celebrityDetail => {
            res.render('celebrities/show.hbs', celebrityDetail) 
        })
        .catch(err => next(err))
};

module.exports.listMovies = (req, res, next) => {
    movie.find()
        .then(movie => res.render('movies/index.hbs', {movie}))
        .catch(err => next(err))
};

module.exports.movieDetail = (req, res, next) => {
    console.log(req.params.movieId)
    movie.findOne({_id: req.params.movieId})
        .then((movieDetail) => {
            res.render('movies/show.hbs', movieDetail)
        })
        .catch(err => next(err))

}