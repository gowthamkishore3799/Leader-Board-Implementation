import { PlayerMap, Players } from "../interface/player";
import { v4 as uuidv4 } from 'uuid';
import { GameServices } from "../services/gameServices";
import { SCORE_BOARD } from "../enum/scoreEnum";

export class GameController{

    public static async createGame(players: Players[] ): Promise<string> {

        if(players.length <=0){
            throw new Error("Game cannot be created")
        }
        const gameId = uuidv4() + Date.now();
        const playerIdMap: PlayerMap = {};

        players.forEach((player) => {
            playerIdMap[player.playerId] = { kills:0, assists: 0}
        });

        if(!playerIdMap || Object.keys(playerIdMap).length <=0){
            throw new Error("No Users are found");
        }
        const gameServices = new GameServices();

        await gameServices.createGame(playerIdMap, gameId);
        await gameServices.initaliseLeaderBoard(playerIdMap, gameId);

        return gameId
    }


    public static async updateGame(gameId: string, players: Players[] ): Promise<void>{
        if(!gameId){
            throw new Error("Game Id is required");
        }

        if(players.length <=0){
            throw new Error("Game cannot be updated")
        }

        const playerIdMap: PlayerMap = {};

        players.forEach((player) => {
            playerIdMap[player.playerId] = { score: SCORE_BOARD.KILLS * (parseInt(player?.kills ?? '0')) + SCORE_BOARD.ASSISTS * (parseInt(player?.assists ?? '0')), kills: (parseInt(player?.kills ?? '0')), assists: parseInt(player?.assists ?? '0') }
        });

        const gameServices = new GameServices();

        await gameServices.updateLeaderBoard(playerIdMap, gameId);
    }


    public static async updateGameAsCompleted(gameId: string): Promise<void>{
        if(!gameId){
            throw new Error("Game Id is required");
        }

        const gameServices = new GameServices();
        await gameServices.updateGameAsCompleted(gameId);
    }
}