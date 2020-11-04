import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../header/header.jsx';
import TinderCard from 'react-tinder-card';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Container = styled.div`
`;

const Description = styled.h1`
  text-align: center;
`;

const HiddenText = styled.h3`
  position: relative;
  top: 300px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 87%;
  color: black;
  margin: 15px auto 0 auto;
  font-size: 2vw;
`;

const Artist = styled.h3`
  color: black;
  margin-top: 3px;
`;

const BtnContainer = styled.div`
  display: inline-flex;
  position: relative;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Create = styled.button`
  display: block;
  margin: 75% auto 10% auto;
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

const Left = styled.button`
  display: block;
  margin-right: 200px;
  background-color: #E86948;
  border-radius: 50%;
  padding: 18px;
  border-width: 0;
  outline: none;
  transition-property: background-color;
  transition-duration: .3s;

  &:hover {
    background-color: #ff734c;
    cursor: pointer;
  }

  &:active {
    background-color: #cf7e6a;
  }
`;

const Right = styled.button`
  display: block;
  margin-left: 200px;
  background-color: #49C68F;
  border-radius: 50%;
  padding: 18px;
  border-width: 0;
  outline: none;
  transition-property: background-color;
  transition-duration: .3s;

  &:hover {
    background-color: #59f0aa;
    cursor: pointer;
  }

  &:active {
    background-color: #62ad8d;
  }
`;

const Audio = styled(AudioPlayer)`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const savedSongs = []; // saved track objects
const savedTitles =[]; // saved titles to avoid duplicates
const removed = [];

const Carousel = (props) => {
  const tracks = props.tracks;

  const [characters, setCharacters] = useState(tracks);
  const [lastDir, setLastDir] = useState();

  const childRefs = useMemo(() => Array(tracks.length).fill(0).map(i => React.createRef()), []);

  // manual swiping
  const swiped = (direction, songToDelete, songToSave) => {
    // add when swiped right
    if (direction === 'right') {
      savedSongs.push(songToSave.uri);
      savedTitles.push(songToDelete);
    }
    setLastDir(direction);
    removed.push(songToDelete);
  };

  // button swiping
  const swipe = (direction) => {
    const cardsLeft = characters.filter(song => !removed.includes(song.title));
    if (cardsLeft.length) {
      const toRemove = cardsLeft[cardsLeft.length - 1].title;
      const toSave = cardsLeft[cardsLeft.length - 1];
      const index = tracks.map(song => song.title).indexOf(toRemove);
      removed.push(toRemove);
      childRefs[index].current.swipe(direction);
      // only add if not within playlist
      if (direction === 'right' && !savedTitles.includes(toRemove)) {
        savedSongs.push(toSave.uri);
        savedTitles.push(toRemove);
      }
    }
  }

  const handleCreate = async () => {
    // make api call to add all saved songs to the playlist
    await axios.post('/api/playlist/song', { playlistId: props.playlistId, tracks: savedSongs })
      .then((res) => {
        console.log('Successful creation!');
      }, (err) => {
        console.log(err);
      });

    // call to update songs in playlist within main state
    props.getPlaylist();
  };

  return (
    <div>
      <Header />
      <Description>Swipe right to add to your playlist!</Description>
      <HiddenText> Nice music taste, let's hit create! </HiddenText>
      <Container>
        {tracks.map((song, index) =>
          <TinderCard ref={childRefs[index]} key={song.title} onSwipe={(dir) => swiped(dir, song.title, song)}>
            <Card>
              <Image src={song.url}></Image>
              <Title>{song.title}</Title>
              <Artist>{song.artist}</Artist>
              <Audio src={song.preview}/>
            </Card>
          </TinderCard>
        )}
      </Container>
      <BtnContainer>
        <Left onClick={() => swipe('left')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Left>
        <Right onClick={() => swipe('right')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </Right>
      </BtnContainer>
        <Create onClick={handleCreate}>Create Playlist</Create>
    </div>
  )
};

export default Carousel;