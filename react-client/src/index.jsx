import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import HomePage from './components/main.jsx';
import SearchPage from './components/search/search.jsx';
import CarouselPage from './components/carousel/carousel.jsx';
import PlaylistPage from './components/playlist/playlist.jsx';
import NotFoundPage from './components/notFound.jsx';
import styled from 'styled-components';

import image from './assets/positions.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArtist: '',
      selectedArtistId: '',
      tracks: [],
      carouselRedirect: false,
      resultRedirect: false,
      playlistId: '',
      playlistName: '',
      playlistTracks: []
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  // update state with selected artist for carousel matches
  handleSelect(selectedArtist) {
    this.setState({
      selectedArtist: selectedArtist.value.name,
      selectedArtistId: selectedArtist.value.id
    });
  }

  // create new playlist
  createPlaylist(name) {
    // api call to create playlist, update state with playlist id/name
    axios.post('/api/playlist', { name: name })
      .then((res) => {
        // update state playlist name, id
        this.setState({
          playlistId: res.data,
          playlistName: name
        });
      }, (err) => {
        console.log(err);
      });
  }

  // get tracks for carousel based on selectedArtist
  getTracks() {
    var data;
    var result = [];
    // api call to get tracks, update state tracks
    axios.get('/api/tracks', { params: { id: this.state.selectedArtistId }})
      .then(res => {
        data = res.data;
        // reshape data into the result array
        data.map((track) => result.push( { title: track.name, artist: track.artists[0].name, url: track.album.images[1].url, preview: (track.preview_url === null) ? 'random' : track.preview_url, uri: track.uri }));
        // update state tracks for matching
        this.setState({
          tracks: result,
          carouselRedirect: true
        });
      });
  }

  // get songs within playlist based on swiped cards
  getPlaylist() {
    var data;
    var result = [];
    // api call to get playlist, update state playlist tracks
    axios.get('/api/playlist', { params: { playlistId: this.state.playlistId }})
      .then(res => {
        data = res.data;
        // reshape data into the result array
        data.map((song) => result.push( { title: song.track.name, artist: song.track.artists[0].name, url: song.track.album.images[1].url }));
        // update state tracks for matching
        this.setState({
          playlistTracks: result,
          resultRedirect: true
        });
      });
  }

  // flow to redirect to another page
  renderRedirect() {
    if (this.state.carouselRedirect) {
      // reset state to false
      this.setState({
        carouselRedirect: false
      });
      return <Redirect to='/swipe' />
    }
    if (this.state.resultRedirect) {
      this.setState({
        resultRedirect: false
      });
      return <Redirect to='/result' />
    }
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          {this.renderRedirect()}
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/search" render={(props) => <SearchPage {...props} handleSelect={this.handleSelect} createPlaylist={this.createPlaylist} tracks={this.state.tracks} getTracks={this.getTracks}/>} />
            <Route path="/swipe" render={(props) => <CarouselPage {...props} tracks={this.state.tracks} playlistId={this.state.playlistId} getPlaylist={this.getPlaylist} />} />
            <Route path="/result" render={(props) => <PlaylistPage {...props} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} playlistId={this.state.playlistId} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));