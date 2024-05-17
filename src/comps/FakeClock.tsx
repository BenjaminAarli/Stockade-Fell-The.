import { useEffect, useState } from "react";
import '../style/FakeClock.css';
import { faketime } from "../scripts/System";

const FakeClock = () => {
    const [time] = useState(faketime.getTime());
    const [hour, setHour] = useState(time.getHours());
    const [minute, setMinute] = useState(time.getMinutes());

    useEffect(() => {
        faketime.minute_tick.push(() => {
            const ctime = faketime.getTime();

            setMinute(ctime.getMinutes());
            setHour(ctime.getHours());
        })
    }, [])

    return (
        <>
            <p className="FakeClock">{hour}:{minute}</p>
        </>
    )
};

export default FakeClock;
