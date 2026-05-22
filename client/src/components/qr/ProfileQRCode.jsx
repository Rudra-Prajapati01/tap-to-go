import QRCode from "react-qr-code";

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
      }}
    >

      <QRCode
        value={profileUrl}
        size={220}
      />

      <p
        style={{
          fontSize: "12px",
        }}
      >

        {profileUrl}

      </p>

    </div>
  );
}