import React, { useState, useEffect } from 'react';
import './App.css';
import Market from './comps/Market';
import BuyStockMenu from './comps/BuyStockMenu';
import { pAccount } from './scripts/StockMarket';
import FakeClock from './comps/FakeClock';

function App() {
    return (
        <React.StrictMode>
            <img style={{position: 'absolute', right: '20px', top: '20px', width: '73%', height: '60%', objectFit: 'cover', objectPosition: '80% 40%'}} src='The Bankman.png' />
            <BuyStockMenu />
            <Market />
        </React.StrictMode>
    );
}

export default App;
