import io from "socket.io-client";
import {useAppDispatch, useAppSelector} from "../../hooks/DefineTypedHooks";
import {
    getTickersActual,
    getTickersError,
    getTickersRequested,
    selectTickersData
} from "../../store/slices/tickerSlice";
import {useEffect} from "react";
const socket = io("http://localhost:4000");

export const List = () => {
    const dispatch = useAppDispatch();
    const { actualTickers, loading, error } = useAppSelector(selectTickersData);
    useEffect(() => {
        socket.emit("start");
        socket.on('ticker', (data: string) => {
            // console.log(data);
            dispatch(getTickersActual(data));
            console.log(data);
        });
        return () => {
            socket.removeAllListeners();
        };
    }, [dispatch])
    // console.log(actualTickers);

    // useEffect(() => {
    //     dispatch(getTickersRequested());
    //     socket.emit("start");
    //     socket.on("ticker", (quotes) => dispatch(getTickers(quotes)));
    //     socket.on("connect_error", function () {
    //         dispatch(getTickersError());
    //     });
    //     return () => {
    //         socket.removeAllListeners();
    //     };
    // }, [dispatch]);

    return (
        <>
            <ul>
                {/*{actualTickers.map(item =>*/}
                {/*    <li>{item}</li>*/}
                {/*)}*/}
            </ul>
        </>
    )
}