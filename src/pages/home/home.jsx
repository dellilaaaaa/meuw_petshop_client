import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.png";
import heroPetImg from "../../images/hero-pet.jpg";

const API_BASE_URL = "https://meuw-petshop-server.vercel.app";
const API_CATALOG_URL = `${API_BASE_URL}/api/catalog`;
const API_LAYANAN_URL = `${API_BASE_URL}/api/layanan`;
const CACHE_KEY = "meuw_catalog_cache_v2";
const CACHE_LAYANAN_KEY = "meuw_layanan_cache_v1";
const PASTEL_COLORS = ["#FDEAE8", "#FEF7DF", "#E3F6F6"];

const homeStyles = `
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
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmerPulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 1; }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

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

  .skeleton-card {
    animation: shimmerPulse 1.4s infinite ease-in-out;
  }

  .skeleton-box {
    background-color: #FDEAE8;
    border-radius: 16px;
  }

  .preview-img-box {
    width: 100%;
    height: 195px;
    border: 2px solid #F7ADAD;
    border-radius: 26px 18px 28px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.1rem;
    overflow: hidden;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.15);
  }

  .preview-img-box img { max-width: 85%; max-height: 85%; object-fit: contain; border-radius: 14px; }

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
    overflow: hidden;
    padding: 1.5rem;
    box-shadow: inset 0 2px 10px rgba(247, 173, 173, 0.12);
  }

  .service-visual-img {
    max-width: 82%;
    max-height: 82%;
    object-fit: contain;
    border-radius: 18px;
    transition: transform 0.35s ease;
  }

  .service-split-card:hover .service-visual-img {
    transform: scale(1.06);
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
    z-index: 2;
  }

  .service-home-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2.1rem;
    font-weight: 800;
    color: #4A3E3E;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .service-home-price {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.35rem;
    font-weight: 800;
    color: #F7ADAD;
    margin-bottom: 0.8rem;
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

  .footer-rayo-box {
    background-color: #F7ADAD;
    color: #FFFDF6;
    border-radius: 32px 32px 26px 26px;
    padding: 2.8rem 3rem 1.8rem 3rem;
    box-shadow: 0 -10px 32px rgba(247, 173, 173, 0.25);
    text-align: left;
    margin-top: 4rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2.2fr;
    gap: 1.8rem;
    margin-bottom: 2.4rem;
    align-items: start;
    text-align: left;
  }

  .footer-brand {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2.8rem;
    font-weight: 800;
    color: #FFFDF6;
    line-height: 1;
    display: inline-block;
  }

  .footer-brand:hover { animation: wiggle 0.6s ease-in-out; }

  .footer-col-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 1rem;
    color: #FFFDF6;
  }

  .footer-col-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
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

  .footer-col-list a:hover { opacity: 1; transform: translateX(6px); }

  .newsletter-desc {
    font-size: 0.88rem;
    opacity: 0.92;
    margin-bottom: 1rem;
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

  .newsletter-input:focus { border-bottom-color: #FFFDF6; }
  .newsletter-input::placeholder { color: rgba(255, 253, 246, 0.65); }

  .footer-bottom-bar {
    border-top: 1.5px solid rgba(255, 253, 246, 0.35);
    padding-top: 1.5rem;
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

const formatRawProducts = (rawProducts) =>
  rawProducts.map((item, index) => {
    const kategoriNama =
      typeof item.id_kategori === "object" && item.id_kategori !== null
        ? item.id_kategori.nama_kategori
        : item.nama_kategori || "Produk MEUW";

    const productId =
      item.id_barang !== undefined && item.id_barang !== null
        ? item.id_barang
        : item._id || index + 1;
    const encodedLabel = encodeURIComponent(kategoriNama);

    return {
      id_barang: productId,
      nama_barang: item.nama_barang || "Produk Tanpa Nama",
      harga: Number(item.harga || 0),
      bgColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
      gambar:
        typeof item.foto === "string" && item.foto.trim() !== ""
          ? item.foto.startsWith("http")
            ? item.foto
            : `${API_BASE_URL}${item.foto.startsWith("/") ? "" : "/"}${item.foto}`
          : `https://placehold.co/240x240/F7ADAD/FFFDF6?text=${encodedLabel}`,
      fallbackGambar: `https://placehold.co/240x240/F7ADAD/FFFDF6?text=${encodedLabel}`,
    };
  });

