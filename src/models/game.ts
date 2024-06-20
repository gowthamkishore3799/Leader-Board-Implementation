import mongoose from "mongoose";


export const Game = mongoose.model('game', new mongoose.Schema({
    gameId: {
        type: String,
        required: true,
    },
    players: Map,
    gameComplete: Boolean,
}));