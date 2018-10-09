import React, { Component } from 'react';
import io from 'socket.io-client';
import { apiLink } from '../constants';
import uniqid from 'uniqid';
import Board from './Board.jsx';

export default class GameInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverResp: null,
      board: null,
      currentTurn: false,
      winner: false,
      playerId: null
    }
    this.socket = io(apiLink);
    this.socket.on('join game fail', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('join game success', (response) => {
      window.localStorage.setItem(this.props.match.params.id, response);
      this.setState({playerId: response});
    });
    this.socket.on('game start', (response) => {
      this.setState({board: response, serverResp: ''});
    });
    this.socket.on('make turn fail', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('make turn success', (payload) => {
      let board = this.state.board;
      let newRow = [...board[payload.row]];
      newRow[payload.col] = payload.type;
      board[payload.row] = newRow;
      this.setState(({currentTurn}) => ({
        board,
        serverResp: 'turn successfull',
        currentTurn: !currentTurn
      }));
    });
    this.socket.on('game end', (message) => {
      this.setState({winner: message})
    });
  }

  componentDidMount() {
    const id = window.localStorage.getItem(this.props.match.params.id);
    this.socket.emit('get game status', this.props.match.params.id, (data) => {
      if (typeof data !== 'string') this.setState({board: data});
    });
    if (!this.state.playerId && id) this.setState({playerId: id});
  }

  joinGame = (joinAs) => {
    let id = window.localStorage.getItem(this.props.match.params.id);
    if (!id) id = this.state.playerId;
    if (!id) id = uniqid();
    this.socket.emit('join game', {
      playerType: joinAs,
      gameId: this.props.match.params.id,
      playerId: id
    });
  }

  makeTurn = (row, col) => {
    console.log(row,col);
    this.socket.emit('make turn', {
      id: this.props.match.params.id,
      row: row,
      col: col,
      playerId: this.state.playerId
    });
  }

  render() {
    if (this.state.winner) return <p>{this.state.winner}</p>
    if (!this.state.board) return (
        <div className="App">
          <button onClick={() => this.joinGame(false)}>join game as X</button>
          <button onClick={() => this.joinGame(true)}>join game as Y</button>
          <p>{this.state.serverResp}</p>
        </div>
      );
    return (
      <div className="App">
      <Board board={this.state.board} makeTurn={(row, col) => this.makeTurn(row, col)}/>
      <p>Current turn: {this.state.currentTurn? 'O' : 'X'}</p>
      <p>{this.state.serverResp}</p>
      </div>
    )
  }
}
