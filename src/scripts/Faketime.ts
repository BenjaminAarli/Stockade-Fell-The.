export class FakeTime {
    private initDate: Date;
    private currentTime: number;
    private prevTime: number;
    private timeScale: number;

    public minute_tick: Array<CallableFunction> = [];
    public hour_tick: Array<CallableFunction> = [];
    public day_tick: Array<CallableFunction> = [];
    // public week_tick: Array<CallableFunction> = []; # not integrated yet. Needs a custom function for checking. 
    public month_tick: Array<CallableFunction> = [];
    public year_tick: Array<CallableFunction> = [];

    constructor(initDate: Date, timeScale: number) {
        this.initDate = initDate;
        this.currentTime = initDate.getTime();
        this.timeScale = timeScale;
        this.prevTime = Date.now();
    }

    update() {
        const now = Date.now();
        const timeElapsed = (now - this.prevTime) * this.timeScale;

        const old_time = this.currentTime;
        const new_time = this.currentTime + timeElapsed;

        this.currentTime = new_time;
        this.prevTime = now;

        this.check_triggers(old_time, new_time);
    }

    getTime(): Date {
        return new Date(this.currentTime);
    }

    check_triggers(oldtime: number, newtime: number) {
        const oldt = new Date(oldtime);
        const newt = new Date(newtime);

        if (oldt.getMinutes() != newt.getMinutes()) {
            console.log("FakeTime: Minute Ticked");
            for (const func of this.minute_tick) { func(); }
        }

        if (oldt.getHours() != newt.getHours()) {
            for (const func of this.hour_tick) { func(); }
        }

        if (oldt.getDay() != newt.getDay()) {
            for (const func of this.day_tick) { func(); }
        }

        if (oldt.getMonth() != newt.getMonth()) {
            for (const func of this.hour_tick) { func(); }
        }

        if (oldt.getFullYear() != newt.getFullYear()) {
            for (const func of this.hour_tick) { func(); }
        }
    }
}


// code below is old and deprecated // will delete. 

// export type FakeTimeTime = {
//     minute: string,
//     hour: string,
//     period: string,
//     day: number
// };

// export class FakeTime {
//     public hour: string = "11";
//     public minute: string = "55";
//     public period: string = "AM";
//     public day: number = 0;
//
//     public active: boolean = true;
//     private timer: any;
//
//     // Arrays of functions that are called each step.
//     public executes_minute: Array<CallableFunction> = [];
//     public executes_hour: Array<CallableFunction> = [];
//     public executes_period: Array<CallableFunction> = [];
//
//     public tick = () => {
//         this.tick_minute(5);
//         console.log(this.minute);
//     }
//
//     public start() {
//         console.log("Timer starting to rev it's engine. Vroom vroom.");
//         clearInterval(this.timer); // clear the previous interval or chance it duplicating.
//         this.active = true;
//         this.timer = setInterval(this.tick, 1000);
//     }
//
//     public stop() {
//         this.active = false;
//         clearInterval(this.timer);
//     }
//
//     public tick_minute(amount: number = 1) {
//         for (const func of this.executes_minute) {
//             func();
//         }
//         const int_minute = Number(this.minute) + amount;
//         if (int_minute >= 60) {
//             this.minute = "0" + String(int_minute - 60);
//             this.tick_hour();
//         }
//         else if (int_minute < 10) {
//             this.minute = "0" + String(int_minute);
//         }
//         else {
//             this.minute = String(int_minute);
//         }
//     }
//     public tick_hour(amount: number = 1) {
//         for (const func of this.executes_hour) {
//             func();
//         }
//         const old_hour = Number(this.hour) + amount;
//         if (old_hour == 12) {
//             this.tick_period();
//             this.hour = String(old_hour);
//         }
//         else if (old_hour >= 13) {
//             this.hour = String("0" + (old_hour - 12));
//         }
//         else if (old_hour < 10) {
//             this.hour = String("0" + old_hour);
//         }
//         else {
//             this.hour = String(old_hour);
//         }
//     }
//     public tick_period() {
//         for (const func of this.executes_period) {
//             func();
//         }
//         if (this.period == "AM") {
//             this.period = "PM"
//         }
//         else if (this.period == "PM") {
//             this.period = "AM"
//             this.day += 1;
//         }
//     }
//     public get_time() {
//         return { minute: this.minute, hour: this.hour, period: this.period, day: this.day };
//     }
// }
//

