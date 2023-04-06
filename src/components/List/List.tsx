import io from "socket.io-client";
const socket = io("http://localhost:4000");

export const List = () => {
    // console.log(socket);
    console.log(socket.emit("start"));
    return (
        <>
            List
        </>
    )
}