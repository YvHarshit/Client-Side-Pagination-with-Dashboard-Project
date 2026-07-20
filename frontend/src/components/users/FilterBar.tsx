import { useAppContext } from "../../context/AppContext";

const FilterBar = () => {
  const { selectedDomain, setSelectedDomain, setCurrPage} = useAppContext() ;
  //console.log("Re-set Page Number to 1 in FilterBar.tsx")

  return (
    <div className="mb-4 p-2 w-full text-lg rounded-md border border-[#3a5035] bg-[#232f20]">        

        <select value = {selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          onClick={() => setCurrPage(1) }>

            <option className="bg-[#232f20] text-white" value="all" >ALL</option>
            <option className="bg-[#232f20] text-white" value="gmail.com">GMAIL</option>
            <option className="bg-[#232f20] text-white" value="yahoo.com">YAHOO</option>
            <option className="bg-[#232f20] text-white" value="hotmail.com">HOTMAIL</option>
            <option className="bg-[#232f20] text-white" value="outlook.com">OUTLOOK</option>

        </select>
    </div>
  )
}
export default FilterBar ;