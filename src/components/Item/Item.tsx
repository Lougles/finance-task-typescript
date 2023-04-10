import {SocketData} from "../../store/types";
import {useAppSelector} from "../../hooks/DefineTypedHooks";
import {RootState} from "../../store/store";
import {useEffect, useState} from "react";
import style from './Item.module.css'
interface ItemProps {
    data: SocketData;
}

interface Companies {
    [key: string]: string
}
export const Item = ({data}: ItemProps) => {
    const {ticker, price, last_trade_time, change_percent } = data;

    const companies: Companies = {
        AAPL: "Apple",
        GOOGL: "Alphabet",
        MSFT: "Microsoft",
        AMZN: "Amazon",
        FB: "Facebook",
        TSLA: "Tesla",
    };

    const { previousData } = useAppSelector((state: RootState) => state.socket);

    const [isPositive, setPositive] = useState<boolean>(false);

    useEffect(() => {
        previousData.map((previousItem: SocketData) => {
            if (previousItem.ticker === ticker && previousItem.change_percent > change_percent) {
                setPositive(false);
            } else if (previousItem.ticker === ticker && previousItem.change_percent < change_percent) {
                setPositive(true);
            }
            return previousData;
        })
    }, [previousData, change_percent, ticker]);

    const time = new Date(last_trade_time);

    return (
        <li className={`${style.listItem}`}>
            <div className={style.listItemWrapper} >
                <div className={style.listItemCompany}>
                    <h3 className={style.listItemHeader}>{ticker}</h3>
                    <span>{companies[ticker.toUpperCase()]}</span>
                </div>
                <span>{price} $</span>
                <span className={`${isPositive ? style.good : style.bad} ${style.common} ${style.animateChange}`}>{isPositive ? "↑" : "↓"} {change_percent} %</span>
                <span>{time.toLocaleTimeString()}</span>
            </div>
        </li>
    )
}