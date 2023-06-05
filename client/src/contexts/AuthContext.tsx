import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  code: number;
  message: string;
  id?: string;
}

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

const authContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function saveLocalUser() {
    if (user) {
      localStorage.setItem("auth-data", user);
    }
  }

  async function login(email: string, password: string) {
    const data = await fetch(
      `${SERVER_URL}/auth/validate?email=${email}&password=${password}`,
      {
        method: "GET",
      }
    );
    const parsedData: AuthResponse = await data.json();

    if (parsedData.id) {
      setUser(parsedData.id);
      saveLocalUser();
    }

    return parsedData;
  }

  async function signup(email: string, password: string) {
    const data = await fetch(`${SERVER_URL}/auth/register`, {
      body: JSON.stringify({ email: email, password: password }),
      headers: { "content-type": "application/json" },
      method: "POST",
    });

    const parsedData: AuthResponse = await data.json();

    if (parsedData.id) {
      setUser(parsedData.id);
      saveLocalUser();
    }
    return parsedData;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth-data");
    navigate("/auth");
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("auth-data");

    if (savedUser) {
      setUser(savedUser);
    }

    console.log(user);

    setLoading(false);
  }, []);

  const value = { user, login, signup, logout };
  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
