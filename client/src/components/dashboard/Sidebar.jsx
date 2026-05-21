import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="w-[260px] min-h-screen bg-black text-white p-6 flex flex-col">

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          TapToGo
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Digital Business Card
        </p>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-3 flex-1">

        <Link
          to="/dashboard"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Dashboard
        </Link>

        <Link
          to="/dashboard/my-card"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          My Card
        </Link>

        <Link
          to="/dashboard/social-links"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Social Links
        </Link>

        <Link
          to="/dashboard/company-info"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Company Info
        </Link>

        <Link
          to="/dashboard/theme"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Customize Theme
        </Link>

        <Link
          to="/dashboard/activate-tag"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Activate Tag
        </Link>

        <Link
          to="/dashboard/leads"
          className="p-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Leads
        </Link>

      </div>

      {/* LOGOUT */}
      <button
        onClick={logoutHandler}
        className="bg-white text-black p-3 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;