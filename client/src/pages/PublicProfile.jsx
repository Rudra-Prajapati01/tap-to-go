import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {

  const { uniqueId } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showLeadForm, setShowLeadForm] =
    useState(false);

  const [leadForm, setLeadForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });

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

    setTimeout(() => {

      setCopied(null);

    }, 2000);
  };

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background:
            "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF,#B8D4FF)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#7c3aed",
          fontSize: 15,
          fontWeight: 700,
        }}
      >

        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid #e9d5ff",
            borderTopColor: "#7c3aed",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />

        Loading profile…

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

      </div>
    );
  }

  if (!user) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          background:
            "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF)",
          color: "#6d28d9",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >

        User not found 🔍

      </div>
    );
  }

  const socials = [
    {
      key: "instagram",
      label: "Instagram",
      bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      icon: "📸",
    },

    {
      key: "linkedin",
      label: "LinkedIn",
      bg: "#0A66C2",
      icon: "💼",
    },

    {
      key: "github",
      label: "GitHub",
      bg: "#18181b",
      icon: "🐙",
    },

    {
      key: "twitter",
      label: "Twitter / X",
      bg: "#000",
      icon: "𝕏",
    },
  ];

  return (
    <>
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
        }

        .pp-page {
          min-height: 100vh;

          background:
            radial-gradient(
              ellipse 70% 50% at 15% 10%,
              rgba(255,182,193,0.55) 0%,
              transparent 55%
            ),

            radial-gradient(
              ellipse 60% 60% at 85% 5%,
              rgba(186,147,255,0.45) 0%,
              transparent 55%
            ),

            radial-gradient(
              ellipse 80% 50% at 50% 100%,
              rgba(147,197,253,0.4) 0%,
              transparent 55%
            ),

            radial-gradient(
              ellipse 50% 40% at 90% 80%,
              rgba(255,182,255,0.35) 0%,
              transparent 50%
            ),

            #fdf4ff;

          font-family: 'Plus Jakarta Sans', sans-serif;

          display: flex;

          align-items: flex-start;

          justify-content: center;

          padding: 40px 16px 60px;
        }

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
        }

        .pp-cover {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .pp-cover-bg {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              135deg,
              #c084fc,
              #f472b6,
              #fb923c,
              #facc15
            );

          background-size: 300% 300%;
        }

        .pp-cover-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              transparent 50%,
              rgba(255,255,255,0.15) 100%
            );
        }

        .pp-logo {
          position: absolute;
          top: 14px;
          right: 16px;

          width: 52px;
          height: 52px;

          border-radius: 14px;

          background: rgba(255,255,255,0.88);

          padding: 6px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .pp-content {
          padding: 0 28px 28px;
        }

        .pp-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          margin-top: -44px;

          margin-bottom: 18px;
        }

        .pp-avatar-wrap {
          position: relative;

          padding: 3px;

          border-radius: 20px;

          background:
            linear-gradient(
              135deg,
              #c084fc,
              #f472b6,
              #fb923c
            );
        }

        .pp-avatar {
          width: 90px;
          height: 90px;

          border-radius: 17px;

          object-fit: cover;

          background: #fff;

          border: 3px solid #fff;
        }

        .pp-avatar-placeholder {
          width: 90px;
          height: 90px;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              #c084fc,
              #f472b6
            );

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 34px;
          font-weight: 900;

          color: #fff;

          border: 3px solid #fff;
        }

        .pp-connect {
          padding: 11px 24px;

          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #a855f7,
              #ec4899
            );

          color: #fff;

          font-size: 13px;
          font-weight: 800;

          border: none;

          cursor: pointer;
        }

        .pp-split {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 24px;

          align-items: start;
        }

        .pp-name {
          font-family: 'Instrument Serif', serif;

          font-size: 32px;

          color: #1e1b4b;

          line-height: 1.1;

          margin-bottom: 5px;
        }

        .pp-job {
          font-size: 13px;
          font-weight: 700;

          color: #7c3aed;

          margin-bottom: 6px;
        }

        .pp-location {
          font-size: 12px;

          color: #a78bfa;

          margin-bottom: 14px;

          line-height: 1.6;
        }

        .pp-bio {
          font-size: 13.5px;

          color: #475569;

          line-height: 1.7;

          margin-bottom: 16px;
        }

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

          text-decoration: none;

          color: #fff;
        }

        .pp-section-label {
          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1.5px;

          text-transform: uppercase;

          color: #c4b5fd;

          margin-bottom: 10px;
        }

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

          background:
            linear-gradient(
              135deg,
              rgba(237,233,254,0.7),
              rgba(252,231,243,0.5)
            );

          border: 1.5px solid rgba(196,168,255,0.35);

          position: relative;
        }

        .pp-chip-icon {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: rgba(255,255,255,0.8);
        }

        .pp-chip-text {
          font-size: 13px;

          color: #4c1d95;

          font-weight: 600;
        }

        .pp-chip-copy {
          position: absolute;

          right: 14px;

          font-size: 10px;

          font-weight: 800;

          color: #7c3aed;
        }

        .pp-website {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          width: 100%;

          padding: 14px;

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #a855f7,
              #ec4899,
              #f97316
            );

          color: #fff;

          font-weight: 800;

          font-size: 14px;

          text-decoration: none;

          margin-top: 18px;
        }

        .lead-modal{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:9999;
  padding:20px;
}

