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

//listado
module.exports.listCelebrities = (req, res, next) => {
	//instrucciones moogose
	Celebrity.find()
		.then(
			celebrities => {
				res.render('celebrities/celebritiesList', { celebrities })
			}
		).catch(
			error => next(error)
		)
};

//ficha cada una
module.exports.celebrityDetail = (req, res, next) => {
	const id = req.params.id;
	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}
	Celebrity.findById(id)
		.then(
			celebrity => {
				res.render('celebrities/detail', { celebrity })
			}
		).catch(
			error => next(error)
		)
};

//create
module.exports.create = (req, res, nex) => {
	res.render('celebrities/form', {
		celebrity: new Celebrity()
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

//delete
module.exports.delete = (req, res, nex) => {
	const id = req.params.id;

	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}
	Celebrity.findByIdAndRemove(id)
		.then(celebrityRemoved => {
			console.info('celebrityRemoved =>', celebrityRemoved)
			res.redirect('/celebrities')
		}).catch(
			error => next(error) 
		)
}

//edit
module.exports.edit = (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
			next(createError(404));
	} else {
		Celebrity.findById(id)
		.then(
			celebrity => {
				res.render('celebrities/form', { celebrity })
			}).catch(
				error => next(error)
		);
	} 
}

module.exports.editCelebrity = (req, res, nex) => {
	const id = req.params.id;

	if(!mongoose.Types.ObjectId.isValid(id)){
		next(createError(404));
	}
	Celebrity.findByIdAndUpdate(id, req.body, { new: true })
		.then(celebrity => {
			console.info('Edited =>', celebrity)
			res.redirect(`/celebrities/${id}`)
		}).catch(
			error => next(error) 
		)
}
