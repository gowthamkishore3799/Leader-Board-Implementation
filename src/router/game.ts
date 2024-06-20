import express from 'express';
import { GameController } from '../controllers/gameController';
const router = express.Router()



router.post('/', async (req, res) => {
    try {
        const players = req.body.players;

        const gameId = await GameController.createGame(players);
        res.send({
            success: true,
            data: {
                gameId: gameId,
            }
        })
    } catch (e: any) {
        console.log(e?.message, 'Error in Creating Game'
        )
    }
})


router.put('/update', async(req, res)=>{
    try {
        const gameId = req.body?.gameId;
        const players = req.body?.players;
        await GameController.updateGame(gameId, players);
        res.send({
            success: true,
        })
    }catch(e: any){
        console.log(e, 'error in updating game stats');
        res.send({
            success: false,
            message: e?.message ?? e
        })
    }
})


router.put('/complete', async(req, res)=>{
    try {
        const gameId = req.body?.gameId;
        await GameController.updateGameAsCompleted(gameId);
        res.send({
            success: true,
        })
    }catch(e: any){
        console.log(e, 'error in updating game stats');
        res.send({
            success: false,
            message: e?.message ?? e
        })
    }
})


export default router;