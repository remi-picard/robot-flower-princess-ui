import { Game, BoardResponse, CreateGameRequest, CreateGameResponse, ActionResponse, Direction } from '../types/game';

// Utilisation du proxy Vite : /api sera redirigé vers http://localhost:8000
const API_BASE = '/api';

export const api = {
    async createGame(request: CreateGameRequest): Promise<CreateGameResponse> {
        const response = await fetch(`${API_BASE}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Erreur lors de la création de la partie: ${error}`);
        }
        return response.json();
    },

    async getGames(): Promise<Game[]> {
        const response = await fetch(`${API_BASE}/games`);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Erreur lors du chargement des parties: ${error}`);
        }
        return response.json();
    },

    async getBoard(gameId: string): Promise<BoardResponse> {
        const response = await fetch(`${API_BASE}/games/${gameId}/board`);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Erreur lors du chargement du plateau: ${error}`);
        }
        return response.json();
    },

    async performAction(gameId: string, action: string, direction: Direction): Promise<ActionResponse> {
        const response = await fetch(`${API_BASE}/games/${gameId}/${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ direction })
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Erreur lors de l'action ${action}: ${error}`);
        }
        return response.json();
    }
};