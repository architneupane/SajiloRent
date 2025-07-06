import { useEffect, useState } from "react";
import "./AllItems.css";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

function AllItems() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "guest";

  useEffect(() => {
    fetch(`${api_base_url}/allitems`, {
      mode: "cors",
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.items);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items. Please try again later.");
      });
  }, []);

  const handleRentNow = (itemId) => {
    if (role === "guest") {
      alert("Please log in or register to rent items.");
      navigate("/login");
    } else {
      navigate(`/allitems/${itemId}`);
    }
  };

  return (
    <div className="all-items-page">
      <h1>All Items</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-image">
              <img src={item.itemImage} alt={item.itemName} />
            </div>
            <div className="item-details">
              <h2>{item.itemName}</h2>
              <p>{item.itemDescription}</p>
              <span>Per Day Price: Rs {item.itemPerDayPrice}</span>
              <p>Status: {item.isAvailable ? "Available" : "Rented" }</p>
              <button
                onClick={() => handleRentNow(item._id)}
                disabled={!item.isAvailable}
              >
                {item.isAvailable ? "Rent Now" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllItems;