const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity')

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
			console.log(celebrity.catchPhrase)
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