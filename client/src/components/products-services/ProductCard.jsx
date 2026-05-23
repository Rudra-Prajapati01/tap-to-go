const ProductCard = ({
  image,
  name,
  description,
  price,
}) => {

  return (

    <div
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "22px",
        overflow: "hidden",
        border: "1px solid #eef2ff",
        boxShadow:
          "0 10px 30px rgba(15,23,42,0.08)",
        transition: "0.3s",
      }}
    >

      {/* Product Image */}
      <div
        style={{
          width: "100%",
          height: "220px",
          overflow: "hidden",
          background: "#f8fafc",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >

        {/* Product Name */}
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          {name}
        </h2>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#64748b",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>

        {/* Bottom */}
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          {/* Price */}
          <h3
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
              color: "#7c3aed",
            }}
          >
            ₹{price}
          </h3>

          {/* Button */}
          <button
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            View Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;