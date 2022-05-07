import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate();

  console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    console.log("Hello world");
    e.preventDefault();
    try {
      if (isSignUp) {
        console.log("loggin", email, password);
        const response = await axios.post(
          `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
          { email, password }
        );

        setCookie("AuthToken", response.data.token);
        setCookie("UserId", response.data.userId);

        const success = response.status === 201;

        if (success && isSignUp) navigate("/onboarding");
        if (success && !isSignUp) navigate("/dashboard");
      } else {
        // if ((password !== confirmPassword)) {
        //     setError('passwords need to match!')
        //     return
        // }
        console.log("posting", email, password);
        const response = await axios.post("http://localhost:8000/login", {
          email,
          password,
        });
        const success = response.status === 201;
        if (success) navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data);
      <ErrorModal
        setShowModal={setShowModal}
        errorMessage={error.response.data}
      />;
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        {" "}
        ✖{" "}
      </div>{" "}
      <h2> {isSignUp ? "Create Account" : "Log In"} </h2>
      <p>
        {" "}
        By clicking the submit button below, I hereby agree to and accept the
        following terms and conditions governing my use of the website function
        on the SkillCheck™ website.{" "}
      </p>{" "}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="password-check"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}{" "}
        <button
          className="secondary-button"
          type="submit"
          onClick={handleSubmit}
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
        {/* <p> {error} </p> */}
      </form>{" "}
      <hr />
      <h2>Get the App </h2>
    </div>
  );
};
export default AuthModal;
