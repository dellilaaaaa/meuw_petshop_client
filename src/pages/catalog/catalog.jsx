import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../images/logo.png";

const API_BASE_URL = "https://meuw-petshop-server.vercel.app";
const API_CATALOG_URL = `${API_BASE_URL}/api/catalog`;
const CACHE_KEY = "meuw_catalog_cache_v1";

const PASTEL_COLORS = ["#FDEAE8", "#E3F6F6", "#FEEAE1", "#FEF7DF", "#E8F4FE"];

const catalogStyles = `
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

  @keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes popModal {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
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

  .toast-notification {
    position: fixed;
    top: 24px;
    right: 24px;
    background-color: #B1E5E6;
    border: 2px solid #F7ADAD;
    color: #2D3748;
    padding: 12px 22px;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 800;
    box-shadow: 0 10px 25px rgba(247, 173, 173, 0.35);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Quicksand', sans-serif;
    animation: slideIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

  .hero-section { text-align: center; margin-bottom: 3rem; }

  .hero-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #4A3E3E;
    letter-spacing: -0.5px;
    margin-bottom: 1.4rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .search-pill-wrapper { max-width: 520px; margin: 0 auto; position: relative; }

  .search-pill-input {
    width: 100%;
    padding: 14px 22px 14px 48px;
    border: 2px solid #F7ADAD;
    border-radius: 35px;
    background-color: #FFFFFF;
    outline: none;
    font-size: 0.92rem;
    font-weight: 600;
    color: #4A3E3E;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 6px 18px rgba(247, 173, 173, 0.12);
    transition: all 0.3s ease;
  }

  .search-pill-input:focus {
    box-shadow: 0 8px 22px rgba(247, 173, 173, 0.25);
    border-color: #F7ADAD;
    transform: translateY(-2px);
  }

  .search-pill-input::placeholder { color: #AAA; }

  .search-icon-inside {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #F7ADAD;
    font-size: 1.05rem;
  }

  .filter-sort-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1.2rem;
  }

  .categories-chips { display: flex; gap: 0.6rem; flex-wrap: wrap; }

  .chip-btn {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    color: #665959;
    padding: 8px 18px;
    border-radius: 25px;
    font-size: 0.85rem;
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

  .product-grid-rayo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.2rem 1.8rem;
    margin-bottom: 3.5rem;
  }

  .card-rayo {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .card-image-box {
    position: relative;
    width: 100%;
    height: 290px;
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

  .card-wishlist-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #FFFDF6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    cursor: pointer;
    z-index: 2;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 10px rgba(247, 173, 173, 0.15);
  }

  .card-wishlist-btn:hover { transform: scale(1.2) rotate(10deg); background-color: #FDEAE8; }

  .card-img-content {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
    border-radius: 16px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card-rayo:hover .card-img-content { transform: scale(1.08) rotate(-3deg); }

  .card-details { padding: 0 0.3rem; }

  .card-category-label {
    display: inline-block;
    background-color: #B1E5E6;
    color: #4A3E3E;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 12px;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .card-info-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
  }

  .card-title-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .card-product-name {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
    line-height: 1.25;
    margin-bottom: 0.2rem;
  }

  .card-product-price {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: #F7ADAD;
  }

  .card-add-cart-btn {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 12px rgba(74, 62, 62, 0.2);
  }

  .card-add-cart-btn:hover {
    transform: scale(1.15) rotate(8deg);
    background-color: #F7ADAD;
    color: #FFF;
  }

  /* MODAL POPUP PRODUK */
  .product-modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(74, 62, 62, 0.45);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .product-modal-card {
    background-color: #FFFDF6;
    border: 3px solid #F7ADAD;
    border-radius: 36px;
    max-width: 720px;
    width: 100%;
    padding: 2rem;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 1.8rem;
    box-shadow: 0 24px 60px rgba(74, 62, 62, 0.28);
    animation: popModal 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .modal-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #FDEAE8;
    border: 2px solid #F7ADAD;
    color: #4A3E3E;
    font-size: 1.1rem;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  .modal-close-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: rotate(90deg) scale(1.1);
  }

  .modal-image-box {
    border-radius: 26px;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    min-height: 270px;
  }

  .modal-img-content {
    max-width: 100%;
    max-height: 240px;
    object-fit: contain;
    border-radius: 14px;
  }

  .modal-info-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-product-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.65rem;
    font-weight: 800;
    color: #333;
    line-height: 1.25;
    margin: 0.4rem 0;
  }

  .modal-product-price {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.55rem;
    font-weight: 800;
    color: #F7ADAD;
    margin-bottom: 1rem;
  }

  .modal-desc-box {
    background-color: #FFFFFF;
    border: 1.5px dashed #F7ADAD;
    border-radius: 18px;
    padding: 1rem 1.1rem;
    max-height: 180px;
    overflow-y: auto;
    margin-bottom: 1.3rem;
  }

  .modal-desc-label {
    font-size: 0.78rem;
    font-weight: 800;
    color: #887A7A;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.35rem;
  }

  .modal-desc-text {
    font-size: 0.9rem;
    color: #4A3E3E;
    line-height: 1.6;
    font-weight: 600;
    white-space: pre-line;
  }

  .modal-cart-btn {
    width: 100%;
    padding: 13px 20px;
    border-radius: 25px;
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    font-family: 'Quicksand', sans-serif;
    font-size: 0.95rem;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 6px 16px rgba(74, 62, 62, 0.2);
  }

  .modal-cart-btn:hover {
    background-color: #F7ADAD;
    color: #FFF;
    transform: translateY(-2px);
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    margin-top: 2rem;
    margin-bottom: 4.5rem;
    font-size: 0.9rem;
    font-weight: 800;
    font-family: 'Quicksand', sans-serif;
  }

  .page-num {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #665959;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .page-num.active {
    background-color: #F7ADAD;
    color: #FFFDF6;
    box-shadow: 0 4px 12px rgba(247, 173, 173, 0.35);
  }

  .page-num:hover:not(.active) { background-color: #B1E5E6; color: #333; transform: scale(1.1); }

  .reviews-rayo-section {
    border-top: 2px dashed #F7ADAD;
    padding-top: 3rem;
    margin-bottom: 5rem;
    text-align: center;
  }

  .reviews-rayo-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 2.2rem;
    color: #4A3E3E;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  .reviews-slider-wrapper { max-width: 960px; margin: 0 auto; overflow: hidden; padding: 10px 0; }
  .reviews-slider-track { display: flex; gap: 1.8rem; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

  .review-rayo-card {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 30px 20px 32px 22px;
    padding: 1.5rem;
    min-width: 290px;
    max-width: 290px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.12);
    transition: transform 0.3s ease;
  }

  .review-rayo-card:hover { transform: translateY(-6px) rotate(-1deg); }
  .review-rayo-header { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.9rem; }

  .review-rayo-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #B1E5E6;
    border: 2px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    box-shadow: 0 4px 10px rgba(177, 229, 230, 0.4);
  }

  .review-rayo-user { font-family: 'Baloo 2', cursive, sans-serif; font-weight: 700; font-size: 1rem; color: #333; }
  .review-rayo-stars { color: #FFB74D; font-size: 0.85rem; }

  .review-rayo-comment {
    font-size: 0.88rem;
    color: #665959;
    font-style: italic;
    line-height: 1.5;
    margin-bottom: 0.9rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }

  .review-rayo-date { font-size: 0.75rem; color: #AAA; text-align: right; font-family: 'Quicksand', sans-serif; font-weight: 600; }

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

  .no-products { grid-column: 1 / -1; text-align: center; padding: 4rem; color: #888; font-weight: 700; font-size: 1rem; font-family: 'Quicksand', sans-serif; }

  @media (max-width: 950px) {
    .product-grid-rayo { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }

  @media (max-width: 650px) {
    .product-modal-card {
      grid-template-columns: 1fr;
      padding: 1.5rem;
      gap: 1.2rem;
    }
    .modal-image-box { min-height: 200px; }
  }

  @media (max-width: 600px) {
    .product-grid-rayo { grid-template-columns: 1fr; }
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
  }
`;

