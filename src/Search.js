import React, { Component } from 'react';
import './styles.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  findMatches(wordToMatch) {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    let cities = [];
    fetch(endpoint)
      .then(response => response.json())
      .then(data => cities.push(...data));

    return cities.filter(place => {
      const regex = new RegExp('wordToMatch, gi');
      return place.cities.match(regex) || place.state.match(regex);
    })
  }

  onChange(text) {
    this.setState({
      text: text
    })

    findMatches(this.state.text);
  }

  // displayMatches() {
  //   const matchArray = findMatches(this.value, cities);
  //   const html = matchArray.map(place => {
  //     const regex = new RegExp(this.value, 'gi');
  //     const cityName = place.city;
  //     const stateName = place.state;
  //   })
  // }



  render() {
    return (
      <form className='search-form'>
        <input onChange={(e) => {this.onChange(e.target.value)}} type='text' className='search' placeholder='City or State'/>
      </form>
    )
  }

}

export default Search;
