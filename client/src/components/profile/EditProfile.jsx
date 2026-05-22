import { useState, useRef } from "react";

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px 12px 40px",
  borderRadius: "12px",
  border: "1.5px solid #e2e8f0",
  outline: "none",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "#1e293b",
  background: "#f8fafc",
  transition: "border-color 0.2s",
};

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

const labelStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: "6px",
};

const fieldWrap = { display: "flex", flexDirection: "column" };

// Inline SVG icons
const Icons = {
  user: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  mail: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.59a16 16 0 006.5 6.5l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
  pin: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  brief: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
  at: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" /></svg>,
  globe: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  building: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="13" height="18" /><path d="M21 8h-5v13h5z" /><path d="M7 7h4M7 11h4M7 15h4" /></svg>,
  image: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
  camera: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  save: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
  link: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>,
};

const Field = ({ icon, label, name, type = "text", placeholder, form, set, hint }) => (
  <div style={fieldWrap}>
    <label style={labelStyle}>{label}</label>
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none" }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => set(name, e.target.value)}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = "#7c3aed")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
    {hint && <span style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>{hint}</span>}
  </div>
);

const tabs = [
  { id: "mycard", label: "My Card" },
  { id: "social", label: "Social Links" },
  { id: "company", label: "Company Info" },
  { id: "theme", label: "Customize Theme" },
  { id: "lead", label: "Lead Capture Form" },
];

