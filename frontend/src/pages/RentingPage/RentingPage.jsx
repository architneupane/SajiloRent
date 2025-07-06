import { useState } from "react";
import "./RentingPage.css";
import { api_base_url } from "../Helper";
import { useNavigate, useParams } from "react-router-dom";

function RentingPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [days, setDays] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/createorder", {
      mode: "cors",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        deliveryAddress,
        contactNo,
        email,
        days,
        status: "pending", 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Your rental request is pending approval.");
          navigate("/allitems");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        setError("Failed to create order. Please try again later.");
      });
  };

  return (
    <div className="renting-page">
      <div className="renting-card">
        <h1>Provide Your Information</h1>
        <form onSubmit={handleSubmit} className="renting-form">
          <div className="form-group">
            <label>Delivery Address</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Enter the number of days"
              required
              min="1"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RentingPage;