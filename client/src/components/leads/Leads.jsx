import { useEffect, useState } from "react";
import axios from "axios";

const Leads = () => {

  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/leads/${user.uniqueId}`

      );

      console.log(res.data);

      setLeads(

        Array.isArray(res.data)
          ? res.data
          : res.data.leads || []

      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "25px",
          color: "#1e1b4b",
        }}
      >
        Leads
      </h1>

      {loading ? (

        <div>
          Loading...
        </div>

      ) : (

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >

          {leads.length === 0 && (

            <div
              style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
                color: "#64748b",
                fontWeight: "600",
              }}
            >
              No Leads Yet 🚀
            </div>

          )}

          {leads.map((lead) => (

            <div
              key={lead._id}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "24px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.05)",
                display: "grid",
                gap: "12px",
              }}
            >

              <div>
                <strong>Name:</strong>{" "}
                {lead.name}
              </div>

              <div>
                <strong>Email:</strong>{" "}
                {lead.email}
              </div>

              <div>
                <strong>Phone:</strong>{" "}
                {lead.phone}
              </div>

              <div>
                <strong>Company:</strong>{" "}
                {lead.company}
              </div>

              <div>
                <strong>Message:</strong>{" "}
                {lead.message}
              </div>

              <div
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                {new Date(
                  lead.createdAt
                ).toLocaleString()}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Leads;