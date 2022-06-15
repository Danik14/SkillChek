import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    skills: [],
    desires: [],
    matches: [],
  });

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  let navigate = useNavigate();
  // getUser();
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  if (formData.first_name === "") {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              required={true}
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value={"more"}
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show Me</label>
            <div className="multiple-input-container">
              <div className="multiple-input-container">
                <input
                  id="man-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value={"man"}
                  onChange={handleChange}
                  checked={formData.gender_interest === "man"}
                />
                <label htmlFor="man-gender-interest">Man</label>

                <input
                  id="woman-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value={"woman"}
                  onChange={handleChange}
                  checked={formData.gender_interest === "woman"}
                />
                <label htmlFor="woman-gender-interest">Woman</label>

                <input
                  id="everyone-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value={"everyone"}
                  onChange={handleChange}
                  checked={formData.gender_interest === "everyone"}
                />
                <label htmlFor="everyone-gender-interest">Everyone</label>
              </div>
            </div>

            <label htmlFor="about">My skills</label>
            <input
              id="skills"
              type="text"
              name="skills"
              required={true}
              placeholder={"Python, java, c#, photoshop"}
              value={formData.skills}
              onChange={handleChange}
            />

            <label htmlFor="about">What I want to learn</label>
            <input
              id="desires"
              type="text"
              name="desires"
              required={true}
              placeholder={"Python, java, c#, photoshop"}
              value={formData.desires}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>
          <label htmlFor="url">Profile Photo</label>
          <section>
            <input
              type="url"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;
