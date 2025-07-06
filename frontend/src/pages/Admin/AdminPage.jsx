import { useEffect, useState } from "react";
import "./AdminPage.css";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${api_base_url}/allitemsadmin`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.items);
        } else {
          setItems([]);
          setError(data.message); 
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setItems([]);
        setError("Failed to fetch items. Please try again later.");
      });
  }, []);

  const handleListing = (itemId) => {
    fetch(`${api_base_url}/approveitem`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        isApproved: true,
        isDeclined: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item._id === itemId ? { ...item, isApproved: true } : item
            )
          );
          navigate("/admin") 
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error approving item:", err);
        setError("Failed to approve item. Please try again later.");
      });
  };

  const handleDecline = (itemId) => {
    fetch(`${api_base_url}/declineitem`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } else {
          setError(data.message); 
        }
      })
      .catch((err) => {
        console.error("Error declining item:", err);
        setError("Failed to decline item. Please try again later.");
      });
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="items-list">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-details">
                <img src={item.itemImage} alt={item.itemName} className="item-image" />
                <h2>{item.itemName}</h2>
                <p>{item.itemDescription}</p>
                <span>Price Per Day: Rs {item.itemPerDayPrice}</span>
                <div className="admin-actions">
                  <button
                    onClick={() => handleListing(item._id)}
                    className="approve-button"
                    disabled={item.isApproved}
                  >
                    {item.isApproved ? "Approved" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleDecline(item._id)}
                    className="decline-button"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;