import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../Helper";
import "../Login/Login.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminlogin = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/adminlogin", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", "admin");
          localStorage.setItem("userId", data.userId);
          navigate("/admin");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error during admin login:", err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <form onSubmit={adminlogin} className="login-form">
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-footer">
          Are you Vendor?{" "}
          <a className="login-link" href="/vendorlogin">
            Vendor
          </a>
        </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;