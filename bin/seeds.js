const Celebrity = require('../models/celebrity.model');
const mongoose = require('mongoose');
require('../config/db.config');

const celebrities = [
  {
    name: "Rachel Green",
    occupation: "Ejecutiva at Ralph Lauren",
    catchPhrase: "Ahh, salmon skin roll",
    image: "https://media.giphy.com/media/2x2m2a9kNrl2U/giphy.gif",
    movie: {
      title: "The Bounty Hunter",
      genre: "Action",
      plot: "Milo Boyd, a down-on-his-luck bounty hunter, gets his dream job when he is assigned to track down his bail-jumping ex-wife, reporter Nicole Hurly. He thinks all that's ahead is an easy payday, but when Nicole gives him the slip so she can chase a lead on a murder cover-up, Milo realizes that nothing ever goes simply with him and Nicole. The exes continually one-up each other - until they find themselves on the run for their lives. They thought their promise to love, honor and obey was tough - staying alive is going to be a whole lot tougher.",
      rate: 5,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BMTUwNjY4MjY0MV5BMl5BanBnXkFtZTcwNTA2OTYwMw@@._V1_SY1000_CR0,0,672,1000_AL_.jpg"
    }
  },
  {
    name: "Monica Geller",
    occupation: "Chef",
    catchPhrase: "We better stick to the routine, we don't want to lokk stupid",
    image: "https://media.giphy.com/media/XETyfVPrF1BI1RnHdJ/giphy.gif",
    movie: {
      title: "Scream",
      genre: "Horror",
      plot: "A year after her mother's death, Sydney Prescott (Neve Campbell), and her friends started experiencing some strange phone calls. They later learned the calls were coming from a crazed serial killer, in a white faced mask and a large black robe, looking for revenge. His phone calls usually consist of many questions, the main one being: Whats your favorite scary movie? Along with many scary movie trivia, ending with bloody pieces of innocent lives scattered around the small town of Woodsboro.",
      rate: 7,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SY1000_CR0,0,673,1000_AL_.jpg"
    }
  },
  {
    name: "Joey Tribbiani",
    occupation: "Actor",
    catchPhrase: "Joey doesn't share food!",
    image: "https://media.giphy.com/media/yljSekdNwPOYE/giphy.gif",
    movie: {
      title: "Love Sick",
      genre: "Romance",
      plot: "The story of Charlie Darby, who has everything going for him: a great job, friends, family, the whole package. The one thing Charlie doesn't have is love, because every time he gets close, he goes clinically insane. When he meets the perfect girl, Charlie must overcome his psychosis to claim his chance at true love.",
      rate: 5,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BMTQ0OTUwODI1N15BMl5BanBnXkFtZTgwMjY1NjMzNDE@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    }
  },
  {
    name: "Ross Geller",
    occupation: "Paleontologist",
    catchPhrase: "Turn, Pivot, PIVOT, PIVOT, PIVOOOOT",
    image: "https://media.giphy.com/media/3nfqWYzKrDHEI/giphy.gif",
    movie: {
      title: "The Iceman",
      genre: "Crime",
      plot: "The story of Richard Kuklinski, the notorious contract killer and family man. When finally arrested in 1986, neither his wife nor daughters had any clue about his real profession.",
      rate: 6,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BNDQyMjM5MTc2OF5BMl5BanBnXkFtZTgwMzg1NTMxMjE@._V1_SY1000_CR0,0,682,1000_AL_.jpg"
    }
  },
  {
    name: "Phoebe Buffay",
    occupation: "Massage Therapist",
    catchPhrase: "Smelly Cat, Smelly Cat, What are they feeding you? Smelly Cat, Smelly Cat, It's not your fauuuuult",
    image: "http://giphygifs.s3.amazonaws.com/media/4eoO0NSdNY11K/giphy.gif",
    movie: {
      title: "Romy y Michele",
      genre: "Comedy",
      plot: "Two dim-witted, inseparable friends hit the road for their ten-year high school reunion and concoct an elaborate lie about their lives in order to impress their classmates.",
      rate: 6,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BMTQyOTE0NjYxNV5BMl5BanBnXkFtZTgwMDA2Mzc2MDE@._V1_.jpg"
    }
  },
  {
    name: "Chandler Bing",
    occupation: "Advertising",
    catchPhrase: "I've had a very long, hard day",
    image: "https://media.giphy.com/media/hrk8ehR4lCZ27FtjPA/giphy.gif",
    movie: {
      title: "Fools Rush In",
      genre: "Comedy",
      plot: "After a one night stand with Alex, Isabel realizes that she is pregnant and they decide to get married. However, along with the marriage comes compromise of one's own cultural traditions.",
      rate: 6,
      pictureUrl: "https://m.media-amazon.com/images/M/MV5BM2Q3MzA3YmYtNzUzNS00NDhhLTkyZmYtMDU2YmE1ODY5MjdmXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY1000_SX668_AL_.jpg"
    }
  }
];

// Call the Celebrity model's create method with the array as argument.
// In the create method's callback, display feedback.

// Celebrity.create(celebrities)
//   .then((celebrities) => console.info(`${celebrities.length} new celebrities added to DataBase`))
//   .catch(error => console.error(error))
//   .then(() => mongoose.connection.close());

const findMovies = Promise.all(createMovies)
  .then(movies => {
    return celebrities.map(celebrity => {
       return Movie.findOne({
         title: celebrity.movie.title,
         genre: celebrity.movie.genre,
         plot: celebrity.movie.plot,
         rate: celebrity.movie.rate,
         pictureUrl: celebrity.movie.pictureUrl
        })
        .then(movie => {
          if (!movie) {
            throw new Error(`unknown movie 
              ${celebrity.movie.title}`);
          }
          return Object.assign({}, celebrity, {
            movie: movie._id
          });
        })
    });
  }).catch(error => {
    throw new Error(error)
  })
