import {SocketData} from "../../store/types";
import {useAppSelector} from "../../hooks/DefineTypedHooks";
import {RootState} from "../../store/store";
import {useEffect, useState} from "react";
import * as timers from "timers";

interface ItemProps {
    data: SocketData;
}
export const Item = ({data}: ItemProps) => {
    const { previousData } = useAppSelector((state: RootState) => state.socket);

    const [isPositive, setPositive] = useState<boolean>(false);

    useEffect(() => {
        previousData.map((previousItem: SocketData) => {
            if (previousItem.ticker === data.ticker && previousItem.change_percent > data.change_percent) {
                setPositive(false);
            } else if (previousItem.ticker === data.ticker && previousItem.change_percent < data.change_percent) {
                setPositive(true);
            }
            return previousData;
        })
    }, [previousData, data.change_percent, data.ticker])
    return (
        <li className="list-item">
            <div>
                <h3 >{data?.ticker}</h3>
                <span>{data?.exchange}</span>
                <span>{data?.price}</span>
            </div>
            {/*<div className="list-item-body">*/}
            {/*    <div className={`list-item-price ${isPositiveChange ? 'positive' : 'negative'}`}>*/}
            {/*        {formatNumber(price)}*/}
            {/*    </div>*/}
            {/*    <div className={`list-item-change ${isPositiveChange ? 'positive' : 'negative'}`}>*/}
            {/*        {`${isPositiveChange ? '+' : ''}${formatNumber(changePercent)}%`}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </li>
    )
}