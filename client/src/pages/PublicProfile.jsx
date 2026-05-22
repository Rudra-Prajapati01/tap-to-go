import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import axios
from "axios";

const infoBox = {
  background: "#f8fafc",
  padding: "10px 12px",
  borderRadius: "12px",
  fontSize: "13px",
  color: "#475569",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const PublicProfile = () => {

  const { uniqueId } =
    useParams();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser =
    async () => {

      try {

        const res =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/users/${uniqueId}`

          );

        setUser(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>

    );

  }

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        User Not Found

      </div>

    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#FFE6E6,#FFABE1,#A685E2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily:
          "'DM Sans','sans-serif'",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "340px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          border:
            "1.5px solid #f1f5f9",
          boxShadow:
            "0 8px 32px rgba(99,102,241,0.1)",
        }}
      >

        {/* COVER */}
        <div
          style={{
            height: "110px",

            background:
              user.coverImage

                ? `url(${user.coverImage}) center/cover`

                : "linear-gradient(135deg,#667eea,#764ba2,#f093fb)",

            position: "relative",
          }}
        >

          {/* LOGO */}
          {
            user.logoImage && (

              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background:
                    "rgba(255,255,255,0.92)",
                  padding: "4px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >

                <img
                  src={user.logoImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

              </div>

            )
          }

        </div>

        {/* BODY */}
        <div
          style={{
            background: "#fff",
            padding: "0 16px 18px",
          }}
        >

          {/* AVATAR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >

            {
              user.profileImage && (

                <img
                  src={user.profileImage}
                  alt=""
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "14px",
                    objectFit: "cover",
                    border:
                      "3px solid #fff",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />

              )
            }

            <button
              style={{
                marginBottom: "4px",
                padding: "7px 14px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                border: "none",
              }}
            >

              Connect

            </button>

          </div>

          {/* NAME */}
          <h2
            style={{
              margin: "0 0 2px",
              fontSize: "18px",
              fontWeight: "800",
              color: "#1e293b",
            }}
          >

            {user.name}

          </h2>

          {/* JOB */}
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "12px",
              color: "#7c3aed",
              fontWeight: "700",
            }}
          >

            {user.jobTitle}

            {
              user.company &&
              ` · ${user.company}`
            }

          </p>

          {/* LOCATION */}
          {
            user.location && (

              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              >

                📍 {user.location}

              </p>

            )
          }

          {/* BIO */}
          {
            user.bio && (

              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "12px",
                  color: "#64748b",
                  lineHeight: 1.5,
                }}
              >

                {user.bio}

              </p>

            )
          }

          {/* CONTACT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >

            {
              user.phone && (

                <div style={infoBox}>

                  📞 {user.phone}

                </div>

              )
            }

            {
              user.email && (

                <div style={infoBox}>

                  ✉️ {user.email}

                </div>

              )
            }

            {
              user.location && (

                <div style={infoBox}>

                  📍 {user.location}

                </div>

              )
            }

          </div>

          {/* WEBSITE */}
          {
            user.website && (

              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: "12px",
                  display: "block",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#a855f7)",
                  color: "#fff",
                  fontWeight: "700",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >

                Visit Website

              </a>

            )
          }

          {/* SOCIALS */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "14px",
            }}
          >

            {
              user.instagram && (

                <a
                  href={user.instagram}
                  target="_blank"
                  style={{
                    background: "#E1306C",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >

                  Instagram

                </a>

              )
            }

            {
              user.linkedin && (

                <a
                  href={user.linkedin}
                  target="_blank"
                  style={{
                    background: "#0A66C2",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >

                  LinkedIn

                </a>

              )
            }

            {
              user.github && (

                <a
                  href={user.github}
                  target="_blank"
                  style={{
                    background: "#111",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >

                  GitHub

                </a>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default PublicProfile;