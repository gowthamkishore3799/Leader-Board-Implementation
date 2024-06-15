import { Redis } from "ioredis";



export class RedisInMemory{

    static instance: RedisInMemory

    static redisConnection: Redis

    public static getInstance(): RedisInMemory{
        if(!RedisInMemory.instance){
            RedisInMemory.instance = new RedisInMemory();
        }

        return RedisInMemory.instance;
    }

    public connect(): void{
        
        if (!RedisInMemory.redisConnection) {
            RedisInMemory.redisConnection = new Redis({
                host: process.env.REDIS_URL, // Redis host
                port: 17843, // Redis port
                username: "default", // needs Redis >= 6
                password: process.env.REDIS_PASSWORD,
            });

            RedisInMemory.redisConnection.on("connect", () => {
                console.log("Connected to Redis");
            });

            RedisInMemory.redisConnection.on("error", (err) => {
                console.error("Redis connection error:", err);
            });
        }
    }
}