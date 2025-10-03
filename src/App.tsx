import React, { useEffect } from 'react';
import { AlertCircle, Play, RotateCcw, Trash2, Flower, Crown, Bot } from 'lucide-react';
import { useGame } from './hooks/useGame';
import { Direction, GameStatus } from './types/game';

const App: React.FC = () => {
    const {
        games,
        currentGame,
        gameBoard,
        gameStatus,
        robotCarriesFlower,
        loading,
        error,
        loadGames,
        createGame,
        selectGame,
        performAction
    } = useGame();

    const [newGameDimensions, setNewGameDimensions] = React.useState({ width: 8, height: 10 });

    const renderBoard = () => {
        if (!gameBoard) return null;

        const rows = gameBoard.split('\n');
        return (
            <div className="inline-block border-4 border-gray-800 bg-gray-900 p-2 rounded-lg">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.split('').map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`w-8 h-8 border border-gray-600 flex items-center justify-center text-lg font-bold
                  ${cell === 'R' ? 'bg-blue-500 text-white robot' : ''}
                  ${cell === 'P' ? 'bg-pink-500 text-white princess' : ''}
                  ${cell === 'F' ? 'bg-green-500 text-white flower' : ''}
                  ${cell === 'D' ? 'bg-orange-600 text-white trash' : ''}
                  ${cell === 'V' ? 'bg-gray-200 empty' : ''}
                `}
                            >
                                {cell === 'R' && <Bot size={16} />}
                                {cell === 'P' && <Crown size={16} />}
                                {cell === 'F' && <Flower size={16} />}
                                {cell === 'D' && <Trash2 size={16} />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const DirectionButtons: React.FC<{
        action: string;
        label: string;
        icon: React.ReactNode;
        disabled?: boolean;
    }> = ({ action, label, icon, disabled = false }) => (
        <div id={`command-${action}`} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-bold mb-2 flex items-center gap-2">
                {icon}
                {label}
            </h3>
            <div className="grid grid-cols-3 gap-1">
                <div></div>
                <button
                    onClick={() => performAction(action, Direction.HAUT)}
                    disabled={disabled || loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded font-bold up-button"
                >
                    ↑
                </button>
                <div></div>
                <button
                    onClick={() => performAction(action, Direction.GAUCHE)}
                    disabled={disabled || loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded font-bold left-button"
                >
                    ←
                </button>
                <div></div>
                <button
                    onClick={() => performAction(action, Direction.DROITE)}
                    disabled={disabled || loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded font-bold right-button"
                >
                    →
                </button>
                <div></div>
                <button
                    onClick={() => performAction(action, Direction.BAS)}
                    disabled={disabled || loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded font-bold down-button"
                >
                    ↓
                </button>
                <div></div>
            </div>
        </div>
    );

    const getStatusColor = (status: GameStatus) => {
        switch (status) {
            case GameStatus.EN_COURS: return 'text-blue-600';
            case GameStatus.GAGNE: return 'text-green-600';
            case GameStatus.PERDU: return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusText = (status: GameStatus) => {
        switch (status) {
            case GameStatus.EN_COURS: return 'En cours';
            case GameStatus.GAGNE: return '🎉 Gagné !';
            case GameStatus.PERDU: return '💥 Perdu';
            default: return status;
        }
    };

    useEffect(() => {
        loadGames();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                        <Bot size={40} className="text-blue-600" />
                        Robot Flower Princess
                        <Flower size={40} className="text-green-600" />
                    </h1>
                    <p className="text-gray-600">Aidez le robot à livrer la fleur à la princesse !</p>
                </header>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Panneau de gauche */}
                    <div className="space-y-6">
                        {/* Création de partie */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Play size={20} />
                                Nouvelle Partie
                            </h2>
                            <div className="flex gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Largeur</label>
                                    <input
                                        type="number"
                                        min="3"
                                        max="50"
                                        value={newGameDimensions.width}
                                        onChange={(e) => setNewGameDimensions({...newGameDimensions, width: parseInt(e.target.value)})}
                                        className="border rounded px-3 py-2 w-20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hauteur</label>
                                    <input
                                        type="number"
                                        min="3"
                                        max="50"
                                        value={newGameDimensions.height}
                                        onChange={(e) => setNewGameDimensions({...newGameDimensions, height: parseInt(e.target.value)})}
                                        className="border rounded px-3 py-2 w-20"
                                    />
                                </div>
                            </div>
                            <button
                                id="create-button"
                                onClick={() => createGame(newGameDimensions)}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded font-bold flex items-center gap-2"
                            >
                                <Play size={16} />
                                Créer une partie
                            </button>
                        </div>

                        {/* Liste des parties */}
                        <div id="games" className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <RotateCcw size={20} />
                                Parties ({games.length})
                            </h2>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {games.map((game) => (
                                    <div
                                        key={game.game_id}
                                        id={`game-${game.game_id}`}
                                        onClick={() => selectGame(game.game_id)}
                                        className={`game p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                                            currentGame === game.game_id ? 'bg-blue-50 border-blue-300' : ''
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{game.width}×{game.height}</span>
                                            <span className={`font-bold ${getStatusColor(game.status)}`}>
                        {getStatusText(game.status)}
                      </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            ID: {game.game_id.substring(0, 8)}...
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Légende */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold mb-3">Légende</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                    Robot
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                                        <Crown size={14} className="text-white" />
                                    </div>
                                    Princesse
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                                        <Flower size={14} className="text-white" />
                                    </div>
                                    Fleur
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
                                        <Trash2 size={14} className="text-white" />
                                    </div>
                                    Déchet
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panneau de droite */}
                    <div className="space-y-6">
                        {/* Plateau de jeu */}
                        {currentGame && (
                            <div className="bg-white p-6 rounded-lg shadow text-center">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Plateau</h2>
                                    <div className="text-right">
                                        <div className={`font-bold text-lg ${getStatusColor(gameStatus)}`}>
                                            {getStatusText(gameStatus)}
                                        </div>
                                        {robotCarriesFlower && (
                                            <div className="text-sm text-green-600 flex items-center gap-1">
                                                <Flower size={16} />
                                                Robot porte la fleur
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {renderBoard()}
                            </div>
                        )}

                        {/* Contrôles */}
                        {currentGame && gameStatus === GameStatus.EN_COURS && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DirectionButtons
                                    action="move"
                                    label="Déplacer"
                                    icon={<Bot size={20} />}
                                />
                                <DirectionButtons
                                    action="clean"
                                    label="Nettoyer"
                                    icon={<Trash2 size={20} />}
                                    disabled={robotCarriesFlower}
                                />
                                <DirectionButtons
                                    action="pickup"
                                    label="Ramasser"
                                    icon={<Flower size={20} />}
                                    disabled={robotCarriesFlower}
                                />
                                <DirectionButtons
                                    action="drop"
                                    label="Déposer"
                                    icon={<Flower size={20} />}
                                    disabled={!robotCarriesFlower}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;