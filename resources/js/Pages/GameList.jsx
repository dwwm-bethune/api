import { useEffect, useState } from 'react';
import Game from '../Components/Game';
import GameForm from '../Components/GameForm';

export default function App() {
    let [counter, setCounter] = useState(0);
    let [games, setGames] = useState([]);

    useEffect(() => {
        // Component did mount
        axios.get('http://localhost:8000/api/games').then(response => setGames(response.data.data));
    }, []);

    let addGame = (game) => {
        games.pop();
        setGames([game, ...games]);
    };

    let editGame = (game) => {
        setGames(games.map(g => g.id == game.id ? game : g));
    };

    let deleteGame = (game) => {
        // games.filter(g => g.id !== game.id)
        axios.delete('http://localhost:8000/api/games/'+game.id).then(response => {
            games.splice(games.indexOf(game), 1);
            setGames([ ...games ]);
            // On peut aussi recharger toute la liste
            // axios.get('http://localhost:8000/api/games').then(response => setGames(response.data.data));
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl text-center font-bold">
                Laravel avec React ({counter})
                <button className="ml-3 bg-cyan-200 hover:bg-cyan-600 duration-300 text-white text rounded-xl px-6 py-2"
                    onClick={() => setCounter(c => c + 1)}>
                    Incrémenter
                </button>
            </h1>

            <div className="text-center">
                <GameForm afterSubmit={addGame} />
            </div>

            {games.map(game => <Game
                key={game.id}
                game={game}
                onDelete={() => deleteGame(game)}
                onEdit={editGame}
            />)}
        </div>
    );
}
