import React from 'react';
import styled from 'styled-components';
import image from '../../assets/logo.png';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #404040;
  padding: 5px 0 5px;
  margin-bottom: 30px;
  justify-content: center;
`;

const Logo = styled.img`

`;

const Header = () => {
  return (
    <Container>
      <a href="/">
        <Logo src={image}/>
      </a>
    </Container>
  )
};

export default Header;