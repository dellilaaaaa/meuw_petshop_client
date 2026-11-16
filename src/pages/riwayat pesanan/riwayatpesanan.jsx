import React, { useState } from "react";
import logoImg from "../../images/logo.png";

const riwayatStyles = `
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

  .nav-icon-circle.active {
    background-color: #F7ADAD;
    color: #FFFDF6;
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
    font-size: 3.2rem;
    font-weight: 800;
    color: #4A3E3E;
    text-align: center;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  /* --- TAB PILL CONTAINER --- */
  .tab-pill-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .tab-btn {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    color: #665959;
    padding: 10px 26px;
    border-radius: 25px;
    font-weight: 800;
    font-size: 0.92rem;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 4px 14px rgba(247, 173, 173, 0.1);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tab-btn.active, .tab-btn:hover {
    background-color: #F7ADAD;
    color: #FFFDF6;
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 8px 20px rgba(247, 173, 173, 0.35);
  }

  /* --- ORDER CARD RAYO --- */
  .order-card-rayo {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 32px 20px 30px 20px;
    padding: 1.8rem;
    margin-bottom: 1.8rem;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.12);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .order-card-rayo:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 30px rgba(247, 173, 173, 0.22);
  }

  .order-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    border-bottom: 1.5px dashed #FFEBEB;
    padding-bottom: 0.6rem;
  }

  .order-id {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    color: #4A3E3E;
  }

  .status-badge {
    font-family: 'Quicksand', sans-serif;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 4px 14px;
    border-radius: 15px;
    background-color: #E8F8F5;
    color: #26A69A;
    border: 1.5px solid #26A69A;
  }

  .status-badge.pending {
    background-color: #FFF3E0;
    color: #E65100;
    border-color: #E65100;
  }

  .order-details-text {
    font-size: 0.95rem;
    color: #665959;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  .order-price-tag {
    font-family: 'Baloo 2', cursive, sans-serif;
    color: #F7ADAD;
    font-weight: 800;
    font-size: 1.35rem;
    text-align: right;
  }

  /* --- EMPTY STATE --- */
  .empty-history-box {
    background-color: #FFF;
    border: 2px dashed #F7ADAD;
    border-radius: 36px;
    padding: 3.5rem 2rem;
    text-align: center;
    color: #665959;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.1);
    margin-bottom: 3rem;
  }

  .empty-history-icon {
    font-size: 3.8rem;
    margin-bottom: 0.8rem;
    animation: floatCute 3.5s infinite ease-in-out;
    display: inline-block;
  }

  .empty-history-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 0.4rem;
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
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const RiwayatPesanan = ({ cartCount = 0, bookingList = [] }) => {
  const [activeTab, setActiveTab] = useState("produk");

  const riwayatProduk = [
    {
      id_transaksi: "TRX-20261014-01",
      tanggal: "14 Okt 2026",
      items: "Royal Canin Mother & Babycat (1x), Shampoo Anti Kutu (2x)",
      total: 375000,
      status: "SELESAI",
    },
  ];

  return (
    <>
      <style>{riwayatStyles}</style>

      {/* Lengkungan Soft Accent di Kanan Atas */}
      <div className="bg-top-accent"></div>

      <div className="wrapper">
        {/* --- NAVBAR --- */}
        <nav className="navbar">
          {/* LOGO MEUW PETSHOP */}
          <a href="#home" className="nav-logo-wrapper" title="MEUW PETSHOP">
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
          </a>

          <div className="nav-menu-pill">
            <a href="#home" className="nav-menu-link">
              Home
            </a>
            <a href="#catalog" className="nav-menu-link">
              Catalog
            </a>
            <a href="#services" className="nav-menu-link">
              Layanan
            </a>
            <a href="#about" className="nav-menu-link">
              About
            </a>
            <a href="#contact" className="nav-menu-link">
              Contact
            </a>
          </div>

          <div className="nav-actions">
            <a
              href="#riwayat"
              className="nav-icon-circle active"
              title="Riwayat & Review"
            >
              👤
            </a>
            <a
              href="#cart"
              className="nav-icon-circle"
              title="Keranjang Belanja"
            >
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </a>
          </div>
        </nav>

        {/* --- HERO TITLE --- */}
        <h1 className="page-title">RIWAYAT & BOOKING 📜</h1>

        {/* --- TAB BUTTONS --- */}
        <div className="tab-pill-container">
          <button
            className={`tab-btn ${activeTab === "produk" ? "active" : ""}`}
            onClick={() => setActiveTab("produk")}
          >
            📦 Belanja Produk ({riwayatProduk.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "layanan" ? "active" : ""}`}
            onClick={() => setActiveTab("layanan")}
          >
            📅 Booking Layanan ({bookingList.length})
          </button>
        </div>

        {/* --- TAB CONTENT: PRODUK --- */}
        {activeTab === "produk" &&
          (riwayatProduk.length > 0 ? (
            riwayatProduk.map((order) => (
              <div key={order.id_transaksi} className="order-card-rayo">
                <div className="order-card-header">
                  <span className="order-id">{order.id_transaksi}</span>
                  <span className="status-badge">{order.status}</span>
                </div>
                <div className="order-details-text">{order.items}</div>
                <div className="order-price-tag">
                  Rp {order.total.toLocaleString("id-ID")}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-history-box">
              <span className="empty-history-icon">📦</span>
              <h3 className="empty-history-title">
                Belum ada riwayat belanja produk
              </h3>
              <p
                style={{ fontFamily: "Quicksand, sans-serif", fontWeight: 600 }}
              >
                Yuk jelajahi katalog makanan dan mainan anabul!
              </p>
            </div>
          ))}

        {/* --- TAB CONTENT: LAYANAN --- */}
        {activeTab === "layanan" &&
          (bookingList.length > 0 ? (
            bookingList.map((bk) => (
              <div key={bk.id_booking} className="order-card-rayo">
                <div className="order-card-header">
                  <span className="order-id">{bk.id_booking}</span>
                  <span className="status-badge pending">
                    {bk.status_booking.toUpperCase()}
                  </span>
                </div>
                <div className="order-details-text">
                  {bk.icon} <strong>{bk.nama_layanan}</strong> (Tgl:{" "}
                  {bk.tanggal_mulai} s/d {bk.tanggal_selesai})
                </div>
                <div className="order-price-tag">
                  Rp {bk.harga.toLocaleString("id-ID")}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-history-box">
              <span className="empty-history-icon">📅</span>
              <h3 className="empty-history-title">Belum ada booking layanan</h3>
              <p
                style={{ fontFamily: "Quicksand, sans-serif", fontWeight: 600 }}
              >
                Manjakan anabulmu dengan booking grooming atau pet hotel
                sekarang!
              </p>
            </div>
          ))}

        {/* --- FOOTER RAYO BOX --- */}
        <footer className="footer-rayo-box">
          <div className="footer-grid">
            <div className="footer-brand">MEUW</div>

            <div>
              <div className="footer-col-title">Menu</div>
              <ul className="footer-col-list">
                <li>
                  <a href="#catalog">Catalog</a>
                </li>
                <li>
                  <a href="#services">Layanan</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
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
                Pantau riwayat transaksi & booking perawatan anabulmu secara
                real-time.
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

export default RiwayatPesanan;
