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
			res.render('celebrities/index', {celebrities})
		})
		.catch(error => console.log("Error in showCelebrities => ", error))
}

module.exports.celebrityDetail = (req, res, next) => {
	const id = req.params.id
	console.log(id)
	Celebrity.findById(id)
		.then(celebrity => {
			console.log(celebrity)
			res.render('celebrities/show', celebrity)
		})
		.catch(error => console.log("Error in celebrityDetail => ", error))
}