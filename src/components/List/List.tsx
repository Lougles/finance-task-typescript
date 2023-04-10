import {ReactElement, useEffect} from "react";
import io from "socket.io-client";
import { RootState } from "../../store/store";
import { setData, setLoading, setError } from "../../store/slices/socketSlice";
import {SocketData} from "../../store/types";
import {useAppDispatch, useAppSelector} from "../../hooks/DefineTypedHooks";
import {Item} from "../Item/Item";
import style from './List.module.css'
const socket = io("http://localhost:4000");

const List = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error, previousData } = useAppSelector((state: RootState) => state.socket);
    useEffect(() => {
        dispatch(setLoading());

        socket.emit("start");

        socket.on("ticker", (data: SocketData[]) => {
            dispatch(setData(data));
        });

        socket.on("connect_error", () => {
            dispatch(setError());
        });

        return () => {
            socket.removeAllListeners();
        };
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    const items = data.map((item: SocketData) => (
        <Item key={item.ticker} data={item}/>
    ))
    return (
        <>
            <ul className={style.list}>
                {items}
            </ul>
        </>
    );
};

export default List;
