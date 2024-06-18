import { PlayerMap, Players } from "../interface/player";
import { v4 as uuidv4 } from 'uuid';
import { GameServices } from "../services/gameServices";

export class GameController{

    public static async createGame(players: Players[], ): Promise<string> {

        if(players.length <=0){
            throw new Error("Game cannot be created")
        }
        const gameId = uuidv4();
        const playerIdMap: PlayerMap = {};

        players.forEach((player) => {
            playerIdMap[player.playerId] = { kills:0, assists: 0}
        });

        const gameServices = new GameServices();

        console.log("Game Servicesss")

        await gameServices.createGame(playerIdMap, gameId);
        console.log("Game Servicesss 2")
        await gameServices.initaliseLeaderBoard(playerIdMap, gameId);

        return gameId
    }
}