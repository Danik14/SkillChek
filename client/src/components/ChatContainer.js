import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import ChatHeader from "./ChatHeader";

const socket = io.connect("http://localhost:8000");

const ChatContainer = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <div>
        <button className="option">Mathces</button>
        <button className="option">Chats</button>
      </div>

      <div>
        {!showChat ? (
          <div>
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
};
export default ChatContainer;
