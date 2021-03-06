import React from 'react';
import Header from './header/header.jsx';
import styled from 'styled-components';

const Button = styled.button`
  margin: 25% auto 0 auto;
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

const NotFoundPage = () => {

  const handleRedirect = () => {
    window.location = `http://localhost:3000/`;
  };

  return (
    <div>
      <Header />
      <h1>Oops something went wrong! Head back to the home page.</h1>
      <Button onClick={handleRedirect}>Home</Button>
    </div>
  )
};

export default NotFoundPage;