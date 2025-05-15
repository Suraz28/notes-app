import { IoIosSearch, IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (value.trim() === "") {
        onClearSearch(); // run clear if input is empty
      } else {
        handleSearch(); // otherwise, perform search
      }
    }
  };
  return (
    <div className="relative w-80 flex items-center px-4 bg-white rounded-md">
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-xs bg-transparent px-1 mr-2 py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <IoMdClose
          className="text-xl text-gray-800 cursor-pointer mr-3"
          onClick={onClearSearch}
        />
      )}
      <IoIosSearch
        className=" absolute right-1 text-xl text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
