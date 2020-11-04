import React from 'react';
import Header from './header/header.jsx';
import styled from 'styled-components';
import Slider from 'react-slick';
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';

const Login = styled.div`

`;

const Description = styled.h1`
  text-align: center;
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

const Carousel = styled(Slider)`
  left: -2%;
`;

const Slide = styled.div`
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 20px;
`;

const Image = styled.img`
  height: 200px;
  margin-left: auto;
  margin-right: auto;
`;

const Caption = styled.h3`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const Home = (props) => {

  // carousel settings
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    // autoplay: 1000,
    cssEase: 'linear',
    centerMode: true
  }

  return (
    <Login>
      <Header/>
      <Description>Create new playlists in seconds!</Description>
      <Carousel {...settings}>
        <Slide>
          <Image src={slide1}/>
          <Caption>Enter in any of your favorite artists and we'll find the best tracks for you! </Caption>
        </Slide>
        <Slide>
          <Image src={slide2}/>
          <Caption>Explore different songs and swipe right on the ones you enjoy</Caption>
        </Slide>
        <Slide>
          <Image src={slide3}/>
          <Caption>Build up a playlist that can be saved to your Spotify account!</Caption>
        </Slide>
      </Carousel>
      <Button><Link href="/login">Login to Spotify</Link></Button>
    </Login>
  )
}

export default Home;