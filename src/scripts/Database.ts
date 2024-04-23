export interface TypeStock {
    key: string,
    tag: string,
    name: string,
    img: string,
    price: Array<number>,
    remaining: number,
}

export class Account {
    public cash: number = 150;
    public stocks: Record<string, TypeStock> = {};
    public addStock = (stock: TypeStock) => {
        this.stocks[stock.name] = stock;
    };
    public getStocks = () => {
        return this.stocks;
    }
    public setCash = (amount: number) => {
        this.cash = amount;
    };
    public getCash = () => {
        return this.cash;
    }
}

