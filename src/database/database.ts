import { Redis } from "ioredis";
import { Mongodb } from "./mongodb";
import { RedisInMemory } from "./redis";


export class Database{
    mongoDBInstance: Mongodb | null = null;
    redisInstance: RedisInMemory | null = null;
    public static async connect() {
        const mongodbInstance = await Mongodb.getInstance();
        mongodbInstance.connect();
        const redisInstance = await RedisInMemory.getInstance();
        redisInstance.connect();
    }
}