import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import ChatHeader from "./ChatHeader";

const socket = io.connect("http://localhost:8000");

const ChatContainer = ({ user, matched_user }) => {
  const [username, setUsername] = useState(user.first_name);
  const [room, setRoom] = useState(
    user.first_name > matched_user.first_name
      ? user.first_name + "_" + matched_user.first_name
      : matched_user.first_name + "_" + user.first_name
  );
  const [showChat, setShowChat] = useState(false);
  console.log(room);
  const joinRoom = () => {
    socket.emit("join_room", room);
    setShowChat(true);
  };
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      {/* <div>
        <button className="option">Mathces</button>
        <button className="option">Chats</button>
      </div> */}

      <div className="chat-join">
        {!showChat ? (
          <div>
            <h3>
              Wanna contact with {matched_user.first_name}({matched_user.email}
              )?
            </h3>
            <button className="join-chat-button" onClick={joinRoom}>
              Join A Chat
            </button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </div>
  );
};
export default ChatContainer;
