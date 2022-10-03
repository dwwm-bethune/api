import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function App() {
    let [counter, setCounter] = useState(0);

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl text-center font-bold">
                Laravel avec React ({counter})
            </h1>
            <div className="text-center">
                <button
                    className="bg-cyan-200 hover:bg-cyan-600 duration-300 text-white text rounded-xl px-6 py-2"
                    onClick={() => setCounter(c => c + 1)}
                >
                    Test
                </button>
            </div>
        </div>
    );
}

createRoot(document.querySelector('#app')).render(<App />);
