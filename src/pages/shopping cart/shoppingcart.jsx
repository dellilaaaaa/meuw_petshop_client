import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";

const SELECTED_STORAGE_KEY = "meuw_selected_cart_ids_v1";

const cartStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700;800&display=swap');

  /* ============================================================
     ANIMASI SUPER IMUT & BERNYAWA (KONSISTEN DI SEMUA HALAMAN)
     ============================================================ */
  
  @keyframes floatCute {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50% { transform: translateY(-8px) rotate(1deg); }
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    20% { transform: rotate(-8deg) scale(1.1); }
    40% { transform: rotate(8deg) scale(1.1); }
    60% { transform: rotate(-4deg) scale(1.05); }
    80% { transform: rotate(4deg) scale(1.05); }
  }

  @keyframes pulseBadge {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(247, 173, 173, 0.4); }
    50% { transform: scale(1.18); box-shadow: 0 0 12px 4px rgba(247, 173, 173, 0.6); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(22px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background-color: #FFFDF6 !important;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    color: #4A3E3E;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .wrapper {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 1.5rem 2rem 4rem 2rem;
    position: relative;
    z-index: 2;
    animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- AKSEN HOOD / BLOB BACKDROP --- */
  .bg-top-accent {
    position: absolute;
    top: -60px;
    right: -60px;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, #F7ADAD 0%, rgba(247, 173, 173, 0.18) 70%, transparent 100%);
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    filter: blur(35px);
    z-index: 1;
    pointer-events: none;
    opacity: 0.6;
    animation: floatCute 8s infinite ease-in-out;
  }

  /* --- NAVBAR --- */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    margin-bottom: 3rem;
    position: relative;
    z-index: 10;
  }

  .nav-logo-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .nav-logo-wrapper:hover {
    animation: wiggle 0.6s ease-in-out infinite;
  }

  .nav-logo-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.4);
    background-color: #FFF;
  }

  .nav-menu-pill {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: linear-gradient(135deg, #ffffff 0%, #fceded 100%);
    border: 2px solid #F7ADAD;
    padding: 6px 12px;
    border-radius: 40px;
    box-shadow: 0 6px 20px rgba(247, 173, 173, 0.18);
  }

  .nav-menu-link {
    text-decoration: none;
    color: #665959;
    font-size: 0.88rem;
    font-weight: 700;
    padding: 7px 18px;
    border-radius: 25px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Quicksand', sans-serif;
  }

  .nav-menu-link.active, .nav-menu-link:hover {
    background-color: #F7ADAD;
    color: #FFFDF6;
    box-shadow: 0 4px 14px rgba(247, 173, 173, 0.4);
    transform: translateY(-3px) scale(1.05);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .nav-icon-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    color: #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    box-shadow: 0 4px 14px rgba(247, 173, 173, 0.18);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .nav-icon-circle.active, .nav-icon-circle:hover {
    transform: translateY(-5px) scale(1.15) rotate(8deg);
    background-color: #B1E5E6;
  }

  .cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #F7ADAD;
    color: #FFFDF6;
    font-size: 0.72rem;
    font-weight: 800;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFDF6;
    font-family: 'Quicksand', sans-serif;
    animation: pulseBadge 1.8s infinite ease-in-out;
  }

  /* --- HERO TITLE --- */
  .hero-section {
    text-align: center;
    margin-bottom: 2.8rem;
  }

  .hero-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #4A3E3E;
    letter-spacing: -0.5px;
    margin-bottom: 0.5rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .hero-subtitle {
    font-size: 1rem;
    color: #665959;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  /* --- CART LAYOUT --- */
  .cart-layout {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 2.2rem;
    align-items: start;
  }

  .section-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  /* --- SELECT ALL BAR --- */
  .select-all-bar {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 25px;
    padding: 0.9rem 1.4rem;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    font-size: 0.9rem;
    font-weight: 800;
    color: #4A3E3E;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.1);
    transition: all 0.3s ease;
  }

  .select-all-bar:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(247, 173, 173, 0.18);
  }

  /* --- CUSTOM CHECKBOX --- */
  .custom-checkbox {
    width: 22px;
    height: 22px;
    accent-color: #F7ADAD;
    cursor: pointer;
    border-radius: 8px;
  }

  /* --- CART ITEM CARD --- */
  .cart-item-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 32px 20px 30px 20px;
    padding: 1.4rem;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.12);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .cart-item-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(247, 173, 173, 0.22);
  }

  .cart-item-card.selected {
    background-color: #FFFDF8;
    border-color: #F7ADAD;
  }

  .item-img-box {
    width: 88px;
    height: 88px;
    border-radius: 24px;
    background-color: #FDEAE8;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.15);
  }

  .item-img {
    max-width: 82%;
    max-height: 82%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .cart-item-card:hover .item-img {
    transform: scale(1.1) rotate(-3deg);
  }

  .item-info {
    flex: 1;
  }

  .item-name {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #4A3E3E;
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }

  .item-unit-price {
    font-size: 0.82rem;
    color: #887B7B;
    margin-bottom: 0.5rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .item-total-price {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: #F7ADAD;
  }

  /* --- QTY CONTROLS --- */
  .qty-controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #B1E5E6;
    border: 2px solid #F7ADAD;
    font-weight: 800;
    color: #4A3E3E;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 3px 8px rgba(177, 229, 230, 0.4);
  }

  .qty-btn:hover {
    transform: scale(1.15) rotate(6deg);
    background-color: #F7ADAD;
    color: #FFFDF6;
  }

  .qty-number {
    font-size: 0.95rem;
    font-weight: 800;
    width: 26px;
    text-align: center;
    font-family: 'Quicksand', sans-serif;
    color: #4A3E3E;
  }

  .delete-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    margin-left: 0.6rem;
    transition: all 0.25s ease;
    opacity: 0.7;
  }

  .delete-btn:hover {
    opacity: 1;
    transform: scale(1.2) rotate(12deg);
  }

  /* --- RINGKASAN BELANJA --- */
  .summary-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 24px 36px 24px;
    padding: 2.2rem;
    position: sticky;
    top: 20px;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.14);
  }

  .summary-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #4A3E3E;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #665959;
    margin-bottom: 0.9rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .summary-divider {
    border-bottom: 2px dashed #F7ADAD;
    margin: 1.3rem 0;
  }

  .summary-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.8rem;
  }

  .checkout-btn {
    width: 100%;
    background-color: #4A3E3E;
    border: 2px solid #F7ADAD;
    color: #FFFDF6;
    padding: 15px;
    border-radius: 28px;
    font-weight: 800;
    font-size: 0.98rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 22px rgba(74, 62, 62, 0.2);
  }

  .checkout-btn:disabled {
    background-color: #E0E0E0;
    border-color: #CCC;
    color: #999;
    cursor: not-allowed;
    box-shadow: none;
    transform: none !important;
  }

  .checkout-btn:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.02);
    background-color: #F7ADAD;
    color: #FFF;
    box-shadow: 0 12px 26px rgba(247, 173, 173, 0.5);
  }

  /* --- EMPTY CART STATE --- */
  .empty-cart-box {
    background-color: #FFF;
    border: 2px dashed #F7ADAD;
    border-radius: 36px;
    padding: 4rem 2rem;
    text-align: center;
    color: #665959;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.1);
  }

  .empty-cart-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: floatCute 3.5s infinite ease-in-out;
    display: inline-block;
  }

  .empty-cart-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 0.4rem;
  }

  .empty-cart-btn {
    display: inline-block;
    margin-top: 1.5rem;
    background-color: #4A3E3E;
    color: #FFFDF6;
    padding: 12px 28px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.92rem;
    font-family: 'Quicksand', sans-serif;
    border: 2px solid #F7ADAD;
    box-shadow: 0 6px 18px rgba(74, 62, 62, 0.2);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .empty-cart-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 24px rgba(247, 173, 173, 0.4);
  }

  /* --- FOOTER EXPLICIT ORGANIK (5 KOLOM PRESISI) --- */
  .footer-rayo-box {
    background-color: #F7ADAD;
    color: #FFFDF6;
    border-radius: 42px 42px 34px 34px;
    padding: 4.2rem 3.5rem 2.4rem 3.5rem;
    box-shadow: 0 -10px 32px rgba(247, 173, 173, 0.25);
    margin-top: 4.5rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2.2fr;
    gap: 2rem;
    margin-bottom: 3.8rem;
  }

  .footer-brand {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 4rem;
    font-weight: 800;
    color: #FFFDF6;
    line-height: 1;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    display: inline-block;
  }

  .footer-brand:hover {
    animation: wiggle 0.6s ease-in-out;
  }

  .footer-col-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 1.2rem;
    color: #FFFDF6;
  }

  .footer-col-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .footer-col-list a {
    text-decoration: none;
    color: #FFFDF6;
    opacity: 0.92;
    font-size: 0.88rem;
    transition: all 0.25s ease;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    display: inline-block;
  }

  .footer-col-list a:hover {
    opacity: 1;
    transform: translateX(6px);
  }

  .newsletter-desc {
    font-size: 0.88rem;
    opacity: 0.92;
    margin-bottom: 1.2rem;
    line-height: 1.5;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .newsletter-input {
    width: 100%;
    padding: 10px 0;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 253, 246, 0.7);
    color: #FFFDF6;
    outline: none;
    font-size: 0.9rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    transition: border-color 0.3s ease;
  }

  .newsletter-input:focus {
    border-bottom-color: #FFFDF6;
  }

  .newsletter-input::placeholder {
    color: rgba(255, 253, 246, 0.65);
  }

  .footer-bottom-bar {
    border-top: 1.5px solid rgba(255, 253, 246, 0.3);
    padding-top: 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    opacity: 0.92;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  @media (max-width: 850px) {
    .cart-layout { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const ShoppingCart = ({ cartItems = [], setCartItems, cartCount = 0 }) => {
  const navigate = useNavigate();

  // State untuk menyimpan ID item yang dicentang (tersimpan di localStorage)
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(SELECTED_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Gagal membaca selectedIds dari localStorage:", e);
    }
    return cartItems.map((item) => item.id_detail_keranjang);
  });

  // Sinkronisasi selectedIds ke localStorage setiap ada perubahan
  useEffect(() => {
    const existingIds = cartItems.map((item) => item.id_detail_keranjang);
    const cleaned = selectedIds.filter((id) => existingIds.includes(id));

    if (cleaned.length !== selectedIds.length) {
      setSelectedIds(cleaned);
    }

    try {
      localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(cleaned));
    } catch (e) {
      console.error("Gagal menyimpan selectedIds ke localStorage:", e);
    }
  }, [selectedIds, cartItems]);

  // Toggle Centang 1 Barang
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Toggle Centang "Pilih Semua"
  const isAllSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((item) => item.id_detail_keranjang));
    }
  };

  // Tambah Qty Item
  const handleIncreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id_detail_keranjang === id
          ? { ...item, jumlah: item.jumlah + 1 }
          : item,
      ),
    );
  };

  // Kurangi Qty Item
  const handleDecreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id_detail_keranjang === id) {
          const newQty = item.jumlah - 1;
          return newQty > 0 ? { ...item, jumlah: newQty } : item;
        }
        return item;
      }),
    );
  };

  // Hapus Item dari Keranjang
  const handleDeleteItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id_detail_keranjang !== id),
    );
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  // --- HITUNG RINGKASAN BELANJA (HANYA UNTUK ITEM YANG DICENTANG) ---
  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id_detail_keranjang),
  );

  const totalSelectedItemCount = selectedItems.reduce(
    (sum, item) => sum + item.jumlah,
    0,
  );

  const subtotalHarga = selectedItems.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0,
  );

  // Lanjut ke Pembayaran dengan membawa hanya item yang dicentang
  const handleProceedToPayment = () => {
    if (selectedItems.length === 0) return;
    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    navigate("/pembayaran", { state: { selectedItems } });
  };

  return (
    <>
      <style>{cartStyles}</style>

      {/* Lengkungan Soft Accent di Kanan Atas */}
      <div className="bg-top-accent"></div>

      <div className="wrapper">
        {/* --- NAVBAR --- */}
        <nav className="navbar">
          {/* LOGO MEUW PETSHOP */}
          <Link to="/home" className="nav-logo-wrapper" title="MEUW PETSHOP">
            <img
              src={logoImg}
              alt="MEUW Petshop Logo"
              className="nav-logo-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "1",
              }}
            >
              <span
                style={{
                  fontFamily: "'Baloo 2', cursive, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "#4A3E3E",
                  letterSpacing: "-0.5px",
                }}
              >
                MEUW<span style={{ color: "#F7ADAD" }}>.</span>
              </span>
              <span
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  color: "#F7ADAD",
                  letterSpacing: "0.12em",
                }}
              >
                FOOD & ACCESSORIES
              </span>
            </div>
          </Link>

          <div className="nav-menu-pill">
            <Link to="/home" className="nav-menu-link">
              Home
            </Link>
            <Link to="/catalog" className="nav-menu-link">
              Catalog
            </Link>
            <Link to="/services" className="nav-menu-link">
              Layanan
            </Link>
            <Link to="/about" className="nav-menu-link">
              About
            </Link>
            <Link to="/contact" className="nav-menu-link">
              Contact
            </Link>
          </div>

          <div className="nav-actions">
            <Link
              to="/riwayat"
              className="nav-icon-circle"
              title="Riwayat & Review"
            >
              👤
            </Link>
            <Link
              to="/cart"
              className="nav-icon-circle active"
              title="Keranjang Belanja"
            >
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>

        {/* --- HERO TITLE --- */}
        <section className="hero-section">
          <h1 className="hero-title">KERANJANG BELANJA 🛒</h1>
          <p className="hero-subtitle">
            Pilih barang yang ingin kamu bayar sekarang. Barang lainnya tetap
            tersimpan aman di keranjang!
          </p>
        </section>

        {cartItems.length > 0 ? (
          <div className="cart-layout">
            {/* --- KOLOM KIRI: DAFTAR BARANG --- */}
            <div>
              <div className="section-title">
                <span>DAFTAR BARANG</span>
                <span>📦</span>
              </div>

              {/* CHECKBOX PILIH SEMUA */}
              <label className="select-all-bar">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={isAllSelected}
                  onChange={handleToggleSelectAll}
                />
                <span>Pilih Semua ({cartItems.length} Barang)</span>
              </label>

              {/* LIST KARTU ITEM KERANJANG */}
              {cartItems.map((item) => {
                const isSelected = selectedIds.includes(
                  item.id_detail_keranjang,
                );
                return (
                  <div
                    key={item.id_detail_keranjang}
                    className={`cart-item-card ${isSelected ? "selected" : ""}`}
                  >
                    {/* CHECKBOX ITEM */}
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleToggleSelect(item.id_detail_keranjang)
                      }
                    />

                    {/* GAMBAR ITEM */}
                    <div className="item-img-box">
                      <img
                        src={item.gambar}
                        alt={item.nama_barang}
                        className="item-img"
                      />
                    </div>

                    {/* DETAIL ITEM */}
                    <div className="item-info">
                      <div className="item-name">{item.nama_barang}</div>
                      <div className="item-unit-price">
                        Rp {item.harga.toLocaleString("id-ID")} / {item.satuan}
                      </div>
                      <div className="item-total-price">
                        Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                      </div>
                    </div>

                    {/* KONTROL QTY & HAPUS */}
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleDecreaseQty(item.id_detail_keranjang)
                        }
                      >
                        -
                      </button>
                      <span className="qty-number">{item.jumlah}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleIncreaseQty(item.id_detail_keranjang)
                        }
                      >
                        +
                      </button>
                      <button
                        className="delete-btn"
                        title="Hapus"
                        onClick={() =>
                          handleDeleteItem(item.id_detail_keranjang)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- KOLOM KANAN: RINGKASAN BELANJA --- */}
            <div>
              <div className="summary-card">
                <h3 className="summary-title">RINGKASAN BELANJA 🧾</h3>

                <div className="summary-row">
                  <span>Barang Terpilih</span>
                  <strong>{totalSelectedItemCount} Item</strong>
                </div>

                <div className="summary-row">
                  <span>Subtotal Produk</span>
                  <strong>Rp {subtotalHarga.toLocaleString("id-ID")}</strong>
                </div>

                <div className="summary-row">
                  <span>Biaya Layanan</span>
                  <strong style={{ color: "#26A69A" }}>FREE</strong>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total-row">
                  <span>Total Harga</span>
                  <span style={{ color: "#F7ADAD" }}>
                    Rp {subtotalHarga.toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  className="checkout-btn"
                  disabled={selectedItems.length === 0}
                  onClick={handleProceedToPayment}
                >
                  {selectedItems.length > 0
                    ? `BAYAR TERPILIH (${selectedItems.length}) ➔`
                    : "PILIH BARANG DULU"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart-box">
            <div className="empty-cart-icon">🛒</div>
            <h3 className="empty-cart-title">
              Keranjang belanjaanmu masih kosong nih!
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                marginTop: "0.4rem",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: 600,
              }}
            >
              Yuk cari makanan & perlengkapan favorit anabulmu sekarang.
            </p>
            <Link to="/catalog" className="empty-cart-btn">
              Belanja Sekarang 🐾
            </Link>
          </div>
        )}

        {/* --- FOOTER RAYO BOX --- */}
        <footer className="footer-rayo-box">
          <div className="footer-grid">
            <div className="footer-brand">MEUW</div>

            <div>
              <div className="footer-col-title">Menu</div>
              <ul className="footer-col-list">
                <li>
                  <Link to="/catalog">Catalog</Link>
                </li>
                <li>
                  <Link to="/services">Layanan</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Shipping</div>
              <ul className="footer-col-list">
                <li>
                  <a href="#shipping">Delivery methods</a>
                </li>
                <li>
                  <a href="#time">Time & cost</a>
                </li>
                <li>
                  <a href="#tracking">Order tracking</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Social</div>
              <ul className="footer-col-list">
                <li>
                  <a href="#instagram">Instagram</a>
                </li>
                <li>
                  <a href="#tiktok">TikTok</a>
                </li>
                <li>
                  <a href="#facebook">Facebook</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">More love. More MEUW.</div>
              <p className="newsletter-desc">
                Promo & diskon menarik selalu siap untuk anabul kesayanganmu.
              </p>
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Masukkan email..."
                  className="newsletter-input"
                />
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>All rights reserved MEUW PETSHOP © 2026</div>
            <div>Privacy policy</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ShoppingCart;
