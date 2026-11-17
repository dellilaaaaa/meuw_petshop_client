import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.png";

const aboutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700;800&display=swap');

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
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

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

  .nav-logo-wrapper:hover { animation: wiggle 0.6s ease-in-out infinite; }

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

  .nav-actions { display: flex; align-items: center; gap: 0.8rem; }

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

  .hero-section { text-align: center; margin-bottom: 3.5rem; }

  .hero-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.3rem;
    font-weight: 800;
    color: #4A3E3E;
    letter-spacing: -0.5px;
    margin-bottom: 0.8rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .hero-subtitle {
    font-size: 1.05rem;
    color: #665959;
    max-width: 650px;
    margin: 0 auto;
    line-height: 1.65;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem; margin-bottom: 4rem; }

  .stat-card-rayo {
    background-color: #FFFFFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 22px 32px 24px;
    padding: 2.2rem 1.4rem;
    text-align: center;
    box-shadow: 0 8px 26px rgba(247, 173, 173, 0.14);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .stat-card-rayo:hover { transform: translateY(-8px) rotate(1.5deg); box-shadow: 0 16px 34px rgba(247, 173, 173, 0.25); }
  .stat-number { font-family: 'Baloo 2', cursive, sans-serif; font-size: 2.8rem; font-weight: 800; color: #F7ADAD; margin-bottom: 0.2rem; line-height: 1.1; }
  .stat-label { font-size: 0.92rem; font-weight: 800; color: #4A3E3E; font-family: 'Quicksand', sans-serif; }

  .content-section { display: grid; grid-template-columns: 1fr 1fr; gap: 2.2rem; margin-bottom: 4.5rem; }

  .card-about-rayo {
    background-color: #FFFFFF;
    border: 2px solid #F7ADAD;
    border-radius: 38px 24px 36px 24px;
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.12);
    transition: all 0.35s ease;
  }

  .card-about-rayo:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(247, 173, 173, 0.22); }

  .card-about-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.2rem;
    border-bottom: 2px dashed #F7ADAD;
    padding-bottom: 0.8rem;
  }

  .card-about-text {
    font-size: 0.95rem;
    color: #665959;
    line-height: 1.68;
    margin-bottom: 1.2rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .value-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }

  .value-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.92rem;
    font-weight: 700;
    color: #4A3E3E;
    font-family: 'Quicksand', sans-serif;
    transition: transform 0.25s ease;
  }

  .value-item:hover { transform: translateX(6px); }

  .value-icon {
    width: 42px;
    height: 42px;
    border-radius: 50% 40% 50% 42%;
    background-color: #B1E5E6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(177, 229, 230, 0.4);
    animation: floatCute 4s infinite ease-in-out;
  }

  .location-box-rayo {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 38px 26px 40px 28px;
    padding: 2.5rem;
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.2rem;
    align-items: center;
    box-shadow: 0 10px 30px rgba(247, 173, 173, 0.14);
    transition: all 0.35s ease;
  }

  .location-box-rayo:hover { transform: translateY(-5px); box-shadow: 0 16px 36px rgba(247, 173, 173, 0.24); }
  .location-info-title { font-family: 'Baloo 2', cursive, sans-serif; font-size: 1.8rem; font-weight: 800; color: #4A3E3E; margin-bottom: 1rem; }
  .location-detail { font-size: 0.95rem; color: #665959; line-height: 1.65; margin-bottom: 1.4rem; font-family: 'Quicksand', sans-serif; font-weight: 600; }
  .location-detail strong { color: #4A3E3E; font-weight: 800; }
  .contact-pill-list { display: flex; gap: 0.9rem; flex-wrap: wrap; }

  .contact-pill {
    background-color: #FFFDF6;
    border: 2px solid #F7ADAD;
    padding: 9px 18px;
    border-radius: 25px;
    font-size: 0.88rem;
    font-weight: 800;
    color: #4A3E3E;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.12);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .contact-pill:hover { transform: translateY(-3px) scale(1.05); background-color: #F7ADAD; color: #FFFDF6; }

  .map-placeholder-box {
    width: 100%;
    height: 210px;
    background: linear-gradient(135deg, #FFFDF6 0%, #FDEAE8 100%);
    border: 2px solid #F7ADAD;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #F7ADAD;
    font-weight: 800;
    font-size: 0.95rem;
    gap: 0.6rem;
    font-family: 'Baloo 2', cursive, sans-serif;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.12);
    transition: transform 0.35s ease;
  }

  .map-placeholder-box:hover { transform: scale(1.02); }

  .footer-rayo-box {
    background-color: #F7ADAD;
    color: #FFFDF6;
    border-radius: 42px 42px 34px 34px;
    padding: 4.2rem 3.5rem 2.4rem 3.5rem;
    box-shadow: 0 -10px 32px rgba(247, 173, 173, 0.25);
  }

  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 2.2fr; gap: 2rem; margin-bottom: 3.8rem; }

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

  .footer-brand:hover { animation: wiggle 0.6s ease-in-out; }
  .footer-col-title { font-family: 'Baloo 2', cursive, sans-serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 1.2rem; color: #FFFDF6; }
  .footer-col-list { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }

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

  .footer-col-list a:hover { opacity: 1; transform: translateX(6px); }
  .newsletter-desc { font-size: 0.88rem; opacity: 0.92; margin-bottom: 1.2rem; line-height: 1.5; font-family: 'Quicksand', sans-serif; font-weight: 600; }

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

  .newsletter-input:focus { border-bottom-color: #FFFDF6; }
  .newsletter-input::placeholder { color: rgba(255, 253, 246, 0.65); }

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
    .stats-grid, .content-section, .location-box-rayo { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const About = ({ cartCount = 0 }) => {
  return (
    <>
      <style>{aboutStyles}</style>

      <div className="bg-top-accent"></div>

      <div className="wrapper">
        <nav className="navbar">
          <Link to="/home" className="nav-logo-wrapper" title="MEUW PETSHOP">
            <img src={logoImg} alt="MEUW Petshop Logo" className="nav-logo-img" />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "1" }}>
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
            <Link to="/home" className="nav-menu-link">Home</Link>
            <Link to="/catalog" className="nav-menu-link">Catalog</Link>
            <Link to="/services" className="nav-menu-link">Layanan</Link>
            <Link to="/about" className="nav-menu-link active">About</Link>
            <Link to="/contact" className="nav-menu-link">Contact</Link>
          </div>

          <div className="nav-actions">
            <Link to="/riwayat" className="nav-icon-circle" title="Riwayat & Review">
              👤
            </Link>
            <Link to="/cart" className="nav-icon-circle" title="Keranjang Belanja">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>

        <section className="hero-section">
          <h1 className="hero-title">TENTANG MEUW PETSHOP 🐱✨</h1>
          <p className="hero-subtitle">
            Rumah kedua bagi anabul kesayanganmu. Kami hadir dengan komitmen memberikan perawatan terbaik, produk berkualitas tinggi, dan kenyamanan sepenuh hati.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card-rayo">
            <div className="stat-number">5.000+</div>
            <div className="stat-label">Anabul Happy 🐾</div>
          </div>
          <div className="stat-card-rayo">
            <div className="stat-number">100%</div>
            <div className="stat-label">Produk Original & Fresh 🥩</div>
          </div>
          <div className="stat-card-rayo">
            <div className="stat-number">4.9 ★</div>
            <div className="stat-label">Rating Kepuasan Pelanggan ⭐</div>
          </div>
        </section>

        <section className="content-section">
          <div className="card-about-rayo">
            <h3 className="card-about-title">Cerita Kami 📖</h3>
            <p className="card-about-text">
              Didirikan dengan kecintaan mendalam terhadap hewan peliharaan,{" "}
              <strong>MEUW PETSHOP</strong> tumbuh dari petshop lokal menjadi pusat perawatan anabul terpercaya. Kami percaya bahwa setiap kucing, anjing, dan anabul lainnya berhak mendapatkan perawatan yang lembut, makanan bernutrisi, dan perlengkapan terbaik.
            </p>
            <p className="card-about-text">
              Semua produk di katalog kami telah dikurasi secara ketat dan layanan grooming dipandu oleh profesional yang bersertifikat.
            </p>
          </div>

          <div className="card-about-rayo">
            <h3 className="card-about-title">Komitmen Utama Kami 💖</h3>
            <ul className="value-list">
              <li className="value-item">
                <div className="value-icon">🧼</div>
                <span>Fasilitas & Peralatan Selalu Steril</span>
              </li>
              <li className="value-item">
                <div className="value-icon">🌸</div>
                <span>Shampoo Hypoallergenic Aman untuk Kulit Sensitif</span>
              </li>
              <li className="value-item">
                <div className="value-icon">🚚</div>
                <span>Pengiriman Produk Cepat & Amanah</span>
              </li>
              <li className="value-item">
                <div className="value-icon">👩‍⚕️</div>
                <span>Groomer Berpengalaman & Penyayang Hewan</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="location-box-rayo">
          <div>
            <h3 className="location-info-title">Kunjungi Toko Kami 📍</h3>
            <p className="location-detail">
              Jl. Anabul Ceria No. 88, Karet Kuningan, Setiabudi, Jakarta Selatan.
              <br />
              <strong>Buka Setiap Hari:</strong> 08.00 - 20.00 WIB
            </p>

            <div className="contact-pill-list">
              <div className="contact-pill">
                <span>📞</span>
                <span>+62 812-3456-7890</span>
              </div>
              <div className="contact-pill">
                <span>💬</span>
                <span>WhatsApp Admin</span>
              </div>
            </div>
          </div>

          <div className="map-placeholder-box">
            <span style={{ fontSize: "2.5rem" }}>🗺️</span>
            <span>MEUW PETSHOP STORE LOCATION</span>
          </div>
        </section>

        <footer className="footer-rayo-box">
          <div className="footer-grid">
            <div className="footer-brand">MEUW</div>

            <div>
              <div className="footer-col-title">Menu</div>
              <ul className="footer-col-list">
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/services">Layanan</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Shipping</div>
              <ul className="footer-col-list">
                <li><Link to="/riwayat">Delivery methods</Link></li>
                <li><Link to="/riwayat">Time & cost</Link></li>
                <li><Link to="/riwayat">Order tracking</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Social</div>
              <ul className="footer-col-list">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">More love. More MEUW.</div>
              <p className="newsletter-desc">
                Dapatkan info terbaru mengenai layanan & promo spesial untuk anabulmu.
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

export default About;