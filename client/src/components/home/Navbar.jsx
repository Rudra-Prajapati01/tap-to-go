import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (

    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "74px",
        padding: "0 6%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(18px)",
        borderBottom:
          "1px solid rgba(97,85,166,0.08)",
        zIndex: 999,
      }}
    >

      {/* LOGO */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
        }}
      >

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg,#6155A6,#A685E2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "800",
            fontSize: "20px",
            boxShadow:
              "0 8px 25px rgba(97,85,166,0.35)",
          }}
        >
          T
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#3E3276",
            fontFamily: "sans-serif",
          }}
        >
          Tapify
        </h1>

      </div>

      {/* NAV LINKS */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "36px",
        }}
      >

        {[
          "Products",
          "Features",
          "Teams & Business",
          "Company",
        ].map((item) => (

          <span
            key={item}
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#555",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color =
                "#6155A6";
            }}
            onMouseLeave={(e) => {
              e.target.style.color =
                "#555";
            }}
          >
            {item}
          </span>

        ))}

      </div>

      {/* BUTTONS */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >

        {/* LOGIN */}

        <button
          onClick={() =>
            navigate("/login")
          }
          style={{
            padding: "12px 24px",
            borderRadius: "14px",
            border:
              "2px solid #6155A6",
            background: "#fff",
            color: "#6155A6",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "#6155A6";
            e.target.style.color =
              "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              "#fff";
            e.target.style.color =
              "#6155A6";
          }}
        >
          Login
        </button>

        {/* GET STARTED */}

        <button
          onClick={() =>
            navigate("/register")
          }
          style={{
            padding: "12px 24px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg,#6155A6,#A685E2)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow:
              "0 10px 28px rgba(97,85,166,0.35)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform =
              "translateY(0px)";
          }}
        >
          Get Started →
        </button>

      </div>

    </nav>
  );
};

export default Navbar;