const formatCatalogData = (rawProducts) => {
  const formattedProducts = rawProducts.map((item, index) => {
    const kategoriNama =
      typeof item.id_kategori === "object" && item.id_kategori !== null
        ? item.id_kategori.nama_kategori
        : item.nama_kategori || "Lainnya";

    const kategoriId =
      typeof item.id_kategori === "object" && item.id_kategori !== null
        ? item.id_kategori._id
        : item.id_kategori || index;

    const productId = item._id || item.id_barang || index + 1;
    const encodedLabel = encodeURIComponent(kategoriNama);
    const fallbackImg = `https://placehold.co/240x240/F7ADAD/FFFDF6?text=${encodedLabel}`;

    return {
      id_barang: productId,
      id_kategori: kategoriId,
      nama_kategori: kategoriNama,
      nama_barang: item.nama_barang || "Produk Tanpa Nama",
      harga: Number(item.harga || 0),
      deskripsi: item.deskripsi || "Produk berkualitas untuk anabul.",
      tag: kategoriNama.toUpperCase(),
      bgColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
      gambar:
        typeof item.foto === "string" && item.foto.trim() !== ""
          ? item.foto.startsWith("http")
            ? item.foto
            : `${API_BASE_URL}${item.foto.startsWith("/") ? "" : "/"}${item.foto}`
          : fallbackImg,
    };
  });

  const categoryMap = new Map();
  formattedProducts.forEach((p) => {
    if (p.nama_kategori && !categoryMap.has(p.nama_kategori)) {
      categoryMap.set(p.nama_kategori, p.id_kategori);
    }
  });

  const dynamicCategories = [
    { id_kategori: "all", nama_kategori: "Semua" },
    ...Array.from(categoryMap.entries()).map(([nama, id]) => ({
      id_kategori: id,
      nama_kategori: nama,
    })),
  ];

  return { formattedProducts, dynamicCategories };
};

