import React, { useState } from "react";
import logoImg from "../../images/logo.png";

const contactStyles = `
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

  /* --- HERO TITLE & BADGE --- */
  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
  }

  .badge-pill-center {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    padding: 8px 22px;
    border-radius: 25px;
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.2rem;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.15);
    animation: floatCute 4s infinite ease-in-out;
  }

  .hero-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #4A3E3E;
    letter-spacing: -0.5px;
    margin-bottom: 0.6rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .hero-subtitle {
    font-size: 1.02rem;
    color: #665959;
    max-width: 620px;
    margin: 0 auto;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  /* --- 4 CONTACT INFO CARDS GRID --- */
  .contact-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
    margin-bottom: 4rem;
  }

  .info-card-item {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 24px 34px 22px;
    padding: 2.2rem 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 8px 26px rgba(247, 173, 173, 0.12);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .info-card-item:hover {
    transform: translateY(-6px) rotate(1deg);
    box-shadow: 0 16px 34px rgba(247, 173, 173, 0.22);
  }

  .info-icon-box {
    width: 60px;
    height: 60px;
    border-radius: 50% 40% 50% 42%;
    background-color: #FFFDF6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.15);
    animation: floatCute 3.5s infinite ease-in-out;
  }

  .info-card-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 0.4rem;
  }

  .info-card-text {
    font-size: 0.92rem;
    color: #665959;
    line-height: 1.55;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  /* --- SECTION PESAN & PETA --- */
  .interactive-contact-section {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.2rem;
    margin-bottom: 5rem;
  }

  .message-form-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 38px 24px 36px 24px;
    padding: 2.4rem;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.14);
  }

  .form-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.2rem;
    border-bottom: 2px dashed #F7ADAD;
    padding-bottom: 0.6rem;
  }

  .form-group {
    margin-bottom: 1.1rem;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 800;
    color: #555959;
    margin-bottom: 0.4rem;
    font-family: 'Quicksand', sans-serif;
  }

  .form-input, .form-textarea {
    width: 100%;
    padding: 12px 18px;
    border: 2px solid #F7ADAD;
    border-radius: 20px;
    background: #FFFDF6;
    outline: none;
    font-size: 0.9rem;
    color: #333;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .form-textarea {
    resize: none;
    height: 110px;
  }

  .form-input:focus, .form-textarea:focus {
    box-shadow: 0 4px 14px rgba(247, 173, 173, 0.25);
    background-color: #FFF;
  }

  .btn-submit-contact {
    width: 100%;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    padding: 14px;
    border-radius: 25px;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 6px 18px rgba(74, 62, 62, 0.2);
  }

  .btn-submit-contact:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 24px rgba(247, 173, 173, 0.4);
  }

  /* --- MAP PREVIEW BOX --- */
  .map-box-container {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 38px 26px 38px 26px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.12);
  }

  .map-placeholder {
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #FFFDF6 0%, #FDEAE8 100%);
    border: 2px solid #F7ADAD;
    border-radius: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #F7ADAD;
    gap: 0.6rem;
    font-family: 'Baloo 2', cursive, sans-serif;
    font-weight: 800;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.12);
  }

  .wa-quick-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: #25D366;
    color: #FFF;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 13px;
    border-radius: 25px;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    margin-top: 1rem;
  }

  .wa-quick-btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 10px 24px rgba(37, 211, 102, 0.5);
  }

  /* --- FOOTER EXPLICIT ORGANIK --- */
  .footer-rayo-box {
    background-color: #F7ADAD;
    color: #FFFDF6;
    border-radius: 42px 42px 34px 34px;
    padding: 4.2rem 3.5rem 2.4rem 3.5rem;
    box-shadow: 0 -10px 32px rgba(247, 173, 173, 0.25);
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
    .contact-info-grid { grid-template-columns: 1fr; }
    .interactive-contact-section { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const Contact = ({ cartCount = 0 }) => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleSubmitPesan = (e) => {
    e.preventDefault();
    alert(
      `💖 Terima kasih ${formData.nama}!\n\nPesan kamu telah terkirim. Tim MEUW Petshop akan membalas ke email (${formData.email}) sesegera mungkin! 🐾`,
    );
    setFormData({ nama: "", email: "", pesan: "" });
  };

  return (
    <>
      <style>{contactStyles}</style>

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
            <a href="#contact" className="nav-menu-link active">
              Contact
            </a>
          </div>

          <div className="nav-actions">
            <a
              href="#riwayat"
              className="nav-icon-circle"
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
        <section className="hero-section">
          <div className="badge-pill-center">
            <span>KONTAK</span>
            <span>🐾</span>
          </div>
          <h1 className="hero-title">HUBUNGI KAMI 📞</h1>
          <p className="hero-subtitle">
            Untuk informasi lebih lanjut, bantuan produk, atau booking layanan
            grooming, hubungi kami:
          </p>
        </section>

        {/* --- 4 CONTACT INFO CARDS GRID --- */}
        <section className="contact-info-grid">
          {/* CARD 1: ALAMAT */}
          <div className="info-card-item">
            <div className="info-icon-box">📍</div>
            <h3 className="info-card-title">Alamat</h3>
            <p className="info-card-text">
              Jl. Anabul Ceria No. 88, RT.001/RW.003, Karet Kuningan, Kec.
              Setiabudi, Jakarta Selatan, DKI Jakarta 12940
            </p>
          </div>

          {/* CARD 2: TELEPON */}
          <div className="info-card-item">
            <div className="info-icon-box">📞</div>
            <h3 className="info-card-title">Telepon</h3>
            <p className="info-card-text">
              085157449090
              <br />
              +62 812-3456-7890 (WA Admin)
            </p>
          </div>

          {/* CARD 3: EMAIL */}
          <div className="info-card-item">
            <div className="info-icon-box">✉️</div>
            <h3 className="info-card-title">Email</h3>
            <p className="info-card-text">
              hello@meuwpetshop.id
              <br />
              support@meuwpetshop.id
            </p>
          </div>

          {/* CARD 4: JAM KERJA */}
          <div className="info-card-item">
            <div className="info-icon-box">⏰</div>
            <h3 className="info-card-title">Jam Kerja</h3>
            <p className="info-card-text">
              <strong>Senin - Jumat:</strong> 09.00 - 17.00 WIB
              <br />
              <strong>Sabtu - Minggu:</strong> 08.00 - 20.00 WIB
            </p>
          </div>
        </section>

        {/* --- SECTION FORM PESAN & PREVIEW LOKASI --- */}
        <section className="interactive-contact-section">
          {/* FORM PESAN */}
          <div className="message-form-card">
            <h3 className="form-title">Kirim Pesan Cepat 💌</h3>
            <form onSubmit={handleSubmitPesan}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama kamu..."
                  className="form-input"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email Kamu</label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Pesan / Pertanyaan</label>
                <textarea
                  required
                  placeholder="Tuliskan pertanyaan seputar produk atau grooming..."
                  className="form-textarea"
                  value={formData.pesan}
                  onChange={(e) =>
                    setFormData({ ...formData, pesan: e.target.value })
                  }
                ></textarea>
              </div>

              <button type="submit" className="btn-submit-contact">
                KIRIM PESAN SEKARANG 💖
              </button>
            </form>
          </div>

          {/* PREVIEW MAPS & WA QUICK CHAT */}
          <div className="map-box-container">
            <div>
              <h3 className="form-title">Lokasi Toko MEUW 🗺️</h3>
              <div className="map-placeholder">
                <span style={{ fontSize: "2.8rem" }}>📍</span>
                <span>MEUW PETSHOP STORE</span>
                <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                  Jakarta Selatan, Indonesia
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-quick-btn"
            >
              <span>💬</span> Chat Direct via WhatsApp
            </a>
          </div>
        </section>

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
                Hubungi kami kapan saja untuk kebutuhan nutrisi & perawatan
                terbaik anabulmu.
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

export default Contact;
