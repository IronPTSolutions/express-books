const createError = require('http-errors');
const mongoose = require('mongoose');

const Ta = require('../models/ta.model');
const Student = require('../models/student.model');

module.exports.list = (req, res, next) => {
	Ta.find()
		.then(
			tas => {
				res.render('tas/list', {
					tas
				});
			}
		).catch(
			error => next(error)
		);
};

module.exports.detail = (req, res, next) => {
	Ta.findById(req.params.id)
		.populate('students')
		.then(
			ta => {
				if (ta) {
					res.render('tas/detail', {
						ta
					});
				} else {
					next(createError(404, 'Ta not found'));
				}
			}
		).catch(
			error => next(error)
		);
};

module.exports.create = (req, res, next) => {
	res.render('tas/create', { ta: new Ta() });
};

module.exports.doCreate = (req, res, next) => {
	const newTa = new Ta(req.body);
	newTa.save()
		.then(
			ta => {
				res.redirect('/tas');
			}
		).catch(
			error => {
				if (error instanceof mongoose.Error.ValidationError) {

				}
				next(error);
			}
		);
};

module.exports.edit = (req, res, next) => {
	Ta.findById(req.params.id)
		.then(
			ta => {
				if (ta) {
					res.render('tas/create', { ta: ta });
				} else {
					next(createError(404, 'Ta not found'));
				}
			}
		).catch(
			error => next(error)
		);
};

module.exports.doEdit = (req, res, next) => {
	Ta.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
		.then(Ta => {
			if (Ta) {
				res.redirect('/Tas')
			} else {
				next(createError(404, `Ta not found`));
			}
		})
		.catch(error => {
			if (error instanceof mongoose.Error.ValidationError) {
				//res.render('Tas/edit', { Ta: req.body, error: error.errors })
			}
			next(error);
		})
};

module.exports.delete = (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404, 'TA not found'))
	} else {
		Ta.findByIdAndDelete(id)
			.then(
				() => res.redirect('/tas')
			)
			.catch(
				error => next(error)
			);
	}
}
