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
      board: JSON.stringify(Array(24).fill(Array(24).fill(0)))
    });
    await game.save();
    ctx.body = { game };
  }
}
