import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../../pages/Helper";
import "../Login/Login.css"; 

function VendorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginVendor = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/vendorlogin", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", "vendor");
          localStorage.setItem("userId", data.userId);
          navigate("/vendor");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error during vendor login:", err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Vendor Login</h1>
        <form onSubmit={loginVendor} className="login-form">
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
            Are you admin?{" "}
            <a className="login-link" href="/adminlogin">
              Admin
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default VendorLogin;