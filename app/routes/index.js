import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import gameController from '../controllers/gameController'

const router = new Router();

router.get('/api/view', gameController.viewGames)
router.post('/api/creategame', gameController.createGame)

router.get('*', async function(ctx) {
  var html = fs.readFileSync(path.resolve('./build/index.html'));
  ctx.type = 'html';
  ctx.body = html;
});

export default router
