import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AirpodsPage from "./features/products/AirpodsPage";
import PhonePage from "./features/products/PhonePage";
import IpadPage from "./features/products/IpadPage";
import WatchPage from "./features/products/WatchPage";
import MacPage from "./features/products/MacPage";
import AdminPage from "./features/admin/AdminPage";
import CartPage from "./features/cart/CartPage";
import LoginPage from "./features/auth/LoginPage";
import OrderPage from "./features/orders/OrderPage";
import RegisterPage from "./features/auth/RegisterPage";
import AccountPage from "./features/account/AccountPage";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/common/ScrollToTop";
import ProductDetailPage from "./features/products/ProductDetailPage";
import CheckoutPage from "./features/checkout/CheckoutPage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airpods/:model" element={<AirpodsPage />} />
        <Route path="/airpods" element={<Navigate to="/airpods/airpods" replace />} />
        <Route path="/iphone/:model" element={<PhonePage />} />
        <Route path="/iphone" element={<Navigate to="/iphone/15pro" replace />} />
        <Route path="/ipad/:model" element={<IpadPage />} />
        <Route path="/ipad" element={<Navigate to="/ipad/pro" replace />} />
        <Route path="/watch/:model" element={<WatchPage />} />
        <Route path="/watch" element={<Navigate to="/watch/series9" replace />} />
        <Route path="/mac/:model" element={<MacPage />} />
        <Route path="/mac" element={<Navigate to="/mac/air" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/account/*" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;