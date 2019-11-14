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
            .populate('celebrity')
            .then(movie => {
                if (!movie) {
                    return res.status(404).render('not-found')
                }
                res.render('movies/show.hbs', movie)
            })
            .catch(err => next(err))
    }
}

// module.exports.editMovie = (req, res, next) => {
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         next(createError(404));
//     } else {
//         Movie.findOne({_id: req.params.id})
//             .then(movie => {
//                 res.render('movies/form.hbs', movie) 
//             })
//             .catch(err => next(err))
//     }
// }

// module.exports.editMovie = (req, res, next) => {
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         next(createError(404));
//     } else {

//         let celebrities = []

//         Celebrity.find()
//             .then(celebrity => {
//                 celebrities = celebrity.map(el => el.name)
//             })
//             .catch(err => next(err))
        
//         Movie.findOne({_id: req.params.id})
//             .then(movie => {
//                 data = {
//                     movie,
//                     celebrities
//                 }
//                 res.render('movies/form.hbs', data) 
//             })
//             .catch(err => next(err))
//     }
// }

module.exports.editMovie = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {

        const allCelebrities = Celebrity.find()
            .then(celebrity => {
                return celebrity
            })
            .catch(err => next(err))

        const movie = Movie.findOne({_id: req.params.id})
            .then(movie => {
                return movie
            })
            .catch(err => next(err))

        Promise.all([allCelebrities, movie])
            .then((values) => {
                const data = {
                    celebrities: values[0],
                    movie: values[1]
                }
                res.render('movies/form.hbs', data)
            })
            .catch(err => next(err))
    }
}

module.exports.doEditMovie = (req, res, next) => {
    console.log('bodt =>', req.body)
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(createError(404));
    } else {
        Movie.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        )
            .then((movie => {
                console.log(req.body)
                res.redirect(`/movies/${req.params.id}`)
            }))
            .catch(err => next(err))
    }
}

module.exports.addMovies = (req, res, next) => {

    Celebrity.find()
        .then(celebrity => {
            const celebrities = celebrity.map(el => el)
            const data = {
                celebrities,
                movie: new Movie
            }
            res.render('movies/form', data)
        })
        .catch(err => next(err))
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

const p = [1,2,3,4]
res = p.map(el => el * 2)

res