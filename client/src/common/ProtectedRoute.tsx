import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    !auth.user && navigate("/auth");
  }, []);

  return auth.user ? <>{children}</> : <p>Unauthenticated... redirecting </p>;
}
