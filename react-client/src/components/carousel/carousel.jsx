import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../header/header.jsx';
import TinderCard from 'react-tinder-card';
import image from '../../assets/positions.jpg';

const Container = styled.div`
  margin-top: 5%;
`;

const Description = styled.h1`
  text-align: center;
`;

const Card = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: #fff;
  max-width: 350px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const Image = styled.img`
  max-width: 85%;
  max-height: 85%;
  margin-top: 6%;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  cursor: pointer;
`;

const Title = styled.h3`
  color: black;
  margin: 15px auto 0 auto;
  font-size: 30px;
`;

const Artist = styled.h3`
  color: black;
  margin-top: 3px;
`;

const Button = styled.button`
  margin: 75% auto 0 auto;
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

const Carousel = (props) => {
  const tracks = props.tracks;

  // add to playlist when swiped right
  const swiped = (direction) => {
    if (direction === 'right') {
      console.log('right');
    }
  }

  const handleCreate = () => {
    // call to get all songs in playlist
    //props.getPlaylist();
    // redirect to resulting playlist
    window.location = `http://localhost:3000/result`;

  };

  return (
    <div>
      <Header />
      <Description>Swipe right to add to your playlist!</Description>
      <Container>
        {tracks.map((song) =>
          <TinderCard key={song.title} onSwipe={(dir) => swiped(dir)}>
            <Card>
              <Image src={song.url}></Image>
              <Title>{song.title}</Title>
              <Artist>{song.artist}</Artist>
            </Card>
          </TinderCard>
        )}
      </Container>
      <Button onClick={handleCreate}>Create Playlist</Button>
    </div>
  )
};

export default Carousel;