const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');
const bodyParser = require('body-parser');

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
				res.render('celebrities', { celebrities })
			})
		.cath(
			error => next(error)
		);
};
