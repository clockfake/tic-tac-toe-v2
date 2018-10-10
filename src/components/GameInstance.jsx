import React, { Component } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
// import { apiLink } from '../constants';
import uniqid from 'uniqid';
import Board from './Board.jsx';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  button: {
    margin: '10px'
  },
  field: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-around'
  },
  info: {
    flex: 2
  }
});

class GameInstance extends Component {
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
    this.socket = io();
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
      this.setState({board: JSON.parse(response), serverResp: null});
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
            currentTurn: payload.currentTurn,
            playerX: payload.playerX,
            playerO: payload.playerO
          });
        case 'finished':
          return this.setState({
            winner: payload.winner,
            board: JSON.parse(payload.board)
          });
        default: return null;
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
    if (this.state.winner) return;
    const player = this.state.currentTurn ? 'playerO' : 'playerX';
    console.log()
    if (this.state[player] !== this.state.playerId) return;
    this.socket.emit('make turn', {
      id: this.props.match.params.id,
      row: row,
      col: col,
      playerId: this.state.playerId
    });
  }

  closeSnackbar = () => {
    this.setState({serverResp: null});
  }

  snackBar = () => (
    <Snackbar
    anchorOrigin={{
    vertical: 'bottom',
      horizontal: 'left',
    }}
    open={this.state.serverResp !== null}
    autoHideDuration={3000}
    onClose={this.closeSnackbar}
    message={<span>{this.state.serverResp}</span>}
    action={
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={this.handleClose}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </IconButton>
    }
  />);

  render() {
    if (!this.state.board) return (
        <div>
          <Button variant="contained" className={this.props.classes.button} disabled={this.state.playerX !==null} onClick={() => this.joinGame(false)}>join game as X</Button>
          <Button variant="contained" className={this.props.classes.button} disabled={this.state.playerO !==null} onClick={() => this.joinGame(true)}>join game as O</Button>
          {this.snackBar()}
        </div>
      );
    return (
      <div className={this.props.classes.field}>
      <Board board={this.state.board} makeTurn={(row, col) => this.makeTurn(row, col)}/>
      <div className={this.props.classes.info}>
      {this.state.winner && <Typography variant="h6">Game is finished, winner is {this.state.winner}</Typography>}
      {this.state.winner && <Button variant="outlined" color="primary" component={Link} to="/">Back to main page</Button>}
      {!this.state.winner && <p>Current turn: {this.state.currentTurn ? 'O' : 'X'}</p>}
      {this.snackBar()}
      </div>
      </div>
    )
  }
}
export default withStyles(styles)(GameInstance);
