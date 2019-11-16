const mongoose = require('mongoose');
const Student = require('../models/student.model');
const Ta = require('../models/ta.model');

const dbtitle = 'students-tas';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
Ta.collection.drop();
Student.collection.drop();

const students = [
	{
		fullname: "Raúl Requena",
		username: "raul",
		email: "raul@paco.com",
		password: "test",
		ta: {
			fullname: "Fran"
		}
	},
	{
		fullname: "Miriam",
		username: "miriam",
		email: "miriam@paco.com",
		password: "test2",
		ta: {
			fullname: "Carlos"
		}
	},
	{
		fullname: "Juanorro",
		username: "juan",
		email: "juan@paco.com",
		password: "test3",
		ta: {
			fullname: "Plaso"
		}
	},
]

const createTas = students.map(student => {
	const newTa = new Ta(student.ta)
	return newTa.save()
		.then(ta => {
			return ta.fullname;
		})
		.catch(error => {
			throw new Error(`Impossible to add the ta. ${error}`)
		})
})


let findTas = Promise.all(createTas)
	.then(tas => {
		return students.map(student => {
			return Ta.findOne({ fullname: student.ta.fullname })
				.then(ta => {
					if (!ta) {
						throw new Error(`unknown ta ${student.ta.fullname}`);
					}
					return Object.assign({}, student, { ta: ta._id });
				})
		});
	})
	.catch(error => {
		throw new Error(error)
	})

const saveStudents = findTas.then(findTas => {
	return Promise.all(findTas)
		.then(students => {
			console.log(students);
			return students.map(student => {
				const newStudent = new Student(student);
				return newStudent.save();
			})
		})
}).then(savedStudents => {
	Promise.all(savedStudents)
		.then(students => students.forEach(student => console.log(`created ${student.fullname}`)))
		.then(() => mongoose.connection.close())
		.catch(err => console.log("Error while saving the student: ", err))
})