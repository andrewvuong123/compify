var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// redirect to authentication page
app.get('/login', (req, res) => {
  var authUrl = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authUrl+"&show_dialog=true");
});

// store access/refresh tokens in session storage
app.get('/callback', async (req, res) => {
  // code returned as query from redirect uri
  const code = req.query.code;
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
    res.redirect('http://localhost:3000/error');
  }
});

// get artists for search select
app.get('/api/artists', (req, res) => {
  // get data from api
  var name = req.query.search;
  spotifyApi.searchArtists(name)
    .then(function(data) {
      res.status(200).send(data.body.artists.items);
    }, function(err) {
      res.status(400).send(err);
    });
});

// create a new playlist
app.post('/api/playlist', (req, res) => {
  var name = req.body.name;
  spotifyApi.createPlaylist(name, { 'description': 'Brought to you by Compify!', 'public': true })
    .then(function(data) {
      res.status(201).send(data.body.id);
    }, function(err) {
      res.status(400).send(err);
    });
});

// get recommended tracks based on seeds
app.get('/api/tracks', (req, res) => {
  var id = req.query.id;
  spotifyApi.getRecommendations({
    min_energy: 0.4,
    seed_artists: [id],
    min_popularity: 50
  })
    .then(function(data) {
      let recommendations = data.body.tracks;
      res.status(200).send(recommendations);
    }, function(err) {
      res.status(400).send(err);
    });
});

// add song to existing playlist
app.post('/api/playlist/song', (req, res) => {
  var playlistId = req.body.playlistId;
  var trackList = req.body.tracks;
  spotifyApi.addTracksToPlaylist(playlistId, trackList)
    .then(function(data) {
      res.status(201).send('Success!');
    }, function(err) {
      res.status(400).send(err);
    });
});

// get tracks from playlist
app.get('/api/playlist', (req, res) => {
  var playlistId = req.query.playlistId;
  spotifyApi.getPlaylist(playlistId)
    .then(function(data) {
      res.status(200).send(data.body.tracks.items);
    }, function(err) {
      res.status(400).send(err);
    });
});

app.get('*', (req, res) => res.sendFile(path.resolve('react-client', 'dist', 'index.html')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

