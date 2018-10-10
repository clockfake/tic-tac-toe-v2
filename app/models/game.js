import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  board: {type: String },
  status: { type: String }, // hosted, playing, finished
  currentTurn: { type: Boolean, default: false }, //false = X, true = O
  playerX: { type: String, default: null },
  playerO: { type: String, default: null },
  winner: { type: String }
}, { timestamps: true });

export default mongoose.model('game', gameSchema);
