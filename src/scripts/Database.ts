import { useEffect } from "react";
import { act } from "react-dom/test-utils";

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
export class FakeTime {
    public hour: string = "11";
    public minute: string = "55";
    public period: string = "AM";

    public active: boolean = true;
    private timer: any;
    public executes: Array<CallableFunction> = [
    ];

    public tick = () => {
        this.tick_minute(5);
        for (const func of this.executes){
            func();
        }
    }

    public start() {
        this.active = true;
        this.timer = setInterval(this.tick, 1000);
    }

    public stop() {
        this.active = false;
        clearInterval(this.timer);
    }

    public tick_minute(amount: number = 1) {
        const old_minute = Number(this.minute) + amount;
        if (old_minute >= 60) {
            this.tick_hour();
            this.minute = "00";
        }
        else if (old_minute < 10)
            this.minute = String("0" + old_minute);
        else {
            this.minute = String(old_minute)
        }
        console.log("Tick minute")
    }
    public tick_hour(amount: number = 1) {
        const old_hour = Number(this.hour) + amount;
        if (old_hour == 12) {
            this.tick_period();
            this.hour = String(old_hour);
        }
        else if (old_hour >= 13) {
            this.hour = String("0" + (old_hour - 12));
        }
        else if (old_hour < 10) {
            this.hour = String("0" + old_hour);
        }
        else {
            this.hour = String(old_hour);
        }
    }
    public tick_period() {
        if (this.period == "AM") {
            this.period = "PM"
        }
        else if (this.period == "PM") {
            this.period = "AM"
        }
    }
    public get_time() {
        return { minute: this.minute, hour: this.hour, period: this.period };
    }

}
