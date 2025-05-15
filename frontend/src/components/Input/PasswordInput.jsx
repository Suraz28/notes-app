import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 border-white/90">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEyeSlash
          onClick={toggleShowPassword}
          className="cursor-pointer text-gray-600"
        />
      ) : (
        <FaRegEye
          onClick={toggleShowPassword}
          className="cursor-pointer text-gray-600"
        />
      )}
    </div>
  );
};

export default PasswordInput;
