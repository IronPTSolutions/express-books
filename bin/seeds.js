const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
const mongoose = require('mongoose');
require('../config/db.config');

// const celebrities = [{
//     name: 'Carlos',
//     occupation: 'Drawer',
//     catchPhrase: 'No me borres el dibujo'
//   },{
//     name: 'Fran',
//     occupation: 'Nuts toucher',
//     catchPhrase: 'Ayy cuando seas mi alumno'
//   },{
//     name: 'Julio',
//     occupation: 'Huelvaino',
//     catchPhrase: 'Ahora hazlo tu'
//   }];

// Celebrity.create(celebrities)
//   .then(celebrities => console.info('${celebrities.length} new celebrities added to the database'))
//   .catch(error => console.log(error))
//   .then(() => mongoose.connection.close());

const movies = [{
    title: "a",
    genre: "a",
    plot: "a"
  },{
    title: "b",
    genre: "b",
    plot: "b"
  },{
    title: "c",
    genre: "c",
    plot: "c"
  }];

Movie.create(movies)
  .then(movies => console.info(`${movies.length} new movies added to the database`))
  .catch(error => console.log(error))
  .then(() => mongoose.connection.close());
