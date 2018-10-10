import Game from '../models/game';
import winCheck from './helpers';

export default (io) => {
  io.on('connection', (socket) => {
    socket.emit('ask for gameid', (id) => {
      socket.join(id);
    });

    socket.on('get game status', async (id, cb) => {
      const game = await Game.findById(id);
      return cb(game.status, game);
    });

    socket.on('join game', async (payload) => {
      console.log('attempt to connect with ', payload);
      const game = await Game.findById(payload.gameId);
      if (game[matchPlayer(payload.playerType)]) {
        return socket.emit('join game fail', 'Other player is already connected');
      } else {
      game[matchPlayer(payload.playerType)] = payload.playerId;
      await game.save();
      socket.join(game._id);
      socket.emit('join game success', 'Connection successfull', matchPlayer(payload.playerType), payload.playerId);
      }

      if (game.playerX && game.playerO) {
        game.status = 'playing';
        await game.save();
        io.to(game._id).emit('game start', game.board);
      };
    });

    socket.on('make turn', async (payload) => {
      let game = await Game.findById(payload.id);
      let board = JSON.parse(game.board);
      if (game.status !== 'playing') return socket.emit('make turn fail', 'Game is not being played currently');
      console.log(game[matchPlayer(game.currentTurn)], payload.playerId);
      if (game[matchPlayer(game.currentTurn)] !== payload.playerId) return socket.emit('make turn fail', 'Not your turn');
      if (board[+payload.row][+payload.col] !== 0) return socket.emit('make turn fail', 'This field is not empty');
      board[+payload.row][+payload.col]=Number(game.currentTurn)+1;
      game.board = JSON.stringify(board);
      game.currentTurn = !game.currentTurn;
      await game.save();
      io.to(game._id).emit('make turn success', {row: payload.row, col: payload.col, type: Number(!game.currentTurn)+1});

      if (winCheck(board, payload.row, payload.col)) {
        const winner = `Игра закончена, победитель ${matchPlayer(!game.currentTurn).slice(6,7)}`;
        game.status = 'finished';
        game.winner = winner;
        await game.save();
        io.to(game._id).emit('game end', winner);
      }
    });
  });
}

function matchPlayer(type) {
  if (type) return 'playerO';
  return 'playerX';
}
