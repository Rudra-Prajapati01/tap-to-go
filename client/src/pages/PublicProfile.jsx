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
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 16,
        background: "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF,#B8D4FF)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#7c3aed", fontSize: 15, fontWeight: 700
      }}>
        <div style={{
          width: 40, height: 40,
          border: "3px solid #e9d5ff",
          borderTopColor: "#7c3aed",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        Loading profile…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 22, fontWeight: 800,
        background: "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF)",
        color: "#6d28d9", fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        User not found 🔍
      </div>
    );
  }

  const socials = [
    { key: "instagram", label: "Instagram", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: "📸" },
    { key: "linkedin", label: "LinkedIn", bg: "#0A66C2", icon: "💼" },
    { key: "github", label: "GitHub", bg: "#18181b", icon: "🐙" },
    { key: "twitter", label: "Twitter / X", bg: "#000", icon: "𝕏" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { margin: 0; }

        .pp-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 70% 50% at 15% 10%, rgba(255,182,193,0.55) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 85% 5%, rgba(186,147,255,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(147,197,253,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255,182,255,0.35) 0%, transparent 50%),
            #fdf4ff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 16px 60px;
        }

        /* DESKTOP LAYOUT: wide card */
        .pp-card {
          width: 100%;
          max-width: 780px;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(24px);
          border-radius: 28px;
          border: 1.5px solid rgba(255,255,255,0.95);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.9) inset,
            0 20px 60px rgba(124,58,237,0.1),
            0 4px 20px rgba(236,72,153,0.08);
          overflow: hidden;
          animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* COVER */
        .pp-cover {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .pp-cover-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #c084fc, #f472b6, #fb923c, #facc15);
          background-size: 300% 300%;
          animation: coverShift 8s ease infinite alternate;
        }

        @keyframes coverShift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .pp-cover-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.15) 100%);
        }

        .pp-logo {
          position: absolute;
          top: 14px; right: 16px;
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255,255,255,0.95);
          padding: 6px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .pp-logo img { width: 100%; height: 100%; object-fit: contain; }

        /* MAIN CONTENT AREA */
        .pp-content {
          padding: 0 28px 28px;
        }

        /* TOP ROW: avatar + connect */
        .pp-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: -44px;
          margin-bottom: 18px;
        }

        /* AVATAR */
        .pp-avatar-wrap {
          position: relative;
          padding: 3px;
          border-radius: 20px;
          background: linear-gradient(135deg, #c084fc, #f472b6, #fb923c);
          box-shadow: 0 8px 24px rgba(192,132,252,0.35);
        }

        .pp-avatar {
          width: 90px; height: 90px;
          border-radius: 17px;
          object-fit: cover;
          display: block;
          background: #fff;
          border: 3px solid #fff;
        }

        .pp-avatar-placeholder {
          width: 90px; height: 90px;
          border-radius: 17px;
          background: linear-gradient(135deg, #c084fc, #f472b6);
          display: flex; align-items: center; justify-content: center;
          font-size: 34px; font-weight: 900; color: #fff;
          border: 3px solid #fff;
        }

        /* CONNECT BTN */
        .pp-connect {
          padding: 11px 24px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          letter-spacing: 0.4px;
          box-shadow: 0 6px 22px rgba(124,58,237,0.32);
          transition: transform 0.15s, box-shadow 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .pp-connect:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(124,58,237,0.42);
        }

        /* DESKTOP: split layout */
        @media (min-width: 620px) {
          .pp-split {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: start;
          }
        }

        @media (max-width: 619px) {
          .pp-split {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .pp-cover { height: 140px; }
          .pp-card { border-radius: 20px; }
          .pp-content { padding: 0 16px 22px; }
          .pp-avatar { width: 76px; height: 76px; }
          .pp-avatar-placeholder { width: 76px; height: 76px; }
          .pp-top-row { margin-top: -36px; }
        }

        /* NAME BLOCK */
        .pp-name {
          font-family: 'Instrument Serif', serif;
          font-size: 32px;
          font-weight: 400;
          color: #1e1b4b;
          line-height: 1.1;
          margin-bottom: 5px;
          letter-spacing: -0.5px;
        }

        @media (max-width: 619px) {
          .pp-name { font-size: 24px; }
        }

        .pp-job {
          font-size: 13px;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 4px;
          letter-spacing: 0.3px;
        }

        .pp-location {
          font-size: 12px;
          color: #a78bfa;
          margin-bottom: 14px;
          font-weight: 500;
        }

        .pp-bio {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 16px;
          font-weight: 400;
        }

        /* DIVIDER */
        .pp-divider {
          height: 1.5px;
          background: linear-gradient(90deg, #e9d5ff, #fbcfe8, #bfdbfe, transparent);
          border: none;
          border-radius: 2px;
          margin: 16px 0;
        }

        /* CONTACT CHIPS */
        .pp-contacts {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .pp-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(237,233,254,0.7), rgba(252,231,243,0.5));
          border: 1.5px solid rgba(196,168,255,0.35);
          cursor: pointer;
          transition: all 0.18s;
          position: relative;
          overflow: hidden;
        }

        .pp-chip:hover {
          background: linear-gradient(135deg, rgba(221,214,254,0.9), rgba(251,207,232,0.7));
          border-color: rgba(167,139,250,0.55);
          transform: translateX(3px);
          box-shadow: 0 4px 14px rgba(167,139,250,0.18);
        }

        .pp-chip-icon {
          font-size: 16px;
          flex-shrink: 0;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.8);
          border-radius: 9px;
          box-shadow: 0 2px 6px rgba(167,139,250,0.2);
        }

        .pp-chip-text {
          font-size: 13px;
          color: #4c1d95;
          font-weight: 600;
          letter-spacing: 0.1px;
        }

        .pp-chip-copy {
          position: absolute;
          right: 14px;
          font-size: 10px;
          font-weight: 800;
          color: #7c3aed;
          letter-spacing: 1px;
          background: rgba(237,233,254,0.95);
          padding: 3px 7px;
          border-radius: 6px;
          animation: popIn 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* WEBSITE BTN */
        .pp-website {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899, #f97316);
          background-size: 250% 250%;
          color: #fff;
          font-weight: 800;
          font-size: 14px;
          text-decoration: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.3px;
          margin-top: 18px;
          box-shadow: 0 6px 24px rgba(124,58,237,0.3);
          transition: transform 0.2s, box-shadow 0.2s, background-position 0.5s;
          animation: btnGrad 5s ease infinite alternate;
        }

        @keyframes btnGrad {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .pp-website:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(124,58,237,0.4);
        }

        /* SOCIALS */
        .pp-socials-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c4b5fd;
          margin-bottom: 10px;
          margin-top: 18px;
        }

        .pp-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pp-social {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 12px;
          font-size: 12.5px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-decoration: none;
          color: #fff;
          letter-spacing: 0.2px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          transition: transform 0.18s, box-shadow 0.18s;
        }

        .pp-social:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 22px rgba(0,0,0,0.22);
        }

        /* STATS ROW (desktop) */
        .pp-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .pp-stat {
          flex: 1;
          min-width: 80px;
          padding: 14px 12px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(237,233,254,0.8), rgba(252,231,243,0.6));
          border: 1.5px solid rgba(196,168,255,0.3);
          text-align: center;
        }

        .pp-stat-val {
          font-size: 22px;
          font-weight: 900;
          color: #6d28d9;
          line-height: 1;
          font-family: 'Instrument Serif', serif;
        }

        .pp-stat-label {
          font-size: 10px;
          font-weight: 700;
          color: #a78bfa;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* SECTION LABELS */
        .pp-section-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c4b5fd;
          margin-bottom: 10px;
        }

        /* RIGHT COL on desktop */
        .pp-right { }
      `}</style>

      <div className="pp-page">
        <div className="pp-card">

          {/* COVER */}
          <div className="pp-cover">
            <div
              className="pp-cover-bg"
              style={user.coverImage
                ? { backgroundImage: `url(${user.coverImage})`, backgroundSize: "cover", backgroundPosition: "center", animation: "none" }
                : {}}
            />
            <div className="pp-cover-overlay" />
            {user.logoImage && (
              <div className="pp-logo">
                <img src={user.logoImage} alt="logo" />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="pp-content">

            {/* TOP ROW */}
            <div className="pp-top-row">
              <div className="pp-avatar-wrap">
                {user.profileImage
                  ? <img src={user.profileImage} alt={user.name} className="pp-avatar" />
                  : <div className="pp-avatar-placeholder">{user.name?.[0]?.toUpperCase() || "?"}</div>
                }
              </div>
              <button className="pp-connect">+ Connect</button>
            </div>

            {/* SPLIT LAYOUT */}
            <div className="pp-split">

              {/* LEFT: identity */}
              <div className="pp-left">
                <h1 className="pp-name">{user.name}</h1>

                {(user.jobTitle || user.company) && (
                  <p className="pp-job">
                    {user.jobTitle}{user.company ? ` · ${user.company}` : ""}
                  </p>
                )}

                {user.location && (
                  <p className="pp-location">📍 {user.location}</p>
                )}

                {user.bio && (
                  <p className="pp-bio">{user.bio}</p>
                )}

                {/* SOCIALS */}
                {socials.some(s => user[s.key]) && (
                  <>
                    <p className="pp-socials-title">Find me on</p>
                    <div className="pp-socials">
                      {socials.map(({ key, label, bg, icon }) =>
                        user[key] ? (
                          <a key={key} href={user[key]} target="_blank" rel="noreferrer"
                            className="pp-social" style={{ background: bg }}>
                            <span>{icon}</span> {label}
                          </a>
                        ) : null
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT: contact */}
              <div className="pp-right">
                <p className="pp-section-label">Contact</p>
                <div className="pp-contacts">
                  {user.phone && (
                    <div className="pp-chip" onClick={() => handleCopy(user.phone, "phone")}>
                      <span className="pp-chip-icon">📞</span>
                      <span className="pp-chip-text">{user.phone}</span>
                      {copied === "phone" && <span className="pp-chip-copy">COPIED ✓</span>}
                    </div>
                  )}
                  {user.email && (
                    <div className="pp-chip" onClick={() => handleCopy(user.email, "email")}>
                      <span className="pp-chip-icon">✉️</span>
                      <span className="pp-chip-text">{user.email}</span>
                      {copied === "email" && <span className="pp-chip-copy">COPIED ✓</span>}
                    </div>
                  )}
                  {user.location && (
                    <div className="pp-chip">
                      <span className="pp-chip-icon">📍</span>
                      <span className="pp-chip-text">{user.location}</span>
                    </div>
                  )}
                </div>

                {user.website && (
                  <a href={user.website} target="_blank" rel="noreferrer" className="pp-website">
                    🌐 Visit Website
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;