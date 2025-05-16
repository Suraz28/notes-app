import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const nameValue = (e) => {
    setName(e.target.value);
  };

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim()) {
      setNameError("name field is empty");
      setTimeout(() => {
        setNameError("");
      }, 2500);
      return;
    }

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

    //signup api call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
      });

      //handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setMessage("Account created. Redirecting to login...");
        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unxpected error occured. Please try again");
      }

      setTimeout(() => {
        setError("");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-transparent px-7 py-10 border-white/90">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <div className="">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your name"
                  className=" input-box border border-white/90"
                  value={name}
                  onChange={(e) => nameValue(e)}
                />
                <IoMdPerson className="absolute transform -translate-y-1/2 top-6 right-5 text-gray-600" />
              </div>
              {nameError && (
                <p className="text-xs pb-2 text-red-500">{nameError}</p>
              )}
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
              {message && (
                <p className="text-xs pb-2 text-blue-500">{message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ClipLoader size={20} color="#ffffff" />
                  <span>Signing Up</span>
                </>
              ) : (
                "SignUp"
              )}
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-meduim text-primary underline ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
