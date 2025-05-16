import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { MdOutlineEmail } from "react-icons/md";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../Contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { getUserInfo } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("invalid email address");
      setTimeout(() => {
        setEmailError("");
      }, 2500);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("invalid password");
      setTimeout(() => {
        setPasswordError("");
      }, 2500);
      return;
    }

    //login api call
    try {
      const response = await axiosInstance.post("/login", {
        email: email.toLowerCase(),
        password: password,
      });

      //handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        await getUserInfo();
        navigate("/dashboard");
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2500);
        return;
      } else {
        setError("An unxpected error occured. Please try again");
        setTimeout(() => {
          setError("");
        }, 2500);
        return;
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 px-7 py-10 rounded-xl bg-transparent border border-white/90  backdrop-blur-lg shadow-lg">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                className=" input-box border border-white/90"
                value={email}
                onChange={(e) => emailValue(e)}
              />
              <MdOutlineEmail className="absolute transform -translate-y-1/2 top-6 right-5 text-gray-600" />
            </div>
            {emailError && (
              <p className="text-xs pb-2 text-red-500">{emailError}</p>
            )}
            <PasswordInput
              value={password}
              onChange={(e) => passwordValue(e)}
            />
            {passwordError && (
              <p className="text-xs pb-2 text-red-500">{passwordError}</p>
            )}
            {error && <p className="text-xs pb-2 text-red-500">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-meduim text-primary underline "
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
