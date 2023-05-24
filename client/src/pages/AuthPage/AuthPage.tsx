import { useRef, useState } from "react";
import { sha256, validateEmail } from "../../utils/utils";
import useAuth from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [type, setType] = useState("Login");
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const confirmRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const auth = useAuth();

  const navigate = useNavigate();

  async function handleSubmit() {
    if (!validateEmail(emailRef.current.value)) {
      return alert("Invalid email");
    }
    if (passRef.current.value.length < 6) {
      return alert(
        type === "Register"
          ? "Password has to be alteast 6 characters long"
          : "Invalid credentials"
      );
    }
    if (
      type === "Register" &&
      passRef.current.value != confirmRef.current.value
    ) {
      return alert("Passwords don't match");
    }

    if (type === "Register") {
      const data = await auth.signup(
        emailRef.current.value,
        await sha256(passRef.current.value)
      );
      if (data.code == 1) {
        alert(data.message);
      } else {
        navigate("/");
      }
    } else {
      const data = await auth.login(
        emailRef.current.value,
        await sha256(passRef.current.value)
      );
      if (data.code == 1) {
        alert(data.message);
      } else {
        navigate("/");
      }
    }
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-y-5">
      <div className="border-2 flex flex-row items-center border-black border-opacity-30 rounded-md">
        <span className="material-icons border-r-2 border-black py-4 px-4 border-opacity-30 ">
          &#xe158;
        </span>
        <input
          placeholder="email"
          type="email"
          className="py-4 px-2 text-xl"
          ref={emailRef}
        />
      </div>
      <div className="border-2 flex flex-row items-center border-black border-opacity-30 rounded-md">
        <span className="material-icons border-r-2 border-black py-4 px-4 border-opacity-30">
          &#xe897;
        </span>
        <input
          placeholder="password"
          type="password"
          className="py-4 px-2 text-xl"
          ref={passRef}
        />
      </div>
      {type === "Register" && (
        <div className="border-2 flex flex-row items-center border-black border-opacity-30 rounded-md">
          <span className="material-icons border-r-2 border-black py-4 px-4 border-opacity-30">
            &#xef57;
          </span>
          <input
            placeholder="confirm password"
            type="password"
            className="py-4 px-2 text-xl"
            ref={confirmRef}
          />
        </div>
      )}{" "}
      <button
        className="py-4 px-4 bg-black text-white rounded-lg"
        onClick={handleSubmit}
      >
        {type}
      </button>
      <button
        onClick={() => {
          setType(type === "Register" ? "Login" : "Register");
        }}
      >
        {type === "Register"
          ? "Already have an account? Login"
          : "Create new account"}
      </button>
    </div>
  );
}
