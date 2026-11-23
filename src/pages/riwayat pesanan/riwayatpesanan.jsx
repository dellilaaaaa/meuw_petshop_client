import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../images/logo.png";

const API_BASE = "https://meuw-petshop-server.vercel.app/api";

const riwayatStyles = `
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

  .nav-icon-circle.active { background-color: #F7ADAD; color: #FFFDF6; }
  .nav-icon-circle:hover { transform: translateY(-5px) scale(1.15) rotate(8deg); background-color: #B1E5E6; }

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

  .page-title {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    color: #4A3E3E;
    text-align: center;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(247, 173, 173, 0.15);
  }

  .tab-pill-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2.2rem;
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

  .status-filter-bar {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .status-chip {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1.5px solid #E5DEC9;
    background-color: #FFF;
    color: #665959;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .status-chip.active {
    background-color: #B1E5E6;
    border-color: #91DCDE;
    color: #225B5C;
  }

  .profile-card-rayo {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 36px 24px 36px 24px;
    padding: 2.5rem;
    max-width: 720px;
    margin: 0 auto 2rem auto;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.14);
  }

  .profile-header-box {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 1.8rem;
    border-bottom: 2px dashed #FFEBEB;
    margin-bottom: 1.8rem;
  }

  .profile-avatar-circle {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FDEAE8 0%, #F7ADAD 100%);
    border: 3px solid #F7ADAD;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(247, 173, 173, 0.3);
  }

  .profile-name {
    font-family: 'Baloo 2', cursive, sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #4A3E3E;
    line-height: 1.2;
  }

  .profile-badge-member {
    display: inline-block;
    margin-top: 4px;
    background-color: #E3F6F6;
    color: #225B5C;
    border: 1.5px solid #91DCDE;
    font-size: 0.78rem;
    font-weight: 800;
    padding: 3px 12px;
    border-radius: 15px;
  }

  .profile-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
    margin-bottom: 2rem;
  }

  .profile-info-item {
    background-color: #FFFDF6;
    border: 1.5px solid #F7ADAD;
    border-radius: 20px;
    padding: 1rem 1.2rem;
  }

  .profile-info-item.full-width { grid-column: span 2; }
  .profile-label { font-size: 0.78rem; font-weight: 700; color: #998888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .profile-value { font-size: 1rem; font-weight: 700; color: #4A3E3E; }

  .logout-btn {
    width: 100%;
    background-color: #FFF;
    color: #D9534F;
    border: 2px solid #F7ADAD;
    padding: 13px;
    border-radius: 25px;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .logout-btn:hover { background-color: #D9534F; border-color: #D9534F; color: #FFF; transform: translateY(-3px); }

  .guest-box {
    background-color: #FFF;
    border: 2px dashed #F7ADAD;
    border-radius: 36px;
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto 3rem auto;
    text-align: center;
    box-shadow: 0 10px 28px rgba(247, 173, 173, 0.14);
  }

  .guest-btn-group { display: flex; justify-content: center; gap: 1rem; margin-top: 1.8rem; flex-wrap: wrap; }

  .btn-primary-cute {
    background-color: #4A3E3E;
    color: #FFFDF6;
    border: 2px solid #F7ADAD;
    padding: 12px 28px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.92rem;
  }

  .btn-secondary-cute {
    background-color: #B1E5E6;
    color: #225B5C;
    border: 2px solid #91DCDE;
    padding: 12px 28px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.92rem;
  }

  .order-card-rayo {
    background-color: #FFF;
    border: 2px solid #F7ADAD;
    border-radius: 32px 20px 30px 20px;
    padding: 1.8rem;
    margin-bottom: 1.6rem;
    box-shadow: 0 8px 24px rgba(247, 173, 173, 0.12);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .order-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 0.9rem;
    border-bottom: 1.5px dashed #FFEBEB;
    padding-bottom: 0.7rem;
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
    font-size: 0.82rem;
    padding: 4px 14px;
    border-radius: 15px;
  }

  .order-details-text {
    font-size: 0.95rem;
    color: #665959;
    line-height: 1.6;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .order-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 0.8rem;
    border-top: 1.5px dashed #FFEBEB;
  }

  .order-price-tag {
    font-family: 'Baloo 2', cursive, sans-serif;
    color: #F7ADAD;
    font-weight: 800;
    font-size: 1.35rem;
  }

  .action-pill-btn {
    padding: 7px 16px;
    border-radius: 18px;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.2s;
  }

  .timeline-overlay {
    position: fixed;
    inset: 0;
    background: rgba(74, 62, 62, 0.45);
    backdrop-filter: blur(6px);
    z-index: 2500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .timeline-modal {
    background: #FFFDF6;
    border: 3px solid #F7ADAD;
    border-radius: 32px;
    max-width: 520px;
    width: 100%;
    padding: 2rem;
    position: relative;
    box-shadow: 0 20px 50px rgba(74, 62, 62, 0.25);
  }

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

  /* --- FOOTER EXPLICIT ORGANIK --- */
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
  .footer-col-title { font-family: 'Baloo 2', cursive, sans-serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 1rem; color: #FFFDF6; }
  .footer-col-list { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-col-list a { text-decoration: none; color: #FFFDF6; opacity: 0.92; font-size: 0.88rem; transition: all 0.25s ease; font-family: 'Quicksand', sans-serif; font-weight: 600; display: inline-block; }
  .footer-col-list a:hover { opacity: 1; transform: translateX(6px); }
  .newsletter-desc { font-size: 0.88rem; opacity: 0.92; margin-bottom: 1rem; line-height: 1.5; font-family: 'Quicksand', sans-serif; font-weight: 600; }
  .newsletter-input { width: 100%; padding: 10px 0; background: transparent; border: none; border-bottom: 2px solid rgba(255, 253, 246, 0.7); color: #FFFDF6; outline: none; font-size: 0.9rem; font-family: 'Quicksand', sans-serif; font-weight: 600; transition: border-color 0.3s ease; }
  .newsletter-input:focus { border-bottom-color: #FFFDF6; }
  .newsletter-input::placeholder { color: rgba(255, 253, 246, 0.65); }
  .footer-bottom-bar { border-top: 1.5px solid rgba(255, 253, 246, 0.35); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; opacity: 0.92; font-family: 'Quicksand', sans-serif; font-weight: 600; }

  @media (max-width: 850px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
  @media (max-width: 600px) {
    .navbar { flex-direction: column; gap: 1rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 2.2rem; }
    .footer-rayo-box { padding: 2.5rem 1.8rem; }
    .profile-header-box { flex-direction: column; text-align: center; }
    .profile-info-grid { grid-template-columns: 1fr; }
    .profile-info-item.full-width { grid-column: span 1; }
  }
`;

