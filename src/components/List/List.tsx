import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../../store/store";
import { setData, setLoading, setError } from "../../store/slices/socketSlice";
import {SocketData} from "../../store/types";
import {useAppDispatch, useAppSelector} from "../../hooks/DefineTypedHooks";

const socket = io("http://localhost:4000");

const List = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useAppSelector((state: RootState) => state.socket);
    console.log(data);
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

    return (
        <ul>
            {data.map((item) => (
                <li key={item.ticker}>
                    {item.ticker} - {item.price}
                </li>
            ))}
        </ul>
    );
};

export default List;
