import { useEffect, useState } from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct =
    async () => {

      try {

        const res =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/products/${id}`
          );

        setProduct(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  if (!product) {

    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (

    <div
      style={{
        minHeight: "100vh",

        background: "#f8fafc",

        padding: "40px 20px",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",

          margin: "0 auto",

          background: "#fff",

          borderRadius: "32px",

          overflow: "hidden",

          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          boxShadow:
            "0 20px 60px rgba(15,23,42,0.08)",
        }}
      >

        {/* IMAGE */}
        <div
          style={{
            background: "#fff",

            padding: "40px",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",
          }}
        >

          <img
            src={product.image}

            alt={product.name}

            style={{
              width: "100%",

              maxHeight: "600px",

              objectFit: "contain",
            }}
          />

        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: "50px",

            display: "flex",

            flexDirection: "column",

            gap: "24px",
          }}
        >

          <span
            style={{
              background: "#ede9fe",

              color: "#7c3aed",

              width: "fit-content",

              padding: "8px 16px",

              borderRadius: "999px",

              fontWeight: "700",
            }}
          >
            Premium Product
          </span>

          <h1
            style={{
              fontSize: "48px",

              fontWeight: "900",

              lineHeight: 1.1,

              margin: 0,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontSize: "17px",

              lineHeight: "1.9",

              color: "#64748b",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              fontSize: "42px",

              fontWeight: "900",

              color: "#7c3aed",
            }}
          >
            {product.currency}
            {product.price}
          </div>

          <button
            style={{
              border: "none",

              padding: "18px",

              borderRadius: "18px",

              background:
                "linear-gradient(135deg,#7c3aed,#a855f7)",

              color: "#fff",

              fontSize: "16px",

              fontWeight: "800",

              cursor: "pointer",
            }}
          >
            💬 Inquiry Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;