import Cookies from 'js-cookie';
import { Account, FakeTime } from './Database';
import { stocks } from './StockMarket';

// Player Account.
export const account = new Account();

// Game Time.
export const faketime = new FakeTime();
faketime.start();

// Save and Load System.
export const save_game = () => {
    Cookies.set('stocks', stocks, { expires: 7, sameSite: 'strict' });
    Cookies.set('cash', account.cash, { expires: 7, sameSite: 'strict' });
}

export const load_game = () => {
    if (Cookies.get('cash') > 0) {
        const saved = Cookies.get('cash');
        account.setCash(saved);
    }
    if (Cookies.get('stocks') !== undefined) {
        // stocks = Cookies.get('stocks');
    }
}

export const reset_game = () => {
    Cookies.remove('stocks');
    Cookies.remove('cash');
    account.setCash(150);
}
