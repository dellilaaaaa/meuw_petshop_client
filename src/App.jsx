import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
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

const CART_STORAGE_KEY = "meuw_cart_items_v1";
const BOOKING_STORAGE_KEY = "meuw_booking_list_v1";

const DEFAULT_CART_ITEMS = [
  {
    id_detail_keranjang: 101,
    id_keranjang: 1,
    id_barang: 1,
    nama_barang: "Royal Canin Mother & Babycat 2kg",
    harga: 285000,
    satuan: "pcs",
    jumlah: 1,
    gambar: "https://via.placeholder.com/150/F7ADAD/FFFDF6?text=Dry+Food",
  },
  {
    id_detail_keranjang: 102,
    id_keranjang: 1,
    id_barang: 3,
    nama_barang: "Shampoo Anti Kutu & Jamur 250ml",
    harga: 45000,
    satuan: "botol",
    jumlah: 2,
    gambar: "https://via.placeholder.com/150/F7ADAD/FFFDF6?text=Shampoo",
  },
  {
    id_detail_keranjang: 103,
    id_keranjang: 1,
    id_barang: 5,
    nama_barang: "Creamy Treats Kucing (Isi 4)",
    harga: 22000,
    satuan: "pack",
    jumlah: 3,
    gambar: "https://via.placeholder.com/150/F7ADAD/FFFDF6?text=Snack",
  },
];

const DEFAULT_BOOKING_LIST = [
  {
    id_booking: "BK-20261016-01",
    nama_layanan: "Grooming Anti Kutu & Jamur",
    harga: 85000,
    tanggal_mulai: "2026-10-18",
    jam_mulai: "10:00",
    tanggal_selesai: "2026-10-18",
    status_booking: "MENUNGGU KONFIRMASI",
    icon: "🏥",
  },
];

function App() {
  // STATE KERANJANG GLOBAL (Tersimpan di localStorage agar tidak reset saat refresh)
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
    return DEFAULT_CART_ITEMS;
  });

  // STATE RIWAYAT BOOKING LAYANAN GLOBAL
  const [bookingList, setBookingList] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Gagal membaca booking dari localStorage:", e);
    }
    return DEFAULT_BOOKING_LIST;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Gagal menyimpan keranjang ke localStorage:", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookingList));
    } catch (e) {
      console.error("Gagal menyimpan booking ke localStorage:", e);
    }
  }, [bookingList]);

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
        {/* Tampilan awal langsung ke halaman Home */}
        <Route path="/" element={<Home cartCount={cartCount} />} />

        {/* Halaman Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman Utama Aplikasi */}
        <Route path="/home" element={<Home cartCount={cartCount} />} />
        <Route
          path="/catalog"
          element={
            <Catalog cartCount={cartCount} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/services"
          element={
            <Services cartCount={cartCount} onAddBooking={handleAddBooking} />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartItems={cartItems}
              setCartItems={setCartItems}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="/pembayaran"
          element={<Pembayaran cartItems={cartItems} cartCount={cartCount} />}
        />
        <Route path="/about" element={<About cartCount={cartCount} />} />
        <Route path="/contact" element={<Contact cartCount={cartCount} />} />
        <Route
          path="/riwayat"
          element={
            <RiwayatPesanan cartCount={cartCount} bookingList={bookingList} />
          }
        />
        {/* Halaman Admin & Laporan */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Fallback jika URL tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
