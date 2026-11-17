import React from "react";
import logoImg from "../images/logo.png";

const Navbar = ({ activePage = "home", cartCount = 0 }) => {
  return (
    <nav className="navbar">
      {/* --- LOGO BRAND --- */}
      <a
        href="#home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
        title="MEUW PETSHOP"
      >
        <img
          src={logoImg}
          alt="MEUW Petshop Logo"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "contain",
            borderRadius: "50%",
            boxShadow: "0 4px 14px rgba(247, 173, 173, 0.4)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.1",
          }}
        >
          <span
            style={{
              fontFamily: "'Baloo 2', cursive, sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#4A3E3E",
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

      {/* --- MENU PILL --- */}
      <div className="nav-menu-pill">
        <a
          href="#home"
          className={`nav-menu-link ${activePage === "home" ? "active" : ""}`}
        >
          Home
        </a>
        <a
          href="#catalog"
          className={`nav-menu-link ${activePage === "catalog" ? "active" : ""}`}
        >
          Catalog
        </a>
        <a
          href="#services"
          className={`nav-menu-link ${activePage === "services" ? "active" : ""}`}
        >
          Layanan
        </a>
        <a
          href="#about"
          className={`nav-menu-link ${activePage === "about" ? "active" : ""}`}
        >
          About
        </a>
        <a
          href="#contact"
          className={`nav-menu-link ${activePage === "contact" ? "active" : ""}`}
        >
          Contact
        </a>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="nav-actions">
        <a
          href="#riwayat"
          className={`nav-icon-circle ${activePage === "riwayat" ? "active" : ""}`}
          title="Riwayat & Review"
        >
          👤
        </a>
        <a
          href="#cart"
          className={`nav-icon-circle ${activePage === "cart" ? "active" : ""}`}
          title="Keranjang Belanja"
        >
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
