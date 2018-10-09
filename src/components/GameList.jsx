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

  render() {
    if (!this.state.fetchedData) return <p>Loading...</p>;
    if (this.state.fetchedData.length === 0) return (
      <>
      <p>Open games list is currently empty...</p>
      <button onClick={this.createGame}>Create game</button>
      </>
    );
    return (
      <React.Fragment>
      <div>
        <p>Open games:</p>
      </div>
      <div>
        {this.state.fetchedData.map(i => {
          return (
            <div key={i._id}>
              <p>{i.createdAt}</p>
              <p> Existing players:
              {i.playerX && 'X'}
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
