import koa from 'koa';
import err from './middleware/error';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import router from './routes';
import socketActions from './controllers/socketController.js';
import socketIo from 'socket.io';
import path from 'path'
import serve from 'koa-static';

mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://node-admin:${process.env.MONGO_ATLAS_PW}@onlyone-r08wv.mongodb.net/test?retryWrites=true`,
{ useNewUrlParser: true });

mongoose.connection.on('error', console.error);

const corsOptions = {
  origin: '*',
  credentials: true
};

const app = new koa();
app.use(serve(path.resolve(__dirname, '../build/')))
    .use(serve(path.resolve(__dirname, '../public/')))
    .use(cors(corsOptions))
    .use(err)
    .use(router.routes())
    .use(router.allowedMethods());

const server = require('http').createServer(app.callback());

server.listen(process.env.PORT || 3200, () => {
  console.log('App is listening at port %d', process.env.PORT || 3200);
});

const io = socketIo(server);
socketActions(io);
