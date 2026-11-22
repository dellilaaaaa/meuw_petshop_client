import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSpreadsheet,
  ShoppingBag,
  CalendarClock,
  Package,
  Printer,
  Download,
  LogOut,
  RefreshCw,
  TrendingUp,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Store,
} from "lucide-react";

const API_BASE = "https://meuw-petshop-server.vercel.app/api";

const STORES_LIST = [
  { id_toko: "1", nama: "Jakarta Pusat (Cikini)" },
  { id_toko: "2", nama: "Jakarta Selatan (Fatmawati)" },
  { id_toko: "3", nama: "Jakarta Timur (Rawamangun)" },
  { id_toko: "4", nama: "Jakarta Barat (Tanjung Duren)" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [adminUser] = useState(() => {
    try {
      const raw =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState("laporan");

  // Filter Laporan
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jenisLaporan, setJenisLaporan] = useState("semua");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [cabangFilter, setCabangFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  // State Cabang Aktif di Tab Master Data (1, 2, 3, 4)
  const [selectedStoreTab, setSelectedStoreTab] = useState("1");
  const [katalogSearch, setKatalogSearch] = useState("");

  // State Inline Tambah & Edit Produk
  const [isAddingProduk, setIsAddingProduk] = useState(false);
  const [newProduk, setNewProduk] = useState({
    nama_barang: "",
    harga: "",
    id_kategori: "1",
    foto: "",
    stok_awal: "10",
  });
  const [editingProdukId, setEditingProdukId] = useState(null);
  const [editProdukForm, setEditProdukForm] = useState({
    nama_barang: "",
    harga: "",
    foto: "",
    jumlah_stok: 0,
  });

  // State Inline Tambah & Edit Layanan
  const [isAddingLayanan, setIsAddingLayanan] = useState(false);
  const [newLayanan, setNewLayanan] = useState({
    nama_layanan: "",
    harga: "",
    deskripsi: "",
  });
  const [editingLayananId, setEditingLayananId] = useState(null);
  const [editLayananForm, setEditLayananForm] = useState({
    nama_layanan: "",
    harga: "",
    deskripsi: "",
  });

  // Data dari Backend
  const [summary, setSummary] = useState({
    total_pendapatan: 0,
    total_transaksi: 0,
    total_item_terjual: 0,
    total_booking: 0,
    total_produk: 0,
    total_pelanggan: 0,
    item_terlaris: "-",
  });
  const [records, setRecords] = useState([]);
  const [transaksiList, setTransaksiList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const [layananList, setLayananList] = useState([]);
  const [stokList, setStokList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!adminUser || adminUser.role !== "admin") {
      alert("Akses ditolak! Silakan login menggunakan akun Admin.");
      navigate("/login");
    }
  }, [adminUser, navigate]);

  const adminHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-user-id": String(adminUser?.id_user || "1"),
    }),
    [adminUser],
  );

  const fetchAllData = useCallback(async () => {
    if (!adminUser?.id_user) return;
    setLoading(true);
    sessionStorage.removeItem("meuw_catalog_cache_v1");
    sessionStorage.removeItem("meuw_layanan_cache_v1");
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (jenisLaporan !== "semua") params.append("jenis", jenisLaporan);
      if (statusFilter !== "semua") params.append("status", statusFilter);
      if (cabangFilter !== "semua") params.append("id_toko", cabangFilter);

      const headers = adminHeaders();

      const [
        resLaporan,
        resTrx,
        resBooking,
        resCatalog,
        resLayanan,
        resStok,
        resKategori,
      ] = await Promise.all([
        fetch(`${API_BASE}/admin/laporan?${params.toString()}`, { headers }),
        fetch(`${API_BASE}/transaksi`),
        fetch(`${API_BASE}/booking-layanan`),
        fetch(`${API_BASE}/catalog`),
        fetch(`${API_BASE}/layanan`),
        fetch(`${API_BASE}/stok-cabang`),
        fetch(`${API_BASE}/kategori-barang`).catch(() => ({
          json: async () => ({ data: [] }),
        })),
      ]);

      const dataLaporan = await resLaporan.json();
      if (dataLaporan.success) {
        setSummary(dataLaporan.summary);
        setRecords(dataLaporan.records || []);
      }

      const dataTrx = await resTrx.json();
      if (dataTrx.success) setTransaksiList(dataTrx.data || []);

      const dataBooking = await resBooking.json();
      if (dataBooking.success) setBookingList(dataBooking.data || []);

      const dataCatalog = await resCatalog.json();
      if (dataCatalog.success) setCatalogList(dataCatalog.data || []);

      const dataLayanan = await resLayanan.json();
      if (dataLayanan.success) setLayananList(dataLayanan.data || []);

      const dataStok = await resStok.json();
      if (dataStok.success) setStokList(dataStok.data || []);

      const dataKategori = await resKategori.json();
      if (dataKategori?.success) setKategoriList(dataKategori.data || []);
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
    } finally {
      setLoading(false);
    }
  }, [
    adminUser,
    startDate,
    endDate,
    jenisLaporan,
    statusFilter,
    cabangFilter,
    adminHeaders,
  ]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Ambil angka stok barang pada cabang yang sedang dipilih
  const getStokForStore = (id_barang, id_toko = selectedStoreTab) => {
    const found = stokList.find(
      (s) =>
        String(s.id_barang) === String(id_barang) &&
        String(s.id_toko) === String(id_toko),
    );
    return found ? found.jumlah_stok : 0;
  };

  // ==========================================
  // HANDLER CRUD PRODUK & STOK CABANG (INLINE)
  // ==========================================
  const handleCreateProduk = async () => {
    if (!newProduk.nama_barang.trim() || newProduk.harga === "") {
      alert("Nama barang dan harga wajib diisi!");
      return;
    }
    setSaving(true);
    try {
      const defaultKat =
        newProduk.id_kategori ||
        (kategoriList[0]?.id_kategori
          ? String(kategoriList[0].id_kategori)
          : "1");
      const res = await fetch(`${API_BASE}/admin/produk`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify({
          nama_barang: newProduk.nama_barang,
          harga: Number(newProduk.harga),
          id_kategori: defaultKat,
          foto: newProduk.foto,
          stok_awal: parseInt(newProduk.stok_awal, 10) || 0,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setIsAddingProduk(false);
      setNewProduk({
        nama_barang: "",
        harga: "",
        id_kategori: "1",
        foto: "",
        stok_awal: "10",
      });
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menambah produk: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const startEditProduk = (item) => {
    setEditingProdukId(item.id_barang);
    setEditProdukForm({
      nama_barang: item.nama_barang,
      harga: item.harga,
      foto: item.foto || "",
      jumlah_stok: getStokForStore(item.id_barang, selectedStoreTab),
    });
  };

  const handleSaveEditProduk = async (id_barang) => {
    if (!editProdukForm.nama_barang.trim() || editProdukForm.harga === "") {
      alert("Nama barang dan harga tidak boleh kosong!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/produk/${id_barang}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify({
          nama_barang: editProdukForm.nama_barang,
          harga: Number(editProdukForm.harga),
          foto: editProdukForm.foto,
          id_toko: selectedStoreTab,
          jumlah_stok: parseInt(editProdukForm.jumlah_stok, 10) || 0,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setEditingProdukId(null);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menyimpan perubahan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduk = async (id_barang, nama_barang) => {
    if (
      !window.confirm(
        `Yakin ingin menghapus produk "${nama_barang}" beserta stoknya di semua cabang?`,
      )
    ) {
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/produk/${id_barang}`, {
        method: "DELETE",
        headers: adminHeaders(),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menghapus produk: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // HANDLER CRUD LAYANAN (INLINE)
  // ==========================================
  const handleCreateLayanan = async () => {
    if (
      !newLayanan.nama_layanan.trim() ||
      newLayanan.harga === "" ||
      !newLayanan.deskripsi.trim()
    ) {
      alert("Nama layanan, harga, dan deskripsi wajib diisi!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/layanan`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify({
          nama_layanan: newLayanan.nama_layanan,
          harga: Number(newLayanan.harga),
          deskripsi: newLayanan.deskripsi,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setIsAddingLayanan(false);
      setNewLayanan({ nama_layanan: "", harga: "", deskripsi: "" });
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menambah layanan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const startEditLayanan = (srv) => {
    setEditingLayananId(srv.id_layanan);
    setEditLayananForm({
      nama_layanan: srv.nama_layanan,
      harga: srv.harga,
      deskripsi: srv.deskripsi || "",
    });
  };

  const handleSaveEditLayanan = async (id_layanan) => {
    if (
      !editLayananForm.nama_layanan.trim() ||
      editLayananForm.harga === "" ||
      !editLayananForm.deskripsi.trim()
    ) {
      alert("Nama layanan, harga, dan deskripsi tidak boleh kosong!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/layanan/${id_layanan}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify({
          nama_layanan: editLayananForm.nama_layanan,
          harga: Number(editLayananForm.harga),
          deskripsi: editLayananForm.deskripsi,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setEditingLayananId(null);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menyimpan layanan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLayanan = async (id_layanan, nama_layanan) => {
    if (!window.confirm(`Yakin ingin menghapus layanan "${nama_layanan}"?`))
      return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/layanan/${id_layanan}`, {
        method: "DELETE",
        headers: adminHeaders(),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal menghapus layanan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // HANDLER TRANSAKSI, BOOKING & EXPORT
  // ==========================================
  const handleUpdateTransaksi = async (id_transaksi, newStatus) => {
    setUpdatingId(id_transaksi);
    try {
      const res = await fetch(
        `${API_BASE}/admin/transaksi/${id_transaksi}/status`,
        {
          method: "PUT",
          headers: adminHeaders(),
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal memperbarui transaksi: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateBooking = async (id_booking, newStatus) => {
    setUpdatingId(id_booking);
    try {
      const res = await fetch(
        `${API_BASE}/admin/booking/${id_booking}/status`,
        {
          method: "PUT",
          headers: adminHeaders(),
          body: JSON.stringify({ status_booking: newStatus }),
        },
      );
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      await fetchAllData();
    } catch (err) {
      alert(`Gagal memperbarui booking: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "ID Transaksi",
      "Cabang Toko",
      "Tanggal",
      "Nama Pelanggan",
      "Kategori",
      "Nama Item",
      "Jumlah",
      "Harga Satuan",
      "Subtotal",
      "Status",
    ];

    const rows = filteredRecords.map((r) => [
      `#${r.id_transaksi}`,
      `"${r.nama_toko || "MEUW Petshop - Jakarta Pusat"}"`,
      new Date(r.tanggal).toLocaleDateString("id-ID"),
      `"${r.nama_pelanggan}"`,
      r.kategori_laporan,
      `"${r.nama_item}"`,
      r.jumlah,
      r.harga_satuan,
      r.subtotal,
      r.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Laporan_MEUW_Petshop_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("selected_store");
    navigate("/login");
  };

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);

  const filteredRecords = records.filter(
    (item) =>
      item.nama_item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nama_toko || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(item.id_transaksi).includes(searchQuery),
  );

  const filteredCatalog = catalogList.filter(
    (item) =>
      item.nama_barang.toLowerCase().includes(katalogSearch.toLowerCase()) ||
      String(item.id_barang).includes(katalogSearch),
  );

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "SELESAI" || s === "LUNAS")
      return { bg: "#DCFCE7", color: "#166534", border: "#86EFAC" };
    if (s === "DIPROSES")
      return { bg: "#DBEAFE", color: "#1E40AF", border: "#93C5FD" };
    if (s === "DIBATALKAN")
      return { bg: "#FEE2E2", color: "#991B1B", border: "#FCA5A5" };
    return { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047" };
  };

  if (!adminUser || adminUser.role !== "admin") return null;

  const currentStoreObj =
    STORES_LIST.find((s) => s.id_toko === selectedStoreTab) || STORES_LIST[0];

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: #FFFFFF !important; }
          .main-content { padding: 0 !important; margin: 0 !important; width: 100% !important; }
        }
      `}</style>

      {/* SIDEBAR NAVIGASI ADMIN */}
      <aside style={styles.sidebar} className="no-print">
        <div>
          <div style={styles.brandBox}>
            <span style={{ fontSize: "28px" }}>🐾</span>
            <div>
              <h2 style={styles.brandTitle}>MEUW Admin</h2>
              <span style={styles.brandSub}>Management & Report</span>
            </div>
          </div>

          <nav style={styles.navList}>
            <button
              onClick={() => setActiveTab("laporan")}
              style={{
                ...styles.navBtn,
                ...(activeTab === "laporan" ? styles.navBtnActive : {}),
              }}
            >
              <FileSpreadsheet size={18} />
              <span>Dashboard & Laporan</span>
            </button>

            <button
              onClick={() => setActiveTab("transaksi")}
              style={{
                ...styles.navBtn,
                ...(activeTab === "transaksi" ? styles.navBtnActive : {}),
              }}
            >
              <ShoppingBag size={18} />
              <span>Kelola Transaksi</span>
              <span style={styles.navBadge}>{transaksiList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("booking")}
              style={{
                ...styles.navBtn,
                ...(activeTab === "booking" ? styles.navBtnActive : {}),
              }}
            >
              <CalendarClock size={18} />
              <span>Jadwal Booking</span>
              <span style={styles.navBadge}>{bookingList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("katalog")}
              style={{
                ...styles.navBtn,
                ...(activeTab === "katalog" ? styles.navBtnActive : {}),
              }}
            >
              <Package size={18} />
              <span>Data Produk & Layanan</span>
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <div style={styles.adminProfile}>
            <div style={styles.avatar}>
              {(adminUser.nama || "A").charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={styles.adminName}>{adminUser.nama}</div>
              <div style={styles.adminRole}>Administrator</div>
            </div>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main style={styles.mainContent} className="main-content">
        <div
          style={{
            display: "none",
            marginBottom: "20px",
            borderBottom: "2px solid #F7ADAD",
            paddingBottom: "12px",
          }}
          className="print-only"
        >
          <h1 style={{ margin: 0, fontSize: "22px", color: "#4A3B3B" }}>
            LAPORAN PENJUALAN & LAYANAN — MEUW PETSHOP
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
            Dicetak oleh: {adminUser.nama} | Tanggal Cetak:{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <header style={styles.topHeader} className="no-print">
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === "laporan" && "Dashboard & Laporan Penjualan"}
              {activeTab === "transaksi" && "Manajemen Transaksi Pelanggan"}
              {activeTab === "booking" && "Manajemen Booking Layanan"}
              {activeTab === "katalog" &&
                "Master Data Produk, Stok Cabang & Layanan"}
            </h1>
            <p style={styles.pageSubtitle}>
              {activeTab === "katalog"
                ? "Kelola produk, edit stok per cabang toko secara langsung, dan atur tarif layanan."
                : "Pantau performa penjualan tiap cabang, status pesanan, dan cetak laporan resmi MEUW Petshop."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={fetchAllData}
              style={styles.btnSecondary}
              disabled={loading}
            >
              <RefreshCw size={16} />
              <span>{loading ? "Memuat..." : "Refresh Data"}</span>
            </button>

            {activeTab === "laporan" && (
              <>
                <button onClick={handleExportCSV} style={styles.btnMint}>
                  <Download size={16} />
                  <span>Export CSV / Excel</span>
                </button>
                <button onClick={handlePrint} style={styles.btnCoral}>
                  <Printer size={16} />
                  <span>Cetak Laporan (PDF)</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* ================= TAB 1: DASHBOARD & LAPORAN ================= */}
        {activeTab === "laporan" && (
          <>
            <div style={styles.kpiGrid}>
              <div style={styles.kpiCard}>
                <div
                  style={{
                    ...styles.kpiIcon,
                    backgroundColor: "#DCFCE7",
                    color: "#15803D",
                  }}
                >
                  <TrendingUp size={22} />
                </div>
                <div>
                  <span style={styles.kpiLabel}>Total Pendapatan Valid</span>
                  <h3 style={styles.kpiValue}>
                    {formatRupiah(summary.total_pendapatan)}
                  </h3>
                  <span style={styles.kpiHint}>Status Diproses & Selesai</span>
                </div>
              </div>

              <div style={styles.kpiCard}>
                <div
                  style={{
                    ...styles.kpiIcon,
                    backgroundColor: "#E0F2FE",
                    color: "#0369A1",
                  }}
                >
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span style={styles.kpiLabel}>Total Transaksi</span>
                  <h3 style={styles.kpiValue}>
                    {summary.total_transaksi} Transaksi
                  </h3>
                  <span style={styles.kpiHint}>
                    {summary.total_item_terjual} item terjual
                  </span>
                </div>
              </div>

              <div style={styles.kpiCard}>
                <div
                  style={{
                    ...styles.kpiIcon,
                    backgroundColor: "#FCE7F3",
                    color: "#BE185D",
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <span style={styles.kpiLabel}>Total Booking Layanan</span>
                  <h3 style={styles.kpiValue}>
                    {summary.total_booking} Jadwal
                  </h3>
                  <span style={styles.kpiHint}>
                    {summary.total_produk} katalog aktif
                  </span>
                </div>
              </div>

              <div style={styles.kpiCard}>
                <div
                  style={{
                    ...styles.kpiIcon,
                    backgroundColor: "#FEF3C7",
                    color: "#B45309",
                  }}
                >
                  <Award size={22} />
                </div>
                <div>
                  <span style={styles.kpiLabel}>Item Terlaris</span>
                  <h3 style={{ ...styles.kpiValue, fontSize: "16px" }}>
                    {summary.item_terlaris}
                  </h3>
                  <span style={styles.kpiHint}>Berdasarkan volume pesanan</span>
                </div>
              </div>
            </div>

            <div style={styles.filterBar} className="no-print">
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Cabang Toko</label>
                <select
                  value={cabangFilter}
                  onChange={(e) => setCabangFilter(e.target.value)}
                  style={styles.inputControl}
                >
                  <option value="semua">Semua Cabang (4 Toko)</option>
                  {STORES_LIST.map((st) => (
                    <option key={st.id_toko} value={st.id_toko}>
                      {st.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Dari Tanggal</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.inputControl}
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sampai Tanggal</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.inputControl}
                />
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Kategori</label>
                <select
                  value={jenisLaporan}
                  onChange={(e) => setJenisLaporan(e.target.value)}
                  style={styles.inputControl}
                >
                  <option value="semua">Semua (Produk & Layanan)</option>
                  <option value="produk">Produk Saja</option>
                  <option value="layanan">Layanan Saja</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={styles.inputControl}
                >
                  <option value="semua">Semua Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

              <div
                style={{ ...styles.filterGroup, flex: 1, minWidth: "180px" }}
              >
                <label style={styles.filterLabel}>Cari Item / Pelanggan</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Search
                    size={15}
                    style={{
                      position: "absolute",
                      left: "10px",
                      color: "#998888",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Cari nama item / pelanggan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      ...styles.inputControl,
                      paddingLeft: "32px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={styles.tableCard}>
              <div style={styles.tableHeader}>
                <h3 style={styles.tableTitle}>
                  Rincian Rekapitulasi Transaksi ({filteredRecords.length}{" "}
                  Baris)
                </h3>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID Trx</th>
                      <th style={styles.th}>Cabang Toko</th>
                      <th style={styles.th}>Tanggal</th>
                      <th style={styles.th}>Pelanggan</th>
                      <th style={styles.th}>Kategori</th>
                      <th style={styles.th}>Nama Produk / Layanan</th>
                      <th style={{ ...styles.th, textAlign: "center" }}>Qty</th>
                      <th style={{ ...styles.th, textAlign: "right" }}>
                        Subtotal
                      </th>
                      <th style={{ ...styles.th, textAlign: "center" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan="9" style={styles.emptyCell}>
                          Belum ada data transaksi pada filter periode/cabang
                          ini.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((row, idx) => {
                        const badge = getStatusBadge(row.status);
                        return (
                          <tr
                            key={`${row.id_referensi}-${idx}`}
                            style={styles.tr}
                          >
                            <td style={styles.td}>
                              <strong>#{row.id_transaksi}</strong>
                            </td>
                            <td style={styles.td}>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  color: "#665151",
                                }}
                              >
                                {row.nama_toko || "Jakarta Pusat"}
                              </span>
                            </td>
                            <td style={styles.td}>
                              {new Date(row.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td style={styles.td}>{row.nama_pelanggan}</td>
                            <td style={styles.td}>
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "12px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  backgroundColor:
                                    row.kategori_laporan === "Produk"
                                      ? "#FFE4E6"
                                      : "#E0F2FE",
                                  color:
                                    row.kategori_laporan === "Produk"
                                      ? "#BE123C"
                                      : "#0369A1",
                                }}
                              >
                                {row.kategori_laporan}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <div
                                style={{ fontWeight: "600", color: "#4A3B3B" }}
                              >
                                {row.nama_item}
                              </div>
                              {row.jadwal_booking && (
                                <div
                                  style={{ fontSize: "11px", color: "#887777" }}
                                >
                                  Jadwal:{" "}
                                  {new Date(
                                    row.jadwal_booking.tanggal_mulai,
                                  ).toLocaleDateString("id-ID")}{" "}
                                  ({row.jadwal_booking.jam_mulai})
                                </div>
                              )}
                            </td>
                            <td style={{ ...styles.td, textAlign: "center" }}>
                              {row.jumlah}
                            </td>
                            <td
                              style={{
                                ...styles.td,
                                textAlign: "right",
                                fontWeight: "700",
                              }}
                            >
                              {formatRupiah(row.subtotal)}
                            </td>
                            <td style={{ ...styles.td, textAlign: "center" }}>
                              <span
                                style={{
                                  padding: "4px 10px",
                                  borderRadius: "20px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  backgroundColor: badge.bg,
                                  color: badge.color,
                                  border: `1px solid ${badge.border}`,
                                }}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  {filteredRecords.length > 0 && (
                    <tfoot>
                      <tr style={{ backgroundColor: "#FFF5F5" }}>
                        <td
                          colSpan="7"
                          style={{
                            ...styles.td,
                            textAlign: "right",
                            fontWeight: "800",
                          }}
                        >
                          TOTAL KESELURUHAN TABEL:
                        </td>
                        <td
                          style={{
                            ...styles.td,
                            textAlign: "right",
                            fontWeight: "800",
                            fontSize: "15px",
                            color: "#BE123C",
                          }}
                        >
                          {formatRupiah(
                            filteredRecords.reduce(
                              (acc, item) => acc + item.subtotal,
                              0,
                            ),
                          )}
                        </td>
                        <td style={styles.td}></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </>
        )}

        {/* ================= TAB 2: KELOLA TRANSAKSI ================= */}
        {activeTab === "transaksi" && (
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>
                Daftar Seluruh Transaksi ({transaksiList.length})
              </h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID Transaksi</th>
                    <th style={styles.th}>ID User</th>
                    <th style={styles.th}>Cabang</th>
                    <th style={styles.th}>Tanggal</th>
                    <th style={{ ...styles.th, textAlign: "right" }}>
                      Total Harga
                    </th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Status
                    </th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Ubah Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transaksiList.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={styles.emptyCell}>
                        Belum ada data transaksi di database.
                      </td>
                    </tr>
                  ) : (
                    transaksiList.map((trx) => {
                      const badge = getStatusBadge(trx.status);
                      return (
                        <tr key={trx.id_transaksi} style={styles.tr}>
                          <td style={styles.td}>
                            <strong>#{trx.id_transaksi}</strong>
                          </td>
                          <td style={styles.td}>User #{trx.id_user}</td>
                          <td style={styles.td}>
                            Cabang #{trx.id_toko || "1"}
                          </td>
                          <td style={styles.td}>
                            {new Date(trx.tanggal).toLocaleDateString("id-ID")}
                          </td>
                          <td
                            style={{
                              ...styles.td,
                              textAlign: "right",
                              fontWeight: "700",
                            }}
                          >
                            {formatRupiah(trx.total_harga)}
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <span
                              style={{
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "700",
                                backgroundColor: badge.bg,
                                color: badge.color,
                              }}
                            >
                              {trx.status}
                            </span>
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <select
                              value={trx.status}
                              disabled={updatingId === trx.id_transaksi}
                              onChange={(e) =>
                                handleUpdateTransaksi(
                                  trx.id_transaksi,
                                  e.target.value,
                                )
                              }
                              style={styles.inputControl}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Diproses">Diproses</option>
                              <option value="Selesai">Selesai</option>
                              <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: KELOLA BOOKING LAYANAN ================= */}
        {activeTab === "booking" && (
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>
                Jadwal Booking Layanan ({bookingList.length})
              </h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID Booking</th>
                    <th style={styles.th}>ID Detail Layanan</th>
                    <th style={styles.th}>Tanggal Mulai</th>
                    <th style={styles.th}>Jam</th>
                    <th style={styles.th}>Tanggal Selesai</th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Status Booking
                    </th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      Aksi Admin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookingList.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={styles.emptyCell}>
                        Belum ada jadwal booking layanan masuk.
                      </td>
                    </tr>
                  ) : (
                    bookingList.map((bk) => {
                      const badge = getStatusBadge(bk.status_booking);
                      return (
                        <tr key={bk.id_booking} style={styles.tr}>
                          <td style={styles.td}>
                            <strong>#{bk.id_booking}</strong>
                          </td>
                          <td style={styles.td}>#{bk.id_detail_layanan}</td>
                          <td style={styles.td}>
                            {new Date(bk.tanggal_mulai).toLocaleDateString(
                              "id-ID",
                            )}
                          </td>
                          <td style={styles.td}>{bk.jam_mulai}</td>
                          <td style={styles.td}>
                            {new Date(bk.tanggal_selesai).toLocaleDateString(
                              "id-ID",
                            )}
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <span
                              style={{
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "700",
                                backgroundColor: badge.bg,
                                color: badge.color,
                              }}
                            >
                              {bk.status_booking}
                            </span>
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <select
                              value={bk.status_booking}
                              disabled={updatingId === bk.id_booking}
                              onChange={(e) =>
                                handleUpdateBooking(
                                  bk.id_booking,
                                  e.target.value,
                                )
                              }
                              style={styles.inputControl}
                            >
                              <option value="MENUNGGU KONFIRMASI">
                                MENUNGGU KONFIRMASI
                              </option>
                              <option value="DIPROSES">DIPROSES</option>
                              <option value="SELESAI">SELESAI</option>
                              <option value="DIBATALKAN">DIBATALKAN</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CRUD PRODUK, STOK CABANG & LAYANAN ================= */}
        {activeTab === "katalog" && (
          <div style={{ display: "grid", gap: "28px" }}>
            {/* PANEL PILIH CABANG UNTUK KELOLA STOK */}
            <div style={styles.storeSwitcherCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <Store size={20} color="#E07A7A" />
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#4A3B3B",
                    }}
                  >
                    Pilih Cabang Toko untuk Kelola Stok:
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#776B6B" }}>
                    Klik tab cabang di bawah untuk melihat dan mengedit stok
                    khusus cabang tersebut langsung di tabel.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {STORES_LIST.map((st) => {
                  const isSelected = selectedStoreTab === st.id_toko;
                  return (
                    <button
                      key={st.id_toko}
                      onClick={() => {
                        setSelectedStoreTab(st.id_toko);
                        setEditingProdukId(null);
                      }}
                      style={{
                        padding: "9px 16px",
                        borderRadius: "14px",
                        border: isSelected
                          ? "2px solid #E07A7A"
                          : "2px solid #E5DEC9",
                        backgroundColor: isSelected ? "#F7ADAD" : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "#665151",
                        fontWeight: "700",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      🏪 Cabang #{st.id_toko} — {st.nama}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TABEL 1: DAFTAR PRODUK KATALOG + INLINE EDIT STOK CABANG */}
            <div style={styles.tableCard}>
              <div
                style={{
                  ...styles.tableHeader,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h3 style={styles.tableTitle}>
                    Daftar Produk Katalog ({filteredCatalog.length}) — Stok{" "}
                    {currentStoreObj.nama}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Search
                      size={14}
                      style={{
                        position: "absolute",
                        left: "10px",
                        color: "#998888",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Cari nama produk..."
                      value={katalogSearch}
                      onChange={(e) => setKatalogSearch(e.target.value)}
                      style={{
                        ...styles.inputControl,
                        paddingLeft: "30px",
                        width: "200px",
                      }}
                    />
                  </div>

                  <button
                    onClick={() => setIsAddingProduk(true)}
                    style={styles.btnCoral}
                    disabled={isAddingProduk}
                  >
                    <Plus size={16} />
                    <span>Tambah Produk</span>
                  </button>
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Foto</th>
                      <th style={styles.th}>Nama Barang</th>
                      <th style={{ ...styles.th, textAlign: "right" }}>
                        Harga
                      </th>
                      <th style={{ ...styles.th, textAlign: "center" }}>
                        Stok ({currentStoreObj.nama.split(" ")[1]})
                      </th>
                      <th style={{ ...styles.th, textAlign: "center" }}>
                        Aksi Langsung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* BARIS TAMBAH PRODUK BARU (INLINE) */}
                    {isAddingProduk && (
                      <tr
                        style={{
                          backgroundColor: "#FFF5F5",
                          borderBottom: "2px solid #F7ADAD",
                        }}
                      >
                        <td style={styles.td}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "800",
                              color: "#E07A7A",
                            }}
                          >
                            BARU
                          </span>
                        </td>
                        <td style={styles.td}>
                          <input
                            type="text"
                            placeholder="URL Foto (opsional)"
                            value={newProduk.foto}
                            onChange={(e) =>
                              setNewProduk({
                                ...newProduk,
                                foto: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "130px",
                              fontSize: "12px",
                            }}
                          />
                        </td>
                        <td style={styles.td}>
                          <input
                            type="text"
                            placeholder="Nama barang baru..."
                            value={newProduk.nama_barang}
                            onChange={(e) =>
                              setNewProduk({
                                ...newProduk,
                                nama_barang: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "100%",
                              minWidth: "180px",
                            }}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "right" }}>
                          <input
                            type="number"
                            placeholder="Harga (Rp)"
                            value={newProduk.harga}
                            onChange={(e) =>
                              setNewProduk({
                                ...newProduk,
                                harga: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "120px",
                              textAlign: "right",
                            }}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <input
                            type="number"
                            min="0"
                            title="Stok awal untuk semua cabang"
                            value={newProduk.stok_awal}
                            onChange={(e) =>
                              setNewProduk({
                                ...newProduk,
                                stok_awal: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "75px",
                              textAlign: "center",
                            }}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <button
                              onClick={handleCreateProduk}
                              disabled={saving}
                              style={styles.actionSaveBtn}
                              title="Simpan Produk Baru"
                            >
                              <Check size={15} /> Simpan
                            </button>
                            <button
                              onClick={() => setIsAddingProduk(false)}
                              style={styles.actionCancelBtn}
                              title="Batal"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* DAFTAR PRODUK */}
                    {filteredCatalog.map((item) => {
                      const isEditing = editingProdukId === item.id_barang;
                      const stokSaatIni = getStokForStore(
                        item.id_barang,
                        selectedStoreTab,
                      );

                      return (
                        <tr
                          key={item.id_barang}
                          style={{
                            ...styles.tr,
                            backgroundColor: isEditing
                              ? "#FFFBEB"
                              : "transparent",
                          }}
                        >
                          <td style={styles.td}>#{item.id_barang}</td>

                          {/* FOTO */}
                          <td style={styles.td}>
                            {isEditing ? (
                              <input
                                type="text"
                                placeholder="URL Foto"
                                value={editProdukForm.foto}
                                onChange={(e) =>
                                  setEditProdukForm({
                                    ...editProdukForm,
                                    foto: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "120px",
                                  fontSize: "12px",
                                }}
                              />
                            ) : item.foto ? (
                              <img
                                src={
                                  item.foto.startsWith("http")
                                    ? item.foto
                                    : `https://meuw-petshop-server.vercel.app${item.foto}`
                                }
                                alt={item.nama_barang}
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: "1px solid #F7ADAD",
                                }}
                              />
                            ) : (
                              "-"
                            )}
                          </td>

                          {/* NAMA BARANG */}
                          <td style={styles.td}>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editProdukForm.nama_barang}
                                onChange={(e) =>
                                  setEditProdukForm({
                                    ...editProdukForm,
                                    nama_barang: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "100%",
                                  minWidth: "180px",
                                }}
                              />
                            ) : (
                              <strong>{item.nama_barang}</strong>
                            )}
                          </td>

                          {/* HARGA */}
                          <td
                            style={{
                              ...styles.td,
                              textAlign: "right",
                              fontWeight: "700",
                            }}
                          >
                            {isEditing ? (
                              <input
                                type="number"
                                value={editProdukForm.harga}
                                onChange={(e) =>
                                  setEditProdukForm({
                                    ...editProdukForm,
                                    harga: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "120px",
                                  textAlign: "right",
                                }}
                              />
                            ) : (
                              formatRupiah(item.harga)
                            )}
                          </td>

                          {/* STOK CABANG AKTIF */}
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={editProdukForm.jumlah_stok}
                                onChange={(e) =>
                                  setEditProdukForm({
                                    ...editProdukForm,
                                    jumlah_stok: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "75px",
                                  textAlign: "center",
                                  fontWeight: "800",
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  fontSize: "12px",
                                  fontWeight: "800",
                                  backgroundColor:
                                    stokSaatIni <= 5 ? "#FEE2E2" : "#DCFCE7",
                                  color:
                                    stokSaatIni <= 5 ? "#991B1B" : "#166534",
                                }}
                              >
                                {stokSaatIni} pcs
                              </span>
                            )}
                          </td>

                          {/* TOMBOL AKSI INLINE */}
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            {isEditing ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "6px",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleSaveEditProduk(item.id_barang)
                                  }
                                  disabled={saving}
                                  style={styles.actionSaveBtn}
                                >
                                  <Check size={14} /> Simpan
                                </button>
                                <button
                                  onClick={() => setEditingProdukId(null)}
                                  style={styles.actionCancelBtn}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "6px",
                                }}
                              >
                                <button
                                  onClick={() => startEditProduk(item)}
                                  style={styles.actionEditBtn}
                                  title="Edit Produk & Stok Cabang"
                                >
                                  <Pencil size={14} /> Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduk(
                                      item.id_barang,
                                      item.nama_barang,
                                    )
                                  }
                                  style={styles.actionDeleteBtn}
                                  title="Hapus Produk"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 2: DAFTAR LAYANAN PETSHOP + INLINE CRUD */}
            <div style={styles.tableCard}>
              <div
                style={{
                  ...styles.tableHeader,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <h3 style={styles.tableTitle}>
                  Daftar Layanan Petshop ({layananList.length})
                </h3>
                <button
                  onClick={() => setIsAddingLayanan(true)}
                  style={styles.btnCoral}
                  disabled={isAddingLayanan}
                >
                  <Plus size={16} />
                  <span>Tambah Layanan</span>
                </button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Nama Layanan</th>
                      <th style={styles.th}>Deskripsi</th>
                      <th style={{ ...styles.th, textAlign: "right" }}>
                        Harga
                      </th>
                      <th style={{ ...styles.th, textAlign: "center" }}>
                        Aksi Langsung
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* BARIS TAMBAH LAYANAN BARU (INLINE) */}
                    {isAddingLayanan && (
                      <tr
                        style={{
                          backgroundColor: "#FFF5F5",
                          borderBottom: "2px solid #F7ADAD",
                        }}
                      >
                        <td style={styles.td}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "800",
                              color: "#E07A7A",
                            }}
                          >
                            BARU
                          </span>
                        </td>
                        <td style={styles.td}>
                          <input
                            type="text"
                            placeholder="Nama layanan baru..."
                            value={newLayanan.nama_layanan}
                            onChange={(e) =>
                              setNewLayanan({
                                ...newLayanan,
                                nama_layanan: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "100%",
                              minWidth: "160px",
                            }}
                          />
                        </td>
                        <td style={styles.td}>
                          <input
                            type="text"
                            placeholder="Deskripsi layanan..."
                            value={newLayanan.deskripsi}
                            onChange={(e) =>
                              setNewLayanan({
                                ...newLayanan,
                                deskripsi: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "100%",
                              minWidth: "200px",
                            }}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "right" }}>
                          <input
                            type="number"
                            placeholder="Harga (Rp)"
                            value={newLayanan.harga}
                            onChange={(e) =>
                              setNewLayanan({
                                ...newLayanan,
                                harga: e.target.value,
                              })
                            }
                            style={{
                              ...styles.inputControl,
                              width: "120px",
                              textAlign: "right",
                            }}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <button
                              onClick={handleCreateLayanan}
                              disabled={saving}
                              style={styles.actionSaveBtn}
                            >
                              <Check size={14} /> Simpan
                            </button>
                            <button
                              onClick={() => setIsAddingLayanan(false)}
                              style={styles.actionCancelBtn}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* DAFTAR LAYANAN */}
                    {layananList.map((srv) => {
                      const isEditing = editingLayananId === srv.id_layanan;
                      return (
                        <tr
                          key={srv.id_layanan}
                          style={{
                            ...styles.tr,
                            backgroundColor: isEditing
                              ? "#FFFBEB"
                              : "transparent",
                          }}
                        >
                          <td style={styles.td}>#{srv.id_layanan}</td>
                          <td style={styles.td}>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editLayananForm.nama_layanan}
                                onChange={(e) =>
                                  setEditLayananForm({
                                    ...editLayananForm,
                                    nama_layanan: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "100%",
                                  minWidth: "160px",
                                }}
                              />
                            ) : (
                              <strong>{srv.nama_layanan}</strong>
                            )}
                          </td>
                          <td style={styles.td}>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editLayananForm.deskripsi}
                                onChange={(e) =>
                                  setEditLayananForm({
                                    ...editLayananForm,
                                    deskripsi: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "100%",
                                  minWidth: "200px",
                                }}
                              />
                            ) : (
                              srv.deskripsi
                            )}
                          </td>
                          <td
                            style={{
                              ...styles.td,
                              textAlign: "right",
                              fontWeight: "700",
                            }}
                          >
                            {isEditing ? (
                              <input
                                type="number"
                                value={editLayananForm.harga}
                                onChange={(e) =>
                                  setEditLayananForm({
                                    ...editLayananForm,
                                    harga: e.target.value,
                                  })
                                }
                                style={{
                                  ...styles.inputControl,
                                  width: "120px",
                                  textAlign: "right",
                                }}
                              />
                            ) : (
                              formatRupiah(srv.harga)
                            )}
                          </td>
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            {isEditing ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "6px",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleSaveEditLayanan(srv.id_layanan)
                                  }
                                  disabled={saving}
                                  style={styles.actionSaveBtn}
                                >
                                  <Check size={14} /> Simpan
                                </button>
                                <button
                                  onClick={() => setEditingLayananId(null)}
                                  style={styles.actionCancelBtn}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "6px",
                                }}
                              >
                                <button
                                  onClick={() => startEditLayanan(srv)}
                                  style={styles.actionEditBtn}
                                >
                                  <Pencil size={14} /> Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteLayanan(
                                      srv.id_layanan,
                                      srv.nama_layanan,
                                    )
                                  }
                                  style={styles.actionDeleteBtn}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F8F5EE",
    fontFamily: "'Quicksand', 'Poppins', 'Segoe UI', sans-serif",
    color: "#4A3B3B",
    textAlign: "left",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#FFFDF6",
    borderRight: "2px solid #F7ADAD",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 10px 20px 10px",
    borderBottom: "2px dashed #F7ADAD",
    marginBottom: "20px",
  },
  brandTitle: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "800",
    color: "#E07A7A",
  },
  brandSub: { fontSize: "11px", color: "#887777", fontWeight: "600" },
  navList: { display: "flex", flexDirection: "column", gap: "8px" },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "transparent",
    color: "#665151",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
  },
  navBtnActive: {
    backgroundColor: "#F7ADAD",
    color: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(247, 173, 173, 0.4)",
  },
  navBadge: {
    marginLeft: "auto",
    backgroundColor: "#FFFDF6",
    color: "#E07A7A",
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "10px",
    fontWeight: "800",
  },
  sidebarFooter: {
    borderTop: "2px dashed #F7ADAD",
    paddingTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  adminProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#B1E5E6",
    color: "#225B5C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    flexShrink: 0,
  },
  adminName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#4A3B3B",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  adminRole: { fontSize: "11px", color: "#E07A7A", fontWeight: "600" },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px",
    borderRadius: "12px",
    border: "2px solid #F7ADAD",
    backgroundColor: "#FFF5F5",
    color: "#D9534F",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  mainContent: { flex: 1, padding: "28px 32px", overflowY: "auto" },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  pageTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    color: "#4A3B3B",
  },
  pageSubtitle: { margin: "4px 0 0 0", fontSize: "13px", color: "#776B6B" },
  btnSecondary: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 14px",
    borderRadius: "12px",
    border: "2px solid #E5DEC9",
    backgroundColor: "#FFFDF6",
    color: "#665151",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  btnMint: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "2px solid #91DCDE",
    backgroundColor: "#B1E5E6",
    color: "#225B5C",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  btnCoral: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 15px",
    borderRadius: "12px",
    border: "2px solid #E07A7A",
    backgroundColor: "#F7ADAD",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  kpiCard: {
    backgroundColor: "#FFFDF6",
    border: "2px solid #F7ADAD",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 4px 12px rgba(247, 173, 173, 0.15)",
  },
  kpiIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  kpiLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#887777",
    display: "block",
  },
  kpiValue: {
    margin: "2px 0",
    fontSize: "20px",
    fontWeight: "800",
    color: "#4A3B3B",
  },
  kpiHint: { fontSize: "11px", color: "#998888" },
  storeSwitcherCard: {
    backgroundColor: "#FFFDF6",
    border: "2px solid #F7ADAD",
    borderRadius: "20px",
    padding: "18px 20px",
    boxShadow: "0 4px 12px rgba(247, 173, 173, 0.12)",
  },
  filterBar: {
    backgroundColor: "#FFFDF6",
    border: "2px solid #E5DEC9",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "20px",
    alignItems: "flex-end",
  },
  filterGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  filterLabel: { fontSize: "11px", fontWeight: "700", color: "#665151" },
  inputControl: {
    padding: "7px 11px",
    borderRadius: "10px",
    border: "1.5px solid #F7ADAD",
    backgroundColor: "#FFFFFF",
    fontSize: "13px",
    color: "#4A3B3B",
    outline: "none",
  },
  tableCard: {
    backgroundColor: "#FFFDF6",
    border: "2px solid #F7ADAD",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(247, 173, 173, 0.15)",
  },
  tableHeader: {
    padding: "16px 20px",
    borderBottom: "2px solid #FDE8E8",
    backgroundColor: "#FFF8F8",
  },
  tableTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "800",
    color: "#4A3B3B",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    backgroundColor: "#FFF5F5",
    color: "#665151",
    fontWeight: "700",
    borderBottom: "2px solid #F7ADAD",
    whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #F3ECE0" },
  td: { padding: "12px 16px", color: "#4A3B3B", verticalAlign: "middle" },
  emptyCell: {
    padding: "32px",
    textAlign: "center",
    color: "#887777",
    fontStyle: "italic",
  },
  actionEditBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1.5px solid #91DCDE",
    backgroundColor: "#E6FAFA",
    color: "#225B5C",
    fontWeight: "700",
    fontSize: "12px",
    cursor: "pointer",
  },
  actionDeleteBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 9px",
    borderRadius: "8px",
    border: "1.5px solid #FCA5A5",
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    cursor: "pointer",
  },
  actionSaveBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 11px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#16A34A",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: "12px",
    cursor: "pointer",
  },
  actionCancelBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 9px",
    borderRadius: "8px",
    border: "1.5px solid #D6D3D1",
    backgroundColor: "#F5F5F4",
    color: "#57534E",
    cursor: "pointer",
  },
};
