# Redis Leaderboard Implementation for Games

This repository provides an implementation of a Redis leaderboard system, specifically designed for multiplayer games such as Call of Duty and Battlegrounds. Redis is utilized due to its efficiency and ease of scaling for leaderboard operations compared to traditional databases.

## Redis Overview

Redis is a single-threaded, in-memory data store that uses the Redis Serialization Protocol (RESP) over TCP, making it exceptionally fast for handling operations like leaderboard management. Scaling for leaderboards is straightforward in Redis due to its built-in support for sorted sets.

## Features

1. **Leaderboard Management**: Maintain leaderboards for games with support for player scores, rankings, and more.
2. **Game Creation**: APIs to create new game instances.
3. **Game Completion**: APIs to end games and update scores.


Once a game starts, we will create an entry in the game database. When the game ends, we will store the final game data.

Installation
To use this system, ensure you have Redis installed and running. You can install Redis from redis.io.

Game Data Handling
Game Start: When a game starts, we store the gameId along with the associated playerIds in the database.
Game End: When the game ends, we update the player statistics, specifically the number of kills and assists each player achieved.


gameDatabase: 
gameId 
Players: {
    "player_id" : {
        "kills": "",
        "assists": ""
    }
}