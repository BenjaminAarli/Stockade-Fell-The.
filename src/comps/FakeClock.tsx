import { useEffect, useState } from "react";
import '../style/FakeClock.css';
import { faketime } from "../scripts/System";

const FakeClock = () => {
    const [time] = useState(faketime);
    const [hour, setHour] = useState(time.hour);
    const [minute, setMinute] = useState(time.minute);
    const [period, setPeriod] = useState(time.period);

    useEffect(() => {
        faketime.executes.push(() => {
            const ctime = faketime.get_time();

            setMinute(ctime.minute);
            setHour(ctime.hour);
            setPeriod(ctime.period);
        })
    }, [])


    return (
        <>
            <p className="FakeClock">{hour}:{minute} {period}</p>
        </>
    )
};

export default FakeClock;
