const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Student = require('../models/student.model');
const Ta = require('../models/ta.model');

module.exports.list = (req, res, next) => {
	Student.find()
		.then(
			students => {
				res.render('students/list', {
					students
				});
			}
		).catch(
			error => next(error)
		);
};

module.exports.detail = (req, res, next) => {
	Student.findById(req.params.id)
		.populate('ta')
		.then(
			student => {
				if (student) {
					res.render('students/detail', {
						student
					});
				} else {
					next(createError(404, 'Student not found'));
				}
			}
		).catch(
			error => next(error)
		);
};

module.exports.create = (req, res, next) => {
	Ta.find()
		.then(
			tas => {
				res.render('students/create', { student: new Student(), tas: tas });
			}
		).catch(
			error => next(error)
		);
};

module.exports.doCreate = (req, res, next) => {
	const newStudent = new Student(req.body);
	newStudent.save()
		.then(
			student => {
				res.redirect('/students');
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
	Promise.all([Student.findById(req.params.id), Ta.find()])
		.then(
			data => {
				res.render('students/edit', { student: data[0], tas: data[1] });
			}
		).catch(
			error => next(error)
		);
};

module.exports.doEdit = (req, res, next) => {

	Student.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, overwrite: true})
		.then(student => {
			if (student) {
				res.redirect('/students')
			} else {
				console.log("test");
				next(createError(404, `Student not found`));
			}
		})
		.catch(error => {
			if (error instanceof mongoose.Error.ValidationError) {
				//res.render('students/edit', { student: req.body, error: error.errors })
			}
			next(error);
		})
};

module.exports.delete = (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		next(createError(404, 'Student not found'))
	} else {
		Student.findByIdAndDelete(id)
			.then(
				() => res.redirect('/students')
			)
			.catch(
				error => next(error)
			);
	}
}