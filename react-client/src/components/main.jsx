import React from 'react';
import Header from './header/header.jsx';
import styled from 'styled-components';

const Login = styled.div`

`;

const Home = (props) => {
  return (
    <Login>
      <Header />
      <button>Login to Spotify</button>
    </Login>
  )
}

export default Home;