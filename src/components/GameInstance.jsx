import React, { Component } from 'react';

export default class GameInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverResp: null,
      gameStarted: false,
      row: '',
      col: '',
      currentTurn: false,
      winner: false
    }
    this.socket = io(apiLink);
    this.socket.on('join game fail', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('join game success', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('game start', (response) => {
      this.setState({gameStarted: true, serverResp: ''});
    });
    this.socket.on('make turn fail', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('make turn success', () => {
      this.setState(({currentTurn}) => ({
        serverResp: 'turn successfull',
        currentTurn: !currentTurn,
        row: '',
        col: ''
      }));
    });
    this.socket.on('game end', (message) => {
      this.setState({winner: message})
    });
    this._id = '101';
  }

  joinGame = (joinAs) => {
    this.socket.emit('join game', {
      playerType: joinAs
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.socket.emit('make turn', {
      playerType: this.state.currentTurn,
      row: this.state.row,
      col: this.state.col
    });
  }

  render() {
    if (this.state.winner) return <p>{this.state.winner}</p>
    if (!this.state.gameStarted) return (
        <div className="App">
          <button onClick={() => this.joinGame(false)}>join game as X</button>
          <button onClick={() => this.joinGame(true)}>join game as Y</button>
          <p>{this.state.serverResp}</p>
        </div>
      );
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.row} placeholder="строка" onChange={(e) => this.setState({row: e.target.value})}/>
        <input type="text" value={this.state.col} placeholder="столбец" onChange={(e) => this.setState({col: e.target.value})}/>
        <button type="submit">Сходить</button>
      </form>
      <p>{this.state.serverResp}</p>
      </div>
    )
  }
}
