import{ useState } from 'react';
import '../Vendor/VendorPage.css';
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../../pages/Helper';

function Vendor() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPerDayPrice, setItemPerDayPrice] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemCategory, setItemCategory] = useState(""); 
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const listingItem = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/listing", {
      mode: "cors",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        itemCategory,
        itemName,
        itemDescription,
        itemPerDayPrice,
        itemImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/vendor`);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div className="listing-container">
      <h1>List Your Item</h1>
      <form onSubmit={listingItem} className="listing-form">
        <div className="inputbox">
          <label>Item Name</label>
          <input
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            name="itemName"
            type="text"
            id="itemName"
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(e) => setItemDescription(e.target.value)}
            value={itemDescription}
            name="itemDescription"
            id="description"
            placeholder="Enter item description"
            required
          ></textarea>
        </div>
        <div className="inputbox">
          <label htmlFor="price">Price Per Day</label>
          <input
            onChange={(e) => setItemPerDayPrice(e.target.value)}
            value={itemPerDayPrice}
            name="itemPerDayPrice"
            type="number"
            id=""
            placeholder="Enter price per day"
            required
          />
        </div>
        <div className="inputbox">
          <label htmlFor="category">Category</label>
          <select
            onChange={(e) => setItemCategory(e.target.value)}
            value={itemCategory}
            name="itemCategory"
            id="category"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Clothing">Equipment Tools</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Travel Gear">Travel Gear</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="inputbox">
          <label>Image</label>
          <input
            onChange={(e) => setItemImage(e.target.value)}
            value={itemImage}
            name="itemImage"
            type="text"
            id="imageUrl"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          List Item
        </button>
      </form>
    </div>
  );
}

export default Vendor;

