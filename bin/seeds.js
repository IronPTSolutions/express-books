const celebrityModel = require('../models/celebrity');
const movieModel = require('../models/movie')
require('../config/db.config')

// celebrityModel.deleteMany()
//   .then(msg => console.log('Deleted database'))
//   .catch(err => console.log('Error deleting database'))

// const data =
//   [
//     {
//       name: "Steven Seagal",
//       occupation: "Actor",
//       catchPhrase: "Estaba dando un pequeño paseo dominguero, pero puede que hoy no sea domingo(hora de repartir)"
//     },
//     {
//       name: "Albert Einstein",
//       occupation: "scientific",
//       catchPhrase: "Soy el más listo del planeta"
//     },
//     {
//       name: "Esperanza Aguirre",
//       occupation: "Unknown",
//       catchPhrase: "Yo no sabía nada"
//     }
//   ]

// celebrityModel.create(data)
//   .then(celebrities => {
//     console.info("Created successfully " + data.length + "celebrities:")
//     for (let celebrity of celebrities) {
//       console.info("=> " + celebrity.name)
//     }
//   })
//   .catch(err => console.log("Error al guardar el array inicial: ", err))


// MOVIES
const dataMovies =
  [
    {
      title: "Harry Potter",
      genre: "Fantasy",
      plot: "A wizard story..."
    },
    {
      title: "The lord of the rings",
      genre: "Fantasy",
      plot: "A hobbit story..."
    },
    {
      title: "Avengers",
      genre: "Fantasy",
      plot: "A superheroes story..."
    }
  ]

movieModel.create(dataMovies)
  .then(movies => {
    console.info("Created successfully " + movies.length + "movies:")
    for (let movie of movies) {
      console.info("=> " + movie.title)
    }
  })
  .catch(err => console.log("Error al guardar el array inicial: ", err))

