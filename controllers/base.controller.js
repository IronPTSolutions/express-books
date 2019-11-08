const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

module.exports.base = (req, res, next) => {
  res.render('index', {
    title: 'Welcome to your CRUD project'
  });
};

module.exports.celebrities = ((req, res, next) => {
  Celebrity.find()
    .then(data => res.render('celebrities/index', {
      celebrities: data
    }))
    .catch(error => next(error));
});

module.exports.createCelebrity = ((req, res, next) => {
  res.render('celebrities/new', {
    celebrity: new Celebrity()
  });
});

module.exports.doCreateCelebrity = ((req, res, next) => {
  const info = req.body;
  const celebrity = new Celebrity(info);

  celebrity.save()
    .then(result => {
      console.log('creation result => ', result);
      res.redirect('/celebrities');
    })
    .catch(error => {
      res.render('celebrities/new', info);
    });
});

module.exports.celebrity = ((req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(data => res.render('celebrities/show', {
      celebrity: data
    }))
    .catch(error => next(error));
});

module.exports.editCelebrity = ((req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(data => res.render('celebrities/edit', {
      celebrity: data
    }))
    .catch(error => next(error));
});

module.exports.doEditCelebrity = ((req, res, next) => {
  const {
    name,
    occupation,
    catchPhrase
  } = res.body;

  Celebrity.findByIdAndUpdate(req.params.id, {
      name,
      occupation,
      catchPhrase
    }, {
      new: true
    })
    .then(res.redirect('/celebrities'))
    .catch(error => next(error));
});

module.exports.deleteCelebrity = ((req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(res.redirect('/celebrities'))
    .catch(error => next(error));
});

module.exports.movies = ((req, res, next) => {
  Movie.find().sort('title')
    .then(data => {
        console.log(data);
        res.render('movies/index', {
          movies: data
        })
      }

    )
    .catch(error => next(error));
});