const STORE_NAMES = {
  1: "MEUW Petshop - Jakarta Pusat",
  2: "MEUW Petshop - Jakarta Selatan",
  3: "MEUW Petshop - Jakarta Timur",
  4: "MEUW Petshop - Jakarta Barat",
};

const RiwayatPesanan = ({ cartCount = 0, bookingList = [] }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("produk");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [currentUser, setCurrentUser] = useState(null);

  const [orders, setOrders] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [catalogMap, setCatalogMap] = useState({});
  const [dbBookings, setDbBookings] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [trackingModal, setTrackingModal] = useState({
    open: false,
    id_transaksi: null,
    logs: [],
    loading: false,
  });

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal membaca data user:", e);
      }
    }
  }, []);

  const fetchUserTransactions = useCallback(async () => {
    const userId = currentUser?.id_user || currentUser?._id || currentUser?.id;
    if (!userId) return;

    setLoadingOrders(true);
    try {
      const [resTrx, resDetail, resCat, resBook, resDetLayanan] =
        await Promise.all([
          fetch(`${API_BASE}/transaksi?id_user=${encodeURIComponent(userId)}`),
          fetch(`${API_BASE}/detail-transaksi`),
          fetch(`${API_BASE}/catalog`),
          fetch(`${API_BASE}/booking-layanan`),
          fetch(`${API_BASE}/detail-layanan`).catch(() => ({
            json: async () => ({ success: false, data: [] }),
          })),
        ]);

      const dataTrx = await resTrx.json();
      const dataDetail = await resDetail.json();
      const dataCat = await resCat.json();
      const dataBook = await resBook.json();
      const dataDetLayanan = await resDetLayanan.json();

      let userTrxIds = new Set();
      if (dataTrx.success) {
        const userTrx = (dataTrx.data || []).filter(
          (t) => String(t.id_user) === String(userId),
        );
        setOrders(userTrx);
        userTrxIds = new Set(
          userTrx.map((t) => String(t.id_transaksi || t._id)),
        );
      }

      if (dataDetail.success) setAllDetails(dataDetail.data || []);

      if (dataCat.success) {
        const map = {};
        (dataCat.data || []).forEach((c) => {
          map[String(c.id_barang)] = c.nama_barang;
        });
        setCatalogMap(map);
      }

      // Filter booking-layanan agar HANYA menampilkan milik transaksi user ini
      if (dataBook.success) {
        const allBookings = dataBook.data || [];
        const allDetLayanan = dataDetLayanan.success
          ? dataDetLayanan.data || []
          : [];

        const userDetailLayananIds = new Set(
          allDetLayanan
            .filter((dl) => userTrxIds.has(String(dl.id_transaksi)))
            .map((dl) => String(dl.id_detail_layanan || dl._id)),
        );

        const filteredBookings = allBookings.filter(
          (bk) =>
            userTrxIds.has(String(bk.id_transaksi)) ||
            userDetailLayananIds.has(String(bk.id_detail_layanan)),
        );

        setDbBookings(filteredBookings);
      }
    } catch (err) {
      console.error("Gagal mengambil riwayat transaksi:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  const handleOpenTracking = async (id_transaksi) => {
    setTrackingModal({ open: true, id_transaksi, logs: [], loading: true });
    try {
      const res = await fetch(`${API_BASE}/histori-transaksi/${id_transaksi}`);
      const json = await res.json();
      setTrackingModal({
        open: true,
        id_transaksi,
        logs: json.success ? json.data || [] : [],
        loading: false,
      });
    } catch {
      setTrackingModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleCustomerStatusUpdate = async (
    id_transaksi,
    status_terbaru,
    catatan,
  ) => {
    const confirmMsg =
      status_terbaru === "Dibatalkan"
        ? `Yakin ingin membatalkan pesanan #${id_transaksi}? Stok akan dikembalikan ke cabang.`
        : `Konfirmasi bahwa pesanan #${id_transaksi} sudah kamu terima dengan baik?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${API_BASE}/transaksi/${id_transaksi}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_terbaru, catatan }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(
          json.error || json.message || "Gagal memperbarui status",
        );
      }
      await fetchUserTransactions();
    } catch (err) {
      alert(`Gagal memperbarui pesanan: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("selected_store");
    localStorage.removeItem("meuw_booking_list_v1");
    setCurrentUser(null);
    alert("Kamu berhasil keluar dari akun. Sampai jumpa lagi! 🐾");
    navigate("/login");
  };

  const getStatusStyle = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "SELESAI")
      return { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" };
    if (s === "DIPROSES")
      return { bg: "#DBEAFE", color: "#1E40AF", border: "#93C5FD" };
    if (s === "DIBATALKAN")
      return { bg: "#FEE2E2", color: "#991B1B", border: "#FCA5A5" };
    return { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047" };
  };

  const filteredOrders = orders.filter((o) =>
    statusFilter === "Semua" ? true : o.status === statusFilter,
  );

  const combinedBookings = dbBookings.length > 0 ? dbBookings : bookingList;

  return (
    <>
      <style>{riwayatStyles}</style>

      <div className="bg-top-accent"></div>

      {trackingModal.open && (
        <div
          className="timeline-overlay"
          onClick={() =>
            setTrackingModal({
              open: false,
              id_transaksi: null,
              logs: [],
              loading: false,
            })
          }
        >
          <div className="timeline-modal" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() =>
                setTrackingModal({
                  open: false,
                  id_transaksi: null,
                  logs: [],
                  loading: false,
                })
              }
              style={{
                position: "absolute",
                top: "16px",
                right: "18px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "2px solid #F7ADAD",
                background: "#FFF",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3
              style={{
                fontFamily: "'Baloo 2', cursive, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#4A3E3E",
                marginBottom: "0.3rem",
              }}
            >
              📍 Lacak Pesanan #{trackingModal.id_transaksi}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#776B6B",
                marginBottom: "1.2rem",
                fontWeight: 600,
              }}
            >
              Riwayat perubahan status tercatat otomatis di sistem MEUW Petshop:
            </p>

            {trackingModal.loading ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  fontWeight: 700,
                }}
              >
                Memuat jejak transaksi...
              </p>
            ) : trackingModal.logs.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  color: "#887777",
                }}
              >
                Belum ada log histori untuk transaksi ini.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {trackingModal.logs.map((log, idx) => {
                  const st = getStatusStyle(log.status_terbaru);
                  return (
                    <div
                      key={log.id_histori || idx}
                      style={{
                        background: "#FFF",
                        border: "1.5px solid #F7ADAD",
                        borderRadius: "16px",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            backgroundColor: st.bg,
                            color: st.color,
                            border: `1px solid ${st.border}`,
                          }}
                        >
                          {log.status_terbaru}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#887777",
                            fontWeight: 700,
                          }}
                        >
                          {new Date(log.tanggal_perubahan).toLocaleString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.86rem",
                          color: "#4A3E3E",
                          fontWeight: 600,
                        }}
                      >
                        {log.catatan ||
                          `Status diperbarui menjadi ${log.status_terbaru}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
              className="nav-icon-circle active"
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

        <h1 className="page-title">AKUN & RIWAYAT SAYA 🐾</h1>

        {!currentUser ? (
          <div className="guest-box">
            <span className="empty-history-icon">🐱</span>
            <h2 className="empty-history-title">
              Kamu belum masuk ke akun MEUW
            </h2>
            <p
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: 600,
                marginTop: "0.5rem",
              }}
            >
              Silakan Log In terlebih dahulu untuk melihat profil lengkap,
              riwayat belanja, dan jadwal booking anabulmu!
            </p>
            <div className="guest-btn-group">
              <Link to="/login" className="btn-primary-cute">
                Log In Sekarang
              </Link>
              <Link to="/register" className="btn-secondary-cute">
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="tab-pill-container">
              <button
                className={`tab-btn ${activeTab === "produk" ? "active" : ""}`}
                onClick={() => setActiveTab("produk")}
              >
                📦 Riwayat Transaksi ({orders.length})
              </button>
              <button
                className={`tab-btn ${activeTab === "layanan" ? "active" : ""}`}
                onClick={() => setActiveTab("layanan")}
              >
                📅 Booking Layanan ({combinedBookings.length})
              </button>
              <button
                className={`tab-btn ${activeTab === "profil" ? "active" : ""}`}
                onClick={() => setActiveTab("profil")}
              >
                👤 Profil Saya
              </button>
            </div>

            {activeTab === "produk" && (
              <>
                <div className="status-filter-bar">
                  {[
                    "Semua",
                    "Pending",
                    "Diproses",
                    "Selesai",
                    "Dibatalkan",
                  ].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`status-chip ${statusFilter === st ? "active" : ""}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {loadingOrders ? (
                  <div className="empty-history-box">
                    <span className="empty-history-icon">🐾</span>
                    <h3 className="empty-history-title">
                      Memuat riwayat transaksimu...
                    </h3>
                  </div>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const itemsForOrder = allDetails.filter(
                      (d) =>
                        String(d.id_transaksi) === String(order.id_transaksi),
                    );
                    const stStyle = getStatusStyle(order.status);

                    return (
                      <div key={order.id_transaksi} className="order-card-rayo">
                        <div className="order-card-header">
                          <div>
                            <span className="order-id">
                              Transaksi #{order.id_transaksi}
                            </span>
                            <span
                              style={{
                                marginLeft: "10px",
                                fontSize: "0.8rem",
                                color: "#887777",
                                fontWeight: 700,
                              }}
                            >
                              •{" "}
                              {new Date(order.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                            <div
                              style={{
                                fontSize: "0.78rem",
                                color: "#665959",
                                fontWeight: 700,
                              }}
                            >
                              🏪{" "}
                              {STORE_NAMES[String(order.id_toko)] ||
                                `Cabang #${order.id_toko}`}
                            </div>
                          </div>

                          <span
                            className="status-badge"
                            style={{
                              backgroundColor: stStyle.bg,
                              color: stStyle.color,
                              border: `1.5px solid ${stStyle.border}`,
                            }}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="order-details-text">
                          {itemsForOrder.length > 0 ? (
                            itemsForOrder.map((det) => (
                              <div key={det.id_detail_transaksi}>
                                •{" "}
                                {catalogMap[String(det.id_barang)] ||
                                  `Produk #${det.id_barang}`}{" "}
                                <strong>(x{det.jumlah})</strong> — Rp{" "}
                                {(det.jumlah * det.harga_satuan).toLocaleString(
                                  "id-ID",
                                )}
                              </div>
                            ))
                          ) : (
                            <span>Pesanan Layanan / Paket MEUW Petshop</span>
                          )}
                        </div>

                        <div className="order-footer-row">
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenTracking(order.id_transaksi)
                              }
                              className="action-pill-btn"
                              style={{
                                backgroundColor: "#E3F6F6",
                                color: "#225B5C",
                                border: "1.5px solid #91DCDE",
                              }}
                            >
                              📍 Lacak Status
                            </button>

                            {order.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleCustomerStatusUpdate(
                                    order.id_transaksi,
                                    "Dibatalkan",
                                    "Dibatalkan oleh pelanggan sebelum diproses",
                                  )
                                }
                                className="action-pill-btn"
                                style={{
                                  backgroundColor: "#FEE2E2",
                                  color: "#991B1B",
                                  border: "1.5px solid #FCA5A5",
                                }}
                              >
                                ✕ Batalkan Pesanan
                              </button>
                            )}

                            {order.status === "Diproses" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleCustomerStatusUpdate(
                                    order.id_transaksi,
                                    "Selesai",
                                    "Pesanan telah diterima dengan baik oleh pelanggan",
                                  )
                                }
                                className="action-pill-btn"
                                style={{
                                  backgroundColor: "#DCFCE7",
                                  color: "#166534",
                                  border: "1.5px solid #86EFAC",
                                }}
                              >
                                ✓ Pesanan Diterima
                              </button>
                            )}
                          </div>

                          <div className="order-price-tag">
                            Total: Rp{" "}
                            {Number(order.total_harga || 0).toLocaleString(
                              "id-ID",
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-history-box">
                    <span className="empty-history-icon">📦</span>
                    <h3 className="empty-history-title">
                      Belum ada transaksi pada kategori "{statusFilter}"
                    </h3>
                    <p
                      style={{
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Yuk jelajahi katalog makanan dan perlengkapan anabul!
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === "layanan" &&
              (combinedBookings.length > 0 ? (
                combinedBookings.map((bk) => {
                  const stStyle = getStatusStyle(bk.status_booking);
                  return (
                    <div key={bk.id_booking} className="order-card-rayo">
                      <div className="order-card-header">
                        <span className="order-id">
                          Booking #{bk.id_booking}
                        </span>
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: stStyle.bg,
                            color: stStyle.color,
                            border: `1.5px solid ${stStyle.border}`,
                          }}
                        >
                          {(bk.status_booking || "").toUpperCase()}
                        </span>
                      </div>
                      <div className="order-details-text">
                        {bk.icon || "✂️"}{" "}
                        <strong>
                          {bk.nama_layanan ||
                            `Layanan #${bk.id_detail_layanan}`}
                        </strong>{" "}
                        (Jadwal:{" "}
                        {new Date(bk.tanggal_mulai).toLocaleDateString("id-ID")}{" "}
                        pukul {bk.jam_mulai} s/d{" "}
                        {new Date(bk.tanggal_selesai).toLocaleDateString(
                          "id-ID",
                        )}
                        )
                      </div>
                      {bk.harga && (
                        <div className="order-price-tag">
                          Rp {Number(bk.harga).toLocaleString("id-ID")}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="empty-history-box">
                  <span className="empty-history-icon">📅</span>
                  <h3 className="empty-history-title">
                    Belum ada booking layanan
                  </h3>
                  <p
                    style={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Manjakan anabulmu dengan booking grooming atau pet hotel
                    sekarang!
                  </p>
                </div>
              ))}

            {activeTab === "profil" && (
              <div className="profile-card-rayo">
                <div className="profile-header-box">
                  <div className="profile-avatar-circle">🐾</div>
                  <div>
                    <div className="profile-name">
                      {currentUser.nama || "Pet Lovers"}
                    </div>
                    <span className="profile-badge-member">
                      Member MEUW Petshop 💖
                    </span>
                  </div>
                </div>

                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <div className="profile-label">Email</div>
                    <div className="profile-value">
                      {currentUser.email || "-"}
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="profile-label">No. Telepon</div>
                    <div className="profile-value">
                      {currentUser.no_telp || "-"}
                    </div>
                  </div>
                  <div className="profile-info-item full-width">
                    <div className="profile-label">Alamat Pengiriman</div>
                    <div className="profile-value">
                      {currentUser.alamat || "Alamat belum diisi"}
                    </div>
                  </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                  Keluar dari Akun (Log Out) 🚪
                </button>
              </div>
            )}
          </>
        )}

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
