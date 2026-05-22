import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {
  const { uniqueId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${uniqueId}`
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <span>Loading profile…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-loading">
        <span className="not-found-icon">🔍</span>
        <span>User not found</span>
      </div>
    );
  }

  const socials = [
    { key: "instagram", label: "Instagram", color: "#E1306C", icon: "📸" },
    { key: "linkedin", label: "LinkedIn", color: "#0A66C2", icon: "💼" },
    { key: "github", label: "GitHub", color: "#18181b", icon: "🐙" },
    { key: "twitter", label: "Twitter", color: "#1DA1F2", icon: "🐦" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .profile-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: #0d0d12;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(124,58,237,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(236,72,153,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 60% 40%, rgba(99,102,241,0.12) 0%, transparent 50%);
          font-family: 'Sora', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* subtle animated noise grain */
        .profile-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.45;
          z-index: 0;
        }

        .profile-loading {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: #0d0d12;
          color: #a78bfa;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 600;
        }

        .spinner {
          width: 36px; height: 36px;
          border: 3px solid rgba(124,58,237,0.2);
          border-top-color: #7c3aed;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .not-found-icon { font-size: 40px; }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* CARD */
        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 360px;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(18, 18, 28, 0.92);
          border: 1px solid rgba(124,58,237,0.25);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 24px 60px rgba(0,0,0,0.55),
            0 0 80px rgba(124,58,237,0.12);
          backdrop-filter: blur(20px);
          animation: cardIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* COVER */
        .cover {
          height: 120px;
          position: relative;
          overflow: hidden;
        }

        .cover-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b0764, #6d28d9, #be185d);
          background-size: 200% 200%;
          animation: gradShift 6s ease infinite alternate;
        }

        .cover-bg.has-image {
          background-size: cover;
          background-position: center;
          animation: none;
        }

        @keyframes gradShift {
          from { background-position: 0% 50%; }
          to   { background-position: 100% 50%; }
        }

        .cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(18,18,28,0.7) 100%);
        }

        /* LOGO */
        .logo-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(13,13,18,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }

        .logo-badge img {
          width: 100%; height: 100%;
          object-fit: contain;
        }

        /* BODY */
        .card-body {
          padding: 0 18px 22px;
        }

        /* AVATAR ROW */
        .avatar-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: -28px;
          margin-bottom: 14px;
        }

        .avatar-wrap {
          position: relative;
        }

        .avatar-wrap::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 17px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          z-index: -1;
        }

        .avatar {
          width: 72px; height: 72px;
          border-radius: 14px;
          object-fit: cover;
          display: block;
          border: 3px solid #12121c;
          position: relative;
          z-index: 1;
        }

        .avatar-placeholder {
          width: 72px; height: 72px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          border: 3px solid #12121c;
        }

        .connect-btn {
          padding: 9px 18px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 18px rgba(124,58,237,0.38);
          transition: transform 0.15s, box-shadow 0.15s;
          font-family: 'Sora', sans-serif;
        }

        .connect-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(124,58,237,0.52);
        }

        .connect-btn:active { transform: scale(0.97); }

        /* NAME / TITLE */
        .user-name {
          font-size: 20px;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .user-job {
          font-size: 12px;
          font-weight: 600;
          background: linear-gradient(90deg, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
          letter-spacing: 0.2px;
        }

        .user-location {
          font-size: 11px;
          color: #64748b;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent);
          margin: 12px 0;
        }

        /* BIO */
        .user-bio {
          font-size: 12.5px;
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        /* CONTACT CHIPS */
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }

        .contact-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
          overflow: hidden;
        }

        .contact-chip:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
        }

        .contact-chip .chip-icon {
          font-size: 15px;
          flex-shrink: 0;
        }

        .contact-chip .chip-text {
          font-size: 12.5px;
          color: #cbd5e1;
          font-family: 'DM Mono', monospace;
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        .copy-toast {
          position: absolute;
          right: 12px;
          font-size: 10px;
          color: #a78bfa;
          font-weight: 700;
          letter-spacing: 0.5px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

        /* WEBSITE BUTTON */
        .website-btn {
          display: block;
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200% 200%;
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          text-align: center;
          text-decoration: none;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
          transition: transform 0.15s, box-shadow 0.15s, background-position 0.4s;
        }

        .website-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124,58,237,0.5);
          background-position: right center;
        }

        /* SOCIALS */
        .socials-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          text-decoration: none;
          color: #fff;
          letter-spacing: 0.3px;
          transition: transform 0.15s, filter 0.15s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        .social-pill:hover {
          transform: translateY(-2px);
          filter: brightness(1.12);
        }
      `}</style>

      <div className="profile-page">
        <div className="card">

          {/* COVER */}
          <div className="cover">
            <div
              className={`cover-bg${user.coverImage ? " has-image" : ""}`}
              style={user.coverImage ? { backgroundImage: `url(${user.coverImage})` } : {}}
            />
            <div className="cover-overlay" />
            {user.logoImage && (
              <div className="logo-badge">
                <img src={user.logoImage} alt="logo" />
              </div>
            )}
          </div>

          {/* BODY */}
          <div className="card-body">

            {/* AVATAR ROW */}
            <div className="avatar-row">
              <div className="avatar-wrap">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <button className="connect-btn">+ Connect</button>
            </div>

            {/* NAME */}
            <h2 className="user-name">{user.name}</h2>

            {/* JOB */}
            {(user.jobTitle || user.company) && (
              <p className="user-job">
                {user.jobTitle}{user.company ? ` · ${user.company}` : ""}
              </p>
            )}

            {/* LOCATION */}
            {user.location && (
              <p className="user-location">
                <span>📍</span> {user.location}
              </p>
            )}

            <div className="divider" />

            {/* BIO */}
            {user.bio && <p className="user-bio">{user.bio}</p>}

            {/* CONTACT */}
            {(user.phone || user.email || user.location) && (
              <div className="contact-list">
                {user.phone && (
                  <div className="contact-chip" onClick={() => handleCopy(user.phone, "phone")}>
                    <span className="chip-icon">📞</span>
                    <span className="chip-text">{user.phone}</span>
                    {copied === "phone" && <span className="copy-toast">COPIED!</span>}
                  </div>
                )}
                {user.email && (
                  <div className="contact-chip" onClick={() => handleCopy(user.email, "email")}>
                    <span className="chip-icon">✉️</span>
                    <span className="chip-text">{user.email}</span>
                    {copied === "email" && <span className="copy-toast">COPIED!</span>}
                  </div>
                )}
                {user.location && (
                  <div className="contact-chip">
                    <span className="chip-icon">📍</span>
                    <span className="chip-text">{user.location}</span>
                  </div>
                )}
              </div>
            )}

            {/* WEBSITE */}
            {user.website && (
              <a href={user.website} target="_blank" rel="noreferrer" className="website-btn">
                🌐 &nbsp;Visit Website
              </a>
            )}

            {/* SOCIALS */}
            <div className="socials-row">
              {socials.map(({ key, label, color, icon }) =>
                user[key] ? (
                  <a
                    key={key}
                    href={user[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                    style={{ background: color }}
                  >
                    {icon} {label}
                  </a>
                ) : null
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;