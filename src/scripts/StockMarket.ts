import { StockStatus } from '../comps/StatusBar';
import { Account, TypeStock } from './Database';
import { FakeTime, FakeTimeTime } from './Faketime';
import { news } from './Events';
import { faketime } from './System';

export type StockHistory = {
    time: FakeTimeTime;
    price: number;
}

export class Stock {
    public key: string = "XXXX";
    public tag: string = "XXXX";
    public name: string = "UNAMED";
    public img: string = "";
    public price: number = 0;
    public price_history: Array<StockHistory> = [];
    public remaining: number = 0;

    constructor(key: string, name: string, img: string, price: number, remaining: number) {
        this.key = key;
        this.tag = key;
        this.name = name;
        this.img = img;
        this.price = price;
        this.remaining = remaining;
    }
}

// Game Stocks
export const stocks: Stock[] = [
    new Stock("TAIL", "Taile", "/Teala.png", 20, 10),
    new Stock("HMLR", "Heamler", "/Hemler_red.png", 80, 10),
    new Stock("SEAN", "Seanic", "/seanic.png", 50, 10),
    new Stock("XEMA", "Xeema", "/Xeema.png", 120, 6),
    new Stock("PAIR", "Pairse", "/Pairs.png", 69, 4),
    new Stock("BUCK", "Buckts", "/Buckgitt.png", 120, 2),
    new Stock("GLAS", "Glasses", "/Glasses.png", 100, 4),
    new Stock("KEIS", "Kessis", "/Kessis.png", 144, 12),
];

export const get_stock_tags = () => {
    let tags: Array<String> = [];
    stocks.forEach( (stock) => {
        tags.push(stock.tag);
    })
    return tags;
}

export const randomize_stock_prices = () => {
    stocks.map((item) => {
        const direction: number = Math.sign(Math.random() - 0.5);
        const amount = direction * ((Math.random() * item.price) / 2);
        const old_price = { price: item.price, time: faketime.get_time()};
        item.price_history.push(old_price);
        item.price = (Math.ceil(item.price + amount));

    });
};

export const get_stock_history = () => {
    let result: Array<StockStatus> = [];
    stocks.map((item) => {
        const stock = { label: item.name, data: item.price_history}
        result.push(stock)
    });
    return result;
}

const get_stock = (tag: string): Stock => {
    let rstock = new Stock("XXXX", "XXXXX", "/skull.png", 0, 0);
    for (const index in stocks) {
        const stock = stocks[index];
        if (stock.tag == tag) {
            rstock = stock;
            break;
        }
    }
    return rstock;
}

export const merge_stocks_using_strings = (A: string, B: string) => {
    const AStock: Stock = get_stock(A);
    const BStock: Stock = get_stock(B);
    merge_stocks(AStock, BStock);
}

export const merge_stocks = (AStock: Stock, BStock: Stock) => {
    const key: string = "ABCD";
    const name: string = BStock.name.slice(0, 3) + AStock.name.slice(0, 3);
    const price = AStock.price + BStock.price;
    const amount = 10;
    const newStock: Stock = new Stock(key, name, "/Pairs.png", price, amount);
    stocks.push(newStock);
}

// These lines are here for testing
// so that we have a few stock prices set at start.
randomize_stock_prices();
// fuck
merge_stocks_using_strings("TAIL", "HMLR");

// I stopped caring a long time ago and I can't go back anymore. 







