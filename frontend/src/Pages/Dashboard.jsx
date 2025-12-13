import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Welcome{ name ? `, ${name}` : "" }!
        </h1>

        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          You’re logged in and ready to manage your account.
        </p>

        <button
          onClick={handleLogout}
          className="
            w-full bg-red-500 text-white py-3 rounded-lg font-semibold
            hover:bg-red-600 active:scale-95 transition
          "
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
