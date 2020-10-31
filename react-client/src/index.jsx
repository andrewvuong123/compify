import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import HomePage from './components/main.jsx';
import SearchPage from './components/search/search.jsx';
import CarouselPage from './components/carousel/carousel.jsx';
import PlaylistPage from './components/playlist/playlist.jsx';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // componentDidMount() {

  // }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/redirect" component={SearchPage} />
            <Route path="/swipe" component={CarouselPage} />
            <Route path="/result" component={PlaylistPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));