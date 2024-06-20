import { RedisInMemory } from "../database/redis";
import { INFO } from "../enum/infoEnum";
import { PlayerMap, Players } from "../interface/player";
import { Game } from "../models/game";


export class GameServices{


    public async createGameInfo(playerIds: PlayerMap, gameId: string){
        const game = new Game({
            gameId,
            players: playerIds,
            gameComplete: false,
        })
        game.save();
    }


    public async initialiseUserInfoStats(playerIds: PlayerMap, gameId: string) {
        const players = Object.keys(playerIds);
        const key = `${INFO.USER_INFO}${gameId}`;
        for (let player of players) {
            await RedisInMemory.redisConnection.hset(key, player, JSON.stringify(playerIds[player]));
        }
    }

    public async createGame(playerIds: PlayerMap, gameId: string){
        await this.initialiseUserInfoStats(playerIds, gameId);
        await this.createGameInfo(playerIds, gameId);
    }

    public async initaliseLeaderBoard(playerIds: PlayerMap, gameId: string){
        await RedisInMemory.redisConnection.zadd(`${INFO.GAME_INFO}${gameId}`, ...Object.keys(playerIds).flatMap((player)=>{
            return [0, player]
        }))
    }


    public async retrieveGameStats(gameId:string, playerId: string){
        return await RedisInMemory.redisConnection.hget(`${INFO.USER_INFO}${gameId}`, playerId);
    }



    public async updateUserScoreStats(playerIds: PlayerMap, gameId: string){
        Object.keys(playerIds).forEach(async (player)=>{
            let userScore = await this.retrieveGameStats(gameId, player);

            if(!userScore){ userScore = '{}'}
            let parsedUserObject
            try{
                parsedUserObject = JSON.parse(userScore)
            } catch(e) {
                parsedUserObject = {};
            }
            playerIds[player] = {
                kills: (playerIds[player]?.kills || 0) + (parsedUserObject?.kills || 0), 
                assists: (playerIds[player]?.assists || 0) + (parsedUserObject?.assists || 0)
            }
            await RedisInMemory.redisConnection.hset(`${INFO.USER_INFO}${gameId}`, player, JSON.stringify(playerIds[player]));
        })
    }


    public async updateLeaderBoard(playerIds: PlayerMap, gameId: string){
        await this.updateUserScoreStats(playerIds, gameId);
        await RedisInMemory.redisConnection.zadd(`${INFO.GAME_INFO}${gameId}`, ...Object.keys(playerIds).flatMap((player) => {
            return [playerIds[player].score ?? 0, player]
        }, 'INCR'))
    }


    private async updateLeaderBoardStats(gameId: string): Promise<string[]> {
        const response = await RedisInMemory.redisConnection.zrange(`${INFO.GAME_INFO}${gameId}`, 0, -1,"REV", "WITHSCORES");
        return response;
    }


    private async updateGameAsCompletedDB(playerScores:PlayerMap, gameId: string){
        await Game.updateOne({
            gameId : gameId,   
        }, {
            gameComplete: true,
            $set: {
                players: playerScores
            }
        })
    }


    public async updateGameAsCompleted(gameId:string){
        const scores = await this.updateLeaderBoardStats(gameId);
        console.log(scores, 'Scores')
        if(scores.length <=0){
            throw new Error("Error in retriving game stats")
        }


        const playerScores: PlayerMap = {};
        let rank = 1;
        for(let i=0; i<scores.length; i = i+2){
            let userScore = await this.retrieveGameStats(gameId, scores[i]);

            if(!userScore){ throw new Error('Error in Retriving Game Stats')}
            let parsedUserObject
            try{
                parsedUserObject = JSON.parse(userScore)
            } catch(e) {
                parsedUserObject = {};
            }

            playerScores[scores[i]] = { score: parseInt(scores[i+1]), kills: parsedUserObject.kills, assists: parsedUserObject.assists}
        }

        console.log(playerScores)

        await this.updateGameAsCompletedDB(playerScores, gameId);
    }
}