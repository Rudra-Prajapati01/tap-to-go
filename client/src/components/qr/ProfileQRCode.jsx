import QRCode
from "react-qr-code";

export default function ProfileQRCode({

  uniqueId,

}) {

  const profileUrl =

    `https://tap-to-go-nine.vercel.app/u/${uniqueId}`;

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >

      <QRCode
        value={profileUrl}
        size={220}
        bgColor="#ffffff"
        fgColor="#111111"
      />

      <p
        style={{
          fontSize: "13px",
          color: "#64748b",
          textAlign: "center",
          wordBreak: "break-all",
        }}
      >

        {profileUrl}

      </p>

    </div>
  );
}