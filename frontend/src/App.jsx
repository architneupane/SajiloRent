import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nopage from "./pages/NoPage";
import AllItems from "./pages/AllItems/AllItems";
import Navbar from "./components/Navbar/Navbar";
import AdminPage from "./pages/Admin/AdminPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import VendorLogin from "./pages/Vendor/VendorLogin";
import VendorPage from "./pages/Vendor/VendorPage";
import Footer from './components/Footer/Footer';
import RentingPage from "./pages/RentingPage/RentingPage";
import RegisterUser from "./pages/Register/Register";
import VendorRentManagement from "./pages/Vendor/VendorRentManagement";
import MyOrders from "./pages/MyOrders/MyOrders";
import "./App.css";

function App() {
  return (
    <div className="page-wrapper">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allitems" element={<AllItems />} />
            <Route path="/vendor/listing" element={<VendorPage />} />
            <Route path="/vendorlogin" element={<VendorLogin />} />
            <Route path="/vendor" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/allitems/:itemId" element={<RentingPage />} />
            <Route path="/vendor/rent-management" element={<VendorRentManagement />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
