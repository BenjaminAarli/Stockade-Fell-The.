import { relative } from 'path';
import React, { useState, useEffect, useContext } from 'react';
import '../style/market.css';
import { stocks } from '../scripts/StockMarket';
import { context } from '../App';


const Stock = ({ stockName = "Teala", stockTag = "TEAL", src = "/Teala.png", initPrice = 2}) => {
    const name = { stockName };
    const stock_tag = { stockTag };
    const [price, setPrice] = useState(initPrice);
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(10);

    const [cash, setCash] = useContext(context);

    const sellBtnStyle = () => {
        if (amount > 0) { return "StockButtonSell StockButton" }
        else { return "StockButtonSellEmpty StockButton" }
    };

    const buyBtnStyle = () => {
        if (available > 0) { return "StockButtonBuy StockButton" }
        else { return "StockButtonSellEmpty StockButton" }
    };

    const buyStock = () => {
        if (available > 0 && cash >= price) {
            setCash(cash - price);
            setAmount(amount => amount + 1);
            setAvailable(available => available - 1);
        };
    };

    const sellStock = () => {
        if (amount > 0) {
            setCash(cash + price);
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
                    <p>{price}</p>
                    <p>{amount}</p>
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
                {stocks.map(stock => <Stock key={stock.key} stockName={stock.stockName} stockTag={stock.stockTag} src={stock.img} initPrice={stock.initPrice} /> )}
            </div>
        </>
    );
}

export default Market;
