import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import UserInfoCard from "../components/UserInfoCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [userCounter, setUserCounter] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      //response.data.filter(id => id != idMain;);
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  console.log("user", user);
  console.log("users", users);

  const plusCounter = () => {
    setUserCounter((userCounter) => userCounter + 1);
    console.log(userCounter);
  };

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    plusCounter();
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  if (user == null || users == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Dashboard">
      <ChatContainer user={user} matched_user={users[userCounter]} />
      <div className="swipe-container">
        <div className="card-container">
          {users
            .filter((item) => item._id != user._id)
            .map((user) => (
              <TinderCard
                className="swipe"
                key={user.first_name}
                onSwipe={(dir) => swiped(dir, user.first_name)}
                onCardLeftScreen={() => outOfFrame(user.first_name)}
              >
                <div
                  style={{ backgroundImage: "url(" + user.url + ")" }}
                  className="card"
                >
                  <h3>{user.first_name}</h3>
                </div>
              </TinderCard>
            ))}
          <div className="swipe-info"></div>
        </div>
      </div>
      <UserInfoCard user={users[userCounter]} userMain={user} />
    </div>
  );
};
export default Dashboard;
