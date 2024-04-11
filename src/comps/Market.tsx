import { relative } from 'path';
import React, { useState, useEffect } from 'react';
import '../style/market.css';

function Stock({ stockName = "Teala", stockTag = "TEAL", src = "/Teala.png" }) {
    const name = { stockName };
    const stock_tag = { stockTag };
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(10);

    const sellBtnStyle = () => {
        if (amount > 0) { return "StockButtonSell StockButton" }
        else { return "StockButtonSellEmpty StockButton" }
    };

    const buyBtnStyle = () => {
        if (available > 0) { return "StockButtonBuy StockButton" }
        else { return "StockButtonSellEmpty StockButton" }
    };

    const buyStock = () => {
        if (available > 0) {
            setAmount(amount => amount + 1);
            setAvailable(available => available - 1);
        };
    };

    const sellStock = () => {
        if (amount > 0) {
            setAmount(amount => amount - 1);
            setAvailable(available => available + 1);
        };
    };

    return (
        <>
            <div className="StockContainer">
                <div className="StockTop">
                    <div>
                        <img className="StockLogo" src={src} alt="Tesla Logo" />
                    </div>
                    <button className={buyBtnStyle()} onClick={buyStock} >BUY</button>
                </div>
                <div className="StockBottom">
                    <div className="StockBottomTexts">
                        <p className="StockTag" style={{ position: 'relative', bottom: '-4px' }}>{stockTag}</p>
                        <p className="StockName">{stockName}</p>
                    </div>
                    <button className={sellBtnStyle()} onClick={sellStock}>SELL</button>
                </div>
            </div>
        </>
    );
}

function Market() {
    return (
        <>
            <div className="MarketContainer">
                <Stock />
                <Stock stockName="Seanic" stockTag="SEAN" src="/seanic.png" />
                <Stock stockName="Heamler" stockTag="HMLR" src="/Hemler_red.png" />
                <Stock stockName="Xeema" stockTag="XEMA" src="/Xeema.png" />
                <Stock />
                <Stock stockName="Seanic" stockTag="SEAN" src="/seanic.png" />
                <Stock stockName="Heamler" stockTag="HMLR" src="/Hemler_red.png" />
            </div>
        </>
    );
}

export default Market;
