const createError = require('http-errors');
const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Finder'
    });
};

module.exports.celebritiesList = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/index', { celebrities });
    })
    .catch(error => {
        next(error)
    })
};

module.exports.celebrityDetail = (req, res, next) => {

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

module.exports.moviesList = (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render('movies/index', { movies });
    })
    .catch(error => {
        next(error)
    })
};

module.exports.movieDetail = (req, res, next) => {

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

module.exports.newCelebrity = (req, res, next) => {
    res.render('celebrities/form', {
        celebrity: new Celebrity()
    })
}

module.exports.doNewCelebrity = (req, res, next) => {
    const body = req.body
    console.info('body request => ', req.body)
    const celebrity = new Celebrity(body)

    celebrity.save()
        .then(celebrity => {
            console.log('creation result => ', celebrity)
            res.redirect(`/celebrities/${celebrity._id}`)
        })
        .catch(error => {
            next(error)
        })
}