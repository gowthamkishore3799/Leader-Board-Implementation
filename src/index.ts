import express, { Request, Response, NextFunction } from 'express';
import process from 'process';
import 'dotenv/config'
import bodyParser from 'body-parser';
import gameRouter from './router/game'
import { Database } from './database/database';




Database.connect();
const app = express();

process.on('unhandledRejection', (err: any)=>{
    console.log(err.message, 'Unhandled error occured.');
})

const port = process.env.PORT;

app.use(bodyParser.json())
app.use('/game', gameRouter);


app.listen(port, ()=>{
    console.log("Leaderboard Started", port);
})