import React from 'react';
import styled from 'styled-components';
import image from '../../assets/logo.png';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #404040;
  justify-content: center;
  text-align: center;
`;

const Logo = styled.img`
  width: 300px;
`;

const Link = styled.a`
  display: inline-block;
  max-width 350px;
`;

const Header = () => {
  return (
    <Container>
      <Link href="/">
        <Logo src={image}/>
      </Link>
    </Container>
  )
};

export default Header;