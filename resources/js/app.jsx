import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import GameList from './Pages/GameList';

createRoot(document.querySelector('#app')).render(<GameList />);
