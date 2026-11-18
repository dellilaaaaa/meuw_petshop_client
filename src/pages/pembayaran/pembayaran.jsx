import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImg from "../../images/logo.png";

const paymentStyles = `
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

  .nav-icon-circle:hover {
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
  .page-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 2rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
    text-align: center;
  }

  /* --- CHECKOUT CARD --- */
  .checkout-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 24px 36px 24px;
    padding: 2.2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.12);
    transition: all 0.35s ease;
  }

  .checkout-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 34px rgba(247, 173, 173, 0.2);
  }

  .card-section-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.2rem;
    border-bottom: 2px dashed #F7ADAD;
    padding-bottom: 0.6rem;
  }

  .summary-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
    color: #665959;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .summary-total-box {
    border-top: 2px dashed #F7ADAD;
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    font-size: 1.2rem;
    font-family: 'Baloo 2', cursive, sans-serif;
    font-weight: 700;
    color: #4A3E3E;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* --- METHOD BUTTONS & INSTRUCTIONS --- */
  .method-btn-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.8rem;
    flex-wrap: wrap;
  }

  .method-btn {
    padding: 10px 24px;
    border-radius: 25px;
    border: 2px solid #F7ADAD;
    font-size: 0.9rem;
    font-weight: 800;
    font-family: 'Quicksand', sans-serif;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.1);
  }

  .method-btn.active {
    background-color: #F7ADAD;
    color: #FFFDF6;
    box-shadow: 0 6px 16px rgba(247, 173, 173, 0.4);
    transform: translateY(-2px) scale(1.04);
  }

  .method-btn:not(.active) {
    background-color: #FFF;
    color: #4A3E3E;
  }

  .method-btn:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .payment-details-box {
    background-color: #FFFDF6;
    border: 2px dashed #F7ADAD;
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 1.8rem;
    text-align: center;
  }

  .qris-preview-qr {
    width: 170px;
    height: 170px;
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 18px;
    margin: 0.8rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #4A3E3E;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.15);
  }

  .va-number-box {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #F7ADAD;
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    padding: 10px 20px;
    border-radius: 20px;
    display: inline-block;
    margin: 0.8rem 0;
    letter-spacing: 1.5px;
  }

  .btn-submit {
    width: 100%;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    padding: 15px;
    border-radius: 28px;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
    font-family: 'Quicksand', sans-serif;
    letter-spacing: 0.02em;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 22px rgba(74, 62, 62, 0.2);
  }

  .btn-submit:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 26px rgba(247, 173, 173, 0.5);
  }

  /* --- FOOTER EXPLICIT ORGANIK (5 KOLOM PRESISI) --- */
  .footer-rayo-box {
    background-color: #F7ADAD;
    color: #FFFDF6;
    border-radius: 42px 42px 34px 34px;
    padding: 4.2rem 3.5rem 2.4rem 3.5rem;
    box-shadow: 0 -10px 32px rgba(247, 173, 173, 0.25);
    margin-top: 3rem;
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
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const Pembayaran = ({ cartItems = [], cartCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState("qris");

  // Ambil hanya item terpilih dari router state, flag centang, atau localStorage
  const stateItems =
    location.state?.selectedItems ||
    location.state?.items ||
    location.state?.checkoutItems;

  const itemsToPay = (() => {
    if (Array.isArray(stateItems) && stateItems.length > 0) {
      return stateItems;
    }

    const hasSelectionFlag = cartItems.some(
      (item) =>
        typeof item.selected === "boolean" ||
        typeof item.checked === "boolean" ||
        typeof item.isSelected === "boolean",
    );

    if (hasSelectionFlag) {
      return cartItems.filter(
        (item) =>
          item.selected === true ||
          item.checked === true ||
          item.isSelected === true,
      );
    }

    try {
      const savedCheckout = JSON.parse(
        localStorage.getItem("checkoutItems") ||
          localStorage.getItem("selectedCartItems") ||
          "null",
      );
      if (Array.isArray(savedCheckout) && savedCheckout.length > 0) {
        return savedCheckout;
      }
    } catch (e) {
      console.error(e);
    }

    return cartItems;
  })();

  const subtotal = itemsToPay.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0,
  );

  const handleConfirm = () => {
    alert(
      `🎉 Pembayaran sebesar Rp ${subtotal.toLocaleString("id-ID")} berhasil diproses!\n\nTerima kasih telah berbelanja di MEUW Petshop! 🐾`,
    );
    navigate("/catalog");
  };

  return (
    <>
      <style>{paymentStyles}</style>

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
              className="nav-icon-circle"
              title="Keranjang Belanja"
            >
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>

        <h1 className="page-title">PEMBAYARAN 💳</h1>

        {/* --- RINGKASAN TAGIHAN CARD --- */}
        <div className="checkout-card">
          <h3 className="card-section-title">Ringkasan Tagihan 📄</h3>
          {itemsToPay.length > 0 ? (
            itemsToPay.map((i) => (
              <div
                key={i.id_detail_keranjang || i.id_barang}
                className="summary-item-row"
              >
                <span>
                  {i.nama_barang} (x{i.jumlah})
                </span>
                <strong>
                  Rp {(i.harga * i.jumlah).toLocaleString("id-ID")}
                </strong>
              </div>
            ))
          ) : (
            <p
              style={{
                fontSize: "0.95rem",
                color: "#665959",
                marginBottom: "0.5rem",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: 600,
              }}
            >
              Belum ada produk yang dipilih untuk dibayar.
            </p>
          )}

          <div className="summary-total-box">
            <span>Total Pembayaran:</span>
            <strong style={{ color: "#F7ADAD", fontSize: "1.4rem" }}>
              Rp {subtotal.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>

        {/* --- METODE PEMBAYARAN CARD --- */}
        <div className="checkout-card">
          <h3 className="card-section-title">Metode Pembayaran 💸</h3>

          <div className="method-btn-group">
            <button
              className={`method-btn ${method === "qris" ? "active" : ""}`}
              onClick={() => setMethod("qris")}
            >
              📱 QRIS Instant
            </button>
            <button
              className={`method-btn ${method === "va" ? "active" : ""}`}
              onClick={() => setMethod("va")}
            >
              🏦 Virtual Account (BCA/Mandiri/BRI)
            </button>
          </div>

          {/* DETAIL INSTUKSI BERDASARKAN METODE */}
          {method === "qris" ? (
            <div className="payment-details-box">
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                Scan QRIS dengan e-Wallet / M-Banking Favoritmu 📲
              </div>
              <div className="qris-preview-qr">
                <span>📱</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 800 }}>
                  MEUW QRIS
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#665959",
                  fontWeight: 600,
                }}
              >
                Berlaku untuk GoPay, OVO, Dana, ShopeePay & semua M-Banking.
              </p>
            </div>
          ) : (
            <div className="payment-details-box">
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                Nomor Virtual Account MEUW Petshop:
              </div>
              <div className="va-number-box">8801 9283 7461 002</div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#665959",
                  fontWeight: 600,
                }}
              >
                Transfer sesuai nominal persis hingga 3 digit terakhir.
              </p>
            </div>
          )}

          <button className="btn-submit" onClick={handleConfirm}>
            KONFIRMASI PEMBAYARAN 💖
          </button>
        </div>

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
                Dapatkan info pembayaran & promo spesial untuk transaksi
                anabulmu.
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

export default Pembayaran;
