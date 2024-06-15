import { Players } from "../interface/player";
import { v4 as uuidv4 } from 'uuid';
import { GameServices } from "../services/gameServices";

export class GameController{

    public static async createGame(players: Players[], ): Promise<void> {

        if(players.length <=0){
            throw new Error("Game cannot be created")
        }
        const gameId = uuidv4();

        const playerId = players.map((player) => player.playerId);

        

        // const gameServices = new GameServices();
        // await gameServices.initialise()


        // await gameServices.createGame();

        
        
    }
}