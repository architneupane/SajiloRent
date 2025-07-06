import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../../pages/Helper";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "guest"; 
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId) {
      console.error("User ID is undefined. Cannot proceed with logout.");
      return;
    }

    fetch(`${api_base_url}/logout`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
          alert(data.message); 
          navigate("/");
        } else {
          console.error("Logout failed:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">Sajilo Rent</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        {role === "vendor" ? (
          <>
            <Link to="/vendor/listing">Listing Items</Link>
            <button
              className="navbar-rent-management"
              onClick={() => navigate("/vendor/rent-management")}
            >
              Manage Rents
            </button>
          </>
        ) : (
          <Link to="/allitems">All Items</Link>
        )}
        {role === "guest" && <Link to="/vendorlogin">Vendor</Link>}
        {role === "user" && <Link to="/my-orders">My Orders</Link>}
      </nav>
      <div className="navbar-role">
        <span className={`role-badge ${role}`}>{role || "Guest"}</span>
      </div>
      <div className="navbar-actions">
        {token ? (
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className="navbar-login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="navbar-signup"
              onClick={() => navigate("/register-user")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;