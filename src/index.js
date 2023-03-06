import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

import './index.css';
import './style/button.scss';
import './style/style.scss';
import './style/variables.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter basename="/marvel-api">
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
