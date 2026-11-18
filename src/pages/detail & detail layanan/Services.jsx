import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";

const API_BASE_URL = "https://meuw-petshop-server.vercel.app";
const API_LAYANAN_URL = `${API_BASE_URL}/api/layanan`;
const CACHE_LAYANAN_KEY = "meuw_layanan_cache_v1";

const PASTEL_COLORS = ["#FDEAE8", "#E3F6F6", "#FEEAE1", "#FEF7DF", "#E8F4FE"];

const servicesStyles = `
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

  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.85) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
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

  .hero-section { text-align: center; margin-bottom: 2.2rem; }

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
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .benefit-pill-bar {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .benefit-pill-item {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    padding: 10px 22px;
    border-radius: 25px;
    font-size: 0.88rem;
    font-weight: 800;
    color: #4A3E3E;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.12);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: floatCute 4s infinite ease-in-out;
  }

  .benefit-pill-item:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 22px rgba(247, 173, 173, 0.25);
    border-color: #F7ADAD;
  }

  .info-boxes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
    margin-bottom: 3.5rem;
  }

  .info-card-rayo {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 24px 36px 24px;
    padding: 2rem;
    box-shadow: 0 8px 26px rgba(247, 173, 173, 0.14);
    transition: all 0.35s ease;
  }

  .info-card-rayo:hover { transform: translateY(-5px); box-shadow: 0 14px 32px rgba(247, 173, 173, 0.22); }

  .info-card-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #F7ADAD;
    margin-bottom: 1.2rem;
    text-align: center;
  }

  .schedule-list {
    list-style: none;
    font-size: 0.9rem;
    color: #555959;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .schedule-list li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1.5px dashed #FFEBEB;
    padding: 8px 0;
  }

  .schedule-list strong { color: #4A3E3E; font-weight: 800; }

  .terms-list {
    font-size: 0.88rem;
    color: #665959;
    padding-left: 1.3rem;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .terms-list li { margin-bottom: 0.6rem; }

  .filter-sort-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .categories-chips { display: flex; gap: 0.6rem; flex-wrap: wrap; }

  .chip-btn {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    color: #665959;
    padding: 8px 20px;
    border-radius: 25px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.1);
  }

  .chip-btn.active, .chip-btn:hover {
    background-color: #F7ADAD;
    color: #FFFDF6;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 16px rgba(247, 173, 173, 0.3);
  }

  .services-grid-rayo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.2rem 1.8rem;
    margin-bottom: 5rem;
  }

  .card-rayo { display: flex; flex-direction: column; }

  .card-image-box {
    position: relative;
    width: 100%;
    height: 250px;
    border-radius: 36px 22px 32px 24px;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.14);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-rayo:hover .card-image-box {
    transform: translateY(-8px) rotate(1.5deg);
    box-shadow: 0 16px 34px rgba(247, 173, 173, 0.25);
  }

  .card-tag-pill {
    position: absolute;
    top: 14px;
    left: 14px;
    background-color: #F7ADAD;
    color: #FFFDF6;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 2;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 3px 8px rgba(247, 173, 173, 0.2);
    animation: floatCute 3.5s infinite ease-in-out;
  }

  .service-icon-display {
    font-size: 4.8rem;
    animation: floatCute 3.5s infinite ease-in-out;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .service-img-display {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
    border-radius: 16px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-rayo:hover .service-icon-display,
  .card-rayo:hover .service-img-display { transform: scale(1.12) rotate(-3deg); }

  .card-details { padding: 0 0.3rem; }
  .card-title-block { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 0.4rem; }

  .card-service-name {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
    line-height: 1.25;
    margin-bottom: 0.25rem;
  }

  .card-service-price { font-family: 'Baloo 2', cursive, sans-serif; font-size: 1.3rem; font-weight: 800; color: #F7ADAD; }

  .card-bottom-row { display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem; gap: 0.8rem; }

  .card-service-desc {
    font-size: 0.82rem;
    color: #665959;
    line-height: 1.4;
    flex: 1;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .card-book-btn {
    padding: 8px 16px;
    border-radius: 20px;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(74, 62, 62, 0.18);
  }

  .card-book-btn:hover {
    transform: translateY(-3px) scale(1.06);
    background-color: #F7ADAD;
    color: #FFF;
    box-shadow: 0 6px 16px rgba(247, 173, 173, 0.4);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(74, 62, 62, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background-color: #FFFDF6;
    border: 3px solid #F7ADAD;
    border-radius: 36px;
    padding: 2.2rem;
    width: 90%;
    max-width: 480px;
    position: relative;
    box-shadow: 0 16px 40px rgba(247, 173, 173, 0.35);
    animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .modal-close {
    position: absolute;
    top: 18px;
    right: 22px;
    background: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: #F7ADAD;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.25s ease;
  }

  .modal-close:hover { transform: rotate(90deg) scale(1.1); background-color: #F7ADAD; color: #FFF; }
  .modal-title { font-family: 'Baloo 2', cursive, sans-serif; font-size: 1.6rem; color: #4A3E3E; font-weight: 800; margin-bottom: 0.3rem; }
  .form-group { margin-bottom: 1.1rem; text-align: left; }

  .form-group label {
    display: block;
    font-size: 0.82rem;
    font-weight: 800;
    color: #555959;
    margin-bottom: 0.4rem;
    font-family: 'Quicksand', sans-serif;
  }

  .form-input {
    width: 100%;
    padding: 11px 16px;
    border: 2px solid #F7ADAD;
    border-radius: 20px;
    background: #FFF;
    outline: none;
    font-size: 0.9rem;
    color: #333;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .form-input:focus { box-shadow: 0 4px 14px rgba(247, 173, 173, 0.25); }
  .form-row { display: flex; gap: 0.9rem; }

  .btn-submit {
    width: 100%;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    padding: 14px;
    border-radius: 25px;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    margin-top: 0.6rem;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 6px 18px rgba(74, 62, 62, 0.2);
  }

  .btn-submit:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(247, 173, 173, 0.5);
  }

  .btn-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

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

  .no-services {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3.5rem;
    color: #665959;
    font-weight: 700;
    font-size: 1rem;
  }

  @media (max-width: 950px) {
    .services-grid-rayo { grid-template-columns: repeat(2, 1fr); }
    .info-boxes-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 600px) {
    .services-grid-rayo { grid-template-columns: 1fr; }
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

// Helper untuk mendeteksi kategori, icon, dan URL foto layanan dari database
const formatLayananData = (rawList) => {
  return rawList.map((item, index) => {
    const nama = item.nama_layanan || "Layanan MEUW";
    const lower = nama.toLowerCase();

    let category = "Perawatan";
    let icon = "🐾";
    let tag = "HEALTHCARE";

    if (lower.includes("grooming") || lower.includes("mandi") || lower.includes("cut")) {
      category = "Grooming";
      icon = lower.includes("cut") || lower.includes("styling") ? "✂️" : "🧼";
      tag = "POPULER";
    } else if (lower.includes("hotel") || lower.includes("penitipan") || lower.includes("vip")) {
      category = "Penitipan";
      icon = "🏡";
      tag = "BEST VALUE";
    } else if (lower.includes("antar") || lower.includes("jemput") || lower.includes("taxi")) {
      category = "Perawatan";
      icon = "🚗";
      tag = "EXTRA";
    } else if (lower.includes("kutu") || lower.includes("jamur") || lower.includes("treatment")) {
      category = "Perawatan";
      icon = "🏥";
      tag = "HEALTH";
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
      deskripsi: item.deskripsi || "Layanan perawatan terbaik untuk anabul.",
      foto: fotoUrl,
      category,
      tag,
      icon,
      bgColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
    };
  });
};

const Services = ({ cartCount = 0, onAddBooking }) => {
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    tanggal_mulai: "",
    jam_mulai: "",
    tanggal_selesai: "",
  });

  useEffect(() => {
    let hasCached = false;
    const cached = sessionStorage.getItem(CACHE_LAYANAN_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServicesData(formatLayananData(parsed));
          setLoading(false);
          hasCached = true;
        }
      } catch (e) {
        console.error("Cache layanan parse error:", e);
      }
    }

    const fetchLayanan = async () => {
      try {
        if (!hasCached) setLoading(true);
        setError(null);

        const res = await fetch(API_LAYANAN_URL);
        if (!res.ok) throw new Error(`Gagal memuat layanan (HTTP ${res.status})`);

        const result = await res.json();
        const rawList = Array.isArray(result.data) ? result.data : [];

        sessionStorage.setItem(CACHE_LAYANAN_KEY, JSON.stringify(rawList));
        setServicesData(formatLayananData(rawList));
      } catch (err) {
        console.error("Error fetch /api/layanan:", err);
        if (!hasCached) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  const categories = ["Semua", "Grooming", "Penitipan", "Perawatan"];

  const filteredServices = servicesData.filter((item) => {
    return selectedCategory === "Semua" || item.category === selectedCategory;
  });

  const handleOpenModal = (layanan) => {
    setSelectedLayanan(layanan);
    setModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!selectedLayanan) return;

    // Pastikan tanggal_selesai berada setelah tanggal_mulai + jam_mulai sesuai validasi backend
    const tglMulaiStr = bookingForm.tanggal_mulai;
    const tglSelesaiStr = `${bookingForm.tanggal_selesai}T23:59:00`;

    const startObj = new Date(`${tglMulaiStr}T${bookingForm.jam_mulai}:00`);
    const endObj = new Date(tglSelesaiStr);

    if (endObj <= startObj) {
      alert("Tanggal selesai harus setelah tanggal dan jam mulai booking!");
      return;
    }

    setSubmitting(true);

    try {
      // Cek user yang login untuk dihubungkan ke transaksi database jika tersedia
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;

      if (currentUser && currentUser.id_user) {
        // 1. Buat Transaksi di backend
        const trxRes = await fetch(`${API_BASE_URL}/api/transaksi`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user: currentUser.id_user,
            id_store: "1",
            total_harga: selectedLayanan.harga,
            metode_pembayaran: "CASH",
            status_pembayaran: "BELUM BAYAR",
          }),
        });
        const trxJson = await trxRes.json();

        if (trxJson.success && trxJson.data?.id_transaksi) {
          // 2. Buat Detail Layanan di backend
          const detailRes = await fetch(`${API_BASE_URL}/api/detail-layanan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_transaksi: trxJson.data.id_transaksi,
              id_layanan: selectedLayanan.id_layanan,
              jumlah: 1,
              harga_satuan: selectedLayanan.harga,
            }),
          });
          const detailJson = await detailRes.json();

          if (detailJson.success && detailJson.data?.id_detail_layanan) {
            // 3. Buat Booking Layanan di backend
            await fetch(`${API_BASE_URL}/api/booking-layanan`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_detail_layanan: detailJson.data.id_detail_layanan,
                tanggal_mulai: tglMulaiStr,
                jam_mulai: bookingForm.jam_mulai,
                tanggal_selesai: tglSelesaiStr,
                status_booking: "MENUNGGU KONFIRMASI",
              }),
            });
          }
        }
      }

      // Simpan ke state global App agar langsung muncul di halaman Akun Saya (/riwayat)
      if (onAddBooking) {
        onAddBooking({
          nama_layanan: selectedLayanan.nama_layanan,
          harga: selectedLayanan.harga,
          tanggal_mulai: bookingForm.tanggal_mulai,
          jam_mulai: bookingForm.jam_mulai,
          tanggal_selesai: bookingForm.tanggal_selesai,
          icon: selectedLayanan.icon,
        });
      }

      alert(
        `💖 Booking Layanan (${selectedLayanan.nama_layanan}) berhasil diajukan!\n\n` +
          `📅 Tanggal Mulai: ${bookingForm.tanggal_mulai} (${bookingForm.jam_mulai})\n` +
          `🏁 Tanggal Selesai: ${bookingForm.tanggal_selesai}\n` +
          `📌 Status: MENUNGGU KONFIRMASI`
      );

      setModalOpen(false);
      setBookingForm({
        tanggal_mulai: "",
        jam_mulai: "",
        tanggal_selesai: "",
      });

      if (!currentUser) {
        navigate("/riwayat");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Terjadi kendala saat mengirim booking, coba lagi sebentar ya!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{servicesStyles}</style>

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
            <Link to="/services" className="nav-menu-link active">Layanan</Link>
            <Link to="/about" className="nav-menu-link">About</Link>
            <Link to="/contact" className="nav-menu-link">Contact</Link>
          </div>

          <div className="nav-actions">
            <Link to="/riwayat" className="nav-icon-circle" title="Akun & Riwayat">
              👤
            </Link>
            <Link to="/cart" className="nav-icon-circle" title="Keranjang Belanja">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>

        <section className="hero-section">
          <h1 className="hero-title">LAYANAN & GROOMING ✂️</h1>
          <p className="hero-subtitle">
            Manjakan anabul kesayanganmu dengan perawatan profesional, steril, dan penuh kasih sayang!
          </p>
        </section>

        <div className="benefit-pill-bar">
          <div className="benefit-pill-item">🧼 Alat & Kandang Steril</div>
          <div className="benefit-pill-item">👨‍⚕️ Groomer Berpengalaman</div>
          <div className="benefit-pill-item">🌸 Shampoo Hypoallergenic</div>
        </div>

        <section className="info-boxes-grid">
          <div className="info-card-rayo">
            <h3 className="info-card-title">Jadwal Operasional ⏰</h3>
            <ul className="schedule-list">
              <li><span>Senin - Jumat</span><strong>09:00 - 19:00 WIB</strong></li>
              <li><span>Sabtu - Minggu</span><strong>08:00 - 20:00 WIB</strong></li>
              <li><span>Terakhir Grooming</span><strong>17:00 WIB</strong></li>
            </ul>
          </div>

          <div className="info-card-rayo">
            <h3 className="info-card-title">Syarat & Ketentuan 📌</h3>
            <ol className="terms-list">
              <li>Anabul dalam kondisi sehat (tidak demam/sakit parah).</li>
              <li>Wajib membawa buku vaksin untuk fasilitas Pet Hotel.</li>
              <li>Konfirmasi kedatangan 15 menit sebelum jam booking.</li>
            </ol>
          </div>
        </section>

        <section className="filter-sort-bar">
          <div className="categories-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="services-grid-rayo">
          {loading ? (
            <div className="no-services">🐾 Sedang memuat daftar layanan MEUW...</div>
          ) : error ? (
            <div className="no-services" style={{ color: "#E53E3E" }}>
              😿 Gagal memuat layanan: {error}
            </div>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((item) => (
              <div key={item.id_layanan} className="card-rayo">
                <div className="card-image-box" style={{ backgroundColor: item.bgColor }}>
                  <span className="card-tag-pill">{item.tag}</span>
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nama_layanan}
                      className="service-img-display"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="service-icon-display">{item.icon}</div>
                  )}
                </div>

                <div className="card-details">
                  <div className="card-title-block">
                    <div className="card-service-name">{item.nama_layanan}</div>
                    <div className="card-service-price">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div className="card-bottom-row">
                    <p className="card-service-desc">{item.deskripsi}</p>
                    <button className="card-book-btn" onClick={() => handleOpenModal(item)}>
                      BOOKING 📅
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-services">
              😿 Belum ada layanan pada kategori "{selectedCategory}".
            </div>
          )}
        </section>

        {modalOpen && selectedLayanan && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
              <h3 className="modal-title">Form Booking Layanan 🐾</h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#665959",
                  marginBottom: "1.3rem",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: 600,
                }}
              >
                Layanan: <strong>{selectedLayanan.nama_layanan}</strong> (Rp{" "}
                {selectedLayanan.harga.toLocaleString("id-ID")})
              </p>

              <form onSubmit={handleSubmitBooking}>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Tanggal Mulai</label>
                    <input
                      type="date"
                      required
                      className="form-input"
                      value={bookingForm.tanggal_mulai}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, tanggal_mulai: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Jam Mulai</label>
                    <input
                      type="time"
                      required
                      className="form-input"
                      value={bookingForm.jam_mulai}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, jam_mulai: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tanggal Selesai</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={bookingForm.tanggal_selesai}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, tanggal_selesai: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "MEMPROSES BOOKING..." : "KONFIRMASI BOOKING 💖"}
                </button>
              </form>
            </div>
          </div>
        )}

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
                Dapatkan info jadwal grooming & promo perawatan anabulmu.
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

export default Services;