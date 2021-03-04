import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PaymentPage from './pages/PaymentPage';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={PaymentPage} />
        </BrowserRouter>
    );
}

export default App;
