import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  board: {type: [[Number]], default: Array(24).fill(Array(24).fill(0))},
  status: { type: String }, // hosted, playing, finished
  currentTurn: { type: Boolean }, //false = X, true = O
  playerX: { type: String },
  playerO: { type: String }
});

export default mongoose.model('game', gameSchema);
