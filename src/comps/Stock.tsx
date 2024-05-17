import React, { useState, useEffect, useContext, createContext } from 'react';
import '../style/market.css';
import { Stock, stocks } from '../scripts/StockMarket';
import { account } from '../scripts/System';

const StockTag = ({ stock, update_ui = () => {} }) => {
    const [amount, setAmount] = useState(0);
    const [available, setAvailable] = useState(stock.remaining);

    useEffect(() => {
        calculateDifferenceAsPercent();
    }, [ stocks ])

    const buy = () => {
        if (account.cash >= stock.price){
            account.cash -= stock.price;
            setAmount(amount => amount + 1);
            setAvailable(available => available - 1);
            update_ui()
        }
    };

    const sell = () => {
        if (amount > 0){
            account.cash += stock.price;
            stock.available -= 1;
            setAmount(amount => amount - 1);
            update_ui();
        }
    };

    const calculateDifferenceAsPercent = () => {
        const yesterdayPrice = stock.price_history[stock.price_history.length - 2];
        const todaysPrice = stock.price;
        const diff = ((todaysPrice - yesterdayPrice) / todaysPrice) * 100;
        return diff.toPrecision(2);
    };

    const getLogo = () => {
        if (stock.price < 10){ return "/skull.png" }
        else { return stock.img }
    }

    return (
        <>
            <div className="Stock">
                <div className="StockTop">
                    <div>
                        <img className="StockLogo" src={getLogo()} alt="Tesla Logo" />
                    </div>
                    <div className="StockTopRight">
                        <div className="StockTopRightTexts">
                            <p className="StockTopRightTextsPrice">${stock.price}</p>
                            <p className={stylePercentColor(calculateDifferenceAsPercent())}>{calculateDifferenceAsPercent()}%</p>
                        </div>
                        <button className={buyBtnStyle(available > 0)} onClick={buy}>BUY</button>
                    </div>
                </div>
                <div className="StockBottom">
                    <div className="StockBottomTexts">
                        <p className="StockTag" style={{ position: 'relative', bottom: '-4px' }}>{stock.tag}</p>
                        <p className="StockName">{stock.name}</p>
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

export default StockTag;

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
