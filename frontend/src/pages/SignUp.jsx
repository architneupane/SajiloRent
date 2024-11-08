import { useState } from "react";
import logo from "../images/logo.png";
import signuppic from "../images/signup.jpg";
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "./Helper";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [error, setError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signup", {
      mode: "cors",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        email,
        phoneno,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div className="flex justify-center w-full h-screen bg-zinc-800">
      <div className="w-1/2 text-white ">
        <div className="py-10 ">
          <div className="flex items-center pl-24">
            <img className="w-28" src={logo} alt="error" />
            <h1 className="text-5xl ">DairyNotes</h1>
          </div>
          {/* Form to sign up */}
          <form onSubmit={createUser} className="w-[70%] pl-28 " action="">
            {/* input for username */}
            <h6 className="text-white mt-3">Username</h6>
            <div className="inputbox flex items-center border-solid border-gray-300 border rounded-md text-white">
              <i className="text-xl ml-1">
                <FaUser />
              </i>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                className="bg-transparent py-2 px-2 flex-1 outline-none"
                type="text"
                placeholder="username"
                required
                id="username"
                name="username"
              />
            </div>
            {/* inout for name */}
            <h6 className="text-white mt-3">Name</h6>
            <div className="inputbox flex items-center border-solid border-gray-300 border rounded-md text-white">
              <i className="text-xl ml-1">
                <FaCircleUser />
              </i>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="bg-transparent py-2 px-2 flex-1 outline-none"
                type="text"
                placeholder="name"
                id="name"
                required
                name="name"
              />
            </div>
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
            {/* input for phone number */}
            <h6 className="text-white mt-3">Phone</h6>
            <div className="inputbox flex items-center border-solid border-gray-300 border rounded-md text-white">
              <i className="text-xl ml-1">
                <FaPhone />
              </i>
              <input
                onChange={(e) => {
                  setPhoneno(e.target.value);
                }}
                value={phoneno}
                className="bg-transparent py-2 px-2 flex-1 outline-none"
                type="number"
                placeholder="number"
                id="number"
                required
                name="number"
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
              <i className="cursor-pointer mr-3 text-lg"  ><IoEye/></i>
            </div>
            <p className="text-red-500 text-[14px my-2]">{error}</p>
            <p className="py-4">
              Already have an account? {" "}
              <a className="text-blue-500" href="/login">
                Login
              </a>
            </p>
            {/* sign up button */}
            <input
              className="w-full bg-green-700 py-2 rounded-md transition-all hover:bg-green-800 font-semibold "
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
      </div>
      {/* right side pic in sign up, login */}
      <div className="w-1/2 h-screen ">
        <img className="w-full h-full object-cover" src={signuppic} alt="pic" />
      </div>
    </div>
  );
}

export default SignUp;
