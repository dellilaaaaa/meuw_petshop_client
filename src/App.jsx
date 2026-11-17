import React, { useState, useEffect } from "react";
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import Services from "./pages/detail & detail layanan/Services";
import ShoppingCart from "./pages/shopping cart/shoppingcart";
import Pembayaran from "./pages/pembayaran/pembayaran";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact"; // 👈 Import fail Contact
import RiwayatPesanan from "./pages/riwayat pesanan/riwayatpesanan";

function App() {
  const [page, setPage] = useState("home");

  // STATE KERANJANG GLOBAL
  const [cartItems, setCartItems] = useState([
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
  ]);

  // STATE RIWAYAT BOOKING LAYANAN GLOBAL
  const [bookingList, setBookingList] = useState([
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
  ]);

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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "catalog" || hash === "store") {
        setPage("catalog");
      } else if (hash === "services" || hash === "layanan") {
        setPage("services");
      } else if (hash === "cart" || hash === "shopping-cart") {
        setPage("cart");
      } else if (hash === "pembayaran" || hash === "checkout") {
        setPage("pembayaran");
      } else if (hash === "about") {
        setPage("about");
      } else if (hash === "contact" || hash === "kontak") {
        setPage("contact"); // 👈 Tambah pautan ke halaman contact
      } else if (hash === "riwayat" || hash === "review") {
        setPage("riwayat");
      } else {
        setPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div>
      {page === "home" && <Home cartCount={cartCount} />}
      {page === "catalog" && (
        <Catalog cartCount={cartCount} onAddToCart={handleAddToCart} />
      )}
      {page === "services" && (
        <Services cartCount={cartCount} onAddBooking={handleAddBooking} />
      )}
      {page === "cart" && (
        <ShoppingCart
          cartItems={cartItems}
          setCartItems={setCartItems}
          cartCount={cartCount}
        />
      )}
      {page === "pembayaran" && (
        <Pembayaran cartItems={cartItems} cartCount={cartCount} />
      )}
      {page === "about" && <About cartCount={cartCount} />}
      {page === "contact" && <Contact cartCount={cartCount} />}{" "}
      {/* 👈 Paparkan Halaman Contact */}
      {page === "riwayat" && (
        <RiwayatPesanan cartCount={cartCount} bookingList={bookingList} />
      )}
    </div>
  );
}

export default App;
