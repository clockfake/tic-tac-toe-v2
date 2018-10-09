import Game from '../models/game';

export default {
  async viewOpenGames(ctx) {
    const games = await Game.find({status: 'hosted'});
    ctx.body = { games };
  },

  async createGame(ctx) {
    const game = new Game({
      status: 'hosted',
      board: generateArrays()
    });
    await game.save();
    ctx.body = { game };
  },
}

function generateArrays() {
  let arr = [];
  for (let i = 0; i<24; i++) {
    const row = new Array(24).fill(0);
    arr.push(row);
  }
  return arr;
}
