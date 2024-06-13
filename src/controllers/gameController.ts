import { Players } from "../interface/player";
import { v4 as uuidv4 } from 'uuid';

export class GameController{

    public static async CreateGame(playerIds: Players[]): Promise<void> {

        if(playerIds.length <=0){
            throw new Error("Game cannot be created")
        }
        const gameId = uuidv4();

        
    }
}