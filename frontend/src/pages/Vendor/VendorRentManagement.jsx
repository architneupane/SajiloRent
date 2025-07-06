import { useEffect, useState } from "react";
import { api_base_url } from "../../pages/Helper";
import "./VendorRentManagement.css";

function VendorRentManagement() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${api_base_url}/allorders`, {
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
  }, []);

  const handleApprove = (orderId) => {
    fetch(`${api_base_url}/approve-rent`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: "approved" } : order
            )
          );
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error approving rent:", err);
        setError("Failed to approve rent. Please try again later.");
      });
  };

  const handleDecline = (orderId) => {
    fetch(`${api_base_url}/decline-rent`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error declining rent:", err);
        setError("Failed to decline rent. Please try again later.");
      });
  };

  return (
    <div className="vendor-rent-management">
      <h1>Manage Rental Requests</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="orders-list">
  {orders && orders.length > 0 ? (
    orders
      .filter(order => order && order.itemId) 
      .map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-details">
            <h2>{order.itemId?.itemName || "Item not available"}</h2>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress || "N/A"}</p>
            <p><strong>Contact No:</strong> {order.contactNo || "N/A"}</p>
            <p><strong>Email:</strong> {order.email || "N/A"}</p>
            <p><strong>Number of Days:</strong> {order.days ?? "N/A"}</p>
            <p><strong>Status:</strong> {order.status || "Unknown"}</p>
          </div>

          <div className="order-actions">
            {order.status === "pending" && (
              <>
                <button
                  onClick={() => handleApprove(order._id)}
                  className="approve-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(order._id)}
                  className="decline-button"
                >
                  Decline
                </button>
              </>
            )}

            {order.status === "approved" && (
              <p className="approved-message">Order Approved</p>
            )}

            {order.status === "declined" && (
              <p className="declined-message">Order Declined</p>
            )}
          </div>
        </div>
      ))
  ) : (
    <p>No rental requests available.</p>
  )}
</div>

    </div>
  );
}

export default VendorRentManagement;