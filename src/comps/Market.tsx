import '../style/market.css';
import Stock from './Stock';
import { stocks, randomize_stock_prices } from '../scripts/StockMarket';
import { save_game, reset_game } from '../scripts/System';
import { useEffect, useState } from 'react';
import FakeClock from './FakeClock';
import { account } from '../scripts/System';

function Market() {
    const [literally_whatever, setStocks] = useState(stocks);
    const [cash, setCash] = useState(account.cash);

    const next_day = () => {
        randomize_stock_prices();
        update_all_stocks();
    };

    const update_all_stocks = () => {
        setStocks(
            prevStock => prevStock.map((stock, i) => {
                return { ...stock, price: 0 };
            })
        );
    };

    const update_ui = () => {
        setCash(account.cash);
    }

    // Save the game
    useEffect(() => {
        const timer = setInterval(() => {
            save_game();
        }, 3000);
        return () => {
            clearInterval(timer)
        };
    }, [account]);

    useEffect(() => {
        setCash(account.cash);
    }, [account.cash]);

    return (
        <>
            <div className="MarketContainer">
                <div className="PerchaseInfoTop">
                    <p style={{ marginLeft: '4px' }}>Accout: {cash}$</p>
                    <FakeClock tickHour={next_day} />
                </div>
                    <button onClick={reset_game}>Reset Game</button>
                <div className="PerchaseInfoBottom">
                    <p></p>
                </div>
                <div className="StockContainer">
                    {stocks.map(stock => <Stock
                        key={stock.key}
                        stockData={stock}
                        stockName={stock.name}
                        stockTag={stock.tag}
                        stockRemaining={stock.remaining}
                        src={stock.img}
                        price={stock.price}
                        update_ui={update_ui}
                    />)}
                </div>
            </div>
        </>
    );
}
export default Market;