const formatLayananHome = (rawList) =>
  rawList.map((item, index) => {
    const nama = item.nama_layanan || "Layanan MEUW";
    const lower = nama.toLowerCase();

    let tag = "HEALTHCARE";
    let label = "HEALTHCARE";
    let badge1 = "Perawatan Profesional";
    let badge2 = "Peralatan Steril";

    if (
      lower.includes("grooming") ||
      lower.includes("mandi") ||
      lower.includes("cut")
    ) {
      tag = "POPULER";
      label = "GROOMING";
      badge1 = "Shampoo Hypoallergenic";
      badge2 = "Mandi Sehat & Cut Styling";
    } else if (
      lower.includes("hotel") ||
      lower.includes("penitipan") ||
      lower.includes("vip")
    ) {
      tag = "BEST VALUE";
      label = "PET HOTEL";
      badge1 = "Kamar AC Steril";
      badge2 = "Free Update Foto/Video";
    } else if (
      lower.includes("antar") ||
      lower.includes("jemput") ||
      lower.includes("taxi")
    ) {
      tag = "EXTRA CARE";
      label = "PET TAXI";
      badge1 = "Armada Nyaman & Aman";
      badge2 = "Antar-Jemput Tepat Waktu";
    } else if (
      lower.includes("kutu") ||
      lower.includes("jamur") ||
      lower.includes("treatment")
    ) {
      tag = "HEALTHCARE";
      label = "TREATMENT";
      badge1 = "Treatment Kutu & Jamur";
      badge2 = "Penanganan Lembut";
    }

    let fotoUrl = "";
    if (typeof item.foto === "string" && item.foto.trim() !== "") {
      if (/^https?:\/\//i.test(item.foto)) {
        fotoUrl = item.foto;
      } else {
        const normalized = item.foto.replace(/\\/g, "/");
        const uploadIdx = normalized.toLowerCase().lastIndexOf("/uploads/");
        fotoUrl =
          uploadIdx !== -1
            ? `${API_BASE_URL}${normalized.substring(uploadIdx)}`
            : `${API_BASE_URL}/uploads/layanan/${normalized.split("/").pop()}`;
      }
    }

    return {
      id_layanan: item.id_layanan || item._id || String(index + 1),
      nama_layanan: nama,
      harga: Number(item.harga || 0),
      deskripsi:
        item.deskripsi ||
        "Layanan perawatan terbaik untuk anabul kesayanganmu.",
      foto: fotoUrl,
      tag,
      label,
      badge1,
      badge2,
      bgColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
    };
  });

