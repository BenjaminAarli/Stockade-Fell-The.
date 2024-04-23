import React, { useState, useEffect, useContext, createContext } from 'react';
import '../style/market.css';
import { stocks } from '../scripts/StockMarket';
import { account } from '../scripts/System';

interface StockData {
    name: string,
    tag: string,
    stock: object,
    price: number,
    remaining: number;
}

const Stock = ({ stockName = "Teala", stockTag = "TEAL", stockData = {}, src = "/Teala.png", price = [99999], stockRemaining = 0, update_ui = () => {} }) => {
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(stockRemaining);

    useEffect(() => {
        calculateDifferenceAsPercent();
    }, [ stocks ])

    const getPrice = () => {
        return price[price.length - 1];
    }

    const buy = () => {
        if (account.cash >= getPrice() && available > 0){
            account.cash -= getPrice();
            account.stocks[stockName] = stockData;
            setAmount(amount => amount + 1);
            setAvailable(available => available - 1);
            update_ui()
        }
    };

    const sell = () => {
        if (amount > 0){
            setAmount(amount => amount - 1);
            console.log("Sold stock " + stockName + " for " + getPrice());
            account.cash += getPrice();
            update_ui();
        }
    };

    const calculateDifferenceAsPercent = () => {
        const yesterdayPrice = price[price.length - 2];
        const todaysPrice = price[price.length - 1];
        const diff = ((todaysPrice - yesterdayPrice) / todaysPrice) * 100;
        return diff.toPrecision(2);
    };

    return (
        <>
            <div className="Stock">
                <div className="StockTop">
                    <div>
                        <img className="StockLogo" src={src} alt="Tesla Logo" />
                    </div>
                    <div className="StockTopRight">
                        <div className="StockTopRightTexts">
                            <p className="StockTopRightTextsPrice">${price.at(price.length - 1)}</p>
                            <p className={stylePercentColor(calculateDifferenceAsPercent())}>{calculateDifferenceAsPercent()}%</p>
                        </div>
                        <button className={buyBtnStyle(available > 0)} onClick={buy}>BUY</button>
                    </div>
                </div>
                <div className="StockBottom">
                    <div className="StockBottomTexts">
                        <p className="StockTag" style={{ position: 'relative', bottom: '-4px' }}>{stockTag}</p>
                        <p className="StockName">{stockName}</p>
                    </div>
                    <div className="StockBottomRightParts">
                        <p className="StockBottomRightTextsAmount">{amount}x</p>
                        <button className={sellBtnStyle(amount > 0)} onClick={sell}>SELL</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stock;

// STYLES

const stylePercentColor = (value: number = 0) => {
    if      (value > 0) {return "StockTopRightTextsPercent GreenText"}
    else if (value < 0) {return "StockTopRightTextsPercent RedText"}
    return "StockTopRightTextsPercent"

};

const sellBtnStyle = (value: boolean) => {
    if (value == true) { return "StockButtonSell StockButton" }
    else { return "StockButtonSellEmpty StockButton" }
};

const buyBtnStyle = (value: boolean) => {
    if (value == true) { return "StockButtonBuy StockButton" }
    else { return "StockButtonSellEmpty StockButton" }
};
