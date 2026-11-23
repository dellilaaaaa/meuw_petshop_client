import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import Services from "./pages/detail & detail layanan/Services";
import ShoppingCart from "./pages/shopping cart/shoppingcart";
import Pembayaran from "./pages/pembayaran/pembayaran";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import RiwayatPesanan from "./pages/riwayat pesanan/riwayatpesanan";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import AdminDashboard from "./pages/admin/AdminDashboard";

const CART_STORAGE_KEY = "meuw_cart_items_v1";

const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const CustomerOnlyRoute = ({ children }) => {
  const user = getCurrentUser();
  if (user && user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const AdminOnlyRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Gagal membaca keranjang dari localStorage:", e);
    }
    return [];
  });

  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Gagal menyimpan keranjang ke localStorage:", e);
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.jumlah, 0);

  const handleAddToCart = (barang) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id_barang === barang.id_barang);
      if (existing) {
        return prevItems.map((i) =>
          i.id_barang === barang.id_barang ? { ...i, jumlah: i.jumlah + 1 } : i,
        );
      }
      return [
        ...prevItems,
        {
          id_detail_keranjang: Date.now(),
          id_keranjang: 1,
          id_barang: barang.id_barang,
          nama_barang: barang.nama_barang,
          harga: barang.harga,
          satuan: barang.satuan || "pcs",
          jumlah: 1,
          gambar: barang.gambar,
        },
      ];
    });
  };

  const handleAddBooking = (newBookingData) => {
    const newEntry = {
      id_booking: `BK-${Date.now().toString().slice(-8)}`,
      ...newBookingData,
      status_booking: "MENUNGGU KONFIRMASI",
    };
    setBookingList((prev) => [newEntry, ...prev]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <CustomerOnlyRoute>
              <Home cartCount={cartCount} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/home"
          element={
            <CustomerOnlyRoute>
              <Home cartCount={cartCount} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <CustomerOnlyRoute>
              <Catalog cartCount={cartCount} onAddToCart={handleAddToCart} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/services"
          element={
            <CustomerOnlyRoute>
              <Services cartCount={cartCount} onAddBooking={handleAddBooking} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <CustomerOnlyRoute>
              <ShoppingCart
                cartItems={cartItems}
                setCartItems={setCartItems}
                cartCount={cartCount}
              />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <CustomerOnlyRoute>
              <Pembayaran
                cartItems={cartItems}
                cartCount={cartCount}
                setCartItems={setCartItems}
              />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/about"
          element={
            <CustomerOnlyRoute>
              <About cartCount={cartCount} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerOnlyRoute>
              <Contact cartCount={cartCount} />
            </CustomerOnlyRoute>
          }
        />
        <Route
          path="/riwayat"
          element={
            <CustomerOnlyRoute>
              <RiwayatPesanan cartCount={cartCount} bookingList={bookingList} />
            </CustomerOnlyRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminOnlyRoute>
              <AdminDashboard />
            </AdminOnlyRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
