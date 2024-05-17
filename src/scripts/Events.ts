export const tresholds = [
    200,
    500,
    750
];

export const news = {
    title: "NEWS HAS NO TITLE",
}

class Event {
    public text = "Unnamed Event";
    public action: CallableFunction = () => { };
    constructor(action?: CallableFunction) {
        if (action != undefined)
            this.action = action;
    }
}

export const sundayEvent = new Event();
