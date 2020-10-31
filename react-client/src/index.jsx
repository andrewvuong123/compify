import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './components/header/header.jsx';
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
    <div>
      <Header/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));