import { useAppContext } from "../../context/AppContext";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const Pagination = () => {
    const  { currPage, setCurrPage, totalPages } = useAppContext() ;
  return (
    <div> 

        <div className="l-auto flex float-right m-3 text-sxl text-lime-600">   

            <button disabled = {currPage === 1} 
            onClick={() => setCurrPage(currPage - 1)}
            className={ `bg-[#232f20] rounded-md cursor-pointer hover:scale-104 p-1 ${currPage > 1 ? "block" : "hidden"}`}> <ArrowBackIosNewIcon/> </button>

          
            <button className="mx-3 bg-[#232f20] w-10 h-10 border border-[#3a5035] rounded-full"> { currPage } </button>

            <button disabled = {currPage === totalPages}
            onClick={() => setCurrPage(currPage + 1)}
            className= {`bg-[#232f20] rounded-md cursor-pointer hover:scale-104 p-1 ${currPage > totalPages-1 ? "hidden" : "block"}`} > <ArrowForwardIosIcon/>  </button>

        </div>
    </div>
  )
}
export default Pagination