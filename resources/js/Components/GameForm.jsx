import axios from 'axios';
import { useState } from 'react';

export default function GameForm({ afterSubmit, game = null }) {
    let date = new Date().toISOString();

    let [form, setForm] = useState({
        title: game?.title || '',
        content: game?.content || '',
        released_at: game?.released_at ? game.released_at.substring(0, 10) : date.substring(0, 10),
        image: undefined,
    });
    let [errors, setErrors] = useState({});

    let onSubmit = (event) => {
        event.preventDefault();

        setErrors({});

        let request = null;
        let formData = new FormData();
        for (let [key, value] of Object.entries(form)) {
            formData.append(key, value);
        }

        if (game) {
            request = axios.put('http://localhost:8000/api/games/'+game.id, form);
        } else {
            request = axios.post('http://localhost:8000/api/games', formData);
        }

        request.then(response => {
            afterSubmit(response.data);
        }).catch(error => setErrors(error.response.data.errors));
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}></textarea>
                {errors.content && <p className="text-red-500">{errors.content}</p>}
            </div>
            <div>
                <input type="date" value={form.released_at} onChange={(e) => setForm({ ...form, released_at: e.target.value })} />
                {errors.released_at && <p className="text-red-500">{errors.released_at}</p>}
            </div>
            {!game && <div>
                <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>}

            <button>
                {game ? 'Modifier' : 'Ajouter'}
            </button>
        </form>
    );
}
