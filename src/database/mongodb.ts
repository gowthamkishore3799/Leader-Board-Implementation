import { Database } from "../interface/database";
import process from 'process';
import 'dotenv/config'
import mongoose from "mongoose";

export class Mongodb implements Database{

    static instance : Mongodb;

    public static getInstance(): Mongodb{
        if(!Mongodb.instance){
            Mongodb.instance = new Mongodb();
        }
        return Mongodb.instance
    }


    public connect(): void{
        const mongodbConnectionString = process.env.MONGODB_URL;
        if(!mongodbConnectionString){
            throw new Error("Error in Connecting to Mongodb");
        }
        mongoose.connect(mongodbConnectionString).then(()=>{
            console.log("Connected to Mongodb")
        })
    }
}