import { Account, TypeStock } from './Database'

// Game Stocks
export const stocks: TypeStock[] = [
    { key: "TAIL", tag: "TAIL", name: "Taile", img: "/Teala.png", price: [20], remaining: 10 },
    { key: "HMLR", tag: "HMLR", name: "Heamler", img: "/Hemler_red.png", price: [80], remaining: 10 },
    { key: "SEAN", tag: "SEAN", name: "Seanic", img: "/seanic.png", price: [50], remaining: 10 },
    { key: "XEMA", tag: "XEMA", name: "Xema", img: "/Xeema.png", price: [120], remaining: 10 },
    { key: "PAIR", tag: "PAIR", name: "Pairs", img: "/Pairs.png", price: [120], remaining: 10 },
    { key: "BUCK", tag: "BUCK", name: "Buckts", img: "/Buckgitt.png", price: [120], remaining: 10 },
    { key: "GLAS", tag: "GLAS", name: "Glasses", img: "/Glasses.png", price: [120], remaining: 10 },
    { key: "KEIS", tag: "KEIS", name: "Kessis", img: "/Kessis.png", price: [120], remaining: 10 },
];

export const randomize_stock_prices = () => {
    stocks.map((item) => {
        const direction: number = Math.sign(Math.random() - 0.5);
        const amount = direction * ((Math.random() * item.price[item.price.length - 1]) / 2);
        item.price.push(Math.ceil(item.price[item.price.length - 1] + amount));
    });
};

// These lines are here for testing
// so that we have a few stock prices set at start.
randomize_stock_prices();
