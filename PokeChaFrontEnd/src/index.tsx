import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CardsContextProvider } from './context/CardsContext';
import { AuthContextProvider } from './context/AuthContext';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()


let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CardsContextProvider>
        <App />
      </CardsContextProvider>
    </AuthContextProvider>  
  </React.StrictMode>
);

