import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import './index.css';

// HashRouter: GitHub Pages serves static files only, so deep links must live
// in the fragment (#/generator) to survive hard refreshes without a server.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
