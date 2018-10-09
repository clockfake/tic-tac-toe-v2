import koa from 'koa';
import err from './middleware/error';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import router from './routes';
import socketActions from './controllers/socketController.js';
import socketIo from 'socket.io';

mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://node-admin:${process.env.MONGO_ATLAS_PW}@onlyone-r08wv.mongodb.net/test?retryWrites=true`,
{ useNewUrlParser: true });

mongoose.connection.on('error', console.error);

const corsOptions = {
  origin: '*',
  credentials: true
};

const app = new koa();
app.use(cors(corsOptions))
    .use(err)
    .use(router.routes())
    .use(router.allowedMethods());

const server = require('http').createServer(app.callback());

server.listen(3200, () => {
  console.log('App is listening at port %d', 3200);
});

const io = socketIo(server);
socketActions(io);
