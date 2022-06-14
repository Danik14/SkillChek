import Person from "./Algorithm";

const UserInfoCard = ({ user }, { userMain }) => {
  //const personMain = Person(userMain._id, userMain.skills, userMain.desires);
  const personSwiped = new Person(user._id, user.skills, user.desires);

  //const result = personMain.match(personSwiped);

  console.log(userMain);
  return (
    <div className="userInfoCard">
      <h3>Skills</h3>
      <ul>
        {user.skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
      <h3>Desires</h3>
      <ul>
        {user.desires.map((desire) => (
          <li>{desire}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfoCard;
