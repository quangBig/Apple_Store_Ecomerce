import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhonePage from "./pages/PhonePage";
import IpadPage from "./pages/IpadPage";
import WatchPage from "./pages/WatchPage";
import MacPage from "./pages/MacPage";
import AirpodsPage from "./pages/AirpodsPage";
import AdminPage from "./pages/AdminPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ScrollToTop from "./components/ScrollToTop";
import OrderPage from './pages/OrderPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
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