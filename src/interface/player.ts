export interface Players{
    playerId: string;
    name?: string // Can be used later
}


interface PlayerStats{
    kills: number;
    assists: number;
}

export interface PlayerMap {
    [playerId: string]: PlayerStats;
}