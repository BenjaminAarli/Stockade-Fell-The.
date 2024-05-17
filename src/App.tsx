import './App.css';
import React, { useEffect } from 'react';
import Market from './comps/Market';
import NewsTag from './comps/News';
import StatusBar from './comps/StatusBar';
import { faketime } from './scripts/System';

function App() {
    useEffect(() => {
        faketime.stop();
        faketime.start();
    }, [])

    return (
        <React.StrictMode>
            <div className='AppGrid'>
                <div className='AppGridLeft'>
                    <Market />
                </div>
                <div className='AppGridMiddle'>
                    <div className='AppGridRightTop'>
                        <StatusBar />
                    </div>
                    <div className='AppGridRightBottom'>p</div>
                </div>
                <div className='AppGridRight'>
                    <NewsTag />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default App;
