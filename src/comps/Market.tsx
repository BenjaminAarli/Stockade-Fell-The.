import '../style/market.css';
import StockTag from './Stock';
import { stocks, randomize_stock_prices } from '../scripts/StockMarket';
import { save_game, reset_game, faketime } from '../scripts/System';
import { useEffect, useState } from 'react';
import FakeClock from './FakeClock';
import { account } from '../scripts/System';

function Market() {
    const [literally_whatever, setStocks] = useState(stocks);
    const [cash, setCash] = useState(account.cash);

    const next_day = () => {
        randomize_stock_prices();
        update_all_stocks();
        console.log("Market: next_day()")
    };

    // the line below is only executed at runtime once.
    useEffect(() => {
        faketime.hour_tick.push(next_day);
    }, [])
    
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
                    <p className='FakeClock' style={{left: '0px'}}>Accout: {cash}$</p>
                    <FakeClock />
                </div>
                <div className="StockContainer">
                    {stocks.map(stock => <StockTag
                        key={stock.tag}
                        stock={stock}
                        update_ui={update_ui}
                    />)}
                </div>
            </div>
        </>
    );
}
export default Market;
