// const celebrity = require('../models/celebrity.model');
// const mongoose = require('mongoose')
// require('../config/db.config')

// const celebrities = [
//     {
//         name: "Angelina Jolie",
//         occupation: "actress",
//         catchPhrase: "I do believe in the old saying, 'What does not kill you makes you stronger.' Our experiences, good and bad, make us who we are. By overcoming difficulties, we gain strength and maturity." 
//     },
//     {
//         name: "Frida Kahlo",
//         occupation: "painter",
//         catchPhrase: "At the end of the day, we can endure much more than we think we can."
//     },
//     {
//         name: "Ellen Degeneres",
//         occupation: "comedian",
//         catchPhrase: "Be kind to one another.show collectionce"
//     }
// ]

// celebrity.create(celebrities)
//     .then((celebrities) => console.info(`${celebrities.length} new celebrities added to the database`))
//     .catch(error => console.error(error))
//     .then(() => mongoose.connection.close());

const movie = require('../models/movie.model');
const mongoose = require('mongoose')
require('../config/db.config')

const movies = [
    {
        title: "Pulp Fiction",
        genre: "Thriller",
        plot:'The film interweaves three tales: the first story focuses on Vincent Vega (John Travolta) and Jules Winnfield (Samuel L. Jackson), two hit men on duty for "the big boss," Marsellus Wallace (Ving Rhames), whose gorgeous wife, Mia (Uma Thurman), takes a liking to Vincent. In the second, a down-and-out pugilist (Bruce Willis), who is ordered to take a fall, decides that there’s more money in doing the opposite. The final chapter follows a pair of lovers (Amanda Plummer and Tim Roth) as they prepare to hold up a diner.'
    },
    {
        title: "Coco",
        genre: "Animation",
        plot:`Despite his family's baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.`
    },
    {
        title: "Inception",
        genre: "Sci-Fi",
        plot:`Dom Cobb (Leonardo DiCaprio) is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.
        Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.`
    },
    {
        title: "Toy Story 3",
        genre: "Animation",
        plot:`As Andy prepares to depart for college, Buzz, Woody and the rest of his loyal toys are troubled about their uncertain future. After being accidentally thrown away, the toys land in a room full of untamed tots who can't wait to get their sticky little fingers on these "new" toys. It's pandemonium as they try to stay together, ensuring "no toy gets left behind." Meanwhile, Barbie comes face to plastic face with Ken (yes, that Ken).`
    }
]

movie.create(movies)
    .then((movies) => console.info(`${movies.length} new movies added to the database`))
    .catch(error => console.error(error))
    .then(() => mongoose.connection.close())