const Home = ({ cartCount = 0 }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [featuredServices, setFeaturedServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeaturedProducts(formatRawProducts(parsed).slice(0, 3));
          setLoadingProducts(false);
        }
      } catch (e) {
        console.error("Cache parse error:", e);
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(API_CATALOG_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const rawProducts = Array.isArray(result.data) ? result.data : [];

        if (rawProducts.length > 0) {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(rawProducts));
          setFeaturedProducts(formatRawProducts(rawProducts).slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal mengambil produk dari database:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const cachedLayanan = sessionStorage.getItem(CACHE_LAYANAN_KEY);
    if (cachedLayanan) {
      try {
        const parsedLayanan = JSON.parse(cachedLayanan);
        if (Array.isArray(parsedLayanan) && parsedLayanan.length > 0) {
          setFeaturedServices(formatLayananHome(parsedLayanan).slice(0, 3));
          setLoadingServices(false);
        }
      } catch (e) {
        console.error("Cache layanan parse error:", e);
      }
    }

    const fetchServices = async () => {
      try {
        const response = await fetch(API_LAYANAN_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const rawServices = Array.isArray(result.data) ? result.data : [];

        if (rawServices.length > 0) {
          sessionStorage.setItem(
            CACHE_LAYANAN_KEY,
            JSON.stringify(rawServices),
          );
          setFeaturedServices(formatLayananHome(rawServices).slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal mengambil layanan dari database:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchProducts();
    fetchServices();
  }, []);

  return (
    <>
      <style>{homeStyles}</style>

      <div className="bg-top-accent"></div>

      <div className="wrapper">
        {/* --- NAVBAR --- */}
        <nav className="navbar">
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
            <Link to="/home" className="nav-menu-link active">
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
              title="Akun & Riwayat"
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
            <Link to="/catalog" className="hero-cta-btn">
              BELANJA SEKARANG
            </Link>
          </div>

          <div className="hero-image-right">
            <img
              src={heroPetImg}
              alt="MEUW Petshop Anabul"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
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
            <Link to="/catalog" className="section-link">
              Lihat Semua Catalog
            </Link>
          </div>

          {loadingProducts ? (
            <div className="featured-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="product-preview-card skeleton-card">
                  <div className="preview-img-box skeleton-box"></div>
                  <div
                    className="skeleton-box"
                    style={{
                      height: "24px",
                      width: "75%",
                      marginBottom: "0.6rem",
                    }}
                  ></div>
                  <div
                    className="skeleton-box"
                    style={{
                      height: "22px",
                      width: "45%",
                      marginBottom: "1.1rem",
                    }}
                  ></div>
                  <div
                    className="skeleton-box"
                    style={{ height: "42px", width: "100%" }}
                  ></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="featured-grid">
              {featuredProducts.map((p) => (
                <div key={p.id_barang} className="product-preview-card">
                  <div
                    className="preview-img-box"
                    style={{ backgroundColor: p.bgColor }}
                  >
                    <img
                      src={p.gambar}
                      alt={p.nama_barang}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = p.fallbackGambar;
                      }}
                    />
                  </div>
                  <div className="preview-title">{p.nama_barang}</div>
                  <div className="preview-price">
                    Rp {p.harga.toLocaleString("id-ID")}
                  </div>
                  <Link
                    to="/catalog"
                    state={{ selectedProductId: p.id_barang }}
                    className="preview-action-btn"
                  >
                    Lihat Produk
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{ textAlign: "center", fontWeight: 700, color: "#665959" }}
            >
              Belum ada produk tersedia saat ini.
            </p>
          )}
        </section>

        {/* --- LAYANAN UNGGULAN SECTION (DARI DATABASE /api/layanan) --- */}
        <section style={{ marginBottom: "5.5rem" }}>
          <div className="section-header">
            <h2 className="section-title">LAYANAN UNGGULAN</h2>
            <Link to="/services" className="section-link">
              Lihat Semua Layanan
            </Link>
          </div>

          {loadingServices ? (
            <div className="services-alternating-container">
              {[1, 2].map((n) => (
                <div key={n} className="service-split-card skeleton-card">
                  <div className="service-visual-box skeleton-box"></div>
                  <div
                    className="service-content-box"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="skeleton-box"
                      style={{
                        height: "32px",
                        width: "60%",
                        marginBottom: "1rem",
                      }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{
                        height: "64px",
                        width: "90%",
                        marginBottom: "1.5rem",
                      }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{ height: "44px", width: "190px" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="services-alternating-container">
              {featuredServices.map((srv, idx) => {
                const isReverse = idx % 2 === 1;

                const visualBox = (
                  <div
                    className="service-visual-box"
                    style={{ backgroundColor: srv.bgColor }}
                  >
                    <span className="service-home-tag">{srv.tag}</span>
                    {srv.foto ? (
                      <img
                        src={srv.foto}
                        alt={srv.nama_layanan}
                        className="service-visual-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="service-category-label">
                        {srv.label}
                      </span>
                    )}
                  </div>
                );

                const contentBox = (
                  <div className="service-content-box">
                    <h3 className="service-home-title">{srv.nama_layanan}</h3>
                    <div className="service-home-price">
                      Rp {srv.harga.toLocaleString("id-ID")}
                    </div>
                    <p className="service-home-desc">{srv.deskripsi}</p>
                    <div className="service-home-pills">
                      <span>{srv.badge1}</span>
                      <span>{srv.badge2}</span>
                    </div>
                    <Link to="/services" className="service-home-btn">
                      Booking Layanan
                    </Link>
                  </div>
                );

                return (
                  <div
                    key={srv.id_layanan}
                    className={`service-split-card ${isReverse ? "reverse" : ""}`}
                  >
                    {isReverse ? (
                      <>
                        {contentBox}
                        {visualBox}
                      </>
                    ) : (
                      <>
                        {visualBox}
                        {contentBox}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p
              style={{ textAlign: "center", fontWeight: 700, color: "#665959" }}
            >
              Belum ada layanan tersedia saat ini.
            </p>
          )}
        </section>

        {/* --- FOOTER EXPLICIT --- */}
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
                  <Link to="/riwayat">Delivery methods</Link>
                </li>
                <li>
                  <Link to="/riwayat">Time & cost</Link>
                </li>
                <li>
                  <Link to="/riwayat">Order tracking</Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Social</div>
              <ul className="footer-col-list">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
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
