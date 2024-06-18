import { RedisInMemory } from "../database/redis";
import { PlayerMap, Players } from "../interface/player";
import { Game } from "../models/game";


export class GameServices{

    public async createGame(playerIds: PlayerMap, gameId: string){
        const game = new Game({
            gameId,
            players: playerIds
        })
        game.save();
    }



    public async initaliseLeaderBoard(playerIds: PlayerMap, gameId: string){
        await RedisInMemory.redisConnection.zadd(`game-${gameId}`, ...Object.keys(playerIds).flatMap((player)=>{
            return [0, player]
        }))
    }
}