const Catalog = ({ cartCount = 0, onAddToCart }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([
    { id_kategori: 0, nama_kategori: "Semua" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // State untuk produk yang sedang dibuka di popup modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const itemsPerPage = 6;

  const latestReviews = [
    {
      id_review: 1,
      id_transaksi: 501,
      nama_user: "Saraswati Putri",
      avatar: "🐱",
      rating: 5,
      komentar:
        "Hasil grooming anabul rapi & wangi banget! Anabulku biasa rewel tapi di sini anteng.",
      tanggal_review: "2026-10-14 10:00:00",
    },
    {
      id_review: 2,
      id_transaksi: 502,
      nama_user: "Amelia Zahra",
      avatar: "🐶",
      rating: 5,
      komentar:
        "Dry food Royal Canin pengirimannya super cepat! Expired date masih lama & dapet bonus.",
      tanggal_review: "2026-10-11 15:30:00",
    },
    {
      id_review: 3,
      id_transaksi: 503,
      nama_user: "Tiara Andini",
      avatar: "🐰",
      rating: 5,
      komentar:
        "Tempatnya bersih banget, staff-nya ramah & penyayang binatang. Next mau balik lagi!",
      tanggal_review: "2026-10-09 09:15:00",
    },
    {
      id_review: 4,
      id_transaksi: 504,
      nama_user: "Nabila Kanza",
      avatar: "🐱",
      rating: 5,
      komentar:
        "Suka banget sama vitamin bulunya, baru seminggu pake bulu kucingku langsung lebat!",
      tanggal_review: "2026-10-02 18:20:00",
    },
  ];

  useEffect(() => {
    let hasCached = false;
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const { formattedProducts, dynamicCategories } =
            formatCatalogData(parsed);
          setProducts(formattedProducts);
          setCategoriesList(dynamicCategories);
          setLoading(false);
          hasCached = true;
        }
      } catch (e) {
        console.error("Cache parse error:", e);
      }
    }

    const fetchCatalog = async () => {
      try {
        if (!hasCached) setLoading(true);
        setError(null);

        const response = await fetch(API_CATALOG_URL);
        if (!response.ok) {
          throw new Error(
            `Gagal memuat data dari server (HTTP ${response.status})`,
          );
        }

        const result = await response.json();
        const rawProducts = Array.isArray(result.data) ? result.data : [];

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(rawProducts));
        const { formattedProducts, dynamicCategories } =
          formatCatalogData(rawProducts);
        setProducts(formattedProducts);
        setCategoriesList(dynamicCategories);
      } catch (err) {
        console.error("Error fetch /api/catalog:", err);
        if (!hasCached) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Otomatis buka popup produk jika pengguna klik "Lihat Produk" dari halaman Home
  useEffect(() => {
    const targetId = location.state?.selectedProductId;
    if (targetId && products.length > 0) {
      const found = products.find(
        (item) => String(item.id_barang) === String(targetId),
      );
      if (found) {
        setSelectedProduct(found);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, products]);

  useEffect(() => {
    if (latestReviews.length <= 3) return;
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) =>
        prev >= latestReviews.length - 3 ? 0 : prev + 1,
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [latestReviews.length]);

  const filteredProducts = products.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      item.nama_barang.toLowerCase().includes(query) ||
      item.nama_kategori.toLowerCase().includes(query) ||
      item.deskripsi.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "Semua" || item.nama_kategori === selectedCategory;

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const paginatedProducts = filteredProducts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage,
  );

  useEffect(() => {
    setActivePage(1);
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (barang) => {
    if (onAddToCart) onAddToCart(barang);
    setToastMsg(`🛍️ ${barang.nama_barang} dimasukkan ke keranjang!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <style>{catalogStyles}</style>

      <div className="bg-top-accent"></div>

      {showToast && <div className="toast-notification">{toastMsg}</div>}

      {/* POPUP DETAIL PRODUK */}
      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProduct(null)}
              title="Tutup"
            >
              ✕
            </button>

            <div
              className="modal-image-box"
              style={{ backgroundColor: selectedProduct.bgColor }}
            >
              <img
                src={selectedProduct.gambar}
                alt={selectedProduct.nama_barang}
                className="modal-img-content"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = selectedProduct.fallbackGambar;
                }}
              />
            </div>

            <div className="modal-info-col">
              <div>
                <span className="card-category-label">
                  {selectedProduct.nama_kategori}
                </span>
                <h2 className="modal-product-title">
                  {selectedProduct.nama_barang}
                </h2>
                <div className="modal-product-price">
                  Rp {selectedProduct.harga.toLocaleString("id-ID")}
                </div>

                <div className="modal-desc-box">
                  <div className="modal-desc-label">Deskripsi Produk</div>
                  <p className="modal-desc-text">{selectedProduct.deskripsi}</p>
                </div>
              </div>

              <button
                className="modal-cart-btn"
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                🛒 Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="wrapper">
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
            <Link to="/home" className="nav-menu-link">
              Home
            </Link>
            <Link to="/catalog" className="nav-menu-link active">
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

        <section className="hero-section">
          <h1 className="hero-title">MEUW PETSHOP CATALOG 🐾</h1>

          <div className="search-pill-wrapper">
            <span className="search-icon-inside">🔍</span>
            <input
              type="text"
              placeholder="Cari makanan, pasir, vitamin, shampoo..."
              className="search-pill-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className="filter-sort-bar">
          <div className="categories-chips">
            {categoriesList.map((cat) => (
              <button
                key={cat.id_kategori}
                className={`chip-btn ${
                  selectedCategory === cat.nama_kategori ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.nama_kategori)}
              >
                {cat.nama_kategori}
              </button>
            ))}
          </div>
        </section>

        <section className="product-grid-rayo">
          {loading ? (
            <div className="no-products">
              🐾 Sedang memuat produk dari katalog MEUW...
            </div>
          ) : error ? (
            <div className="no-products" style={{ color: "#E53E3E" }}>
              😿 Gagal mengambil data: {error}
            </div>
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((item) => (
              <div
                key={item.id_barang}
                className="card-rayo"
                onClick={() => setSelectedProduct(item)}
              >
                <div
                  className="card-image-box"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <span className="card-tag-pill">{item.nama_kategori}</span>
                  <button
                    className="card-wishlist-btn"
                    title="Favorit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    💖
                  </button>
                  <img
                    src={item.gambar}
                    alt={item.nama_barang}
                    className="card-img-content"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.fallbackGambar;
                    }}
                  />
                </div>

                <div className="card-details">
                  <span className="card-category-label">
                    {item.nama_kategori}
                  </span>

                  <div className="card-info-footer">
                    <div className="card-title-block">
                      <div className="card-product-name">
                        {item.nama_barang}
                      </div>
                      <div className="card-product-price">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </div>
                    </div>

                    <button
                      className="card-add-cart-btn"
                      title="Tambah ke Keranjang"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              😿 Produk "{searchTerm}" pada kategori "{selectedCategory}" tidak
              ditemukan.
            </div>
          )}
        </section>

        {!loading && !error && totalPages > 1 && (
          <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`page-num ${activePage === num ? "active" : ""}`}
                onClick={() => setActivePage(num)}
              >
                {num}
              </div>
            ))}
          </div>
        )}

        <section className="reviews-rayo-section">
          <h2 className="reviews-rayo-title">Latest Reviews 🌟</h2>

          <div className="reviews-slider-wrapper">
            <div
              className="reviews-slider-track"
              style={{
                transform: `translateX(-${currentReviewIndex * 314}px)`,
              }}
            >
              {latestReviews.map((rev) => (
                <div key={rev.id_review} className="review-rayo-card">
                  <div>
                    <div className="review-rayo-header">
                      <div className="review-rayo-avatar">{rev.avatar}</div>
                      <div>
                        <div className="review-rayo-user">{rev.nama_user}</div>
                        <div className="review-rayo-stars">
                          {"⭐".repeat(rev.rating)} ({rev.rating}/5)
                        </div>
                      </div>
                    </div>
                    <p className="review-rayo-comment">"{rev.komentar}"</p>
                  </div>
                  <div className="review-rayo-date">
                    {rev.tanggal_review.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

export default Catalog;
