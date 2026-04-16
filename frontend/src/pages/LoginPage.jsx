import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Link2 } from 'lucide-react';
import { supabase } from '../supabase';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/app');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        navigate('/app');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          background: #fef6ee;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          width: 45%;
          min-height: 100vh;
          padding: 3rem 5.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          background: #fff;
        }

        .logo {
          font-family: 'Sora', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #ea580c;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          letter-spacing: -0.03em;
        }
        .logo svg { color: #ea580c; }

        .form-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 0;
          max-width: 400px;
        }

        .greeting {
          font-family: 'Sora', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }
        .greeting span {
          color: #ea580c;
        }

        .subtext {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 2.2rem;
          line-height: 1.5;
        }

        .error-box {
          background: #fff1f0;
          border: 1px solid #fca5a5;
          color: #dc2626;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          margin-bottom: 1.2rem;
          font-weight: 500;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .field-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #444;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .input-wrap {
          position: relative;
        }
        .input-wrap svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #bbb;
          width: 16px;
          height: 16px;
          pointer-events: none;
        }
        .input-wrap input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.7rem;
          border: 1.5px solid #e8e8e8;
          border-radius: 14px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
          background: #fafafa;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }
        .input-wrap input:focus {
          border-color: #ea580c;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(234,88,12,0.08);
        }
        .input-wrap input::placeholder { color: #ccc; }

        .forgot-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forgot-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: #ea580c;
          text-decoration: none;
          margin-top: 0.4rem;
          display: block;
          text-align: right;
        }
        .forgot-link:hover { text-decoration: underline; }

        .btn-primary {
          width: 100%;
          padding: 0.95rem;
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          color: white;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 6px 20px rgba(234,88,12,0.35);
          letter-spacing: 0.01em;
          margin-bottom: 1rem;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(234,88,12,0.45);
        }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0 1rem;
          color: #ccc;
          font-size: 0.78rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #eee;
        }

        .btn-google {
          width: 100%;
          padding: 0.85rem;
          background: white;
          color: #333;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1.5px solid #e8e8e8;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .btn-google:hover {
          border-color: #ea580c;
          background: #fff8f5;
          box-shadow: 0 2px 10px rgba(234,88,12,0.1);
        }

        .switch-text {
          text-align: center;
          font-size: 0.85rem;
          color: #888;
          margin-top: 1.5rem;
        }
        .switch-text button {
          background: none;
          border: none;
          color: #ea580c;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.85rem;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
        }
        .switch-text button:hover { text-decoration: underline; }

        .footer-text {
          font-size: 0.75rem;
          color: #bbb;
          text-align: center;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          width: 55%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .right-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #fff7ed 0%, #ffedd5 30%, #fed7aa 70%, #fdba74 100%);
        }

        /* decorative blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.55;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: #fb923c;
          top: -80px; right: -80px;
        }
        .blob-2 {
          width: 300px; height: 300px;
          background: #fde68a;
          bottom: 80px; left: 60px;
        }
        .blob-3 {
          width: 200px; height: 200px;
          background: #f97316;
          bottom: -40px; right: 120px;
        }

        /* Grid dots pattern */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(180,80,0,0.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        /* Floating cards / illustration area */
        .right-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
        }

        .hero-text {
          font-family: 'Sora', sans-serif;
          font-size: 4.6rem;
          font-weight: 800;
          color: #7c2d12;
          text-align: center;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }
        .hero-text span { color: #ea580c; }

        .hero-sub {
          font-size: 1rem;
          color: #92400e;
          text-align: center;
          max-width: 320px;
          line-height: 1.6;
        }

        /* stat cards */
        .stat-cards {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1rem;
        }

        .stat-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 20px;
          padding: 1.1rem 1.4rem;
          min-width: 130px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(180,80,0,0.12);
          animation: floatCard 4s ease-in-out infinite;
        }
        .stat-card:nth-child(2) { animation-delay: 1.3s; }
        .stat-card:nth-child(3) { animation-delay: 2.6s; }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .stat-num {
          font-family: 'Sora', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          color: #ea580c;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #92400e;
          font-weight: 600;
          margin-top: 0.15rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* URL card decoration */
        .url-pill {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.95);
          border-radius: 50px;
          padding: 0.6rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          font-family: 'DM Sans', sans-serif;
          color: #7c2d12;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(180,80,0,0.1);
        }
        .url-pill .dot-orange {
          width: 8px; height: 8px;
          background: #ea580c;
          border-radius: 50%;
          animation: pulse-dot 2s ease infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* slide-in animation for form */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-section { animation: slideUp 0.5s ease forwards; }

        @media (max-width: 768px) {
          .right-panel { display: none; }
          .left-panel { width: 100%; }
        }
      `}</style>

      <div className="login-root">
        {/* ── LEFT: Form ── */}
        <div className="left-panel">
          <div className="logo" onClick={() => navigate('/')}>
            <img src="/BitlyLogo.svg" alt="TinyLink" className='w-[8.2rem]' />
          </div>

          <div className="form-section">
            <h1 className="greeting">
              {isLogin ? (
                <>Hello,<br />Welcome <span>Back!</span></>
              ) : (
                <>Start<br />for <span>Free</span> today</>
              )}
            </h1>
            <p className="subtext">
              {isLogin
                ? 'Sign in to manage and track all your short links.'
                : 'Create an account and shorten your first link in seconds.'}
            </p>

            {errorMsg && <div className="error-box">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                {!isLogin && (
                  <div>
                    <div className="field-label">Full Name</div>
                    <div className="input-wrap">
                      <User />
                      <input
                        type="text"
                        required={!isLogin}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jimmy Chaayan"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="field-label">Email</div>
                  <div className="input-wrap">
                    <Mail />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="field-label">Password</div>
                  <div className="input-wrap">
                    <Lock />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  {isLogin && (
                    <a href="#" className="forgot-link">Forgot password?</a>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Please wait…' : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="divider">or continue with</div>

            <button className="btn-google" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>

            <p className="switch-text">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}>
                {isLogin ? 'Sign up free' : 'Log in'}
              </button>
            </p>
          </div>

          <p className="footer-text">© 2025 github.com/polkboban</p>
        </div>

        <div className="right-panel">
          <div className="right-bg" />
          <div className="dot-grid" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />

          <div className="right-content">
            <h2 className="hero-text">
              Shorten.<br />Share.<br /><span>Track.</span>
            </h2>
            <p className="hero-sub">
              Powerful link management for creators, marketers, and teams. All in one place.
            </p>

            <div className="url-pill">
              <div className="dot-orange" />
              bitly.com/summer-sale → 2,481 clicks
            </div>

            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-num">12M+</div>
                <div className="stat-label">Links Created</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">180+</div>
                <div className="stat-label">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}