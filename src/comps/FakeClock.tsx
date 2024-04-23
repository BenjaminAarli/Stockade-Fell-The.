import { useEffect, useState } from "react";
import '../style/FakeClock.css';

const FakeClock = ({ tickMinute = () => { }, tickHour = () => { } }) => {
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("11");
    const [period, setPeriod] = useState("PM");

    useEffect(() => {
        const timer = setInterval(() => {
            plusMinute(5);
        }, 1000);
        return () => {
            clearInterval(timer)
        };
    }, [minute, hour]);

    const plusMinute = (amount: number) => {
        tickMinute();
        const mtime = Number(minute) + amount;
        if (mtime >= 60) {
            setMinute("00");
            plusHour(1);
        }
        else if (mtime < 10) {
            setMinute(minute => "0" + String(mtime));
        }
        else {
            setMinute(minute => String(mtime));
        }
    }

    const plusHour = (amount: number) => {
        tickHour();
        const mtime = Number(hour) + amount;
        if (mtime == 12) {
            changePeriod();
        }
        if (mtime >= 13) {
            setHour(hour => "0" + String(mtime - 12))
        }
        else if (mtime < 10) {
            setHour(hour => "0" + String(mtime));
        }
        else {
            setHour(hour => String(mtime));
        }
    }

    const changePeriod = () => {
        if (period === "AM") { setPeriod("PM") }
        else if (period === "PM") { setPeriod("AM") }
    }

    return (
        <>
            <p className="FakeClock">{hour}:{minute} {period}</p>
        </>
    )
};

export default FakeClock;
