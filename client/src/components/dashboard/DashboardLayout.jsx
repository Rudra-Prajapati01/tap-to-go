import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;