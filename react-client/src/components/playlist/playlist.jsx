import React from 'react';
import styled from 'styled-components';
import Header from '../header/header.jsx';

const Description = styled.h1`
  text-align: center;
`;

const Image = styled.img`
  width: 30%;
  float:left;
  margin-right: 2em;
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

const Container = styled.div`

`;

const Card = styled.div`
  width: 100%;
  display: inline-block;
  border-bottom: 2px solid #404040;
  padding: 15px 0 13px;
`;

const Title = styled.h2`
  margin-top: 8%;
`;

const Artist = styled.h2`
  margin-top: -5px;
  font-size: 17px;
`;

const Playlist = (props) => {
  // redirect to resulting playlist
  const handleRedirect = () => {
    window.open(
      `https://open.spotify.com/playlist/${props.playlistId}`,
      '_blank' // Open in a new window.
    );
  };

  return (
    <div>
      <Header />
      <Description>Checkout your new playlist!</Description>
      <Button onClick={handleRedirect}>Open Spotify</Button>
      <h2>{props.playlistName} · {props.playlistTracks.length} songs</h2>
      <Container>
        {props.playlistTracks.map((song) =>
          <Card key={song.title} >
            <Image src={song.url}></Image>
            <Title>{song.title}</Title>
            <Artist>{song.artist}</Artist>
          </Card>
        )}
      </Container>
    </div>
  )
};

export default Playlist;