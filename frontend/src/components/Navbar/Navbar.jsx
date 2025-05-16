import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useUser } from "../../Contexts/UserContext";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const { userInfo, setUserInfo, onSearchNote, setIsSearch, getAllNotes } =
    useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="bg-white-60 backdrop-blur-sm shadow-md min-h-[50px] w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <h2
            className="h-12 flex text-xl font-semibold text-gray-800 cursor-pointer flex-w-full items-center justify-center"
            onClick={() => navigate("/dashboard")}
          >
            📒 Notes
          </h2>

          {/* Center: Search bar (desktop only) */}
          {!isLoginPage && userInfo && (
            <div className="hidden md:flex flex-1 justify-center">
              <div className="w-full max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => {
                    const val = target.value;
                    setSearchQuery(val);
                    if (val.trim() === "") handleClearSearch();
                  }}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
            </div>
          )}

          {/* Right: Profile or menu button */}
          {!isLoginPage && userInfo && (
            <div className="flex items-center gap-4">
              {/* Desktop profile */}
              <div className="hidden md:block">
                <ProfileInfo handleLogout={handleLogout} />
              </div>

              {/* Hamburger icon (mobile) */}
              <div className="md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-800 focus:outline-none"
                >
                  {menuOpen ? <RxCross2 size={24} /> : <MdMenu size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {!isLoginPage && userInfo && menuOpen && (
          <div className="mt-4 md:hidden space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                const val = target.value;
                setSearchQuery(val);
                if (val.trim() === "") handleClearSearch();
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
            <ProfileInfo handleLogout={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
