import { useEffect, useState } from "react";
import cover from "../assests/cover2.jpg";
import profile from "../assests/profile.jpg";
import { useAppContext } from "../context/AppContext";
import ProfileField from "../pages/ProfileField";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { employeeSchema } from "../utils/zodValidation";
import { DEPARTMENT, EXPERIENCE } from "../utils/constants";


const EmpDashboard = () => {
  const { empDetails, backendUrl, fetchEmployeeDetails} = useAppContext();
  const navigate = useNavigate() ;

  const employee = empDetails ?? {
  name: "",
  email: "",
  phone: "",
  age: 0,
  Eid: "",
  department: "",
  experience: "",
  gender: "",
  skills: [],
  isFirstLogin: false,
  salary : 0 ,
};
  const departmentOptions = Object.values(DEPARTMENT)
  const experienceOptions = Object.values(EXPERIENCE)
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    age : employee.age ,
    Eid: employee.Eid,
    department: employee.department,
    gender: employee.gender || "",
    experience: employee.experience || "",

    salary : employee.salary  ,
  });


  useEffect(() => {
    if (empDetails) {
      setFormData({
        name: empDetails.name || "",
        email: empDetails.email || "",
        phone: empDetails.phone || "",
        age : empDetails.age || 0,
        Eid: empDetails.Eid || "",
        department: empDetails.department || "",
        gender: empDetails.gender,
        experience: empDetails.experience,
        salary : empDetails.salary ,
      });
    }
  }, [empDetails]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};

  const handleEdit = () =>   setIsEditing(true);

  const handleCancel = () => {
    if (empDetails) {
      setFormData({
        name: empDetails.name || "",
        email: empDetails.email || "",
        phone: empDetails.phone || "",
        age : empDetails.age || 0 ,
        Eid: empDetails.Eid|| "",
        department: empDetails.department || "",
        gender: empDetails.gender || "",
        experience: empDetails.experience || "",
        salary : empDetails.salary ,
        
      });
    }

    setIsEditing(false);
  };

  const handleUpdate = async () => {
    // console.log(formData);
    // console.log("age =", formData.age);
    // console.log("typeof age =", typeof formData.age);  



    const result = employeeSchema.safeParse(formData);

    console.log(result);

       if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
    
      if (errors.name) {
        toast.error(`Name : ${errors.name[0]}`);
        return;
      }
      if (errors.phone) {
        toast.error(`Phone :  ${errors.phone[0]}`);
        return;
      }
      if (errors.department) {
        toast.error(`Department :  ${errors.department[0]}`);
        return;
      }
      if (errors.age) {
        toast.error(`Age :  ${errors.age[0]}`);
        return;
      }
    }
    
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
      toast.error
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
      if (axios.isAxiosError(error))  toast.error(error.response?.data?.message);
      else toast.error("Something went wrong");
     }

  }



  return (
    <div className="min-h-screen bg-[#232f20] font-serif">
      <div className="overflow-hidden rounded-md ">

        <div className="relative h-52 md:h-74">
              <img src={cover} alt="Cover"
                className="h-full w-full object-cover "/>
            </div>
 
            <div className="absolute left-8 top-32 md:left-14 md:top-36">
               <div className="h-32 w-32 overflow-hidden rounded-full border-2 shadow-md md:h-60 md:w-60 ">
                <img src={profile} alt="Employee Avatar" className="object-cover"/>
              </div>
            </div>
        </div>

      <div className="pt-20 md:px-16">
        <div className="mb-10 flex justify-end gap-4">

          

          {!isEditing 
            ? (<div>
            <button onClick={handleEdit} 
            className="rounded-lg bg-lime-700 px-6 py-2 text-white hover:bg-lime-600  mx-3">
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
                className="rounded-lg bg-red-800 px-6 py-2 text-white hover:bg-red-700">
                Cancel </button>
            </>
            )}

        </div>

        <div className="ml-4 grid grid-cols-1 gap-8 md:ml-32 md:grid-cols-2">

          {isEditing 
            ? (
            <div>
              <label className="text-gray-200 mb-2 block font-semibold text-lg">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-max border-0 border-b-3 rounded border-indigo-600 p-2" />
            </div>)
            : <ProfileField label="Name" value={employee.name} />
          }

           {isEditing 
            ? (
            <div>
              <label className="text-gray-200 mb-2 block font-semibold text-lg">Gender</label>
              <input type="text" name="gender" value={formData.gender} onChange={handleChange}
                className="w-max border-0 border-b-3 rounded border-indigo-600 p-2" />
            </div>)
            : <ProfileField label="Gender" value={employee.gender} />
          }

          { isEditing  
             ?  (
              <div>
                <label className="text-gray-200 mb-2 block font-semibold tex-lg"> Age </label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} 
                className="w-max border-0 border-b-3 rounded border-indigo-600 p-2"/>
              </div>
             )
             :
            <ProfileField label = "Age" value = {employee.age}   /> }

          <ProfileField label="Eid" value={employee.Eid ? `EMP - ${employee.Eid}` : "-"}/>
          <ProfileField label="Email" value={employee.email}/>

          
          {isEditing 
            ? (
            <div>
              <label className="mb-2 block font-semibold text-lg">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="w-max border-0 border-b-3 rounded border-indigo-600 p-2" />
            </div> ) 
            : (
            <ProfileField label="Phone" value={employee.phone ?? "-"} />)}

          
          {isEditing 
            ? (
                <div>
                  <label className="mb-2 block font-semibold text-lg">  Department </label>
              
                  <select name="department" value={formData.department}
                    onChange={handleChange} className="w-max border border-indigo-600 rounded p-2" >
                    <option value="" className="bg-[#232f20]">Select Department</option>              
                    {departmentOptions.map((department) => (
                      <option key={department} value={department} className="bg-[#232f20]">
                        {department}  </option> ))}
                  </select>
                </div>
              ) 
            : ( <ProfileField label="Department" value={employee.department ?? "-"}/>)}


             {isEditing 
            ? (
               <div>
                  <label className="mb-2 block font-semibold text-lg">  Experience </label>
              
                  <select name="experience" value={formData.experience}
                    onChange={handleChange} className="w-max border border-indigo-600 rounded p-2" >
                    <option value="" className="bg-[#232f20]">Select Experience</option>              
                    {experienceOptions.map((experience) => (
                      <option key={experience} value={experience} className="bg-[#232f20]">
                        {experience}  </option> ))}
                  </select>
                </div>
           )
            : <ProfileField label="Experience" value={employee.experience } />
          }

        
          <ProfileField label="Account Status" value="Active" />
          <ProfileField label="Salary" value= {`₹ ${employee.salary}`}/>

          {/* {isEditing
            ? (
              <div>
                 <label className="mb-2 block font-semibold text-lg">Experience</label>
                 <input type="text" name="experience" value={formData.experience} onChange={handleChange}
                className="w-max border-0 border-b-3 rounded border-indigo-600 p-2" />
              </div>
            ) 
            : 
            ( <ProfileField label = "Experience" value = "2 Years" /> )
          } */}
          {/* <ProfileField label = "Experience" value = "2+ Years" />  */}
          
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;