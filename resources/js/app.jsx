import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl text-center font-bold">Laravel avec React</h1>
        </div>
    );
}

createRoot(document.querySelector('#app')).render(<App />);
