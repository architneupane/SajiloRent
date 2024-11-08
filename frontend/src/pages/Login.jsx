import { useState } from "react";
import logo from "../images/logo.png";
import signuppic from "../images/signup.jpg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { api_base_url } from "./Helper";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          navigate("/");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    // main div
    <div className="flex justify-center w-full h-screen bg-zinc-800">
      {/* div containing image and form */}
      <div className="w-1/2 text-white ">
        {/* div containing logo and form */}
        <div className="w-full h-screen py-32">
          {/* div containing logo and notes */}
          <div className="flex items-center pl-24">
            <img className="w-28" src={logo} alt="error" />
            <h1 className="text-5xl ">DairyNotes</h1>
          </div>
          {/* Form to sign up */}
          <form onSubmit={login} className="w-[70%] pl-28 " action="">
            {/* input for email */}
            <h6 className="text-white mt-3">Email</h6>
            <div className="inputbox flex items-center border-solid border-gray-300 border rounded-md text-white">
              <i className="text-xl ml-1">
                <MdEmail />
              </i>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="bg-transparent py-2 px-2 flex-1 outline-none"
                type="email"
                placeholder="email"
                id="email"
                required
                name="email"
              />
            </div>
            {/* input for password */}
            <h6 className="text-white mt-3">Password</h6>
            <div className="inputbox flex items-center border-solid border-gray-300 border rounded-md text-white">
              <i className="text-xl ml-1">
                <RiLockPasswordFill />
              </i>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="bg-transparent py-2 px-2 flex-1 outline-none"
                type="password"
                placeholder="password"
                id="password"
                required
                name="password"
              />
            </div>
            <p className="text-red-500 text-[14px my-2]">{error}</p>
            <p className="py-4">
                Do not have an account? {" "}
              <a className="text-blue-500" href="/signup">
                Sign Up
              </a>
            </p>
            {/* sign up button */}
            <input
              className="w-full bg-green-700 py-2 rounded-md transition-all hover:bg-green-800"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
      {/* div containing right side pic in sign up, login */}
      <div className="w-1/2 h-screen ">
        <img className="w-full h-full object-cover" src={signuppic} alt="pic" />
      </div>
    </div>
  );
}

export default Login;
