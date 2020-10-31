import React from 'react';
import styled from 'styled-components';
import image from '../../assets/logo.png';
const Logo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <Logo src={image}/>
  )
};

export default Header;