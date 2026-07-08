import { useAppContext } from '../../context/AppContext.js';
import type {SearchBarProps} from '../../types/user.types.js'

const SearchBar = ({ search, setSearch }: SearchBarProps) => {

  const {setCurrPage} = useAppContext() ;

  console.log("Re-set Page Number to 1 in SearchBar.tsx")


  return (
    <input  className="mb-4 p-2 w-full text-lg rounded-md border border-[#3a5035] outline-none"
    type="text" placeholder="Search by name" value={search}
      onChange={(e) => setSearch(e.target.value)}
      onClick={() => setCurrPage(1) }
    />
  );
};

export default SearchBar;