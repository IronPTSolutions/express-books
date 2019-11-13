const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');


//index
module.exports.base = (req, res, next) => {
	res.render('index', {
		title: 'Welcome to your CRUD project'
	});
};

//listado celebrities
module.exports.listCelebrities = (req, res, next) => {
	//instrucciones moogose
	Celebrity.find()
		.then(celebrities => { 
			res.render('celebrities/celebritiesList', { celebrities })
		}).catch(error => next(error))
};

//listado movies
module.exports.listMovies = (req, res, next) => {
	Movie.find()
	.then(movies => {
		res.render('movies/moviesList', { movies })
	}).catch(error => next(error))
}

//ficha celebrity
module.exports.celebrityDetail = (req, res, next) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}
	Celebrity.findById(id)
		.populate('movie')
		.then(celebrity => {
			res.render('celebrities/detail', { celebrity })
		}).catch(error => next(error))
};

//ficha movie
module.exports.movieDetail = (req, res, next) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}

	Movie.findById(id)
		.then(movie => {
			res.render('movies/detail', { movie })
		}).catch(error => next(error))
}

//create Celebrity
module.exports.create = (req, res, nex) => {
	res.render('celebrities/form', {
		celebrity: new Celebrity()
	})
}

//create movie
module.exports.createMovie = (req, res, next) => {
	res.render('movies/form', {
		movie: new Movie()
	})
}

//add to db
module.exports.addCelebrity = (req, res, nex) => {
	const { name, occupation, catchPhrase, image } = req.body
	const newCelebrity = new Celebrity({ name, occupation, catchPhrase, image })

	newCelebrity.save()
		.then(celebrity => {
			console.info('new celebrity =>', celebrity)
			res.redirect('celebrities')
		}).catch(error => next(error))
}

//add movie to db
module.exports.addMovie = (req, res, next) => {
	const { title, genre, plot, rate, pictureUrl } = req.body
	const newMovie = new Movie( { title, genre, plot, rate, pictureUrl })

	newMovie.save()
		.then(movie => {
			console.info('new movie =>', movie)
			res.redirect('movies')
		}).catch(error => next(error))
}

//delete celebrity
module.exports.delete = (req, res, nex) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}

	Celebrity.findByIdAndRemove(id)
		.then(celebrityRemoved => {
			console.info('celebrityRemoved =>', celebrityRemoved)
			res.redirect('/celebrities')
		}).catch(error => next(error) )
}

//delete movie
module.exports.delete = (req, res, next) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}

	Movie.findByIdAndRemove(id)
		.then(movieRemoved => {
			console.log(`Deleted =>`, movieRemoved)
			res.redirect('/movies')
		}).catch(error => next(error) )
}


//edit celebrity
module.exports.edit = (req, res, next) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
			next(createError(404));
	} else {
		Celebrity.findById(id)
		.populate('movie')
		.then(celebrity => {
			res.render('celebrities/form', { celebrity })
		}).catch(error => next(error));
	} 
}

module.exports.editCelebrity = (req, res, nex) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}

	//Celebrity.findByIdAndUpdate(id, req.body, { new: true })
	Celebrity.findByIdAndUpdate(id, { $set: {title: req.body, genre: req.body, plot: req.body, rate: req.body, pictureUrl: req.body}, { new: true })
		.then(celebrity => {
			console.info('Edited =>', celebrity)
			res.redirect(`/celebrities/${id}`)
		}).catch(error => next(error) )
}

//EDIT MOVIE
module.exports.editMovie = (req, res, next) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404));
	} else {
		Movie.findById(id)
		.then(movie => {
			res.render('movies/form', { movie })
		}).catch(error => next(error));
	} 

}

module.exports.updateMovie = (req, res, next) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404));
	}

	Movie.findByIdAndUpdate(id, req.body, { new: true })
		.then(movie => {
			console.info('Edited =>', movie)
			res.redirect(`/movies/${id}`)
		}).catch(error => next(error) )
}
