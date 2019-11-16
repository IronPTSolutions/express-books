const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taSchema = new Schema({
	fullname: {
		type: String,
		required: true
	}
}, { timestamps: true, toJSON: { virtuals: true } });

taSchema.virtual('students', {
	ref: 'Student',
	foreignField: 'ta',
	localField: '_id',
	justOne: false
});

const Ta = mongoose.model('Ta', taSchema);

module.exports = Ta;
