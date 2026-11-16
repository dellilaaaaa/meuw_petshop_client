import React from "react";
import logoImg from "../../images/logo.png";

const homeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700;800&display=swap');

  /* ============================================================
     ANIMASI & STYLES (NAVBAR ICON EMOJI RESTORED)
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
      transform: translateY(25px);
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
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
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

  /* --- NAVBAR --- */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    margin-bottom: 3.5rem;
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
    font-size: 1.15rem;
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

  /* --- HERO SPLIT LAYOUT --- */
  .hero-home-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
    align-items: center;
    margin-bottom: 5rem;
  }

  .hero-content-left {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-tag {
    display: inline-block;
    background-color: #FFFDF6;
    border: 2px solid #F7ADAD;
    color: #F7ADAD;
    font-size: 0.85rem;
    font-weight: 800;
    padding: 7px 20px;
    border-radius: 30px;
    margin-bottom: 1.4rem;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 4px 14px rgba(247, 173, 173, 0.2);
    animation: floatCute 3.5s infinite ease-in-out;
  }

  .hero-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.3rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 1.2rem;
    line-height: 1.15;
    letter-spacing: -0.01em;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .hero-subtitle {
    font-size: 1.08rem;
    color: #665959;
    margin-bottom: 2.2rem;
    line-height: 1.68;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    max-width: 490px;
  }

  .hero-cta-btn {
    display: inline-block;
    background-color: #4A3E3E;
    color: #FFFDF6;
    padding: 15px 36px;
    border-radius: 30px;
    font-size: 1.02rem;
    font-weight: 800;
    text-decoration: none;
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Quicksand', sans-serif;
    letter-spacing: 0.03em;
    box-shadow: 0 8px 22px rgba(74, 62, 62, 0.25);
  }

  .hero-cta-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-6px) scale(1.06);
    box-shadow: 0 14px 28px rgba(247, 173, 173, 0.5);
  }

  .hero-image-right {
    width: 100%;
    height: 390px;
    background: linear-gradient(135deg, #FFF 0%, #FDEAE8 100%);
    border: 3px solid #F7ADAD;
    border-radius: 42px 28px 46px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 16px 36px rgba(247, 173, 173, 0.22);
    position: relative;
    overflow: hidden;
  }

  .hero-big-logo {
    width: 140px;
    height: 140px;
    object-fit: contain;
    border-radius: 50%;
    background-color: #FFF;
    padding: 10px;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.3);
    animation: floatCute 3.5s infinite ease-in-out;
  }

  /* --- HIGHLIGHTS GRID --- */
  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
    margin-bottom: 5rem;
  }

  .highlight-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 32px 20px 32px 22px;
    padding: 1.6rem 1.4rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    box-shadow: 0 6px 22px rgba(247, 173, 173, 0.12);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .highlight-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 14px 30px rgba(247, 173, 173, 0.22);
  }

  .highlight-badge-num {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #B1E5E6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 800;
    color: #4A3E3E;
    font-family: 'Baloo 2', cursive, sans-serif;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(177, 229, 230, 0.45);
  }

  .highlight-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.15rem;
  }

  .highlight-desc {
    font-size: 0.83rem;
    color: #776E6E;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  /* --- SECTION HEADERS --- */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2.1rem;
    font-weight: 800;
    color: #4A3E3E;
  }

  .section-link {
    text-decoration: none;
    color: #776E6E;
    font-size: 0.9rem;
    font-weight: 800;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Quicksand', sans-serif;
    background: #FFF;
    border: 2px solid #F7ADAD;
    padding: 7px 18px;
    border-radius: 22px;
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.12);
  }

  .section-link:hover {
    color: #FFFDF6;
    background-color: #F7ADAD;
    transform: translateY(-3px) scale(1.05);
  }

  /* --- FEATURED PRODUCTS GRID --- */
  .featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.8rem;
    margin-bottom: 5.5rem;
  }

  .product-preview-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 22px 32px 24px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 8px 26px rgba(247, 173, 173, 0.14);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .product-preview-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 36px rgba(247, 173, 173, 0.28);
  }

  .preview-img-box {
    width: 100%;
    height: 195px;
    background-color: #FDEAE8;
    border: 2px solid #F7ADAD;
    border-radius: 26px 18px 28px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.1rem;
    overflow: hidden;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.15);
  }

  .preview-img-box img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  .preview-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.3rem;
  }

  .preview-price {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-weight: 800;
    color: #F7ADAD;
    font-size: 1.3rem;
    margin-bottom: 1.1rem;
  }

  .preview-action-btn {
    width: 100%;
    background-color: #4A3E3E;
    color: #FFFDF6;
    padding: 12px;
    border-radius: 22px;
    font-size: 0.9rem;
    font-weight: 800;
    text-align: center;
    text-decoration: none;
    display: block;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Quicksand', sans-serif;
    letter-spacing: 0.02em;
  }

  .preview-action-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: scale(1.04);
    box-shadow: 0 6px 16px rgba(247, 173, 173, 0.5);
  }

  /* --- LAYANAN UNGGULAN SECTION --- */
  .services-alternating-container {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    margin-bottom: 5.5rem;
  }

  .service-split-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    background: #FFFFFF;
    border: 2px solid #F7ADAD;
    border-radius: 38px 24px 40px 26px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(247, 173, 173, 0.14);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .service-split-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 38px rgba(247, 173, 173, 0.26);
  }

  .service-visual-box {
    width: 100%;
    height: 290px;
    border-radius: 30px 20px 32px 22px;
    border: 2px solid #F7ADAD;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.12);
  }

  .service-category-label {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #4A3E3E;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .service-content-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .service-home-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #F7ADAD;
    color: #FFFDF6;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 5px 16px;
    border-radius: 16px;
    font-family: 'Quicksand', sans-serif;
  }

  .service-home-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 0.8rem;
    line-height: 1.2;
  }

  .service-home-desc {
    font-size: 1rem;
    color: #665959;
    line-height: 1.65;
    margin-bottom: 1.5rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    max-width: 460px;
  }

  .service-home-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1.8rem;
  }

  .service-home-pills span {
    background-color: #FFFDF6;
    border: 1.5px solid #F7ADAD;
    font-size: 0.82rem;
    font-weight: 700;
    color: #554A4A;
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Quicksand', sans-serif;
  }

  .service-home-btn {
    display: inline-block;
    background-color: #4A3E3E;
    color: #FFFDF6;
    padding: 13px 32px;
    border-radius: 30px;
    font-size: 0.95rem;
    font-weight: 800;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Quicksand', sans-serif;
    letter-spacing: 0.02em;
    box-shadow: 0 6px 18px rgba(74, 62, 62, 0.2);
  }

  .service-home-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 10px 24px rgba(247, 173, 173, 0.5);
  }

  /* --- FOOTER EXPLICIT --- */
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

  @media (max-width: 900px) {
    .hero-home-split { grid-template-columns: 1fr; }
    .service-split-card { grid-template-columns: 1fr; gap: 1.8rem; padding: 1.8rem; }
    .service-split-card.reverse .service-visual-box { order: -1; }
    .highlights-grid, .featured-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
    .hero-title { font-size: 2.4rem; }
  }
