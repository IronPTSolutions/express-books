const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model')
const Movie = require('../models/movie.model')

module.exports.base = (req, res, next) => {
    res.render('index', {
        title: 'Mongoose Movies LAB'
    });
};

module.exports.listCelebrities = (req, res, next) => {
    Celebrity.find()
        .then(celebrity => res.render('celebrities/index.hbs', {celebrity}))
        .catch(err => next(err))
};

module.exports.detailCelebrity = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Celebrity.findOne({_id: req.params.id})
            .then(celebrity => {
                res.render('celebrities/show.hbs', celebrity) 
            })
            .catch(err => next(err))
    }
};

module.exports.editCelebrity = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Celebrity.findOne({_id: req.params.id})
            .then(celebrity => {
                res.render('celebrities/form', celebrity) 
            })
            .catch(err => next(err))
    }
}

module.exports.doEditCelebrity = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Celebrity.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        )
            .then(() => {
                console.log(req.body)
                res.redirect(`/celebrities/${req.params.id}`)
            })
            .catch(err => next(err))
    }
}

module.exports.addCelebrities = (req, res, next) => {
    res.render('celebrities/form', {
        celebrity: new Celebrity
    })
}

module.exports.doAddCelebrities = (req, res, next) => {
    const newCelebrity = new Celebrity(req.body)

    newCelebrity.save()
        .then(newCelebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => next(err))
}

module.exports.deleteCelebrity = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Celebrity.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/celebrities')
            })
            .catch(err => next(err))
    }
}

module.exports.listMovies = (req, res, next) => {
    Movie.find()
        .then(movie => res.render('movies/index.hbs', {movie}))
        .catch(err => next(err))
};

module.exports.movieDetail = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Movie.findOne({_id: req.params.id})
            .then(movie => {
                res.render('movies/show.hbs', movie)
            })
            .catch(err => next(err))
    }
}

module.exports.editMovie = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Movie.findOne({_id: req.params.id})
            .then(movie => {
                res.render('movies/form.hbs', movie) 
            })
            .catch(err => next(err))
    }
}

module.exports.doEditMovie = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Movie.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        )
            .then((movie => {
                console.log(movie)
                res.redirect(`/movies/${req.params.id}`)
            }))
            .catch(err => next(err))
    }
}

module.exports.addMovies = (req, res, next) => {
    res.render('movies/form', {
        movie: new Movie
    })
}

module.exports.doAddMovies = (req, res, next) => {
    const newMovie = new Movie(req.body)

    newMovie.save()
        .then(newMovie => {
            res.redirect('/movies')
        })
        .catch(err => next(err))
}

module.exports.deleteMovie = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Movie.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/movies')
            })
            .catch(err => next(err))
    }
}