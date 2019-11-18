const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const studentSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		ta: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Ta'
		}
	}, { timestamps: true });

studentSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.hash(user.password, SALT_WORK_FACTOR)
			.then(hash => {
				user.password = hash;
				next();
			})
			.catch(err => next(err));
	} else {
		next();
	}
});

studentSchema.methods.checkPassword = function (password) {
	return bcrypt.compare(password, this.password);
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
