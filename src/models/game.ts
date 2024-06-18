import mongoose from "mongoose";


export const Game = mongoose.model('game', new mongoose.Schema({
    gameId: String,
    players: Map,
}));