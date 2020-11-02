var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
// var spotifyAPI = require('../helpers/spotify.js');
var spotifyWebAPI = require('spotify-web-api-node');
var config = require('../config.js');
// var items = require('../database-mongo');

var scopes = ['playlist-modify-private', 'playlist-modify-public'],
    redirectUri = config.REDIRECT_URL,
    clientSecret = config.CLIENT_SECRET,
    clientId = config.CLIENT_ID;

var spotifyApi = new spotifyWebAPI({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret
});

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
// Enabling CORS
app.use(cors());
// app.use(bodyParser.json);

// redirect to authentication page
app.get('/login', (req, res) => {
  var authUrl = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authUrl+"&show_dialog=true");
});

// store access/refresh tokens in session storage
app.get('/callback', async (req, res) => {
  // code returned as query from redirect uri
  const code = req.query.code;
  console.log('query', req.query.code);
  try {
    // get access/refresh token
    var data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    // set access token on the API object to use in other calls
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    // redirect to search page
    res.redirect('http://localhost:3000/search');
  } catch(err) {
    console.log(err);
    res.redirect('http://localhost:3000/error');
  }
});

// app.get('', (req, res) => {
//   // get data from api
//   var name = req.query;
//   var data = spotifyApi.getArtists(name);
//   res.status.send({options: data});
// });

app.get('*', (req, res) => res.sendFile(path.resolve('react-client', 'dist', 'index.html')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