`;

const Home = ({ cartCount = 0 }) => {
  const featuredProducts = [
    {
      id: 1,
      name: "Royal Canin Mother & Babycat 2kg",
      price: "Rp 285.000",
      image: logoImg,
    },
    {
      id: 2,
      name: "Shampoo Anti Kutu & Jamur 250ml",
      price: "Rp 45.000",
      image: logoImg,
    },
    {
      id: 3,
      name: "Creamy Treats Kucing (Isi 4)",
      price: "Rp 22.000",
      image: logoImg,
    },
  ];

  return (
    <>
      <style>{homeStyles}</style>

      {/* Lengkungan Pastel Pink di Atas Kanan */}
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
            <a href="#home" className="nav-menu-link active">
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

        {/* --- HERO SPLIT SECTION --- */}
        <header className="hero-home-split">
          <div className="hero-content-left">
            <span className="hero-tag">MEUW PETSHOP JAKARTA</span>
            <h1 className="hero-title">
              Pusat perawatan & kebutuhan anabul impian.
            </h1>
            <p className="hero-subtitle">
              Rumah kedua untuk anabul kesayanganmu. Dapatkan makanan
              bernutrisi, aksesoris lucu, dan layanan grooming profesional
              dengan standar terbaik.
            </p>
            <a href="#catalog" className="hero-cta-btn">
              BELANJA SEKARANG
            </a>
          </div>

          <div className="hero-image-right">
            <img src={logoImg} alt="MEUW Store" className="hero-big-logo" />
            <div
              style={{
                fontFamily: "Baloo 2, cursive",
                fontWeight: 700,
                color: "#F7ADAD",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
            >
              MEUW CARE & STORE
            </div>
          </div>
        </header>

        {/* --- HIGHLIGHT BAR --- */}
        <section className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-badge-num">01</div>
            <div>
              <div className="highlight-title">Pengiriman Cepat</div>
              <div className="highlight-desc">
                Amanah & langsung sampai tujuan
              </div>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-badge-num">02</div>
            <div>
              <div className="highlight-title">100% Produk Original</div>
              <div className="highlight-desc">
                Terjamin fresh & kualitas terbaik
              </div>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-badge-num">03</div>
            <div>
              <div className="highlight-title">Groomer Sertifikasi</div>
              <div className="highlight-desc">
                Penyayang & lembut pada anabul
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED PRODUCTS PREVIEW --- */}
        <section style={{ marginBottom: "5.5rem" }}>
          <div className="section-header">
            <h2 className="section-title">PRODUK TERFAVORIT</h2>
            <a href="#catalog" className="section-link">
              Lihat Semua Catalog
            </a>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((p) => (
              <div key={p.id} className="product-preview-card">
                <div className="preview-img-box">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="preview-title">{p.name}</div>
                <div className="preview-price">{p.price}</div>
                <a href="#catalog" className="preview-action-btn">
                  Lihat Produk
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* --- LAYANAN UNGGULAN SECTION --- */}
        <section style={{ marginBottom: "5.5rem" }}>
          <div className="section-header">
            <h2 className="section-title">LAYANAN UNGGULAN</h2>
            <a href="#services" className="section-link">
              Lihat Semua Layanan
            </a>
          </div>

          <div className="services-alternating-container">
            {/* ITEM 1: GROOMING */}
            <div className="service-split-card">
              <div
                className="service-visual-box"
                style={{ backgroundColor: "#FDEAE8" }}
              >
                <span className="service-home-tag">POPULER</span>
                <span className="service-category-label">GROOMING</span>
              </div>
              <div className="service-content-box">
                <h3 className="service-home-title">Grooming Anabul</h3>
                <p className="service-home-desc">
                  Mandi pembersihan anti-bakteri, potong styling bulu rapi, dan
                  pembersihan telinga & kuku.
                </p>
                <div className="service-home-pills">
                  <span>Shampoo Hypoallergenic</span>
                  <span>Mandi Sehat & Cut Styling</span>
                </div>
                <a href="#services" className="service-home-btn">
                  Booking Grooming
                </a>
              </div>
            </div>

            {/* ITEM 2: PENITIPAN VIP */}
            <div className="service-split-card reverse">
              <div className="service-content-box">
                <h3 className="service-home-title">
                  Penitipan VIP (Pet Hotel)
                </h3>
                <p className="service-home-desc">
                  Kamar AC tersterilkan, makan teratur, dan pengawasan penuh
                  kasih sayang saat kamu bepergian.
                </p>
                <div className="service-home-pills">
                  <span>Kamar AC Steril</span>
                  <span>Free Update Foto/Video</span>
                </div>
                <a href="#services" className="service-home-btn">
                  Reservasi Pet Hotel
                </a>
              </div>
              <div
                className="service-visual-box"
                style={{ backgroundColor: "#FEF7DF" }}
              >
                <span className="service-home-tag">BEST VALUE</span>
                <span className="service-category-label">PET HOTEL</span>
              </div>
            </div>

            {/* ITEM 3: PERAWATAN KESEHATAN */}
            <div className="service-split-card">
              <div
                className="service-visual-box"
                style={{ backgroundColor: "#E3F6F6" }}
              >
                <span className="service-home-tag">HEALTHCARE</span>
                <span className="service-category-label">HEALTHCARE</span>
              </div>
              <div className="service-content-box">
                <h3 className="service-home-title">Perawatan & Treatment</h3>
                <p className="service-home-desc">
                  Penanganan khusus kutu telinga (ear mites), jamur kulit, serta
                  layanan pet-car antar-jemput.
                </p>
                <div className="service-home-pills">
                  <span>Treatment Kutu & Jamur</span>
                  <span>Pet Taxi Antar-Jemput</span>
                </div>
                <a href="#services" className="service-home-btn">
                  Konsultasi & Book
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER EXPLICIT --- */}
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
                  <a href="#delivery">Delivery methods</a>
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
                Dapatkan info produk terbaru dan penawaran diskon khusus
                anabulmu.
              </p>
              <input
                type="text"
                placeholder="Masukkan email..."
                className="newsletter-input"
              />
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

export default Home;
