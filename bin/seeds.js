const celebrityModel = require('../models/celebrity');
require('../config/db.config')

celebrityModel.deleteMany()
  .then(msg => console.log('Deleted database'))
  .catch(err => console.log('Error deleting database'))

const data =
  [
    {
      name: "Steven Seagal",
      occupation: "Actor",
      catchPhrase: "Estaba dando un pequeño paseo dominguero, pero puede que hoy no sea domingo(hora de repartir)"
    },
    {
      name: "Albert Einstein",
      occupation: "scientific",
      catchPhrase: "Soy el más listo del planeta"
    },
    {
      name: "Esperanza Aguirre",
      occupation: "Unknown",
      catchPhrase: "Yo no sabía nada"
    }
  ]

celebrityModel.create(data)
  .then(celebrities => {
    console.info("Created successfully " + data.length + "celebrities:")
    for(let celebrity of celebrities) {
      console.info("=> " + celebrity.name)
    }
  })
  .catch(err => console.log("Error al guardar el array inicial: ", err))