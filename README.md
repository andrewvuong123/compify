# Compify - A Spotify playlist creator #
This project is an ERN stack application with a Spotify meets Tinder twist for compiling music playlists. Users can propose artists that they enjoy listening to and will get matched with recommended songs to swipe through within a Tinder-like interface.

## Demo ##

<p align="center">
<img src="https://media.giphy.com/media/MFNB4p7Dezgz7bK2S0/giphy.gif" width="50%"></p>

Full Demo: https://youtu.be/DAMeaYAyEuI

## Setting Up ##
Before using the Spotify Web API, you will need to register your own Spotify app and set the credentials within a config file. Process is as follows:

1. Create an application on [Spotify's Developer Site](https://developer.spotify.com/my-applications/).

2. Add http://localhost:3000/callback as the redirect uri

3. Create a `config.js` file in the root of the project with the following variables;

    - `AUTHORIZE_URL`
    - `REDIRECT_URL`
    - `CLIENT_ID`
    - `CLIENT_SECRET`

Example:
```
AUTHORIZE_URL=https://accounts.spotify.com/authorize
REDIRECT_URL=http://localhost:3000/callback
CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>
```

## Dependencies ##

Install the dependencies by running `npm install --save`.

## Running ##

During development, run `npm run react-dev && npm run server-dev`.

When running on production, run `npm run build && npm run start`.

