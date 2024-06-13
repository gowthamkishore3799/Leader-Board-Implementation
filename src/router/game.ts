import express from 'express';
const router = express.Router()


router.post('/', (req, res)=>{
    const gameId = req.body.gameId;
    const players = req.body.players;

    let playerIds = []
})


export default router;