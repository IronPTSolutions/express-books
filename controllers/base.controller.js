const createError = require('http-errors');
const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Finder'
    });
};

module.exports.celebritieslist = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/index', { celebrities });
    })
    .catch(error => {
        next(error)
    })
};

module.exports.celebritydetail = (req, res, next) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Celebrity.findById(id)
        .then(celebrity => {
            res.render('celebrities/show', { celebrity });
        })
        .catch(error => {
            next(error)
        })
    }
};

module.exports.movieslist = (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render('movies/index', { movies });
    })
    .catch(error => {
        next(error)
    })
};

module.exports.moviedetail = (req, res, next) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Movie.findById(id)
        .then(movie => {
            res.render('movies/show', { movie });
        })
        .catch(error => {
            next(error)
        })
    }
};