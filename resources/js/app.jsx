import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Laravel avec React</h1>;
}

createRoot(document.querySelector('#app')).render(<App />);
