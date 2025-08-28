export enum CaseType {
    ROBOT = "R",
    PRINCESSE = "P",
    FLEUR = "F",
    DECHET = "D",
    VIDE = "V"
}

export enum GameStatus {
    EN_COURS = "EN_COURS",
    PERDU = "PERDU",
    GAGNE = "GAGNE"
}

export enum Direction {
    HAUT = "H",
    BAS = "B",
    GAUCHE = "G",
    DROITE = "D"
}

export interface Game {
    game_id: string;
    width: number;
    height: number;
    status: GameStatus;
}

export interface BoardResponse {
    board: string;
    robot_carries_flower: boolean;
    status: GameStatus;
}

export interface ActionResponse {
    success: boolean;
    status: GameStatus;
    robot_carries_flower: boolean;
}

export interface CreateGameRequest {
    width: number;
    height: number;
}

export interface CreateGameResponse {
    game_id: string;
}