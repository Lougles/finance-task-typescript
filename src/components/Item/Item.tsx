import {SocketData} from "../../store/types";
import {useAppSelector} from "../../hooks/DefineTypedHooks";
import {RootState} from "../../store/store";
import {useEffect, useRef, useState} from "react";
import style from './Item.module.css'
interface ItemProps {
    data: SocketData;
}

interface Companies {
    [key: string]: string
}
export const Item = ({data}: ItemProps) => {
    const {ticker, exchange, price, last_trade_time, change_percent, dividend, change } = data;

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

    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        const itemElement = itemRef.current;
        if (!itemElement) {
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(itemElement);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(itemElement);
    }, [itemRef, change_percent]);


    return (
        <li className={`${style.listItem}`}>
            <div className={style.listItemWrapper} >
                <div className={style.listItemCompany}>
                    <h3 className={style.listItemHeader}>{ticker}</h3>
                    <span>{companies[ticker.toUpperCase()]}</span>
                </div>
                <span>{price} $</span>
                <span className={`${isPositive ? style.good : style.bad} ${style.common} ${isVisible ? style.itemVisible : style.item}`}  ref={itemRef}>{isPositive ? "↑" : "↓"} {change_percent} %</span>
                <span>{time.toLocaleTimeString()}</span>
            </div>
        </li>
    )
}