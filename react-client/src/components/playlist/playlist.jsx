import React from 'react';
import styled from 'styled-components';
import Header from '../header/header.jsx';

const Description = styled.h1`
  text-align: center;
`;

const Image = styled.img`
  max-width: 640px;
`;

const Button = styled.button`
  margin: 0 auto 0 auto;
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

// fake data
// const db = [
//   {
//     title: 'Positions',
//     artist: 'Ariana Grande',
//     url: image
//   },
//   {
//     title: 'My Hair',
//     artist: 'Ariana Grande',
//     url: image
//   },
//   {
//     title: '34 35',
//     artist: 'Ariana Grande',
//     url: image
//   },
//   {
//     title: 'Motive',
//     artist: 'Ariana Grande',
//     url: image
//   },
//   {
//     title: 'Love Language',
//     artist: 'Ariana Grande',
//     url: image
//   }
// ]

const Playlist = () => {

  // redirect to resulting playlist
  const handleRedirect = () => {
    window.open(
      'https://open.spotify.com',
      '_blank' // <- This is what makes it open in a new window.
    );
    // add /playlist/:playlistId to redirect to specific playlist
  };

  return (
    <div>
      <Header />
      <Description>Checkout your new playlist!</Description>
      <Button onClick={handleRedirect}>Open Spotify</Button>
    </div>
  )
};

export default Playlist;