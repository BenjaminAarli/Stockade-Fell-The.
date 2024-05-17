import { AxisOptions, Chart } from 'react-charts'
import React, { ReactDOM, useEffect, useState } from 'react'
import { get_stock_history, StockHistory } from '../scripts/StockMarket'

export type StockStatus = {
    label: string,
    data: StockHistory[]
}

export default function StatusBar() {
    const [data, setData] = useState(get_stock_history());
    
    useEffect(() => {
        const timer = setInterval(()=>{
            setData(data => get_stock_history());
        }, 5000);
        return () => clearInterval(timer);
    }, [])

    const primaryAxis = React.useMemo(
        (): AxisOptions<StockHistory> => ({
            getValue: datum => datum.time.day,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<StockHistory>[] => [
            {
                getValue: datum => datum.price,
            },
        ],
        []
    )

    return (
        <>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </>
    )
}


