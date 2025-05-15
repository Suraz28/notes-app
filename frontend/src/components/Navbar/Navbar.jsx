import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useUser } from "../../Contexts/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  const { userInfo, setUserInfo, onSearchNote, setIsSearch, getAllNotes } =
    useUser();

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white/70 flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      {!isLoginPage && userInfo && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            const val = target.value;
            setSearchQuery(val);
            if (val.trim() === "") {
              handleClearSearch();
            }
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}
      {!isLoginPage && userInfo && <ProfileInfo handleLogout={handleLogout} />}
    </div>
  );
};

export default Navbar;
