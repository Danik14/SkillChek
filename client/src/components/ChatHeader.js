import { useCookies } from "react-cookie";

const ChatHeader = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    window.location.reload();
  };

  return (
    <div className="chats-container-header">
      <div className="profile-">
        <div className="img-container">
          <img src="" alt="Photo of user" />
        </div>
        <h3></h3>
      </div>
      <i className="log-out-icon" onClick={logout}>
        ☚
      </i>
    </div>
  );
};
export default ChatHeader;
