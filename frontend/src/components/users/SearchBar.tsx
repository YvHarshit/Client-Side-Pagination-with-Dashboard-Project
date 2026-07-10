import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.js";

const SearchBar = () => {
  const { setCurrPage, setSearchStr } = useAppContext();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchStr(search);
      setCurrPage(1);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [search, setSearchStr, setCurrPage]);

  return (
    <input
      className="mb-4 p-2 w-full text-lg rounded-md border border-[#3a5035] outline-none"
      type="text" placeholder="Search by name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;