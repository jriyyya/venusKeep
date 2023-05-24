import useAuth from "../../contexts/AuthContext";
import TempTest from "./components/TempTest";

export default function HomePage() {
  const auth = useAuth();
  return (
    <>
      <button
        className="px-2 py-4 bg-black text-white rounded-md"
        onClick={() => {
          auth.logout();
        }}
      >
        Logout {auth.user} ;
      </button>
    </>
  );
}
