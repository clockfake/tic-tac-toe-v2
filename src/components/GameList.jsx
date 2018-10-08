import React, { Component } from 'react';
import { apiLink } from '../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class GameList extends Component {
  state = {
    fetchedData: null,
    selectedTab: 0
  }

  componentDidMount = async() => {
    const resp = await axios.get(`${apiLink}/api/viewopen`);
    this.setState({fetchedData: resp.data.games});
  }

  // handleSelect(tab) {
  //   if (tab === 0)
  // }

  render() {
    return (
      <div>
        <p>Open games</p>
        // <p>Recently finished games</p>
      </div>
      <div>
        {this.state.fetchedData.map(i => (
          <div key={i._id}>
            <p>{i.createdAt}</p>
            <p> Existing player:
            {i.playerX !== null && 'X'}
            {i.playerO !== null && 'O'}
            {i.playerX === null && <button>Join as X</button>}
            {i.playerO === null && <button>Join as O</button>}
            </p>
          </div>
        ))}
      </div>
    )
  }
}
