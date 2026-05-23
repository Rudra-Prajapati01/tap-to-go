import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

const ProductAndServices = () => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const [products, setProducts] =
        useState([]);

    const [form, setForm] =
        useState({

            image: "",

            name: "",

            description: "",

            price: "",

            showPrice: true,
        });

    const [loading, setLoading] =
        useState(false);


    // FETCH PRODUCTS
    const fetchProducts =
        async () => {

            try {

                const res =
                    await axios.get(

                        `${import.meta.env.VITE_API_URL}/api/products/user/${user._id}`

                    );

                setProducts(res.data);

            } catch (error) {

                console.log(error);
            }
        };


    useEffect(() => {

        fetchProducts();

    }, []);


    // ADD PRODUCT
    const handleAddProduct =
        async () => {

            if (
                !form.name ||
                !form.price
            ) {
                return alert(
                    "Please fill required fields"
                );
            }

            try {

                setLoading(true);

                await axios.post(

                    `${import.meta.env.VITE_API_URL}/api/products`,

                    {
                        userId:
                            user._id,

                        ...form,
                    }
                );

                setForm({

                    image: "",

                    name: "",

                    description: "",

                    price: "",

                    showPrice: true,
                });

                fetchProducts();

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };


    // DELETE PRODUCT
    const handleDelete =
        async (id) => {

            try {

                await axios.delete(

                    `${import.meta.env.VITE_API_URL}/api/products/${id}`

                );

                fetchProducts();

            } catch (error) {

                console.log(error);
            }
        };


    return (

        <div
            style={{
                padding: "24px",
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    marginBottom: "24px",
                }}
            >

                <h1
                    style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        marginBottom: "6px",
                    }}
                >
                    Products & Services
                </h1>

                <p
                    style={{
                        color: "#64748b",
                    }}
                >
                    Add products that appear
                    on your public profile.
                </p>
            </div>


            {/* FORM */}
            <div
                style={{
                    background: "#fff",

                    borderRadius: "20px",

                    padding: "24px",

                    boxShadow:
                        "0 10px 30px rgba(15,23,42,0.06)",

                    display: "grid",

                    gap: "16px",

                    marginBottom: "30px",
                }}
            >

                {/* IMAGE */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >

                    <label
                        style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#1e293b",
                        }}
                    >
                        Product Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"

                        onChange={async (e) => {

                            const file =
                                e.target.files[0];

                            if (!file) return;

                            try {

                                setLoading(true);

                                const data =
                                    new FormData();

                                data.append(
                                    "file",
                                    file
                                );

                                const res =
                                    await axios.post(

                                        `${import.meta.env.VITE_API_URL}/api/upload`,

                                        data
                                    );

                                console.log(res.data);

                                setForm((prev) => ({

                                    ...prev,

                                    image:
                                        res.data.url,
                                }));

                            } catch (error) {

                                console.log(error);

                            } finally {

                                setLoading(false);
                            }
                        }}

                        style={{
                            padding: "14px",

                            borderRadius: "14px",

                            border:
                                "1px solid #e2e8f0",

                            background: "#fff",

                            cursor: "pointer",
                        }}
                    />

                    {/* PREVIEW */}
                    {form.image && (

                        <img
                            src={form.image}
                            alt="preview"

                            style={{
                                width: "100%",

                                height: "220px",

                                objectFit: "cover",

                                borderRadius: "16px",

                                border:
                                    "1px solid #e2e8f0",
                            }}
                        />
                    )}

                </div>

                {/* NAME */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name:
                                e.target.value,
                        })
                    }
                    style={inputStyle}
                />

                {/* DESCRIPTION */}
                <textarea
                    placeholder="Product Description"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description:
                                e.target.value,
                        })
                    }
                    style={{
                        ...inputStyle,

                        resize: "none",

                        minHeight: "120px",

                        paddingTop: "16px",
                    }}
                />

                {/* PRICE */}
                <input
                    type="text"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            price:
                                e.target.value,
                        })
                    }
                    style={inputStyle}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >

                    <input
                        type="checkbox"

                        checked={form.showPrice}

                        onChange={(e) =>
                            setForm({
                                ...form,
                                showPrice:
                                    e.target.checked,
                            })
                        }

                        style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                        }}
                    />

                    <label
                        style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#475569",
                        }}
                    >
                        Show Price Publicly
                    </label>

                </div>

                {/* BUTTON */}
                <button
                    onClick={
                        handleAddProduct
                    }
                    disabled={loading}
                    style={{
                        height: "52px",

                        border: "none",

                        borderRadius: "14px",

                        background:
                            "linear-gradient(135deg,#7c3aed,#a855f7)",

                        color: "#fff",

                        fontWeight: "700",

                        fontSize: "15px",

                        cursor: "pointer",
                    }}
                >
                    {loading
                        ? "Adding..."
                        : "Add Product"}
                </button>

            </div>

            {/* LIVE PREVIEW */}
            <div
                style={{
                    marginBottom: "30px",
                }}
            >

                <h2
                    style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        marginBottom: "16px",
                    }}
                >
                    Live Preview
                </h2>

                <div
                    style={{
                        maxWidth: "380px",

                        background: "#fff",

                        borderRadius: "24px",

                        overflow: "hidden",

                        boxShadow:
                            "0 10px 40px rgba(15,23,42,0.08)",

                        border:
                            "1px solid #eef2ff",
                    }}
                >

                    {/* IMAGE */}
                    <div
                        style={{
                            width: "100%",
                            height: "240px",
                            background: "#f8fafc",
                        }}
                    >

                        {form.image ? (

                            <img
                                src={form.image}
                                alt="preview"

                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                        ) : (

                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    color: "#94a3b8",

                                    fontWeight: "600",
                                }}
                            >
                                Product Image Preview
                            </div>
                        )}

                    </div>

                    {/* CONTENT */}
                    <div
                        style={{
                            padding: "20px",
                        }}
                    >

                        {/* NAME */}
                        <h2
                            style={{
                                margin: 0,

                                fontSize: "22px",

                                fontWeight: "800",

                                color: "#0f172a",
                            }}
                        >
                            {form.name || "Product Name"}
                        </h2>

                        {/* DESCRIPTION */}
                        <p
                            style={{
                                marginTop: "10px",

                                color: "#64748b",

                                lineHeight: 1.6,

                                fontSize: "14px",
                            }}
                        >
                            {form.description ||
                                "Your product description will appear here."}
                        </p>

                        {/* BOTTOM */}
                        <div
                            style={{
                                marginTop: "18px",

                                display: "flex",

                                justifyContent:
                                    "space-between",

                                alignItems: "center",
                            }}
                        >

                            {/* PRICE */}
                            {form.showPrice ? (

                                <span
                                    style={{
                                        fontSize: "28px",

                                        fontWeight: "800",

                                        color: "#7c3aed",
                                    }}
                                >
                                    ₹{form.price || "0"}
                                </span>

                            ) : (

                                <span
                                    style={{
                                        fontSize: "15px",

                                        fontWeight: "700",

                                        color: "#64748b",
                                    }}
                                >
                                    Custom Pricing
                                </span>

                            )}

                            {/* BUTTON */}
                            <button
                                style={{
                                    border: "none",

                                    padding:
                                        "12px 18px",

                                    borderRadius:
                                        "12px",

                                    background:
                                        "linear-gradient(135deg,#7c3aed,#a855f7)",

                                    color: "#fff",

                                    fontWeight: "700",

                                    cursor: "pointer",

                                    display: "flex",

                                    alignItems: "center",

                                    gap: "8px",
                                }}
                            >
                                💬 Inquiry
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* PRODUCT LIST */}
            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",

                    gap: "20px",
                }}
            >

                {products.map(
                    (product) => (

                        <div
                            key={product._id}
                            style={{
                                background: "#fff",

                                borderRadius:
                                    "20px",

                                overflow:
                                    "hidden",

                                boxShadow:
                                    "0 10px 30px rgba(15,23,42,0.06)",
                            }}
                        >

                            {/* IMAGE */}
                            {product.image && (

                                <img
                                    src={
                                        product.image
                                    }
                                    alt=""
                                    style={{
                                        width: "100%",

                                        height: "220px",

                                        objectFit:
                                            "cover",
                                    }}
                                />
                            )}

                            {/* CONTENT */}
                            <div
                                style={{
                                    padding: "18px",
                                }}
                            >

                                <h2
                                    style={{
                                        margin: 0,

                                        fontSize:
                                            "20px",

                                        fontWeight:
                                            "700",
                                    }}
                                >
                                    {product.name}
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#64748b",

                                        lineHeight:
                                            1.6,

                                        marginTop:
                                            "8px",
                                    }}
                                >
                                    {
                                        product.description
                                    }
                                </p>

                                <div
                                    style={{
                                        marginTop:
                                            "16px",

                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <span
                                        style={{
                                            color:
                                                "#7c3aed",

                                            fontWeight:
                                                "800",

                                            fontSize:
                                                "24px",
                                        }}
                                    >
                                        ₹
                                        {product.showPrice
                                            ? `₹${product.price}`
                                            : "Custom Pricing"}
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                        style={{
                                            background:
                                                "#ef4444",

                                            color:
                                                "#fff",

                                            border:
                                                "none",

                                            padding:
                                                "10px 16px",

                                            borderRadius:
                                                "10px",

                                            cursor:
                                                "pointer",

                                            fontWeight:
                                                "700",
                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};


const inputStyle = {

    width: "100%",

    minHeight: "54px",

    borderRadius: "14px",

    border:
        "1px solid #e2e8f0",

    padding: "16px",

    fontSize: "15px",

    outline: "none",

    background: "#fff",

    color: "#0f172a",

    fontFamily: "inherit",

    boxSizing: "border-box",
};

export default ProductAndServices;