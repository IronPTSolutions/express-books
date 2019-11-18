module.exports.isAuthenticated = function (req, res, next) {
	if (req.session.student) {
		res.locals.student = req.session.student;
		next();
	} else {
		res.redirect('/login');
	}
}