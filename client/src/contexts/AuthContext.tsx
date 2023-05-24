import { ReactNode, createContext, useContext, useState } from "react";
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
  const navigate = useNavigate();

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
    }
    return parsedData;
  }

  function logout() {
    setUser(null);
    navigate("/auth");
  }

  const value = { user, login, signup, logout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return useContext(authContext);
}
