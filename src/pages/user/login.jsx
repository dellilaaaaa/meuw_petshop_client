import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Ambil data seluruh user dari backend
      const response = await fetch('https://meuw-petshop-server.vercel.app/api/users');
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Gagal terhubung ke server.');
      }

      // Cari user yang email dan password-nya cocok
      const foundUser = result.data.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error('Email atau Password salah!');
      }

      // Simpan data user ke storage
      const userData = JSON.stringify(foundUser);
      if (rememberMe) {
        localStorage.setItem('user', userData);
      } else {
        sessionStorage.setItem('user', userData);
      }

      alert(`Selamat Datang, ${foundUser.nama}!`);
      navigate('/'); // Arahkan ke halaman utama/dashboard
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        
        {/* Header Melengkung */}
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <div style={styles.logoBadge}>🐾</div>
            <span style={styles.subtitle}>Welcome Home</span>
            <h1 style={styles.title}>Meuw PetShop</h1>
          </div>
          <div style={styles.headerWave}></div>
        </div>

        {/* Form Content */}
        <div style={styles.content}>
          <h2 style={styles.formTitle}>Log in Your Account</h2>

          {errorMsg && <p style={styles.errorMessage}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* Input Email */}
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div style={styles.flexRow}>
              <label style={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember Me
              </label>
              <a href="#forgot" style={styles.forgotLink}>Forgot Password?</a>
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
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          {/* Social Sign In */}
          <div style={styles.socialSection}>
            <p style={styles.socialText}>Or Continue With</p>
            <div style={styles.socialIcons}>
              <a href="#fb" style={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#ig" style={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#tw" style={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7ADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <p style={styles.registerText}>
            Don't have an account? <Link to="/register" style={styles.registerLink}>Sign Up</Link>
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
    maxWidth: '360px',
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
    padding: '30px 20px 20px 20px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  logoBadge: {
    fontSize: '32px',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  },
  subtitle: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1.5px',
    display: 'block',
    textTransform: 'uppercase',
    opacity: 0.9,
    marginTop: '4px',
  },
  title: {
    fontSize: '26px',
    margin: '2px 0 0 0',
    fontWeight: '800',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerWave: {
    height: '25px',
    backgroundColor: '#FFFDF6',
    borderTopLeftRadius: '50% 100%',
    borderTopRightRadius: '50% 100%',
    marginTop: '-1px',
  },
  content: {
    padding: '5px 25px 30px 25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formTitle: {
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: '700',
    color: '#665151',
    margin: '0 0 5px 0',
  },
  errorMessage: {
    color: '#D9534F',
    fontSize: '12px',
    textAlign: 'center',
    margin: '0 0 5px 0',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
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
    padding: '13px 16px 13px 46px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #F7ADAD',
    borderRadius: '25px',
    color: '#4A4A4A',
    fontSize: '13px',
    fontWeight: '500',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(247, 173, 173, 0.15)',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#776B6B',
    padding: '0 4px',
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  checkbox: {
    accentColor: '#F7ADAD',
    cursor: 'pointer',
    width: '14px',
    height: '14px',
  },
  forgotLink: {
    color: '#E07A7A',
    textDecoration: 'none',
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: '6px',
    width: '100%',
    padding: '13px',
    border: '2px solid #91DCDE',
    borderRadius: '25px',
    color: '#225B5C',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.25s ease',
  },
  socialSection: {
    marginTop: '5px',
    textAlign: 'center',
  },
  socialText: {
    fontSize: '11px',
    marginBottom: '10px',
    color: '#998888',
    fontWeight: '500',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#FFFDF6',
    border: '2px solid #F7ADAD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(247, 173, 173, 0.2)',
  },
  registerText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#776B6B',
    margin: '10px 0 0 0',
  },
  registerLink: {
    color: '#E07A7A',
    fontWeight: '700',
    textDecoration: 'none',
  },
};