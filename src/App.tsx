import React, { useState, createContext } from 'react';
import './App.css';
import Market from './comps/Market';

type ContextType = [any, any];
export const context = React.createContext<ContextType>([0, () => {}]);

function App() {
    const [cash, setCash] = useState(100);

    return (
        <React.StrictMode>
            <p style={{position: 'absolute', left: '350px'}}>CASH: {cash}</p>
            <context.Provider value={[cash, setCash]}>
                <Market />
            </context.Provider>
        </React.StrictMode>
    );
}

export default App;
