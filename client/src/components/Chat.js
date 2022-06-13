import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
    const [msg, setMsg] = useState("");
    const [myChat, setMyChat] = useState([]);

    const sendMsg = async () => {
        if (msg !== "") {
            const currentHour = new Date(Date.now()).getHours();
            const currentMinute=new Date(Date.now()).getMinutes();
            const msgInfo = {
                room: room,
                author: username,
                message: msg,
                time: (currentHour<10?"0":"") + currentHour + ":" + (currentMinute<10?"0":"") + currentMinute
            };
            await socket.emit("send_message", msgInfo);
            setMyChat((list) => [...list, msgInfo]);
            setMsg("");
        }
    };

    useEffect(() => {
        socket.on("get_message", (data) => {
            setMyChat((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div>
            <div>
                <div className="message-container">
                    {myChat.map((msgInfo) => {
                        return (
                            <div
                                className="message"
                                id={username === msgInfo.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{msgInfo.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{msgInfo.time}</p>
                                        <p id="author">{msgInfo.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    
                    }
                </div>
            </div>
            <div>
                <input
                    type="text"
                    value={msg}
                    placeholder="Message..."
                    onChange={(event) => {
                        setMsg(event.target.value);
                    }}
                />
                <button onClick={sendMsg}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;