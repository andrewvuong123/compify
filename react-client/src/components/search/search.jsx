import React from 'react';
import styled from 'styled-components';
import Header from '../header/header.jsx';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const Container = styled.div`

`;

const Description = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  width: 50%;
  padding-left: 8px;
  margin-left: 47px;
  margin-bottom: 20px;
  border-color: hsl(0,0%,80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  min-height: 33px;
  outline: 0 !important;
  position: relative;
  font-family: 'iCiel Gotham';
  font-size: 16px;
`;

const SearchContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const SearchBar = styled(AsyncSelect)`
  color: black;
  min-height: 55px;
`;

const Button = styled.button`
  margin: 10% auto;
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

const Option = styled.div`
  display: flex;
  align-items:center;
`;

const Image = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  height: 60px;
  width: 60px;
`;

const Name = styled.span`
  font-size: 20px;
`;

const customStyles = {
  input: () => ({
    marginLeft: '2px',
    fontSize: '25px'
  }),
  control: () => ({
  // none of react-select's styles are passed to <Control />
    background: 'white',
    height: 70,
    borderRadius: 5,
    display: 'flex',
  })
}

const Search = (props) => {

  const nameInput = React.createRef();

  const handleSubmit = async () => {
    // create playlist based on name input text
    await props.createPlaylist(nameInput.current.value);
    // handle api call to update a list of tracks in main state
    props.getTracks();
  };

  // get options for search dropdown
  const getOptions = (searchTerm) => {
    var data;
    var result = [];
    // get artist data based on searchterm from api
    return axios.get(`/api/artists`, { params: { search: searchTerm }})
      .then(res => {
        data = res.data;
        // filter out names from data, return a list for options to take in
      data.map((artist) => result.push( { value: { name: artist.name, id: artist.id }, label: <Option><Image src={artist.images[2].url} /><Name>{artist.name}</Name></Option> }));
        return result;
      });
  }

  return (
    <div>
      <Header />
      <Container>
        <Description>Build an awesome playlist!</Description>
        <Input ref={nameInput} placeholder="Name this playlist..." />
        <SearchContainer>
          <SearchBar maxMenuHeight='40vh' styles={customStyles} placeholder="Start with music similar to..." loadOptions={getOptions.bind(this)} onChange={props.handleSelect} />
        </SearchContainer>
        <Button onClick={handleSubmit}>Start Matching</Button>
      </Container>
    </div>
  )
}

export default Search;
