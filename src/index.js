import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './Store/auth-context';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthContextProvider>
)

reportWebVitals();
