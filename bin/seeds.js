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

Celebrity.find()
  .then(celebrities => {
    const movies = [{
      title: "a",
      genre: "a",
      plot: "a",
      celebrities: celebrities[0]
    },{
      title: "b",
      genre: "b",
      plot: "b",
      celebrities: celebrities[1]
    },{
      title: "c",
      genre: "c",
      plot: "c",
      celebrities: celebrities[2]
    }];
  
  Movie.create(movies)
    .then(movies => console.info(`${movies.length} new movies added to the database`))
    .catch(error => console.log(error))
    .then(() => mongoose.connection.close());
  });


