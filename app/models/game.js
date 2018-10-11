import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  board: {type: String, defailt: JSON.stringify(Array(24).fill(Array(24).fill(0))) },
  status: { type: String, default: 'hosted' }, // hosted, playing, finished
  currentTurn: { type: Boolean, default: false }, //false = X, true = O
  playerX: { type: String, default: null },
  playerO: { type: String, default: null },
  winner: { type: String, default: false }
}, { timestamps: true });

export default mongoose.model('game', gameSchema);
