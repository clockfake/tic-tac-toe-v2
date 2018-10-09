import React, { Component } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { apiLink } from '../constants';
import uniqid from 'uniqid';
import Board from './Board.jsx';

export default class GameInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: null,
      playerO: null,
      serverResp: null,
      board: null,
      currentTurn: false,
      winner: false,
      playerId: null
    }
    this.socket = io(`${apiLink}`);
    this.socket.on('ask for gameid', (cb) => {
      cb(this.props.match.params.id);
    });
    this.socket.on('join game fail', (response) => {
      this.setState({serverResp: response});
    });
    this.socket.on('join game success', (response, playerType, playerId) => {
      this.setState({serverResp: response, [playerType]:playerId });
    });
    this.socket.on('game start', (response) => {
      this.setState({board: JSON.parse(response), serverResp: ''});
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
      this.setState({winner: message});
    });
  }

  componentDidMount() {
    let id = window.localStorage.getItem('id');
    if (!id) {
      id = uniqid();
      window.localStorage.setItem('id', id);
    }
    this.setState({playerId: id});
    this.socket.emit('get game status', this.props.match.params.id, (status, payload) => {
      switch (status) {
        case 'hosted':
          return this.setState({
            playerX: payload.playerX,
            playerO: payload.playerO
          });
        case 'playing':
          return this.setState({
            board: JSON.parse(payload.board),
            currentTurn: payload.currentTurn
          });
        case 'finished':
          return this.setState({
            winner: payload.winner
          });
        default:;
      }
    });
  }

  joinGame = (joinAs) => {
    this.socket.emit('join game', {
      playerType: joinAs,
      gameId: this.props.match.params.id,
      playerId: this.state.playerId
    });
  }

  makeTurn = (row, col) => {
    this.socket.emit('make turn', {
      id: this.props.match.params.id,
      row: row,
      col: col,
      playerId: this.state.playerId
    });
  }

  render() {
    if (this.state.winner) return (
      <div>
        <p>{this.state.winner}</p>
        <Link to="/">Back to main page</Link>
      </div>
    );
    if (!this.state.board) return (
        <div className="App">
          <button disabled={this.state.playerX !==null} onClick={() => this.joinGame(false)}>join game as X</button>
          <button disabled={this.state.playerO !==null} onClick={() => this.joinGame(true)}>join game as Y</button>
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
