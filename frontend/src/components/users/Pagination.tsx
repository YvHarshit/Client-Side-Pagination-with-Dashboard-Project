import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppContext } from "../../context/AppContext";



const Pagination = () => {
  const { currPage, setCurrPage, totalPages } = useAppContext();

  return (
    <div className="flex justify-center mt-10 mb-8">

      <div className="flex items-center gap-5 border border-[#3a5035] rounded-2xl px-6 py-4 shadow-lg">

       

        <button disabled={currPage === 1}
          onClick={() => setCurrPage(currPage - 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
            ${currPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#3a5035] hover:scale-105" }`}>
          <ArrowBackIosNewIcon fontSize="small" />
          <span>Previous</span>
        </button>

        {/* Current Page */}

        <div className="flex flex-col items-center">

          <span className="text-xs uppercase tracking-wider text-gray-400">
            Page
          </span>

          <div className="mt-1 px-6 py-2 rounded-full bg-[#171f11] border border-[#a8d96c] text-[#a8d96c] font-bold text-lg">
            {currPage}
            <span className="text-gray-400 font-normal">
              {" "}
              / {totalPages}
            </span>
          </div>

        </div>

        {/* Next */}

        <button
          disabled={currPage === totalPages}
          onClick={() => setCurrPage(currPage + 1)}
          className={`
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            transition-all duration-200
            ${
              currPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#3a5035] hover:scale-105"
            }
          `}
        >
          <span>Next</span>
          <ArrowForwardIosIcon fontSize="small" />
        </button>

      </div>

    </div>
  );
};

export default Pagination;