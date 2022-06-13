const UserInfoCard = ({ user }) => {
  return (
    <div className="userInfoCard">
      <p>skills: {user.skills}</p>
      <p>desires: {user.desires}</p>
    </div>
  );
};

export default UserInfoCard;
