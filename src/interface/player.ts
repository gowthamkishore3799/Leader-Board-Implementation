export interface Players{
    playerId: string;
    name?: string // Can be used later
    kills?: string;
    assists?: string;
}


interface PlayerStats{
    kills?: number;
    assists?: number;
    score?: number;
    rank?: number
}

export interface PlayerMap {
    [playerId: string]: PlayerStats;
}