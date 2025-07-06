import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../Helper";
import "./Login.css"; 

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(api_base_url + '/login' ,{
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
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role); 
          localStorage.setItem("userId", data.userId);
          navigate('/');
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form onSubmit={login} className="login-form">
          <div className="inputbox">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              id="email"
              required
            />
          </div>
          <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              id="password"
              required
            />
          </div>
          <p className="login-error">{error}</p>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-footer">
          Don't have an account?{" "}
          <a className="login-link" href="/register-user">
            Register
          </a>
        </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;