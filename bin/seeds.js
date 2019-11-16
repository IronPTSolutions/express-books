const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model');
require('../config/db.config')

const dbtitle = 'ex-crud';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
Celebrity.collection.drop()
    .then(data => console.log(data))
    .catch(error => console.error(error))
Movie.collection.drop()
    .then(data => console.log(data))
    .catch(error => console.error(error))

const movies = [
    {
        title: "Pulp Fiction",
        genre: "Thriller",
        celebrity: {
            name: "Uma Thurman",
            occupation: "Actress",
            catchPhrase: "I love and adore being a mother. It's the greatest gift I've ever been given."
        },
        plot:'The film interweaves three tales: the first story focuses on Vincent Vega (John Travolta) and Jules Winnfield (Samuel L. Jackson), two hit men on duty for "the big boss," Marsellus Wallace (Ving Rhames), whose gorgeous wife, Mia (Uma Thurman), takes a liking to Vincent. In the second, a down-and-out pugilist (Bruce Willis), who is ordered to take a fall, decides that there’s more money in doing the opposite. The final chapter follows a pair of lovers (Amanda Plummer and Tim Roth) as they prepare to hold up a diner.'
    },
    {
        title: "Coco",
        genre: "Animation",
        celebrity: {
            name: "Miguel",
            occupation: "Singer",
            catchPhrase: "Never underestimate the power of music."
        },
        plot:`Despite his family's baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.`
    },
    {
        title: "Inception",
        genre: "Sci-Fi",
        celebrity: {
            name: "Leonardo DiCaprio",
            occupation: "Actor",
            catchPhrase: "Dreams feel real while we’re in them. It’s only when we wake up that we realize something was actually strange."
        },
        plot:`Dom Cobb (Leonardo DiCaprio) is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.
        Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.`
    },
    {
        title: "Toy Story 3",
        genre: "Animation",
        celebrity: {
            name: "Woody",
            occupation: "Doll",
            catchPhrase: "There's a snake in my boot!"
        },
        plot:`As Andy prepares to depart for college, Buzz, Woody and the rest of his loyal toys are troubled about their uncertain future. After being accidentally thrown away, the toys land in a room full of untamed tots who can't wait to get their sticky little fingers on these "new" toys. It's pandemonium as they try to stay together, ensuring "no toy gets left behind." Meanwhile, Barbie comes face to plastic face with Ken (yes, that Ken).`
    }
]

const createCelebrities = movies.map(movie => {
    const newCelebrity = new Celebrity(movie.celebrity)
    return newCelebrity.save()
        .then(celebrity => {
            return celebrity.name;
        })
        .catch(error => {
            throw new Error(`Impossible to add the celebrity. ${error}`)
        })
})


let findCelebrities = Promise.all(createCelebrities)
    .then(celebrities => {
        return movies.map(movie => {
            return Celebrity.findOne({ name: movie.celebrity.name})
                .then(celebrity => {
                    if (!celebrity) {
                        throw new Error(`unknown celebrity ${movie.celebrity.name}`);
                    }
                    var pepe = Object.assign({}, movie, { celebrity: celebrity._id });
                    console.log(pepe);
                    return pepe;
                })
        });
    })
    .catch(error => {
        throw new Error(error)
    })

const saveMovies = findCelebrities.then(findCelebrities => {
    return Promise.all(findCelebrities)
        .then(movies => {
            console.log(movies);
            return movies.map(movie => {
                const newMovie = new Movie(movie);
                console.log(newMovie);
                return newMovie.save();
            })
        })
}).then(savedMovies => {
    Promise.all(savedMovies)
        .then(movies => movies.forEach(movie => console.log(`created ${movie.title}`)))
        .then(() => mongoose.connection.close())
        .catch(err => console.log("Error while saving the movie: ", err))
})
    
// Movie.create(movies)
//     .then((movies) => console.info(`${movies.length} new movies added to the database`))
//     .catch(error => console.error(error))
//     .then(() => mongoose.connection.close())