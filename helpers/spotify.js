// file to make API calls to Spotify API
const axios = require('axios');
const config = require('../config.js');


// get artists for drop down based on search input text
const getArtists = async (name) => {
  const response = await axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=10`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " +
    }
  })
  .then(data => {

  })


  let options = {
    url: `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=10`
  }
  return axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist&limit=10`, {
    headers: {

      'Content-Type': 'application/json',
      'Authorization:'
    }
  })
}
// create playlist based on name input
// get list of recommended tracks based on selected Artist
// add track to playlist based on playlistID
// get playlist song/name data based on playlistId

let getMovieInfo = (movie) => {
  let options = {
    url: `https://api.themoviedb.org/3/search/movie?api_key=${config.TOKEN}&query=${movie}`
  }

  // return promise object
  return new Promise((resolve, reject) => {
    axios.get(options.url)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

module.exports.getMovieInfo = getMovieInfo;