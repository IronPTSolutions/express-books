const createError = require('http-errors');
const mongoose = require('mongoose');

const Student = require('../models/student.model');

module.exports.login = (req, res, next) => {
	res.render('auth/login');
};

module.exports.doLogin = (req, res, next) => {

	function renderWithErrors(errors) {
		res.render('auth/login', {
			user: req.body, errors: errors
		});
	}

	const { username, password } = req.body;

	Student.findOne({ username: username })
		.then(
			student => {
				if (!student) {
					renderWithErrors({ username: "The user doesn't exist" });
				} else {
					return student.checkPassword(password)
						.then(
							match => {
								if (!match) {
									renderWithErrors({ password: 'Wrong password' });
								} else {
									req.session.student = student;
									res.redirect('/students');
								}
							}
						)
				}
			}
		)

};


module.exports.doLogout = (req, res, next) => {
	req.session.destroy((err) => {
		res.redirect("/login");
	});
}