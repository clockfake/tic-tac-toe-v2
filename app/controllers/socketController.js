import Game from '../models/game';
import winCheck from './helpers';

export default (io) => {
  io.on('connection', (socket) => {

    socket.on('get game status', async (id, cb) => {
      const game = await Game.findById(id);
      if (game.status === 'playing') return cb(game.board);
      return cb(game.status);
    });

    socket.on('join game', async (payload) => {
      const game = await Game.findById(payload.gameId);
      console.log('attempt to join game with ',payload);
      if (game[matchPlayer(payload.playerType)]) {
        return socket.emit('join game fail', 'Игрок уже подключен');
      } else {
      game[matchPlayer(payload.playerType)] = payload.playerId;
      await game.save();
      socket.join(game._id);
      socket.emit('join game success', payload.playerId);
      }

      if (game.playerX && game.playerO) {
        game.status = 'playing';
        await game.save();
        io.to(game._id).emit('game start', game.board);
      };
    });

    socket.on('make turn', async (payload) => {
      const game = await Game.findById(payload.id);
      if (game.status !== 'playing') return socket.emit('make turn fail', 'Нельзя совершить ход в этой игре');
      if (game[matchPlayer(game.currentTurn)] !== payload.playerId) return socket.emit('make turn fail', 'Не ваш ход');
      if (game.board[+payload.row][+payload.col] !== 0) socket.emit('make turn fail', 'Поле не пустое');
      game.board[+payload.row][+payload.col] = Number(game.currentTurn)+1;
      game.currentTurn = !game.currentTurn;
      await game.save();
      console.log(game.board);
      io.to(game._id).emit('make turn success', {row: payload.row, col: payload.col, type: Number(payload.playerType)+1});
      if (winCheck(game.board, payload.row, payload.col)) {
        game.status = 'finished';
        await game.save();
        io.to(game._id).emit('game end', `Игра закончена, победитель ${matchPlayer(payload.playerType).slice(6,7)}`);
      }
    });
  });
}

function matchPlayer(type) {
  if (type) return 'playerO';
  return 'playerX';
}
