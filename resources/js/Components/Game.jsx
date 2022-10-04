import { useState } from 'react';
import GameForm from './GameForm';

export default function Game({ game, onDelete, onEdit }) {
    let [editing, setEditing] = useState(false);

    let afterSubmit = (game) => {
        onEdit(game);
        setEditing(false);
    }

    return <div className="border border-gray-500 rounded-lg mb-6 p-4 text-center">
        {game.title}
        <img className="w-32" src={game.image} alt={game.title} />

        {editing && <GameForm game={game} afterSubmit={afterSubmit} />}

        <div>
            <button className="mr-3" onClick={() => setEditing(!editing)}>
                ✍️
            </button>
            <button onClick={onDelete}>
                ❌
            </button>
        </div>
    </div>;
}
