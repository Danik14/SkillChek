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
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  console.log("user", user);
  console.log("users", users);

  const characters = [
    {
      name: "Maxat Issaliyev",
      url: "https://i.imgur.com/pYGj3TB.jpg",
    },
    {
      name: "Kamal Mamedov",
      url: "https://i.imgur.com/OoW3AKj.jpg",
    },
    {
      name: "Daniyar Chapagan",
      url: "https://i.imgur.com/tfIe1FE.jpg",
    },
    {
      name: "Alibek Keneskhanov",
      url: "https://i.imgur.com/EKiWQTS.jpg",
    },
    {
      name: "Olzhas Aimukhambetov",
      url: "https://i.imgur.com/wbgC8hv.jpg",
    },
  ];

  const plusCounter =  () => {
    setUserCounter(userCounter => userCounter+1);
    console.log(userCounter)
  };

  const swiped = (direction, nameToDelete) => {
    plusCounter()
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  if (user == null || users == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {users.map((user) => (
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
      <UserInfoCard user={users[userCounter]} />
    </div>
  );
};
export default Dashboard;
