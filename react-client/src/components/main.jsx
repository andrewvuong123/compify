import React from 'react';
import Header from './header/header.jsx';
import styled from 'styled-components';
import config from '../../../config.js';
import axios from 'axios';

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

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const Home = (props) => {

  return (
    <Login>
      <Header/>
      <h1>Create new music playlists in seconds</h1>
      <h3> Compify is a playlist builder that aggregates top tracks that match your search criteria. Enter in any of your favorite artists and we'll find the best tracks for you! Swipe right on the songs that you enjoy and build up a new playlist that you can save to your Spotify account. </h3>
      <Button><Link href="/login">Login to Spotify</Link></Button>
    </Login>
  )
}

export default Home;