.lead-box{
  width:100%;
  max-width:420px;
  background:white;
  border-radius:24px;
  padding:28px;
  display:flex;
  flex-direction:column;
  gap:14px;

  box-shadow:
    0 20px 60px rgba(0,0,0,0.2);
}

.lead-box h2{
  font-size:24px;
  font-weight:800;
  color:#1e1b4b;
  margin-bottom:10px;
}

.lead-box input,
.lead-box textarea{

  width:100%;

  padding:14px 16px;

  border-radius:14px;

  border:1.5px solid #e2e8f0;

  outline:none;

  font-size:14px;

  font-family:'Plus Jakarta Sans',sans-serif;
}

.lead-box textarea{
  min-height:100px;
  resize:none;
}

.lead-box button{

  padding:14px;

  border:none;

  border-radius:14px;

  background:
    linear-gradient(
      135deg,
      #7c3aed,
      #a855f7,
      #ec4899
    );

  color:white;

  font-size:14px;

  font-weight:800;

  cursor:pointer;
}

        @media (max-width: 620px) {

          .pp-split {
            grid-template-columns: 1fr;
          }

          .pp-cover {
            height: 140px;
          }

          .pp-content {
            padding: 0 16px 22px;
          }

          .pp-name {
            font-size: 24px;
          }

          .pp-avatar {
            width: 76px;
            height: 76px;
          }

          .pp-avatar-placeholder {
            width: 76px;
            height: 76px;
          }
        }

      `}</style>

      <div className="pp-page">

        <div className="pp-card">

          {/* COVER */}
          <div className="pp-cover">

            <div
              className="pp-cover-bg"
              style={
                user.coverImage
                  ? {
                    backgroundImage: `url(${user.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                  : {}
              }
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

            {/* TOP */}
            <div className="pp-top-row">

              <div className="pp-avatar-wrap">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="pp-avatar"
                  />
                ) : (
                  <div className="pp-avatar-placeholder">
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}

              </div>

              <button
                className="pp-connect"
                onClick={() => setShowLeadForm(true)}
              >
                + Connect
              </button>

            </div>

            {/* SPLIT */}
            <div className="pp-split">

              {/* LEFT */}
              <div className="pp-left">

                <h1 className="pp-name">
                  {user.name}
                </h1>

                {(user.jobTitle || user.companyName) && (
                  <p className="pp-job">

                    {user.jobTitle}

                    {user.companyName
                      ? ` · ${user.companyName}`
                      : ""}

                  </p>
                )}

                {(user.streetAddress ||
                  user.city ||
                  user.state ||
                  user.country) && (

                    <p className="pp-location">

                      📍{" "}

                      {[
                        user.streetAddress,
                        user.city,
                        user.state,
                        user.country,
                        user.postcode,
                      ]
                        .filter(Boolean)
                        .join(", ")}

                    </p>
                  )}

                {user.bio && (
                  <p className="pp-bio">
                    {user.bio}
                  </p>
                )}

                {/* SOCIALS */}
                {socials.some((s) => user[s.key]) && (
                  <>
                    <p className="pp-socials-title">
                      Find me on
                    </p>

                    <div className="pp-socials">

                      {socials.map(
                        ({
                          key,
                          label,
                          bg,
                          icon,
                        }) =>
                          user[key] ? (
                            <a
                              key={key}
                              href={user[key]}
                              target="_blank"
                              rel="noreferrer"
                              className="pp-social"
                              style={{
                                background: bg,
                              }}
                            >

                              <span>{icon}</span>

                              {label}

                            </a>
                          ) : null
                      )}

                    </div>
                  </>
                )}

              </div>

              {/* RIGHT */}
              <div className="pp-right">

                <p className="pp-section-label">
                  Contact
                </p>

                <div className="pp-contacts">

                  {user.phone && (
                    <div
                      className="pp-chip"
                      onClick={() =>
                        handleCopy(
                          user.phone,
                          "phone"
                        )
                      }
                    >

                      <span className="pp-chip-icon">
                        📞
                      </span>

                      <span className="pp-chip-text">
                        {user.phone}
                      </span>

                      {copied === "phone" && (
                        <span className="pp-chip-copy">
                          COPIED ✓
                        </span>
                      )}

                    </div>
                  )}

                  {user.email && (
                    <div
                      className="pp-chip"
                      onClick={() =>
                        handleCopy(
                          user.email,
                          "email"
                        )
                      }
                    >

                      <span className="pp-chip-icon">
                        ✉️
                      </span>

                      <span className="pp-chip-text">
                        {user.email}
                      </span>

                      {copied === "email" && (
                        <span className="pp-chip-copy">
                          COPIED ✓
                        </span>
                      )}

                    </div>
                  )}

                  {(user.streetAddress ||
                    user.city ||
                    user.state ||
                    user.country) && (

                      <div className="pp-chip">

                        <span className="pp-chip-icon">
                          📍
                        </span>

                        <span
                          className="pp-chip-text"
                          style={{
                            lineHeight: "1.5",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >

                          {[
                            user.streetAddress,
                            user.city,
                            user.state,
                            user.country,
                            user.postcode,
                          ]
                            .filter(Boolean)
                            .join(", ")}

                        </span>

                      </div>
                    )}

                </div>

                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="pp-website"
                  >

                    🌐 Visit Website

                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

        {showLeadForm && (

          <div className="lead-modal">

            <div className="lead-box">

              <h2>
                Connect with {user.name}
              </h2>

              {user.leadCapture?.fields?.name && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadForm.name}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      name: e.target.value,
                    })
                  }
                />
              )}

              {user.leadCapture?.fields?.email && (
                <input
                  type="email"
                  placeholder="Your Email"
                  value={leadForm.email}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      email: e.target.value,
                    })
                  }
                />
              )}

              {user.leadCapture?.fields?.phone && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      phone: e.target.value,
                    })
                  }
                />
              )}

              {user.leadCapture?.fields?.company && (
                <input
                  type="text"
                  placeholder="Company Name"
                  value={leadForm.company}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      company: e.target.value,
                    })
                  }
                />
              )}

              {user.leadCapture?.fields?.message && (
                <textarea
                  placeholder="Message"
                  value={leadForm.message}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      message: e.target.value,
                    })
                  }
                />
              )}

              <button>
                Submit
              </button>

            </div>

          </div>

        )}
      </div>
    </>

  );
};

export default PublicProfile;