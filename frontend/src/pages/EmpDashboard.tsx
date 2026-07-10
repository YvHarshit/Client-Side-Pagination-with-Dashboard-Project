import { useEffect, useState } from "react";
import cover from "../assests/cover.jpg";
import profile from "../assests/profile.jpg";
import { useAppContext } from "../context/AppContext";
import ProfileField from "../pages/ProfileField";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EmpDashboard = () => {
  const { empDetails, backendUrl, fetchEmployeeDetails} = useAppContext();
  const navigate = useNavigate() ;

    const employee = empDetails ?? {
    name: "",
    email: "",
    phone: "",
    Eid: "",
    department: "",
  };

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    Eid: employee.Eid,
    department: employee.department,
  });


  useEffect(() => {
    if (empDetails) {
      setFormData({
        name: empDetails.name || "",
        email: empDetails.email || "",
        phone: empDetails.phone || "",
        Eid: empDetails.Eid || "",
        department: empDetails.department || "",
      });
    }
  }, [empDetails]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => (
    { ...prev, [name]: value  }));
  };

  const handleEdit = () =>   setIsEditing(true);

  const handleCancel = () => {
    if (empDetails) {
      setFormData({
        name: empDetails.name || "",
        email: empDetails.email || "",
        phone: empDetails.phone || "",
        Eid: empDetails.Eid|| "",
        department: empDetails.department || "",
      });
    }

    setIsEditing(false);
  };

  const handleUpdate = async () => {
    try {    
      const { data } = await axios.patch(`${backendUrl}/user/update-profile`, formData, { withCredentials: true });

      console.log(data);    
      console.log("Updated Data:", formData);
      await fetchEmployeeDetails()
      toast.success("Profile Updated")

      setIsEditing(false);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async() => {
    try {
      const {data} = await axios.post(`${backendUrl}/user/emplogout`)

      if(data.success){
        toast.success("Logout Successfully")
        navigate("/emp-login")
        console.log("Calling from handlelogout")
      }
      
    } catch (error) {
      console.log("Failed to Logout ", error)
      toast.error("Failed to Logout")
      
    }

  }



  return (
    <div className="min-h-screen bg-gray-200">
      <div className="overflow-hidden rounded-md border">

        <div className="relative h-52 md:h-74">
              <img src={cover} alt="Cover"
                className="h-full w-full object-cover "/>
            </div>
 
            <div className="absolute left-8 top-32 md:left-14 md:top-36">
               <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md md:h-60 md:w-60 ">
                <img src={profile} alt="Employee Avatar" className="object-cover "/>
              </div>
            </div>
        </div>

      <div className="px-8 pb-12 pt-28 md:px-16">
        <div className="mb-10 flex justify-end gap-4">

          

          {!isEditing 
            ? (<div>
            <button onClick={handleEdit} 
            className="rounded-lg bg-slate-900 px-6 py-2 text-white hover:bg-slate-700 mx-3">
              Edit Profile </button> 

            <button onClick={handleLogout} 
            className="rounded-lg bg-red-800 px-6 py-2 text-white hover:bg-red-700 mx-3">
              Logout </button>
            </div>     
            ) 
            : (
            <>
              <button onClick={handleUpdate}
                className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                Save </button>

              <button onClick={handleCancel}
                className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600">
                Cancel </button>
            </>
            )}

        </div>

        <div className="ml-4 grid grid-cols-1 gap-8 md:ml-32 md:grid-cols-2">

          {isEditing 
            ? (
            <div>
              <label className="text-black mb-2 block font-semibold">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="text-black w-max border-0 border-b-3 rounded border-lime-600 p-2" />
            </div>)
            : <ProfileField label="Name" value={employee.name} />
}


            <ProfileField label="Eid" value={employee.Eid ?? "-"}/>
            <ProfileField label="Email" value={employee.email}/>

          
          {isEditing 
            ? (
            <div>
              <label className="text-black mb-2 block font-semibold">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="text-black w-max border-0 border-b-3 rounded border-lime-600 p-2" />
            </div> ) 
            : (
            <ProfileField label="Phone" value={employee.phone ?? "-"} />)}

          
          {isEditing 
            ? (
            <div>
              <label className="text-black mb-2 block font-semibold">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange}
                className="text-black w-max border-0 border-b-3 rounded border-lime-600 p-2" />
            </div> ) 
            : ( <ProfileField label="Department" value={employee.department ?? "-"}/>)}

        
          <ProfileField label="Account Status" value="Active" />
          <ProfileField label="Salary" value="₹45,000" />
          <ProfileField label="Experience" value="2+ Years" />
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;