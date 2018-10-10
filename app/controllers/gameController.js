import Game from '../models/game';

export default {
  async viewGames(ctx) {
    const { type = 'hosted' } = ctx.request.query;
    const games = await Game.find({status: type}).sort({createdAt: -1});
    ctx.body = { games };
  },

  async createGame(ctx) {
    const game = new Game({
      status: 'hosted',
      board: JSON.stringify(generateBoard())
    });
    await game.save();
    ctx.body = { game };
  },

  async purge(ctx) {
    await Game.deleteMany({});
    ctx.body = {message: 'Let none survive!'};
  }
}

function generateBoard() {
  let arr = [];
  for (let i = 0; i<24; i++) {
    const row = new Array(24).fill(0);
    arr.push(row);
  }
  return arr;
}
