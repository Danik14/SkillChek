import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    // removeCookie("UserId", cookies.UserId);
    // removeCookie("AuthToken", cookies.AuthToken);
    window.location.replace("/");
  };

  return (
    <div className="chats-container-header">
      <div className="profile-container">
        <div className="img-container">
          <a href="/onboarding">
            <img src={user.url} alt="Photo of user" />
          </a>
          <a href="/onboarding">
            <h3>{user.first_name}</h3>
          </a>
        </div>
        <i className="log-out-icon" onClick={logout}>
          Home
        </i>
      </div>
      <h5>
        Date of birth: {user.dob_day}.{user.dob_month}.{user.dob_year}
        <br />
        Email: {user.email}
        <br />
        Subscription: {user.subscription ? "✔" : "✖"}
      </h5>
    </div>
  );
};
export default ChatHeader;
