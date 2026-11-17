import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_telp: '',
    alamat: '',
    password: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://meuw-petshop-server.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.nama,
          email: formData.email,
          no_telp: formData.no_telp,
          password: formData.password,
          alamat: formData.alamat,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Pendaftaran gagal. Silakan periksa kembali data Anda.');
      }

      alert('Akun berhasil dibuat! Silakan Log In.');
      navigate('/login');
    } catch (err) { //[cite: 2]
        let message = err.message; //[cite: 2]
        
        // Deteksi jika error disebabkan oleh Duplicate Key MongoDB[cite: 2]
        if (message.includes('E11000') || message.includes('duplicate key')) { //[cite: 2]
          if (message.includes('no_telp')) { //[cite: 2]
            message = 'Nomor telepon sudah terdaftar! Gunakan nomor telepon lain.'; //[cite: 2]
          } else if (message.includes('email')) { //[cite: 2]
            message = 'Email sudah terdaftar! Gunakan email lain.'; //[cite: 2]
          } else { //[cite: 2]
            message = 'Data sudah terdaftar dalam sistem.'; //[cite: 2]
          } //[cite: 2]
        } //[cite: 2]
        setErrorMsg(message); //[cite: 2]
    } finally {
        setLoading(false); // Tambahkan ini agar tombol bisa diklik lagi jika error
  }
  };
  

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        
        {/* Header Melengkung */}
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <div style={styles.logoBadge}>🐾</div>
            <span style={styles.subtitle}>Join Our Family</span>
            <h1 style={styles.title}>Meuw PetShop</h1>
          </div>
          <div style={styles.headerWave}></div>
        </div>

        {/* Form Content */}
        <div style={styles.content}>
          <h2 style={styles.formTitle}>Create New Account</h2>

          {errorMsg && <p style={styles.errorMessage}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* Input Nama Lengkap */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Input Email */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Input No Telepon */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input
                type="tel"
                name="no_telp"
                placeholder="No. Telepon"
                value={formData.no_telp}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Input Alamat */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                name="alamat"
                placeholder="Alamat Lengkap"
                value={formData.alamat}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Input Password */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Input Confirm Password */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                backgroundColor: isHovered ? '#CCFBFA' : '#B1E5E6',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p style={styles.loginText}>
            Already have an account? <Link to="/login" style={styles.loginLink}>Log In</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EFE6',
    fontFamily: "'Quicksand', 'Poppins', 'Segoe UI', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#FFFDF6',
    border: '3px solid #F7ADAD',
    borderRadius: '40px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(247, 173, 173, 0.35), 0 8px 15px rgba(0,0,0,0.05)',
  },
  headerContainer: {
    position: 'relative',
    backgroundColor: '#F7ADAD',
  },
  header: {
    backgroundColor: '#F7ADAD',
    padding: '24px 20px 16px 20px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  logoBadge: {
    fontSize: '30px',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  },
  subtitle: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1.5px',
    display: 'block',
    textTransform: 'uppercase',
    opacity: 0.9,
    marginTop: '2px',
  },
  title: {
    fontSize: '24px',
    margin: '2px 0 0 0',
    fontWeight: '800',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerWave: {
    height: '20px',
    backgroundColor: '#FFFDF6',
    borderTopLeftRadius: '50% 100%',
    borderTopRightRadius: '50% 100%',
    marginTop: '-1px',
  },
  content: {
    padding: '5px 25px 25px 25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formTitle: {
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: '700',
    color: '#665151',
    margin: '0 0 2px 0',
  },
  errorMessage: {
    color: '#D9534F',
    fontSize: '11px',
    textAlign: 'center',
    margin: '0 0 4px 0',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
  },
  input: {
    width: '100%',
    padding: '11px 16px 11px 46px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #F7ADAD',
    borderRadius: '25px',
    color: '#4A4A4A',
    fontSize: '12px',
    fontWeight: '500',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(247, 173, 173, 0.15)',
  },
  submitBtn: {
    marginTop: '6px',
    width: '100%',
    padding: '12px',
    border: '2px solid #91DCDE',
    borderRadius: '25px',
    color: '#225B5C',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.25s ease',
  },
  loginText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#776B6B',
    margin: '6px 0 0 0',
  },
  loginLink: {
    color: '#E07A7A',
    fontWeight: '700',
    textDecoration: 'none',
  },
};