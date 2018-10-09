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

  createGame = async () => {
    const resp = await axios.post(`${apiLink}/api/creategame`);
    this.props.history.push(`/game/${resp.data.game._id}`);
  }

  // deleteGame = async () => {
  //   const resp = await axios.post(`${apiLink}/api/deletegame`, {
  //
  //   });

  // }

  render() {
    if (!this.state.fetchedData) return <p>Loading...</p>;
    return (
      <React.Fragment>
      <div>
        <p>Open games:</p>
      </div>
      <div>
        {this.state.fetchedData.map(i => {
          console.log(i);
          return (
            <div key={i._id}>
              <p>{i.createdAt}</p>
              <p> Existing players:
              {i.playerX !== null && 'X'}
              {i.playerO && 'O'}
              </p>
              <Link to={`/game/${i._id}`}>Join game</Link>
            </div>
          )
        })}
        <button onClick={this.createGame}>Create game</button>
      </div>
      </React.Fragment>
    )
  }
}
