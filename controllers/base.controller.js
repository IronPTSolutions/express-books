const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity')
const Movie = require('../models/movie')

module.exports.base = (req, res, next) => {
	res.render('index', {
		title: 'Welcome to your CRUD project'
	});
};

module.exports.showCelebrities = (req, res, next) => {
	Celebrity.find()
		.then(celebrities => {
			res.render('celebrities/index', { celebrities })
		})
		.catch(error => console.log("Error in showCelebrities => ", error))
}

module.exports.celebrityDetail = (req, res, next) => {
	const id = req.params.id
	console.log(id)
	Celebrity.findById(id)
		.then(celebrity => {
			res.render('celebrities/show', celebrity)
		})
		.catch(error => console.log("Error in celebrityDetail => ", error))
}

module.exports.addCelebrity = (req, res, next) => {
	res.render('celebrities/new')
}

module.exports.doAddCelebrity = (req, res, next) => {
	const data = {
		name: req.body.name,
		occupation: req.body.occupation,
		catchPhrase: req.body.catchPhrase
	}
	new Celebrity(data).save()
		.then(celebrity => {
			console.log(`"Celebrity ${celebrity.name} added successfully!`)
			res.redirect('/celebrities')
		})
		.catch(error => {
			console.log("Error in addCelebrity => ", error)
			res.redirect('/celebrities/new')
		})
}

module.exports.deleteCelebrity = (req, res, next) => {
	const id = req.params.id
	Celebrity.findByIdAndDelete(id)
		.then(celebrity => {
			console.log(`Celebrity ${celebrity.name} deleted successfully!`)
			res.redirect('/celebrities')
		})
		.catch(error => {
			next(createError(error))
		})
}

module.exports.editCelebrity = (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebrity => {
			res.render('celebrities/edit', celebrity)
		})
		.catch(error => {
			next(createError(error))
		})
}

module.exports.doEditCelebrity = (req, res, next) => {
	const id = req.params.id
	const data = {
		name: req.body.name,
		occupation: req.body.occupation,
		catchPhrase: req.body.catchPhrase
	}
	Celebrity.findByIdAndUpdate(id, { $set: data }, { new: true })
		.then(celebrity => {
			console.log(`"Celebrity ${celebrity.name} edited successfully!`)
			res.redirect('/celebrities')
		})
		.catch(error => {
			next(createError(error))
		})
}

// MOVIES
module.exports.listMovies = (req, res, next) => {
	Movie.find()
		.then(movies => {
			res.render('movies/index', { movies })
		})
		.catch(error => console.log("Error in listMovies => ", error))
}

module.exports.movieDetail = (req, res, next) => {
	const id = req.params.id
	Movie.findById(id)
		.then(movies => {
			res.render('movies/show', movies)
		})
		.catch(error => console.log("Error in movieDetail => ", error))
}

module.exports.addMovie = (req, res, next) => {
	res.render('movies/new')
}

module.exports.doAddMovie = (req, res, next) => {
	const data = {
		title: req.body.title,
		genre: req.body.genre,
		plot: req.body.plot
	}
	new Movie(data).save()
		.then(movie => {
			console.log(`"Movie ${movie.title} added successfully!`)
			res.redirect('/movies')
		})
		.catch(error => {
			console.log("Error in addMovie => ", error)
			res.redirect('/movies/new')
		})
}

module.exports.deleteMovie = (req, res, next) => {
	const id = req.params.id
	Movie.findByIdAndDelete(id)
		.then(movie => {
			console.log(`Movie ${movie.title} deleted successfully!`)
			res.redirect('/movies')
		})
		.catch(error => {
			next(createError(error))
		})
}

module.exports.editMovie = (req, res, next) => {
	const id = req.params.id
	Movie.findById(id)
		.then(movie => {
				res.render('movies/edit', movie)
		})
		.catch(error => {
			next(createError(error))
		})
}

module.exports.doEditMovie = (req, res, next) => {
	const id = req.params.id
	const data = {
		title: req.body.title,
		genre: req.body.genre,
		plot: req.body.plot
	}
	Movie.findByIdAndUpdate(id, { $set: data }, { new: true })
		.then(movie => {
			console.log(`"Movie ${movie.name} edited successfully!`)
			res.redirect('/movies')
		})
		.catch(error => {
			next(createError(error))
		})
}