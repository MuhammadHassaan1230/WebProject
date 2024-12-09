import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import './index.css';  // Include your global CSS
import App from './App';  // Import the App component
import { BrowserRouter } from 'react-router-dom';  // To support routing in the app

// Create a root container to render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root using createRoot

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
