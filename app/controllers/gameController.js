import Game from '../models/game';

export default {
  async viewOpenGames(ctx) {
    const games = await Game.find({status: 'hosted'});
    ctx.body = { games };
  },

  async createGame(ctx) {
    const game = new Game({
      status: 'hosted'
    });
    await game.save();
    ctx.body = { game };
  },
}
