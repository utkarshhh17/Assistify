import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AuthContextProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
      </AuthContextProvider>
    </Router>
);
