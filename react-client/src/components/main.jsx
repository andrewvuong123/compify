import React from 'react';
import Header from './header/header.jsx';
import styled from 'styled-components';
import config from '../../../config.js';

const Login = styled.div`

`;

const Button = styled.button`
  margin: 0 auto;
  display: block;
  color: #fff;
  background-color: #1db954;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  padding: 16px 48px 18px;
  border-width: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  transition-property: background-color;
  transition-duration: .3s;

  &:hover {
    background-color: #1ed760;
    cursor: pointer;
  }

  &:active {
    background-color: #1aa34a;
  }
`;

const Home = (props) => {

  const handleLogin = () => {
    window.location = `${config.AUTHORIZE_URL}?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <Login>
      <Header />
      <Button onClick={handleLogin}>Login to Spotify</Button>
    </Login>
  )
}

export default Home;