export default function EditProfile() {
  const fileRef = useRef(null);
  const coverRef = useRef(null);
  const logoRef = useRef(null);
  const [activeTab, setActiveTab] = useState("mycard");
  const [saved, setSaved] = useState(false);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [form, setForm] =
    useState({

      profileImage:
        user?.profileImage || "",

      coverImage:
        user?.coverImage || "",

      logoImage:
        user?.logoImage || "",

      firstName:
        user?.name?.split(" ")[0] || "",

      lastName:
        user?.name?.split(" ")[1] || "",

      username:
        user?.username || "",

      email:
        user?.email || "",

      jobTitle:
        user?.jobTitle || "",

      company:
        user?.company || "",

      phone:
        user?.phone || "",

      website:
        user?.website || "",

      location:
        user?.location || "",

      bio:
        user?.bio || "",

      instagram:
        user?.instagram || "",

      linkedin:
        user?.linkedin || "",

      github:
        user?.github || "",

      youtube:
        user?.youtube || "",

      twitter:
        user?.twitter || "",

      whatsapp:
        user?.whatsapp || "",

    });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const uploadImage = async (file) => {

    try {

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const res = await fetch(

        `${import.meta.env.VITE_API_URL}/api/upload/image`,

        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      console.log(
        "CLOUDINARY RESPONSE:",
        data
      );

      // RETURN REAL URL
      return data.imageUrl;

    } catch (error) {

      console.log(
        "UPLOAD ERROR:",
        error
      );

      return null;
    }
  };
  const handleSave = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user?._id) {

        alert("User not found");

        return;
      }

      // FINAL PAYLOAD
      const payload = {

        ...form,

        name:
          `${form.firstName || ""} ${form.lastName || ""}`.trim(),

      };

      // API REQUEST
      const response =
        await fetch(

          `${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(payload),
          }
        );

      const data =
        await response.json();

      console.log(data);

      // UPDATE FORM STATE
      setForm(prev => ({

        ...prev,

        ...data,

        profileImage:
          data?.profileImage ||
          prev.profileImage,

        coverImage:
          data?.coverImage ||
          prev.coverImage,

        logoImage:
          data?.logoImage ||
          prev.logoImage,

        firstName:
          data?.name?.split(" ")[0] || "",

        lastName:
          data?.name?.split(" ")[1] || "",

      }));
      // UPDATE LOCAL STORAGE
      localStorage.setItem(

        "user",

        JSON.stringify({

          ...user,

          ...data,

        })
      );

      setSaved(true);

      setTimeout(() => {

        setSaved(false);

      }, 2000);

    } catch (error) {

      console.log(error);

    }
  };

  const bioMax = 250;
  const bioLeft = bioMax - form.bio.length;

  // ── My Card Tab ─────────────────────────────────────────────────────────────
  const myCardTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

      {/* Cover */}
      <div>
        <label style={labelStyle}>Cover Image</label>
        <div
          onClick={() => coverRef.current?.click()}
          style={{
            height: "160px", borderRadius: "18px", cursor: "pointer",
            background: form.coverImage
              ? `url(${form.coverImage}) center/cover`
              : "linear-gradient(135deg,#667eea,#764ba2,#f093fb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <input
            ref={coverRef}
            type="file"
            hidden
            accept="image/*"

            onChange={async e => {

              try {

                if (e.target.files?.[0]) {

                  // LOCAL PREVIEW
                  const previewUrl =
                    URL.createObjectURL(
                      e.target.files[0]
                    );

                  setForm(prev => ({

                    ...prev,

                    coverImage:
                      previewUrl,

                  }));

                  // CLOUDINARY UPLOAD
                  const imageUrl =
                    await uploadImage(
                      e.target.files[0]
                    );

                  // SAVE REAL URL
                  if (imageUrl) {

                    setForm(prev => ({

                      ...prev,

                      coverImage:
                        imageUrl,

                    }));

                  }
                }

              } catch (error) {

                console.log(error);

              }
            }}
          />

        </div>
      </div>

      {/* Profile Photo + Logo Row */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {/* Profile photo */}
        <div style={fieldWrap}>

          <label style={labelStyle}>
            Profile Photo
          </label>

          <div
            onClick={() =>
              fileRef.current?.click()
            }
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
              border: "3px solid #fff",
              boxShadow:
                "0 4px 16px rgba(99,102,241,0.15)",
              background: "#f3f4f6",
            }}
          >

            {/* IMAGE */}
            {form.profileImage ? (

              <img
                src={form.profileImage}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

            ) : (

              /* EMPTY STATE */
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg,#7c3aed,#a855f7)",
                  color: "#fff",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                +
              </div>

            )}

            {/* OVERLAY */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Icons.camera}
            </div>


            {/* INPUT */}
            <input
              ref={fileRef}
              type="file"
              hidden
              accept="image/*"

              onChange={async (e) => {

                try {

                  if (e.target.files?.[0]) {

                    // LOCAL PREVIEW
                    const previewUrl =
                      URL.createObjectURL(
                        e.target.files[0]
                      );

                    setForm(prev => ({

                      ...prev,

                      profileImage:
                        previewUrl,

                    }));

                    // CLOUDINARY UPLOAD
                    const imageUrl =
                      await uploadImage(
                        e.target.files[0]
                      );

                    // SAVE REAL URL
                    if (imageUrl) {

                      setForm(prev => ({

                        ...prev,

                        profileImage:
                          imageUrl,

                      }));

                    }
                  }

                } catch (error) {

                  console.log(error);

                }
              }}
            />


          </div>
        </div>
        {/* Company Logo */}
        <div style={fieldWrap}>
          <label style={labelStyle}>Company Logo</label>
          <div
            onClick={() => logoRef.current?.click()}
            style={{
              width: "90px", height: "90px", borderRadius: "16px", cursor: "pointer",
              border: "2px dashed #c7d2fe", background: "#f5f3ff",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "4px", transition: "border-color 0.2s", position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#7c3aed"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#c7d2fe"}
          >
            {form.logoImage
              ? <img src={form.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px", boxSizing: "border-box" }} />
              : <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <span style={{ fontSize: "10px", color: "#a78bfa", fontWeight: "700", textAlign: "center", lineHeight: 1.2 }}>Upload Logo</span>
              </>
            }
            <input
              ref={logoRef}
              type="file"
              hidden
              accept="image/*"

              onChange={async e => {

                try {

                  if (e.target.files?.[0]) {

                    // LOCAL PREVIEW
                    const previewUrl =
                      URL.createObjectURL(
                        e.target.files[0]
                      );

                    setForm(prev => ({

                      ...prev,

                      logoImage:
                        previewUrl,

                    }));

                    // CLOUDINARY UPLOAD
                    const imageUrl =
                      await uploadImage(
                        e.target.files[0]
                      );

                    // SAVE REAL URL
                    if (imageUrl) {

                      setForm(prev => ({

                        ...prev,

                        logoImage:
                          imageUrl,

                      }));

                    }
                  }

                } catch (error) {

                  console.log(error);

                }
              }}
            />
          </div>
        </div>

        {/* First + Last Name next to photos */}
        <div style={{ flex: 1, minWidth: "180px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", alignContent: "start" }}>
          <Field icon={Icons.user} label="First Name" name="firstName" placeholder="First name" form={form} set={set} />
          <Field icon={Icons.user} label="Last Name" name="lastName" placeholder="Last name" form={form} set={set} />
        </div>
      </div>

      {/* Detail grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px" }}>
        <Field icon={Icons.at} label="Username" name="username" placeholder="yourhandle" form={form} set={set} hint="taplink.cc/yourhandle" />
        <Field icon={Icons.mail} label="Email" name="email" type="email" placeholder="you@example.com" form={form} set={set} />
        <Field icon={Icons.brief} label="Job Title" name="jobTitle" placeholder="e.g. Director" form={form} set={set} />
        <Field icon={Icons.building} label="Company" name="company" placeholder="Company name" form={form} set={set} />
        <Field icon={Icons.globe} label="Website" name="companyUrl" placeholder="company.com" form={form} set={set} />
        <Field icon={Icons.pin} label="Location" name="location" placeholder="City, Country" form={form} set={set} />
      </div>

      {/* Phone */}
      <Field icon={Icons.phone} label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" form={form} set={set} />

      {/* Bio */}
      <div style={fieldWrap}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Bio</label>
          <span style={{ fontSize: "11px", color: bioLeft < 30 ? "#f59e0b" : "#94a3b8", fontWeight: "600" }}>{bioLeft} / {bioMax}</span>
        </div>
        <textarea
          rows={4} maxLength={bioMax} value={form.bio}
          onChange={e => set("bio", e.target.value)}
          placeholder="Write a short bio..."
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: "12px", outline: "none", fontSize: "14px", fontFamily: "inherit", resize: "none", color: "#1e293b", background: "#f8fafc", lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = "#7c3aed")}
          onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
    </div>
  );

  // ── Social Tab ───────────────────────────────────────────────────────────────
  const socialTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Add your social links to display them on your card.</p>
      {[
        { name: "instagram", label: "Instagram", placeholder: "instagram.com/yourhandle", color: "#E1306C" },
        { name: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourprofile", color: "#0A66C2" },
        { name: "github", label: "GitHub", placeholder: "github.com/yourusername", color: "#333" },
        { name: "twitter", label: "Twitter/X", placeholder: "twitter.com/yourhandle", color: "#1DA1F2" },
      ].map(({ name, label, placeholder, color }) => (
        <div key={name} style={fieldWrap}>
          <label style={labelStyle}>{label}</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={form[name] ? color : "#94a3b8"} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
            </span>
            <input type="url" placeholder={placeholder} value={form[name] || ""} onChange={e => set(name, e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = color)} onBlur={e => (e.target.style.borderColor = "#e2e8f0")} />
          </div>
        </div>
      ))}
    </div>
  );

  // ── Company Tab ──────────────────────────────────────────────────────────────
  const companyTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Company information shown on your digital card.</p>

      <Field icon={Icons.building} label="Company Name" name="company" placeholder="Your company" form={form} set={set} />
      <Field icon={Icons.globe} label="Company Website" name="companyUrl" placeholder="company.com" form={form} set={set} />
      <Field icon={Icons.pin} label="Company Location" name="location" placeholder="City, Country" form={form} set={set} />
    </div>
  );

  // ── Theme Tab ────────────────────────────────────────────────────────────────
  const themeTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Choose a gradient theme for your card cover.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
        {[
          { name: "Indigo Dusk", a: "#667eea", b: "#764ba2" },
          { name: "Coral Flame", a: "#f43f5e", b: "#fb923c" },
          { name: "Emerald", a: "#10b981", b: "#06b6d4" },
          { name: "Midnight", a: "#1e293b", b: "#334155" },
          { name: "Golden", a: "#f59e0b", b: "#ef4444" },
          { name: "Sky", a: "#38bdf8", b: "#818cf8" },
        ].map(t => (
          <div key={t.name}
            onClick={() => set("coverImage", "")}
            style={{ height: "56px", borderRadius: "14px", background: `linear-gradient(135deg,${t.a},${t.b})`, cursor: "pointer", display: "flex", alignItems: "flex-end", padding: "6px 10px", border: "2px solid transparent", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#7c3aed"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
          >
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: "700" }}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Lead Tab ─────────────────────────────────────────────────────────────────
  const leadTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Fields to collect from visitors on your card.</p>
      <div style={{ padding: "12px 16px", borderRadius: "12px", background: "#eef2ff", border: "1.5px solid #c7d2fe", fontSize: "13px", color: "#4f46e5" }}>
        Lead capture lets visitors submit their contact info directly from your card page.
      </div>
      {["Name", "Email", "Phone", "Company", "Message"].map(field => (
        <label key={field} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <span style={{ fontSize: "14px", color: "#334155", fontWeight: "500" }}>{field}</span>
        </label>
      ))}
    </div>
  );

  const tabContent = { mycard: myCardTab, social: socialTab, company: companyTab, theme: themeTab, lead: leadTab };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .preview-sticky { position: static !important; }
          .name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ flex: 1, minWidth: 0, fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
        <div style={{ padding: "28px 20px" }}>

          {/* Page Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Edit Profile
            </h1>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>Manage your digital business card.</p>
          </div>

          {/* Layout */}
          <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1.5px solid #f1f5f9", boxShadow: "0 2px 16px rgba(99,102,241,0.06)" }}>

                {/* Tabs */}
                <div style={{ display: "flex", overflowX: "auto", borderBottom: "1.5px solid #f1f5f9" }}>
                  {tabs.map(({ id, label }) => (
                    <button key={id} onClick={() => setActiveTab(id)}
                      style={{ padding: "14px 18px", border: "none", borderBottom: `2px solid ${activeTab === id ? "#7c3aed" : "transparent"}`, background: activeTab === id ? "#f5f3ff" : "transparent", color: activeTab === id ? "#7c3aed" : "#64748b", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", whiteSpace: "nowrap", transition: "all 0.15s" }}
                    >{label}</button>
                  ))}
                </div>

                {/* Content */}
                <div style={{ padding: "24px" }}>{tabContent[activeTab]}</div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSave}
                  style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "none", background: saved ? "#10b981" : "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: saved ? "0 4px 16px rgba(16,185,129,0.25)" : "0 4px 20px rgba(124,58,237,0.25)", transition: "all 0.2s" }}
                >
                  {saved
                    ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg> Saved!</>
                    : <>{Icons.save} Save Changes</>
                  }
                </button>
                <button style={{ padding: "14px 22px", borderRadius: "14px", border: "1.5px solid #e2e8f0", background: "#fff", fontSize: "14px", fontWeight: "600", color: "#64748b", cursor: "pointer", fontFamily: "inherit" }}>
                  Cancel
                </button>
              </div>
            </div>

            {/* RIGHT: Card Preview */}
            <div className="preview-sticky" style={{ position: "sticky", top: "90px" }}>
              <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1.5px solid #f1f5f9", boxShadow: "0 2px 16px rgba(99,102,241,0.06)" }}>

                {/* Preview header */}
                <div style={{ padding: "14px 18px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>Card Preview</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>Live</span>
                </div>

                {/* Card */}
                <div style={{ margin: "16px", borderRadius: "18px", overflow: "hidden", boxShadow: "0 8px 32px rgba(99,102,241,0.1)", border: "1px solid #f1f5f9" }}>

                  {/* Cover */}
                  <div style={{ height: "110px", background: form.coverImage ? `url(${form.coverImage}) center/cover` : "linear-gradient(135deg,#667eea,#764ba2,#f093fb)", position: "relative" }}>
                    {/* Logo badge top-right */}
                    {form.logoImage && (
                      <div style={{ position: "absolute", top: "10px", right: "10px", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.92)", padding: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={form.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ background: "#fff", padding: "0 16px 18px" }}>
                    {/* Avatar + Connect */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "10px", marginBottom: "10px" }}>
                      {
                        form.profileImage && (
                          <img
                            src={form.profileImage}
                            alt=""
                            style={{
                              width: "72px",
                              height: "72px",
                              borderRadius: "14px",
                              objectFit: "cover",
                              border: "3px solid #fff",
                              boxShadow:
                                "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                        )
                      }
                      <button style={{ marginBottom: "4px", padding: "7px 14px", borderRadius: "10px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontSize: "12px", fontWeight: "700", border: "none", cursor: "pointer" }}>Connect</button>
                    </div>

                    {/* Name + title */}
                    <h2 style={{ margin: "0 0 2px", fontSize: "18px", fontWeight: "800", color: "#1e293b" }}>{form.firstName} {form.lastName}</h2>
                    <p style={{ margin: "0 0 2px", fontSize: "12px", color: "#7c3aed", fontWeight: "700" }}>
                      {form.jobTitle}{form.company ? ` · ${form.company}` : ""}
                    </p>
                    {form.location && (
                      <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "3px" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {form.location}
                      </p>
                    )}
                    {form.bio && <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#64748b", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{form.bio}</p>}

                    {/* Contact pills */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {form.phone && <div style={infoBox}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.59a16 16 0 006.5 6.5l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>{form.phone}</div>}
                      {form.email && <div style={infoBox}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.email}</span></div>}
                      {form.location && <div style={infoBox}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>{form.location}</div>}
                    </div>
                  </div>
                </div>

                {/* Share URL */}
                <div style={{ margin: "0 16px 16px", display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "11px", padding: "9px 12px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
                  <span style={{ fontSize: "12px", color: "#64748b", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>taplink.cc/{form.username || "yourhandle"}</span>
                  <button style={{ fontSize: "12px", fontWeight: "700", color: "#7c3aed", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}