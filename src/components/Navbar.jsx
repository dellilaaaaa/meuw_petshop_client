import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/logo.png";

const Navbar = ({ activePage = "home", cartCount = 0 }) => {
  return (
    <nav className="navbar">
      {/* --- LOGO BRAND --- */}
      <Link
        to="/home"
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
      </Link>

      {/* --- MENU PILL --- */}
      <div className="nav-menu-pill">
        <Link
          to="/home"
          className={`nav-menu-link ${activePage === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/catalog"
          className={`nav-menu-link ${activePage === "catalog" ? "active" : ""}`}
        >
          Catalog
        </Link>
        <Link
          to="/services"
          className={`nav-menu-link ${activePage === "services" ? "active" : ""}`}
        >
          Layanan
        </Link>
        <Link
          to="/about"
          className={`nav-menu-link ${activePage === "about" ? "active" : ""}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`nav-menu-link ${activePage === "contact" ? "active" : ""}`}
        >
          Contact
        </Link>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="nav-actions">
        <Link
          to="/riwayat"
          className={`nav-icon-circle ${activePage === "riwayat" ? "active" : ""}`}
          title="Riwayat & Review"
        >
          👤
        </Link>
        <Link
          to="/cart"
          className={`nav-icon-circle ${activePage === "cart" ? "active" : ""}`}
          title="Keranjang Belanja"
        >
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;