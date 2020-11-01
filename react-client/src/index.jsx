import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      artists: [ // shows artists to select for search
        { value: 'Ari', label: 'Ariana' },
        { value: 'strawberry', label: 'Kanye West' },
        { value: 'vanilla', label: 'Khalid' }],
      tracks: [ // shows tracks for matching
        {
          title: 'Positions',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'My Hair',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: '34 35',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'Motive',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'Love Language',
          artist: 'Ariana Grande',
          url: image
        }
      ],
      playlistId: '', // id to add songs to playlist
      playlistName: 'Andrews List', // name of playlist
      playlistTracks: [  // all songs within a created playlist
        {
          title: 'Positions',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'My Hair',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: '34 35',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'Motive',
          artist: 'Ariana Grande',
          url: image
        },
        {
          title: 'Love Language',
          artist: 'Ariana Grande',
          url: image
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  // componentDidMount() {

  // }

  handleChange(selectedArtist) {
    console.log(selectedArtist);
    this.setState({selectedArtist});
  }

  // create playlist
  createPlaylist(name) {
    // api call to create playlist, update state playlist id/name
    console.log(name);
    console.log(this.state.playlistId);
  }

  // get tracks for carousel
  getTracks() {
    // api call to get tracks, update state tracks
    console.log(this.state.selectedArtist);
  }

  // get songs within playlist
  getPlaylist() {
    // api call to get playlist, update state playlist tracks
    console.log(this.state.playlistId);
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/search" render={(props) => <SearchPage {...props} options={this.state.artists} handleChange={this.handleChange} createPlaylist={this.createPlaylist} getTracks={this.getTracks}/>} />
            <Route path="/swipe" render={(props) => <CarouselPage {...props} tracks={this.state.tracks} playlistId={this.state.playlistId}/>} />
            <Route path="/result" render={(props) => <PlaylistPage {...props} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));