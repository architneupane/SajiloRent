import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../Helper";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/register", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        email,
        phoneNo,
        password,
        role, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (role === "vendor") {
            navigate("/vendorlogin");
          } else {
            navigate("/login");
          }
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <form onSubmit={createUser} className="register-form">
          <div className="inputbox">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="inputbox">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="inputbox">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="inputbox">
            <label>Phone Number</label>
            <input
              type="number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="inputbox">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="inputbox">
            <label>Register As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">
            Register
          </button>
          <p className="login-footer">
            Already have an account?{" "}
            <a className="login-link" href="/login">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
