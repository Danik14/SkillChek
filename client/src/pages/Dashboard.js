import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import UserInfoCard from "../components/UserInfoCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
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

  // useEffect(() => {
  //   getUser();
  // }, []);

  console.log("user", user);

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

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="Dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info"></div>
        </div>
      </div>
      <UserInfoCard />
    </div>
  );
};
export default Dashboard;
