import { useEffect, useState } from "react";
import { api_base_url } from "../Helper";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${api_base_url}/myorders?userId=${userId}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      });
  }, [userId]);

  return (
   <div className="my-orders-page">
  <h1>My Orders</h1>

  {error && <p className="error-message">{error}</p>}

  <div className="orders-list">
    {orders && orders.length > 0 ? (
      orders
        .filter(order => order && order.itemId) // Ensure valid entries
        .map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-details">
              <h2>{order.itemId?.itemName || "Item not available"}</h2>
              <p><strong>Delivery Address:</strong> {order.deliveryAddress || "N/A"}</p>
              <p><strong>Contact No:</strong> {order.contactNo || "N/A"}</p>
              <p><strong>Email:</strong> {order.email || "N/A"}</p>
              <p><strong>Number of Days:</strong> {order.days ?? "N/A"}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
            </div>
          </div>
        ))
    ) : (
      <p>No approved orders found.</p>
    )}
  </div>
</div>

  );
}

export default MyOrders;