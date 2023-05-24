import ProtectedRoute from "../../common/ProtectedRoute";
import useAuth from "../../contexts/AuthContext";
import TempTest from "./components/TempTest";

export default function HomePage() {
  const auth = useAuth();
  return (
    <ProtectedRoute>
      <div className="flex flex-row p-4 items-center justify-between">
        <div>User ID : {auth.user}</div>
        <button
          className="px-2 py-2 bg-black text-white rounded-md"
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </button>
      </div>
      <TempTest />
    </ProtectedRoute>
  );
}
