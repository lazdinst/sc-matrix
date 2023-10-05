import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// Using the createRoot API
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
