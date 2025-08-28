import { useState } from 'react';
import { Game, GameStatus, Direction, CreateGameRequest } from '../types/game';
import { api } from '../utils/api';

export const useGame = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [currentGame, setCurrentGame] = useState<string | null>(null);
    const [gameBoard, setGameBoard] = useState<string>('');
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.EN_COURS);
    const [robotCarriesFlower, setRobotCarriesFlower] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const loadGames = async () => {
        try {
            const data = await api.getGames();
            setGames(data);
        } catch (err) {
            setError('Erreur lors du chargement des parties');
        }
    };

    const loadBoard = async (gameId: string) => {
        try {
            const data = await api.getBoard(gameId);
            setGameBoard(data.board);
            setGameStatus(data.status);
            setRobotCarriesFlower(data.robot_carries_flower);
            setError('');
        } catch (err) {
            setError('Erreur lors du chargement du plateau');
        }
    };

    const createGame = async (dimensions: CreateGameRequest) => {
        setLoading(true);
        try {
            const data = await api.createGame(dimensions);
            setCurrentGame(data.game_id);
            await loadGames();
            await loadBoard(data.game_id);
            setError('');
        } catch (err) {
            setError('Erreur lors de la création de la partie');
        }
        setLoading(false);
    };

    const selectGame = async (gameId: string) => {
        setCurrentGame(gameId);
        await loadBoard(gameId);
    };

    const performAction = async (action: string, direction: Direction) => {
        if (!currentGame) return;

        setLoading(true);
        try {
            const data = await api.performAction(currentGame, action, direction);

            if (!data.success) {
                setError(`Action échouée: ${action} ${direction}`);
            } else {
                setError('');
            }

            await loadBoard(currentGame);
            await loadGames();
        } catch (err) {
            setError('Erreur lors de l\'action');
        }
        setLoading(false);
    };

    return {
        games,
        currentGame,
        gameBoard,
        gameStatus,
        robotCarriesFlower,
        loading,
        error,
        loadGames,
        loadBoard,
        createGame,
        selectGame,
        performAction
    };
};