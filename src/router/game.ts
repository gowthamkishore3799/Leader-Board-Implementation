import express from 'express';
import { GameController } from '../controllers/gameController';
const router = express.Router()



router.post('/', async (req, res) => {
    const players = req.body.players;

    const gameId = await GameController.createGame(players);

    res.send({
        success: true,
        data : {
            gameId : gameId,
        }
     })
})


export default router;